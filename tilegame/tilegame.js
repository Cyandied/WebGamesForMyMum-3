const gameboard = document.querySelector(".gamearea")
const tile_to_place = document.querySelector("#tile-container")

const naked_data = {
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0
}

var round = 0

function rand_tile_type() {
    const type = {
        "top": Math.floor(Math.random() * 4 + 1),
        "bottom": Math.floor(Math.random() * 4 + 1),
        "right": Math.floor(Math.random() * 4 + 1),
        "left": Math.floor(Math.random() * 4 + 1)
    }
    return type
}

function get_adjacant_tile_info(col, row) {
    var top_tile = 0
    var bot_tile = 0
    var r_tile = 0
    var l_tile = 0
    if(row-1 >= 0){
        top_tile = JSON.parse(gameboard.children[row-1].children[col].dataset.type).bottom
    }
    if(row+1 < matrix.length){
        bot_tile = JSON.parse(gameboard.children[row+1].children[col].dataset.type).top
    }
    if(col+1 < matrix.length){
        r_tile = JSON.parse(gameboard.children[row].children[col+1].dataset.type).left
    }
    if(col-1 >= 0){
        l_tile = JSON.parse(gameboard.children[row].children[col-1].dataset.type).right
    }

    return { "top": top_tile, "bottom": bot_tile, "right": r_tile, "left": l_tile }
}

function check_if_can_place(target_type, target_pos) {
    if (JSON.stringify(target_type) != JSON.stringify(naked_data)) {
        console.log("not allow")
        return false
    }
    const tile = tile_to_place.children[0]
    const type = JSON.parse(tile.dataset.type)

    const adjacent_types = get_adjacant_tile_info(target_pos.col, target_pos.row)
    if((round > 0) == (JSON.stringify(adjacent_types) != JSON.stringify(naked_data))){
        if ((type.top == adjacent_types.top || adjacent_types.top == 0) && (type.bottom == adjacent_types.bottom || adjacent_types.bottom == 0) && (type.right == adjacent_types.right || adjacent_types.right == 0) && (type.left == adjacent_types.left || adjacent_types.left == 0)) {
            round++;
            tile.classList.add("red")
            gameboard.children[target_pos.row].replaceChild(tile,gameboard.children[target_pos.row].children[target_pos.col])
            tile_to_place.appendChild(make_tile(rand_tile_type()))
        }
        else{
            console.log("sides do not match")
        }
    }
    else{
        console.log("must place tile so it touches others")
    }



}

function make_tile(data, col, row) {
    const tile = document.createElement("div")
    tile.classList.add("tile")
    tile.dataset.type = JSON.stringify(data)
    tile.dataset.pos = JSON.stringify({ "col": col, "row": row })
    tile.addEventListener("click", e => {
        const clicked_tile = e.target
        const type = JSON.parse(clicked_tile.dataset.type)
        const pos = JSON.parse(clicked_tile.dataset.pos)
        check_if_can_place(type, pos)
    })
    return tile
}

tile_to_place.appendChild(make_tile({
    "top": 1,
    "bottom": 2,
    "right": 3,
    "left": 4
}, null, null))

function make_div() {
    return document.createElement("div")
}
var row = []
var matrix = []

for (var i = 1; i <= 51 * 51; i++) {
    row.push(0)
    if (i % 51 == 0 && i != 0) {
        matrix.push(row)
        row = []
    }
}
for (var row = 0; row < matrix.length; row++) {
    const div = make_div()
    for (var col = 0; col < matrix[row].length; col++) {
        div.appendChild(make_tile(naked_data, col, row))
    }
    gameboard.appendChild(div)
}

gameboard.children[25].children[25].scrollIntoView({ block: "center", inline: "center" })
