export {Level,Flower};

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
        for(var c of Object.keys(counter)){
            if(counter[c] > 1){
                newColor.push(c);
                return newColor;
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