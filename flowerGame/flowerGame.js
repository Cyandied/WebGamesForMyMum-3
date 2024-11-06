import { levels, setComplete,Flower,Level } from "./levels.js";

const url = window.location.search;
const urlParams = new URLSearchParams(url);

const pack = urlParams.get("pack");
const id = urlParams.get("id");

console.log(pack + " " + id);
console.log(levels[pack][id]);

const level = levels[pack][id];

const rowTempalte = document.querySelector(".row");
const gardenWrapper = document.querySelector("#gardenWrapper");

const inventory = document.querySelector("#inventory");
const pFollower = document.querySelector("#pointerFollower");

const playGrid = [];
var playerInventory = {};
var playerHand = "";

for (let r = 0; r < level.gridy; r++) {
    const row = rowTempalte.cloneNode(true);
    const rowPlay = [];
    row.classList.remove("hidden");
    for (let col = 0; col < level.gridx; col++) {
        const cellInfo = level.startState[r][col];
        const plot = document.createElement("div");
        if(cellInfo.includes("x")){
            plot.classList.add("disabled");
        }
        else if(cellInfo.includes("h")){
            plot.classList.add("highlight");
        }
        else if (cellInfo.includes("f")){
            const flower = level.startFlowers[parseInt(cellInfo.split(",")[1])-1];
            plot.dataset.flower = JSON.stringify(flower);
            createFlower(flower,plot);
        }
        plot.dataset.state = cellInfo;
        plot.dataset.x = col;
        plot.dataset.y = r;
        plot.classList.add = "plot";
        rowPlay.push(plot);
        row.appendChild(plot);
        plot.addEventListener("click", e => {
            placeFlower(e);
        })
    }
    playGrid.push(rowPlay);
    gardenWrapper.appendChild(row);
    playerInventory = level.playerFlowers;
}

setUpInventory();

function setUpInventory(){
    Object.keys(playerInventory).forEach(c => {
        const plot = document.createElement("div");
        plot.dataset.color = c;
        const span = document.createElement("span");
        span.innerHTML = playerInventory[c];
        const flower = new Flower(level.pAmount,c);
        createFlower(flower,plot);
        plot.appendChild(span);
        inventory.appendChild(plot);

        plot.addEventListener("click", e=> {
            const col = e.target.dataset.color
            if(playerInventory[col] < 1 && col != playerHand){
                return;
            }
            if (col == playerHand) {
                removeFlower(pFollower);
                playerHand = "";
                playerInventory[col] += 1;
                span.innerHTML = playerInventory[col];
                return;
            }
            if (playerHand != ""){
                playerInventory[playerHand] += 1;
                span.innerHTML = playerInventory[playerHand];
            }
            playerInventory[col] -= 1;
            span.innerHTML = playerInventory[col];
            playerHand = col;
            removeFlower(pFollower);
            createFlower(new Flower(level.pAmount,col),pFollower);
        })
    })
}

document.body.onpointermove = event => {
    const {clientX, clientY} = event;

    pFollower.animate({
        left: `${clientX}px`,
        top:`${clientY}px`
    }, {duration:1000, fill:"forwards"})
}

function createFlower(flower,target){
    const petal = document.createElement("div");
    target.dataset.state = "f";
    target.dataset.flower = JSON.stringify(flower);
    petal.classList.add("flowerdot");
    const petals = [];
    const petalAm = flower.petalAmount;
    for (let i = 0; i < petalAm; i++) {
        petals.push(petal.cloneNode(true));
        flower.petals[i].color.forEach(c => {
            petals[i].classList.add(c);
        });
        petals[i].style["transform-origin"] = `right ${15}px`;
        petals[i].style.transform = `rotate(${(i+0.00000001)/petalAm*360}deg)`;
        petals[i].style.right = `${45}px`;
        petals[i].style.top = `${45-15}px`;
        target.appendChild(petals[i]);   
    }
}

function placeFlower(e){
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    const state = e.target.state;
    if(playerHand == "" || state == "d"){
        return;
    }
    createFlower(new Flower(level.pAmount,playerHand),e.target);
    removeFlower(pFollower);
    playerHand = "";
    seekMerge(x,y);
}

function seekMerge(parentx,parenty){
    const seek = [
        [parentx+1,parenty],
        [parentx,parenty+1],
        [parentx-1,parenty],
        [parentx,parenty-1]
    ]
    for(let xy of seek) {
        const x = xy[0];
        const y = xy[1];
        if(x >= level.gridx || x < 0 || y >= level.gridy || y < 0){
            continue;
        }
        const target = playGrid[y][x];
        if(target.dataset.state.includes("f")){
            removeFlower(target);
            const targetFlower = new Flower(1);
            targetFlower.makeFromJSON(JSON.parse(target.dataset.flower));
            const mainFlower = new Flower(1);
            mainFlower.makeFromJSON(JSON.parse(playGrid[parenty][parentx].dataset.flower));
            const newFlower = mainFlower.combine(targetFlower);
            removeFlower(playGrid[parenty][parentx]);
            createFlower(newFlower,playGrid[parenty][parentx]);
        }
    }
}

function seekGenerate(x,y){

}

function removeFlower(target){
    target.innerHTML="";
}


