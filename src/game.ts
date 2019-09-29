import utils from "../node_modules/decentraland-ecs-utils/index"
import { spawner } from "./modules/items";
import { spawnCatcher, spawnStraightBtn, spawnRightBtn, MoveForward, MoveRight } from "./modules/catcher";
import { hitSystem } from "./modules/hitSystem";
import { spawnDownBtn, Down } from "./modules/downBtn";
import { GameData } from "./modules/gameData"
import { CountSystem } from "./modules/counter"
import { ButtonSystem } from "./modules/buttonSystem"
import { getRandomInt } from "./modules/utils"
import { items } from "./modules/items";

export var gameData = new GameData()

let textOffset = new Transform({
    position: new Vector3(0, 2, 0)
})

function addLabel(text: string, parent: IEntity){
	let label = new Entity()
	label.setParent(parent)
	label.addComponent(new Billboard())
	label.addComponent(textOffset)
	label.addComponent(new TextShape(text))
	label.getComponent(TextShape).fontSize = 3
    label.getComponent(TextShape).color = Color3.Blue()
	
	engine.addEntity(label)
}

function spawnStartBtn () {
    const startBtn  = new Entity()
    startBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(2, 1.4, 5.5)
    transform.rotation.eulerAngles = new Vector3(0, -180, 0)
    startBtn.addComponent(transform)
    
    const gltfShape_8 = new GLTFShape('models/Computer_01/Computer_01.glb')
    startBtn.addComponentOrReplace(gltfShape_8)

    const clip = new AudioClip('sounds/robot-startup2.mp3')
    const source = new AudioSource(clip)
    startBtn.addComponent(source)

    startBtn.addComponent(
        new OnPointerDown(e => {
            source.playOnce()
            init()
        })
    )
    return startBtn 
}

