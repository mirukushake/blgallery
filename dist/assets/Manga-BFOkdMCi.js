const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BookInfo-Buj7EESd.js","assets/index-B_5Dvk43.js","assets/index-CBQI_l3B.js","assets/index-CUTCcnJ7.css","assets/index-BfC3vDCY.js","assets/index-D0SkZOIp.js","assets/index-BAb--7LL.js"])))=>i.map(i=>d[i]);
import{d as X,u as Y,b as ee,e as le,f as se,r as d,g as te,c as r,h as t,i as S,j as D,w as c,k as a,F as j,o as i,a as s,t as v,n as $,p as N,q as oe,l as ae,v as ne,x as ie,_ as re}from"./index-CBQI_l3B.js";import{s as ce,a as ue,b as de,c as pe,d as me}from"./index-BfC3vDCY.js";import{u as ve,s as _e,a as he,b as fe,c as ge,d as be}from"./index-BAb--7LL.js";import{s as we}from"./index-D0SkZOIp.js";const ye={key:0,class:"flex items-center justify-center min-h-screen p-5 min-w-screen"},ke=s("div",{class:"flex space-x-2 animate-pulse"},[s("div",{class:"w-3 h-3 bg-gray-500 rounded-full"}),s("div",{class:"w-3 h-3 bg-gray-500 rounded-full"}),s("div",{class:"w-3 h-3 bg-gray-500 rounded-full"})],-1),Ve=[ke],xe={class:"mt-4 flex flex-col"},je={class:"flex w-6/12 mb-4"},Ce={key:"id",class:"flex items-center mr-4"},Se={for:"item",class:"ml-1"},$e={class:"grid grid-cols-6 gap-4 auto-rows-fr"},Be={key:0},Ie=["src"],Le={key:1},Te=s("div",{class:"object-cover object-center h-56 w-full flex justify-center items-center"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-24"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"})])],-1),Ue=[Te],De={class:"text-base font-bold"},Ne={class:"mr-2"},ze=s("i",{class:"pi pi-star-fill text-yellow-400"},null,-1),Ae={class:"mt-2"},Me=X({__name:"Manga",setup(Ee){const{t:B,locale:u}=Y({useScope:"global"}),z=ee(),{mangaOnly:A,loading:C,metadata:p}=le(z),E=ie(()=>re(()=>import("./BookInfo-Buj7EESd.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),F=se(),f=d(""),g=d([]),b=d([]),w=d([]),y=d([]),k=d([]),V=d([]),I=te(()=>A.value.filter(l=>l.title.toLowerCase().includes(f.value.toLowerCase())||l.authors.some(e=>e.name.toLowerCase().includes(f.value.toLowerCase()))).filter(l=>!b.value.length||l.tone&&l.tone.some(e=>b.value.includes(e.id))).filter(l=>!w.value.length||l.seme&&l.seme.some(e=>w.value.includes(e.id))).filter(l=>!y.value.length||l.uke&&l.uke.some(e=>y.value.includes(e.id))).filter(l=>!g.value.length||l.settei&&l.settei.some(e=>g.value.includes(e.id))).filter(l=>!V.value.length||l.tags&&l.tags.some(e=>V.value.includes(e.id))).filter(l=>!k.value.length||k.value.includes(l.status_id))),P=l=>{switch(l){case 2:return"!bg-yellow-200";case 1:return"!bg-gray-200";case 4:return"!bg-green-200";case 5:return"!bg-red-200";case 3:return"!bg-blue-200"}},Z=l=>{F.open(E,{data:l,props:{header:l.title,style:{width:"70vw"},breakpoints:{"960px":"90vw","640px":"100vw"},modal:!0}})};return ve({title:"mirukushake's BL collection"}),(l,e)=>{const H=ce,M=we,O=ue,_=de,R=me,q=_e,L=ge,G=be,J=he,K=fe,Q=pe;return i(),r(j,null,[t(C)?(i(),r("div",ye,Ve)):S("",!0),t(C)===!1?(i(),D(q,{key:1,toggleable:"",class:"mb-10",collapsed:!0},{header:c(()=>[a(O,null,{default:c(()=>[a(H,{class:"pi pi-search"}),a(M,{modelValue:f.value,"onUpdate:modelValue":e[0]||(e[0]=m=>f.value=m),placeholder:"Search",class:""},null,8,["modelValue"])]),_:1}),s("span",null,v(I.value.length)+" results",1)]),default:c(()=>{var m,o,h,x,T,U;return[s("div",xe,[a(_,{modelValue:b.value,"onUpdate:modelValue":e[1]||(e[1]=n=>b.value=n),display:"chip",options:(m=t(p))==null?void 0:m.tone,"option-value":"id","option-label":t(u)==="ja"?"ja":"en",filter:"",placeholder:"Select tone",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),a(_,{modelValue:g.value,"onUpdate:modelValue":e[2]||(e[2]=n=>g.value=n),display:"chip",options:(o=t(p))==null?void 0:o.settei,"option-value":"id","option-label":t(u)==="ja"?"ja":"en",filter:"",placeholder:"Select tropes/settings",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),a(_,{modelValue:w.value,"onUpdate:modelValue":e[3]||(e[3]=n=>w.value=n),display:"chip",options:(h=t(p))==null?void 0:h.seme,"option-value":"id","option-label":t(u)==="ja"?"ja":"en",filter:"",placeholder:"Select seme traits",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),a(_,{modelValue:y.value,"onUpdate:modelValue":e[4]||(e[4]=n=>y.value=n),display:"chip",options:(x=t(p))==null?void 0:x.uke,"option-value":"id","option-label":t(u)==="ja"?"ja":"en",filter:"",placeholder:"Select uke traits",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),a(_,{modelValue:V.value,"onUpdate:modelValue":e[5]||(e[5]=n=>V.value=n),display:"chip",options:(T=t(p))==null?void 0:T.tags,"option-value":"id","option-label":t(u)==="ja"?"ja":"en",filter:"",placeholder:"Select tags",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),s("div",je,[(i(!0),r(j,null,$((U=t(p))==null?void 0:U.status,n=>(i(),r("span",Ce,[a(R,{modelValue:k.value,"onUpdate:modelValue":e[6]||(e[6]=W=>k.value=W),value:n.id},null,8,["modelValue","value"]),s("label",Se,v(n[t(u)]),1)]))),128))])])]}),_:1})):S("",!0),t(C)?S("",!0):(i(),D(J,{key:2,value:I.value,"data-key":"id",layout:"grid",class:"!border-none",lazy:!0},{grid:c(m=>[s("div",$e,[(i(!0),r(j,null,$(m.items,o=>(i(),r("div",{key:o.id,class:""},[a(G,{class:"h-full hover:shadow-md cursor-pointer",onClick:h=>Z(o)},{header:c(()=>[o.cover?(i(),r("span",Be,[s("img",{alt:"book cover",src:o.cover,class:"object-cover object-right-top h-56 w-full rounded-t-md"},null,8,Ie)])):(i(),r("span",Le,Ue))]),title:c(()=>[s("span",De,v(o.title),1)]),subtitle:c(()=>[s("div",null,[(i(!0),r(j,null,$(o.authors,(h,x)=>(i(),r("span",{class:N({"ml-2":x>0})},v(h.name),3))),256))])]),content:c(()=>[s("div",null,[s("span",Ne,[a(L,{value:o.status[t(u)],severity:"secondary",class:N(P(o.status_id))},null,8,["value","class"])]),oe(s("span",null,[ze,ae(" "+v(o.rating),1)],512),[[ne,o.rating]])]),s("div",Ae,[a(L,{severity:o.type===!1?"secondary":"info"},{default:c(()=>[s("div",null,v(o.type===!1?t(B)("novel"):t(B)("manga")),1)]),_:2},1032,["severity"])])]),_:2},1032,["onClick"])]))),128))])]),_:1},8,["value"])),a(K),a(Q)],64)}}});export{Me as default};
