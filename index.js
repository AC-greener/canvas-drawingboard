
var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d')

var useEraser= false
var usePaint = false

painting.onclick = function() {
  useEraser = false
  actions.className = 'utils'
}
eraser.onclick = function() {
  useEraser = true
  actions.className = 'utils x'
}

autoSizeCanvasSize(canvas)

listenToMouse()


function listenToMouse() {
  var lastPoint = {x:undefined, y: undefined}

  canvas.onmousedown = function(e) {
    var x = e.clientX, y = e.clientY
    usePaint = true
    if(useEraser) {
      context.clearRect(x, y, 10, 10)
    } else {
      lastPoint.x = x, lastPoint.y = y
    }
  }
  canvas.onmousemove = function(e) {
    var x = e.clientX, y = e.clientY
    if(!usePaint) return 

    if(useEraser) {
      context.clearRect(x, y, 10, 10)
    } else {
      var newPoint = {x:x, y:y}
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    }
    lastPoint = newPoint
  }

  canvas.onmouseup = function(e) {
    usePaint = false
  }
}


function autoSizeCanvasSize(canvas) {
  changeCanvasWidth(canvas)
  
  window.onresize = function() {
    changeCanvasWidth(canvas)
  }
}


function changeCanvasWidth(canvas) {
  var height = document.documentElement.clientHeight
  var width = document.documentElement.clientWidth
  canvas.width = width
  canvas.height = height
}


function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  
  context.lineWidth = 5
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()   //描边
  context.closePath()
}
