// pages/task/task.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectContact: 0,
    // 选中联系人姓名
    contact: {
      name: ''
    },
    totalPower: '',
    MONTH: 'BIDDING',
    monthPower: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    yearPower: 0,
    status: '',
    contacts: [],
    checkCode: '', // 验证码
    task: {
      id: 0,
      name: '',
      customerName: '',
      closingTime: 4,
      customerId: 1
    }
  },

  // 计算总电量
  sum: function(arr) {
    let r = 0;
    arr.forEach((item) => {
      r += item;
    });
    return r;
  },

  // 月度电量输入改变
  changeMonthPower: function (e) {
    const { value } = e.detail;
    const { index } = e.currentTarget.dataset;
    const { monthPower } = this.data;
    monthPower[index] = Number(value) ? Number(value) : 0;
    const yearPower = this.sum(monthPower);
    this.setData({
      monthPower,
      yearPower
    });
  },

  // 选择联系人
  changeContact: function(e) {
    const { contacts } = this.data;
    const { index } = e.currentTarget.dataset;
    this.setData({
      selectContact: index,
      contact: contacts[index]
    })
  },

  //电量输入改变
  totalPowerChange: function(e) {
    const { value } = e.detail;
    this.setData({
      totalPower: value
    });
  },

  // 用户提交用电量
  submit: function () {
    const { totalPower, checkCode, task, monthPower, MONTH } = this.data;
    let errorMsg = '';
    if(!checkCode) {
      errorMsg = '请填写验证码!';
    }
    if (MONTH === '' && !totalPower) {
      errorMsg = '请填写用电量!';
    }
    if (errorMsg) {
      wx.showToast({
        title: errorMsg,
        icon: 'none'
      });
    } else { // 提交
      let url = task.type === 'BIDDING' ? urls.biddingPowerReport : urls.bilateralPowerReport;
      let power = task.type === 'BIDDING' ? totalPower : monthPower;
      console.log(power);
      url = url.replace('${param}', task.id);
      request(url, {
        method: 'POST',
        data: {
          password: checkCode,
          power,
        },
        success: (res) => {
          if (res.code === 0) {
            wx.showToast({
              title: '提交成功',
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        }
      })
    }
  },

  //验证码输入改变
  checkCodeChange: function(e) {
    const { value } = e.detail;
    this.setData({
      checkCode: value
    });
  },

  // 获取公司联系人列表
  getContacts: function (id) {
    const url = urls.getContacts.replace('${param}', id);
    request(url, {
      success: (res) => {
        this.setData({
          contacts: res.content,
          selectContact: 0,
          contact: res.content[0]
        })
      }
    })
  },

  // 根据任务id查询任务详情
  getTaskDetail: function (id) {
    const url = urls.getTaskDetail.replace('${param}', id);
    request(url, {
      success: (res) => {
        const contact = {
          name: res.content.customerContactName,
          mobile: res.content.customerContactMobile,
        };
        this.setData({
          contact,
          totalPower: res.content.reportPower || 0,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const param = JSON.parse(options.param);
    const {task, status} = param;
    console.log(param);
    // 解析参数，将任务信息保存，并根据客户id获取联系人列表。
    // 计算任务剩余天数
    param.task.leaveDays = status === 'done' ? 0 : util.computeLeaveDays(param.task.closingTime);

    this.setData({...param});
    // 获取公司联系人列表
    if (status === 'todo') {
      this.getContacts(task.customerId);
    }
    // 如果是已完成任务，需要查询任务详情
    if (status === 'done') {
      this.getTaskDetail(task.id);
    }
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
    let { task, status, contact } = this.data;
    return {
      title: this.data.task.name,
      path: 'pages/task/task?param=' + JSON.stringify({
        task, status: 'doing', contact: {name: contact.name} }),
      success: function(res) {
        const url = urls.contactConfirm.replace('${param}', task.id);
        request(url, {
          method: 'POST',
          data: contact.id, 
          success: function(res) {
            if (res.code === 0) {
              wx.showToast({
                title: '分享成功',
              });
            } else {
              wx.showToast({
                title: '分享失败，请重新分享',
                icon: 'none'
              });
            }
          }
        });
        
      },
      fail: function(res){
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        });
        console.log(res);
      }
    };
  }
})