import { GameData } from "./gameData";

export class ButtonSystem {
    game: GameData
    straightBtn: IEntity
    rightBtn: IEntity
    downBtn: IEntity
    constructor(gameData, straightBtn, rightBtn, downBtn) {
        this.game        = gameData
        this.straightBtn = straightBtn
        this.rightBtn    = rightBtn
        this.downBtn     = downBtn
    }
    update() {
        if (this.game.canStraight) {
            this.straightBtn.getComponent(Material).albedoColor = Color3.Green()
        } else {
            this.straightBtn.getComponent(Material).albedoColor = Color3.Gray()
        }

        if (this.game.canRight) {
            this.rightBtn.getComponent(Material).albedoColor = Color3.Green()
        } else {
            this.rightBtn.getComponent(Material).albedoColor = Color3.Gray()
        }

        if (this.game.canDown) {
            this.downBtn.getComponent(Material).albedoColor = Color3.Green()
        } else {
            this.downBtn.getComponent(Material).albedoColor = Color3.Gray()
        }
    }
}