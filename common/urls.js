export default {
  mainurl: 'http://yindw.top:8000', // 全局接口地址
  loginUrl: '/login', // 登录接口
  localExpert: '/websocket/localExpert', // 聊天获取当前在线用户
  useradd: '/user/add', // 顾问申请
  londadd: '/loan/add', // 贷款申请,添加贷款信息
  getcode: '/user/sendSmsCheckCode/', // 获取验证码
  checkmessagecode: '/user/checkMessageCode/', // 验证验证码
  getHistoryMessage: '/websocket/getHistoryMessage', // 聊天记录   get
  bindphone: '/user/bondMobile/', // 绑定手机号
  getloanall: '/loan/get', // 查询所有贷款  post
  uploadimg: '/user/uploadImg', // 上传图片
  // submitClueUrl: '/api/clue/create', // 新增线索
  // addBilateralContract: '/api/contract/bilateral/add', // 新增双边合同接口
  // addBiddingContract: '/api/contract/bidding/add', // 新增月竞合同接口
  // contractList: '/api/contract/bilateral/list', //长协合同列表
  // contractListBid: '/api/contract/bidding/list', //月竟合同列表
  // contractsMsg: '/api/contract/summary', //合同汇总信息
  // contractsStatus: '/api/contract/status', //修改合同状态
  // companyLinkman: '/api/contract/', // 公司联系人列表
  // companyDetail: '/api/contract/', // 选定的公司详细信息
  // linkmanDetail: '/api/contract/', // 选定的联系人详细信息
  // companyList: '/api/contract/companies', // 已签订过合同的公司列表
  // companyInfo: '/api/company/summary', // 合同汇总信息
  // contractdetails:'/api/contract/', //查看合同详情
  // customerDetail: '/api/customer/', // 查看客户详情
  // getTasks: '/api/gather/${param}/list', // 获取任务列表
  // getContacts: '/api/customer/${param}/contact', // 获取客户联系人列表
  // getTaskDetail: '/api/gather/${param}/detail', // 获取申报任务详情
  // contactConfirm: '/api/gather/${param}/confirm', //确认发送联系人
  // biddingPowerReport: '/api/gather/${param}/bidding/report', // 申报月竞电量 
  // bilateralPowerReport: '/api/gather/${param}/bilateral/report', // 申报长协电量 
  // getCustomerNum: '/api/customer/count', // 获取客户数量
  // getClueNum: '/api/clue/count', // 获取线索数量
  // getTaskNum: '/api/gather/todo/count', // 获取申报任务数量
  // getUserInfo: '/api/login/info', // 获取登录用户信息
}