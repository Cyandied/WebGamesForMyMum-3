export {levels,setComplete,Flower,Level};

class Flower {
    constructor(petalAmount, colors){
        this.petalAmount = petalAmount;
        this.petals = [];
        if (colors.length == 1){
            for (let index = 0; index < this.petalAmount; index++) {
                this.petals.push(new Petal(colors[0]));
            }
        }
        else {
            colors.forEach(color => {
                this.petals.push(new Petal(color))
            });
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
            "bl":0,
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
            else if(c.match("bl") && counter["w"] > 0 && counter["bl"] > 0){
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
    constructor(gridx,gridy,petals,pflowers,order,htiles,dtiles,msgb,msga,lvlComplete) {
        this.gridx = gridx,
        this.gridy = gridy,
        this.pAmount = petals,
        this.playerFlowers = [],
        pflowers.forEach(c=> {
            this.playerFlowers.push(new Flower(petals,c));
        })
        this.order = [],
        order.forEach(c=> {
            this.order.push(new Flower(petals,c));
        })
        this.highlightTiles = htiles,
        this.disableTiles = dtiles,
        this.messageBefore = msgb,
        this.messageAfter = msga,
        this.levelComplete = lvlComplete
    }

}

const levelList = document.querySelector(".levelList");

const testLevel = new Level(3,3,3,[["r"]],[["r","b"]],[[0,1],[1,0],[1,2],[2,1]],[[0,1],[0,2],[2,1],[2,2]],"Place red flower in any highlighted tile to combine their colors","Well done!",false);

const levels = {
    "Tutorial":
    [new Level(3,3,3,[["r"]],[["r","b"]],[[0,1],[1,0],[1,2],[2,1]],[[0,1],[0,2],[2,1],[2,2]],"Place red flower in any highlighted tile to combine their colors","Well done!",false),testLevel,testLevel,testLevel,testLevel],
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
               levels[levelName][i].lvlComplete = item[i];
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

