// pages/home/home.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();
const tabs = [
  {
    name: "产品中心"
  },
  {
    name: "知识库"
  },
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clueNum: 0,
    taskNum: 0,
    customerNum: 0,
    powerTotal: 0,
    userInfo: {}, // 登录用户的信息
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '../../images/image001.jpg'
      }, {
        link: '/pages/logs/logs',
        url: '../../images/image002.jpg'
      }, {
        link: '/pages/index/index',
        url: '../../images/image003.jpg'
      }
    ],
    typeList: [{
      name: "微金二号",
      label: '123人申请',
      value: '10-100万',
      from: "0.89%",
      belong: [
        "房产抵押",
         "先息后本"
      ],
    }, {
        name: "微金一号",
        label: '123人申请',
        value: '10-100万',
        from: "0.89%",
        belong: [
          "房产抵押",
          "先息后本"
        ],
      }, {
        name: "微金一号",
        label: '123人申请',
        value: '10-100万',
        from: "0.89%",
        belong: [
          "房产抵押",
          "先息后本"
        ],
      },
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 1000,  //滑动时间
  },
  // 导航点击滑动
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  bindChange: function (e) {
    console.log(this.data.scrollTop)
    var current = e.detail.current;
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
  },

  // 跳转页面
  tophonetel: function () {
    wx.navigateTo({
      url: '../phonetel/phonetel'
    });
  },

  toexpert: function () {
    wx.navigateTo({
      url: '../expert/expert'
    });
    console.log(6565656)
  },

  toconsultant: function () {
    wx.navigateTo({
      url: '../Consultant/achievement'
    });
    console.log(6565656)
  },

  // 获取登录用户信息
  getUserInfo: function() {
    request(urls.getUserInfo, {
      success: (res) => {
        this.setData({
          userInfo: res.content
        });
        wx.setStorage({
          key: 'userInfo',
          data: res.content,
        });
      }
    });
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  
  // },

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
})


