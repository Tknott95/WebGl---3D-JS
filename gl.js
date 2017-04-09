var gl;
var shaderProgram;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
    var canvas = document.getElementById("canvas");
    console.log(canvas);
    gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
}

function createShaders() {


    var vertexShader = getShader(gl, "shader-vs")

    var fragmentShader = getShader(gl, "shader-fs");


    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
}

function createVertices() {
    vertices = [
        -0.9, -0.9, 0.0,
        0.9, -0.9, 0.0,
        0.0,  0.9, 0.0
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var coords = gl.getAttribLocation(shaderProgram, "coords");
    //gl.vertexAttrib3f(coords, 0.5, 0.5, 0);
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coords);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
    gl.vertexAttrib1f(pointSize, 100);

    var color = gl.getUniformLocation(shaderProgram, "color");
    gl.uniform4f(color, 1, 1, 0, 0);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

/*
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
 */
function getShader(gl, id) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while (currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        // Unknown shader type
        return null;
    }
    gl.shaderSource(shader, theSource);

// Compile the shader program
    gl.compileShader(shader);

// See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
