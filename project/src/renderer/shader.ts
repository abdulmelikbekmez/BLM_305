import { gl } from "../app.js"
import { Mat4 } from "../math/mat4.js"
const fragmentSrc =
    `#version 300 es
precision highp float;

out vec4 out_color;
in vec3 o_Color;


void main()
{
    out_color = vec4(o_Color, 1);
}
`
const vertexSrc =
    `#version 300 es
layout (location = 0) in vec3 a_Pos;
layout (location = 1) in vec3 a_Color;
layout (location = 2) in mat4 a_model;

uniform mat4 view;
uniform mat4 projection;

out vec3 o_Color;

void main() 
{
    o_Color = a_Color;
    gl_Position = projection * view * a_model * vec4(a_Pos, 1.0);
}
`

export class Shader {
    shader: WebGLShader
    constructor(src: string, mod: number) {
        const shader = gl.createShader(mod)
        gl.shaderSource(shader, src)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader))
        }
        this.shader = shader
    }

    public static vertex() {
        return new Shader(vertexSrc, gl.VERTEX_SHADER)
    }

    public static fragment() {
        return new Shader(fragmentSrc, gl.FRAGMENT_SHADER)
    }
}

export class ShaderProgram {
    private m_program: WebGLProgram
    private m_locations: Map<string, WebGLUniformLocation> = new Map()


    constructor()
    constructor(vertexShader: Shader, fragmentShader: Shader)

    constructor(vertexShader?: Shader, fragmentShader?: Shader) {
        const program = gl.createProgram()

        if (!vertexShader) {
            vertexShader = Shader.vertex()
        }
        if (!fragmentShader) {
            fragmentShader = Shader.fragment()

        }
        gl.attachShader(program, vertexShader.shader)
        gl.attachShader(program, fragmentShader.shader)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program))
        }
        gl.useProgram(program)
        this.m_program = program

    }

    public setMat4(name: string, mat4: Mat4) {
        gl.uniformMatrix4fv(this.getLocation(name), false, mat4.buffer)
    }

    public bind() {
        gl.useProgram(this.m_program)
    }

    private getLocation(name: string) {
        if (this.m_locations.has(name)) {
            return this.m_locations.get(name)
        }
        let location = gl.getUniformLocation(this.m_program, name)
        this.m_locations.set(name, location)
        return location
    }

}


