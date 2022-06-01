import BaseRender from "../base/BaseRender";
import DataBus from "../databus";
import Background from "./background"
import GameInfo from "./gameinfo"

const IMG_SCR =  'images/button1.png'
const IMG_SCR2 =  'images/button2.png'
const screenWidth = wx.getSystemInfoSync().windowWidth
wx.cloud.init()
const db = wx.cloud.database()
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
              var databus = new DataBus()
                if(!databus.user.login) {
                  wx.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000
                  })
                  return
                }
              if(that.buttonType == 1) {
                // 创建房间
                var room = new Object()
                // 本轮叫主的人
                room.jiaozhuIndex=0
                // 主牌 0为方片 1为红桃 2为黑桃 3为梅花
                room.main_card=0
                // 本轮得打
                room.master = []
                // 打牌成员
                room.members = []
                // 先把自己加进去
                room.members.push(databus.user)
                // 本轮得打几分
                room.score = 75
                // 插入数据库
                db.collection('room').add({
                  data: room,
                  success: function(res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    room._id=res._id
                    var gameInfo = new GameInfo()
                    gameInfo.room = room
                    // 当前界面消失
                    databus.clear()
                    // 进入游戏界面
                    new Background(that.ctx)
                  }
                })

              }
          }
        }))
    

      }
}