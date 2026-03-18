let colon3=0
let clickStrength=1
let autoStrength=0
let totalClicks=0

const counter=document.getElementById("counter")
const perSec=document.getElementById("perSec")
const perClick=document.getElementById("perClick")

/* CLICK */
document.getElementById("colon3").onclick=()=>{
colon3+=clickStrength
totalClicks++
unlock("click1")
checkSpecials()
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
Cost: ${format(item.cost)}<br>
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

unlock("shop1")

item.cost=Math.floor(item.cost*1.5)

renderShop()
update()
}

/* LOOP */
setInterval(()=>{
colon3+=autoStrength
update()
},1000)

/* UPDATE */
function update(){
counter.innerText=":3 : "+format(colon3)
perSec.innerText=autoStrength
perClick.innerText=clickStrength

checkAchievements()
checkAllAchievement()

if(colon3>=1e12) win()
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
click1:{name:"One of Many",desc:"ur first ever click",got:false},
thousand:{name:"Still More to Go",desc:"reach 1,000 :3s",got:false},
million:{name:"My Fingers Are Getting Tired",desc:"reach 1m :3s",got:false},
auto1:{name:"A Handful of Help",desc:"get auto income",got:false},
shop1:{name:"First Purchase",desc:"buy something",got:false},
clicker:{name:"Click Frenzy",desc:"click 100 times",got:false},
idle:{name:"Let It Do The Work",desc:"reach 100/sec",got:false},
rich:{name:"Getting Serious",desc:"reach 100k",got:false},
all:{name:"Is there anymore to get?",desc:"i dont think so....",got:false,golden:true}
}

function unlock(id){
let a=achievements[id]
if(!a||a.got) return
a.got=true
notify(a.name)
renderAchievements()
}

function checkAchievements(){
if(colon3>=1000) unlock("thousand")
if(colon3>=1e6) unlock("million")
if(colon3>=100000) unlock("rich")
}

function checkSpecials(){
if(totalClicks>=100) unlock("clicker")
if(autoStrength>=100) unlock("idle")
}

function checkAllAchievement(){
let allDone=true
for(let k in achievements){
if(k==="all") continue
if(!achievements[k].got) allDone=false
}
if(allDone) unlock("all")
}

/* RENDER ACH */
function renderAchievements(){
achList.innerHTML=""
let first=true

for(let k in achievements){

if(!first){
let d=document.createElement("div")
d.className="divider"
d.innerText="-------"
achList.appendChild(d)
}
first=false

let a=achievements[k]
let div=document.createElement("div")
div.className="ach"

if(a.got){
if(a.golden) div.style.color="gold"
div.innerHTML=`<b>${a.name}</b><br>${a.desc}`
}else{
div.classList.add("locked")
div.innerHTML=`<b>???</b><br>?????`
}

achList.appendChild(div)
}
}

/* NOTIF */
function notify(t){
let n=document.createElement("div")
n.innerText="Achievement: "+t
notif.appendChild(n)
setTimeout(()=>n.remove(),3000)
}

/* GAMBLING (WEIGHTED + LOSSES) */
let spinning=false

spinBtn.onclick=()=>{

if(spinning) return
if(colon3<1000) return

colon3-=1000
spinning=true

let rewards=[
{value:-5000,weight:5},
{value:-1000,weight:15},
{value:0,weight:20},
{value:500,weight:25},
{value:2000,weight:20},
{value:10000,weight:10},
{value:100000,weight:4},
{value:1000000,weight:1}
]

function getReward(){
let total=rewards.reduce((a,b)=>a+b.weight,0)
let rand=Math.random()*total

for(let r of rewards){
if(rand<r.weight) return r.value
rand-=r.weight
}
}

let time=2000
let int=100
let elapsed=0

let spin=setInterval(()=>{
let preview=getReward()
spinResult.innerText="Spinning... "+format(preview)
elapsed+=int

if(elapsed>=time){
clearInterval(spin)

let final=getReward()
colon3+=final

if(final>0){
spinResult.innerText="You WON "+format(final)
}else if(final<0){
spinResult.innerText="You LOST "+format(Math.abs(final))
}else{
spinResult.innerText="Nothing..."
}

spinning=false
update()
}
},int)

}

/* BUTTONS */
hateBtn.onclick=()=>{
rageVid.style.display="block"
rageVid.play()
rageVid.requestFullscreen?.()
}

function win(){
winVid.style.display="block"
winVid.play()
winVid.requestFullscreen?.()
}

/* INIT */
renderShop()
renderAchievements()
update()