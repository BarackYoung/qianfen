import BaseRender from "../base/BaseRender";
import DataBus from "../databus";
import Exit from "./exit";

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.png'
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */

export default class BackGround extends BaseRender{

  constructor(ctx) {
    var img = new Image()
    img.src = BG_IMG_SRC
    super(ctx,img,0,0,screenWidth,screenHeight)
    let that = this
    that.databus = new DataBus()
    that.databus.renderMap.set("background",that)
    that.addItem()
  }

  addItem() {
    let that = this
    var exit = new Exit(that.ctx)
    that.databus.renderMap.set("exit",exit)
  }
}
