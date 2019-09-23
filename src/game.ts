import { spawner } from "./modules/items";
import { spawnCatcher, spawnStraightBtn, spawnRightBtn, MoveForward, MoveRight } from "./modules/catcher";
import { positions } from "./modules/positions";
import { hitSystem } from "./modules/hitSystem";
import { spawnDownBtn, Down } from "./modules/downBtn";
import { GameData } from "./modules/gameData"
import { CountSystem } from "./modules/counter"

export var gameData = new GameData()

let textOffset = new Transform({
    position: new Vector3(0, 1, 0)
})

function addLabel(text: string, parent: IEntity){
	let label = new Entity()
	label.setParent(parent)
	label.addComponent(new Billboard())
	label.addComponent(textOffset)
	label.addComponent(new TextShape(text))
	label.getComponent(TextShape).fontSize = 3
	label.getComponent(TextShape).color = Color3.Black()
	
	engine.addEntity(label)
}

function spawnStartBtn () {
    const startBtn  = new Entity()
    startBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(1, 1, 1)
    startBtn.addComponent(transform)
    
    startBtn.addComponent(new Material())
    startBtn.getComponent(Material).albedoColor = Color3.Teal()

    startBtn.addComponent(
        new OnPointerDown(e => {
            init()
        })
    )
    return startBtn 
}

function init() {
    gameData.score = 0
    gameData.count = 9
    gameData.canStraight = true
}

const canvas = new UICanvas()
const scoreLabel = new UIText(canvas)
scoreLabel.value = 'SCORE: 0'
scoreLabel.fontSize = 25
scoreLabel.width = 120
scoreLabel.height = 50
scoreLabel.vAlign = 'top'
scoreLabel.hAlign = 'center'

const timeCanvas = new UICanvas()
const countLabel = new UIText(timeCanvas)
countLabel.value = 'TIME: 100'
countLabel.fontSize = 25
countLabel.width = 120
countLabel.height = 50
countLabel.vAlign = 'top'
countLabel.hAlign = 'right'
countLabel.paddingRight = 5
countLabel.positionX = -80

const catcher     = engine.addEntity(spawnCatcher())
const startBtn    = engine.addEntity(spawnStartBtn())
const straightBtn = engine.addEntity(spawnStraightBtn(gameData))
const rightBtn    = engine.addEntity(spawnRightBtn(gameData))
const downBtn     = engine.addEntity(spawnDownBtn(gameData, catcher))

addLabel("GameStart", startBtn)
addLabel("1", straightBtn)
addLabel("2", rightBtn)
addLabel("3", downBtn)

for (let position of positions) {
    spawner.spawnEntity(position.x, position.y, position.z)
}

engine.addSystem(new MoveForward(gameData, catcher))
engine.addSystem(new MoveRight(gameData, catcher))
engine.addSystem(new hitSystem(catcher))
engine.addSystem(new Down(catcher, gameData, scoreLabel))
engine.addSystem(new CountSystem(gameData, countLabel))