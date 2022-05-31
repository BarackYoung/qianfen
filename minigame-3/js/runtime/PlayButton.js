import BaseRender from "../base/BaseRender";
import DataBus from "../databus";

const IMG_SCR =  'images/button1.png'
const IMG_SCR2 =  'images/button2.png'
const screenWidth = wx.getSystemInfoSync().windowWidth
export default class PlayButton extends BaseRender{
    constructor(ctx,buttonType){
      var img, width,height,x,y
      if (buttonType == 1) {
        img = new Image()
        img.src = IMG_SCR
        width = screenWidth/4
        height = width/3
        x = screenWidth - width - 50
        y = 80 
      }
      if (buttonType == 2) {
        img = new Image()
        img.src = IMG_SCR2
        width = screenWidth/4
        height = width/3
        x = screenWidth - width - 50
        y = 80 + height + 50 
      }
        super(ctx,img,x,y,width,height)
        let that = this
        that.initEvent()
        that.buttonType = buttonType
    }

    initEvent() {
        let that = this
        canvas.addEventListener('touchstart', ((e) => {
          if (!that.show) return  
          e.preventDefault()
    
          const x = e.touches[0].clientX
          const y = e.touches[0].clientY
          if (x > that.x && x < that.x + that.width && y > that.y && y < that.y + that.height) {
              console.log("button" +that.buttonType+ " touched!")
              if(that.buttonType == 1) {
                // var databus = new DataBus()
                // databus.renderMap.get("playButton2").show = false
              }
          }
        }))
    

      }
}