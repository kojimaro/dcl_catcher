import utils from "../../node_modules/decentraland-ecs-utils/index"
import { items, ItemData } from "./items";
import { GameData } from "./gameData";

export function spawnDownBtn(gameData, catcher) {
    const catchBtn = new Entity()
    catchBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(9, 1.8, 6)
    catchBtn.addComponent(transform)
    
    catchBtn.addComponent(new Material())
    catchBtn.getComponent(Material).albedoColor = Color3.Gray()

    const label = new TextShape("Down")
    label.fontSize = 2
    label.zIndex = 5
    catchBtn.addComponent(label);

    catchBtn.addComponent(
        new OnPointerDown(e => {
            if (gameData.canDown) {
                if (gameData.isDown) {
                    returnCatcher(catcher, gameData, catchBtn)
                } else {
                    gameData.isDown = true
                    gameData.count--

                    catchBtn.getComponent(TextShape).value = "Return"
                }
            }
        })
    )
    return catchBtn
}

export class Down {
    catcher: IEntity
    game: GameData
    scoreLabel: TextShape

    constructor(catcher, gameData, scoreLabel) {
        this.catcher    = catcher,
        this.game       = gameData,
        this.scoreLabel = scoreLabel 
    }
    update() {
        let catcherY = this.catcher.getComponent(Transform).position.y
        if (this.game.isDown && this.game.canDown) {
            if (catcherY > 0.5) {
                let transform = this.catcher.getComponent(Transform)
                let distance = Vector3.Down().scale(1)
                transform.translate(distance)
                removeEntity(this.scoreLabel, this.game);
            }
        }
    }
}

function removeEntity(scoreLabel, gameData) {
    for (let item of items.entities) {
        if (item.getComponent(ItemData).isHit) {
            updateScore(scoreLabel, item.getComponent(ItemData).score, gameData);
            engine.removeEntity(item)
        }
    }
}

function updateScore(scoreLabel, score, gameData) {
    gameData.score += score 
    scoreLabel.value = "SCORE: " + gameData.score.toString()
}

function returnCatcher(catcher, gameData, catchBtn) {
    gameData.isDown  = false
    gameData.canDown = false

    let startPos = catcher.getComponent(Transform).position
    let endPos = new Vector3(2, 2, 8)
    catcher.addComponent(new utils.MoveTransformComponent(startPos, endPos, 1, () => {
        if (gameData.count === 0) {
            gameData.canStraight = false
        } else {
            gameData.canStraight = true
        }
        catchBtn.getComponent(TextShape).value = "Down"
    }))
}