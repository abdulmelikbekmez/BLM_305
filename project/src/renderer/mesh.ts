import { IndexBuffer } from "./indexBuffer.js"
import { VertexBuffer } from "./vertexBuffer.js"

const posData = [
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,

    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5
]

const colorData = [
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0,

    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0
]


const indexData = [
    0, 1, 2, 2, 3, 0, // right
    1, 5, 6, 6, 2, 1, // back
    7, 6, 5, 5, 4, 7, // left
    4, 0, 3, 3, 7, 4, // bottom
    4, 5, 1, 1, 0, 4, // top
    3, 2, 6, 6, 7, 3,
]

export class Mesh {
    private m_vbList: Array<VertexBuffer> = []
    private m_indexBuffer: IndexBuffer;

    constructor(bufferDataList: Array<Array<number>>, indexData: Array<number>) {
        for (const data of bufferDataList) {
            this.m_vbList.push(new VertexBuffer(data, 3, false))
        }
        this.m_indexBuffer = new IndexBuffer(indexData)
    }

    public static cube() {
        return new Mesh([posData, colorData], indexData)
    }

    public get vertexBufferList() {
        return this.m_vbList;
    }

    public get indexBuffer() {
        return this.m_indexBuffer
    }
}