function init() {
    gameData.score       = 0
    gameData.count       = 9
    gameData.isStraight  = false
    gameData.isRight     = false
    gameData.isDown      = false
    gameData.canStraight = true
    gameData.canRight    = false
    gameData.canDown     = false
    scoreLabel.value     = 'SCORE: 0'
    countLabel.color     = Color4.White()

    let startPos = catcher.getComponent(Transform).position
    let endPos = new Vector3(2, 2, 8)
    catcher.addComponent(new utils.MoveTransformComponent(startPos, endPos, 0.1))

    while (items.entities.length) {
        engine.removeEntity(items.entities[0])
    }
    spawner.removeEntity()

    for (var i = 0; i < 3; i++) {
        spawner.spawnEntity(
            getRandomInt(1, 3),
            getRandomInt(4, 15), 
            0, 
            getRandomInt(9, 15)
        )
    }
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

engine.addSystem(new MoveForward(gameData, catcher))
engine.addSystem(new MoveRight(gameData, catcher))
engine.addSystem(new hitSystem(catcher))
engine.addSystem(new Down(catcher, gameData, scoreLabel))
engine.addSystem(new CountSystem(gameData, countLabel))
engine.addSystem(new ButtonSystem(gameData, straightBtn, rightBtn, downBtn))


/** generate */
const groundFloorSciFi_02 = new Entity()
const gltfShape = new GLTFShape('models/GroundFloorSciFi_02/GroundFloorSciFi_02.glb')
groundFloorSciFi_02.addComponentOrReplace(gltfShape)
const transform_2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_02.addComponentOrReplace(transform_2)
engine.addEntity(groundFloorSciFi_02)

const dock_Ramp_01 = new Entity()
const gltfShape_5 = new GLTFShape('models/Dock_Ramp_01/Dock_Ramp_01.glb')
dock_Ramp_01.addComponentOrReplace(gltfShape_5)
const transform_6 = new Transform({
  position: new Vector3(1, 0, 0.5),
  scale: new Vector3(1, 1, 1)
})
transform_6.rotation.eulerAngles = new Vector3(0, 180, 0)
dock_Ramp_01.addComponentOrReplace(transform_6)
engine.addEntity(dock_Ramp_01)

const dock_Ramp_02 = new Entity()
dock_Ramp_02.addComponentOrReplace(gltfShape_5)
const transform_6_1 = new Transform({
  position: new Vector3(13, 0, 3.5),
  scale: new Vector3(1, 1, 1)
})
transform_6_1.rotation.eulerAngles = new Vector3(0, 90, 0)
dock_Ramp_02.addComponentOrReplace(transform_6_1)
engine.addEntity(dock_Ramp_02)

const dock_Straight_01 = new Entity()
const gltfShape_6 = new GLTFShape('models/Dock_Straight_01/Dock_Straight_01.glb')
dock_Straight_01.addComponentOrReplace(gltfShape_6)
const transform_7 = new Transform({
  position: new Vector3(7, 1, 6.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
dock_Straight_01.addComponentOrReplace(transform_7)
engine.addEntity(dock_Straight_01)

const dock_Straight_01_2 = new Entity()
dock_Straight_01_2.addComponentOrReplace(gltfShape_6)
const transform_8 = new Transform({
  position: new Vector3(4, 1, 6.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
dock_Straight_01_2.addComponentOrReplace(transform_8)
engine.addEntity(dock_Straight_01_2)

const dock_Straight_01_3 = new Entity()
dock_Straight_01_3.addComponentOrReplace(gltfShape_6)
const transform_9 = new Transform({
  position: new Vector3(10, 1, 6.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
dock_Straight_01_3.addComponentOrReplace(transform_9)
engine.addEntity(dock_Straight_01_3)

const floorHexa_02 = new Entity()
const gltfShape_7 = new GLTFShape('models/FloorHexa_02/FloorHexa_02.glb')
floorHexa_02.addComponentOrReplace(gltfShape_7)
const transform_11 = new Transform({
  position: new Vector3(5, 1.4, 5.5),
  scale: new Vector3(1, 1, 1)
})
transform_11.rotation.eulerAngles = new Vector3(0, -90, 0)
floorHexa_02.addComponentOrReplace(transform_11)
engine.addEntity(floorHexa_02)

const floorHexa_02_2 = new Entity()
floorHexa_02_2.addComponentOrReplace(gltfShape_7)
const transform_12 = new Transform({
  position: new Vector3(7, 1.4, 5.5),
  scale: new Vector3(1, 1, 1)
})
transform_12.rotation.eulerAngles = new Vector3(0, -90, 0)
floorHexa_02_2.addComponentOrReplace(transform_12)
engine.addEntity(floorHexa_02_2)

const floorHexa_02_3 = new Entity()
floorHexa_02_3.addComponentOrReplace(gltfShape_7)
const transform_13 = new Transform({
  position: new Vector3(9, 1.4, 5.5),
  scale: new Vector3(1, 1, 1)
})
transform_13.rotation.eulerAngles = new Vector3(0, -90, 0)
floorHexa_02_3.addComponentOrReplace(transform_13)
engine.addEntity(floorHexa_02_3)

const tableSciFi_02 = new Entity()
const gltfShape_9 = new GLTFShape('models/TableSciFi_02/TableSciFi_02.glb')
tableSciFi_02.addComponentOrReplace(gltfShape_9)
const transform_15 = new Transform({
  position: new Vector3(8, 0, 2),
  scale: new Vector3(1, 1, 1)
})
transform_15.rotation.eulerAngles = new Vector3(0, 180, 0)
tableSciFi_02.addComponentOrReplace(transform_15)
engine.addEntity(tableSciFi_02)

const plantSF_13_2 = new Entity()
const gltfShape_3 = new GLTFShape('models/PlantSF_13/PlantSF_13.glb')
plantSF_13_2.addComponentOrReplace(gltfShape_3)
const transform_16 = new Transform({
  position: new Vector3(7.5, 1, 2),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
plantSF_13_2.addComponentOrReplace(transform_16)
engine.addEntity(plantSF_13_2)

const plantSF_09 = new Entity()
const gltfShape_10 = new GLTFShape('models/PlantSF_09/PlantSF_09.glb')
plantSF_09.addComponentOrReplace(gltfShape_10)
const transform_17 = new Transform({
  position: new Vector3(8.5, 1, 2),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
plantSF_09.addComponentOrReplace(transform_17)
engine.addEntity(plantSF_09)

const antenna_01 = new Entity()
const gltfShape_11 = new GLTFShape('models/Antenna_01/Antenna_01.glb')
antenna_01.addComponentOrReplace(gltfShape_11)
const transform_18 = new Transform({
  position: new Vector3(3.3, 1.4, 5.5),
  scale: new Vector3(1, 1, 1)
})
antenna_01.addComponentOrReplace(transform_18)
engine.addEntity(antenna_01)