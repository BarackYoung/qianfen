import BaseRender from "../base/BaseRender"
import DataBus from "../databus"


const IMG_SRC="images/exit.png"
const screenWidth = wx.getSystemInfoSync().windowWidth

export default class Exit extends BaseRender{
    constructor(ctx) {
        var img = new Image()
        img.src = IMG_SRC
        super(ctx,img, 10,10,screenWidth/15,screenWidth/15)
        this.initEvent()
    }

    initEvent() {
        let that = this
        canvas.addEventListener('touchstart', ((e) => {
          if (!that.show) return  
          e.preventDefault()
    
          const x = e.touches[0].clientX
          const y = e.touches[0].clientY
          if (x > that.x && x < that.x + that.width && y > that.y && y < that.y + that.height) {
              console.log("exit button")
              wx.showModal({
                title: '提示',
                content: '确定退出游戏吗？',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    var databus = new DataBus()
                    databus.clear()
                    databus.showIndex()
                    //退出游戏
                    
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
          }
        }))
    

      }
}