const levelList = document.querySelector(".levelList");

class Level {
    constructor(gridx,gridy,pflowers,order,msgb = NaN,msga = NaN,startState = NaN,startFlowers = NaN) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.pAmount = 4;
        this.playerFlowers = pflowers;
        this.order = order;
        this.messageBefore = msgb;
        this.messageAfter = msga;
        this.startState = startState;
        this.startFlowers = startFlowers;
        this.levelComplete = false;
    }

}

class Flower {
    constructor(universal="", petal1="",petal2="",petal3="",petal4=""){
        this.petalAmount = 4;
        if(petal1==""){
            this.petals = [new Petal(universal.split(",")),new Petal(universal.split(",")),new Petal(universal.split(",")),new Petal(universal.split(","))];
        }
        else {
            this.petals = [new Petal(petal1.split(",")),new Petal(petal2.split(",")),new Petal(petal3.split(",")),new Petal(petal4.split(","))];
        }
    }

    compareSame(otherFlower){
        for (let i = 0; i < 4; i++){
            if(!this.petals[i].compareSame(otherFlower.petals[i])){
                return false;
            }
        }
        return true;
    }

    combine(otherFlower){
        const newPetals = [];
        for (let i = 0; i < 4; i++) {
            newPetals.push(this.petals[i].combine(otherFlower.petals[i]));
        }
        const newFlower = new Flower();
        newFlower.petals = newPetals;
        return newFlower;
    }

    makeNew(flower,toreplace){
        const newPetals = this.petals;
        const newFlower = new Flower();
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
        for(var c of Object.keys(counter)){
            if(counter[c] > 1){
                return new Petal([c]);
            }
            else if (counter[c] > 0){
                newColor.push(c);
            }
        }
        if(newColor.includes("k") && newColor.includes("w")){
            if(newColor.sort().join("") != ["k","w"].sort().join("")){
                newColor.pop(newColor.indexOf("k"));
                newColor.pop(newColor.indexOf("w"));
            }
        }
        return new Petal(newColor);
    }
}

const tutLevel1 = new Level(
    3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower("r,b")
    ],
    "You can merge flowers by placing new flowers on a diagonal, a new flower with mixed colors will spawn on the flower you placed.",
    "Well done!",
    [
        ["h","x","h"],
        ["x","f,1","x"],
        ["h","x","h"]
    ],
    [new Flower("b")]
);

const tutLevel2 = new Level(
    3,3,
    {
        "r":0,
        "g":1,
        "b":1,
        "k":1,
        "w":1
    },
    [
        new Flower("","b","g","k","w")
    ],
    "You can replace petals on flowers by placing flowers in the cardinal diration, this will not move the exsisting flower.",
    "Well done!",
    [
        ["x","h","x"],
        ["h","f,1","h"],
        ["x","h","x"]
    ],
    [new Flower("r")]
);

const tutLevel3 = new Level(
    3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower("","g","g","b,r","g")
    ],
    "Use the movement from the red flower merging with the blue to combine with the green flower",
    "Well done!",
    [
        ["x","x","x"],
        ["x","x","f,2"],
        ["f,1","h","x"]
    ],
    [new Flower("g"),new Flower("b")]
);

const tutLevel4 = new Level(
    3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower("r,g,b")
    ],
    "If conditions allow, you can merge several flowers at once",
    "Well done!",
    [
        ["x","x","f,1"],
        ["x","h","x"],
        ["f,2","x","x"]
    ],
    [new Flower("g"),new Flower("b")]
);

const tutLevel5 = new Level(
    3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower("","g","g","r","g"),
        new Flower("","b","r","b","b"),
        new Flower("","r","k","k","k"),
        new Flower("","w","w","w","r"),
    ],
    "If conditions allow, you can split one flower amongst 4 others",
    "Well done!",
    [
        ["x","f,4","x"],
        ["f,1","h","f,3"],
        ["x","f,2","x"]
    ],
    [new Flower("g"),new Flower("b"),new Flower("k"),new Flower("w")]
);

const tutLevel6 = new Level(
    3,3,
    {
        "r":2,
        "g":0,
        "b":1,
        "k":0,
        "w":0
    },
    [
        new Flower("","r,g","r","r,b","r,g")
    ],
    "Use what you have learned to complete this level",
    "Well done!",
    [
        ["","",""],
        ["","f,1",""],
        ["","",""]
    ],
    [new Flower("g")]
);

const tutLevel7 = new Level(
    7,7,
    {
        "r":99,
        "g":99,
        "b":99,
        "k":99,
        "w":99
    },
    [],
    "Free play",
    "Free play",
    [
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""]
    ],
    []
);

const TLevels = [tutLevel1,tutLevel2,tutLevel3,tutLevel4,tutLevel5,tutLevel6,tutLevel7];

const Elevel1 = new Level(
    3,3,
    {
        "r":0,
        "g":0,
        "b":1,
        "k":0,
        "w":1
    },
    [new Flower("","g","g","g","b,w")],
    "Setting up 1",
    "Well done!",
    [
        ["","f,1",""],
        ["","",""],
        ["","",""]
    ],
    [new Flower("g")]
)

const Elevel2 = new Level(
    3,3,
    {
        "r":1,
        "g":1,
        "b":0,
        "k":1,
        "w":0
    },
    [new Flower("","w","w","r,g,k","w")],
    "Setting up 2",
    "Well done!",
    [
        ["","",""],
        ["f,1","",""],
        ["","",""]
    ],
    [new Flower("w")]
)

const Elevel3 = new Level(
    4,4,
    {
        "r":0,
        "g":0,
        "b":0,
        "k":1,
        "w":2
    },
    [new Flower("","w,r","w,r","k","w,r"),new Flower("","k","w,g","w,g","w,g")],
    "Moving",
    "Well done!",
    [
        ["","","",""],
        ["","f,1","",""],
        ["","","",""],
        ["","","","f,2"]
    ],
    [new Flower("r"),new Flower("g")]
)

const Elevels = [Elevel1,Elevel2,Elevel3];

const levels = {
    "Tutorial": TLevels,
    "Easy": Elevels
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

const url = window.location.search;
const urlParams = new URLSearchParams(url);

function setComplete(pack,id){
    levels[pack][id].levelComplete = true;
    const item = JSON.parse(localStorage.getItem(pack));
    if(item == null){
        return;
    }
    item[id] = true;
    localStorage.setItem(pack,JSON.stringify(item));
}

if(urlParams.size > 0){
    setComplete(urlParams.get("pack"), urlParams.get("id"));
}

if(levelList){
    // localStorage.clear();
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


