/*
 * @Author: 赵文元
 * @Date: 2018-07-31 14:48:32
 * @LastEditors: 赵文元
 * @LastEditTime: 2018-07-31 17:58:48
 * @Description: 新线索页面
 */
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ["农、林、牧、渔业","采矿业","制造业","电力、热力、燃气及水的生产和供应业","环境和公共设施管理业","建筑业","交通运输、仓储业和邮政业","信息传输、计算机服务和软件业","批发和零售业","住宿、餐饮业","金融、保险业","房地产业","租赁和商务服务业","科学研究、技术服务和地质勘查业","水利、环境和公共设施管理业","居民服务和其他服务业","教育","卫生、社会保障和社会服务业","文化、体育、娱乐业","综合（含投资类、主业不明显）","其它"],
    index: 0,
    mode: 'aspectFit',
    region: ["北京市", "北京市", "东城区"],
    src:'../../images/sdjylq.png',
    phoneCheckMsg: '',
    companyCheckMsg: '',
    detailCheckMsg: '',
    customerCheckMsg: ''
  },
  inputChange: function(val, inputType, reg) {
    let msg = "";
    if(!reg.test(val)) {
      if(inputType === 'phone') {
        msg = "手机号码";
      }
      msg += (val ? "格式不正确" : "不能为空");
    }
    const obj = {};
    obj[('' + inputType)] = val;
    obj[(inputType + 'CheckMsg')] = msg;
    this.setData({...obj});
  },
  companyChangeOver: function(e) {
    console.log(e.detail.value);
    if(e.detail.value===''){
      this.setData({
        companyCheckMsg: '公司名称不能为空'
      })
    } else {
      this.setData({
        companyCheckMsg: ''
      })
    }
  },
  detailChangeOver: function(e) {
    console.log(e.detail.value);
    if(e.detail.value===''){
      this.setData({
        detailCheckMsg: '详细地址不能为空'
      })
    } else {
      this.setData({
        detailCheckMsg: ''
      })
    }
  },
  customerChangeOver: function(e) {
    console.log(e.detail.value);
    if(e.detail.value===''){
      this.setData({
        customerCheckMsg: '联系人名称不能为空'
      })
    } else {
      this.setData({
        customerCheckMsg: ''
      })
    }
  },
  phoneChangeOver: function(e) {
    this.inputChange(e.detail.value,'phone', regs.PHONE);
  },
  imageError: function (e){
    console.log('image加载失败，错误信息为', e.detail.errMsg);
  },
  formSubmit: function (e){
    console.log('form提交内容为',e.detail.value);
    let value = e.detail.value;
    const areaName = `${value.areaName[0]},${value.areaName[1]},${value.areaName[2]}`;
    let that = this;
    const industryName = that.data.array[value.industryName];
    console.log(industryName,'处理后的行业名称');
    if(value.companyName!==''&&value.areaName!==''&&value.detailAddr!==''&&value.customerName!==''&&value.customerPhone!==''){
      const userInfo = wx.getStorageSync('userInfo')
      request(urls.submitClueUrl,{
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {
          "createBy": userInfo.id,
          "region_name": areaName,
          "companyName": value.companyName,
          "contactName": value.customerName,
          "contactMobile": value.customerPhone,
          "detailedAddress":  value.detailAddr,
          "type": 'PRIVATE',
          "tenantId": userInfo.tenantId,
          "tenantName": userInfo.tenantName,
          "industryName": industryName,
          "power": value.power===""?0 : value.power
        },
        success: function (res) {
          console.log(res,'页面内的res');
          if(res.code===0){
            wx.showToast({
              title:'提交成功',
              icon: 'success',
              duration: 2000
            });
            wx.navigateBack(
              {
                url: "../clues/clues"
              }
            );
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: function () {
          // fail
          wx.showToast({
            title:'提交失败'+res.message,
            icon: 'none',
            duration: 2000
          });
          wx.navigateBack({
            url: "../clues/clues"
          });
        },
        complete: function () {
          // complete

        }
      });
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000
      });
    }
  },
  formReset: function () {
    console.log('form重置');
    this.setData({
      index: 20,
      phoneCheckMsg:'',
      companyCheckMsg: '',
      detailCheckMsg: '',
      customerCheckMsg: ''
    });
    wx.navigateBack({
      url: "../clues/clues"
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },
})