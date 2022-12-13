import { gl } from "../app.js";
import { Mesh } from "./mesh.js";
import { VertexBuffer } from "./vertexBuffer.js";

export class VertexArray {
    private m_index: number = 0
    private m_id: WebGLVertexArrayObject;

    private m_instancedBuffer?: VertexBuffer;
    private m_indexSize: number

    private static m_bindedId: WebGLVertexArrayObject = -1
    constructor(mesh: Mesh) {
        let vao = gl.createVertexArray()
        gl.bindVertexArray(vao)
        VertexArray.m_bindedId = vao

        mesh.indexBuffer.bind()
        this.m_indexSize = mesh.indexBuffer.size
        for (const buffer of mesh.vertexBufferList) {

            buffer.bind()
            gl.enableVertexAttribArray(this.m_index)
            gl.vertexAttribPointer(this.m_index++, buffer.size, gl.FLOAT, false, buffer.byteLength, 0)
        }

        this.m_id = vao

    }

    public makeInstanced(instanceCount: number) {
        this.bind()
        this.m_instancedBuffer = new VertexBuffer(new Float32Array(instanceCount * 16), 16, true)

        for (let i = 0; i < 4; i++) {

            gl.enableVertexAttribArray(this.m_index)
            gl.vertexAttribPointer(this.m_index, 4, gl.FLOAT, false, this.m_instancedBuffer.byteLength, i * (16))
            gl.vertexAttribDivisor(this.m_index++, 1)

        }
    }

    public get instancedBuffer() {
        return this.m_instancedBuffer
    }

    public get indexSize() {
        return this.m_indexSize
    }

    public bind() {
        if (VertexArray.m_bindedId != this.m_id) {
            gl.bindVertexArray(this.m_id)
            VertexArray.m_bindedId = this.m_id
        }
    }
}
