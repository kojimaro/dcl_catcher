import { GameData } from "./gameData";

const SPEED = 0.4

export function spawnCatcher() {
    const catcher = new Entity()
    catcher.addComponent(new ConeShape())

    const transform = new Transform()
    transform.position.set(2, 3, 5)
    catcher.addComponent(transform)
    
    catcher.addComponent(new Material())
    catcher.getComponent(Material).albedoColor = Color3.Red()

    return catcher
}

export function spawnStraightBtn (gameData) {
    const straightBtn  = new Entity()
    straightBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(2, 1, 3)
    straightBtn.addComponent(transform)
    
    straightBtn.addComponent(new Material())
    straightBtn.getComponent(Material).albedoColor = Color3.Teal()

    const label = new TextShape("Straight")
    label.fontSize = 2
    label.zIndex = 5
    straightBtn.addComponent(label);

    straightBtn.addComponent(
        new OnPointerDown(e => {
            if (gameData.canStraight && gameData.count !== 0) {
                if (gameData.isStraight) {
                    gameData.isStraight  = false
                    gameData.canStraight = false
                    gameData.canRight    = true
                    straightBtn.getComponent(TextShape).value = "Straight"
                } else {
                    straightBtn.getComponent(TextShape).value = "Stop"
                    gameData.isStraight  = true
                    gameData.count--
                }
            } 
        })
    )
    return straightBtn
}

export function spawnRightBtn(gameData) {
    const rightBtn = new Entity()
    rightBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(4, 1, 3)
    rightBtn.addComponent(transform)
    
    rightBtn.addComponent(new Material())
    rightBtn.getComponent(Material).albedoColor = Color3.Magenta()

    const label = new TextShape("Right")
    label.fontSize = 2
    label.zIndex = 5
    rightBtn.addComponent(label);

    rightBtn.addComponent(
        new OnPointerDown(e => {
            if(gameData.canRight && gameData.count !== 0) {
                if (gameData.isRight) {
                    gameData.isRight  = false
                    gameData.canRight = false
                    gameData.canDown  = true
                    rightBtn.getComponent(TextShape).value = "Right"
                } else {
                    rightBtn.getComponent(TextShape).value = "Stop"
                    gameData.isRight  = true
                    gameData.count--
                }
            }
        })
    )
    return rightBtn
}

export class MoveForward {
    game: GameData
    catcher: IEntity
    constructor(gameData, catcher) {
        this.game    = gameData
        this.catcher = catcher
    }
    update() {
        if (this.game.isStraight && this.game.canStraight) {
            let transform = this.catcher.getComponent(Transform)
            let distance = Vector3.Forward().scale(SPEED)
            transform.translate(distance)
        }
    }
}

export class MoveRight {
    game: GameData
    catcher: IEntity
    constructor(gameData, catcher) {
        this.game    = gameData
        this.catcher = catcher
    }
    update() {
        if (this.game.isRight && this.game.canRight) {
            let transform = this.catcher.getComponent(Transform)
            let distance = Vector3.Right().scale(SPEED)
            transform.translate(distance)
        }
    }
}