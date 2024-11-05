export {levels,setComplete,Flower,Level};

class Flower {
    constructor(petalAmount,universal="", petal1="",petal2="",petal3="",petal4="",petal5=""){
        this.petalAmount = petalAmount;
        if(petal1==""){
            this.petals = [new Petal(universal.split(",")),new Petal(universal.split(",")),new Petal(universal.split(",")),new Petal(universal.split(",")),new Petal(universal.split(","))];
        }
        else {
            this.petals = [new Petal(petal1.split(",")),new Petal(petal2.split(",")),new Petal(petal3.split(",")),new Petal(petal4.split(",")),new Petal(petal5.split(","))];
        }
    }
    combine(otherFlower){
        const newColors = [];
        for (let index = 0; index < this.petalAmount; index++) {
            newColors.push(this.petals[i].combine(otherFlower.petals[i]));
        }
        return new Flower(this.petalAmount,newColors);
    }

    makeNew(flowers){
        const newColors = []
        for (let index = 0; index < flowers[0].petalAmount; index++) {
            newColors.push(flowers[i].petals[i].color);
        }
        return new Flower(flowers[0].petalAmount,newColors);
    }
}

class Petal {
    constructor(color){
        this.color = color;
    }

    combine(otherPetal) {
        const counter = {
            "r":0,
            "g":0,
            "b":0,
            "k":0,
            "w":0
        }
        this.color.forEach(c => {
            counter[c] += 1;
        })
        otherPetal.color.forEach(c => {
            counter[c] += 1;
        })
        const newColor = [];
        Object.keys(counter).forEach(c => {
            if(counter[c] > 1){
                newColor.push(c);
                return newColor;
            }
            else if(c.match("k") && counter["w"] > 0 && counter["k"] > 0){
                return newColor;
            }
            else if (counter[c] > 0){
                newColor.push(c);
            }
        })
        return newColor;
    }
}

class Level {
    constructor(gridx,gridy,petals,pflowers,order,msgb = NaN,msga = NaN,startState = NaN,startFlowers = NaN) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.pAmount = petals;
        this.playerFlowers = pflowers;
        this.order = order;
        this.messageBefore = msgb;
        this.messageAfter = msga;
        this.startState = startState;
        this.startFlowers = startFlowers;
        this.levelComplete = false;
    }

}

const levelList = document.querySelector(".levelList");

const testLevel = new Level(
    3,3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower(3,"r,b")
    ],
    "Please place the red flower on any highlighted tiles",
    "Well done!",
    [
        ["x","h","x"],
        ["h","f,1","h"],
        ["x","h","x"]
    ],
    [new Flower(3,"b")]
);

const levels = {
    "Tutorial":
    [testLevel,testLevel,testLevel,testLevel],
    "Easy":
    [testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel],
    "Medium":
    [testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel],
    "Hard":
    [testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel,testLevel]
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
    Object.keys(levels).forEach(levelName => {
        var item = localStorage.getItem(levelName)
       if(item){
           item = JSON.parse(item);
           for (let i = 0; i < item.length; i++) {
               levels[levelName][i].levelComplete = item[i];
           }
       }
       else {
           localStorage.setItem(levelName,JSON.stringify(makeFalseList(levels[levelName].length)));
       }
       const h1 = document.createElement("h1");
       h1.innerHTML = levelName;
       document.body.appendChild(h1);
       const newList = levelList.cloneNode(true);
       levels[levelName].forEach(function callBack(lvl,i) {
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
       })
       document.body.appendChild(newList);
   })
}


