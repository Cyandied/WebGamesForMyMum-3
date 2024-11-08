import {Level, Flower} from "../Classes.js";
export {Elevels};

const Elevel1 = new Level(
    3,3,
    {
        "r":1,
        "g":1,
        "b":0,
        "k":1,
        "w":0
    },
    [new Flower("","w","w","r,g,k","w")],
    "Setting up!",
    "Well done!",
    [
        ["","",""],
        ["f,1","",""],
        ["","",""]
    ],
    [new Flower("w")]
)

const Elevels = [Elevel1];