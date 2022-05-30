export default class {
    constructor(ctx, img, x, y, width, height){
        let that = this
        that.x = x
        that.ctx=ctx
        that.img = img
        that.y = y
        that.width = width
        that.height = height
        that.show = true
    }
    
    render(){
        let that = this
        if(!that.show) {
            return
        }
        that.ctx.drawImage(that.img,that.x,that.y,that.width,that.height)
    }
}