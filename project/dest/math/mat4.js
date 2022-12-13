export class Mat4 {
    m_data;
    constructor() {
        this.m_data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
    get buffer() {
        return new Float32Array(this.m_data);
    }
    get rawBuffer() {
        return this.m_data;
    }
    setDataToFLoat32Arr(arr, startIndex) {
        this.m_data.forEach(data => {
            arr[startIndex++] = data;
        });
    }
    static identity() {
        return new Mat4();
    }
    static translation(pos) {
        let m = new Mat4();
        m.m_data[12] = pos.x;
        m.m_data[13] = pos.y;
        m.m_data[14] = pos.z;
        return m;
    }
    static projection(fov_y_radians, aspect_ratio, z_near, z_far) {
        let sin_fov = Math.sin(.5 * fov_y_radians);
        let cos_fov = Math.cos(.5 * fov_y_radians);
        let h = cos_fov / sin_fov;
        let w = h / aspect_ratio;
        let r = z_far / (z_near - z_far);
        let m = new Mat4();
        m.m_data[0] = w;
        m.m_data[5] = h;
        m.m_data[10] = r;
        m.m_data[11] = -1;
        m.m_data[14] = r * z_near;
        m.m_data[15] = 0;
        return m;
    }
    static lookAtCamera(camera) {
        return this.lookAt(camera.position, camera.position.add(camera.direction), camera.up);
    }
    static lookAt(position, target, up) {
        let zaxis = position.sub(target).normalize();
        let xaxis = up.cross(zaxis).normalize();
        let yaxis = zaxis.cross(xaxis);
        let res = new Mat4();
        res.m_data[0] = xaxis.x;
        res.m_data[1] = yaxis.x;
        res.m_data[2] = zaxis.x;
        res.m_data[3] = 0;
        res.m_data[4] = xaxis.y;
        res.m_data[5] = yaxis.y;
        res.m_data[6] = zaxis.y;
        res.m_data[7] = 0;
        res.m_data[8] = xaxis.z;
        res.m_data[9] = yaxis.z;
        res.m_data[10] = zaxis.z;
        res.m_data[11] = 0;
        res.m_data[12] = -xaxis.dot(position);
        res.m_data[13] = -yaxis.dot(position);
        res.m_data[14] = -zaxis.dot(position);
        res.m_data[15] = 1;
        return res;
    }
}
