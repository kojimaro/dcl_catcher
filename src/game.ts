import utils from "../node_modules/decentraland-ecs-utils/index"

var isStraight = false
var isRight    = false
var isCatch    = false

class MoveForward {
    update() {
        if (isStraight && !isRight) {
            let transform = catcher.getComponent(Transform)
            let distance = Vector3.Forward().scale(0.1)
            transform.translate(distance)
        }
    }
}
engine.addSystem(new MoveForward())

class MoveRight {
    update() {
        if (!isStraight && isRight) {
            let transform = catcher.getComponent(Transform)
            let distance = Vector3.Right().scale(0.1)
            transform.translate(distance)
        }
    }
}
engine.addSystem(new MoveRight())

class Catch {
    update() {
        if (!isStraight && !isRight && isCatch) {
            let transform = catcher.getComponent(Transform)
            let distance = Vector3.Down().scale(0.1)
            transform.translate(distance)
        }
    }
}
engine.addSystem(new Catch())


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

function spawnCatcher() {
    const catcher = new Entity()
    catcher.addComponent(new ConeShape())

    const transform = new Transform()
    transform.position.set(2, 3, 5)
    catcher.addComponent(transform)
    
    catcher.addComponent(new Material())
    catcher.getComponent(Material).albedoColor = Color3.Red()

    engine.addEntity(catcher)
    return catcher
}

function spawnSphere() {
    const sphere = new Entity()
    sphere.addComponent(new SphereShape())

    const transform = new Transform()
    transform.position.set(6, 1, 8)
    transform.scale.set(0.5, 0.5, 0.5)
    sphere.addComponent(transform)
    
    sphere.addComponent(new Material())
    sphere.getComponent(Material).albedoColor = Color3.Yellow()

    engine.addEntity(sphere)
}

function spawnStraightBtn () {
    const straightBtn  = new Entity()
    straightBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(2, 1, 3)
    straightBtn.addComponent(transform)
    
    straightBtn.addComponent(new Material())
    straightBtn.getComponent(Material).albedoColor = Color3.Teal()

    straightBtn.addComponent(
        new OnPointerDown(e => {
            if (isStraight) {
                isStraight = false
            } else {
                isStraight = true
            }
        })
    )

    engine.addEntity(straightBtn )
    return straightBtn 
}

function spawnSlideBtn() {
    const slideBtn = new Entity()
    slideBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(4, 1, 3)
    slideBtn.addComponent(transform)
    
    slideBtn.addComponent(new Material())
    slideBtn.getComponent(Material).albedoColor = Color3.Magenta()

    slideBtn.addComponent(
        new OnPointerDown(e => {
            if (isRight) {
                isRight = false
            } else {
                isRight = true
            }
        })
    )

    engine.addEntity(slideBtn)
    return slideBtn
}

function spawnCatchBtn() {
    const catchBtn = new Entity()
    catchBtn.addComponent(new PlaneShape())

    const transform = new Transform()
    transform.position.set(6, 1, 3)
    catchBtn.addComponent(transform)
    
    catchBtn.addComponent(new Material())
    catchBtn.getComponent(Material).albedoColor = Color3.Magenta()

    catchBtn.addComponent(
        new OnPointerDown(e => {
            if (isCatch) {
                isCatch = false
            } else {
                isCatch = true
            }
        })
    )

    engine.addEntity(catchBtn)
    return catchBtn
}

const catcher = spawnCatcher()
const sphere = spawnSphere()
const straightBtn  = spawnStraightBtn ()
const slideBtn = spawnSlideBtn()
const catchBtn = spawnCatchBtn()

addLabel("Straight", straightBtn)
addLabel("Right", slideBtn)
addLabel("Catch", catchBtn)