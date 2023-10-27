const gameboard = document.querySelector(".gamearea")
const tile_to_place = document.querySelector("#tile-container")
const game_over_screen = document.querySelector(".game-over")
const game_buttons = document.querySelectorAll(".game-button")
const points_counter = document.querySelector("#point")
const color_select = document.querySelector("#color-select")
const tile_style_sheet = document.querySelector("#tile-style-sheet")
const popup = document.querySelector(".popup")
const discard_counter = document.querySelector("#counter")

const naked_data = {
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0
}

const classes = ["one", "two", "three", "four", "five", "six"]

const gameboard_size = 51

let round = 0
let points = 0
let tiles_placed = 0
let discard_combo = 0
const local_storage_board = localStorage.getItem("board")

function make_new_board() {
    for (let row = 0; row < gameboard_size; row++) {
        const div = document.createElement("div")
        for (let col = 0; col < gameboard_size; col++) {
            div.appendChild(make_tile(naked_data, col, row))
        }
        gameboard.appendChild(div)
    }
}

function make_saved_board(saved_board){
    round = saved_board.round
    points = saved_board.points
    points_counter.innerHTML = points
    tiles_placed = saved_board.tiles_placed
    discard_combo = saved_board.discard_combo
    discard_counter.innerHTML = discard_combo

    for (let row = 0; row < gameboard_size; row++) {
        const div = document.createElement("div")
        for (let col = 0; col < gameboard_size; col++) {
            const tile = saved_board.board[row][col]
            const type = tile.type
            const pos = tile.pos
            const attrib = tile.attrib
            div.appendChild(make_tile(type, pos.col, pos.row, attrib))
        }
        gameboard.appendChild(div)
    }
}


if (local_storage_board == null) {
    make_new_board()
}
else if(!JSON.parse(local_storage_board).active){
    make_new_board()
}
else{
    make_saved_board(JSON.parse(local_storage_board))
}
gameboard.children[25].children[25].scrollIntoView({ block: "center", inline: "center" })

if(round == 0){
    tile_to_place.appendChild(make_tile({
        "top": 1,
        "bottom": 2,
        "right": 3,
        "left": 4
    }, null, null, "none"))
}
else {
    tile_to_place.appendChild(make_tile(rand_tile_type()))
}

color_select.addEventListener("change", e => {
    const tile_style = color_select.value
    tile_style_sheet.setAttribute("href", `../tile_styles/${tile_style}.css`)
})

