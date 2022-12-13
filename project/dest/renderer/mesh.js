import { IndexBuffer } from "./indexBuffer.js";
import { VertexBuffer } from "./vertexBuffer.js";
const posData = [
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5
];
const colorData = [
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0
];
const indexData = [
    0, 1, 2, 2, 3, 0,
    1, 5, 6, 6, 2, 1,
    7, 6, 5, 5, 4, 7,
    4, 0, 3, 3, 7, 4,
    4, 5, 1, 1, 0, 4,
    3, 2, 6, 6, 7, 3,
];
export class Mesh {
    m_vbList = [];
    m_indexBuffer;
    constructor(bufferDataList, indexData) {
        for (const data of bufferDataList) {
            this.m_vbList.push(new VertexBuffer(data, 3, false));
        }
        this.m_indexBuffer = new IndexBuffer(indexData);
    }
    static cube() {
        return new Mesh([posData, colorData], indexData);
    }
    get vertexBufferList() {
        return this.m_vbList;
    }
    get indexBuffer() {
        return this.m_indexBuffer;
    }
}
