let currentPlayer=document.querySelector(".current-player");
let Boxes=document.querySelectorAll(".box");
const cat1=document.querySelector(".cat1");
const cat2=document.querySelector(".cat2");
const button=document.querySelector("button");
let msg=document.querySelector("p");
let h1=document.querySelector("h1");
let tingAudio = new Audio('./media/tingsound.mp3');
let myAudio = new Audio('./media/wingamesound.wav');
let winAudio = new Audio('./media/gameoverrr.mp3');


let currentTurn="X";
currentPlayer.innerText=currentTurn;

const winCombo=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

Boxes.forEach(function (box) {
    box.addEventListener("click", startGame, { once: true }); // Add event listener and ensure it's only clicked once per turn
});
button.addEventListener("click",restart);

function startGame() {
    const boxText = this.querySelector(".boxtext");

    // Prevent overwriting already clicked boxes
    if (boxText.innerText === "") {
        boxText.innerText = currentTurn;

        // Play the click sound
        tingAudio.play();

        // Check if the current player has won
        if (isWinGame()) {
            gameOver();
        } else {
            // Check if the grid is full (for a tie)
            if (isGridFull()) {
                gameTie();
            } else {
                // Switch turns between "X" and "O"
                currentTurn = currentTurn === "X" ? "O" : "X";
                currentPlayer.innerText = currentTurn;
            }
        }
    }
}


function isGridFull(){
    for(let i=0;i<Boxes.length;i++){
        const boxText=Boxes[i].querySelector(".boxtext").innerText; 
        if(boxText===""){
            return false;
        }


    }
    return true;

}
function gameTie(){
    Boxes.forEach(function (box){
        box.removeEventListener("click",startGame);


    })
    cat2.style.display="block";
    h1.style.display="none";
    msg.style.display="none";
    myAudio.play();
    button.style.display="block";
    

    
}

function isWinGame(){
    let boxData=[];

    for(let i=0;i<Boxes.length;i++){
        boxData[i]=Boxes[i].querySelector(".boxtext").innerText;
    }

    for(let i=0;i<winCombo.length;i++){
        let[a,b,c]=winCombo[i];  //im using array destructuring.

        if(boxData[a]===currentTurn && boxData[b]===currentTurn && boxData[c]===currentTurn){
            return true;
        }
        
    }
    return false; //if i put this inside the for loop else condition, the loop will stop running

}

function gameOver(){
    Boxes.forEach(function (box){
        box.removeEventListener("click",startGame);


    })
    cat1.style.display="block";
        h1.style.display="none";
        msg.style.display="none";
        winAudio.play();
        button.style.display="block";
    

}

function restart(){
    cat2.style.display="none";
    Boxes.forEach(function(box){
        let boxText=box.querySelector(".boxtext");
        boxText.innerText="";
        box.addEventListener("click",startGame,{once:true});
        

    })
    currentTurn="X";
    currentPlayer.innerText=currentTurn;

    cat1.style.display="none";
    h1.style.display="block";
    msg.style.display="block";
    button.style.display="none";
    
}

// if(isGridFull){
//     gameTie();
// } please try to make this work and do mobile responsiveness