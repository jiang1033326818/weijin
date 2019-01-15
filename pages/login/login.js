//login.js
//获取应用实例
var WXBizDataCrypt = require('../../utils/cryptojs/RdWXBizDataCrypt.js');
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const MAXTIMECOUNT = 60;
const app = getApp();
Page({
  data: {
    phone: '17777777777', // 手机号
    phoneCheckMsg: '', // 手机号输入错误提示
    pwd: 'Aa123456',// 密码
    pwdCheckMsg: '', // 密码输入错误提示
    userInfo: {}, // 用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    codeSendBtnDisabled: false, // 发送验证码按钮控制
    urlParams: null,
    timeCount: 0, // 倒计时计数
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 输入校验
  inputChange: function(val, inputType, reg) {
    let msg = '';
    let backVal = true;
    if (!reg.test(val)) {
      if (inputType === 'phone') {
        msg = '手机号码';
      } else if (inputType === 'pwd') {
        msg = '密码';
      }
      msg += (val ? '格式不正确' : '不能为空');
      backVal = false;
    }
    const obj = {};
    obj[('' + inputType)] = val;
    obj[(inputType + 'CheckMsg')] = msg;
    this.setData({...obj});
    return backVal;   
  },
  // 手机号码输入结束
  phoneChangeOver: function(e) {
    this.inputChange(e.detail.value, 'phone', regs.PHONE);
  },
  // 短信验证码输入结束
  pwdChangeOver: function(e) {
    this.inputChange(e.detail.value, 'pwd', regs.NOTNONE);
  },
  // 点击发送验证码
  sendCode: function(e) {
    const { phone, phoneCheckMsg } = this.data;
    // 校验手机号
    if (phone && !phoneCheckMsg) {
      // 置灰按钮
      this.setData({
        codeSendBtnDisabled: true
      });
      request(urls.sendCodeUrl, {
        data: {

        },
        success: () => {
          // 设置定时器
          this.setData({ timeCount: MAXTIMECOUNT });
          const timer = setInterval(() => {
            if (this.data.timeCount) { // 倒计时
              this.setData({ timeCount: --this.data.timeCount });
            } else {
              this.setData({ codeSendBtnDisabled: false });
              clearInterval(timer); // 清除定时器
            }
          }, 1000)
        },
        fail: () => {
          this.setData({
            codeSendBtnDisabled: false
          });
        }
      })
    } else {
      this.inputChange(phone, 'phone', regs.PHONE);
    }
  },
  onLoad: function (params) {
    this.setData({
      urlParams: params
    });
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        //userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          jscode:app.globalData.jscode
        })
        
      }
      console.log(app.globalData)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const _ = this;
    // 登录
 

    wx.login({
      success(res) {
        let that = this;
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
            
          })
          console.log(333,res)
          wx.request( {
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
              appid: "wx0f95ffcd25a151de",
              secret: "bdb031b55a2eac8ddef19cecb9eadedb",
              js_code: res.code,
              grant_type:"authorization_code",
            },
            success: function (response)  {
              console.log(4444,response)
              var pc = new WXBizDataCrypt("wx0f95ffcd25a151de", response.data.session_key)
              wx.getUserInfo({
                success: function (res) {
                  //拿到getUserInfo（）取得的res.encryptedData, res.iv，调用decryptData（）解密
                  var data = pc.decryptData(res.encryptedData, res.iv)
                  // data.unionId就是咱们要的东西了
                  app.globalData.unionid = data.unionId
                  console.log('解密后 unionid: ', app.globalData.unionid)
                },
                fail: function (res) {
                  console.log(res)
                }
              })

            },
            fail: function(response)  {
              console.log(response, '失败了');
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 有权限信息，说明已经登录
    // if (app.globalData.authorization) {
    //   if (params && params.noAuthority) {
    //     wx.navigateBack({
    //       delta: 1,
    //     });
    //   } else {
    //     wx.switchTab({
    //       url: '../home/home'
    //     });
    //   }
    // }

  },
  // 登录
  login: function() {
  //   const { phone, pwd, urlParams } = this.data;
  //   if (this.inputChange(phone, 'phone', regs.PHONE) &&
  //     this.inputChange(pwd, 'pwd', regs.NOTNONE)
  //   ) {
  //     wx.login({
  //       success: function(res) {
  //         request(urls.loginUrl, {
  //           method: 'POST',
  //           data: {
  //             jscode: res.code,
  //             password: pwd,
  //             username: phone,
  //           },
  //           success: (res) => {
  //             if (res.code === 0) {
  //               // if (res.content.companyType !== 'SELLER') {
  //               //   wx.showToast({
  //               //     icon: 'none',
  //               //     title: '非售电方用户无法登陆微金网',
  //               //   });
  //               //   return;
  //               // }
  //               // 记录登录手机,测试账号的特殊处理
  //               app.globalData.phone = phone;
  //               if (urlParams && urlParams.noAuthority) {
  //                 wx.navigateBack({
  //                   delta: 1,
  //                 });
  //               } else {
                  wx.switchTab({
                    url: '../home/home'
                  });
  //               }
  //             } else {
  //               wx.showToast({
  //                 icon: 'none',
  //                 title: res.message,
  //               })
  //             }
  //           }
  //         })
  //       }
  //     });
  //   }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '获取用户信息失败',
      })
    }
  }
})
