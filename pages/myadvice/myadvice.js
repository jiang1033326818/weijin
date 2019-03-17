
import * as echarts from '../../ec-canvas/echarts';
import urls from '../../common/urls.js';
const tabs = [
  {
    name: "图文咨询"
  },
  {
    name: "电话咨询"
  },
];

Page({
  data: {
    onOff: true ,
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    typeList: [{
      name:"杨经理",
      label: '高级融资顾问',
      value: 'head0',
      from:"微金网",
      time:"2019-01-01 13:34",
      pingjia:"已评价",
      belong:"擅长:房产服务",
      people:"44646",
    }, {
        name: "杨经理",
        label: '高级融资顾问',
        value: 'head2',
        from: "微金网",
        pingjia: "待评价",
        time: "2019-01-01 13:34",
        belong: "擅长:房产服务",
        people: "44646",
      },
    ],
      typeList2: [{
      name: "杨经理",
      label: '高级融资顾问',
      value: 'head0',
      from: "微金网",
      time: "2019-01-01 13:34",
      pingjia: "已评价",
      belong: "擅长:房产服务",
      people: "44646",
    }, {
      name: "杨经理",
      label: '高级融资顾问',
      value: 'head2',
      from: "微金网",
      pingjia: "待评价",
      time: "2019-01-01 13:34",
      belong: "擅长:房产服务",
      people: "44646",
    },
    ]

  },
  toclues:function(e){
    wx.setStorageSync("tootherId", e.currentTarget.id)
    wx.setStorageSync("name", e.currentTarget.name)

    wx.navigateTo({
      url: '../clues/clues'
    });
  },
  // 导航点击滑动
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
    
  },
	bindChange: function (e) {
    console.log(this.data.scrollTop)
    var current = e.detail.current;
    if (e.currentTarget.dataset.index === 1) {
      this.setData({
        height: this.data.typeList.length * 410 + 50
      })
    } else {
      this.setData({
        height: this.data.typeList2.length * 410 + 50
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      scrollTop: 0,
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
  },
	// 导航点击事件
  navTabClick: function (e) {
    console.log(e.currentTarget.id)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id === "0") {
      this.setData({
        height: this.data.typeList.length * 410 + 50
      })
    } else {
      this.setData({
        height: this.data.typeList2.length * 410 + 50
      })
    }
  },


  //获取我的咨询信息
  myadvice:function(imgphone){
    wx.request({
      url: urls.mainurl + urls.getmyadvice,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        pageNum: 0,
        pageSize: 10,
        chatType:imgphone,
        cid:wx.getStorageSync("uid")
      },
      success: function (response) {
       console.log(response,2222)
      }
    })
  },

 

  //评论
  btnclick: function () {
    console.log(6868)
    this.setData({
      onOff: false,
    })
  },
  modalConfirm:function(){
    this.setData({
      onOff: true,
    })
    wx.showToast({
      title: '评论成功',  //标题
      icon: 'success',  //图标，支持"success"、"loading"

      duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
      success: function () { }, //接口调用成功的回调函数
      fail: function () { },  //接口调用失败的回调函数
      complete: function () { } //接口调用结束的回调函数
    })
  },
  modalCancel: function () {
    this.setData({
      onOff: true,
    })
    
  },
  
  // 加载初始数据
  onLoad: function (e) {
    this.myadvice(0)
  },
});



