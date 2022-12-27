import { Camera } from "./camera.js";
import { Entity } from "./entity.js";
import { Vec3 } from "./math/vec3.js";
export class Scene {
    m_camera;
    m_dynamicEntityList = [];
    m_staticEntityList = [];
    constructor() {
        this.m_camera = new Camera();
        this.m_camera.subscribeTouchMove();
        /* this.m_camera.subscribeMouseMove() */
    }
    get dynamicEntities() {
        return this.m_dynamicEntityList;
    }
    get staticEntities() {
        return this.m_staticEntityList;
    }
    clearStaticEntities() {
        this.m_staticEntityList = [];
    }
    addEntites(count = 25, isStatic = true) {
        let padding = 5;
        for (let i = -(count / 2); i < (count / 2); i++) {
            for (let j = -(count / 2); j < (count / 2); j++) {
                for (let k = -(count / 2); k < (count / 2); k++) {
                    let pos = new Vec3(i * padding, j * padding, k * padding);
                    if (isStatic) {
                        this.staticEntities.push(new Entity(pos));
                    }
                    else {
                        this.dynamicEntities.push(new Entity(pos));
                    }
                }
            }
        }
    }
    get camera() {
        return this.m_camera;
    }
    update(m) {
        this.m_camera.update(m);
    }
}
