import { gl } from "../app.js";
export class VertexBuffer {
    m_vertexSize;
    static m_s_bindedId = -1;
    m_id;
    m_size;
    constructor(data, size, isDynamic) {
        let vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        if (data instanceof Float32Array) {
            gl.bufferData(gl.ARRAY_BUFFER, data, isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
        }
        else {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
        }
        this.m_vertexSize = size * 4;
        this.m_size = size;
        this.m_id = vbo;
        VertexBuffer.m_s_bindedId = vbo;
    }
    get byteLength() {
        return this.m_vertexSize;
    }
    get size() {
        return this.m_size;
    }
    bind() {
        if (VertexBuffer.m_s_bindedId != this.m_id) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.m_id);
            VertexBuffer.m_s_bindedId = this.m_id;
        }
    }
}
