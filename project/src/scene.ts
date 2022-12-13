import { Camera } from "./camera.js";
import { Entity } from "./entity.js";
import { Vec3 } from "./math/vec3.js";

export class Scene {
    private m_camera: Camera
    private m_dynamicEntityList: Array<Entity> = []
    private m_staticEntityList: Array<Entity> = []

    constructor() {
        this.m_camera = new Camera()
        this.m_camera.subscribe()

    }


    public get dynamicEntities() {
        return this.m_dynamicEntityList
    }

    public get staticEntities() {
        return this.m_staticEntityList
    }

    public clearStaticEntities() {
        this.m_staticEntityList = []
    }

    public addEntites(count: number = 25, isStatic: boolean = true) {
        let padding = 5
        for (let i = -(count / 2); i < (count / 2); i++) {
            for (let j = -(count / 2); j < (count / 2); j++) {
                for (let k = -(count / 2); k < (count / 2); k++) {
                    let pos = new Vec3(i * padding, j * padding, k * padding)
                    if (isStatic) {
                        this.staticEntities.push(new Entity(pos))
                    } else {
                        this.dynamicEntities.push(new Entity(pos))

                    }
                }
            }
        }
    }

    public get camera() {
        return this.m_camera
    }

    public update(m: Map<string, boolean>) {
        this.m_camera.updateKey(m)
    }
}
