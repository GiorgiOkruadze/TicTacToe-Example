const playerFirstInp = document.querySelector("#playerFirst");
const playerSecondInp = document.querySelector("#playerSecond");

const startGameBtn = document.querySelector("#startGame");

const playerFirstNameBtn = document.querySelector(".playerFirstName");
const playerSecondNameBtn = document.querySelector(".playerSecondName");

const allGameBoxes = document.querySelectorAll(".game-box");

const playerNameP = document.querySelector(".player-name-view");

var gameLogic = undefined;
var gameEnd = false;

startGameBtn.addEventListener("click", function () {
    var isValid = checkInputsValidation();
    if (isValid) {
        playerFirstNameBtn.textContent = playerFirstInp.value;
        playerSecondNameBtn.textContent = playerSecondInp.value;
        gameLogic = true;
    }
});



function checkInputsValidation() {
    var isValid = true;
    var inps = document.querySelectorAll(".form-control");
    for (var i = 0; i < inps.length; i++) {
        inps[i].addEventListener("click", function () { addDefaultBorder(this); })

        if (!checkSingleInp(inps[i])) {
            isValid = false;
        }
    }

    return isValid;
}

function checkSingleInp(inp) {
    if (inp.value != "" && inp.value.length > 2) {
        return true;
    }

    addExceptionBorder(inp);
    return false;
}

function addExceptionBorder(elem) {
    elem.style.border = "2px solid red";
}

function addDefaultBorder(elem) {
    elem.style.border = "2px solid rgb(244,244,244)";
}



allGameBoxes.forEach(o => {
    o.addEventListener("click", function () {
        if (!gameEnd) {
            if (this.textContent.length != "" && gameLogic == undefined) { return; }

            if (gameLogic) {
                this.textContent = "X";
            } else {
                this.textContent = "O";
            }

            checkWinnerLogic();
            changePlayerNameStatus();
            gameLogic = !gameLogic;
        }
    });
});

function checkWinnerLogic() {
    var counter = 0;
    for (var i = 0; i < 2; i++) {
        if (allGameBoxes[i].textContent == allGameBoxes[i + 1].textContent && allGameBoxes[i].textContent != "") {
            counter++;
        }
    }

    if (counter == 2) {
        var winnerName = gameLogic ? playerFirstNameBtn.textContent : playerSecondNameBtn.textContent;
        playerNameP.textContent = `The Winner is ${winnerName}`;
        gameEnd = true;
    }
}



function changePlayerNameStatus() {
    playerFirstNameBtn.classList.toggle("active");
    playerSecondNameBtn.classList.toggle("active");
}
