(this["webpackJsonpcoronavirus-spread"]=this["webpackJsonpcoronavirus-spread"]||[]).push([[0],{188:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),o=a.n(c),l=a(13),i=a(77),u=a.n(i),s=a(37),d=a(78),m=a(6),f=a.n(m);function b(e){var t=e.labels,a=e.dataPerCountry,n=e.country,c=e.days,o=e.color,l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i={backgroundColor:o+"AA",borderColor:o,pointBorderColor:o,pointHoverBackgroundColor:o,pointHoverBorderColor:o+"33",pointBackgroundColor:"#fff",fill:!1,lineTension:.1,borderCapStyle:"butt",borderDashOffset:0,borderJoinStyle:"miter",pointBorderWidth:1,pointHoverRadius:10,pointHoverBorderWidth:2,pointHitRadius:10},u=Object(s.a)({},i,{borderDash:[],pointRadius:3}),m=Object(s.a)({},i,{borderDash:[5,5],pointRadius:5});function b(e){return new Date(e).getDate()+" "+l[new Date(e).getMonth()]+", "+new Date(e).getFullYear()}function p(){var e=function(e){var t=f.a.slice(a,a.length-e-1).filter((function(e){return"0"!==e})).length;return t<e?t-1:e}(3),t=f.a.slice(a,a.length-e-1).map((function(e){return Number(e)})),n=t.map((function(e,a){return 0===a?0:e-t[a-1]})).map((function(e,a){return 1+e/t[a]})),r=f.a.slice(n,n.length-e),o=r.reduce((function(e,t){return e+t}),0)/r.length||0;return f.a.reduce(f.a.range(1,c+1),(function(e,a,n){return e[n]=Math.round(f.a.reduce(f.a.range(0,a),(function(e){return e*o}),1)*(f.a.last(t)||0)),e}),[])}return r.a.createElement(d.a,{data:function(){var e=f.a.slice(p(),0,c),r=function(e){return f.a.reduce(e,(function(e,a,n){var r=new Date(f.a.last(t)||Date.now());return r.setDate(r.getDate()+n+2),e[n]=r.toISOString().slice(0,-14),e}),[])}(e),o=f.a.concat(a.map((function(e){return Number(e)})),e.map((function(){return NaN}))),l=f.a.concat(a.map((function(e,t){return t!==a.length-1?NaN:e})),e),i=f.a.concat(t,r).map(b),d=f.a.findIndex(o,(function(e){return e>0}))-1;return d=d<0?0:d,{labels:i.slice(d),datasets:[Object(s.a)({},u,{label:n,data:o.slice(d)}),Object(s.a)({},m,{label:n+" (predicted)",data:l.slice(d)})]}}(),width:100,height:45,legend:null})}var p=a(221),h=a(229),g=a(226),v=a(227),y=a(190),E=a(223),O=a(224),C=a(218),j=a(228),S=Object(C.a)((function(e){return Object(j.a)({root:{marginLeft:0,margin:e.spacing(2),textAlign:"center"},formControl:{margin:e.spacing(2),minWidth:100},footer:{marginTop:e.spacing(2)},chart:{width:"95%",height:"95%"}})}));var k=function(){var e=S(),t={Confirmed:"#2C98F0",Deaths:"#FC562E",Recovered:"#52AF55"},a={Tomorrow:1,"2 days":2,"3 days":3,"4 days":4,"5 days":5,"1 week":7,"2 weeks":14,"3 weeks":21,"1 month":31},c=Object(n.useState)([]),o=Object(l.a)(c,2),i=o[0],s=o[1],d=Object(n.useState)("Italy"),m=Object(l.a)(d,2),C=m[0],j=m[1],k=Object(n.useState)("Confirmed"),D=Object(l.a)(k,2),w=D[0],N=D[1],_=Object(n.useState)([]),I=Object(l.a)(_,2),R=I[0],F=I[1],W=Object(n.useState)(1),B=Object(l.a)(W,2),P=B[0],A=B[1],J=Object(n.useState)([]),H=Object(l.a)(J,2),x=H[0],M=H[1],T=r.a.useRef(null),G=r.a.useState(0),L=Object(l.a)(G,2),V=L[0],Y=L[1],q=r.a.useRef(null),z=r.a.useState(0),K=Object(l.a)(z,2),Q=K[0],U=K[1],X=r.a.useRef(null),Z=r.a.useState(0),$=Object(l.a)(Z,2),ee=$[0],te=$[1];r.a.useEffect((function(){Y(T.current.offsetWidth),U(q.current.offsetWidth),te(X.current.offsetWidth)}),[]);var ae=function(e){j(e.target.value)},ne=function(e){A(e.target.value)},re=function(e){N(e.target.value)};Object(n.useEffect)((function(){u.a.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-"+w+".csv",{skipEmptyLines:!0,header:!0,download:!0,delimiter:",",complete:function(e){!function(e){var t=e.data,a=f.a.slice(f.a.keys(t[0]),4),n=t.map((function(e){return e["Province/State"].length>0?"".concat(e["Country/Region"],"/").concat(e["Province/State"]):e["Country/Region"]}));F(n),s(a),M(t)}(e)}})}),[w]);var ce=f.a.sortBy(R);return r.a.createElement(O.a,{container:!0,direction:"column",justify:"center",alignItems:"center",className:e.root},r.a.createElement(O.a,{item:!0},r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{variant:"outlined",className:e.formControl},r.a.createElement(h.a,{ref:X,id:"select-type-input-id"},"Type"),r.a.createElement(g.a,{labelId:"select-type-select-label",id:"select-type-select-id",value:w,onChange:re,labelWidth:ee},f.a.map(f.a.keys(t),(function(e,t){return r.a.createElement(v.a,{key:t,value:e},e)}))))),r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{variant:"outlined",className:e.formControl},r.a.createElement(h.a,{ref:T,id:"select-country-input-id"},"Location"),r.a.createElement(g.a,{labelId:"select-country-select-label",id:"select-country-select-id",value:C,onChange:ae,labelWidth:V},ce.map((function(e,t){return r.a.createElement(v.a,{key:t,value:e},e)}))))),r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{variant:"outlined",className:e.formControl},r.a.createElement(h.a,{ref:q,id:"select-days-input-id"},"Prediction"),r.a.createElement(g.a,{labelId:"select-days-select-label",id:"select-days-select-id",value:P,onChange:ne,labelWidth:Q},f.a.map(a,(function(e,t){return r.a.createElement(v.a,{key:e,value:e},t)})))))),r.a.createElement(O.a,{item:!0,className:e.chart},function(){var e,a=t[w];return x.length?r.a.createElement(b,{labels:i,dataPerCountry:(e=C,f.a.slice(f.a.values(f.a.find(x,(function(t){var a=-1!==f.a.indexOf(e,"/"),n=a?f.a.split(e,"/")[0]:e,r=a?f.a.split(e,"/")[1]:"";return t["Country/Region"]===n&&t["Province/State"]===r}))),4)),country:C,days:P,color:a}):""}()),r.a.createElement(O.a,{item:!0,className:e.footer},r.a.createElement(y.a,{variant:"caption"},r.a.createElement(E.a,{target:"_blank",href:"https://github.com/CSSEGISandData/COVID-19"},"Data source")," | ",r.a.createElement(E.a,{target:"_blank",href:"https://t.me/coronavirus_spread"},"Feedback")," | ",r.a.createElement(E.a,{target:"_blank",href:"https://github.com/ValeryP/coronavirus-spread"},"Github"))))},D=a(84),w=a(225),N=Object(D.a)();o.a.render(r.a.createElement(w.a,{theme:N},r.a.createElement(k,null)),document.getElementById("root"))},88:function(e,t,a){e.exports=a(188)}},[[88,1,2]]]);
//# sourceMappingURL=main.9699be4e.chunk.js.map