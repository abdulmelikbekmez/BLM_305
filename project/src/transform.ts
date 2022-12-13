import { Mat4 } from "./math/mat4.js";
import { Vec3 } from "./math/vec3.js";

export class Transform {

    private m_position: Vec3

    constructor()
    constructor(position: Vec3)

    constructor(position?: Vec3) {
        if (position) {
            this.m_position = position
        } else {
            this.m_position = new Vec3()
        }
    }

    public get translation() {
        return Mat4.translation(this.m_position)
    }

    public get buffer() {
        return this.translation.buffer
    }

    public get rawBuffer() {
        return this.translation.rawBuffer
    }

    public updatePos(dif: Vec3) {
        this.m_position = this.m_position.add(dif)
    }

}
