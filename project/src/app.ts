import { Vec3 } from "./math/vec3.js";
import { Renderer } from "./renderer/index.js";
import { Scene } from "./scene.js";



let keyState = new Map<string, boolean>();

window.addEventListener("keydown", (e) => {
    keyState.set(e.key, true)
})

window.addEventListener("keyup", (e) => {
    keyState.set(e.key, false)
})

const FPS = 60
export const canvas = document.getElementById("canvas") as HTMLCanvasElement

export const gl = canvas.getContext("webgl2")
function setCanvasWidth() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}


window.addEventListener("resize", (_) => {
    setCanvasWidth()
})
canvas.width = window.outerWidth;
canvas.height = window.outerHeight * 0.7;


class App {
    private m_renderer: Renderer
    private m_scene: Scene

    constructor() {

        gl.enable(gl.DEPTH_TEST)
        gl.clearColor(0.14, 0.1, 0.1, 1);
        setCanvasWidth()

        this.m_renderer = new Renderer()

        this.m_scene = new Scene()
        this.m_scene.addEntites(30, true)

    }

    private update() {
        this.m_scene.update(keyState)
        let power = .2
        this.m_scene.dynamicEntities.forEach(e => {
            // for example
            e.transform.updatePos(new Vec3(
                power * Math.sin(Date.now()),
                power * Math.sin(Date.now()),
                power * Math.sin(Date.now())
            ))
        });
    }

    private draw() {
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        this.m_renderer.draw(this.m_scene)
    }

    public start() {
        setInterval(() => {
            this.draw()
            this.update()
        }, 1000 / FPS)

    }
}

new App().start()




