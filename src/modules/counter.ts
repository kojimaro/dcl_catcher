import { GameData } from "./gameData";

export class CountSystem {
    game: GameData
    countLabel: TextShape
    constructor(gameData, countLabel) {
        this.game = gameData,
        this.countLabel = countLabel
    }
    update() {
        if (this.game.count === 0) {
            this.countLabel.value = "COUNT: 0"
            this.countLabel.color = Color3.Red()
        } else {
            this.countLabel.value = "COUNT: " + this.game.count.toString()
        }
    }
}