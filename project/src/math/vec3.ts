
export class Vec3 {
    private m_data: number[];
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.m_data = [x, y, z]
    }

    public get x(): number {
        return this.m_data[0]
    }

    public set x(x: number) {
        this.m_data[0] = x;
    }

    public get y(): number {
        return this.m_data[1]
    }

    public set y(y: number) {
        this.m_data[1] = y;
    }

    public get z(): number {
        return this.m_data[2]
    }

    public set z(z: number) {
        this.m_data[2] = z;
    }

    public get length() {
        let sum = this.m_data.reduce((prev, curr) => prev + curr ** 2, 0)
        return Math.sqrt(sum)
    }

    public normalize() {
        let res = new Vec3()
        let l = this.length
        res.x = this.x / l
        res.y = this.y / l
        res.z = this.z / l
        return res
    }

    public add(other: Vec3) {
        let sum = new Vec3();
        sum.x = this.x + other.x
        sum.y = this.y + other.y
        sum.z = this.z + other.z
        return sum
    }

    public sub(other: Vec3) {
        let res = new Vec3()
        res.x = this.x - other.x
        res.y = this.y - other.y
        res.z = this.z - other.z
        return res
    }

    public mul(val: number) {
        let res = new Vec3()
        res.x = this.x * val
        res.y = this.y * val
        res.z = this.z * val
        return res
    }

    public dot(other: Vec3) {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }

    public cross(other: Vec3) {
        let res = new Vec3()
        res.x = this.y * other.z - this.z * other.y
        res.y = this.z * other.x - this.x * other.z
        res.z = this.x * other.y - this.y * other.x
        return res
    }


    public toFloat32Array() {
        return new Float32Array(this.m_data)
    }

}
