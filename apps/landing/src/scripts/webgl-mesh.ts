const VERTEX_SRC = /* glsl */ `#version 300 es
precision mediump float;
in vec2 a_pos;
out vec2 v_uv;
void main() {
	v_uv = a_pos * 0.5 + 0.5;
	gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAGMENT_SRC = /* glsl */ `#version 300 es
precision mediump float;
in vec2 v_uv;
out vec4 o_color;
uniform float u_time;
uniform vec2 u_resolution;

vec3 blob(vec2 uv, vec2 center, float radius, vec3 color) {
	float d = length(uv - center);
	float strength = smoothstep(radius, 0.0, d);
	return color * strength * strength;
}

void main() {
	vec2 uv = v_uv;
	float aspect = u_resolution.x / u_resolution.y;
	uv.x *= aspect;

	float t = u_time * 0.08;

	vec2 c1 = vec2(
		0.35 * aspect + sin(t * 0.7) * 0.12,
		0.4 + cos(t * 0.9) * 0.1
	);
	vec2 c2 = vec2(
		0.65 * aspect + cos(t * 0.6) * 0.15,
		0.55 + sin(t * 0.8) * 0.12
	);
	vec2 c3 = vec2(
		0.5 * aspect + sin(t * 1.1) * 0.1,
		0.3 + cos(t * 0.5) * 0.08
	);
	vec2 c4 = vec2(
		0.55 * aspect + cos(t * 0.9) * 0.08,
		0.7 + sin(t * 0.7) * 0.06
	);

	/* Deep indigo #1a1a3e */
	vec3 col1 = vec3(0.102, 0.102, 0.243);
	/* Navy-black #0a0a14 */
	vec3 col2 = vec3(0.039, 0.039, 0.078);
	/* Electric indigo at 20% #818cf8 */
	vec3 col3 = vec3(0.506, 0.549, 0.973) * 0.2;
	/* Tiny amber warmth #2d1f00 */
	vec3 col4 = vec3(0.176, 0.122, 0.0);

	vec3 color = vec3(0.039, 0.039, 0.078);
	color += blob(uv, c1, 0.55, col1);
	color += blob(uv, c2, 0.5, col2);
	color += blob(uv, c3, 0.35, col3);
	color += blob(uv, c4, 0.25, col4);

	o_color = vec4(color, 1.0);
}`;

const FRAME_INTERVAL = 1000 / 30;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
	const shader = gl.createShader(type);
	if (!shader) {
		throw new Error("Failed to create shader");
	}
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const info = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		throw new Error(`Shader compile error: ${info}`);
	}
	return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram {
	const vert = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
	const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
	const program = gl.createProgram();
	if (!program) {
		throw new Error("Failed to create program");
	}
	gl.attachShader(program, vert);
	gl.attachShader(program, frag);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const info = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error(`Program link error: ${info}`);
	}
	gl.deleteShader(vert);
	gl.deleteShader(frag);
	return program;
}

function setupQuad(gl: WebGL2RenderingContext, program: WebGLProgram): WebGLVertexArrayObject {
	const vao = gl.createVertexArray();
	if (!vao) {
		throw new Error("Failed to create VAO");
	}
	gl.bindVertexArray(vao);

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	const posLoc = gl.getAttribLocation(program, "a_pos");
	gl.enableVertexAttribArray(posLoc);
	gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

	gl.bindVertexArray(null);
	return vao;
}

function resizeCanvas(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, dpr: number): void {
	const displayWidth = Math.round(canvas.clientWidth * dpr);
	const displayHeight = Math.round(canvas.clientHeight * dpr);

	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
		gl.viewport(0, 0, displayWidth, displayHeight);
	}
}

export function initMeshGradient(canvas: HTMLCanvasElement): () => void {
	const gl = canvas.getContext("webgl2", {
		alpha: false,
		antialias: false,
		powerPreference: "low-power",
	});

	if (!gl) {
		canvas.classList.add("webgl-fallback");
		return () => {};
	}

	const dpr = (window.devicePixelRatio || 1) * 0.5;
	const program = createProgram(gl);
	const vao = setupQuad(gl, program);

	gl.useProgram(program);

	const uTime = gl.getUniformLocation(program, "u_time");
	const uResolution = gl.getUniformLocation(program, "u_resolution");

	resizeCanvas(canvas, gl, dpr);

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	let rafId = 0;
	let lastFrame = 0;
	let disposed = false;
	const startTime = performance.now();

	function render(timestamp: number): void {
		if (disposed) return;

		if (timestamp - lastFrame < FRAME_INTERVAL) {
			rafId = requestAnimationFrame(render);
			return;
		}
		lastFrame = timestamp;

		resizeCanvas(canvas, gl as WebGL2RenderingContext, dpr);

		const elapsed = (timestamp - startTime) / 1000;
		(gl as WebGL2RenderingContext).uniform1f(uTime, elapsed);
		(gl as WebGL2RenderingContext).uniform2f(uResolution, canvas.width, canvas.height);

		(gl as WebGL2RenderingContext).bindVertexArray(vao);
		const glCtx = gl as WebGL2RenderingContext;
		glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
	}

	if (prefersReducedMotion) {
		render(performance.now());
	} else {
		rafId = requestAnimationFrame(render);
	}

	const onResize = (): void => {
		resizeCanvas(canvas, gl, dpr);
	};
	window.addEventListener("resize", onResize, { passive: true });

	return () => {
		disposed = true;
		if (rafId) {
			cancelAnimationFrame(rafId);
		}
		window.removeEventListener("resize", onResize);
		gl.deleteProgram(program);
		gl.deleteVertexArray(vao);
		const ext = gl.getExtension("WEBGL_lose_context");
		if (ext) {
			ext.loseContext();
		}
	};
}
