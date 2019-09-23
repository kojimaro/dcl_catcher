const MAX_ITEMS = 4

@Component('itemData')
export class ItemData {
    isHit: boolean
    score: number
}

export const items = engine.getComponentGroup(ItemData)

// Define spawner singleton object
export const spawner = {
    MAX_POOL_SIZE: 4,
    pool: [] as Entity[],

    spawnEntity(x: number, y: number, z: number) {
        // Get an entity from the pool
        const ent = spawner.getEntityFromPool()

        if (!ent) return

        // Add a transform component to the entity
        let t = ent.getComponentOrCreate(ItemData)
        t.isHit = false
        t.score = 100

        const transform = new Transform()
        transform.position.set(x, y, z)
        transform.scale.set(0.5, 0.5, 0.5)
        ent.addComponent(transform)

        ent.addComponent(new Material())
        ent.getComponent(Material).albedoColor = Color3.Yellow()
        ent.addComponent(new SphereShape())

        //add entity to engine
        engine.addEntity(ent)
    },

    getEntityFromPool(): Entity | null {
        // Check if an existing entity can be used
        for (let i = 0; i < spawner.pool.length; i++) {
            if (!spawner.pool[i].alive) {
                return spawner.pool[i]
            }
        }
        // If none of the existing are available, create a new one, unless the maximum pool size is reached
        if (spawner.pool.length < spawner.MAX_POOL_SIZE) {
            const instance = new Entity()
            spawner.pool.push(instance)
            return instance
        }
        return null
    }
}