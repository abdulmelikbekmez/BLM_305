import { Vec3 } from "./math/vec3.js";

const SENSIVITY = 0.8
const SPEED = 0.8

export class Camera {
    private m_position: Vec3
    private m_direction: Vec3
    private m_up: Vec3

    private m_pitch: number
    private m_yaw: number

    constructor() {
        this.m_position = new Vec3(0, 50, 300)
        this.m_direction = new Vec3(0, 0, -1)
        this.m_up = new Vec3(0, 1, 0)

        this.m_pitch = 0
        this.m_yaw = -90
    }

    public get position(): Vec3 {
        return this.m_position
    }

    public set position(v: Vec3) {
        this.m_position = v

    }

    public get direction(): Vec3 {
        return this.m_direction
    }

    public get up(): Vec3 {
        return this.m_up
    }

    private degToRad(degree: number) {
        return (degree * Math.PI) / 180
    }

    public subscribeMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.onMouseMove(e.movementX, e.movementY)
        })
    }


    private rotate() {
        let p = this.position
        let angle = .1
        let x = Math.cos(this.degToRad(angle)) * p.x - Math.sin(this.degToRad(angle)) * p.z
        let z = Math.sin(this.degToRad(angle)) * p.x + Math.cos(this.degToRad(angle)) * p.z
        p.x = x
        p.z = z
        this.m_direction = new Vec3(0, 0, 0).sub(this.position).normalize()
    }

    private onMouseMove(x: number, y: number) {
        this.m_yaw += x * SENSIVITY
        this.m_pitch -= y * SENSIVITY

        if (this.m_pitch > 89) this.m_pitch = 89
        if (this.m_pitch < -89) this.m_pitch = -89

        this.m_direction.x = Math.cos(this.degToRad(this.m_yaw)) * Math.cos(this.degToRad(this.m_pitch))
        this.m_direction.y = Math.sin(this.degToRad(this.m_pitch))
        this.m_direction.z = Math.sin(this.degToRad(this.m_yaw)) * Math.cos(this.degToRad(this.m_pitch))
    }

    public subscribeTouchMove() {
        let last: Vec3 | null = null

        window.addEventListener("touchstart", e => {
            let tmp = e.changedTouches[0]
            last = new Vec3(tmp.clientX, tmp.clientY, 0)
        })

        window.addEventListener("touchend", _ => {
            last = null
        })
        window.addEventListener("touchmove", e => {
            let tmp = e.changedTouches[0]
            let current = new Vec3(tmp.clientX, tmp.clientY, 0)
            let dif = current.sub(last)
            this.position = this.position.add(this.direction.mul(SPEED * -dif.y * .4))
            this.position = this.position.add(this.direction.cross(this.up).normalize().mul(SPEED * -dif.x * .4))
            last = current
        })

    }

    public update(m: Map<string, boolean>) {

        if (m.has("w") && m.get("w")) {
            this.position = this.position.add(this.direction.mul(SPEED))
        }

        if (m.has("s") && m.get("s")) {
            this.position = this.position.sub(this.direction.mul(SPEED))
        }

        if (m.has("a") && m.get("a")) {
            this.position = this.position.sub(this.direction.cross(this.up).normalize().mul(SPEED))
        }

        if (m.has("d") && m.get("d")) {
            this.position = this.position.add(this.direction.cross(this.up).normalize().mul(SPEED))
        }
        this.rotate()
    }
}
