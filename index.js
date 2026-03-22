// FIXED WORKING VERSION

let colon3=0
let clickStrength=1
let autoStrength=0
let totalClicks=0
let gambleCount=0

const counter=document.getElementById("counter")
const perSec=document.getElementById("perSec")
const perClick=document.getElementById("perClick")
const shop=document.getElementById("shop")
const achList=document.getElementById("achList")
const spinBtn=document.getElementById("spinBtn")
const spinResult=document.getElementById("spinResult")
const ytBtn=document.getElementById("ytBtn")
const ytResults=document.getElementById("ytResults")
const ytPlayer=document.getElementById("ytPlayer")
const ytToggle=document.getElementById("ytToggle")
const ytDropdown=document.getElementById("ytDropdown")
const hateBtn=document.getElementById("hateBtn")
const rageVid=document.getElementById("rageVid")
const winVid=document.getElementById("winVid")
const menuBtn=document.getElementById("menuBtn")
const dropdown=document.getElementById("dropdown")
const gambleBtn=document.getElementById("gambleBtn")
const gambleMenu=document.getElementById("gambleMenu")
const notif=document.getElementById("notif")

/* CLICK */
document.getElementById("colon3").onclick=()=>{
colon3+=clickStrength
colon3=Math.max(0,colon3)
totalClicks++
unlock("click1")
checkSpecials()
update()
}

/* SHOP */
let shopItems=[
{name:"+1 click strength",cost:10,type:"click",value:1,owned:0},
{name:"+5 auto",cost:50,type:"auto",value:5,owned:0}
]

function renderShop(){
shop.innerHTML=""
shopItems.forEach((item,i)=>{
let div=document.createElement("div")
div.className="item"
div.innerHTML=`${item.name}<br>Cost: ${format(item.cost)}<br>Owned: ${item.owned}`
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

unlock("shop1")
item.cost=Math.floor(item.cost*1.5)

update()
renderShop()
}

/* LOOP */
setInterval(()=>{
colon3+=autoStrength
colon3=Math.max(0,colon3)
update()
},1000)

/* UPDATE */
function update(){
counter.innerText=":3 : "+format(colon3)
perSec.innerText=autoStrength
perClick.innerText=clickStrength

checkAchievements()
checkAllAchievement()

if(colon3>=1e6) win()
}

function format(n){
return Math.floor(n).toLocaleString()
}

/* MENUS */
menuBtn.onclick=()=>{
dropdown.style.display=dropdown.style.display=="block"?"none":"block"
}

gambleBtn.onclick=()=>{
gambleMenu.style.display=gambleMenu.style.display=="block"?"none":"block"
}

/* ACHIEVEMENTS */
let achievements={
click1:{name:"First Click",desc:"click once",got:false},
auto1:{name:"Automation",desc:"get auto",got:false},
shop1:{name:"Shop",desc:"buy item",got:false},
gambler:{name:"Risk",desc:"gamble once",got:false},
addict:{name:"Addict",desc:"50 gambles",got:false}
}

function unlock(id){
let a=achievements[id]
if(!a||a.got) return
a.got=true
notify(a.name)
renderAchievements()
}

function checkAchievements(){}
function checkSpecials(){}
function checkAllAchievement(){}

function renderAchievements(){
achList.innerHTML=""
for(let k in achievements){
let a=achievements[k]
let div=document.createElement("div")
div.className="ach"

if(a.got){
div.innerHTML=`<b>${a.name}</b><br>${a.desc}`
}else{
div.classList.add("locked")
div.innerHTML=`<b>???</b><br>?????`
}

achList.appendChild(div)
}
}

function notify(t){
let n=document.createElement("div")
n.innerText="Achievement: "+t
notif.appendChild(n)
setTimeout(()=>n.remove(),2000)
}

/* GAMBLING */
let spinning=false

spinBtn.onclick=()=>{
if(spinning) return
if(colon3<1000) return

colon3-=1000
spinning=true

gambleCount++
unlock("gambler")
if(gambleCount>=50) unlock("addict")

let rewards=[-1000,0,500,2000,10000]

let spin=setInterval(()=>{
let preview=rewards[Math.floor(Math.random()*rewards.length)]
spinResult.innerText="Spinning... "+format(preview)

if(Math.random()<0.15){
clearInterval(spin)

let final=rewards[Math.floor(Math.random()*rewards.length)]
colon3+=final
colon3=Math.max(0,colon3)

spinResult.innerText=final>=0?"You WON "+format(final):"You LOST "+format(Math.abs(final))

spinning=false
update()
}
},100)
}

/* INIT */
renderShop()
renderAchievements()
update()

/* YT DISABLED */
ytBtn.onclick=()=>{
ytResults.innerText="YT disabled"
}

ytToggle.onclick=()=>{
ytDropdown.style.display=
ytDropdown.style.display=="block"?"none":"block"
}

/* BUTTONS */
hateBtn.onclick=()=>{
rageVid.style.display="block"
rageVid.play()
}

function win(){
winVid.style.display="block"
winVid.play()
}
