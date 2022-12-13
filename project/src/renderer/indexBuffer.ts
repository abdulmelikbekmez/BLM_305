import { gl } from "../app.js"

export class IndexBuffer {
    private m_size: number
    private m_id: WebGLBuffer

    constructor(data: number[]) {
        const ibo = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data), gl.STATIC_DRAW)
        this.m_size = data.length
        this.m_id = ibo
    }

    public get size(): number {
        return this.m_size
    }

    public bind() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_id)
    }

}

