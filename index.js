let colon3 = 0
let clickStrength = 1
let autoStrength = 0

let upgrades = {
click2:{cost:25},
auto1:{cost:50},
click5:{cost:200},
auto5:{cost:500},
mega:{cost:5000}
}

const counter = document.getElementById("counter")
const colonBtn = document.getElementById("colon3")

colonBtn.onclick = function(){
colon3 += clickStrength
update()
}

function update(){
counter.innerText=":3 : " + format(colon3)

if(colon3 >= 1000000000000){
endGame()
}
}

function buyUpgrade(type){

let up = upgrades[type]

if(colon3 < up.cost) return

colon3 -= up.cost

if(type=="click2"){
clickStrength*=2
up.cost*=3
document.getElementById("cost_click2").innerText=up.cost
}

if(type=="auto1"){
autoStrength+=1
up.cost*=1.7
document.getElementById("cost_auto1").innerText=Math.floor(up.cost)
}

if(type=="click5"){
clickStrength*=5
up.cost*=4
document.getElementById("cost_click5").innerText=up.cost
}

if(type=="auto5"){
autoStrength+=5
up.cost*=3
document.getElementById("cost_auto5").innerText=up.cost
}

if(type=="mega"){
clickStrength*=10
autoStrength+=10
up.cost*=6
document.getElementById("cost_mega").innerText=up.cost
}

update()
}

setInterval(function(){
colon3+=autoStrength
update()
},1000)

function format(num){
return Math.floor(num).toLocaleString()
}

function endGame(){
document.body.classList.add("end")
}
