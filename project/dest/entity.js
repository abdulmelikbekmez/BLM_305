import { Transform } from "./transform.js";
export class Entity {
    m_transform;
    constructor(position) {
        if (position) {
            this.m_transform = new Transform(position);
        }
        else {
            this.m_transform = new Transform();
        }
    }
    get transform() {
        return this.m_transform;
    }
}
