(this.webpackJsonpspinner=this.webpackJsonpspinner||[]).push([[0],{13:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),i=n(3),s=n.n(i),o=n(4),c=n(5),h=n(7),u=n(6),l=n(0),d=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"],f=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).state={spinCount:1,view:{h:0,w:0},center:{y:0,x:0},data:[]},r}return Object(c.a)(n,[{key:"componentDidCatch",value:function(t,e){console.log("Error",t,e)}},{key:"setSize",value:function(){var t=window.innerHeight,e=window.innerWidth;this.setState({view:{h:t,w:e},center:{y:t/2,x:25}})}},{key:"componentDidMount",value:function(){var t=this;this.setSize();fetch("spinners/key_n_positions.json",{method:"GET"}).then((function(t){return t.json()})).then((function(e){try{console.log("Loaded",e),t.setState({data:e})}catch(n){console.log("Error",n)}})).catch((function(t){console.log("Error",t)}))}},{key:"cacluatePointOnCircle",value:function(t,e){var n=t*(Math.PI/180);return{x:Math.cos(n)*e,y:Math.sin(n)*e}}},{key:"createLinesAlongCurve",value:function(t,e,n){for(var r=this.state.center,a="M "+r.x+" "+r.y+" \n",i=t;i<e+5;i+=5){var s=Math.min(i,e),o=this.cacluatePointOnCircle(s,n);a+=" L "+(r.x+o.x)+" "+(r.y+o.y)+" \n"}return a+" z"}},{key:"getColor",value:function(t,e){return d.length==e-1?d[t%(d.length-1)]:d[t%d.length]}},{key:"renderSlice",value:function(t,e,n,r,a){var i=this.state.view.w-2*this.state.center.x,s=i-i/n*e,o="r"+e+"s"+r,c=360/a,h=c/2;return Object(l.jsxs)("g",{transform:"rotate("+c*r+" "+this.state.center.x+" "+this.state.center.y+")",children:[Object(l.jsx)("path",{d:this.createLinesAlongCurve(-h,h,s),fill:this.getColor(r,a),stroke:"#000",strokeWidth:1},"p"+o),Object(l.jsx)("text",{x:s,y:this.state.center.y,textAnchor:"end",fontSize:"1.15em",children:t},"t"+o)]},"g"+o)}},{key:"addRule",value:function(t){var e=document.getElementById(t);e&&document.head.removeChild(e),(e=document.createElement("style")).setAttribute("id",t),document.head.appendChild(e);for(var n=e.sheet,r=arguments.length,a=new Array(r>1?r-1:0),i=1;i<r;i++)a[i-1]=arguments[i];Object.values(a).forEach((function(t,e){n.insertRule(t,e),console.log(t)})),console.log(n)}},{key:"renderSpinner",value:function(t,e,n){var r=this,a=e%2==0?1:-1,i=Math.round(720+360*Math.random()),s=" "+this.state.center.x+" "+this.state.center.y,o=" "+Math.round(this.state.center.x)+"px "+Math.round(this.state.center.y)+"px",c=Math.round(360/t.length),h=c-i%c,u="cssRule"+e+"_"+this.state.spinCount;return this.addRule(u," @keyframes ".concat(u," {\n                0% {\n                    transform:rotate(0deg);\n                    transform-origin: ").concat(o,";\n                } \n                100% {\n                    transform:rotate(").concat((i+h)*a,"deg);\n                    transform-origin: ").concat(o,";\n                }\n            }")," .".concat(u," { \n                background: red;\n                animation-name: ").concat(u,";\n                animation-duration: 4s;\n            }")),Object(l.jsx)("g",{className:u,children:Object(l.jsx)("g",{transform:"rotate("+(i+h)*a+" "+s+")",children:t.map((function(a,i){return r.renderSlice(a,e,n,i,t.length)}))},"ring"+e+"_"+this.state.spinCount)},"g"+e+"_"+this.state.spinCount)}},{key:"renderSpinners",value:function(){var t=this;return this.state.data.map((function(e,n){return t.renderSpinner(e,n,t.state.data.length)}))}},{key:"refresh",value:function(){this.setSize();var t=this.state.spinCount+1;this.setState({spinCount:t})}},{key:"render",value:function(){var t=this;return Object(l.jsx)("div",{children:Object(l.jsx)("svg",{width:this.state.view.w,height:this.state.view.h,onMouseUp:function(e){return t.refresh()},children:this.renderSpinners()},"s"+this.state.spinCount)})}}]),n}(a.a.Component),v=f;s.a.render(Object(l.jsx)(a.a.Fragment,{children:Object(l.jsx)(v,{})}),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.596ed8a3.chunk.js.map