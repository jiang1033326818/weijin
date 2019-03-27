0
// pages/home/home.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();
var interval = null //倒计时函数
const tabs = [{
    name: "产品中心"
  },
  {
    name: "知识库"
  },
];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    clueNum: 0,
    taskNum: 0,
    height: 1200,
    customerNum: 0,
    powerTotal: 0,
    userInfo: {}, // 登录用户的信息
    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: 0, //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    currentTime: 61,
    phone: '',
    keykey: 0,
    phonecode: "",
    display: "none",
    getknowledge: [],
    indextab: 0,
    getknownav: [],
    imgUrls: [{
      link: '/pages/index/index',
      url: 'http://zadai.net:8000/uploads/image001.jpg'
    }, {
      link: '/pages/logs/logs',
      url: 'http://zadai.net:8000/uploads/image002.jpg'
    }, {
      link: '/pages/index/index',
      url: 'http://zadai.net:8000/uploads/image003.jpg'
    }],
    typeList: [{
        image: 'http://zadai.net:8000/uploads/xyk.png',
        name: "微金二号",
        label: '123人申请',
        amount: '10-100万',
        from: "0.89%",
      https: 'https://zadai.net/alost.html',
        belong: [
          "房产",
          "先息后本"
        ],
      },
    ],

    typeList0: [{
        image: 'http://zadai.net:8000/uploads/blank.png',
        name: "微金二号",
        label: '123人申请',
        amount: '10-100万',
        from: "0.89%",
      https: 'https://zadai.net/alost.html',
        belong: [
          "房产",
          "先息后本"
        ],
      },
    
    ],

    indicatorDots: true, //小点
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 1000, //滑动时间
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    currentTab2: 0,
    navScrollLeft: 0,
    loanType: "热门",
    i: '',
    navData: [{
        text: '热门'
      },
      // {
      //   text: '服务'
      // },
      {
        text: '信用'
      },

    ],
    navData2: [{
      typeName: '热门知识',id:0,
      },
  ]
    },
    // 导航点击滑动

    bindChange: function(e) {

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
    navTabClick: function(e) {
      // console.log(this.data.height)
      console.log(e.currentTarget.id)

      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },

    switchNav(event) {

      if (this.data.keykey === 0) {
        this.setData({
          keykey: 1
        })
      } else {
        this.setData({
          keykey: 0
        })
      }

      var cur = event.currentTarget.dataset.current;
      console.log(event)
      //每个tab选项宽度占1/5
      var singleNavWidth = this.data.windowWidth / 5;
      //tab选项居中                            
      // this.setData({
      //   navScrollLeft: (cur - 2) * singleNavWidth
      // })
      if (this.data.currentTab == cur) {
        return false;
      } else {
        this.setData({
          currentTab: cur
        })
      }
    },


    switchNav2(event) {
      var chanpinid=event.currentTarget.dataset.chanpin
      this.knowledge(chanpinid)






      var cur = event.currentTarget.dataset.current;
      wx: wx.setStorageSync("nid", event.currentTarget.dataset.current)
      console.log(event,2222)
      //每个tab选项宽度占1/5
      var singleNavWidth = this.data.windowWidth / 5;
      //tab选项居中                            
      // this.setData({
      //   navScrollLeft: (cur - 2) * singleNavWidth
      // })
      if (this.data.currentTab2 == cur) {
        return false;
      } else {
        this.setData({
          currentTab2: cur
        })
      }
    },

    //关闭弹窗
    closeshow: function() {
      this.setData({
        display: "none"
      })
    },

    //获取验证码
    getCode: function(options) {
      var that = this;
      var currentTime = that.data.currentTime;
      wx.request({
        url: urls.mainurl + urls.getcode + that.data.phone,
        method: 'GET',
        header: {
          "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
        },
        data: {},
        success: function(response) {
          console.log(response)
          wx.showToast({
            title: '验证码发送成功',
            icon: 'none',
            duration: 2000
          })
        }
      })

      interval = setInterval(function() {
        currentTime--;
        that.setData({
          time: currentTime + '秒'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            time: '重新发送',
            currentTime: 61,
            disabled: false
          })
        }
      }, 1000)
    },

    getVerificationCode() {
      if (this.data.phone == '' || this.data.phone.length < 11) {
        wx.showToast({
          title: '请填写正确的手机号',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.getCode();
        var that = this
        that.setData({
          disabled: true
        })
      }
    },

    phone: function(e) {
      this.setData({
        phone: e.detail.value
      })
    },

    phonecode: function(e) {
      this.setData({
        phonecode: e.detail.value
      })
    },

    semb: function() {
      let that = this;
      if (that.data.phone === '' || that.data.phone.length < 11) {
      
      } else {
        if (that.data.phonecode === '') {
          wx.showToast({
            title: '请输入验证码',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.request({
            url: urls.mainurl + urls.bindphone + that.data.phonecode + "/" + that.data.phone,
            method: 'GET',
            header: {
              "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
            },
            data: {

            },
            success: function(response) {
              console.log(response)
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 2000
              })
              wx.setStorageSync("phone", that.data.phone)
              that.setData({
                display: "none"
              })
            },
            fail: function(err) {
              console.log(err)
              wx.showToast({
                title: '验证码错误',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }

    },

    // 跳转页面
    tophonetel: function() {
      wx.navigateTo({
        url: '../phonetel/phonetel'
      });
    },

    toapply: function(e) {
      console.log(e.currentTarget.id)
      wx.setStorageSync("loanid", e.currentTarget.id.slice(4))
      wx.navigateTo({
        url: '../apply/apply'
      });
    },

    tonew: function(e) {
      console.log(e)
      wx.setStorageSync("https", e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../zzzzz2/zzzzz2"
      });
    },
    //点击本地专家服务
    toexpert: function() {

      let a = wx.getStorageSync("phone")
      if (a && a.length == 11) {
        this.setData({
          display: "none"
        })
        wx.navigateTo({
          url: '../expert/expert'
        });
      } else {
        this.setData({
          display: "block"
        })
      }


    },

    //点击微金专家服务
    toconsultant: function() {
      console.log(wx.getStorageSync("phone"))
      let a = wx.getStorageSync("phone")
      console.log(a,8989)
      if (a && a.length == 11) {
        this.setData({
          display: "none"
        })
        wx.navigateTo({
          url: '../consultant/consultant'
        });
      } else {
        this.setData({
          display: "block"
        })
      }

    },

    //获取产品列表
  getloanall: function (e) {
      let that = this;
      wx.request({
        url: urls.mainurl + urls.getloanall,
        method: 'POST',
        header: {
          "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
        },
        data: {
          "pageNum": 0,
          "pageSize": 10,

        },
        success: function(response) {
          let data_0 = [];
          for (let i in response.data.data.dataList) {
            data_0.push(response.data.data.dataList[i])
          }
          for (let j in data_0) {
            if (data_0[j].tag) {
              data_0[j].tag = data_0[j].tag.split(",")
            }
          }
          console.log(data_0)

        

        },
        fail: function(err) {
          console.log(err)

        }
      })
    },



    //获取知识库导航栏
    knownav: function() {
      let that = this;
      wx.request({
        url: urls.mainurl + urls.knowtype,
        method: 'GET',
        header: {
          "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
        },
        data: {
          "pageNum": 0,
          "pageSize": 10,
        },
        success: function(e) {
          console.log(e, "eee")
          
          that.setData({
            navData2: e.data.data 
          })            
        },
        fail: function(err) {
          console.log(err)
        }
      })
    },
  
  //获取知识库
  knowledge: function (chanpinid) {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.knowlist,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        "pageNum": 0,
        "pageSize": 10,
          contentType: chanpinid
      },
      success: function(res) {
        console.log(res,"这是什么")
        for (let i in res.data.data.dataList)
          if (res.data.data.dataList[i] !== null) {
            that.setData({
              getknowledge: res.data.data.dataList
            })
            // console.log(res, 11)
          } else {
            getknowledge: res.data.data.dataList[i] = null
          }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  //跳转到详情
  toapply2: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.setStorageSync('knowid0', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../knowdetails/knowdetails'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getloanall(1);
    // this.getloanall();
    this.knowledge(1);
    this.knownav();
    //  this.knowtype();
    // this.knoweldgeid();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {

  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
})