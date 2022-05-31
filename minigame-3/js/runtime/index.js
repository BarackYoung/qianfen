import BaseRender from "../base/BaseRender"
import PlayButton from "./PlayButton"
import DataBus from "../databus"
import UserInfoUI from "./userInfoUI"
import ScoreUI from "./scoreUI"

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
        var playButton1 = new PlayButton(that.ctx, 1)
        var playButton2 = new PlayButton(that.ctx, 2)
        that.databus.renderMap.set("playButton1",playButton1)
        that.databus.renderMap.set("playButton2",playButton2)
        // 头像信息
        var userInfoUI = new UserInfoUI(that.ctx)
        that.databus.renderMap.set("userInfoUI",userInfoUI)
        that.databus.renderMap.set("scoreUI", new ScoreUI(that.ctx))
    }

}

