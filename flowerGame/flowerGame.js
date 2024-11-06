import { levels, setComplete,Flower,Level } from "./levels.js";

const url = window.location.search;
const urlParams = new URLSearchParams(url);

const pack = urlParams.get("pack");
const id = urlParams.get("id");

const level = levels[pack][id];

const rowTempalte = document.querySelector(".row");
const gardenWrapper = document.querySelector("#gardenWrapper");

const inventory = document.querySelector("#inventory");
const pFollower = document.querySelector("#pointerFollower");

const hideWinScreen = document.querySelector("#hideScreen");
const winScreen = document.querySelector("#winScreen");

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

hideWinScreen.addEventListener("click",e=> {
    winScreen.classList.add("hidden");
})

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
    seekGenerate(x,y);
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
            const targetFlower = new Flower(1);
            targetFlower.makeFromJSON(JSON.parse(target.dataset.flower));
            removeFlower(target);
            const mainFlower = new Flower(1);
            mainFlower.makeFromJSON(JSON.parse(playGrid[parenty][parentx].dataset.flower));
            const newFlower = mainFlower.combine(targetFlower);
            removeFlower(playGrid[parenty][parentx]);
            createFlower(newFlower,playGrid[parenty][parentx]);
            const win = checkWin(newFlower);
            if(win){
                setComplete(pack,id);
                winScreen.classList.remove("hidden");
            }
        }
    }
}

function seekGenerate(px,py){
    const ogFlower = new Flower(1);
    ogFlower.makeFromJSON(JSON.parse(playGrid[py][px].dataset.flower));
    if(level.pAmount == 3){
        const newParents = [
            [px+1,py],
            [px,py+1],
            [px-1,py],
            [px,py-1]
        ];
        for(let pxy of newParents){
            const parentx = pxy[0];
            const parenty = pxy[1];
            if(parentx >= level.gridx || parentx < 0 || parenty >= level.gridy || parenty < 0){
                continue;
            }
            const seek = [
                [parentx+1,parenty],
                [parentx,parenty+1],
                [parentx-1,parenty]
            ]
            for(let i = 0; i < seek.length; i++){
                const xy = seek[i];
                const x = xy[0];
                const y = xy[1];
                if(x >= level.gridx || x < 0 || y >= level.gridy || y < 0){
                    continue;
                }
                const target = playGrid[y][x];
                if(target.dataset.state.includes("f") && (x != px || y != py)){
                    const targetFlower = new Flower(1);
                    targetFlower.makeFromJSON(JSON.parse(target.dataset.flower));
                    removeFlower(target);
                    const newFlower = targetFlower.makeNew(ogFlower,i);
                    removeFlower(playGrid[py][px]);
                    createFlower(newFlower,playGrid[parenty][parentx]);
                    const win = checkWin(newFlower);
                    if(win){
                        setComplete(pack,id);
                        winScreen.classList.remove("hidden");
                    }
                }
            }
        }
    }
}

function checkWin(flower){
    for(let orderFlower of level.order){
        if(orderFlower.compareSame(flower)){
            const i = level.order.indexOf(orderFlower);
            const x = level.order.splice(i,1);
        }
    }
    if(level.order.length == 0){
        return true;
    }
    return false;
}

function removeFlower(target){
    target.innerHTML="";
    target.dataset.state = "";
    target.dataset.flower = "";
}


