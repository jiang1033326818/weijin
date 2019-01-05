// pages/schedule/schedule.js
import authorityCheck from '../../utils/authority.js';
import request from '../../utils/request.js';
import util from '../../utils/util.js';
import urls from '../../common/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choseDays: [{
      month: 'current',
      day: new Date().getDate(),
      color: 'white',
      background: '#1780C7'
    }],
    MONTH: 'BIDDING',
    tabIndex: 0,
    todoList: [],
    todoTotal: 0,
    todoPage: {
      pageNo: 0,
      pageSize: 10,
    },
    doneList: [],
    doneTotal: 0,
    donePage: {
      pageNo: 0,
      pageSize: 10,
    },
  },

  //滑块改变
  tabChange: function(e) {
    const { current } = e.detail;
    this.setData({
      tabIndex: current,
    })
  },

  // 点击进入详情
  toDetail: function(e) {
    const { item, status } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../task/task?param=' + JSON.stringify({ task:item, status }),
    });
  },

  //点击tab
  tabClick: function(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      tabIndex: id,
    });
  },

  // 选取某一天
  dayClick: function(e) {
    const { day } = e.detail;
    const { choseDays } = this.data;
    choseDays.push({
      month: 'current',
      day: day,
      color: 'white',
      background: '#1780C7'
    });
    this.setData({ choseDays });
  },

  // 获取任务列表
  getTasks: function (overType) {
    const page = { ...this.data[overType + 'Page'] };
    const list = this.data[overType + 'List'];
    const total = this.data[overType + 'Total'];
    console.log(this.data);
    // 判断需不需要取数，已取到所有数据时，不用再取数
    if (page.pageNo > 0 && total === list.length) {
      return;
    }

    page.pageNo++;
    const url = urls.getTasks.replace('${param}', overType);
    request(url, {
      data: {
        ...page,
      },
      method: 'POST',
      success: (res) => {
        if (res.code === 0) {
          if (res.content.content.length) {
            const obj = {};
            obj[overType + 'Page'] = page;
            obj[overType + 'Total'] = res.content.total;
            const nList = res.content.content;
            if (overType === 'todo') {// 处理剩余时间
              nList.forEach((item) => {
                item.leaveDays = util.computeLeaveDays(item.closingTime);
              });
            }
            obj[overType + 'List'] = [...list, ...nList];
            this.setData({
              ...obj,
            })
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // authorityCheck();
    this.getTasks('todo');
    this.getTasks('done');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
  
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