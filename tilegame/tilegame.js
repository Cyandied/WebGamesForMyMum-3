const gameboard = document.querySelector(".gamearea")
const tile_to_place = document.querySelector("#tile-container")
const game_over_screen = document.querySelector(".game-over")
const game_buttons = document.querySelectorAll(".game-button")
const points_counter = document.querySelector("#point")
const color_select = document.querySelector("#color-select")
const tile_style_sheet = document.querySelector("#tile-style-sheet")
const popup = document.querySelector(".popup")

const naked_data = {
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0
}

const colors = ["one","two","three","four","five","six"]

let round = 0
let points = 0
let tiles_placed = 0

color_select.addEventListener("change",e=>{
    const tile_style = color_select.value
    tile_style_sheet.setAttribute("href",`tile_styles/${tile_style}.css`)
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function show_popup(title){
    const title_part = document.createElement("h2")
    title_part.innerHTML = title
    popup.appendChild(title_part)
    popup.classList.add("display")
    sleep(3000).then(()=>{
        popup.classList.remove("display")
        sleep(500).then(()=>{
            popup.removeChild(title_part)
        })
    })
}

game_buttons.forEach(button =>{
    button.addEventListener("click", e=>{
        const action = e.target.dataset.action
        if(action == "rotate"){
            action_rotate_tile()
        }
        else if(action == "discard"){
            action_discard_tile()
        }
    })
})

function rand_tile_type() {
    const type = {
        "top": Math.floor(Math.random() * 6 + 1),
        "bottom": Math.floor(Math.random() * 6 + 1),
        "right": Math.floor(Math.random() * 6 + 1),
        "left": Math.floor(Math.random() * 6 + 1)
    }
    return type
}

function rotate_tile(old_data){
    const new_data = {"top":old_data.left,"bottom":old_data.right,"right":old_data.top, "left":old_data.bottom}
    return make_tile(new_data)
}

let discard_combo = 0

function action_discard_tile(){
    discard_combo++;
    if(discard_combo > 3){
        game_over_screen.classList.remove("hidden")
        return
    }
    const discard_counter = document.querySelector("#counter")
    discard_counter.innerHTML = discard_combo
    tile_to_place.replaceChild(make_tile(rand_tile_type()),tile_to_place.children[0])
}

function action_rotate_tile(){
    const tile = tile_to_place.children[0]
    const type = JSON.parse(tile.dataset.type)
    const rotated_tile = rotate_tile(type)
    tile_to_place.replaceChild(rotated_tile,tile_to_place.children[0])
}

document.addEventListener("keypress",e=>{
    if(e.key == "r"){
        action_rotate_tile()
    }
    else if(e.key == "d"){
        action_discard_tile()
    }
})

function get_adjacant_tile_info(col, row) {
    let top_tile = 0
    let bot_tile = 0
    let r_tile = 0
    let l_tile = 0
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

function place_tile(target_pos,tile){
    tiles_placed++;
    gameboard.children[target_pos.row].replaceChild(tile,gameboard.children[target_pos.row].children[target_pos.col])
    tile_to_place.appendChild(make_tile(rand_tile_type()))
}

function check_poins(tile_type, tile_attrib,adjacent_types){
    let points = 5
    let touching_tiles = 0
    for(const type in adjacent_types){
        if(adjacent_types[type] > 0){
            touching_tiles++;
        }
    }
    if(touching_tiles == 4){
        touching_tiles += 4
    }
    else if(touching_tiles > 0){
        touching_tiles--
    }

    if(tiles_placed%10 == 0){
        points += 20
    }
    
    points += touching_tiles*10
    if(points > 30){
        show_popup(`${points} point!`)
    }
    return points
}

function check_if_can_place(target_type, target_pos) {
    if (JSON.stringify(target_type) != JSON.stringify(naked_data)) {
        show_popup("Du må kun placerer brikker i tomme felter!")
        return false
    }
    const tile = tile_to_place.children[0]
    const type = JSON.parse(tile.dataset.type)
    const attrib = tile.dataset.attrib

    const adjacent_types = get_adjacant_tile_info(target_pos.col, target_pos.row)
    if((round > 0) == (JSON.stringify(adjacent_types) != JSON.stringify(naked_data))){
        if ((type.top == adjacent_types.top || adjacent_types.top == 0) && (type.bottom == adjacent_types.bottom || adjacent_types.bottom == 0) && (type.right == adjacent_types.right || adjacent_types.right == 0) && (type.left == adjacent_types.left || adjacent_types.left == 0)) {
            round++;
            place_tile(target_pos,tile)
            points += check_poins(type,attrib,adjacent_types)
            points_counter.innerHTML = points
        }
        else{
            show_popup("En eller flere sider macher ikke!")
        }
    }
    else{
        show_popup("Brik skal placeres ved siden af andre brikker!")
    }



}

function make_tile(data, col, row) {
    const tile = document.createElement("div")
    tile.classList.add("tile")
    tile.dataset.type = JSON.stringify(data)
    tile.dataset.pos = JSON.stringify({ "col": col, "row": row })
    tile.dataset.attrib = "none"
    if(JSON.stringify(data) != JSON.stringify(naked_data)){
        tile.classList.add(`top-${colors[data.top-1]}`)
        tile.classList.add(`bottom-${colors[data.bottom-1]}`)
        tile.classList.add(`right-${colors[data.right-1]}`)
        tile.classList.add(`left-${colors[data.left-1]}`)
    }
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
let row = []
const matrix = []

for (let i = 1; i <= 51 * 51; i++) {
    row.push(0)
    if (i % 51 == 0 && i != 0) {
        matrix.push(row)
        row = []
    }
}
for (let row = 0; row < matrix.length; row++) {
    const div = make_div()
    for (let col = 0; col < matrix[row].length; col++) {
        div.appendChild(make_tile(naked_data, col, row))
    }
    gameboard.appendChild(div)
}

gameboard.children[25].children[25].scrollIntoView({ block: "center", inline: "center" })
