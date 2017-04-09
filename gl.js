var gl;
var shaderProgram;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
}

function createShaders() {
    var vs = "";
    vs += "attribute vec4 coords;";
    vs += "void main(void) {";
    vs += " gl_Position = coords;";
    vs += " gl_PointSize = 100.0;";
    vs += "}";

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs);
    gl.compileShader(vertexShader);

    var fs = "";
    fs += "void main(void) {";
    fs += " gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);";
    fs += "}";

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fs);
    gl.compileShader(fragmentShader);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);


}

function createVertices() {
    var coords = gl.getAttribLocation(shaderProgram, "coords");
    gl.vertexAttrib3f(coords, 0, 0, 0);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}
