import { Vec3 } from "./math/vec3.js";
const SENSIVITY = 0.8;
const SPEED = 0.8;
export class Camera {
    m_position;
    m_direction;
    m_up;
    m_pitch;
    m_yaw;
    constructor() {
        this.m_position = new Vec3(0, 0, 5);
        this.m_direction = new Vec3(0, 0, -1);
        this.m_up = new Vec3(0, 1, 0);
        this.m_pitch = 0;
        this.m_yaw = -90;
    }
    get position() {
        return this.m_position;
    }
    set position(v) {
        this.m_position = v;
    }
    get direction() {
        return this.m_direction;
    }
    get up() {
        return this.m_up;
    }
    degToRad(degree) {
        return (degree * Math.PI) / 180;
    }
    subscribe() {
        window.addEventListener("mousemove", (e) => {
            this.update(e.movementX, e.movementY);
        });
    }
    update(x, y) {
        this.m_yaw += x * SENSIVITY;
        this.m_pitch -= y * SENSIVITY;
        if (this.m_pitch > 89)
            this.m_pitch = 89;
        if (this.m_pitch < -89)
            this.m_pitch = -89;
        this.m_direction.x = Math.cos(this.degToRad(this.m_yaw)) * Math.cos(this.degToRad(this.m_pitch));
        this.m_direction.y = Math.sin(this.degToRad(this.m_pitch));
        this.m_direction.z = Math.sin(this.degToRad(this.m_yaw)) * Math.cos(this.degToRad(this.m_pitch));
    }
    updateKey(m) {
        if (m.has("w") && m.get("w")) {
            this.position = this.position.add(this.direction.mul(SPEED));
        }
        if (m.has("s") && m.get("s")) {
            this.position = this.position.sub(this.direction.mul(SPEED));
        }
        if (m.has("a") && m.get("a")) {
            this.position = this.position.sub(this.direction.cross(this.up).normalize().mul(SPEED));
        }
        if (m.has("d") && m.get("d")) {
            this.position = this.position.add(this.direction.cross(this.up).normalize().mul(SPEED));
        }
    }
}
