(this["webpackJsonpincubator-popularity-graph"]=this["webpackJsonpincubator-popularity-graph"]||[]).push([[0],{233:function(e,t,n){e.exports=n(373)},238:function(e,t,n){},373:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(185),l=(n(238),n(198)),o=n(12),c=n(186),u=n(126);function s(){return{width:window.innerWidth,height:window.innerHeight}}var m=function(e){var t=Object(u.a)(),n=Object(o.a)(t,2),a=n[0],i=n[1].width>e.width-20,l=i?10:e.width-16;return r.a.createElement("g",{transform:"translate(".concat(e.x,",").concat(e.y,")")},r.a.createElement("rect",{x:-3,y:7,width:e.width,height:e.height,fill:"rgba(0, 0, 0, .07)"}),r.a.createElement("rect",{width:e.width,height:e.height,fill:e.color}),r.a.createElement("rect",{x:e.width-8,width:8,height:e.height,fill:"rgba(0,0,0,0.2)"}),r.a.createElement("text",{x:l,y:e.height/4.5,textAnchor:i?"start":"end",dominantBaseline:"central",fill:"rgba(0,0,0,0.75)",style:{fontSize:e.height/3},ref:a},e.data.indexValue),r.a.createElement("text",{x:l,y:e.height/1.5,textAnchor:i?"start":"end",dominantBaseline:"central",fill:"black",style:{fontSize:e.height/2.1}},e.data.value))},d=function(){var e=function(){var e=Object(a.useState)(s()),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){function e(){r(s())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}().height,t=Object(u.a)(),n=Object(o.a)(t,2),i=n[0],d=n[1],h=Object(a.useState)([]),f=Object(o.a)(h,2),g=f[0],v=f[1];if(Object(a.useEffect)((function(){fetch("https://api.github.com/orgs/klarna-incubator/repos").then((function(e){return e.json()})).then((function(e){v(e)}))}),[]),g.message)return g.message;console.log({data:g});var E,p,b=g.map((function(e){return{id:e.name,value:e.stargazers_count}})),y=(E=18,p=Object(l.a)(b).sort((function(e,t){return e.value-t.value})).reverse(),p.slice(0,E)).reverse();return r.a.createElement("div",{ref:i},r.a.createElement("h1",{style:{marginLeft:60,fontWeight:400,color:"#334"}},"Repos popularity"),r.a.createElement(c.a,{width:d.width,height:e-130,layout:"horizontal",margin:{top:26,right:120,bottom:26,left:60},data:y,indexBy:"id",keys:["value"],colors:{scheme:"spectral"},colorBy:"indexValue",borderColor:{from:"color",modifiers:[["darker",2.6]]},enableGridX:!0,axisTop:{format:"~s"},axisBottom:{format:"~s"},axisLeft:null,padding:.3,labelTextColor:{from:"color",modifiers:[["darker",1.4]]},isInteractive:!1,barComponent:m,motionStiffness:170,motionDamping:26}))},h=n(48),f=n(195),g=n(196),v=n(197),E=n(199),p=function(e){Object(E.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={hasError:!1},a}return Object(g.a)(n,[{key:"componentDidCatch",value:function(e,t){}},{key:"render",value:function(){return this.state.hasError?r.a.createElement("h1",null,"Something went wrong."):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),n}(r.a.Component),b={WatchEvent:function(e){var t=e.event;return r.a.createElement(w,{event:t,Icon:h.d})},PushEvent:function(e){var t=e.event;return r.a.createElement(w,{event:t,Icon:h.b},r.a.createElement("ul",{style:{listStyle:"none",padding:0,margin:0}},t.payload.commits.map((function(e){return r.a.createElement("li",{style:{marginLeft:20,fontSize:10,padding:10}},r.a.createElement(h.a,{style:{verticalAlign:"middle",width:12}}),r.a.createElement("b",null," ",e.author.name," "),r.a.createElement("i",null,e.message))}))))},CreateEvent:function(e){var t=e.event;return r.a.createElement(j,{event:t,message:"was created!"})},PublicEvent:function(e){var t=e.event;return r.a.createElement(j,{event:t,message:"is now public!"})}};function y(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],i=t[1];return Object(a.useEffect)((function(){fetch("https://api.github.com/orgs/klarna-incubator/events?time=".concat(new Date)).then((function(e){return e.json()})).then((function(e){i(e)}))}),[]),n.message?n.message:r.a.createElement("div",null,r.a.createElement("h1",{style:{fontWeight:400,color:"#334"}},"Activity"),n.map((function(e){if("CreateEvent"===e.type&&"repository"!==e.payload.ref_type)return null;var t=b[e.type];return t?r.a.createElement("div",{style:{padding:10,border:"1px solid #eeeef3",marginBottom:10}},r.a.createElement(p,null,r.a.createElement(t,{event:e}))):null})))}function w(e){var t=e.event,n=e.children,a=e.Icon;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{fontSize:10,color:"#667",float:"right",lineHeight:1}},t.actor.login,r.a.createElement("img",{src:t.actor.avatar_url,style:{width:16,borderRadius:4,verticalAlign:"middle",marginLeft:5}})),r.a.createElement("div",{style:{fontSize:10,color:"#667",paddingBottom:5}},t.created_at),r.a.createElement("div",null,r.a.createElement(a,null)," ",t.repo.name.replace("klarna-incubator/","")),n)}function j(e){var t=e.event,n=e.message;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{fontSize:10,color:"#667",paddingBottom:5}},t.created_at),r.a.createElement("div",null,r.a.createElement(h.c,null)," ",t.repo.name.replace("klarna-incubator/","")," ",n))}var O=function(){return r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",height:"100%",fontFamily:"Menlo, Consolas, monospace"}},r.a.createElement(p,null,r.a.createElement(d,null)),r.a.createElement(p,null,r.a.createElement(y,null)))};Object(i.render)(r.a.createElement(r.a.StrictMode,null,r.a.createElement(O,null)),document.getElementById("root"))}},[[233,1,2]]]);
//# sourceMappingURL=main.a4b73053.chunk.js.map