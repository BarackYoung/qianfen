
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
    that.indexpage=["index","playButton1","playButton2","userInfoUI","scoreUI"]
  }

  clear(){
    let that = this
    for (let value of that.renderMap.values()) {
      value.show = false
    } 
  }

  showIndex() {
    let that = this
    for (var i = 0; i < that.indexpage.length; i++) {
      that.renderMap.get(that.indexpage[i]).show = true
    }
  }

}
