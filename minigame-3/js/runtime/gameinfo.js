
let instance = null
export default class GameInfo {
 
  constructor() {
    let that = this
    if (instance) return instance

    instance = that
   
    that.room = null
  }

}