function roll_dice() {
    return Math.floor(Math.random() * 40)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function show_popup(title) {
    const title_part = document.createElement("h2")
    title_part.innerHTML = title
    popup.appendChild(title_part)
    popup.classList.add("display")
    sleep(3000).then(() => {
        popup.classList.remove("display")
        sleep(500).then(() => {
            popup.removeChild(title_part)
        })
    })
}

game_buttons.forEach(button => {
    button.addEventListener("click", e => {
        const action = e.target.dataset.action
        if (action == "rotate") {
            action_rotate_tile()
        }
        else if (action == "discard") {
            action_discard_tile()
        }
        else if (action == "save") {
            action_save()
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

function rotate_tile(old_data, attrib) {
    const new_data = {
        "top": old_data.left,
        "bottom": old_data.right,
        "right": old_data.top,
        "left": old_data.bottom,
    }
    return make_tile(new_data, null, null, attrib)
}

function make_reload_btn() {
    const button = document.createElement("button")
    button.id = "again"
    button.addEventListener("click", e => {
        location.reload()
        localStorage.clear()
    })
    button.innerHTML = "Spil igen?"
    return button
}

function display_points(){
    const h1 = document.createElement("h1")
    h1.innerHTML = `Du fik ${points} point!`
    return h1
}

function action_discard_tile() {
    discard_combo++;
    discard_counter.innerHTML = discard_combo
    tile_to_place.replaceChild(make_tile(rand_tile_type()), tile_to_place.children[0])
}

function action_rotate_tile() {
    const tile = tile_to_place.children[0]
    const type = JSON.parse(tile.dataset.type)
    const attrib = tile.dataset.attrib
    const rotated_tile = rotate_tile(type, attrib)
    tile_to_place.replaceChild(rotated_tile, tile_to_place.children[0])
}

function action_save() {
    const game = []
    const wrap = {}
    for (let row = 0; row < gameboard.children.length; row++) {
        const game_row = []
        for (let col = 0; col < gameboard.children[row].children.length; col++) {
            const tile = gameboard.children[row].children[col]
            game_row.push({
                "type": JSON.parse(tile.dataset.type),
                "pos": JSON.parse(tile.dataset.pos),
                "attrib": tile.dataset.attrib
            })
        }
        game.push(game_row)
    }
    wrap["active"] = true
    wrap["board"] = game
    wrap["points"] = points
    wrap["tiles_placed"] = tiles_placed
    wrap["round"] = round
    wrap["discard_combo"] = discard_combo
    localStorage.setItem("board", JSON.stringify(wrap))
}

document.addEventListener("keypress", e => {
    if (e.key == "r") {
        action_rotate_tile()
    }
    else if (e.key == "d") {
        action_discard_tile()
    }
    else if (e.key == "s") {
        action_save()
    }
})

function get_adjacant_tile_info(col, row) {
    let top_tile = 0
    let bot_tile = 0
    let r_tile = 0
    let l_tile = 0
    if (row - 1 >= 0) {
        top_tile = JSON.parse(gameboard.children[row - 1].children[col].dataset.type).bottom
    }
    if (row + 1 < gameboard_size) {
        bot_tile = JSON.parse(gameboard.children[row + 1].children[col].dataset.type).top
    }
    if (col + 1 < gameboard_size) {
        r_tile = JSON.parse(gameboard.children[row].children[col + 1].dataset.type).left
    }
    if (col - 1 >= 0) {
        l_tile = JSON.parse(gameboard.children[row].children[col - 1].dataset.type).right
    }

    return { "top": top_tile, "bottom": bot_tile, "right": r_tile, "left": l_tile }
}

function place_tile(target_pos, tile) {
    tiles_placed++;
    gameboard.children[target_pos.row].replaceChild(tile, gameboard.children[target_pos.row].children[target_pos.col])
    tile_to_place.appendChild(make_tile(rand_tile_type()))
    if (tiles_placed == 100) {
        game_over_screen.classList.remove("hidden")
        game_over_screen.appendChild(display_points())
        game_over_screen.appendChild(make_reload_btn())
    }
}

function check_attrib_points(attrib, adjacent_types) {
    let tiles_adjacant = 0
    for (const key in adjacent_types) {
        if (adjacent_types[key] > 0) {
            tiles_adjacant++
        }
    }
    if (attrib == undefined) {
        return 0
    }
    if (attrib.includes("touch")) {
        const number_needs_touch = parseInt(attrib.split(" ")[1])
        if (number_needs_touch == tiles_adjacant) {
            return tiles_adjacant * 20
        }
    }
    return 0
}

function check_poins(tile_type, tile_attrib, adjacent_types) {
    let points = 5
    let touching_tiles = 0
    for (const type in adjacent_types) {
        if (adjacent_types[type] > 0) {
            touching_tiles++;
        }
    }
    if (touching_tiles == 4) {
        touching_tiles += 4
    }
    else if (touching_tiles > 0) {
        touching_tiles--
    }

    if (tiles_placed % 10 == 0) {
        points += 20
    }
    points += check_attrib_points(tile_attrib, adjacent_types)
    points += touching_tiles * 10
    if (points > 30) {
        show_popup(`${points} point!`)
    }
    return points
}

function check_if_can_place(target_type, target_pos) {
    if (JSON.stringify(target_type) != JSON.stringify(naked_data)) {
        show_popup("Du må kun placerer brikker i tomme felter!")
        return
    }
    const tile = tile_to_place.children[0]
    const type = JSON.parse(tile.dataset.type)
    const attrib = tile.dataset.attrib

    const adjacent_types = get_adjacant_tile_info(target_pos.col, target_pos.row)
    if ((round > 0) == (JSON.stringify(adjacent_types) != JSON.stringify(naked_data))) {
        if (
            (type.top == adjacent_types.top || adjacent_types.top == 0) &&
            (type.bottom == adjacent_types.bottom || adjacent_types.bottom == 0) &&
            (type.right == adjacent_types.right || adjacent_types.right == 0) &&
            (type.left == adjacent_types.left || adjacent_types.left == 0)
        ) {
            round++;
            place_tile(target_pos, tile)
            points += check_poins(type, attrib, adjacent_types)
            points_counter.innerHTML = points
        }
        else {
            show_popup("En eller flere sider macher ikke!")
        }
    }
    else {
        show_popup("Brik skal placeres ved siden af andre brikker!")
    }
}

function make_tile(data, col, row, attrib) {
    const tile = document.createElement("div")
    const tile_decoration = document.createElement("div")
    tile.classList.add("tile-wrapper")
    tile_decoration.classList.add("tile")
    tile.dataset.type = JSON.stringify(data)
    tile.dataset.pos = JSON.stringify({ "col": col, "row": row })
    if (JSON.stringify(data) == JSON.stringify(naked_data)) {
        tile.dataset.attrib = "none"
    }
    else {
        const span = document.createElement("span")
        span.classList.add("tile-symbol")

        if (attrib == "none") {
            tile.dataset.attrib = attrib
        }
        else if (!["touch 1", "touch 2", "touch 3", "touch 4"].includes(attrib)) {
            const dice_roll = roll_dice()
            if (dice_roll > 35) {
                const nr = Math.floor(Math.random() * 4 + 1)
                tile.dataset.attrib = `touch ${nr}`
                span.innerHTML = `touch ${nr}`
            }
            else{
                tile.dataset.attrib = "none"
            }
        }
        else {
            tile.dataset.attrib = attrib
            span.innerHTML = attrib
        }
        tile.appendChild(span)
        tile_decoration.classList.add(`top-${classes[data.top - 1]}`)
        tile_decoration.classList.add(`bottom-${classes[data.bottom - 1]}`)
        tile_decoration.classList.add(`right-${classes[data.right - 1]}`)
        tile_decoration.classList.add(`left-${classes[data.left - 1]}`)
    }
    tile.addEventListener("click", e => {
        const clicked_tile = e.target
        const type = JSON.parse(clicked_tile.dataset.type)
        const pos = JSON.parse(clicked_tile.dataset.pos)
        check_if_can_place(type, pos)
    })
    tile.appendChild(tile_decoration)
    return tile
}



