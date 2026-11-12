"use strict";
(function(){
const RPCS=["https://rpc.mainnet.chain.robinhood.com","https://robinhood-rpc.publicnode.com"];
const CHAIN=4663, CHAIN_HEX="0x1237", LAUNCH=3232n, LAUNCH_BLOCK=112566380;
const A={
 token:"0x86bfa84b95b9cf0fbc5b7caab1b53ca77431d892",
 desk:"0x7656e5f67ba549f7483c126b34e65efd445c76a9",
 vault:"0xa52999cc8d486b4d86ad64da57f9a546e075c70b",
 splitter:"0xf06b4a3d3e1fb26bae1f2b7dade0c1d7803dc2c6",
 imd:"0x5f7bb59365ce557c26dbcaa4ee9d39a4b95b7127",
 pm:"0x8366a39cc670b4001a1121b8f6a443a643e40951",
 quoter:"0x8dc178efb8111bb0973dd9d722ebeff267c98f94",
 factory:"0x9c9d2fcb75c2c132c0ac0c42df3819a42347265e",
 treasury:"0x3c587eff6c96eacf7e3dcc2cff6416161386e48c",
 dev:"0x8ad18e99f4c8d8406f9ba8899cf308000518a981",
 swarm:"0x00a7bf5d427227ec50aab893898740056630b229",
 dead:"0x000000000000000000000000000000000000dead",
 ethusd:"0x52e65b17fb6e5ba00ed806f37afcd2daa50271ca"
};
const EXP="https://robin.etherscan.io/address/";
const BUY_URL="https://app.uniswap.org/swap?chain=robinhood&inputCurrency=ETH&outputCurrency="+A.token;
const Q_ETH="0xca253dc900000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000000000000000000000005f7bb59365ce557c26dbcaa4ee9d39a4b95b712700000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086bfa84b95b9cf0fbc5b7caab1b53ca77431d89200000000000000000000000000000000000000000000000000000000000030d4000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000019bec7c2e1b2aadaf67b259744751a9960d6600000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000", Q_IMD="0xaa9d21cb00000000000000000000000000000000000000000000000000000000000000200000000000000000000000005f7bb59365ce557c26dbcaa4ee9d39a4b95b712700000000000000000000000086bfa84b95b9cf0fbc5b7caab1b53ca77431d89200000000000000000000000000000000000000000000000000000000000030d4000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000019bec7c2e1b2aadaf67b259744751a9960d6600000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000";
const ERRS={"0x3a47dff8": "AlreadySplit", "0xaba47339": "NotRegistered", "0x452859e7": "NothingToSplit", "0xbfbbce1d": "AboveBucket", "0x24dbc0ca": "BelowMinOut", "0x09c4206e": "NotLpDesk", "0x7c214f04": "NotOperator", "0xae18210a": "NotPoolManager", "0x6a172882": "UnsupportedToken", "0x16aec880": "AboveBasket", "0xba58d3d1": "AboveFreeBalance", "0x860b82a9": "BelowMinimum", "0xe4793b9c": "BootstrapOver", "0xca3522d4": "BridgeMismatch", "0x2e6868ff": "BuybackMismatch", "0xe69c8721": "ImdNotBuyable", "0xbdf91dc1": "ModuleExists", "0x2ceaab2d": "ModuleMissing", "0x49248f77": "MulDivOverflow", "0xf2ee908a": "NeedsNotStock", "0xc2656757": "NotAnAssetOfThisPosition", "0x6b5bef9a": "NotFirmVault", "0xee3675d4": "NotGovernor", "0x1af50573": "PairMismatch", "0x94e88a21": "PositionNotOpen", "0x38aa5c15": "PriceMoved", "0xc7e13a01": "TickOutOfRange", "0x21d7fab5": "UnlistedAsset", "0xa3086528": "UnlistedVenue", "0x8c36b811": "WrongModuleCode", "0xd92e233d": "ZeroAddress", "0x7c9a1cf9": "AlreadyVoted", "0x1bfdb79f": "BadBridge", "0xae274200": "BelowThreshold", "0xf1bc94d2": "InsufficientStake", "0x480893f3": "KindAlreadyOpen", "0x69c38e44": "NoValueExpected", "0x44023105": "NoWeight", "0x2fba4853": "UnknownBridge", "0xde4168ba": "WrongState", "0x1f2a2005": "ZeroAmount", "0xa3d582ec": "AlreadyListed", "0x3a81d6fc": "AlreadyRegistered", "0xf046a714": "NoCode", "0xbea4a468": "NotAVenue", "0xc7a6d068": "NotStockIsNotAnAsset", "0xfb5f82a2": "SplitterUnderfunded", "0x346d5257": "WrongFeeRecipient", "0xd6640ffa": "WrongLaunchRecord", "0xd3c913ea": "WrongPool", "0xa0f3feea": "WrongToken", "0x13be252b": "InsufficientAllowance", "0xf4d678b8": "InsufficientBalance", "0xf591b277": "NoPool", "0x43333db8": "FeeTierDisabled", "0xe112ac7e": "WrongCallback", "0x98642b86": "NothingToBurn", "0x4e8b9bd4": "NotRequester"};
const MODS=["LpGovernor","PriceGuard","VenueV3","VenueV4"];
const S={}; let acct=null, prov=null, provs=[];
const $=id=>document.getElementById(id);
const E18=10n**18n;
const pad=h=>h.replace(/^0x/,"").padStart(64,"0");
const encA=a=>pad(a.toLowerCase());
const encU=n=>pad(BigInt(n).toString(16));
let rpcI=0;
async function rpc(method,params){
  let last;
  for(let k=0;k<RPCS.length;k++){
    const u=RPCS[(rpcI+k)%RPCS.length];
    try{
      const r=await fetch(u,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method,params})});
      const j=await r.json();
      if(j.error){ if(j.error.code===3||/revert/i.test(j.error.message||"")) { const e=new Error("revert"); e.data=j.error.data; throw e;} throw new Error(j.error.message); }
      return j.result;
    }catch(e){ if(e.message==="revert") throw e; last=e; rpcI=(rpcI+1)%RPCS.length; }
  }
  throw last;
}
const call=(to,data)=>rpc("eth_call",[{to,data},"latest"]);
const word=(h,i)=>BigInt("0x"+(h.replace(/^0x/,"").slice(i*64,i*64+64)||"0"));
const addrW=(h,i)=>"0x"+h.replace(/^0x/,"").slice(i*64+24,i*64+64);
async function u256(to,data){ for(let t=0;t<3;t++){ try{ const r=await call(to,data); return r&&r!=="0x"?word(r,0):null; }catch(e){ if(e.message==="revert") return null; await new Promise(z=>setTimeout(z,500+t*700)); } } return null; }
const bal=(tok,who)=>u256(tok,"0x70a08231"+encA(who));
function fmt(v,dec=18,max=2){
  if(v==null) return "…";
  const n=Number(v)/10**dec; return num(n,max);
}
function num(n,max=2){
  if(!isFinite(n)) return "…";
  const a=Math.abs(n);
  const f=(x,s)=>(+x.toFixed(max)).toString()+s;
  if(a>=1e9) return f(n/1e9,"B"); if(a>=1e6) return f(n/1e6,"M"); if(a>=1e3) return f(n/1e3,"K");
  if(a===0) return "0";
  if(a<0.01){ return n.toPrecision(3).replace(/\.?0+(e|$)/,"$1"); }
  return (+n.toFixed(max)).toString();
}
function usd(n){
  if(n==null||!isFinite(n)) return "…";
  if(n>=1) return "$"+num(n,n>=1000?1:2);
  if(n===0) return "$0";
  const s=n.toFixed(20); const m=s.match(/^0\.(0*)(\d{0,3})/); const d=m[2].replace(/0+$/,"");
  if(m[1].length>=4){ const sub="₀₁₂₃₄₅₆₇₈₉"; return "$0.0"+String(m[1].length).split("").map(c=>sub[+c]).join("")+d; }
  return "$0."+m[1]+d;
}
const short=a=>a.slice(0,6)+"…"+a.slice(-4);
function toast(t,ms=3500){ const el=$("toast"); el.textContent=t; el.hidden=false; clearTimeout(toast.t); toast.t=setTimeout(()=>el.hidden=true,ms); }
function set(id,v){ const el=$(id); if(el) el.textContent=v; }
function words(n){ return n.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase(); }
function errText(data){
  const d=(data&&typeof data==="object")?(data.data||data):data;
  if(typeof d==="string"&&d.length>=10){ const n=ERRS[d.slice(0,10)]; if(n) return PLAIN[n]||("The contract refused: "+words(n)+"."); }
  return null;
}
const PLAIN={NotRegistered:"Opens after setup (Register step).",NothingToSplit:"Nothing to split yet.",AlreadySplit:"Already split.",ModuleExists:"This module is already deployed.",ModuleMissing:"Deploy all modules first.",NotOperator:"Only the LP Desk operator can do this.",NotRequester:"Only the treasury wallet can do this.",ZeroBalance:"Nothing to burn yet."};

