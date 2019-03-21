
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const tabs = [
  {
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
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    selectPerson: true,
    firstPerson: '全国',
    selectArea: false,
    selectPerson2: true,
    firstPerson2: '',
    selectArea2: false,
    acity:'',
    managerlists:[],
   
    citylist:[
      {city:"北京"},
      { city: "上海" },
      { city: "深圳" },
      { city: "天津" },
    ]
  },

  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },

  clickPerson2: function () {
    var selectPerson2 = this.data.selectPerson2;
    if (selectPerson2 == true) {
      this.setData({
        selectArea2: true,
        selectPerson2: false,
      })
    } else {
      this.setData({
        selectArea2: false,
        selectPerson2: true,
      })
    }
  },

  //点击切换
  mySelect: function (e) {
    console.log(e)
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
    this.getloanall(e.target.dataset.me,this.data.firstPerson2)
  },
  mySelect2: function (e) {
    this.setData({
      firstPerson2: e.target.dataset.me,
      selectPerson2: true,
      selectArea2: false,
    })
    this.getloanall(this.data.firstPerson, e.target.dataset.me)
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
  // 打电话事件   
  callphone1: function (e) {
    getApp().phoneit(e.currentTarget.dataset.id)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
      //仅为示例，并非真实的电话号码
    })
  },
  //点击咨询本地专家
  askpeople:function(e){
    getApp().chatit(e.currentTarget.dataset.id)
    wx.setStorageSync("tootherId", e.currentTarget.dataset.uid)
    wx.navigateTo({
      url: '../clues/clues'
    });
  },

  //跳转到专家详情
  toone:function(e){
    console.log(e)
    wx.setStorageSync("mid", e.currentTarget.dataset.manger)
    wx.navigateTo({
      url: '../details/details'
    });
  },
 

  //获取专家列表

  getloanall: function () {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.getloanlist, 
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        "pageNum": 0,
        "pageSize": 10,
        // city:city,
        // type:type,
        expert:"0",
      },
      success: function (response) {
        console.log(response,8888)
        that.setData({
          managerlists: response.data.data.dataList
        })
      
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },
 
 

  onLoad: function (e) {
    //  console.log(this.data)
    this.getloanall("全国",wx.getStorageSync("databelong"))
    this.setData({
      firstPerson2: wx.getStorageSync("databelong")
    })
  //  this.getlistExpert()
    // this.getmanagerlists()
  },
  onReady:function(e){
    this.setData({
      firstPerson2: wx.getStorageSync("databelong")
    })
  },
  //获取客服信息
  
});
