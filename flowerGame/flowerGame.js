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

for (let row = 0; row < level.gridy; row++) {
    const row = rowTempalte.cloneNode(true);
    const rowPlay = [];
    row.classList.remove("hidden");
    for (let col = 0; col < level.gridx; col++) {
        const plot = document.createElement("div");
        plot.classList.add = "plot";
        rowPlay.push(plot);
        row.appendChild(plot);
    }
    playGrid.push(rowPlay);
    gardenWrapper.appendChild(row);
}

function createFlower(flower){
    
}


