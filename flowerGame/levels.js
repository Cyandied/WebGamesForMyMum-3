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

    compareSame(otherFlower){
        for (let i = 0; i < this.petalAmount; i++){
            if(!this.petals[i].compareSame(otherFlower.petals[i])){
                return false;
            }
        }
        return true;
    }

    combine(otherFlower){
        const newPetals = [];
        for (let i = 0; i < this.petalAmount; i++) {
            newPetals.push(this.petals[i].combine(otherFlower.petals[i]));
        }
        const newFlower = new Flower(this.petalAmount);
        newFlower.petals = newPetals;
        return newFlower;
    }

    makeNew(flower,toreplace){
        console.log(toreplace);
        const newPetals = this.petals;
        const newFlower = new Flower(this.petalAmount);
        newFlower.petals = newPetals;
        newFlower.petals[toreplace] = flower.petals[toreplace];
        return newFlower;
    }

    makeFromJSON(json){
        this.petalAmount = json["petalAmount"];
        this.petals = [];
        json["petals"].forEach(petal => {
            this.petals.push(new Petal(petal["color"]));
        })
    }
}

class Petal {
    constructor(color){
        this.color = color;
    }

    compareSame(otherPetal){
        return (otherPetal.color.sort().join(",") == this.color.sort().join(","))
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
        return new Petal(newColor);
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

const tutLevel1 = new Level(
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

const tutLevel2 = new Level(
    3,3,3,
    {
        "r":1,
        "g":1,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower(3,"","r","g","b")
    ],
    "Please place the red flower on any highlighted tiles",
    "Well done!",
    [
        ["x","h","x"],
        ["x","x","x"],
        ["h","x","f,1"]
    ],
    [new Flower(3,"b")]
);

const levels = {
    "Tutorial":
    [tutLevel1,tutLevel2],
    "Easy":
    [],
    "Medium":
    [],
    "Hard":
    []
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
        const h1 = document.createElement("h1");
        h1.innerHTML = levelName;
        document.body.appendChild(h1);
        const newList = levelList.cloneNode(true);
        var item = localStorage.getItem(levelName)
       if(item){
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
       }
       else {
           localStorage.setItem(levelName,JSON.stringify(makeFalseList(levels[levelName].length)));
       }
       document.body.appendChild(newList);
   })
}


