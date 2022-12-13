import { gl } from "../app.js";
export class IndexBuffer {
    m_size;
    m_id;
    constructor(data) {
        const ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data), gl.STATIC_DRAW);
        this.m_size = data.length;
        this.m_id = ibo;
    }
    get size() {
        return this.m_size;
    }
    bind() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_id);
    }
}
