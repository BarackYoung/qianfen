
let instance = null

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    let that = this
    if (instance) return instance

    instance = that
   
    //渲染图像
    that.renderMap = new Map()

    //用户信息
    that.user = new Object()
    that.user.login = false
  }



}
