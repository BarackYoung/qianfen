import BaseRender from "../base/BaseRender";
import DataBus from "../databus"
const screenWidth = wx.getSystemInfoSync().windowWidth
const IMG_SCR =  'images/score/score1.png'

export default class ScoreUI extends BaseRender {
  constructor(ctx) {
    var databus = new DataBus()
    var img = new Image()
    super(ctx,img,100,60+screenWidth/10,screenWidth/5,screenWidth/5)
    this.databus = databus
    console.log(this.databus)
  }

  render() {
    let that = this
    if(!that.show) {
      return
  }
    if (!that.databus.user.login) {
      that.img.src = IMG_SCR
    }else {
      var score = that.databus.user.score/5 + 1;
      if(score > 5) {
         score = 5
      }
      score = Math.trunc(score)
      that.img.src = "images/score/score"+score+".png"
    }
    that.ctx.drawImage(that.img,that.x,that.y,that.width,that.height)
  }
}