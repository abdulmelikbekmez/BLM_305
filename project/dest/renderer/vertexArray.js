import { gl } from "../app.js";
import { VertexBuffer } from "./vertexBuffer.js";
export class VertexArray {
    m_index = 0;
    m_id;
    m_instancedBuffer;
    m_indexSize;
    static m_bindedId = -1;
    constructor(mesh) {
        let vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        VertexArray.m_bindedId = vao;
        mesh.indexBuffer.bind();
        this.m_indexSize = mesh.indexBuffer.size;
        for (const buffer of mesh.vertexBufferList) {
            buffer.bind();
            gl.enableVertexAttribArray(this.m_index);
            gl.vertexAttribPointer(this.m_index++, buffer.size, gl.FLOAT, false, buffer.byteLength, 0);
        }
        this.m_id = vao;
    }
    makeInstanced(instanceCount) {
        this.bind();
        this.m_instancedBuffer = new VertexBuffer(new Float32Array(instanceCount * 16), 16, true);
        for (let i = 0; i < 4; i++) {
            gl.enableVertexAttribArray(this.m_index);
            gl.vertexAttribPointer(this.m_index, 4, gl.FLOAT, false, this.m_instancedBuffer.byteLength, i * (16));
            gl.vertexAttribDivisor(this.m_index++, 1);
        }
    }
    get instancedBuffer() {
        return this.m_instancedBuffer;
    }
    get indexSize() {
        return this.m_indexSize;
    }
    bind() {
        if (VertexArray.m_bindedId != this.m_id) {
            gl.bindVertexArray(this.m_id);
            VertexArray.m_bindedId = this.m_id;
        }
    }
}
