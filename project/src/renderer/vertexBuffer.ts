import { gl } from "../app.js";

export class VertexBuffer {

    private m_vertexSize: number

    private static m_s_bindedId: WebGLBuffer = -1
    private m_id: WebGLBuffer;
    m_size: number;

    constructor(data: Float32Array, size: number, isDynamic: boolean)
    constructor(data: number[], size: number, isDynamic: boolean)

    constructor(data: number[] | Float32Array, size: number, isDynamic: boolean) {

        let vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

        if (data instanceof Float32Array) {
            gl.bufferData(gl.ARRAY_BUFFER, data, isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW)
        } else {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW)
        }
        this.m_vertexSize = size * 4
        this.m_size = size
        this.m_id = vbo
        VertexBuffer.m_s_bindedId = vbo
    }

    public get byteLength(): number {
        return this.m_vertexSize
    }

    public get size() {
        return this.m_size
    }

    public bind() {
        if (VertexBuffer.m_s_bindedId != this.m_id) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.m_id)
            VertexBuffer.m_s_bindedId = this.m_id
        }
    }

}
