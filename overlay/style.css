let CONFIG=null;
const $=s=>document.querySelector(s);
const el={
  overlay:$("#overlay"),status:$("#status"),
  a:$("#glow-a"),b:$("#glow-b"),z:$("#glow-z"),l:$("#glow-l"),r:$("#glow-r"),start:$("#glow-start"),
  pa:$("#press-a"),pb:$("#press-b"),pstart:$("#press-start"),pcup:$("#press-cup"),pcdown:$("#press-cdown"),pcleft:$("#press-cleft"),pcright:$("#press-cright"),
  cup:$("#glow-cup"),cdown:$("#glow-cdown"),cleft:$("#glow-cleft"),cright:$("#glow-cright"),
  dup:$("#dpad-up"),ddown:$("#dpad-down"),dleft:$("#dpad-left"),dright:$("#dpad-right"),
  stick:$("#stick-layer"),debug:$("#debug"),debugName:$("#debug-name"),
  debugButtons:$("#debug-buttons"),debugAxes:$("#debug-axes")
};
const debugMode=new URLSearchParams(location.search).get("debug")==="1";
el.debug.hidden=!debugMode;

let smoothX=0,smoothY=0;

function pressed(gp,i){const b=gp?.buttons?.[i];return !!(b&&(b.pressed||b.value>.5))}
function axis(gp,i){const v=Number(gp?.axes?.[i]??0);return Number.isFinite(v)?v:0}
function active(node,on){node.classList.toggle("active",!!on)}
function deadzone(v,d){if(Math.abs(v)<=d)return 0;return Math.sign(v)*Math.min(1,(Math.abs(v)-d)/(1-d))}
function getPad(){
  const pads=Array.from(navigator.getGamepads?.()??[]).filter(Boolean);
  return pads.find(p=>/mayflash|mf103|xbox 360/i.test(p.id))??pads[0]??null;
}

async function loadConfig(){
  try{
    const res=await fetch("config.json",{cache:"no-store"});
    CONFIG=await res.json();
  }catch(e){
    console.error("Could not load config.json",e);
    el.status.textContent="Could not load config.json";
  }
}

function frame(){
  if(!CONFIG){requestAnimationFrame(frame);return}
  const gp=getPad();
  if(!gp){
    el.overlay.classList.remove("connected");
    el.status.textContent="Connect the MF103 in XInput mode and press a button";
    requestAnimationFrame(frame);return;
  }

  el.overlay.classList.add("connected");
  const aP=pressed(gp,CONFIG.buttons.a), bP=pressed(gp,CONFIG.buttons.b), zP=pressed(gp,CONFIG.buttons.z), lP=pressed(gp,CONFIG.buttons.l), rP=pressed(gp,CONFIG.buttons.r), sP=pressed(gp,CONFIG.buttons.start);
  active(el.a,aP); active(el.b,bP); active(el.z,zP); active(el.l,lP); active(el.r,rP); active(el.start,sP);
  active(el.pa,aP); active(el.pb,bP); active(el.pstart,sP);
  active(el.dup,pressed(gp,CONFIG.buttons.dpadUp));
  active(el.ddown,pressed(gp,CONFIG.buttons.dpadDown));
  active(el.dleft,pressed(gp,CONFIG.buttons.dpadLeft));
  active(el.dright,pressed(gp,CONFIG.buttons.dpadRight));

  const cx=axis(gp,CONFIG.axes.cX), cy=axis(gp,CONFIG.axes.cY);
  const cL=cx<-CONFIG.cThreshold, cR=cx>CONFIG.cThreshold, cU=cy<-CONFIG.cThreshold, cD=cy>CONFIG.cThreshold;
  active(el.cleft,cL); active(el.cright,cR); active(el.cup,cU); active(el.cdown,cD);
  active(el.pcleft,cL); active(el.pcright,cR); active(el.pcup,cU); active(el.pcdown,cD);

  const tx=deadzone(axis(gp,CONFIG.axes.stickX),CONFIG.stickDeadzone);
  const ty=deadzone(axis(gp,CONFIG.axes.stickY),CONFIG.stickDeadzone);
  smoothX += (tx-smoothX)*CONFIG.stickSmoothing;
  smoothY += (ty-smoothY)*CONFIG.stickSmoothing;
  el.stick.style.transform=`translate(${smoothX*CONFIG.stickTravel}px,${smoothY*CONFIG.stickTravel}px)`;
  el.stick.classList.toggle("moving",Math.abs(smoothX)>.03||Math.abs(smoothY)>.03);

  if(debugMode){
    el.debugName.textContent=gp.id;
    el.debugButtons.textContent=gp.buttons.map((b,i)=>`${i}:${b.value.toFixed(2)}`).join("  ");
    el.debugAxes.textContent=gp.axes.map((v,i)=>`${i}:${v.toFixed(3)}`).join("  ");
  }
  requestAnimationFrame(frame);
}

window.addEventListener("gamepadconnected",()=>el.status.textContent="Controller connected");
window.addEventListener("gamepaddisconnected",()=>{
  el.overlay.classList.remove("connected");
  el.status.textContent="Controller disconnected";
});

loadConfig().then(()=>requestAnimationFrame(frame));
