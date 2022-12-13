import { Mat4 } from "./math/mat4.js";
import { Vec3 } from "./math/vec3.js";
export class Transform {
    m_position;
    constructor(position) {
        if (position) {
            this.m_position = position;
        }
        else {
            this.m_position = new Vec3();
        }
    }
    get translation() {
        return Mat4.translation(this.m_position);
    }
    get buffer() {
        return this.translation.buffer;
    }
    get rawBuffer() {
        return this.translation.rawBuffer;
    }
    updatePos(dif) {
        this.m_position = this.m_position.add(dif);
    }
}
