let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {  
    if(!started){
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset user sequence for new level
    level++;
    h2.innerText = `Level ${level}`;

    // Flash the entire sequence so far
    flashGameSequence();
}

function flashGameSequence() {
    let i = 0;
    let interval = setInterval(() => {
        if (i < level) {
            let color = gameSeq[i];
            let btn = document.querySelector(`.${color}`);
            gameFlash(btn);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 600);
    
    // Add new random color to sequence
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq);
}

function checkAns() {
    let idx = userSeq.length - 1;
    
    console.log("User clicked:", userSeq[idx]);
    console.log("Should be:", gameSeq[idx]);
    
    if (userSeq[idx] === gameSeq[idx]) {
        // If user completed the current sequence
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game over - wrong sequence
        gameOver();
    }
}

function gameOver() {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press Any Key to Restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    
    // Flash all buttons to indicate game over
    let allBtns = document.querySelectorAll(".btn");
    allBtns.forEach(btn => {
        btn.classList.add("flash");
    });
    setTimeout(() => {
        allBtns.forEach(btn => {
            btn.classList.remove("flash");
        });
    }, 500);
    
    reset();
}

function btnPress() {
    if (!started) return;
    
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}