// function createTag(name) {
//   var element = document.createElement(name)
//   return element
// }

// var canvas =document.getElementById('canvas')


// canvas.onmousedown = function(e) {
//   var x = e.clientX
//   var y = e.clientY
//   var div = createTag('div')
//   div.style =  `
//     width:6px; height:6px; position: absolute;border-radius: 50%;
//     left: ${x-3}px; top:${y-3}px;
//     background: black

//   `
//   canvas.appendChild(div)
  
// }

// canvas.onmousemove = function(e) {
//   var x = e.clientX
//   var y = e.clientY
//   var div = createTag('div')
//   div.style =  `
//     width:6px; height:6px; position: absolute;border-radius: 50%;
//     left: ${x-3}px; top:${y-3}px;
//     background: black

//   `
//   canvas.appendChild(div) 
// }

// canvas.onmouseup = function(e) {
//   // console.log('2222')
// }

var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d')

var painting = false
var lastPoint = {x:undefined, y: undefined}

canvas.onmousedown = function(e) {
  painting = true
  var x = e.clientX, y = e.clientY
  lastPoint.x = x, lastPoint.y = y
  drawCircle(x, y, 1)
}
canvas.onmousemove = function(e) {
  if(painting) { 
    var x = e.clientX, y = e.clientY
    var newPoint = {x:x, y:y}
    drawCircle(x, y, 1)
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint = newPoint
  }
}
canvas.onmouseup = function(e) {
  painting = false
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  
  context.lineWidth = 5
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()   //描边
  context.closePath()
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI*2)
  context.fill()
}

function drawRect() {
  context.fillStyle = 'green'
  context.fillRect(10, 10, 100, 100)
  
  context.strokeStyle = 'black'
  context.strokeRect(10, 10, 100, 100)
  
  context.clearRect(50, 50, 10, 20)
}

function drawSanJiao() {
  context.beginPath()
  context.moveTo(200, 200)
  context.lineTo(200, 250)
  context.lineTo(250, 250)
  context.fill()

}