import {Level, Flower} from "../Classes.js";
export {TLevels};

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