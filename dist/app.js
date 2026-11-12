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
const call=(to,data,tag)=>rpc("eth_call",[{to,data},tag||"latest"]);
const word=(h,i)=>BigInt("0x"+(h.replace(/^0x/,"").slice(i*64,i*64+64)||"0"));
const addrW=(h,i)=>"0x"+h.replace(/^0x/,"").slice(i*64+24,i*64+64);
async function u256(to,data,tag){ for(let t=0;t<3;t++){ try{ const r=await call(to,data,tag); return r&&r!=="0x"?word(r,0):null; }catch(e){ if(e.message==="revert") return null; await new Promise(z=>setTimeout(z,500+t*700)); } } return null; }
const bal=(tok,who,tag)=>u256(tok,"0x70a08231"+encA(who),tag);
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
  if(q){ S.q001=word(q,0); } if(qi){ S.qImd=word(qi,0); }
  if(S.q001&&S.ethUsd){
    const pEth=0.001/(Number(S.q001)/1e18); S.priceUsd=pEth*S.ethUsd;
    set("s-price",usd(S.priceUsd)); set("s-fdv",usd(S.priceUsd*1e9));
    if(S.qImd&&S.qImd>0n){ S.nsPerImd=Number(S.qImd)/1e18; S.imdUsd=S.nsPerImd*S.priceUsd; set("p-price",num(1/S.nsPerImd,3)+" IMD · "+usd(S.priceUsd)); }
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
  TAPE.forEach((t,i)=>{ if(got[i]){ rows.push([t[0],tusd(got[i])]); S.px[t[0]]=got[i]; } }); if(S.ethUsd) S.px.WETH=S.ethUsd; renderPools();
  S.tapePrev=S.tapePrev||{};
  const html=rows.map(r=>{ const prev=S.tapePrev[r[0]]; let mv="";
    if(prev&&prev!==r[1]){ const a=parseFloat(prev.replace(/[^0-9.]/g,"")), b=parseFloat(r[1].replace(/[^0-9.]/g,"")); if(isFinite(a)&&isFinite(b)&&a!==b) mv=b>a?'<i class="up">▲</i>':'<i class="dn">▼</i>'; }
    return '<span><b>'+r[0]+'</b>'+r[1]+mv+'</span>'; }).join("");
  rows.forEach(r=>S.tapePrev[r[0]]=r[1]);
  if(!rows.length) return;
  $("tape").innerHTML='<div class="tape-g">'+html+'</div><div class="tape-g" aria-hidden="true">'+html+'</div>'; $("tape-box").hidden=false;
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
  const tag=blk||"latest"; S.blockHex=blk;
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
  S.burnerBal=burnerBal; S.deadBal=dead; set("b-dead",fmt(dead)); set("b-burner",fmt(burnerBal));
  // token page: every known holder, one block
  S.gov&&set("h-stake",fmt(await u256(S.gov,"0x817b1cd2"))+" NOTSTOCK"); if(!S.gov) set("h-stake","Opens soon");
  const who=[["Treasury",A.treasury],["Uniswap v4 pools",A.pm],["Swarm airdrop",A.swarm],["GenesisSplitter",A.splitter],["LP Desk",A.desk],["Dev wallet",A.dev],["FirmVault",A.vault]];
  if(S.burner) who.push(["Burner",S.burner]); if(S.gov) who.push(["Staked",S.gov]); who.push(["Burned forever",A.dead]);
  const vals=await Promise.all(who.map(w=>bal(A.token,w[1],tag)));
  if(vals.every(v=>v==null)) return renderSetup(), renderWallet();
  S.supplyBlock=blk?parseInt(blk,16):null;
  let sum=0n; vals.forEach(v=>{ if(v) sum+=v; });
  const rows=who.map((w,i)=>[w[0],vals[i]||0n,w[1]]); rows.push(["Other holders",10n**27n-sum,null]);
  rows.sort((a,b)=>a[1]<b[1]?1:a[1]>b[1]?-1:0);
  S.supply=rows; renderToken(dead);
  renderSetup(); renderWallet();
}
const COLORS=["#f1dc9e","#d8b45e","#8a6a26","#4f6bd8","#2c3f8f","#9aa6e8","#3ecf7a","#c77d3a","#e5e0cc","#6b7280","#b98cf0","#ff7b73"];
function pctOf(v){ return Number(v*1000000n/10n**27n)/10000; }
function pctS(p){ return p===0?"0%":p<0.01?"<0.01%":(+p.toFixed(2))+"%"; }
function renderToken(dead){
  const rows=S.supply; if(!rows) return;
  const nz=rows.filter(r=>r[1]>0n);
  $("stack").innerHTML=nz.map((r,i)=>'<i style="flex-grow:'+Math.max(pctOf(r[1]),0.4)+';background:'+COLORS[rows.indexOf(r)%COLORS.length]+'" title="'+r[0]+'"></i>').join("");
  $("tok-list").innerHTML=rows.map((r,i)=>{ const p=pctOf(r[1]);
    return '<li data-raw="'+r[1].toString()+'"'+(r[2]?' data-addr="'+r[2]+'"':'')+'><i class="dot" style="background:'+COLORS[i%COLORS.length]+'"></i><span class="tl-n">'+r[0]+(r[2]?'<a href="'+EXP+r[2]+'" target="_blank" rel="noopener">'+short(r[2])+'</a>':'')+'</span><b class="tl-v">'+fmt(r[1])+'</b><span class="tl-p">'+pctS(p)+'</span><span class="tl-tr"><i style="width:'+Math.min(100,p)+'%;background:'+COLORS[i%COLORS.length]+'"></i></span></li>'; }).join("");
  set("t-burn",fmt(dead)+" NOTSTOCK · "+pctS(dead!=null?pctOf(dead):0)); set("h-burn",fmt(dead)+" NOTSTOCK");
  if(S.supplyBlock) set("t-blk","Read from chain at block "+S.supplyBlock.toLocaleString("en-US"));
  const inPos=(S.livePos||[]).reduce((a,p)=>a+(p.ns||0),0);
  const n=$("t-note"); if(inPos>0){ n.hidden=false; n.textContent="LP Desk positions hold "+num(inPos)+" NOTSTOCK inside Uniswap v4 pools."; } else n.hidden=true;
}
/* ---------- pools ---------- */
const PLAN=[["WETH","0x0bd7d308f8e1639fab988df18a8011f41eacad73",18],["USDG","0x5fc5360d0400a0fd4f2af552add042d716f1d168",6],["cbBTC","0xcec185eb182c47d1ba1efc84e6959e18cd620be4",8],["NVDA","0xd0601ce157db5bdc3162bbac2a2c8af5320d9eec",18],["SPCX","0x4a0e65a3eccec6dbe60ae065f2e7bb85fae35eea",18]];
S.px={USDG:1};
const i24=w=>{ return w>=(1n<<255n)?Number(w-(1n<<256n)):Number(w); };
function assetInfo(a){ const k=PLAN.find(x=>x[1]===a.toLowerCase()); if(k) return {sym:k[0],dec:k[2]}; if(a.toLowerCase()===A.imd) return {sym:"IMD",dec:18}; return {sym:short(a),dec:18}; }
function assetUsd(sym){ return sym==="IMD"?S.imdUsd:S.px[sym]; }
/* NOTSTOCK price in asset (human units) at a tick */
function nsInAsset(tick,ns0,dec){ const r=Math.pow(1.0001,tick); return ns0? r*Math.pow(10,18-dec) : Math.pow(10,18-dec)/r; }
async function loadPositions(){
  const r=await call(A.desk,"0xba5b7982").catch(()=>null); if(!r||r==="0x") return;
  const n=Number(word(r,1)); const out=[];
  for(let i=0;i<n;i++){ const b=2+i*10;
    out.push({id:i,pm:addrW(r,b),kind:Number(word(r,b+1)),asset:addrW(r,b+2),ns0:word(r,b+3)===1n,fee:Number(word(r,b+4)),tl:i24(word(r,b+6)),tu:i24(word(r,b+7)),tokenId:word(r,b+8),open:word(r,b+9)===1n}); }
  await Promise.all(out.map(async p=>{ p.liq=p.open?await u256(A.desk,"0x66610dd6"+encU(p.id)):0n; }));
  // collected fees: FeesSplit(id indexed, token, amount) from LpDesk
  if(n>0){ try{ const head=parseInt(await rpc("eth_blockNumber",[]),16); const fees={};
    for(let f=LAUNCH_BLOCK; f<=head; f+=200000){
      const lg=await rpc("eth_getLogs",[{address:A.desk,fromBlock:"0x"+f.toString(16),toBlock:"0x"+Math.min(head,f+199999).toString(16),topics:["0x9c617bfa7ae4dadfa403a8d5ec8de57e6ed00bd4e1f3c7d419a0cc22df51e2f9"]}]);
      for(const l of lg){ const id=Number(BigInt(l.topics[1])); const tok=addrW(l.data,0); const v=word(l.data,1); fees[id]=fees[id]||{}; fees[id][tok]=(fees[id][tok]||0n)+v; } }
    out.forEach(p=>p.fees=fees[p.id]||{}); }catch(e){ out.forEach(p=>p.fees=null); } }
  S.positions=out; renderPools();
}
function rangeTxt(lo,hi,now){ const f=x=>{ const d=(x/now-1)*100; const a=Math.abs(d); return (d>=0?"+":"−")+(a>=100?Math.round(a):+a.toFixed(1))+"%"; };
  return (Math.abs(lo/now-1)<0.01?"Now":f(lo))+" to "+f(hi); }
