// pages/customers/customers.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerStatus: [{
      label: '全部',
      value: 0
    }, {
        label: '我的',
        value: 1
    }],
    statusFilter: 0,
    list: [],
    page: {
      pageNo: 1,
      pageSize: 10,
    },
    queryStr: '',
    totalCount: 100,
    companyTotal: 0, // 公司总数
    customerTotal: 0, // 客户总数
  },

  // 打电话
  phoneCall: function(e) {
    const { phone } = e.target.dataset;
    wx.makePhoneCall({
      phoneNumber: phone,
    });
  },

  // 获取客户总量数据
  getCustomerNum: function() {
    const _ = this;
    request(urls.getCustomerNum, {
      success: (res) => {
        _.setData({
          ...res.content
        });
      }
    })
  },

  // 获取客户列表
  getCustomerList: function() {
    let { page, queryStr, list, totalCount } = this.data;
    if (list.length && list.length === totalCount ) {
      return;
    }
    const _ = this;
    if (list.length === page.pageNo*page.pageSize) {
      page.pageNo += 1;
    } else {
      list = [];
    }
    request(urls.getCustomerList, {
      data: {
        ...page,
        name:queryStr,
      },
      method: 'POST',
      success: (res) => {
        _.setData({
          list: [...list, ...res.content.content],
          customerTotal: res.content.total,
          totalCount: res.content.total,
          page,
        });
      }
    });
  },

  //进入到客户详情页
  goDetail: function (e) {
    const {customer} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../customermanage/customermanage?customer=' + JSON.stringify(customer),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getCustomerList();
  },

  // 客户状态改变事件
  statusChange: function(e) {
    const val = this.data.customerStatus[e.detail.value].value;
    const { customers } = this.data;
    let list = [];
    if (val === 0) {
      list = [...customers];
    } else {
      list = customers.filter(item => item.status === val);
    }
    this.setData({
      list,
      statusFilter: val
    })
  },
  timer: 0,
  // 搜索框输入改变
  searchCustomer: function (e) {
    const _ = this;
    const val = e.detail.value;
    this.setData({
      page: {
        pageNo: 0,
        pageSize: 10
      },
      totalCount: 100,
      queryStr: val,
    });
    if (this.timer) {
      clearTimeout(this.timer);
    } 
    this.timer = setTimeout(() => {
      _.setData({
        list: [],
      });
      _.getCustomerList();
    }, 1000);
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
  
  }
})