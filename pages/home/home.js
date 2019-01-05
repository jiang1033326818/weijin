// pages/home/home.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();

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
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 1000,  //间隔时间
    duration: 1000,  //滑动时间
  },

  // 获取销售线索数量
  getClueNum: function() {
    request(urls.getClueNum, {
      success: (res) => {
        this.setData({
          clueNum: res.content
        })
      }
    });
  },

  // 获取客户数量
  getCustomerNum: function() {
    request(urls.getCustomerNum, {
      success: (res) => {
        this.setData({
          customerNum: res.content.customer
        })
      }
    });
  },

  // 获取申报任务数量
  getTaskNum: function() {
    request(urls.getTaskNum, {
      success: (res) => {
        this.setData({
          taskNum: res.content
        })
      }
    });
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
    this.getClueNum();
    this.getCustomerNum();
    this.getTaskNum();
    this.getUserInfo();
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
  onShareAppMessage: function () {
    const { id, companyName, name, mobile, tenantId, tenantName } = this.data.userInfo;
    return {
      title: '电费试算方案',
      path: 'pages/eleplan/eleplan?param=' + JSON.stringify({
        id, companyName, name, mobile, tenantId, tenantName
      }),
      imageUrl: '../../images/shareImg.jpg',
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function() {
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    };
  }
})