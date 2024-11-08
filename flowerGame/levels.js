export {levels,setComplete};
import {TLevels } from "./Levels/TutLevels.js";
import {Elevels} from "./Levels/EasyLevels.js";
import {Mlevels} from "./Levels/MediumLevels.js";
import {Hlevels} from "./Levels/HardLevels.js";


const levelList = document.querySelector(".levelList");



const levels = {
    "Tutorial": TLevels,
    "Easy": Elevels,
    "Medium":Mlevels,
    "Hard":Hlevels
}


function makeFalseList(len){
    const list = [];
    for (let i = 0; i < len; i++) {
        list.push(false); 
    }
    return list;
}

function setComplete(pack,id){
    levels[pack][id].levelComplete = true;
    const item = JSON.parse(localStorage.getItem(pack));
    item[id] = true;
    localStorage.setItem(pack,JSON.stringify(item));
}

if(levelList){
    localStorage.clear();
    Object.keys(levels).forEach(levelName => {
        const h1 = document.createElement("h1");
        h1.innerHTML = levelName;
        document.body.appendChild(h1);
        const newList = levelList.cloneNode(true);

        var item = localStorage.getItem(levelName)
        if(!item){
            localStorage.setItem(levelName,JSON.stringify(makeFalseList(levels[levelName].length)));
            item = localStorage.getItem(levelName);
        }

        item = JSON.parse(item);
        for (let i = 0; i < item.length; i++) {
            const lvl = levels[levelName][i];
            levels[levelName][i].levelComplete = item[i];
            const a = document.createElement("a");
            a.innerHTML = i+1;
            a.href = `level.html?pack=${levelName}&id=${i}`
            a.dataset.pack = levelName;
            a.dataset.id = i;
            if(lvl.levelComplete){
                a.classList.add("lvlC");
            }
            newList.appendChild(a);
            newList.classList.remove("hidden");
        }
    
       document.body.appendChild(newList);
   })
}


