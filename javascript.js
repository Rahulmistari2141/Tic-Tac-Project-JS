let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-button");
let newButton = document.querySelector("#newButton");
let winnerMsg1 = document.querySelector("#winnerMsg1");
let msgContainer = document.querySelector(".msg-container");
let hide = document.querySelector(".hideMsg");
let playerO = true; // player-X, player-y

const winnerPatterns = [
    [0, 1, 2], [0, 3, 6], 
    [0, 4, 8], [1, 4, 7], 
    [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("was click");
        if(playerO){
            box.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            playerO = false;
        } else {
            box.innerHTML = `<i class="fa-regular fa-circle"></i>`;
            playerO = true;
        }
        box.disabled = true;
        checkwinner();
    })
});

const checkDraw = () => {
    let allBoxesFilled = true;
    for (let box of boxes) {
        if (box.innerHTML === "") {
            allBoxesFilled = false;
            break;
        }
    }
    if (allBoxesFilled) {
        showDrawMsg();
    }
};

const resetGame = () => {
    playerO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

const showWinnerMsg = (winnerMsg) => {
    const readableWinner = winnerMsg.includes("fa-xmark") ? "X Player" : "O Player";
    winnerMsg1.innerText = `Congratulations, Winner is ${readableWinner}!`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const showDrawMsg = () => {
    winnerMsg1.innerText = "Match Draw!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const  checkwinner = () => {
    let winnerFound = false;

    for (let pattern of winnerPatterns) {
        // console.log(pattern);
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerHTML, boxes[pattern[1]].innerHTML, boxes[pattern[2]].innerHTML);
        let positVal1 = boxes[pattern[0]].innerHTML;
        let positVal2 = boxes[pattern[1]].innerHTML;
        let positVal3 = boxes[pattern[2]].innerHTML;

        if(positVal1 != "" && positVal2 != "" && positVal3 != ""){
            if(positVal1 === positVal2 && positVal2 === positVal3){
                // console.log("winner", positVal1);
                showWinnerMsg(positVal1);
                winnerFound = true;
                break;
            }
        }
    }

    if (!winnerFound) {
        checkDraw();
    }
}; 

newButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
