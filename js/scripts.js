var canvas = document.querySelector("#canvas");
var project1 = document.getElementById("project1");
var project2 = document.getElementById("project2");
var project3 = document.getElementById("project3");
var project4 = document.getElementById("project4");
var project5 = document.getElementById("project5");
var ctx = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
var a = 0.2;
var t = 0;
var aStep = Math.PI * 0.01;
var globalHue = 0;

function getNewColor() {
    var cx = window.innerWidth/2;
    var hue = (mouseX / (2 * cx)) * 300 + 25;
    var newColor = "hsl("+ hue + ", 95%, 95%)";
    return newColor;
}

function init() {
    window.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    });
  
    project1.addEventListener("mouseover", function(event){
       project1.style.backgroundColor = getNewColor();
    });
    
    project1.addEventListener("mouseout", function(event){
       project1.style.backgroundColor = null; 
    });
    
    project1.addEventListener("click", function(event){
       window.location.href = "https://github.com/ryan-brazeal-ufl/openpylivox"; 
    });
    
    project2.addEventListener("mouseover", function(event){
       project2.style.backgroundColor = getNewColor();
    });
    
    project2.addEventListener("mouseout", function(event){
       project2.style.backgroundColor = null; 
    });
    
    project3.addEventListener("mouseover", function(event){
       project3.style.backgroundColor = getNewColor();
    });
    
    project3.addEventListener("mouseout", function(event){
       project3.style.backgroundColor = null; 
    });
    
    project4.addEventListener("mouseover", function(event){
       project4.style.backgroundColor = getNewColor();
    });
    
    project4.addEventListener("mouseout", function(event){
       project4.style.backgroundColor = null; 
    });
    
    project5.addEventListener("mouseover", function(event){
       project5.style.backgroundColor = getNewColor();
    });
    
    project5.addEventListener("mouseout", function(event){
       project5.style.backgroundColor = null; 
    });
    
    update();
}


function update(){
  requestAnimationFrame(update);
  var time = performance.now()/120;
  
  // do stuff here
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  a = Math.sin(2-time * 0.0001);
  t = Math.sin(2+time * 0.03);
  //aStep = (Math.sin(time * 0.01) + 1.5) * 0.25
  aStep = Math.PI * (0.375 + Math.sin(time * 0.000005) * 0.125);
  
  globalHue +=0.5;
  
  draw();
}


function draw(){
  
  // clear canvas
  
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  // line
  var cx = window.innerWidth/2;
  var cy = window.innerHeight/2;
  var x, y, px, py;
  var radius=0, pradius=0;
  var totalAngle = Math.PI*200;
  for(var theta = 0; theta < totalAngle; theta+=aStep){
   
    pradius = radius;
    radius = (t + Math.pow(2, Math.cos(theta * a))) * 200;
    px = x;
    py = y;
    x = cx + Math.cos(theta) * radius;
    y = cy + Math.sin(theta) * radius;
    
    if(theta > 0){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(px, py);
      
      var dx = x - px;
      var dy = y - py;
      var lineSize = Math.sqrt(dx * dx + dy * dy);
      
      var r = pradius + (radius - pradius) / 2;
    
      //var hue = globalHue + (theta / Math.PI) * 180;
      //var hue = 150;
      var hue = (mouseX / (2 * cx)) * 300 + 25;
      var SandL = (mouseY / (2 * cy)) * 30.0 + 10.0;
      //ctx.strokeStyle = "hsl("+ hue +", 15%, 15%)";
      var newColor = "hsl("+ hue +","+ String(SandL) +"%,"+ String(SandL) + "%)";
      var newColor2 = "hsl("+ hue + ", 80%, 80%)";
      ctx.strokeStyle = newColor;
      project1.style.borderColor = newColor2;
      project2.style.borderColor = newColor2;
      project3.style.borderColor = newColor2;
      project4.style.borderColor = newColor2;
      project5.style.borderColor = newColor2;
      //ctx.lineWidth=clamp(map(r, -200, 200, 0.25, 2), 0.25, 10);
      ctx.lineWidth = .5;
      ctx.stroke();
      ctx.closePath();
    }
    
  }
  
  
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

function clamp(value, min, max){
  return value < min ? min : value > max ? max : value
}

init();
