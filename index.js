
var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d')
var lineWidth = 3
var useEraser= false
var usePaint = false

clear.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function() {
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  a.href = url
  a.download = 'canvas'
  a.click()
}
thin.onclick = function() {
  lineWidth = 3
}
thick.onclick = function() {
  lineWidth = 5
}
pen.onclick = function() {
  useEraser = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function() {
  useEraser = true
  pen.classList.remove('active')
  eraser.classList.add('active')
}

black.onclick = function() {
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')

  pen.classList.add('black')
  pen.classList.remove('red')
  pen.classList.remove('yellow')
  pen.classList.remove('green')
}
red.onclick = function() {
  context.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')

  pen.classList.remove('black')
  pen.classList.add('red')
  pen.classList.remove('yellow')
  pen.classList.remove('green')
}
yellow.onclick = function() {
  context.strokeStyle = 'yellow'
  black.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.add('active')
  green.classList.remove('active')

  pen.classList.remove('black')
  pen.classList.remove('red')
  pen.classList.add('yellow')
  pen.classList.remove('green')
}
green.onclick = function() {
  context.strokeStyle = 'green'
  black.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.add('active')

  pen.classList.remove('black')
  pen.classList.remove('red')
  pen.classList.remove('yellow')
  pen.classList.add('green')
}
autoSetCanvasSize(canvas)

listenToUser()

//判断设备是否支持touch事件

function listenToUser() {
  var lastPoint = {x:undefined, y: undefined}

  //特性检测
  if(document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function(e) {
      console.log('开始摸我了')
      var x = e.touches[0].clientX, y = e.touches[0].clientY
      usePaint = true
      if(useEraser) {
        context.clearRect(x, y, 10, 10)
      } else {
        lastPoint.x = x, lastPoint.y = y
      }
    }
    canvas.ontouchmove = function(e) {
      console.log('正在摸')
      var x = e.touches[0].clientX, y = e.touches[0].clientY
      var newPoint = {x:x, y:y}
      if(!usePaint) return 
  
      if(useEraser) {
        context.clearRect(x, y, 14, 14)
      } else {
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      }
      lastPoint = newPoint    }
    canvas.ontouchend = function() {
      console.log('摸完了')
      usePaint = false
    }
  } else{
    //非触屏设备
    canvas.onmousedown = function(e) {
      var x = e.clientX, y = e.clientY
      usePaint = true
      if(useEraser) {
        context.clearRect(x, y, 14, 14)
      } else {
        lastPoint.x = x, lastPoint.y = y
      }
      
    }
    canvas.onmousemove = function(e) {
      var x = e.clientX, y = e.clientY
      var newPoint = {x:x, y:y}
      if(!usePaint) return 
  
      if(useEraser) {
        context.clearRect(x, y, 10, 10)
      } else {
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      }
      lastPoint = newPoint
    }
  
    canvas.onmouseup = function(e) {
      usePaint = false
    }
  }
  
}


function autoSetCanvasSize(canvas) {
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
  context.lineWidth = lineWidth
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()   //描边
  context.closePath()
}
