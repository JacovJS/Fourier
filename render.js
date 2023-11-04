let c = document.getElementById("canv");
let ctx = c.getContext("2d");

let incRate = 0.001;
let numFreqs = 20; 

let points = [];
for (var i = 0; i < 10; i ++) {
  points.push(new Vector(i*50+100,100));
}
for (var i = 0; i < 10; i ++) {
  points.push(new Vector(600,100+i*50));
}
for (var i = 0; i < 10; i ++) {
  points.push(new Vector(600-i*50,600));
}
for (var i = 0; i < 10; i ++) {
  points.push(new Vector(100,600-i*50));
}

let freqs = [0];
for (let i = 1; i < numFreqs; i++){
  freqs.push(i);
  freqs.push(-i);
}
let coeffs = [];
//Generate coeff.
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
  //Reference Points
  for (let i = 0; i < points.length; i++) {
      //ctx.fillRect(points[i].r-5,points[i].im-5,10,10);
  }
  //Pen
  for (let i = 0; i < pen.length; i++) {
      ctx.fillRect(pen[i].r-2,pen[i].im-2,4,4);
  }
  let vec = calcTerm(coeffs[0], freqs[0], t); //Initial Pos.
  ctx.strokeStyle="green";
  
  
  for (let i = 1; i < coeffs.length; i++) {
    let diff = calcTerm(coeffs[i], freqs[i], t);
    let dist = Math.sqrt((diff.r)**2 + (diff.im)**2);
    ctx.beginPath();
    ctx.ellipse(vec.r, vec.im, dist, dist, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw Line
    ctx.beginPath();
    ctx.moveTo(vec.r, vec.im);
    vec.inc(diff)
    ctx.lineTo(vec.r, vec.im);
    ctx.stroke();
  }
  
  
  ctx.fillStyle="red";
  ctx.fillRect(vec.r-2, vec.im-2, 4, 4);
  pen.push(new Vector(vec.r, vec.im));
  if (pen.length > 1/incRate) {pen.shift();} //Lag Reduction
  t += incRate;
}, 20);
