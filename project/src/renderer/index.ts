import { canvas, gl } from "../app.js"
import { Mat4 } from "../math/mat4.js"
import { Scene } from "../scene.js"
import { Mesh } from "./mesh.js"
import { ShaderProgram } from "./shader.js"
import { VertexArray } from "./vertexArray.js"

export class Renderer {
    private m_count: number = 0
    private m_maxCount = 50 ** 3
    private m_lastStaticIndex = 0
    private m_shader: ShaderProgram
    private m_vao: VertexArray

    constructor() {
        this.m_vao = new VertexArray(Mesh.cube())
        this.m_vao.makeInstanced(this.m_maxCount)
        this.m_shader = new ShaderProgram()
    }

    public draw(scene: Scene) {

        this.m_vao.bind()
        this.m_vao.instancedBuffer.bind()

        let data = scene.staticEntities.flatMap(e => {
            this.m_count++;
            return e.transform.rawBuffer
        })

        let buffer = new Float32Array(data)

        gl.bufferSubData(gl.ARRAY_BUFFER, this.m_lastStaticIndex, buffer)
        this.m_lastStaticIndex += buffer.byteLength;
        scene.clearStaticEntities()

        let count = this.m_count
        let tmp = scene.dynamicEntities.flatMap(e => {
            count++;
            return e.transform.rawBuffer
        })
        gl.bufferSubData(gl.ARRAY_BUFFER, this.m_lastStaticIndex, new Float32Array(tmp))

        this.m_shader.setMat4("view", Mat4.lookAtCamera(scene.camera))
        this.m_shader.setMat4("projection", Mat4.projection((45 * Math.PI) / 180, canvas.width / canvas.height, 0.1, 1000))
        gl.drawElementsInstanced(gl.TRIANGLES, this.m_vao.indexSize, gl.UNSIGNED_INT, 0, count)
    }


}
