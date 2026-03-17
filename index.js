/* SUPABASE */
const SUPABASE_URL="https://dssmuruolhtwahgqdldu.supabase.co"
const SUPABASE_KEY="sb_publishable_QPrude_YYAskoEh3dco1Dw_nYkF8u-_"
const supabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

let colon3=0,clickStrength=1,autoStrength=0,totalEarned=0
let currentUser=null

/* DOM */
let counter=document.getElementById("counter")
let perSec=document.getElementById("perSec")
let perClick=document.getElementById("perClick")
let userInput=document.getElementById("userInput")
let passInput=document.getElementById("passInput")
let emailInput=document.getElementById("emailInput")
let authMsg=document.getElementById("authMsg")
let authScreen=document.getElementById("authScreen")
let userDisplay=document.getElementById("userDisplay")
let shop=document.getElementById("shop")
let achList=document.getElementById("achList")
let notif=document.getElementById("notif")
let menuBtn=document.getElementById("menuBtn")
let leaderBtn=document.getElementById("leaderBtn")
let leaderboard=document.getElementById("leaderboard")
let leaderList=document.getElementById("leaderList")
let hateBtn=document.getElementById("hateBtn")
let rageVid=document.getElementById("rageVid")
let winVid=document.getElementById("winVid")
let dropdown=document.getElementById("dropdown")

/* LOGIN */
async function signup(){
let u=userInput.value,p=passInput.value,e=emailInput.value

let {data}=await supabase.from("users")
.select("*").or(`username.eq.${u},email.eq.${e}`)

if(data.length){authMsg.innerText="Exists";return}

await supabase.from("users").insert({username:u,email:e,password:p,total:0,current:0})
authMsg.innerText="Created"
}

async function login(){
let u=userInput.value,p=passInput.value

let {data}=await supabase.from("users")
.select("*").eq("username",u).eq("password",p).single()

if(!data){authMsg.innerText="Invalid";return}

currentUser=data
colon3=data.current||0
totalEarned=data.total||0

authScreen.style.display="none"
userDisplay.innerText="User: "+u
}

/* CLICK */
colon3Btn=document.getElementById("colon3")
colon3Btn.onclick=()=>{
colon3+=clickStrength
totalEarned+=clickStrength
unlock("click1")
update()
}

/* LOOP */
setInterval(()=>{
colon3+=autoStrength
totalEarned+=autoStrength
update()
},1000)

/* UPDATE */
function update(){
counter.innerText=":3 : "+format(colon3)
perSec.innerText=autoStrength
perClick.innerText=clickStrength

if(currentUser){
supabase.from("users").update({
current:colon3,total:totalEarned
}).eq("id",currentUser.id)
}

if(colon3>=1e12) win()
}

/* SHOP */
let shopItems=[
{name:"+1 click",cost:10,type:"click",value:1,owned:0},
{name:"+5 auto",cost:50,type:"auto",value:5,owned:0}
]

function renderShop(){
shop.innerHTML=""
shopItems.forEach((it,i)=>{
let d=document.createElement("div")
d.className="item"
d.innerHTML=`${it.name}<br>Cost:${it.cost}<br>Owned:${it.owned}`
d.onclick=()=>buy(i)
shop.appendChild(d)
})
}

function buy(i){
let it=shopItems[i]
if(colon3<it.cost)return
colon3-=it.cost
it.owned++

if(it.type=="click")clickStrength+=it.value
if(it.type=="auto")autoStrength+=it.value

it.cost=Math.floor(it.cost*1.5)
renderShop()
}

/* ACHIEVEMENTS */
let achievements={
click1:{name:"One of Many",desc:"first click",got:false}
}

function unlock(id){
if(!achievements[id].got){
achievements[id].got=true
notify(achievements[id].name)
renderAchievements()
}
}

function renderAchievements(){
achList.innerHTML=""
for(let k in achievements){
let a=achievements[k]
let d=document.createElement("div")
d.className="ach"

if(a.got)d.innerHTML=`<b>${a.name}</b><br>${a.desc}`
else{d.classList.add("locked");d.innerHTML="???<br>?????"}

achList.appendChild(d)

let div=document.createElement("div")
div.className="divider"
div.innerText="-------"
achList.appendChild(div)
}
}

/* NOTIFY */
function notify(t){
let n=document.createElement("div")
n.innerText="Achievement: "+t
notif.appendChild(n)
setTimeout(()=>n.remove(),3000)
}

/* MENU */
menuBtn.onclick=()=>dropdown.style.display=
dropdown.style.display=="block"?"none":"block"

leaderBtn.onclick=()=>{leaderboard.style.display=
leaderboard.style.display=="block"?"none":"block"
renderLeaderboard()
}

/* LEADERBOARD */
async function renderLeaderboard(){
let {data}=await supabase.from("users")
.select("*").order("total",{ascending:false}).limit(10)

leaderList.innerHTML=""
data.forEach((u,i)=>{
let d=document.createElement("div")
d.innerText=`#${i+1} | ${u.username} | ${format(u.total)}`
leaderList.appendChild(d)
})
}

/* VIDEOS */
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

/* UTIL */
function format(n){return Math.floor(n).toLocaleString()}

/* INIT */
if(!currentUser){
authScreen.style.display="flex"
}else{
authScreen.style.display="none"
userDisplay.innerText="User: "+currentUser.username
}
renderShop()
renderAchievements()