function rbarL(pct,txt,end){ if(!txt&&!end) return '';
  const tx=pct<=15?'0':pct>=85?'-100%':'-50%';
  return '<p class="rbar-l">'+(txt?'<span class="rbar-at" style="left:'+pct+'%;transform:translateX('+tx+')">'+txt+'</span>':'')+(end?'<span class="rbar-end">'+end+'</span>':'')+'</p>'; }
function posCard(o){
  const pct=o.where==null?0:Math.max(0,Math.min(100,o.where*100));
  return '<article class="pos'+(o.plan?' plan':'')+'"'+(o.id!=null?' data-id="'+o.id+'"':'')+'><header><b>NOTSTOCK / '+o.sym+'</b><span class="pos-st">'+(o.plan?'Opens after setup':o.open?'Open':'Closed')+'</span></header>'+
   '<p class="pos-r"><span>Range</span><b>'+o.lo+' – '+o.hi+'</b></p><p class="pos-rr">'+o.rel+'</p>'+
   '<div class="rbar" aria-hidden="true"><i class="rfill"></i><i class="rmark" style="left:'+pct+'%"></i></div>'+rbarL(pct,o.whereTxt,o.endTxt)+
   '<dl class="pos-kv"><div><dt>NOTSTOCK in position</dt><dd>'+o.ns+'</dd></div><div><dt>'+o.sym+' accumulated</dt><dd>'+o.as+'</dd></div><div><dt>Fees collected</dt><dd>'+o.fees+'</dd></div></dl></article>';
}
function renderPools(){
  const now=S.priceUsd; const grid=$("pos-grid"); if(!grid) return;
  const live=(S.positions||[]); const cards=[]; const used=new Set();
  S.livePos=[];
  live.forEach(p=>{ const ai=assetInfo(p.asset); used.add(p.asset.toLowerCase()); const au=assetUsd(ai.sym);
    const a=nsInAsset(p.tl,p.ns0,ai.dec), b=nsInAsset(p.tu,p.ns0,ai.dec); const loA=Math.min(a,b), hiA=Math.max(a,b);
    const o={id:p.id,sym:ai.sym,open:p.open,lo:"…",hi:"…",rel:"",where:null,whereTxt:"",ns:"…",as:"…",fees:"—"};
    if(au&&now){ const lo=loA*au, hi=hiA*au; o.lo=usd(lo); o.hi=usd(hi); o.rel=rangeTxt(lo,hi,now)+" from now";
      o.where=Math.log(now/lo)/Math.log(hi/lo); o.whereTxt=now<lo?"Price below range":now>hi?"Price above range":"Price "+usd(now);
      // amounts from liquidity at the market price
      const x=now/au; const rawP=p.ns0? x*Math.pow(10,ai.dec-18) : Math.pow(10,18-ai.dec)/x;
      const sa=Math.pow(1.0001,p.tl/2), sb=Math.pow(1.0001,p.tu/2), sp=Math.min(Math.max(Math.sqrt(rawP),sa),sb); const L=Number(p.liq||0n);
      const a0=L*(1/sp-1/sb), a1=L*(sp-sa); const nsAmt=(p.ns0?a0:a1)/1e18, asAmt=(p.ns0?a1:a0)/Math.pow(10,ai.dec);
      o.ns=num(nsAmt); o.as=num(asAmt,4)+" "+ai.sym+(asAmt>0?" · "+usd(asAmt*au):""); S.livePos.push({ns:nsAmt});
    }
    if(p.fees){ const parts=[]; let tot=0, ok=true; for(const t in p.fees){ const v=p.fees[t]; const isNs=t===A.token; const inf=isNs?{sym:"NOTSTOCK",dec:18}:assetInfo(t);
        const h=Number(v)/Math.pow(10,inf.dec); parts.push(num(h,4)+" "+inf.sym); const u=isNs?now:assetUsd(inf.sym); if(u) tot+=h*u; else ok=false; }
      o.fees=parts.length?parts.join(" + ")+(ok?" · "+usd(tot):""):"0"; }
    cards.push(posCard(o)); });
  PLAN.filter(x=>!used.has(x[1])).forEach(x=>{ const o={plan:true,sym:x[0],lo:now?usd(now):"…",hi:now?usd(now*11):"…",rel:"Now to +1000%",where:0,whereTxt:"Price now",endTxt:"+1000%",ns:"20M",as:"0 "+x[0],fees:"—"}; cards.push(posCard(o)); });
  grid.innerHTML=cards.join("");
  const open=live.filter(p=>p.open).length;
  set("pos-sub", live.length? open+" open · NOTSTOCK sells into each pair as the price climbs" : "5 positions of 20M NOTSTOCK each. They open after the desk setup.");
  set("h-pos", S.positions? (live.length? open+" open" : "0 of "+PLAN.length+" open"):"…");
  if(S.supply) renderToken(S.deadBal);
}
async function loadMainPool(){
  const [inPm]=await Promise.all([bal(A.token,A.pm)]);
  set("p-liq",inPm==null?"…":fmt(inPm)+" NOTSTOCK");
  try{ const head=parseInt(await rpc("eth_blockNumber",[]),16); let got=0n;
    for(let f=LAUNCH_BLOCK; f<=head; f+=200000){
      const lg=await rpc("eth_getLogs",[{address:A.imd,fromBlock:"0x"+f.toString(16),toBlock:"0x"+Math.min(head,f+199999).toString(16),topics:["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",null,"0x"+encA(A.vault)]}]);
      for(const l of lg) got+=BigInt(l.data); }
    S.vaultImdIn=got; const h=Number(got)/1e18; set("p-fees",num(h,4)+" IMD"+(S.imdUsd?" · "+usd(h*S.imdUsd):""));
  }catch(e){ set("p-fees","…"); }
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
  if(!c){ set("b-mine","Connect wallet"); set("g-mine",S.gov?"Connect wallet":"After setup"); set("g-bal","Connect wallet"); }
  else{
    S.myNs=await bal(A.token,acct); set("b-mine",fmt(S.myNs)); set("g-bal",fmt(S.myNs)+" NOTSTOCK");
    if(S.gov) set("g-mine",fmt(await u256(S.gov,"0x98807d84"+encA(acct)))); else set("g-mine","After setup");
  }
  const reg=S.registered;
  $("dist-imd").disabled=!c||!reg||!(S.vImd>0n); $("dist-ns").disabled=!c||!reg||!(S.vNs>0n);
  set("dist-why",!reg?"Opens after setup (Register step).":!c?"Connect wallet to distribute.":(!(S.vImd>0n)&&!(S.vNs>0n))?"Nothing to distribute yet.":"");
  $("b-burn").disabled=!c||!(S.burnerBal>0n);
  $("b-dep").disabled=!c; $("b-max").disabled=!c;
  set("b-why",!c?"Connect wallet to burn or deposit.":!(S.burnerBal>0n)?"Burner is empty. Deposit NOTSTOCK to burn it.":"");
  const g=!!S.gov; $("g-soon").hidden=g; $("g-form").hidden=!g; ["g-stake","g-unstake","g-max"].forEach(id=>$(id).disabled=!c||!g); $("g-amt").disabled=!g;
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
  $("buy").href=BUY_URL; $("explorer").href=EXP+A.token;
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
  renderAddrs();
  $("addrs").onclick=async ev=>{ const b=ev.target.closest("[data-copy]"); if(!b) return; const v=b.getAttribute("data-copy");
    try{ await navigator.clipboard.writeText(v); }catch(e){ const t=document.createElement("textarea"); t.value=v; document.body.appendChild(t); t.select(); try{document.execCommand("copy");}catch(_){} t.remove(); }
    b.textContent="Copied"; setTimeout(()=>b.textContent="Copy",1500); };
}
function renderAddrs(){
  const ad=[["NOTSTOCK token",A.token],["LP Desk",A.desk],["FirmVault",A.vault],["GenesisSplitter",A.splitter],["Treasury",A.treasury],["Dev wallet",A.dev],["Swarm airdrop",A.swarm],["IMD token",A.imd]];
  if(S.burner) ad.push(["Burner",S.burner]);
  (S.mods||[]).forEach((m,k)=>{ if(m.on&&m.addr) ad.push([MODS[k],m.addr]); });
  const mm=$("mods"); if(mm) mm.innerHTML=MODS.map((n,k)=>{ const m=(S.mods||[])[k]||{}; return '<li><b>'+n+'</b>'+(m.on&&m.addr?'<span class="ok">Deployed</span><a href="'+EXP+m.addr+'" target="_blank" rel="noopener">'+short(m.addr)+'</a>':'<span>Not deployed yet</span>')+'</li>'; }).join("");
  $("addrs").innerHTML=ad.map(x=>'<li><span>'+x[0]+'</span><a href="'+EXP+x[1]+'" target="_blank" rel="noopener">'+short(x[1])+'</a><button class="cp" type="button" data-copy="'+x[1]+'">Copy</button></li>').join("");
}
/* ---------- pages ---------- */
const PAGES=["home","token","pools","stake","contracts"];
function route(){ const m=location.hash.match(/^#\/([a-z]+)/); const pg=m&&PAGES.includes(m[1])?m[1]:"home";
  document.querySelectorAll(".page").forEach(el=>el.hidden=el.getAttribute("data-page")!==pg);
  document.querySelectorAll("#nav a").forEach(a=>{ if(a.getAttribute("data-r")===pg) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  const cur=document.querySelector('#nav a[aria-current]'), nv=$("nav"); if(cur&&nv.scrollWidth>nv.clientWidth){ const r=cur.offsetLeft+cur.offsetWidth-nv.offsetLeft; if(r>nv.clientWidth+nv.scrollLeft) nv.scrollLeft=r-nv.clientWidth+8; else if(cur.offsetLeft-nv.offsetLeft<nv.scrollLeft) nv.scrollLeft=0; }
  document.title=(pg==="home"?"Not Firm":pg[0].toUpperCase()+pg.slice(1)+" · Not Firm")+" | $NOTSTOCK";
  document.body.setAttribute("data-page",pg); if(route.done) window.scrollTo(0,0); route.done=true; }
window.addEventListener("hashchange",route); route();
S.mods=[{on:false},{on:false},{on:false},{on:false}];
wire(); renderWallet().catch(()=>{});
loadMarket().catch(()=>{}); loadChain().then(()=>renderAddrs()).catch(()=>{}); loadHolders(); loadPositions().catch(()=>{}); loadMainPool().catch(()=>{});
setInterval(()=>{ loadMarket().catch(()=>{}); loadChain().catch(()=>{}); loadPositions().catch(()=>{}); },30000);
})();
