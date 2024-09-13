import{B as u,a5 as f,s as g,o as l,c as i,m as r,ay as c,R as h,O as m,q as v,a as s,Q as d,p as x,i as y,t as k}from"./index-CBQI_l3B.js";var $=function(e){var t=e.dt;return`
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: `.concat(t("textarea.color"),`;
    background: `).concat(t("textarea.background"),`;
    padding: `).concat(t("textarea.padding.y")," ").concat(t("textarea.padding.x"),`;
    border: 1px solid `).concat(t("textarea.border.color"),`;
    transition: background `).concat(t("textarea.transition.duration"),", color ").concat(t("textarea.transition.duration"),", border-color ").concat(t("textarea.transition.duration"),", outline-color ").concat(t("textarea.transition.duration"),", box-shadow ").concat(t("textarea.transition.duration"),`;
    appearance: none;
    border-radius: `).concat(t("textarea.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(t("textarea.shadow"),`;
}

.p-textarea:enabled:hover {
    border-color: `).concat(t("textarea.hover.border.color"),`;
}

.p-textarea:enabled:focus {
    border-color: `).concat(t("textarea.focus.border.color"),`;
    box-shadow: `).concat(t("textarea.focus.ring.shadow"),`;
    outline: `).concat(t("textarea.focus.ring.width")," ").concat(t("textarea.focus.ring.style")," ").concat(t("textarea.focus.ring.color"),`;
    outline-offset: `).concat(t("textarea.focus.ring.offset"),`;
}

.p-textarea.p-invalid {
    border-color: `).concat(t("textarea.invalid.border.color"),`;
}

.p-textarea.p-variant-filled {
    background: `).concat(t("textarea.filled.background"),`;
}

.p-textarea.p-variant-filled:enabled:focus {
    background: `).concat(t("textarea.filled.focus.background"),`;
}

.p-textarea:disabled {
    opacity: 1;
    background: `).concat(t("textarea.disabled.background"),`;
    color: `).concat(t("textarea.disabled.color"),`;
}

.p-textarea::placeholder {
    color: `).concat(t("textarea.placeholder.color"),`;
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}
`)},w={root:function(e){var t=e.instance,a=e.props;return["p-textarea p-component",{"p-filled":t.filled,"p-textarea-resizable ":a.autoResize,"p-invalid":a.invalid,"p-variant-filled":a.variant?a.variant==="filled":t.$primevue.config.inputStyle==="filled"||t.$primevue.config.inputVariant==="filled","p-textarea-fluid":t.hasFluid}]}},B=u.extend({name:"textarea",theme:$,classes:w}),V={name:"BaseTextarea",extends:g,props:{modelValue:null,autoResize:Boolean,invalid:{type:Boolean,default:!1},variant:{type:String,default:null},fluid:{type:Boolean,default:null}},style:B,provide:function(){return{$pcTextarea:this,$parentInstance:this}}},z={name:"Textarea",extends:V,inheritAttrs:!1,emits:["update:modelValue"],inject:{$pcFluid:{default:null}},mounted:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize:function(){this.$el.style.height="auto",this.$el.style.height=this.$el.scrollHeight+"px",parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput:function(e){this.autoResize&&this.resize(),this.$emit("update:modelValue",e.target.value)}},computed:{filled:function(){return this.modelValue!=null&&this.modelValue.toString().length>0},ptmParams:function(){return{context:{disabled:this.$attrs.disabled||this.$attrs.disabled===""}}},hasFluid:function(){return f(this.fluid)?!!this.$pcFluid:this.fluid}}},S=["value","aria-invalid"];function T(n,e,t,a,b,o){return l(),i("textarea",r({class:n.cx("root"),value:n.modelValue,"aria-invalid":n.invalid||void 0,onInput:e[0]||(e[0]=function(){return o.onInput&&o.onInput.apply(o,arguments)})},n.ptmi("root",o.ptmParams)),null,16,S)}z.render=T;var I=function(e){var t=e.dt;return`
.p-togglebutton {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: `.concat(t("togglebutton.color"),`;
    background: `).concat(t("togglebutton.background"),`;
    border: 1px solid `).concat(t("togglebutton.border.color"),`;
    padding: `).concat(t("togglebutton.padding"),`;
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background `).concat(t("togglebutton.transition.duration"),", color ").concat(t("togglebutton.transition.duration"),", border-color ").concat(t("togglebutton.transition.duration"),`,
        outline-color `).concat(t("togglebutton.transition.duration"),", box-shadow ").concat(t("togglebutton.transition.duration"),`;
    border-radius: `).concat(t("togglebutton.border.radius"),`;
    outline-color: transparent;
    font-weight: `).concat(t("togglebutton.font.weight"),`;
}

.p-togglebutton-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: `).concat(t("togglebutton.gap"),`;
}

.p-togglebutton-label,
.p-togglebutton-icon {
    position: relative;
    transition: none;
}

.p-togglebutton::before {
    content: "";
    background: transparent;
    transition: background `).concat(t("togglebutton.transition.duration"),", color ").concat(t("togglebutton.transition.duration"),", border-color ").concat(t("togglebutton.transition.duration"),`,
            outline-color `).concat(t("togglebutton.transition.duration"),", box-shadow ").concat(t("togglebutton.transition.duration"),`;
    position: absolute;
    left: `).concat(t("togglebutton.content.left"),`;
    top: `).concat(t("togglebutton.content.top"),`;
    width: calc(100% - calc(2 *  `).concat(t("togglebutton.content.left"),`));
    height: calc(100% - calc(2 *  `).concat(t("togglebutton.content.top"),`));
    border-radius: `).concat(t("togglebutton.border.radius"),`;
}

.p-togglebutton.p-togglebutton-checked::before {
    background: `).concat(t("togglebutton.content.checked.background"),`;
    box-shadow: `).concat(t("togglebutton.content.checked.shadow"),`;
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
    background: `).concat(t("togglebutton.hover.background"),`;
    color: `).concat(t("togglebutton.hover.color"),`;
}

.p-togglebutton.p-togglebutton-checked {
    background: `).concat(t("togglebutton.checked.background"),`;
    border-color: `).concat(t("togglebutton.checked.border.color"),`;
    color: `).concat(t("togglebutton.checked.color"),`;
}

.p-togglebutton:focus-visible {
    box-shadow: `).concat(t("togglebutton.focus.ring.shadow"),`;
    outline: `).concat(t("togglebutton.focus.ring.width")," ").concat(t("togglebutton.focus.ring.style")," ").concat(t("togglebutton.focus.ring.color"),`;
    outline-offset: `).concat(t("togglebutton.focus.ring.offset"),`;
}

.p-togglebutton.p-invalid {
    border-color: `).concat(t("togglebutton.invalid.border.color"),`;
}

.p-togglebutton:disabled {
    opacity: 1;
    cursor: default;
    background: `).concat(t("togglebutton.disabled.background"),`;
    border-color: `).concat(t("togglebutton.disabled.border.color"),`;
    color: `).concat(t("togglebutton.disabled.color"),`;
}

.p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.color"),`;
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.hover.color"),`;
}

