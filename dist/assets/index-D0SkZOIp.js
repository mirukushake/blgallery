import{aP as l,Q as r,o as u,j as d,aQ as p,i as c,B as s,a5 as f,s as x,c as m,m as g,aR as h}from"./index-CBQI_l3B.js";var v={name:"Portal",props:{appendTo:{type:[String,Object],default:"body"},disabled:{type:Boolean,default:!1}},data:function(){return{mounted:!1}},mounted:function(){this.mounted=l()},computed:{inline:function(){return this.disabled||this.appendTo==="self"}}};function b(n,e,t,i,a,o){return o.inline?r(n.$slots,"default",{key:0}):a.mounted?(u(),d(p,{key:1,to:t.appendTo},[r(n.$slots,"default")],8,["to"])):c("",!0)}v.render=b;var y=function(e){var t=e.dt;return`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: `.concat(t("inputtext.color"),`;
    background: `).concat(t("inputtext.background"),`;
    padding: `).concat(t("inputtext.padding.y")," ").concat(t("inputtext.padding.x"),`;
    border: 1px solid `).concat(t("inputtext.border.color"),`;
    transition: background `).concat(t("inputtext.transition.duration"),", color ").concat(t("inputtext.transition.duration"),", border-color ").concat(t("inputtext.transition.duration"),", outline-color ").concat(t("inputtext.transition.duration"),", box-shadow ").concat(t("inputtext.transition.duration"),`;
    appearance: none;
    border-radius: `).concat(t("inputtext.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(t("inputtext.shadow"),`;
}

.p-inputtext:enabled:hover {
    border-color: `).concat(t("inputtext.hover.border.color"),`;
}

.p-inputtext:enabled:focus {
    border-color: `).concat(t("inputtext.focus.border.color"),`;
    box-shadow: `).concat(t("inputtext.focus.ring.shadow"),`;
    outline: `).concat(t("inputtext.focus.ring.width")," ").concat(t("inputtext.focus.ring.style")," ").concat(t("inputtext.focus.ring.color"),`;
    outline-offset: `).concat(t("inputtext.focus.ring.offset"),`;
}

.p-inputtext.p-invalid {
    border-color: `).concat(t("inputtext.invalid.border.color"),`;
}

.p-inputtext.p-variant-filled {
    background: `).concat(t("inputtext.filled.background"),`;
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: `).concat(t("inputtext.filled.focus.background"),`;
}

.p-inputtext:disabled {
    opacity: 1;
    background: `).concat(t("inputtext.disabled.background"),`;
    color: `).concat(t("inputtext.disabled.color"),`;
}

.p-inputtext::placeholder {
    color: `).concat(t("inputtext.placeholder.color"),`;
}

.p-inputtext-sm {
    font-size: `).concat(t("inputtext.sm.font.size"),`;
    padding: `).concat(t("inputtext.sm.padding.y")," ").concat(t("inputtext.sm.padding.x"),`;
}

.p-inputtext-lg {
    font-size: `).concat(t("inputtext.lg.font.size"),`;
    padding: `).concat(t("inputtext.lg.padding.y")," ").concat(t("inputtext.lg.padding.x"),`;
}

.p-inputtext-fluid {
    width: 100%;
}
`)},$={root:function(e){var t=e.instance,i=e.props;return["p-inputtext p-component",{"p-filled":t.filled,"p-inputtext-sm":i.size==="small","p-inputtext-lg":i.size==="large","p-invalid":i.invalid,"p-variant-filled":i.variant?i.variant==="filled":t.$primevue.config.inputStyle==="filled"||t.$primevue.config.inputVariant==="filled","p-inputtext-fluid":t.hasFluid}]}},k=s.extend({name:"inputtext",theme:y,classes:$}),B={name:"BaseInputText",extends:x,props:{modelValue:null,size:{type:String,default:null},invalid:{type:Boolean,default:!1},variant:{type:String,default:null},fluid:{type:Boolean,default:null}},style:k,provide:function(){return{$pcInputText:this,$parentInstance:this}}},T={name:"InputText",extends:B,inheritAttrs:!1,emits:["update:modelValue"],inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(e){var t=e==="root"?this.ptmi:this.ptm;return t(e,{context:{filled:this.filled,disabled:this.$attrs.disabled||this.$attrs.disabled===""}})},onInput:function(e){this.$emit("update:modelValue",e.target.value)}},computed:{filled:function(){return this.modelValue!=null&&this.modelValue.toString().length>0},hasFluid:function(){return f(this.fluid)?!!this.$pcFluid:this.fluid}}},I=["value","aria-invalid"];function z(n,e,t,i,a,o){return u(),m("input",g({type:"text",class:n.cx("root"),value:n.modelValue,"aria-invalid":n.invalid||void 0,onInput:e[0]||(e[0]=function(){return o.onInput&&o.onInput.apply(o,arguments)})},o.getPTOptions("root")),null,16,I)}T.render=z;var V=h();export{V as O,v as a,T as s};
