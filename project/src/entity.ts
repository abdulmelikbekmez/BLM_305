import { Vec3 } from "./math/vec3.js";
import { Transform } from "./transform.js";

export class Entity {
    private m_transform: Transform

    constructor();
    constructor(position: Vec3);

    constructor(position?: Vec3) {
        if (position) {
            this.m_transform = new Transform(position)
        } else {
            this.m_transform = new Transform()
        }
    }

    public get transform() {
        return this.m_transform
    }

}
