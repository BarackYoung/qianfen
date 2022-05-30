
let instance = null

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    let that = this
    if (instance) return instance

    instance = that

    that.renderMap = new Map()
    that.curentRender = []
  }



}
