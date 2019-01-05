// pages/contract/contract.js
import regs from '../../common/regs.js';
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
      label: '待确认',
        value: "UNCONFIRMED"
    },
      {
        label: '待审批',
        value: "PENDING"
      },
      {
        label: '已成交',
        value: "APPROVED"
      },
      {
        label: '已取消',
        value: "UNAPPROVED"
      },
    ],

    customerStatus2: [ 
    {
      label: '已成交',
      value: "APPROVED"
    },
    {
      label: '已取消',
      value: "UNAPPROVED"
    },
    ],

    customerType: [{
      label: '长协',
      value: 0
    }, {
      label: '竞价',
      value: 1
    }],
    statusFilter: 0,
    typeFilter:0,
    list: [],
    searchInput: '',
    contractimg:"../../images/contract.png",
    shareimg:"../../images/share.png",
    msg:''
  },

  // 打电话
  phoneCall: function (e) {
    //const { phone } = e.target.id;
    //console.log(e.target.id)
    wx.makePhoneCall({
      phoneNumber: e.target.id,
    });
  },
  

  //查看合同详情
  returnid: function (e){
    console.log(e.currentTarget)
    wx.navigateTo({
      url: "../condetails/condetails?id=" + e.currentTarget.id
    })
    wx.setStorageSync('typedata', e.currentTarget.dataset.id)
  },

  // 获取合同列表
  getContractsNum: function () {
    const _ = this;
    if (this.data.typeFilter === 0) {
    request(urls.contractList, {
      method:'POST',
      data: {
        status: this.data.statusFilter === 0 ? '' : this.data.statusFilter,
      },
      success: (res) => {
        console.log(res)
        _.setData({
          list:res.content.content
        });
      }
    })
    }else{
      request(urls.contractListBid, {
        method: 'POST',
        data: {
          status: this.data.statusFilter === 0 ? '' : this.data.statusFilter,
        },
        success: (res) => {
          console.log(res)
          _.setData({
            list: res.content.content
          });
        }
      })
    }
  },

  // 合同汇总信息
  getContractsMsg: function () {
    const _ = this;
    request(urls.contractsMsg, {
      success: (res) => {
        _.setData({
          msg:res.content
        });
      }
    })
  },


  // 修改合同状态
  getContractsStatus: function (e) {
    const _ = this;
    const { id } = e.target;
    request(urls.contractsStatus, {
      method: 'POST',
      data: {
        id:id,
        status: this.data.customerStatus2[parseInt(e.detail.value)].value,
        type: this.data.typeFilter === 0 ? "BILATERAL" :"BIDDING",
      },
      success: (res) => { 
       wx.showToast({
         title: '修改成功',
       })
        this.getContractsMsg()
        if (this.data.typeFilter === 0) {
          
          request(urls.contractList, {
            method: 'POST',
            data: {
              status: this.data.statusFilter === 0 ? '' : this.data.statusFilter,
            },
            success: (res) => {
              console.log(_)
              _.setData({
                list: res.content.content,
              });
            }
          })
        } else {
          const _ = this;
          request(urls.contractListBid, {
            method: 'POST',
            data: {
              status: this.data.statusFilter === 0 ? '' : this.data.statusFilter,
            },
            success: (res) => {
              console.log(res)
              _.setData({
                list: res.content.content,
              });
            }
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 合同状态改变事件
  statusChange: function (e) {
    const val = this.data.customerStatus[e.detail.value].value;
    if (this.data.typeFilter===0){
      const _ = this;
      request(urls.contractList, {
        method: 'POST',
        data: {
          status: val === 0 ? "" : val,
        },
        success: (res) => {
          console.log(res)
          _.setData({
            list: res.content.content,
            statusFilter: val
          });
        }
      })
    }else{
      const _ = this;
      request(urls.contractListBid, {
        method: 'POST',
        data: {
          status: val === 0 ? "" : val,
        },
        success: (res) => {
          console.log(res)
          _.setData({
            list: res.content.content,
            statusFilter: val
          });
        }
      })
    }
  },

  typeChange: function (e) {
    const val = this.data.customerType[e.detail.value].value;
    if (val === 0) {
      const _ = this;
      request(urls.contractList, {
        method: 'POST',
        data: {
          status: this.data.statusFilter === 0 ? '' : this.data.statusFilter,
        },
        success: (res) => {
          console.log(res)
          _.setData({
            list: res.content.content,
            typeFilter: val
          });
        }
      })
    } else {
      const _ = this;
      request(urls.contractListBid, {
        method: 'POST',
        data: {
          status: this.data.statusFilter === 0 ? '' : this.data.statusFilter,
        },
        success: (res) => {
          console.log(res)
          _.setData({
            list: res.content.content,
            typeFilter: val
          });
        }
      })
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
    this.getContractsNum();
    this.getContractsMsg();
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