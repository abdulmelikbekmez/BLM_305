export class Vec3 {
    m_data;
    constructor(x = 0, y = 0, z = 0) {
        this.m_data = [x, y, z];
    }
    get x() {
        return this.m_data[0];
    }
    set x(x) {
        this.m_data[0] = x;
    }
    get y() {
        return this.m_data[1];
    }
    set y(y) {
        this.m_data[1] = y;
    }
    get z() {
        return this.m_data[2];
    }
    set z(z) {
        this.m_data[2] = z;
    }
    get length() {
        let sum = this.m_data.reduce((prev, curr) => prev + curr ** 2, 0);
        return Math.sqrt(sum);
    }
    normalize() {
        let res = new Vec3();
        let l = this.length;
        res.x = this.x / l;
        res.y = this.y / l;
        res.z = this.z / l;
        return res;
    }
    add(other) {
        let sum = new Vec3();
        sum.x = this.x + other.x;
        sum.y = this.y + other.y;
        sum.z = this.z + other.z;
        return sum;
    }
    sub(other) {
        let res = new Vec3();
        res.x = this.x - other.x;
        res.y = this.y - other.y;
        res.z = this.z - other.z;
        return res;
    }
    mul(val) {
        let res = new Vec3();
        res.x = this.x * val;
        res.y = this.y * val;
        res.z = this.z * val;
        return res;
    }
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    cross(other) {
        let res = new Vec3();
        res.x = this.y * other.z - this.z * other.y;
        res.y = this.z * other.x - this.x * other.z;
        res.z = this.x * other.y - this.y * other.x;
        return res;
    }
    toFloat32Array() {
        return new Float32Array(this.m_data);
    }
}
