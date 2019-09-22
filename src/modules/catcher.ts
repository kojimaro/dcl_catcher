import { catcherSystem } from "./catcherSystem"

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