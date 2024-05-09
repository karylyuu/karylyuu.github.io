class SpriteAnimation {
    lastTime = 0
    clips = {}
    currentClip = ''
    currentFrame = 0
    currentIndex = 0
    frameTime = 0

    constructor(tilesX, tilesY, id) {
        this.element = document.querySelector(id)
        this.tilesX = tilesX
        this.tilesY = tilesY
    }

    displayFrame(index) {
        if(!this.element || index == this.currentIndex) return
        this.currentIndex = index
        this.element.style.backgroundPosition = `${100 * (index % this.tilesX) / (this.tilesX - 1)}% ${100 * Math.floor(index / this.tilesY) / (this.tilesX - 1)}%`
    }

    addClip(name, animation) {
        this.clips[name] = animation
    }

    play(name) {
        if(this.clips[name]) this.currentFrame %= this.clips[name].length
        this.currentClip = name
    }

    update(time) {
        if(this.clips[this.currentClip]) {
            this.frameTime += Math.min(time - this.lastTime, 1000)
            if(this.frameTime > this.clips[this.currentClip][this.currentFrame].time) {
                this.frameTime -= this.clips[this.currentClip][this.currentFrame].time
                this.currentFrame = (this.currentFrame + 1) % this.clips[this.currentClip].length
            }
            this.displayFrame(this.clips[this.currentClip][this.currentFrame].index)
        }

        this.lastTime = time
    }
}
