export class TimerSystem {
    time: number
    timeLabel: TextShape
    constructor(time, timeLabel) {
        this.time = time,
        this.timeLabel = timeLabel
    }
    update() {
        if (this.time === 0) {
            this.timeLabel.value = "TIME: 0"
            this.timeLabel.color = Color3.Red()
        } else {
            let time = this.time--
            this.timeLabel.value = "TIME: " + time.toString()
            
        }
    }
}