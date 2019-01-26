// pages/expert/expert.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
      label: '房产抵押贷款',
      value: 'house',
    }, {
      label: '车产低压贷款',
      value: 'car'
    }, {
      label: '信用卡',
      value: 'credit'
    }, {
      label: '极速贷款',
      value: 'speet'
    }, {
      label: '工资流水贷款',
      value: 'bill0'
    },
      {
        label: '社保贷款',
        value: 'shebao'
      }, {
        label: '营业执照贷款',
        value: 'business'
      }, {
        label: '公积金贷款',
        value: 'accumulation'
      }, {
        label: '微粒贷贷款',
        value: 'loan'
      }, {
        label: '自存流水贷款',
        value: 'bill'
      }, {
        label: '按揭房贷款',
        value: 'housloan'
      }, {
        label: '按揭车贷款',
        value: 'turncar'
      },
      {
        label: '保单贷款',
        value: 'policy'
      },
    ],

  },

  tolist:function(){
    wx.navigateTo({
      url: '../Consultant/achievement'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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