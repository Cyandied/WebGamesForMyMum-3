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

const playGrid = [];

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
            createFlower(flower,plot);
        }
        plot.dataset.state = cellInfo;
        plot.classList.add = "plot";
        rowPlay.push(plot);
        row.appendChild(plot);
    }
    playGrid.push(rowPlay);
    gardenWrapper.appendChild(row);
}

function createFlower(flower,target){
    const petal = document.createElement("div");
    petal.classList.add("flowerdot");
    const petals = [];
    const petalAm = flower.petalAmount;
    for (let i = 0; i < petalAm; i++) {
        petals.push(petal.cloneNode(true));
        petals[i].classList.add(flower.petals[i].color.join(""));
        petals[i].style["transform-origin"] = `right ${15}px`;
        petals[i].style.transform = `rotate(${(i+0.00000001)/petalAm*360}deg)`;
        petals[i].style.right = `${45}px`;
        petals[i].style.top = `${45-15}px`;
        target.appendChild(petals[i]);   
    }
}

function removeFlower(target){
    target.innterHTML="";
}


