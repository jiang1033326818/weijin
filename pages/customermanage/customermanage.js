import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();

Page({
  data: {
    customer: {},
    contactList: [],
    src: '../../images/tel.png',
    tableThemes: {index: '序号', contractName: '合同名称', powerCount: '购电总量', powerType: '购电类型'},
    taskList: []
  },

  // 获取用户申报任务列表
  getCustomerTaskList: function(id) {
    const url = urls.getTasks.replace('${param}', id);
    request(url, {
      method: 'POST',
      data: {
        pageNo: 1,
        pageSize: 100
      },
      success: (res) => {
        if(res.code === 0) {
          this.setData({
            taskList: res.content.content,
          });
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          });
        }
      }
    })
  },

  // 获取用户详情
  getCustomerDetail: function (id) {
    request(urls.customerDetail + id + '/detail', {
      method: 'GET',
      success: (res) => {
        this.setData({
          customerInfo: res.content
        });
      },
      fail: (response) => {
        console.log(response, '客户详情失败');
        wx.showToast({
          title: response.message,
          icon: 'none',
        });
      }
    })
  },
  // 获取客户联系人列表
  getContacts: function(id) {
    const url = urls.getContacts.replace('${param}', id);
    request(url, {
      success: (res) => {
        this.setData({
          contactList: res.content
        });
      },
      fail: (response) => {
        wx.showToast({
          title: response.message,
          icon: 'none',
        });
      }
    })
  },
  onLoad: function(options) {
    const customer = JSON.parse(options.customer);
    console.log(customer);
    this.setData({
      customer,
    });
    this.getContacts(customer.id);
    this.getCustomerTaskList(customer.id);
  },
  toCondetails: function (e) {
    const {id, type} = e.currentTarget.dataset.item;
    wx.setStorageSync('typedata', type === "BILATERAL" ? 0 : 1);
    wx.navigateTo({
      url: `../condetails/condetails?id=${id}`,
    })
  },
  phoneCall: function (e) {
    const _ = this;
    this.setData({
      allReady: false,
    });
    const { id, index, phone } = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: () => {
        request(url, {
          success: () => {
            _.setData({
              allReady: true,
            });
          }
        });
      },
      fail: () => {
        this.setData({
          allReady: true
        });
      }
    });
  }
})