
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.png'
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */

export default class BackGround {

  constructor(ctx) {
    let that = this
    that.ct = ctx;
    var img = new Image()
    img.src = BG_IMG_SRC
    that.img = img
    that.render()
  }
  
  render(){
    let that = this
    that.img.onload = function() {
      that.ct.drawImage(that.img,0,0,screenWidth,screenHeight)
    }
  }
}
