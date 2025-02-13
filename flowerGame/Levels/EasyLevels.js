import {Level, Flower} from "../Classes.js";
export {Elevels};

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