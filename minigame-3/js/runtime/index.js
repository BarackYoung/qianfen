import BaseRender from "../base/BaseRender"
import PlayButton from "./PlayButton"
import DataBus from "../databus"

const screenWidth = wx.getSystemInfoSync().windowWidth
const screenHeight = wx.getSystemInfoSync().windowHeight

const BG_IMG_SRC = 'images/indexbg.png'

export default class Index extends BaseRender{
    constructor(ctx) {
        var img = new Image()
        img.src = BG_IMG_SRC
        super(ctx, img, 0, 0, screenWidth, screenHeight)
        let that = this
        that.ctx = ctx
        that.databus = new DataBus()
        that.databus.renderMap.set("index",that)
        that.addItem()
    }

    // 显示主页
    addItem(){
        let that = this
        that.playButton1 = new PlayButton(that.ctx, 1)
        that.playButton2 = new PlayButton(that.ctx, 2)
        that.databus.renderMap.set("playButton1",that.playButton1)
        that.databus.renderMap.set("playButton2",that.playButton2)
    }

}

