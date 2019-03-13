var app = getApp()
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({
  drawCircle: function () {
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 100, y = 100, radius = 96;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#d81e06');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 100, n = 60;
    var animation = function () {
      if (step <= n) {
        endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
      }
    };
    varName = setInterval(animation, animation_interval);
  },
  onReady: function () {
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(100, 100, 96, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  onLoad: function (options) {
    this.drawCircle();
  },
  /**
   * 页面的初始数据
   */
  data: {
    a:[
      {
        name:"zhangsan",
        value:1
      },
      {
        name: "李四",
        value: 2
      },
      {
        name: "收到回复",
        value: 9
      },
      {
        name: "反对法国",
        value: 6
      },
      {
        name: "更符合",
        value: 67
      },
      {
        name: "更换",
        value: 165
      },
      {
        name: "65",
        value: 21
      },
    ],
    b:true,
    c:"red",
  },


  changgeBtn(){
    let _ =this;
    if(_.data.b===true){
     // 8 this.setData的使用方法
       _.setData({
         b:false
       })
    }else{
      _.setData({
        b: true
      })
    }
  },
  changgeColor(){
    let _ = this;
    if (_.data.c === "red") {
      _.setData({
        c: "green"
      })
    } else {
      _.setData({
        c: "red"
      })
    }

    
  },
//   data:{
// a:[
//   {
//     name:"1",
//     value:11
//   },
//    {
//     name: "2",
//     value: 22
//   },
//    {
//     name: "3",
//     value: 33
//   }
// ]
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.for循环
    let _=this
    let arr=[];
    for(let i=0;i<=10;i++){
        arr.push({
          name:"啊"+i+"哦",
          value:i
        })
    }
    console.log(arr)
    console.log(_.data)

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})