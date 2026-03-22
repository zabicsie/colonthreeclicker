// FIXED VERSION (JS ONLY CHANGES)

let colon3=0
let clickStrength=1
let autoStrength=0
let totalClicks=0
let gambleCount=0

const counter=document.getElementById("counter")
const perSec=document.getElementById("perSec")
const perClick=document.getElementById("perClick")

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
{name:"+5 auto",cost:50,type:"auto",value:5,owned:0},
{name:"+5 click",cost:200,type:"click",value:5,owned:0},
{name:"+25 auto",cost:500,type:"auto",value:25,owned:0},
{name:"+20 click",cost:2000,type:"click",value:20,owned:0},
{name:"+100 auto",cost:5000,type:"auto",value:100,owned:0},
{name:"+100 click",cost:20000,type:"click",value:100,owned:0},
{name:"+500 auto",cost:50000,type:"auto",value:500,owned:0},
{name:"SUPER click +1000",cost:150000,type:"click",value:1000,owned:0},
{name:"MEGA auto +2000",cost:300000,type:"auto",value:2000,owned:0},
{name:"INSANE click +10000",cost:1000000,type:"click",value:10000,owned:0},
{name:"HYPER auto +50000",cost:3000000,type:"auto",value:50000,owned:0},
{name:"GALAXY click +1M",cost:20000000,type:"click",value:1000000,owned:0},
{name:"VOID auto +5M",cost:50000000,type:"auto",value:5000000,owned:0},
{name:"UNREAL click +50M",cost:500000000,type:"click",value:50000000,owned:0},
{name:"COSMIC auto +100M",cost:1000000000,type:"auto",value:100000000,owned:0}
]

const shop=document.getElementById("shop")

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

if(colon3>=1e12) win()
}

function format(n){
return Math.floor(n).toLocaleString()
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
all:{name:"Is there anymore to get?",desc:"i dont think so....",got:false,golden:true},
clicker2:{name:"Where did my fingers go?",desc:"Oh, They snapped off...",got:false},
idle2:{name:"Machines Everywhere",desc:"1M/sec",got:false},
bigClick:{name:"Strong Fingers",desc:"1k click power",got:false},
godClick:{name:"Finger God",desc:"1M click power",got:false},
ultraRich:{name:"Filthy Rich",desc:"1B",got:false},
absurd:{name:"This is Absurd",desc:"1T total",got:false},
gambler:{name:"Risk Taker",desc:"gamble once",got:false},
addict:{name:"Gambling Addict",desc:"gamble 50 times",got:false}
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
if(colon3>=1e9) unlock("ultraRich")
if(colon3>=1e12) unlock("absurd")
}

function checkSpecials(){
if(totalClicks>=100) unlock("clicker")
if(autoStrength>=100) unlock("idle")
if(totalClicks>=1000) unlock("clicker2")
if(autoStrength>=1000000) unlock("idle2")
if(clickStrength>=1000) unlock("bigClick")
if(clickStrength>=1000000) unlock("godClick")
}

function checkAllAchievement(){
let allDone=true
for(let k in achievements){
if(k==="all") continue
if(!achievements[k].got) allDone=false
}
if(allDone) unlock("all")
}

/* GAMBLING FIXED */
let spinning=false

spinBtn.onclick=()=>{
if(spinning) return
if(colon3<1000) return

colon3-=1000
spinning=true

gambleCount++
unlock("gambler")
if(gambleCount>=50) unlock("addict")

let rewards=[
{value:-100000,weight:2},
{value:-5000,weight:5},
{value:-1000,weight:15},
{value:0,weight:20},
{value:500,weight:25},
{value:2000,weight:20},
{value:10000,weight:10},
{value:100000,weight:4},
{value:1000000,weight:1},
{value:10000000,weight:1}
]

function getReward(){
let total=rewards.reduce((a,b)=>a+b.weight,0)
let rand=Math.random()*total

for(let r of rewards){
if(rand<r.weight) return r.value
rand-=r.weight
}
return 0
}

let spin=setInterval(()=>{
let preview=getReward()
spinResult.innerText="Spinning... "+format(preview)

if(Math.random()<0.1){
clearInterval(spin)

let final=getReward()
colon3+=final
colon3=Math.max(0,colon3)

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
},100)
}

/* INIT */
renderShop()
renderAchievements()
update()

/* YOUTUBE (API REMOVED FOR SAFETY) */
ytBtn.onclick=()=>{
ytResults.innerHTML="YouTube search disabled (API key removed for safety)."
}

/* PLAYER */
function playVideo(id){
ytPlayer.innerHTML=`<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay"></iframe>`
}

/* TOGGLE */
ytToggle.onclick=()=>{
ytDropdown.style.display=
ytDropdown.style.display=="block"?"none":"block"
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
