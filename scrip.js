var bird = document.getElementById("bird");
var container = document.getElementById("container");
var scoreText = document.getElementById("score");
var score = 0;
var isGameOver = false;

function jump() {
    if (isGameOver) {
        return;
    }

    bird.classList.add("bird-animation");
    setTimeout(function() {
        bird.classList.remove("bird-animation");
    }, 500);

    bird.style.animation = "none";
    bird.offsetHeight; // Trigger reflow
    bird.style.animation = null;
}

container.addEventListener("click", jump);
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

function createPipe() {
    if (isGameOver) {
        return;
    }

    var pipe = document.createElement("div");
    pipe.classList.add("pipe");
    pipe.style.left = container.offsetWidth + "px";
    pipe.style.top = Math.random() * (container.offsetHeight - 200) + "px";

    container.appendChild(pipe);

    var pipeMoveInterval = setInterval(function() {
        if (isGameOver) {
            clearInterval(pipeMoveInterval);
            return;
        }

        var pipeLeft = parseInt(pipe.style.left);
        pipe.style.left = pipeLeft - 2 + "px";

        if (pipeLeft < -80) {
            container.removeChild(pipe);
            clearInterval(pipeMoveInterval);
            score++;
            scoreText.textContent = "Score: " + score;
        }

        if (isCollision(pipe)) {
            endGame();
        }
    }, 10);

    setTimeout(createPipe, 2000);
}

function isCollision(pipe)
