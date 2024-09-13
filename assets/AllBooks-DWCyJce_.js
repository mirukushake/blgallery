const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BookInfo-Buj7EESd.js","assets/index-B_5Dvk43.js","assets/index-CBQI_l3B.js","assets/index-CUTCcnJ7.css","assets/index-BfC3vDCY.js","assets/index-D0SkZOIp.js","assets/index-BAb--7LL.js"])))=>i.map(i=>d[i]);
import{B as ne,s as se,o as u,c as g,a as l,m as P,d as ae,u as ie,b as ce,e as re,f as de,r as h,g as ue,h as i,i as T,j as N,w as p,k as r,F as L,t as f,l as A,n as U,p as E,q as ge,v as pe,x as he,_ as be}from"./index-CBQI_l3B.js";import{s as we,a as ve,b as me,c as fe,d as ke}from"./index-BfC3vDCY.js";import{u as ye,s as _e,a as Ve,b as Se,c as xe,d as Ce}from"./index-BAb--7LL.js";import{s as je}from"./index-D0SkZOIp.js";var Be=function(s){var e=s.dt;return`
.p-toggleswitch {
    display: inline-block;
    width: `.concat(e("toggleswitch.width"),`;
    height: `).concat(e("toggleswitch.height"),`;
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: `).concat(e("toggleswitch.border.radius"),`;
}

.p-toggleswitch-slider {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: `).concat(e("toggleswitch.border.width"),`;
    border-style: solid;
    border-color: `).concat(e("toggleswitch.border.color"),`;
    background: `).concat(e("toggleswitch.background"),`;
    transition: background `).concat(e("toggleswitch.transition.duration"),", color ").concat(e("toggleswitch.transition.duration"),", border-color ").concat(e("toggleswitch.transition.duration"),", outline-color ").concat(e("toggleswitch.transition.duration"),", box-shadow ").concat(e("toggleswitch.transition.duration"),`;
    border-radius: `).concat(e("toggleswitch.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(e("toggleswitch.shadow"),`;
}

.p-toggleswitch-slider:before {
    position: absolute;
    content: "";
    top: 50%;
    background: `).concat(e("toggleswitch.handle.background"),`;
    width: `).concat(e("toggleswitch.handle.size"),`;
    height: `).concat(e("toggleswitch.handle.size"),`;
    left: `).concat(e("toggleswitch.gap"),`;
    margin-top: calc(-1 * calc(`).concat(e("toggleswitch.handle.size"),` / 2));
    border-radius: `).concat(e("toggleswitch.handle.border.radius"),`;
    transition: background `).concat(e("toggleswitch.transition.duration"),", left ").concat(e("toggleswitch.slide.duration"),`;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.checked.background"),`;
    border-color: `).concat(e("toggleswitch.checked.border.color"),`;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.checked.background"),`;
    left: calc(`).concat(e("toggleswitch.width")," - calc(").concat(e("toggleswitch.handle.size")," + ").concat(e("toggleswitch.gap"),`));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.hover.background"),`;
    border-color: `).concat(e("toggleswitch.hover.border.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.hover.background"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.checked.hover.background"),`;
    border-color: `).concat(e("toggleswitch.checked.hover.border.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.checked.hover.background"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: `).concat(e("toggleswitch.focus.ring.shadow"),`;
    outline: `).concat(e("toggleswitch.focus.ring.width")," ").concat(e("toggleswitch.focus.ring.style")," ").concat(e("toggleswitch.focus.ring.color"),`;
    outline-offset: `).concat(e("toggleswitch.focus.ring.offset"),`;
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: `).concat(e("toggleswitch.invalid.border.color"),`;
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.disabled.background"),`;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.disabled.background"),`;
}
`)},Te={root:{position:"relative"}},Le={root:function(s){var e=s.instance,k=s.props;return["p-toggleswitch p-component",{"p-toggleswitch-checked":e.checked,"p-disabled":k.disabled,"p-invalid":k.invalid}]},input:"p-toggleswitch-input",slider:"p-toggleswitch-slider"},$e=ne.extend({name:"toggleswitch",theme:Be,classes:Le,inlineStyles:Te}),Ie={name:"BaseToggleSwitch",extends:se,props:{modelValue:{type:null,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:$e,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},Z={name:"ToggleSwitch",extends:Ie,inheritAttrs:!1,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(s){var e=s==="root"?this.ptmi:this.ptm;return e(s,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(s){if(!this.disabled&&!this.readonly){var e=this.checked?this.falseValue:this.trueValue;this.$emit("update:modelValue",e),this.$emit("change",s)}},onFocus:function(s){this.$emit("focus",s)},onBlur:function(s){this.$emit("blur",s)}},computed:{checked:function(){return this.modelValue===this.trueValue}}},Pe=["data-p-checked","data-p-disabled"],Ue=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label","aria-invalid"];function ze(n,s,e,k,z,a){return u(),g("div",P({class:n.cx("root"),style:n.sx("root")},a.getPTOptions("root"),{"data-p-checked":a.checked,"data-p-disabled":n.disabled}),[l("input",P({id:n.inputId,type:"checkbox",role:"switch",class:[n.cx("input"),n.inputClass],style:n.inputStyle,checked:a.checked,tabindex:n.tabindex,disabled:n.disabled,readonly:n.readonly,"aria-checked":a.checked,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-invalid":n.invalid||void 0,onFocus:s[0]||(s[0]=function(){return a.onFocus&&a.onFocus.apply(a,arguments)}),onBlur:s[1]||(s[1]=function(){return a.onBlur&&a.onBlur.apply(a,arguments)}),onChange:s[2]||(s[2]=function(){return a.onChange&&a.onChange.apply(a,arguments)})},a.getPTOptions("input")),null,16,Ue),l("span",P({class:n.cx("slider")},a.getPTOptions("slider")),null,16)],16,Pe)}Z.render=ze;const Fe={key:0,class:"flex items-center justify-center min-h-screen p-5 min-w-screen"},Oe=l("div",{class:"flex space-x-2 animate-pulse"},[l("div",{class:"w-3 h-3 bg-gray-500 rounded-full"}),l("div",{class:"w-3 h-3 bg-gray-500 rounded-full"}),l("div",{class:"w-3 h-3 bg-gray-500 rounded-full"})],-1),De=[Oe],Ne={class:"mt-4 flex flex-col"},Ae={class:"flex mb-4"},Ee={class:"flex w-6/12 mb-4"},Ze={key:"id",class:"flex items-center mr-4"},He={for:"item",class:"ml-1"},Re={class:"grid grid-cols-6 gap-4 auto-rows-fr"},qe={key:0},Me=["alt","src"],Ge={key:1},Je=l("div",{class:"object-cover object-center h-56 w-full flex justify-center items-center"},[l("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-24"},[l("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"})])],-1),Ke=[Je],Qe={class:"text-base font-bold"},We={class:"mr-2"},Xe=l("i",{class:"pi pi-star-fill text-yellow-400"},null,-1),Ye={class:"mt-2"},nt=ae({__name:"AllBooks",setup(n){const{t:s,locale:e}=ie({useScope:"global"}),k=ce(),{bookshelf:z,loading:a,metadata:w}=re(k),H=he(()=>be(()=>import("./BookInfo-Buj7EESd.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),R=de(),_=h(""),V=h([]),S=h([]),x=h([]),C=h([]),j=h([]),B=h([]),$=h(!1),I=ue(()=>z.value.filter(o=>o.title.toLowerCase().includes(_.value.toLowerCase())||(o.authors?o.authors.some(t=>t.name.toLowerCase().includes(_.value.toLowerCase())):!1)).filter(o=>!S.value.length||o.tone&&o.tone.some(t=>S.value.includes(t.id))).filter(o=>!x.value.length||o.seme&&o.seme.some(t=>x.value.includes(t.id))).filter(o=>!C.value.length||o.uke&&o.uke.some(t=>C.value.includes(t.id))).filter(o=>!V.value.length||o.settei&&o.settei.some(t=>V.value.includes(t.id))).filter(o=>!B.value.length||o.tags&&o.tags.some(t=>B.value.includes(t.id))).filter(o=>!j.value.length||j.value.includes(o.status_id)).sort((o,t)=>{if($.value===!0)return t.added.localeCompare(o.added)})),q=o=>{switch(o){case 2:return"!bg-yellow-200";case 1:return"!bg-gray-200";case 4:return"!bg-green-200";case 5:return"!bg-red-200";case 3:return"!bg-blue-200"}},M=o=>{R.open(H,{data:o,props:{header:o.title,style:{width:"70vw"},breakpoints:{"960px":"90vw","640px":"100vw"},modal:!0}})};return ye({title:"mirukushake's BL collection"}),(o,t)=>{const G=we,J=je,K=ve,Q=Z,y=me,W=ke,X=_e,F=xe,Y=Ce,ee=Ve,te=Se,oe=fe;return u(),g(L,null,[i(a)?(u(),g("div",Fe,De)):T("",!0),i(a)===!1?(u(),N(X,{key:1,toggleable:"",class:"mb-10",collapsed:!0},{header:p(()=>[r(K,null,{default:p(()=>[r(G,{class:"pi pi-search"}),r(J,{modelValue:_.value,"onUpdate:modelValue":t[0]||(t[0]=v=>_.value=v),placeholder:"Search",class:""},null,8,["modelValue"])]),_:1}),l("span",null,f(I.value.length)+" results",1)]),default:p(()=>{var v,c,b,m,O,D;return[l("div",Ne,[l("div",Ae,[A(" Newest first "),r(Q,{modelValue:$.value,"onUpdate:modelValue":t[1]||(t[1]=d=>$.value=d),class:"ml-4"},null,8,["modelValue"])]),r(y,{modelValue:S.value,"onUpdate:modelValue":t[2]||(t[2]=d=>S.value=d),display:"chip",options:(v=i(w))==null?void 0:v.tone,"option-value":"id","option-label":i(e)==="ja"?"ja":"en",filter:"",placeholder:"Select tone",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),r(y,{modelValue:V.value,"onUpdate:modelValue":t[3]||(t[3]=d=>V.value=d),display:"chip",options:(c=i(w))==null?void 0:c.settei,"option-value":"id","option-label":i(e)==="ja"?"ja":"en",filter:"",placeholder:"Select tropes/settings",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),r(y,{modelValue:x.value,"onUpdate:modelValue":t[4]||(t[4]=d=>x.value=d),display:"chip",options:(b=i(w))==null?void 0:b.seme,"option-value":"id","option-label":i(e)==="ja"?"ja":"en",filter:"",placeholder:"Select seme traits",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),r(y,{modelValue:C.value,"onUpdate:modelValue":t[5]||(t[5]=d=>C.value=d),display:"chip",options:(m=i(w))==null?void 0:m.uke,"option-value":"id","option-label":i(e)==="ja"?"ja":"en",filter:"",placeholder:"Select uke traits",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),r(y,{modelValue:B.value,"onUpdate:modelValue":t[6]||(t[6]=d=>B.value=d),display:"chip",options:(O=i(w))==null?void 0:O.tags,"option-value":"id","option-label":i(e)==="ja"?"ja":"en",filter:"",placeholder:"Select tags",class:"w-6/12 mb-4"},null,8,["modelValue","options","option-label"]),l("div",Ee,[(u(!0),g(L,null,U((D=i(w))==null?void 0:D.status,d=>(u(),g("span",Ze,[r(W,{modelValue:j.value,"onUpdate:modelValue":t[7]||(t[7]=le=>j.value=le),value:d.id},null,8,["modelValue","value"]),l("label",He,f(d[i(e)]),1)]))),128))])])]}),_:1})):T("",!0),!i(a)&&I.value?(u(),N(ee,{key:2,value:I.value,"data-key":"id",layout:"grid",class:"!border-none",lazy:!0},{grid:p(v=>[l("div",Re,[(u(!0),g(L,null,U(v.items,c=>(u(),g("div",{key:c.id,class:""},[r(Y,{class:"h-full hover:shadow-md cursor-pointer",onClick:b=>M(c)},{header:p(()=>[c.cover?(u(),g("span",qe,[l("img",{alt:`${c.title.ja} cover`,src:c.cover,class:"object-cover object-right-top h-56 w-full rounded-t-md"},null,8,Me)])):(u(),g("span",Ge,Ke))]),title:p(()=>[l("span",Qe,f(c.title),1)]),subtitle:p(()=>[l("div",null,[c.authors?(u(!0),g(L,{key:0},U(c.authors.sort((b,m)=>b.order-m.order),(b,m)=>(u(),g("span",{class:E({"ml-2":m>0})},f(b.name),3))),256)):T("",!0)])]),content:p(()=>[l("div",null,[l("span",We,[r(F,{value:c.status[i(e)],severity:"secondary",class:E(q(c.status_id))},null,8,["value","class"])]),ge(l("span",null,[Xe,A(" "+f(c.rating),1)],512),[[pe,c.rating]])]),l("div",Ye,[r(F,{severity:c.manga===!1?"secondary":"info"},{default:p(()=>[l("div",null,f(c.manga===!1?i(s)("novel"):i(s)("manga")),1)]),_:2},1032,["severity"])])]),_:2},1032,["onClick"])]))),128))])]),_:1},8,["value"])):T("",!0),r(te),r(oe)],64)}}});export{nt as default};
