import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const tabs = [{
    name: "服务"
  },
  {
    name: "信用服务"
  },
  {
    name: "极速服务"
  },
  {
    name: "信用卡"
  },
];

Page({
  data: {
    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: 0, //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    // typeList: [{
    //   name: "杨经理",
    //   label: '高级融资顾问',
    //   value: 'head0',
    //   from: "微金网",
    //   belong: "擅长:房产服务",
    //   people: "44646",
    // }, {
    //   name: "杨经理",
    //   label: '高级融资顾问',
    //   value: 'head2',
    //   from: "微金网",
    //   belong: "擅长:房产服务",
    //   people: "44646",
    // }, ],
    getloanalllist: []
    // getzhuanjia:[],
  },
  // 滑动事件
  upper: function(e) {
    // console.log(e)
  },

  lower: function(e) {
    // console.log(e)
  },
  scroll: function(e) {
    // console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  // 导航点击滑动
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  bindChange: function(e) {
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
  navTabClick: function(e) {
    console.log(e)
    this.getloanall(e._relatedInfo.anchorRelatedText)
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },

  //页面跳转
  toone: function() {
    // wx.grtStorageSync("mid", e.currentTarget.dataset.manger),
    wx.navigateTo({
      url: '../detailso/detailso'
    });
    // wx.setStorageSync("mid", e.currentTarget.dataset.manger)
    // wx.navigateTo({
    //  url: '../details/details'
    // });
  },

  //点击查看详情
 btn: function () {
  //  wx.grtStorageSync( e.currentTarget.dataset.bntuser),
    wx.navigateTo({
      url: '../detailso/detailso'
    });
    // wx.setStorageSync("mid", e.currentTarget.dataset.manger)
    // wx.navigateTo({
    //  url: '../details/details'
    // });
  },
  //电话咨询
  btnphone: function (e) {
    console.log(e.currentTarget.dataset.phonenum, 999)
console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
      //仅为示例，并非真实的电话号码
    })
  },
  //咨询
  btnask: function () {
    wx.navigateTo({
      url: '../detailso/detailso'
    });
  },
  //获取专家列表
  getloanall: function(type) {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.getloanlist, // +this.data.activeIndex
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      }, //getloanlist
      data: {
        "pageNum": 0,
        "pageSize": 10,
        type:type,
        expert: "1",
      },
      success: function(e) {
        // console.log("222"+response)
        console.log(e, "22")
        that.setData({
          getloanalllist: e.data.data.dataList
        })
      },
      fail: function(err) {
        console.log(err)

      }
    })
  },

  onLoad: function(e) {
    this.getloanall('服务');

  },

});