/* ---------- live reads ---------- */
async function loadMarket(){
  const [q,qi,slot]=await Promise.all([
    call(A.quoter,Q_ETH).catch(()=>null), call(A.quoter,Q_IMD).catch(()=>null), call(A.ethusd,"0x3850c7bd").catch(()=>null)
  ]);
  if(slot){ const sp=Number(word(slot,0))/2**96; S.ethUsd=sp*sp*1e12; }
  if(q){ S.q001=word(q,0); }
  if(S.q001&&S.ethUsd){
    const pEth=0.001/(Number(S.q001)/1e18); S.priceUsd=pEth*S.ethUsd;
    set("s-price",usd(S.priceUsd)); set("s-fdv",usd(S.priceUsd*1e9));
  }
  loadTape().catch(()=>{});
}
/* ticker tape: Uniswap v3 pools vs USDG on 4663, slot0 + liquidity; unread or empty pool = not shown */
const TAPE=[["cbBTC","0x9664d869540e9d0a76f12c6623946c6d5d201e09",6,8,true],["NVDA","0xd4eb21209c4d6093f80b5b84f5c45cc093ea14a3",6,18,true],["SPCX","0xc61284332117c3fb23a2a56cceffd07f7af60029",18,6,false]];
function tusd(n){ if(n>=1000) return "$"+Math.round(n).toLocaleString("en-US"); return "$"+n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}); }
async function poolUsd(pool,d0,d1,inv){
  const [slot,liq]=await Promise.all([call(pool,"0x3850c7bd"),call(pool,"0x1a686502")]);
  if(!slot||!liq||word(liq,0)===0n) return null;
  const sp=Number(word(slot,0))/2**96; const p0=sp*sp*10**(d0-d1);
  const v=inv?1/p0:p0; return isFinite(v)&&v>0?v:null;
}
async function loadTape(){
  const rows=[];
  if(S.priceUsd) rows.push(["NOTSTOCK",usd(S.priceUsd)],["FDV",usd(S.priceUsd*1e9)]);
  if(S.ethUsd) rows.push(["WETH",tusd(S.ethUsd)]);
  const got=await Promise.all(TAPE.map(t=>poolUsd(t[1],t[2],t[3],t[4]).catch(()=>null)));
  TAPE.forEach((t,i)=>{ if(got[i]) rows.push([t[0],tusd(got[i])]); });
  S.tapePrev=S.tapePrev||{};
  const html=rows.map(r=>{ const prev=S.tapePrev[r[0]]; let mv="";
    if(prev&&prev!==r[1]){ const a=parseFloat(prev.replace(/[^0-9.]/g,"")), b=parseFloat(r[1].replace(/[^0-9.]/g,"")); if(isFinite(a)&&isFinite(b)&&a!==b) mv=b>a?'<i class="up">▲</i>':'<i class="dn">▼</i>'; }
    return '<span><b>'+r[0]+'</b>'+r[1]+mv+'</span>'; }).join("");
  rows.forEach(r=>S.tapePrev[r[0]]=r[1]);
  if(!rows.length) return;
  $("tape").innerHTML=html+html; $("tape-box").hidden=false;
}
async function loadHolders(){
  try{
    const head=parseInt(await rpc("eth_blockNumber",[]),16);
    const logs=[]; const step=200000;
    for(let f=LAUNCH_BLOCK; f<=head; f+=step){
      const r=await rpc("eth_getLogs",[{address:A.token,fromBlock:"0x"+f.toString(16),toBlock:"0x"+Math.min(head,f+step-1).toString(16),topics:["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]}]);
      logs.push(...r);
    }
    const b=new Map();
    for(const l of logs){ const fr="0x"+l.topics[1].slice(26), to="0x"+l.topics[2].slice(26), v=BigInt(l.data);
      b.set(fr,(b.get(fr)||0n)-v); b.set(to,(b.get(to)||0n)+v); }
    let n=0; for(const [k,v] of b){ if(k!=="0x0000000000000000000000000000000000000000"&&v>0n) n++; }
    set("s-holders",String(n));
  }catch(e){ set("s-holders","…"); }
}
async function loadChain(){
  const blk=await rpc("eth_blockNumber",[]).catch(()=>null);
  if(blk) set("net","Robinhood Chain · Block "+parseInt(blk,16).toLocaleString("en-US"));
  const mods=await Promise.all([0,1,2,3].map(async k=>({addr:addrW(await call(A.desk,"0x2997d114"+encU(k)).catch(()=>"0x"),0),on:(await u256(A.desk,"0x58a7ebe3"+encU(k)))===1n})));
  S.mods=mods; S.gov=mods[0].on?mods[0].addr:null; S.pg=mods[1].on?mods[1].addr:null;
  const burnerR=await call(A.desk,"0x27810b6e").catch(()=>null); S.burner=burnerR?addrW(burnerR,0):null;
  const [bucket,vImd,vNs,pos,boot,top,freeImd,freeNs,splitBal,splitDone,opR,reqR]=await Promise.all([
    u256(A.vault,"0x10a66c2b"), bal(A.imd,A.vault), bal(A.token,A.vault), u256(A.desk,"0xe7702d05"), u256(A.desk,"0x9dd23678"),
    u256(A.desk,"0x786d804f"+encA(A.imd)), u256(A.desk,"0x95b881de"+encA(A.imd)), bal(A.token,A.desk), bal(A.token,A.splitter), u256(A.splitter,"0xae8421e1"),
    call(A.desk,"0x570ca735").catch(()=>null), call(A.factory,"0x46f96023"+encU(LAUNCH)).catch(()=>null)
  ]);
  S.registered=(await u256(A.desk,"0x2de40ce3"))===1n;
  S.operator=opR?addrW(opR,0):null;
  S.requester=reqR?addrW(reqR,6):null; // positionOf: key(5 words), liquidity?, ... requester
  if(reqR){ const h=reqR.replace(/^0x/,""); const n=h.length/64; for(let i=0;i<n;i++){ const a=addrW(reqR,i); if(a===A.vault||a===A.treasury){ S.requester=a; } } }
  S.bucket=bucket; S.vImd=(vImd!=null&&bucket!=null)?vImd-bucket:null; S.vNs=vNs;
  set("v-bucket",fmt(bucket)+" IMD"); set("v-imd",fmt(S.vImd)+" IMD"); set("v-ns",fmt(vNs));
  set("v-req",S.requester===A.vault?"Yes":"After setup");
  set("d-pos",pos==null?"…":String(pos)); set("d-free",fmt(freeNs)); set("d-top",fmt(top)+" IMD"); set("d-freeimd",fmt(freeImd)+" IMD");
  set("d-boot", !S.registered?"7 days, starts at Register": (boot? (Number(boot)*1000>Date.now()?"Ends "+new Date(Number(boot)*1000).toISOString().slice(0,16).replace("T"," ")+" UTC":"Ended"):"…"));
  S.splitBal=splitBal; S.splitDone=splitDone===1n;
  // pairs from PriceGuard
  if(S.pg){
    try{ const r=await call(S.pg,"0x71a97305"); const h=r.replace(/^0x/,""); const len=Number(word(r,1)); const out=[];
      for(let i=0;i<len;i++) out.push(addrW(r,2+i));
      S.assets=out; set("d-assets",String(len));
    }catch(e){ set("d-assets","After setup"); }
  } else set("d-assets","After setup");
  // governance
  if(S.gov){
    set("g-total",fmt(await u256(S.gov,"0x817b1cd2"))); set("g-props",String(await u256(S.gov,"0xda35c664")??"…"));
  } else { set("g-total","After setup"); set("g-props","After setup"); }
  // burn
  const [dead,burnerBal]=await Promise.all([bal(A.token,A.dead), S.burner?bal(A.token,S.burner):Promise.resolve(null)]);
  S.burnerBal=burnerBal; set("b-dead",fmt(dead)); set("b-burner",fmt(burnerBal));
  // supply bars
  const who=[["Pool",A.pm],["Treasury",A.treasury],["Swarm airdrop",A.swarm],["GenesisSplitter",A.splitter],["LP Desk",A.desk],["Dev wallet",A.dev],["FirmVault",A.vault]];
  if(S.burner) who.push(["Burner",S.burner]); if(S.gov) who.push(["Staked",S.gov]); who.push(["Burned",A.dead]);
  const vals=await Promise.all(who.map(w=>bal(A.token,w[1])));
  let sum=0n; vals.forEach(v=>{ if(v) sum+=v; });
  const rows=who.map((w,i)=>[w[0],vals[i]||0n,w[1]]); rows.push(["Holders' wallets",10n**27n-sum,null]);
  rows.sort((a,b)=>a[1]<b[1]?1:a[1]>b[1]?-1:0);
  $("bars").innerHTML=rows.map(r=>{ const pct=Number(r[1]*10000n/10n**27n)/100;
    return '<div class="bar"><span>'+r[0]+'</span><b>'+fmt(r[1])+' · '+(+pct.toFixed(2))+'%</b><div class="tr"><i style="width:'+Math.min(100,pct)+'%"></i></div></div>'; }).join("");
  renderSetup(); renderWallet();
}
function renderSetup(){
  const li=[];
  S.mods.forEach((m,k)=>li.push(m.on?'<li class="ok">Deploy '+MODS[k]+'<span class="st">Done</span></li>':'<li>Deploy '+MODS[k]+'<button class="btn sm" data-deploy="'+k+'"'+(acct?'':' disabled')+'>Deploy</button></li>'));
  const allMods=S.mods.every(m=>m.on);
  const funded=S.splitDone||(S.splitBal!=null&&S.splitBal>=600000000n*E18);
  li.push('<li class="'+(funded?'ok':'')+'">Fund GenesisSplitter (treasury)<span class="st">'+(funded?'Done':(allMods?'Waiting for treasury':'Deploy all modules first'))+'</span></li>');
  const feeOk=S.requester===A.vault;
  li.push('<li class="'+(feeOk?'ok':'')+'">FirmVault gets pool fee (treasury)<span class="st">'+(feeOk?'Done':'Waiting for treasury')+'</span></li>');
  if(S.registered) li.push('<li class="ok">Register<span class="st">Done</span></li>');
  else { const why=!S.pg?"Deploy PriceGuard first":!funded?"Fund GenesisSplitter first":!feeOk?"FirmVault fee first":null;
    li.push('<li>Register'+(why?'<span class="st">'+why+'</span>':'<button class="btn sm" data-act="register"'+(acct?'':' disabled')+'>Register</button>')+'</li>'); }
  if(S.splitDone) li.push('<li class="ok">Split<span class="st">Done</span></li>');
  else li.push('<li>Split'+(!S.registered?'<span class="st">Register first</span>':'<button class="btn sm" data-act="split"'+(acct?'':' disabled')+'>Split</button>')+'</li>');
  $("steps").innerHTML=li.join("");
  set("s-why",acct?"":"Connect wallet to press a step. Anyone can deploy, register and split.");
}
async function renderWallet(){
  const c=!!acct;
  $("connect").textContent=c?short(acct):"Connect";
  if(!c){ set("b-mine","Connect wallet"); set("g-mine",S.gov?"Connect wallet":"After setup"); }
  else{
    S.myNs=await bal(A.token,acct); set("b-mine",fmt(S.myNs));
    if(S.gov) set("g-mine",fmt(await u256(S.gov,"0x98807d84"+encA(acct)))); else set("g-mine","After setup");
  }
  const reg=S.registered;
  $("dist-imd").disabled=!c||!reg||!(S.vImd>0n); $("dist-ns").disabled=!c||!reg||!(S.vNs>0n);
  set("dist-why",!reg?"Opens after setup (Register step).":!c?"Connect wallet to distribute.":(!(S.vImd>0n)&&!(S.vNs>0n))?"Nothing to distribute yet.":"");
  $("b-burn").disabled=!c||!(S.burnerBal>0n);
  $("b-dep").disabled=!c; $("b-max").disabled=!c;
  set("b-why",!c?"Connect wallet to burn or deposit.":!(S.burnerBal>0n)?"Burner is empty. Deposit NOTSTOCK to burn it.":"");
  const g=!!S.gov; ["g-stake","g-unstake","g-max"].forEach(id=>$(id).disabled=!c||!g); $("g-amt").disabled=!g;
  set("g-why",!g?"Staking opens after setup.":!c?"Connect wallet to stake.":"");
  renderSetup();
}

/* ---------- wallet ---------- */
window.addEventListener("eip6963:announceProvider",e=>{ if(!provs.find(p=>p.info.uuid===e.detail.info.uuid)) provs.push(e.detail); });
function pickProvider(){
  return new Promise(res=>{
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    setTimeout(()=>{
      if(provs.length===1) return res(provs[0].provider);
      if(provs.length>1){
        const el=$("toast"); el.hidden=false; el.innerHTML="Choose wallet<div class='wlist'>"+provs.map((p,i)=>"<button class='btn sm ghost' data-w='"+i+"'>"+p.info.name.replace(/[<>&]/g,"")+"</button>").join("")+"</div>";
        el.onclick=ev=>{ const i=ev.target.getAttribute("data-w"); if(i!=null){ el.hidden=true; el.onclick=null; res(provs[+i].provider);} };
        return;
      }
      res(window.ethereum||null);
    },250);
  });
}
async function ensureChain(){
  const id=await prov.request({method:"eth_chainId"});
  if(parseInt(id,16)===CHAIN) return;
  try{ await prov.request({method:"wallet_switchEthereumChain",params:[{chainId:CHAIN_HEX}]}); }
  catch(e){ if(e&&(e.code===4902||/unrecognized|not added/i.test(e.message||""))){
    await prov.request({method:"wallet_addEthereumChain",params:[{chainId:CHAIN_HEX,chainName:"Robinhood Chain",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:RPCS,blockExplorerUrls:["https://robin.etherscan.io"]}]});
  } else throw e; }
}
async function connect(){
  if(acct){ acct=null; renderWallet(); return; }
  prov=await pickProvider();
  if(!prov){ toast("No wallet found. Install MetaMask or open this page in your wallet's browser.",5000); return; }
  try{
    const a=await prov.request({method:"eth_requestAccounts"}); acct=(a[0]||"").toLowerCase()||null;
    if(prov.on){ prov.on("accountsChanged",x=>{ acct=(x[0]||"").toLowerCase()||null; renderWallet(); }); }
    renderWallet();
  }catch(e){ toast(e&&e.code===4001?"Cancelled in wallet.":"Wallet did not connect."); }
}
async function send(to,data,label){
  if(!acct){ toast("Connect wallet first."); return false; }
  try{
    await ensureChain();
    try{ await rpc("eth_call",[{from:acct,to,data},"latest"]); }
    catch(e){ toast(errText(e.data)||"This would fail on chain. Nothing was sent.",5000); return false; }
    toast(label+": confirm in wallet");
    const h=await prov.request({method:"eth_sendTransaction",params:[{from:acct,to,data}]});
    toast(label+": sent "+short(h),5000);
    for(let i=0;i<40;i++){ await new Promise(r=>setTimeout(r,1500)); const rc=await rpc("eth_getTransactionReceipt",[h]).catch(()=>null);
      if(rc){ toast(rc.status==="0x1"?label+": done":label+": failed on chain",5000); break; } }
    loadChain(); return true;
  }catch(e){ toast(e&&e.code===4001?"Cancelled in wallet.":(errText(e&&e.data)||"Wallet error. Nothing was sent."),5000); return false; }
}
function parseAmt(id){
  const s=($(id).value||"").trim().replace(",",".");
  if(!/^\d*\.?\d*$/.test(s)||s===""||s===".") return null;
  const [i,f=""]=s.split("."); return BigInt(i||"0")*E18+BigInt((f+"0".repeat(18)).slice(0,18));
}
const toStr=v=>{ const i=v/E18, f=(v%E18).toString().padStart(18,"0").replace(/0+$/,""); return i.toString()+(f?"."+f:""); };

/* ---------- buttons ---------- */
function wire(){
  $("buy").href=BUY_URL;
  set("ca-addr",short(A.token));
  $("ca").onclick=async()=>{ try{ await navigator.clipboard.writeText(A.token); }catch(e){ const t=document.createElement("textarea"); t.value=A.token; document.body.appendChild(t); t.select(); try{document.execCommand("copy");}catch(_){} t.remove(); } set("ca-c","Copied"); setTimeout(()=>set("ca-c","Copy"),1500); };
  $("connect").onclick=connect;
  $("dist-imd").onclick=()=>send(A.vault,"0x63453ae1"+encA(A.imd),"Distribute IMD");
  $("dist-ns").onclick=()=>send(A.vault,"0x63453ae1"+encA(A.token),"Distribute NOTSTOCK");
  $("b-burn").onclick=()=>send(S.burner,"0x44df8e70","Burn");
  $("b-max").onclick=()=>{ if(S.myNs!=null) $("b-amt").value=toStr(S.myNs); };
  $("b-dep").onclick=()=>{ const v=parseAmt("b-amt"); if(!v){ set("b-why","Enter a NOTSTOCK amount."); return; }
    if(S.myNs==null||v>S.myNs){ set("b-why","That is more NOTSTOCK than this wallet holds."); return; }
    send(A.token,"0xa9059cbb"+encA(S.burner)+encU(v),"Deposit to Burner"); };
  $("g-max").onclick=()=>{ if(S.myNs!=null) $("g-amt").value=toStr(S.myNs); };
  $("g-stake").onclick=async()=>{ const v=parseAmt("g-amt"); if(!v){ set("g-why","Enter a NOTSTOCK amount."); return; }
    if(v>S.myNs){ set("g-why","That is more NOTSTOCK than this wallet holds."); return; }
    const al=await u256(A.token,"0xdd62ed3e"+encA(acct)+encA(S.gov));
    if(al==null||al<v){ if(!await send(A.token,"0x095ea7b3"+encA(S.gov)+encU(v),"Approve")) return; }
    send(S.gov,"0xa694fc3a"+encU(v),"Stake"); };
  $("g-unstake").onclick=async()=>{ const v=parseAmt("g-amt"); if(!v){ set("g-why","Enter a NOTSTOCK amount."); return; }
    const st=await u256(S.gov,"0x98807d84"+encA(acct)); if(st==null||v>st){ set("g-why","That is more than your stake."); return; }
    send(S.gov,"0x2e17de78"+encU(v),"Unstake"); };
  $("steps").onclick=async ev=>{
    const b=ev.target.closest("button"); if(!b) return;
    const k=b.getAttribute("data-deploy"), act=b.getAttribute("data-act");
    if(k!=null){ b.disabled=true; try{ const j=await (await fetch("./m/"+MODS[+k]+".json")).json(); const code=j.creationCode.replace(/^0x/,"");
        const len=code.length/2; const data="0x97a1a24e"+encU(k)+encU(64)+encU(len)+code+"0".repeat((64-code.length%64)%64);
        await send(A.desk,data,"Deploy "+MODS[+k]); }catch(e){ toast("Could not load module code."); } b.disabled=false; }
    if(act==="register") send(S.pg,"0xe45c90b8"+encU(LAUNCH),"Register");
    if(act==="split") send(A.splitter,"0xf7654176","Split");
  };
  const ad=[["NOTSTOCK token",A.token],["LP Desk",A.desk],["FirmVault",A.vault],["GenesisSplitter",A.splitter],["Treasury",A.treasury],["Dev wallet",A.dev]];
  $("addrs").innerHTML=ad.map(x=>'<li><span>'+x[0]+'</span><a href="'+EXP+x[1]+'" target="_blank" rel="noopener">'+short(x[1])+'</a></li>').join("");
}
S.mods=[{on:false},{on:false},{on:false},{on:false}];
wire(); renderWallet().catch(()=>{});
loadMarket().catch(()=>{}); loadChain().catch(()=>{}); loadHolders();
setInterval(()=>{ loadMarket().catch(()=>{}); loadChain().catch(()=>{}); },30000);
})();
