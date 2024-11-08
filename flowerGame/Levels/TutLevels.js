import {Level, Flower} from "../Classes.js";
export {TLevels};

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
    "Expirament with placing the red and green flower in the highlighted tiles to replace the petals on the blue flower",
    "Well done!",
    [
        ["h","x","h"],
        ["x","f,1","x"],
        ["h","x","x"]
    ],
    [new Flower(3,"b")]
);

const tutLevel3 = new Level(
    3,3,4,
    {
        "r":0,
        "g":1,
        "b":1,
        "k":1,
        "w":1
    },
    [
        new Flower(4,"","b","g","k","w")
    ],
    "Place the green, blue, black and white flowers in the highlighted tiles to get a feel for how placement works for 4 petal flowers",
    "Well done!",
    [
        ["h","x","h"],
        ["x","f,1","x"],
        ["h","x","h"]
    ],
    [new Flower(4,"r")]
);

const tutLevel4 = new Level(
    3,3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower(3,"","g","g","b,r")
    ],
    "Use the movement from the red flower merging with the blue to combine with the green flower",
    "Well done!",
    [
        ["x","x","x"],
        ["f,1","x","x"],
        ["x","h","f,2"]
    ],
    [new Flower(3,"g"),new Flower(3,"b")]
);

const tutLevel5 = new Level(
    3,3,3,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower(3,"r,g,b")
    ],
    "If conditions allow, you can merge several flowers at once",
    "Well done!",
    [
        ["x","x","x"],
        ["x","h","f,1"],
        ["x","f,2","x"]
    ],
    [new Flower(3,"g"),new Flower(3,"b")]
);

const tutLevel6 = new Level(
    3,3,4,
    {
        "r":1,
        "g":0,
        "b":0,
        "k":0,
        "w":0
    },
    [
        new Flower(4,"","r","w","w","w"),
        new Flower(4,"","g","r","g","g"),
        new Flower(4,"","k","k","r","k"),
        new Flower(4,"","b","b","b","r"),
    ],
    "If conditions allow, you can split one flower amongst 4 others",
    "Well done!",
    [
        ["f,2","x","f,4"],
        ["x","h","x"],
        ["f,3","x","f,1"]
    ],
    [new Flower(4,"g"),new Flower(4,"b"),new Flower(4,"k"),new Flower(4,"w")]
);

const tutLevel7 = new Level(
    3,3,3,
    {
        "r":2,
        "g":0,
        "b":1,
        "k":0,
        "w":0
    },
    [
        new Flower(3,"","r,g","r","r,b")
    ],
    "Use what you have learned to complete this level",
    "Well done!",
    [
        ["","",""],
        ["","f,1",""],
        ["","",""]
    ],
    [new Flower(3,"g")]
);

const TLevels = [tutLevel1,tutLevel2,tutLevel3,tutLevel4,tutLevel5,tutLevel6,tutLevel7];