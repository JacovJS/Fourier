let c = document.getElementById("canv");
let ctx = c.getContext("2d");

let incRate = 0.001;
let numFreqs = 20; 

let points = [];
//define the shape here

for (var i = 0; i < Math.PI*4/3; i+= 0.2) {
  points.push(new Vector(440+Math.sin(i)*60,400-Math.cos(i)*60))
}
for (var i = Math.PI*2/3; i < Math.PI*2; i+= 0.2) {
  points.push(new Vector(360+Math.sin(i)*60,400-Math.cos(i)*60))
}
for (var i = 0; i <= 20; i++) {
  points.push(new Vector(360,340-i*10));
}
for (var i = Math.PI*3/2; i < Math.PI*5/2; i+= 0.2) {
  points.push(new Vector(400+Math.sin(i)*40,140-Math.cos(i)*40))
}
for (var i = 20; i >= 0; i--) {
  points.push(new Vector(440,340-i*10));
}

let freqs = [0];
for (let i = 1; i < numFreqs; i++){
  freqs.push(i);
  freqs.push(-i);
}
let coeffs = [];
//generate coefficients
for (let i = 0; i < freqs.length; i++) {
  coeffs.push(findCoeff(points, freqs[i]));
}
console.log(coeffs);
let t = 0;
let pen = [];
setInterval(() => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 1000);
  ctx.fillStyle="black";
  //reference points
  for (let i = 0; i < points.length; i++) {
      ctx.fillRect(points[i].r-5,points[i].im-5,10,10); //
  }
  //pen
  for (let i = 0; i < pen.length; i++) {
      ctx.fillRect(pen[i].r-2,pen[i].im-2,4,4);
  }
  let vec = calcTerm(coeffs[0], freqs[0], t); //initial position
  ctx.strokeStyle="green";
  
  
  for (let i = 1; i < coeffs.length; i++) {
    let diff = calcTerm(coeffs[i], freqs[i], t);
    let dist = Math.sqrt((diff.r)**2 + (diff.im)**2);
    ctx.beginPath();
    ctx.ellipse(vec.r, vec.im, dist, dist, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    
    // draw a line from current cursor position to the provided x,y coordinate
    ctx.beginPath();
    ctx.moveTo(vec.r, vec.im);
    vec.inc(diff)
    ctx.lineTo(vec.r, vec.im);
    ctx.stroke();
  }
  
  
  ctx.fillStyle="red";
  ctx.fillRect(vec.r-2, vec.im-2, 4, 4);
  pen.push(new Vector(vec.r, vec.im));
  if (pen.length > 1/incRate) {pen.shift();} //reduce lag
  t += incRate;
}, 20);
