import {Level, Flower} from "../Classes.js";
export {Elevels};

const Elevel1 = new Level(
    3,3,3,
    {
        "r":1,
        "g":1,
        "b":0,
        "k":1,
        "w":0
    },
    [new Flower(3,"","w","w","r,g,k")],
    "Blindspot",
    "Well done!",
    [
        ["f,1","",""],
        ["","",""],
        ["","",""]
    ],
    [new Flower(3,"w")]
)

const Elevels = [Elevel1];