.p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.checked.color"),`;
}

.p-togglebutton:disabled .p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.disabled.color"),`;
}
`)},P={root:function(e){var t=e.instance,a=e.props;return["p-togglebutton p-component",{"p-togglebutton-checked":t.active,"p-invalid":a.invalid}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},L=u.extend({name:"togglebutton",theme:I,classes:P}),C={name:"BaseToggleButton",extends:g,props:{modelValue:Boolean,onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},iconPos:{type:String,default:"left"},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:L,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}},F={name:"ToggleButton",extends:C,inheritAttrs:!1,emits:["update:modelValue","change"],methods:{getPTOptions:function(e){var t=e==="root"?this.ptmi:this.ptm;return t(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.$emit("update:modelValue",!this.modelValue),this.$emit("change",e))}},computed:{active:function(){return this.modelValue===!0},hasLabel:function(){return c(this.onLabel)&&c(this.offLabel)},label:function(){return this.hasLabel?this.modelValue?this.onLabel:this.offLabel:"&nbsp;"}},directives:{ripple:h}},O=["tabindex","disabled","aria-pressed","data-p-checked","data-p-disabled"];function R(n,e,t,a,b,o){var p=m("ripple");return v((l(),i("button",r({type:"button",class:n.cx("root"),tabindex:n.tabindex,disabled:n.disabled,"aria-pressed":n.modelValue,onClick:e[0]||(e[0]=function(){return o.onChange&&o.onChange.apply(o,arguments)})},o.getPTOptions("root"),{"data-p-checked":o.active,"data-p-disabled":n.disabled}),[s("span",r({class:n.cx("content")},o.getPTOptions("content")),[d(n.$slots,"default",{},function(){return[d(n.$slots,"icon",{value:n.modelValue,class:x(n.cx("icon"))},function(){return[n.onIcon||n.offIcon?(l(),i("span",r({key:0,class:[n.cx("icon"),n.modelValue?n.onIcon:n.offIcon]},o.getPTOptions("icon")),null,16)):y("",!0)]}),s("span",r({class:n.cx("label")},o.getPTOptions("label")),k(o.label),17)]})],16)],16,O)),[[p]])}F.render=R;export{z as a,F as s};
