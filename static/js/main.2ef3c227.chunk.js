(this["webpackJsonpcoronavirus-spread"]=this["webpackJsonpcoronavirus-spread"]||[]).push([[0],{172:function(e,t,a){e.exports=a(339)},294:function(e,t){},339:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),i=a.n(o),c=a(32),l=a(158),s=a(11),u=a(87),m=a(142),d=a.n(m),p=a(143);function f(e){var t=e.labelsPlot,a=e.dataExistingPlot,n=e.dataPredictedPlot,o=e.country,i=e.color,l={backgroundColor:i+"AA",borderColor:i,pointBorderColor:i,pointHoverBackgroundColor:i,pointHoverBorderColor:i+"33",pointBackgroundColor:"#fff",fill:!1,lineTension:.1,borderCapStyle:"butt",borderDashOffset:0,borderJoinStyle:"miter",pointBorderWidth:1,pointHoverRadius:10,pointHoverBorderWidth:2,pointHitRadius:10},s=Object(c.a)({},l,{borderDash:[],pointRadius:3}),u=Object(c.a)({},l,{borderDash:[5,2],pointRadius:2,backgroundColor:"#000AA",borderColor:"#2196f3",pointHoverRadius:5,pointBorderColor:"#2196f3",pointHoverBackgroundColor:"#2196f3",pointHoverBorderColor:"#00033"});return r.a.createElement(p.a,{data:{labels:t,datasets:[Object(c.a)({},s,{label:o,data:a}),Object(c.a)({},u,{label:o+" (predicted)",data:n})]},width:100,height:40,legend:null})}var g=a(381),h=a(407),b=a(401),v=a(409),E=a(385),y=a(345),O=a(386),j=a(387),w=a(379),C=a(406),S=a(6),x=a.n(S),N=a(20),k=a(26),D=a.n(k),T=a(404),P=a(153),F=a.n(P),B=a(104),R=a.n(B),I=new(0,a(340).Octokit),L=Object(w.a)((function(e){return Object(C.a)({root:{marginLeft:0,margin:e.spacing(2),textAlign:"center"},formControl:{margin:e.spacing(2),minWidth:100},footer:{opacity:.5},latestUpdate:{opacity:.5},chart:{width:"90%"},infoIcon:{color:e.palette.grey.A200,height:e.spacing(2),width:e.spacing(2),paddingTop:e.spacing(1),marginLeft:e.spacing(1)/4}})}));var W=function(){var e=L(),t={Confirmed:"#f57c00",Deaths:"#FC562E",Recovered:"#388e3c"},a={Tomorrow:1,"2 days":2,"3 days":3,"1 week":7},o=Object(T.a)(["saved-prefs"]),i=Object(s.a)(o,2),c=i[0],l=i[1],u=Object(n.useState)([]),m=Object(s.a)(u,2),p=m[0],w=m[1],C=Object(n.useState)(c.country||"Worldwide"),S=Object(s.a)(C,2),k=S[0],P=S[1],B=Object(n.useState)(c.type||"Confirmed"),W=Object(s.a)(B,2),A=W[0],H=W[1],_=Object(n.useState)([]),U=Object(s.a)(_,2),G=U[0],z=U[1],J=Object(n.useState)(c.prediction||1),M=Object(s.a)(J,2),V=M[0],K=M[1],Y=Object(n.useState)([]),q=Object(s.a)(Y,2),Q=q[0],X=q[1],Z=Object(n.useState)(""),$=Object(s.a)(Z,2),ee=$[0],te=$[1],ae=r.a.useRef(null),ne=r.a.useState(0),re=Object(s.a)(ne,2),oe=re[0],ie=re[1],ce=r.a.useRef(null),le=r.a.useState(0),se=Object(s.a)(le,2),ue=se[0],me=se[1],de=r.a.useRef(null),pe=r.a.useState(0),fe=Object(s.a)(pe,2),ge=fe[0],he=fe[1];r.a.useEffect((function(){ie(ae.current.offsetWidth),me(ce.current.offsetWidth),he(de.current.offsetWidth)}),[]);var be=function(e){var t=e.target.value;N.a.event({category:"Select",action:"Country",label:t}),l("country",t,{path:"/"}),P(t)},ve=function(e){var t=e.target.value;N.a.event({category:"Select",action:"Range",label:x.a.findKey(t)}),l("prediction",t,{path:"/"}),K(t)},Ee=function(e){var t=e.target.value;N.a.event({category:"Select",action:"Type",label:t}),l("type",t,{path:"/"}),H(t)};return Object(n.useEffect)((function(){d.a.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-"+A+".csv",{skipEmptyLines:!0,header:!0,download:!0,delimiter:",",complete:function(e){var t=e.data,a=x.a.map(x.a.slice(x.a.keys(t[0]),4),(function(e){return D()(e).add(1,"days").toDate()})),n=x.a.concat(["Worldwide"],x.a.sortBy(t.map((function(e){return e["Province/State"].length>0?"".concat(e["Country/Region"],"/").concat(e["Province/State"]):e["Country/Region"]}))));z(n),w(a),X(t)}})}),[A]),Object(n.useEffect)((function(){I.repos.listCommits({owner:"CSSEGISandData",repo:"COVID-19"}).then((function(e){var t=x.a.values(e.data)[0].commit.committer.date;te(D()(t).fromNow())}))}),[]),r.a.createElement(E.a,{container:!0,direction:"column",justify:"center",alignItems:"center",className:e.root},r.a.createElement(E.a,{item:!0},r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{variant:"outlined",className:e.formControl},r.a.createElement(h.a,{ref:de,id:"select-type-input-id"},"Type"),r.a.createElement(b.a,{labelId:"select-type-select-country",id:"select-type-select-id",value:A,onChange:Ee,labelWidth:ge},x.a.map(x.a.keys(t),(function(e,t){return r.a.createElement(v.a,{key:t,value:e},e)}))))),r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{variant:"outlined",className:e.formControl},r.a.createElement(h.a,{ref:ae,id:"select-country-input-id"},"Location"),r.a.createElement(b.a,{labelId:"select-country-select-country",id:"select-country-select-id",value:k,onChange:be,labelWidth:oe},G.map((function(e,t){return r.a.createElement(v.a,{key:t,value:e},e)}))))),r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{variant:"outlined",className:e.formControl},r.a.createElement(h.a,{ref:ce,id:"select-days-input-id"},"Prediction"),r.a.createElement(b.a,{labelId:"select-days-select-country",id:"select-days-select-id",value:V,onChange:ve,labelWidth:ue},x.a.map(a,(function(e,t){return r.a.createElement(v.a,{key:e,value:e},t)})))))),r.a.createElement(E.a,{item:!0,container:!0,direction:"column",className:e.chart},function(){function a(e,t){var a=x.a.indexOf(x.a.keys(e),D()(t).format("l")),n=x.a.slice(x.a.values(e),a-5,a+1),r=x.a.reduce(n,(function(e,t,a){var r=n[a-1];return a>0&&r>0&&!isNaN(t)&&!isNaN(r)&&(e[a-1]=t/r),e}),[]),o=x.a.filter(r,(function(e){return!x.a.isNaN(e)})),i=x.a.mean(o)||1;return x.a.reduce(x.a.range(1,2),(function(e,t,a){return e[a]=Math.round(x.a.reduce(x.a.range(0,t),(function(e){return e*i}),1)*(x.a.last(n)||0)),e}),[])[0]}function n(e,t){return x.a.zipObject(e.map((function(e){return D()(e).format("l")})),t)}function o(e,t,r){for(var o,i=n(e,x.a.concat([0],x.a.take(x.a.map(e,(function(e){return a(t,e)})),x.a.values(t).length))),c=1;c<r;c++){var l=a(i,e[x.a.findIndex(x.a.values(i),(function(e){return void 0===e}))-1]);i=n(e,x.a.concat((o=x.a.values(i),x.a.filter(o,(function(e){return void 0!==e}))),[l]))}return x.a.values(i)}var i=x.a.concat(p,function(e,t){return x.a.reduce(x.a.range(1,+t+1),(function(t,a,n){return t[n]=D()(e||Date.now()).add(n+1,"days").toDate(),t}),[])}(x.a.last(p),V)),c=function(e){if("Worldwide"===e){var t=x.a.map(Q,(function(e){return x.a.slice(x.a.values(e),4)}));return x.a.filter(x.a.reduce(t,(function(e,a,n){return e[n]=String(x.a.sum(x.a.map(t,(function(e){return Number(e[n])})))),e}),[]),(function(e){return Number(e)>0}))}return x.a.slice(x.a.values(x.a.find(Q,(function(t){var a=-1!==x.a.indexOf(e,"/"),n=a?x.a.split(e,"/")[0]:e,r=a?x.a.split(e,"/")[1]:"";return t["Country/Region"]===n&&t["Province/State"]===r}))),4)}(k).map(Number),l=n(p,c),s=o(i,l,V),u=x.a.findIndex(x.a.values(l),(function(e){return e>0}))-1;u=u<0?0:u;var m=x.a.values(l).slice(u),d=x.a.values(s).slice(u),g=i.slice(u).map((function(e){return D()(e).format("ll")})),h=function(e,t,a){var n=x.a.zipWith(e,t,(function(e,t){if(e===t)return 0;if(0===e||0===t)return 100*(e+t);var a=x.a.max([e,t]),n=x.a.min([e,t]);return 100*Math.abs(1-a/n)})),r=n.length-a-7<0?0:n.length-a-7,o=x.a.slice(n,r,r+7).filter((function(e){return!isNaN(e)})),i=x.a.round(100-x.a.mean(o),1);return i<=0?1:i>=100?99:i}(m,d,V);h<60&&(d=d.map((function(e){return NaN})));var b=x.a.findLast(o(i,l,1),(function(e){return void 0!==e})),v=t[A];return Q.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{item:!0},r.a.createElement(E.a,{item:!0,container:!0,direction:"row",justify:"center",alignItems:"center"},h>60?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{item:!0},r.a.createElement(y.a,{variant:"caption"},R()("There is <strong>".concat(h,"%</strong> chance to have <strong>").concat(b,"</strong> ").concat(x.a.lowerCase(A)," tomorrow (").concat(k,")")))),r.a.createElement(E.a,{item:!0},r.a.createElement(O.a,{title:"The accuracy calculation is based on a comparison of the last 7 days prediction and actual values of those days",arrow:!0,TransitionComponent:j.a},r.a.createElement(F.a,{className:e.infoIcon})))):r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{variant:"caption"},R()("".concat(k," does not have enough <strong>").concat(x.a.lowerCase(A),"</strong> cases for reliable prediction")))))),r.a.createElement(E.a,{item:!0},r.a.createElement(f,{labelsPlot:g,dataExistingPlot:m,dataPredictedPlot:d,country:k,color:v}))):""}()),r.a.createElement(E.a,{item:!0,className:e.footer},r.a.createElement(y.a,{variant:"caption"},r.a.createElement(N.a.OutboundLink,{eventLabel:"Data source",target:"_blank",to:"https://github.com/CSSEGISandData/COVID-19"},"Data source")," \u2022 ",r.a.createElement(N.a.OutboundLink,{eventLabel:"Github",target:"_blank",to:"https://github.com/ValeryP/coronavirus-spread"},"Github"))),ee&&r.a.createElement(E.a,{item:!0,className:e.latestUpdate},r.a.createElement(y.a,{variant:"caption"},"Latest update ".concat(ee))))},A=a(400),H=a(389),_=a(390),U=a(402),G=a(392);var z=function(){return Object(n.useEffect)((function(){return window.scrollTo(0,document.body.scrollHeight),function(){window.scrollTo(0,0)}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{background:"#000000"}},r.a.createElement("iframe",{title:"Dashboard",src:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",style:{width:"100%",height:"100vh",border:0}})))},J=Object(w.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)}})}));var M=function(){var e=J();return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{container:!0,justify:"space-evenly",className:e.root},r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"DailyNewDeaths1",src:"https://ourworldindata.org/grapher/daily-deaths-covid-19",style:{width:"100%",height:600,border:0}})),r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"DailyNewDeaths2",src:"https://ourworldindata.org/grapher/total-deaths-covid-19",style:{width:"100%",height:600,border:0}}))))},V=Object(w.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)}})}));var K=function(){var e=V();return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{container:!0,justify:"space-evenly",className:e.root},r.a.createElement(E.a,{item:!0,xs:5},r.a.createElement("iframe",{title:"DeathsPerMillion1",src:"https://ourworldindata.org/grapher/total-covid-deaths-per-million",style:{width:"100%",height:600,border:0}})),r.a.createElement(E.a,{item:!0,xs:7},r.a.createElement("iframe",{title:"DeathsPerMillion2",src:"https://ourworldindata.org/grapher/new-covid-deaths-per-million",style:{width:"100%",height:600,border:0}}))))},Y=Object(w.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)},rootBottom:{marginTop:e.spacing(1),marginBottom:e.spacing(12)}})}));var q=function(){var e=Y();return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{container:!0,direction:"column",className:e.root},r.a.createElement(E.a,{container:!0,item:!0,justify:"space-evenly",className:e.root},r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry1",src:"https://ourworldindata.org/grapher/tests-vs-confirmed-cases-covid-19",style:{width:"100%",height:600,border:0}})),r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry2",src:"https://ourworldindata.org/grapher/covid-19-tests-country",style:{width:"100%",height:600,border:0}}))),r.a.createElement(E.a,{container:!0,item:!0,justify:"space-evenly",className:e.rootBottom},r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry3",src:"https://ourworldindata.org/grapher/tests-vs-confirmed-cases-covid-19-per-million",style:{width:"100%",height:600,border:0}})),r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry4",src:"https://ourworldindata.org/grapher/covid19-tests-per-million-people",style:{width:"100%",height:600,border:0}})))))},Q=Object(w.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)},rootBottom:{marginTop:e.spacing(1),marginBottom:e.spacing(12)}})}));var X=function(){var e=Q();return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{container:!0,direction:"column",className:e.root},r.a.createElement(E.a,{container:!0,item:!0,justify:"space-evenly",className:e.root},r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry1",src:"https://ourworldindata.org/grapher/total-cases-covid-19",style:{width:"100%",height:600,border:0}})),r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry2",src:"https://ourworldindata.org/grapher/daily-cases-covid-19",style:{width:"100%",height:600,border:0}}))),r.a.createElement(E.a,{container:!0,item:!0,justify:"space-evenly",className:e.rootBottom},r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry3",src:"https://ourworldindata.org/grapher/total-confirmed-cases-of-covid-19-per-million-people",style:{width:"100%",height:600,border:0}})),r.a.createElement(E.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry4",src:"https://ourworldindata.org/grapher/new-covid-cases-per-million?year=59",style:{width:"100%",height:600,border:0}})))))},Z=Object(w.a)((function(e){return Object(C.a)({root:{margin:e.spacing(1)}})}));var $=function(){var e=Z();return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{container:!0,className:e.root},r.a.createElement("iframe",{title:"SpeedOfGrowth",src:"https://ourworldindata.org/grapher/covid-confirmed-cases-since-100th-case",style:{width:"99%",height:600,border:0}})))},ee=a(388),te=Object(w.a)((function(e){return Object(C.a)({root:{paddingLeft:200,paddingRight:200},img:{margin:e.spacing(2),marginTop:e.spacing(4),width:"100%"}})}));var ae=function(){var e=te();return r.a.createElement(r.a.Fragment,null,r.a.createElement(ee.a,{className:e.root},r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Coronavirus-Symptoms-%E2%80%93-WHO-joint-mission-2-1536x823.png"}),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Severity-of-coronavirus-cases-in-China-1-1536x1322.png"}),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Coronavirus-CFR-by-age-in-China-1.png"}),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Coronavirus-CFR-by-health-condition-in-China.png"}),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Covid-19-CFR-by-age-vs.-US-Seasonal-Flu-3.png"})))};var ne=function(){var e=Te(),t=Object(T.a)(["saved-prefs"]),a=Object(s.a)(t,2),n=a[0],o=a[1],i=r.a.useState(Number(n["tab-analysis"])||0),c=Object(s.a)(i,2),l=c[0],u=c[1];function m(t,a,n){return r.a.createElement(H.a,Object.assign({onClick:function(){return function(e,t){N.a.event({category:"Click",action:"Tab",label:e}),o("tab-analysis",t,{path:"/"})}(t,a)},label:t,className:a===n?e.tabSelected:e.tabDefault},{id:"simple-tab-".concat(a),"aria-controls":"simple-tabpanel-".concat(a)}))}return r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a,{position:"sticky"},r.a.createElement(U.a,{value:l,onChange:function(e,t){u(t)},variant:"scrollable",scrollButtons:"auto"},x.a.map(["Daily new deaths","Deaths per million","Tests by country","Daily new confirmed","Speed of growth","Symptoms and fatality"],(function(e,t){return m(e,t,l)})))),r.a.createElement(De,{value:l,index:0},r.a.createElement(M,null)),r.a.createElement(De,{value:l,index:1},r.a.createElement(K,null)),r.a.createElement(De,{value:l,index:2},r.a.createElement(q,null)),r.a.createElement(De,{value:l,index:3},r.a.createElement(X,null)),r.a.createElement(De,{value:l,index:4},r.a.createElement($,null)),r.a.createElement(De,{value:l,index:5},r.a.createElement(ae,null)))},re=a(156),oe=a.n(re),ie=a(5),ce=a(398),le=a(411),se=a(391),ue=a(393),me=a(394),de=a(155),pe=a.n(de),fe=a(154),ge=a.n(fe),he=a(395),be=a(410),ve=a(396),Ee=a(397),ye=a(403),Oe=Object(w.a)((function(e){return Object(C.a)({textSuccess:{color:e.palette.success.dark},textError:{color:e.palette.error.dark},saveButton:{color:e.palette.primary.dark}})})),je=Object(ie.a)((function(e){return Object(C.a)({root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}})}))((function(e){var t=e.children,a=e.classes,n=e.onClose,o=Object(u.a)(e,["children","classes","onClose"]);return r.a.createElement(se.a,Object.assign({disableTypography:!0,className:a.root},o),r.a.createElement(y.a,{variant:"h6"},t),n?r.a.createElement(G.a,{"aria-label":"close",className:a.closeButton,onClick:n},r.a.createElement(pe.a,null)):null)})),we=Object(ie.a)((function(e){return{root:{padding:e.spacing(2)}}}))(ue.a),Ce=Object(ie.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(me.a),Se=r.a.forwardRef((function(e,t){return r.a.createElement(he.a,Object.assign({direction:"up",ref:t},e))})),xe=x.a.map(ge.a.data,(function(e){return{name:e.name,flag:e.emoji}}));function Ne(e){var t=e.isOpen,a=e.handleSave,n=e.handleClose,o=Oe(),i=r.a.useState(),l=Object(s.a)(i,2),u=l[0],m=l[1],d=r.a.useState(),p=Object(s.a)(d,2),f=p[0],g=p[1],h=r.a.useState(),b=Object(s.a)(h,2),v=b[0],O=b[1],w=r.a.useState(),C=Object(s.a)(w,2),S=C[0],N=C[1];function k(){m(void 0),g(void 0),O(void 0),N(void 0)}function D(){n(),k()}function T(e){var t=e.target,a=(t=void 0===t?"":t).value;m(x.a.find(xe,(function(e){return e.name===a})))}return r.a.createElement(le.a,{onClose:D,"aria-labelledby":"customized-dialog-title",open:t,TransitionComponent:Se,fullWidth:!0},r.a.createElement(je,{id:"customized-dialog-title",onClose:D},"Add your website"),r.a.createElement(we,{dividers:!0,style:{minHeight:200}},r.a.createElement(E.a,{container:!0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:200},spacing:2},r.a.createElement(y.a,{variant:"caption",style:{margin:16,textAlign:"center"}},"Each country has its own country website with more detailed data. You can add the URL of your favorite website and it will be saved as a bookmark in the top bar of this page."),r.a.createElement(E.a,{item:!0,xs:!0,container:!0,spacing:1,justify:"center"},u&&r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{item:!0,xs:2,style:{textAlign:"end"}},r.a.createElement(ve.a,{in:u},r.a.createElement(y.a,{variant:"h3"},r.a.createElement("span",{"aria-label":"flag "+u.name,role:"img"},null===u||void 0===u?void 0:u.flag))))),r.a.createElement(E.a,{item:!0},r.a.createElement(ye.a,{id:"country-select",style:{width:300},options:xe,autoHighlight:!0,onSelect:T,getOptionLabel:function(e){return e.name},renderOption:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,e.flag),e.name)},renderInput:function(e){return r.a.createElement(be.a,Object.assign({},e,{label:"Choose your country",variant:"outlined",inputProps:Object(c.a)({},e.inputProps,{autoComplete:"new-password"})}))}}))),u&&r.a.createElement(E.a,{item:!0,style:{width:"100%"}},r.a.createElement(be.a,{fullWidth:!0,variant:"outlined",label:"Insert URL of your website",onChange:function(e){var t=e.target.value;N(!0),O(t),fetch("https://cors-anywhere.herokuapp.com/"+t,{method:"HEAD"}).then((function(e){g(e.ok)}),(function(e){console.error(e)})).then((function(){return setTimeout((function(){return N(!1)}),2e3)}))}})),S&&r.a.createElement(j.a,{in:S,unmountOnExit:!0,style:{transitionDelay:S?"300ms":"0ms"}},r.a.createElement(E.a,{item:!0,spacing:1,container:!0,justify:"center",style:{width:"100%"}},r.a.createElement(E.a,{item:!0,xs:1,style:{textAlign:"end"}},r.a.createElement(Ee.a,{size:20})),r.a.createElement(E.a,{item:!0},r.a.createElement(y.a,{variant:"body1"},"Checking inserted URL...")))),!S&&v&&(f?r.a.createElement(E.a,{item:!0,style:{width:"100%"},container:!0,justify:"center"},r.a.createElement(y.a,{variant:"body1",className:o.textSuccess},r.a.createElement("span",{"aria-label":"happy",role:"img"},"\ud83d\ude0a"),"Great. URL is valid!")):r.a.createElement(E.a,{item:!0,style:{width:"100%"},container:!0,justify:"center"},r.a.createElement(y.a,{variant:"body1",className:o.textError},r.a.createElement("span",{"aria-label":"sad",role:"img"},"\ud83d\ude3f"),"Inserted URL is not valid. Try another one, please."))))),f&&!S&&r.a.createElement(Ce,null,r.a.createElement(ce.a,{onClick:function(){a(v,u),k()},className:o.saveButton,variant:"contained",color:"secondary"},"Save")))}var ke=function(e){var t=e.url;return r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{title:"GenericTab",src:t,style:{width:"100%",height:"100vh",border:0}}))};function De(e){var t=e.children,a=e.value,n=e.index,o=Object(u.a)(e,["children","value","index"]);return r.a.createElement(y.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},o),a===n&&r.a.createElement(A.a,{p:0},t))}var Te=Object(w.a)((function(e){return Object(C.a)({tabDefault:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},tabSelected:{color:e.palette.secondary.main}})}));var Pe=function(){var e=Te(),t=Object(T.a)(["saved-prefs"]),a=Object(s.a)(t,2),o=a[0],i=a[1],u=r.a.useState(Number(o["tab-main"])||0),m=Object(s.a)(u,2),d=m[0],p=m[1],f=r.a.useState(!1),g=Object(s.a)(f,2),h=g[0],b=g[1],v=r.a.useState(o["user-tabs"]||[]),E=Object(s.a)(v,2),y=E[0],O=E[1];console.info("raw",y);var j=function(){b(!1)},w=x.a.map(y,"flag"),C=["Prediction","Dashboard","Analysis"],S=[].concat(C,Object(l.a)(w));function k(t,a,n){var o=a>C.length-1?{fontSize:"1.3rem",minWidth:64}:{};return r.a.createElement(H.a,Object.assign({onClick:function(){return function(e,t){N.a.event({category:"Click",action:"Tab",label:e}),i("tab-main",t,{path:"/"})}(t,a)},label:t,className:a===n?e.tabSelected:e.tabDefault},{id:"simple-tab-".concat(a),"aria-controls":"simple-tabpanel-".concat(a)},{style:Object(c.a)({},o)}))}return Object(n.useEffect)((function(){window.scrollTo(0,0)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a,{position:"sticky"},r.a.createElement(U.a,{value:d,onChange:function(e,t){p(t)},variant:"scrollable",scrollButtons:"auto"},x.a.map(S,(function(e,t){return k(e,t,d)})),r.a.createElement(G.a,{"aria-haspopup":"true",color:"inherit",onClick:function(){b(!0)}},r.a.createElement(oe.a,null)))),r.a.createElement(De,{value:d,index:0},r.a.createElement(W,null)),r.a.createElement(De,{value:d,index:1},r.a.createElement(z,null)),r.a.createElement(De,{value:d,index:2},r.a.createElement(ne,null)),x.a.map(y,(function(e,t){var a=e.url;return r.a.createElement(De,{value:d,index:C.length+t},r.a.createElement(ke,{url:a}))})),r.a.createElement(Ne,{isOpen:h,handleSave:function(e,t){var a={index:y.length,country:t.name,flag:t.flag,url:e,timestamp:D()().unix()},n=x.a.concat(y,[a]);i("user-tabs",JSON.stringify(n),{path:"/"}),O(n),j()},handleClose:j}))},Fe=a(157),Be=a(399);N.a.initialize("UA-160685541-1"),N.a.pageview(window.location.pathname);var Re=Object(Fe.a)({palette:{primary:{main:"#354955"},secondary:{main:"#F7A942"}}});i.a.render(r.a.createElement(Be.a,{theme:Re},r.a.createElement(Pe,null)),document.getElementById("root")),document.body.style.margin="0"}},[[172,1,2]]]);
//# sourceMappingURL=main.2ef3c227.chunk.js.map