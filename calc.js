function Vector(real, im) { // A Coordinate pair of real and imaginary
  this.r = real;
  this.im = im;
}
Vector.prototype.inc = function(v) { //Add another vector (destructive)
  this.r += v.r;
  this.im += v.im;
}
Vector.add = function(v1, v2) { //Add another vector (non-destructive)
  return new Vector(v1.r + v2.r, v1.im + v2.im);
}

Vector.mult = function(v1, v2) { //Multiply 2 complex vectors (non-destructive)
  let r = v1.r * v2.r - v1.im * v2.im;
  let im = v1.r * v2.im + v2.r * v1.im;
  return new Vector(r, im);
}

// Calculate e^(i*n)
function e_i(n) {
  return new Vector(Math.cos(n), Math.sin(n))
}

function findCoeff(points, n) { 
  //Calculation of the integral of the function * e^ (-2pi*i*n*t)
  let jacov = new Vector(0,0);
  let explogs = [];
  for (var i = 0; i < points.length; i++) {
    let t = i/points.length;
    let prod = Vector.mult(points[i], e_i(-2*Math.PI * n * t));
    jacov.inc(Vector.mult(prod, new Vector(1/points.length,0)));
    explogs.push(-2*Math.PI * n * t)
  }
  if (Math.abs(jacov.r) > 100) {
    console.log("Alert! DANGER!", n)
  console.log(explogs)
  }

  return jacov; // Return Average
}

function calcTerm(coeff, n, t) {                                  //N - Spin Frequency
  let v = Vector.mult(coeff, e_i(2*Math.PI * n * t));            //T - Time
  return v;
}

