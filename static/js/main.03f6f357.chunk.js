(this.webpackJsonpspinner=this.webpackJsonpspinner||[]).push([[0],{13:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),i=n(3),s=n.n(i),o=n(4),c=n(5),h=n(7),u=n(6),l=n(0),d=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"],f=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).state={spinCount:1,view:{h:0,w:0},center:{y:0,x:0},data:[]},r}return Object(c.a)(n,[{key:"componentDidCatch",value:function(t,e){console.log("Error",t,e)}},{key:"setSize",value:function(){var t=window.innerHeight,e=window.innerWidth;this.setState({view:{h:t,w:e},center:{y:t/2,x:25}})}},{key:"componentDidMount",value:function(){var t=this;this.setSize();fetch("https://raw.githubusercontent.com/kaloisi/spinner/main/spinners/key_n_positions.json",{method:"GET"}).then((function(t){return t.json()})).then((function(e){try{console.log("Loaded",e),t.setState({data:e})}catch(n){console.log("Error",n)}})).catch((function(t){console.log("Error",t)}))}},{key:"cacluatePointOnCircle",value:function(t,e){var n=t*(Math.PI/180);return{x:Math.cos(n)*e,y:Math.sin(n)*e}}},{key:"createLinesAlongCurve",value:function(t,e,n){for(var r=this.state.center,a="M "+r.x+" "+r.y+" \n",i=t;i<e+5;i+=5){var s=Math.min(i,e),o=this.cacluatePointOnCircle(s,n);a+=" L "+(r.x+o.x)+" "+(r.y+o.y)+" \n"}return a+" z"}},{key:"getColor",value:function(t,e){return d.length==e-1?d[t%(d.length-1)]:d[t%d.length]}},{key:"renderSlice",value:function(t,e,n,r,a){var i=this.state.view.w-2*this.state.center.x,s=i-i/n*e,o="r"+e+"s"+r,c=360/a,h=c/2;return Object(l.jsxs)("g",{transform:"rotate("+c*r+" "+this.state.center.x+" "+this.state.center.y+")",children:[Object(l.jsx)("path",{d:this.createLinesAlongCurve(-h,h,s),fill:this.getColor(r,a),stroke:"#000",strokeWidth:1},"p"+o),Object(l.jsx)("text",{x:s-25,y:this.state.center.y,fontSize:"1.15em",children:t},"t"+o)]},"g"+o)}},{key:"renderSpinner",value:function(t,e,n){var r=this,a=e%2==0?1:-1,i=Math.round(720+360*Math.random()),s=" "+this.state.center.x+" "+this.state.center.y,o=Math.round(360/t.length),c=o-i%o,h="0 ".concat(s,";");return h+="".concat(i/2*a," ").concat(s,";"),h+="".concat(i*a," ").concat(s,";"),h+="".concat((i+c)*a," ").concat(s,";"),Object(l.jsxs)("g",{transform:"rotate("+(i+c)*a+" "+s+")",children:[t.map((function(a,i){return r.renderSlice(a,e,n,i,t.length)})),Object(l.jsx)("animateTransform",{id:"animate"+e+"_"+this.state.spinCount,attributeType:"xml",attributeName:"transform",type:"rotate",dur:"1s",repeatCount:"1",keyTimes:"0; 0.4; 0.8 ;1",values:h},this.state.spinCount)]},"ring"+e+"_"+this.state.spinCount)}},{key:"renderSpinners",value:function(){var t=this;return this.state.data.map((function(e,n){return t.renderSpinner(e,n,t.state.data.length)}))}},{key:"refresh",value:function(){this.setSize();var t=this.state.spinCount+1;this.setState({spinCount:t})}},{key:"render",value:function(){var t=this;return Object(l.jsx)("div",{children:Object(l.jsx)("svg",{width:this.state.view.w,height:this.state.view.h,onMouseUp:function(e){return t.refresh()},children:this.renderSpinners()},"s"+this.state.spinCount)})}}]),n}(a.a.Component);s.a.render(Object(l.jsx)(a.a.Fragment,{children:Object(l.jsx)(f,{})}),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.03f6f357.chunk.js.map