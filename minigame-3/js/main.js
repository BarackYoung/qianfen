
import BackGround from './runtime/background'
import DataBus from './databus'
import Index from './runtime/index'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
canvas.width = screenWidth
canvas.height = screenHeight
const ctx = canvas.getContext('2d')
wx.cloud.init()

/**
 * 游戏主函数
 */
export default class Main {

  constructor() {
    let that = this
    that.aniId = 0

    that.dataBus = new DataBus()
    that.localLogin()
    new Index(ctx)

    that.render()
  }

  localLogin() {
    let that = this
    wx.getStorage({
      key: 'user',
      success (res) {
        console.log(res)
        that.dataBus.user = JSON.parse(res.data)
      }
    })
  }

  loop() {
    let that = this
    that.render()

    that.aniId = window.requestAnimationFrame(
      that.bindLoop,
      canvas
    )
  }
    /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    let that = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    that.bindLoop = that.loop.bind(that)

    // // 清除上一局的动画
    window.cancelAnimationFrame(that.aniId)

    //渲染databus中的所有对象
    for (let value of that.dataBus.renderMap.values()) {
      value.render()
    }

    that.aniId = window.requestAnimationFrame(
     that.bindLoop,
      canvas
    )

  }
  
  touchEventHandler(e) {
    e.preventDefault()

    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    console.log(x)
    console.log(y)
  }


  
}
