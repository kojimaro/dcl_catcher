import { items, ItemData } from "./items";

export class hitSystem {
    catcher: IEntity
    constructor(catcher: IEntity) {
        this.catcher = catcher
    }
    update() {
        let catcherX = this.catcher.getComponent(Transform).position.x
        let catcherZ = this.catcher.getComponent(Transform).position.z

        for (let item of items.entities) {
            let startX = item.getComponent(Transform).position.x - 1
            let endX   = item.getComponent(Transform).position.x + 1
            let startZ = item.getComponent(Transform).position.z - 1
            let endZ   = item.getComponent(Transform).position.z + 1

            if (startX <= catcherX && catcherX < endX) {
                if (startZ <= catcherZ && catcherZ < endZ) {
                    item.getComponent(Material).albedoColor = Color3.Red()
                    item.getComponent(ItemData).isHit = true
                } else {
                    item.getComponent(Material).albedoColor = Color3.Yellow()
                }
            } else {
                item.getComponent(Material).albedoColor = Color3.Yellow()
            }
        }
    }
}