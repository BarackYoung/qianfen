import BaseRender from "../base/BaseRender";
import DataBus from "../databus";

const IMG_SCR =  'images/headimg.png'
const screenWidth = wx.getSystemInfoSync().windowWidth
wx.cloud.init()
const db = wx.cloud.database()
export default class UserInfoUI extends BaseRender{
    constructor(ctx){
        var img = new Image()
        img.src = IMG_SCR
        super(ctx,img,40,20,screenWidth/10,screenWidth/10)
        let that = this
        that.databus = new DataBus()
        that.initEvent()
    }

    render() {
        let that = this
        if(!that.show) {
            return
        }
        if (that.databus.user.login) {
            that.img.src = that.databus.user.headimg
            var nickname = that.databus.user.nickname
            that.ctx.drawImage(that.img,that.x,that.y,that.width,that.height)
            that.ctx.fillStyle="#FFFFFF"
            that.ctx.font = "18px serif";
            that.ctx.fillText(nickname, that.x + that.width + 7, that.y + that.height/2 + 9);
        }else {
            that.ctx.drawImage(that.img,that.x,that.y,that.width,that.height)
            that.ctx.font = "18px serif";
            that.ctx.fillStyle = "#FFFFFF"
            that.ctx.fillText("点击头像登录", that.x + that.width + 7, that.y + that.height/2 + 9);
        }
    }

    initEvent() {
        let that = this
        canvas.addEventListener('touchstart', ((e) => {
          if (!that.show) return  
          e.preventDefault()
          if(that.databus.user.login) {
              return
          }
          const x = e.touches[0].clientX
          const y = e.touches[0].clientY
          if (x > that.x && x < that.x + that.width && y > that.y && y < that.y + that.height) {
              console.log("button" +that.buttonType+ " touched!")
              wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                  console.log(res)  
                  wx.cloud.callFunction({
                    name: 'getUserInfo',
                    complete: res2 => {
                        console.log(res2)
                        that.databus.user.openid = res2.result.wxContext.OPENID
                        that.databus.user.login = true
                        that.databus.user.headimg = res.userInfo.avatarUrl
                        that.databus.user.nickname = res.userInfo.nickName
                        //查看是否已经注册
                        db.collection('user').where({
                            openid:  that.databus.user.openid
                          })
                          .get({
                            success: function(res) {
                              // res.data 是包含以上定义的两条记录的数组
                              console.log(res.data)
                              if (res.data.length == 0) {
                                  // 没有注册，上传信息到服务器
                                  // 段位设置为1
                                  that.databus.user.score = 1
                                  db.collection('user').add({
                                    // data 字段表示需新增的 JSON 数据
                                    data: that.databus.user,
                                    success: function(res) {
                                        wx.showToast({
                                            title: '注册成功',
                                            icon: 'success',
                                            duration: 2000
                                          })
                                          console.log("储存本地的对象")
                                          console.log(that.databus.user)  
                                          wx.setStorage({
                                              key:"user",
                                              data:JSON.stringify(that.databus.user)
                                            })
                                      },
                                      fail: function(res) {
                                        console.log(res)  
                                        wx.showToast({
                                            title: '注册失败',
                                            icon: 'error',
                                            duration: 2000
                                          })
                                      }
                                  })
                              }else {
                                  //已经注册，更新信息
                                  console.log("获取到的注册信息")
                                  console.log(res.data[0])
                                  that.databus.user = res.data[0]
                                  console.log("储存本地的对象")
                                  console.log(that.databus.user)  
                                  wx.setStorage({
                                      key:"user",
                                      data:JSON.stringify(that.databus.user)
                                    })
                              }
                            }
                          })
                    }
                  })
                  console.log(that.databus.user)
                }
              })
          }
        }))
    

      }
}