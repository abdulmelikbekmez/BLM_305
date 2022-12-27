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
        this.m_position = new Vec3(0, 50, 300);
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
    subscribeMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.onMouseMove(e.movementX, e.movementY);
        });
    }
    rotate() {
        let p = this.position;
        let angle = .1;
        let x = Math.cos(this.degToRad(angle)) * p.x - Math.sin(this.degToRad(angle)) * p.z;
        let z = Math.sin(this.degToRad(angle)) * p.x + Math.cos(this.degToRad(angle)) * p.z;
        p.x = x;
        p.z = z;
        this.m_direction = new Vec3(0, 0, 0).sub(this.position).normalize();
    }
    onMouseMove(x, y) {
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
    subscribeTouchMove() {
        let last = null;
        window.addEventListener("touchstart", e => {
            let tmp = e.changedTouches[0];
            last = new Vec3(tmp.clientX, tmp.clientY, 0);
        });
        window.addEventListener("touchend", _ => {
            last = null;
        });
        window.addEventListener("touchmove", e => {
            let tmp = e.changedTouches[0];
            let current = new Vec3(tmp.clientX, tmp.clientY, 0);
            let dif = current.sub(last);
            this.position = this.position.add(this.direction.mul(SPEED * -dif.y * .4));
            this.position = this.position.add(this.direction.cross(this.up).normalize().mul(SPEED * -dif.x * .4));
            last = current;
        });
    }
    update(m) {
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
        this.rotate();
    }
}
