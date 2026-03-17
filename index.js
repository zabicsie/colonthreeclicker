let colon3=0
let clickStrength=1
let autoStrength=0

const counter=document.getElementById("counter")
const perSec=document.getElementById("perSec")
const perClick=document.getElementById("perClick")

document.getElementById("colon3").onclick=()=>{
colon3+=clickStrength
unlock("click1")
update()
}

/* SHOP */
let shopItems=[

{name:"+1 click strength",cost:10,type:"click",value:1,owned:0},
{name:"+5 auto",cost:50,type:"auto",value:5,owned:0},

{name:"+5 click",cost:200,type:"click",value:5,owned:0},
{name:"+25 auto",cost:500,type:"auto",value:25,owned:0},

{name:"+20 click",cost:2000,type:"click",value:20,owned:0},
{name:"+100 auto",cost:5000,type:"auto",value:100,owned:0},

{name:"+100 click",cost:20000,type:"click",value:100,owned:0},
{name:"+500 auto",cost:50000,type:"auto",value:500,owned:0},

{name:"SUPER click +1000",cost:150000,type:"click",value:1000,owned:0},
{name:"MEGA auto +2000",cost:300000,type:"auto",value:2000,owned:0}

]

const shop=document.getElementById("shop")

function renderShop(){
shop.innerHTML=""
shopItems.forEach((item,i)=>{
let div=document.createElement("div")
div.className="item"
div.innerHTML=`
${item.name}<br>
Cost: ${item.cost}<br>
Owned: ${item.owned}
`
div.onclick=()=>buy(i)
shop.appendChild(div)
})
}

function buy(i){
let item=shopItems[i]
if(colon3<item.cost) return

colon3-=item.cost
item.owned++

if(item.type=="click") clickStrength+=item.value
if(item.type=="auto"){
autoStrength+=item.value
unlock("auto1")
}

item.cost=Math.floor(item.cost*1.5)

renderShop()
update()
}

/* LOOP */
setInterval(()=>{
colon3+=autoStrength
update()
},1000)

function update(){
counter.innerText=":3 : "+format(colon3)
perSec.innerText=autoStrength
perClick.innerText=clickStrength

checkAchievements()
if(colon3>=1e12) win()
}

function format(n){
return Math.floor(n).toLocaleString()
}

/* MENU */
document.getElementById("menuBtn").onclick=()=>{
let d=document.getElementById("dropdown")
d.style.display=d.style.display=="block"?"none":"block"
}

/* ACHIEVEMENTS */
let achievements={

click1:{name:"One of Many",desc:"ur first ever click",got:false},
thousand:{name:"Still More to Go",desc:"reach 1,000 :3s",got:false},
million:{name:"My Fingers Are Getting Tired",desc:"reach 1m :3s",got:false},
auto1:{name:"A Handful of Help",desc:"get auto income",got:false},

custom1:{name:"You Actually Like This Game?",desc:"keep playing...",got:false},
rich:{name:"Getting Serious",desc:"reach 100k :3s",got:false},
insane:{name:"This Is Out of Hand",desc:"reach 1b :3s",got:false},

grinder:{name:"Endless Grinder",desc:"reach 10b :3s",got:false},
god:{name:":3 God",desc:"reach 100b :3s",got:false},
noLife:{name:"No Life Detected",desc:"reach 1t :3s",got:false}

}

function unlock(id){
if(!achievements[id].got){
achievements[id].got=true
notify(achievements[id].name)
renderAchievements()
}
}

function checkAchievements(){
if(colon3>=1000) unlock("thousand")
if(colon3>=1e6) unlock("million")
if(colon3>=100000) unlock("rich")
if(colon3>=1e9) unlock("insane")
if(colon3>=1e10) unlock("grinder")
if(colon3>=1e11) unlock("god")
if(colon3>=1e12) unlock("noLife")
}

/* RENDER ACHIEVEMENTS */
function renderAchievements(){
let list=document.getElementById("achList")
list.innerHTML=""

let first=true

for(let key in achievements){

if(!first){
let divider=document.createElement("div")
divider.className="divider"
divider.innerText="-------"
list.appendChild(divider)
}
first=false

let a=achievements[key]

let div=document.createElement("div")
div.className="ach"

if(a.got){
div.innerHTML=`<b>${a.name}</b><br>${a.desc}`
}else{
div.classList.add("locked")
div.innerHTML=`<b>???</b><br>?????`
}

list.appendChild(div)
}
}

/* NOTIFICATION */
function notify(text){
let n=document.createElement("div")
n.innerText="Achievement: "+text
document.getElementById("notif").appendChild(n)

setTimeout(()=>n.remove(),3000)
}

/* BUTTONS */
document.getElementById("hateBtn").onclick=()=>{
let v=document.getElementById("rageVid")
v.style.display="block"
v.play()
v.requestFullscreen?.()
}

/* WIN */
function win(){
let v=document.getElementById("winVid")
v.style.display="block"
v.play()
v.requestFullscreen?.()
}

/* INIT */
renderShop()
renderAchievements()
update()