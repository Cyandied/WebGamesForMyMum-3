const buttons = document.querySelectorAll(".pick")
const input = document.querySelector(".input")
const guess = document.querySelector(".guess")
const display_c = document.querySelector(".display-colors")
const display_e = document.querySelector(".display-eval")
const res = document.querySelector(".results")
const guesses_passed = document.querySelector("#passed")

const color_num = {
    "red":1,
    "green":2,
    "blue":3,
    "yellow":4,
    "hotpink":5,
    "white":6,
    "orange":7,
    "purple":8
}

function rand_code(){
    const code = []
    while(code.length < 4){
        const num = Math.floor(Math.random() * 8 + 1)
        if(!code.includes(num)){
            code.push(num)
        }
    }
    return code
}

const code = rand_code()

buttons.forEach(button => {
    button.addEventListener("click", e=>{
        const color = e.target.dataset.color
        const dot = document.createElement("button")
        dot.classList.add(color)
        dot.classList.add("input-dot")
        dot.dataset.color = (color)
        if(input.childElementCount < 4){
            input.appendChild(dot)
            dot.addEventListener("click", e=>{
                const color = e.target.dataset.color
                const children = input.children
                for(var i=0; i<children.length;i++){
                    if(children[i].dataset.color == color){
                        input.removeChild(children[i])
                    }
                }
            })
        }
        
    })
})

function check_R(num, index){
    if(code[index] == num){
        return true
    }
    return false
}

function check_W(num){
    if(code.includes(num)){
        return true
    }
    return false
}

function make_solution_display(){
    const div = document.createElement("div")
    for(const num of code){
        const dot = document.createElement("div")
        dot.classList.add("input-dot")
        const color = Object.keys(color_num).filter(key => color_num[key] === num)
        dot.classList.add(color)
        div.appendChild(dot)
    }
    return div
}

function make_reload_btn(){
    const button = document.createElement("button")
    button.id = "again"
    button.addEventListener("click", e=>{
        location.reload()
    })
    button.innerHTML = "Spil igen?"
    return button
}

guess.addEventListener("click", e=>{
    if(input.childElementCount == 4){
        const guess_combination = []
        const children = input.children
        const div = document.createElement("div")
        for(var i = 0; i < 4; i++){
            guess_combination.push(color_num[children[0].dataset.color])
            div.appendChild(children[0])
        }
        guesses_passed.innerHTML = parseInt(guesses_passed.innerHTML) + 1
        display_c.appendChild(div)
        if(JSON.stringify(guess_combination) == JSON.stringify(code)){
            res.classList.remove("hidden")
            const msg = document.createElement("h1")
            msg.innerHTML = "DU VANDT!"
            res.appendChild(msg)
            const msg2 = document.createElement("h2")
            msg2.innerHTML = "Du fandt koden:"
            res.appendChild(msg2)
            res.appendChild(make_solution_display())
            res.appendChild(make_reload_btn())
        }
        else if(display_c.childElementCount == 12){
            res.classList.remove("hidden")
            const msg = document.createElement("h1")
            msg.innerHTML = "DU TABTE!"
            res.appendChild(msg)
            const msg2 = document.createElement("h2")
            msg2.innerHTML = "Koden var:"
            res.appendChild(msg2)
            res.appendChild(make_solution_display())
            res.appendChild(make_reload_btn())
        }
        else{
            const div = document.createElement("div")
            const div_R = document.createElement("div")
            const div_W = document.createElement("div")
            for(var i = 0; i < guess_combination.length; i++){
                if(check_R(guess_combination[i],i)){
                    const dot = document.createElement("div")
                    dot.classList.add("eval-dot")
                    dot.classList.add("red")
                    div_R.appendChild(dot)
                }
                else if(check_W(guess_combination[i])){
                    const dot = document.createElement("div")
                    dot.classList.add("eval-dot")
                    dot.classList.add("white")
                    div_W.appendChild(dot)
                }
            }
            div.appendChild(div_R)
            div.appendChild(div_W)
            display_e.appendChild(div)
        }
    }
})