(this["webpackJsonpcoronavirus-spread"]=this["webpackJsonpcoronavirus-spread"]||[]).push([[0],{181:function(e,t,a){e.exports=a(360)},303:function(e,t){},360:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),o=a.n(i),l=a(93),c=a(15),s=a(13),u=a(94),m=a(151),d=a.n(m),p=a(152);function g(e){var t=e.labelsPlot,a=e.dataExistingPlot,n=e.dataPredictedPlot,i=e.country,o=e.color,l={backgroundColor:o+"AA",borderColor:o,pointBorderColor:o,pointHoverBackgroundColor:o,pointHoverBorderColor:o+"33",pointBackgroundColor:"#fff",fill:!1,lineTension:.1,borderCapStyle:"butt",borderDashOffset:0,borderJoinStyle:"miter",pointBorderWidth:1,pointHoverRadius:10,pointHoverBorderWidth:2,pointHitRadius:10},s=Object(c.a)({},l,{borderDash:[],pointRadius:3}),u=Object(c.a)({},l,{borderDash:[5,2],pointRadius:2,backgroundColor:"#000AA",borderColor:"#2196f3",pointHoverRadius:5,pointBorderColor:"#2196f3",pointHoverBackgroundColor:"#2196f3",pointHoverBorderColor:"#00033"});return r.a.createElement(p.a,{data:{labels:t,datasets:[Object(c.a)({},s,{label:i,data:a}),Object(c.a)({},u,{label:i+" (predicted)",data:n})]},width:100,height:40,legend:null})}var h=a(402),f=a(428),b=a(423),E=a(430),v=a(406),y=a(366),w=a(407),O=a(408),j=a(400),C=a(427),N=a(6),S=a.n(N),x=a(23),k=a(31),D=a.n(k),T=a(161),I=a.n(T),P=a(111),R=a.n(P),A=a(16),F=a.n(A);function B(){function e(e){for(var t=e+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var r=a[n];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null}return e("tab-main")&&!F.a.get("is-mimgrated")&&_({isMigrated:!0,tabMain:Number(e("tab-main")||0),userTabs:JSON.parse(decodeURIComponent(e("user-tabs")||"[]")),tabAnalysis:Number(e("tab-analysis")||0),country:e("country")||"Worldwide",prediction:Number(e("prediction")||1),type:e("type")||"Confirmed",watchedOnboardings:[]}),{isMigrated:F.a.get("is-mimgrated",!1),tabMain:F.a.get("tab-main",0),userTabs:JSON.parse(F.a.get("user-tabs","[]")),tabAnalysis:F.a.get("tab-analysis",0),country:F.a.get("country","Worldwide"),prediction:F.a.get("prediction",1),type:F.a.get("type","Confirmed"),watchedOnboardings:F.a.get("watched-onboardings",[])}}function _(e){F.a.set("is-mimgrated",e.isMigrated),F.a.set("tab-main",e.tabMain),F.a.set("user-tabs",JSON.stringify(e.userTabs)),F.a.set("tab-analysis",e.tabAnalysis),F.a.set("country",e.country),F.a.set("prediction",e.prediction),F.a.set("type",e.type),F.a.set("watched-onboardings",e.watchedOnboardings)}var L=new(0,a(361).Octokit),M=Object(j.a)((function(e){return Object(C.a)({root:{marginLeft:0,margin:e.spacing(2),textAlign:"center"},formControl:{margin:e.spacing(2),minWidth:100},footer:{opacity:.5},latestUpdate:{opacity:.5},chart:{width:"90%"},infoIcon:{color:e.palette.grey.A200,height:e.spacing(2),width:e.spacing(2),paddingTop:e.spacing(1),marginLeft:e.spacing(1)/4}})}));var W=function(){var e=M(),t={Confirmed:"#f57c00",Deaths:"#FC562E",Recovered:"#388e3c"},a={Tomorrow:1,"2 days":2,"3 days":3,"1 week":7},i=B(),o=Object(n.useState)([]),l=Object(s.a)(o,2),u=l[0],m=l[1],p=Object(n.useState)(i.country),j=Object(s.a)(p,2),C=j[0],N=j[1],k=Object(n.useState)(i.type),T=Object(s.a)(k,2),P=T[0],A=T[1],F=Object(n.useState)([]),W=Object(s.a)(F,2),H=W[0],U=W[1],G=Object(n.useState)(i.prediction),z=Object(s.a)(G,2),V=z[0],J=z[1],q=Object(n.useState)([]),K=Object(s.a)(q,2),Y=K[0],Q=K[1],X=Object(n.useState)(""),Z=Object(s.a)(X,2),$=Z[0],ee=Z[1],te=r.a.useRef(null),ae=r.a.useState(0),ne=Object(s.a)(ae,2),re=ne[0],ie=ne[1],oe=r.a.useRef(null),le=r.a.useState(0),ce=Object(s.a)(le,2),se=ce[0],ue=ce[1],me=r.a.useRef(null),de=r.a.useState(0),pe=Object(s.a)(de,2),ge=pe[0],he=pe[1];r.a.useEffect((function(){ie(te.current.offsetWidth),ue(oe.current.offsetWidth),he(me.current.offsetWidth)}),[]);var fe=function(e){var t=e.target.value;x.a.event({category:"Select",action:"Country",label:t}),_(Object(c.a)({},i,{country:t})),N(t)},be=function(e){var t=e.target.value;x.a.event({category:"Select",action:"Range",label:S.a.findKey(t)}),_(Object(c.a)({},i,{prediction:t})),J(t)},Ee=function(e){var t=e.target.value;x.a.event({category:"Select",action:"Type",label:t}),_(Object(c.a)({},i,{type:t})),A(t)};return Object(n.useEffect)((function(){d.a.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_"+P.toLowerCase()+"_global.csv",{skipEmptyLines:!0,header:!0,download:!0,delimiter:",",complete:function(e){var t=e.data,a=S.a.map(S.a.slice(S.a.keys(t[0]),4),(function(e){return D()(e).add(1,"days").toDate()})),n=S.a.concat(["Worldwide"],S.a.sortBy(t.map((function(e){return e["Province/State"].length>0?"".concat(e["Country/Region"],"/").concat(e["Province/State"]):e["Country/Region"]}))));U(n),m(a),Q(t)}})}),[P]),Object(n.useEffect)((function(){L.repos.listCommits({owner:"CSSEGISandData",repo:"COVID-19"}).then((function(e){var t=S.a.values(e.data)[0].commit.committer.date;ee(D()(t).fromNow())}))}),[]),r.a.createElement(v.a,{container:!0,direction:"column",justify:"center",alignItems:"center",className:e.root},r.a.createElement(v.a,{item:!0},r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"outlined",className:e.formControl},r.a.createElement(f.a,{ref:me,id:"select-type-input-id"},"Type"),r.a.createElement(b.a,{labelId:"select-type-select-country",id:"select-type-select-id",value:P,onChange:Ee,labelWidth:ge},S.a.map(S.a.keys(t),(function(e,t){return r.a.createElement(E.a,{key:t,value:e},e)}))))),r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"outlined",className:e.formControl},r.a.createElement(f.a,{ref:te,id:"select-country-input-id"},"Location"),r.a.createElement(b.a,{labelId:"select-country-select-country",id:"select-country-select-id",value:C,onChange:fe,labelWidth:re},H.map((function(e,t){return r.a.createElement(E.a,{key:t,value:e},e)}))))),r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"outlined",className:e.formControl},r.a.createElement(f.a,{ref:oe,id:"select-days-input-id"},"Prediction"),r.a.createElement(b.a,{labelId:"select-days-select-country",id:"select-days-select-id",value:V,onChange:be,labelWidth:se},S.a.map(a,(function(e,t){return r.a.createElement(E.a,{key:e,value:e},t)})))))),r.a.createElement(v.a,{item:!0,container:!0,direction:"column",className:e.chart},function(){function a(e,t){var a=S.a.indexOf(S.a.keys(e),D()(t).format("l")),n=S.a.slice(S.a.values(e),a-5,a+1),r=S.a.reduce(n,(function(e,t,a){var r=n[a-1];return a>0&&r>0&&!isNaN(t)&&!isNaN(r)&&(e[a-1]=t/r),e}),[]),i=S.a.filter(r,(function(e){return!S.a.isNaN(e)})),o=S.a.mean(i)||1;return S.a.reduce(S.a.range(1,2),(function(e,t,a){return e[a]=Math.round(S.a.reduce(S.a.range(0,t),(function(e){return e*o}),1)*(S.a.last(n)||0)),e}),[])[0]}function n(e,t){return S.a.zipObject(e.map((function(e){return D()(e).format("l")})),t)}function i(e,t,r){for(var i,o=n(e,S.a.concat([0],S.a.take(S.a.map(e,(function(e){return a(t,e)})),S.a.values(t).length))),l=1;l<r;l++){var c=a(o,e[S.a.findIndex(S.a.values(o),(function(e){return void 0===e}))-1]);o=n(e,S.a.concat((i=S.a.values(o),S.a.filter(i,(function(e){return void 0!==e}))),[c]))}return S.a.values(o)}var o=S.a.concat(u,function(e,t){return S.a.reduce(S.a.range(1,+t+1),(function(t,a,n){return t[n]=D()(e||Date.now()).add(n+1,"days").toDate(),t}),[])}(S.a.last(u),V)),l=function(e){if("Worldwide"===e){var t=S.a.map(Y,(function(e){return S.a.slice(S.a.values(e),4)}));return S.a.filter(S.a.reduce(t,(function(e,a,n){return e[n]=String(S.a.sum(S.a.map(t,(function(e){return Number(e[n])})))),e}),[]),(function(e){return Number(e)>0}))}return S.a.slice(S.a.values(S.a.find(Y,(function(t){var a=-1!==S.a.indexOf(e,"/"),n=a?S.a.split(e,"/")[0]:e,r=a?S.a.split(e,"/")[1]:"";return t["Country/Region"]===n&&t["Province/State"]===r}))),4)}(C).map(Number),c=n(u,l),s=i(o,c,V),m=S.a.findIndex(S.a.values(c),(function(e){return e>0}))-1;m=m<0?0:m;var d=S.a.values(c).slice(m),p=S.a.values(s).slice(m),h=o.slice(m).map((function(e){return D()(e).format("ll")})),f=function(e,t,a){var n=S.a.zipWith(e,t,(function(e,t){if(e===t)return 0;if(0===e||0===t)return 100*(e+t);var a=S.a.max([e,t]),n=S.a.min([e,t]);return 100*Math.abs(1-a/n)})),r=n.length-a-7<0?0:n.length-a-7,i=S.a.slice(n,r,r+7).filter((function(e){return!isNaN(e)})),o=S.a.round(100-S.a.mean(i),1);return o<=0?1:o>=100?99:o}(d,p,V);f<60&&(p=p.map((function(e){return NaN})));var b=S.a.findLast(i(o,c,1),(function(e){return void 0!==e})),E=t[P];return Y.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{item:!0},r.a.createElement(v.a,{item:!0,container:!0,direction:"row",justify:"center",alignItems:"center"},f>60?r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{item:!0},r.a.createElement(y.a,{variant:"caption"},R()("There is <strong>".concat(f,"%</strong> chance to have <strong>").concat(b,"</strong> ").concat(S.a.lowerCase(P)," tomorrow (").concat(C,")")))),r.a.createElement(v.a,{item:!0},r.a.createElement(w.a,{title:"The accuracy calculation is based on a comparison of the last 7 days prediction and actual values of those days",arrow:!0,TransitionComponent:O.a},r.a.createElement(I.a,{className:e.infoIcon})))):r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{variant:"caption"},R()("".concat(C," does not have enough <strong>").concat(S.a.lowerCase(P),"</strong> cases for reliable prediction")))))),r.a.createElement(v.a,{item:!0},r.a.createElement(g,{labelsPlot:h,dataExistingPlot:d,dataPredictedPlot:p,country:C,color:E}))):""}()),r.a.createElement(v.a,{item:!0,className:e.footer},r.a.createElement(y.a,{variant:"caption"},r.a.createElement(x.a.OutboundLink,{eventLabel:"Data source",target:"_blank",to:"https://github.com/CSSEGISandData/COVID-19"},"Data source")," \u2022 ",r.a.createElement(x.a.OutboundLink,{eventLabel:"Github",target:"_blank",to:"https://github.com/ValeryP/coronavirus-spread"},"Github"))),$&&r.a.createElement(v.a,{item:!0,className:e.latestUpdate},r.a.createElement(y.a,{variant:"caption"},"Latest update ".concat($))))},H=a(422),U=a(411),G=a(412),z=a(424),V=a(414);var J=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{title:"Dashboard",src:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",style:{width:"100%",height:"100vh",border:0}}))},q=Object(j.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)}})}));var K=function(){var e=q();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{container:!0,justify:"space-evenly",className:e.root},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"DailyNewDeaths1",src:"https://ourworldindata.org/grapher/daily-deaths-covid-19",style:{width:"100%",height:600,border:0}})),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"DailyNewDeaths2",src:"https://ourworldindata.org/grapher/total-deaths-covid-19",style:{width:"100%",height:600,border:0}}))))},Y=Object(j.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)}})}));var Q=function(){var e=Y();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{container:!0,justify:"space-evenly",className:e.root},r.a.createElement(v.a,{item:!0,xs:5},r.a.createElement("iframe",{title:"DeathsPerMillion1",src:"https://ourworldindata.org/grapher/total-covid-deaths-per-million",style:{width:"100%",height:600,border:0}})),r.a.createElement(v.a,{item:!0,xs:7},r.a.createElement("iframe",{title:"DeathsPerMillion2",src:"https://ourworldindata.org/grapher/new-covid-deaths-per-million",style:{width:"100%",height:600,border:0}}))))},X=Object(j.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)},rootBottom:{marginTop:e.spacing(1),marginBottom:e.spacing(12)}})}));var Z=function(){var e=X();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{container:!0,direction:"column",className:e.root},r.a.createElement(v.a,{container:!0,item:!0,justify:"space-evenly",className:e.root},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry1",src:"https://ourworldindata.org/grapher/tests-vs-confirmed-cases-covid-19",style:{width:"100%",height:600,border:0}})),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry2",src:"https://ourworldindata.org/grapher/covid-19-tests-country",style:{width:"100%",height:600,border:0}}))),r.a.createElement(v.a,{container:!0,item:!0,justify:"space-evenly",className:e.rootBottom},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry3",src:"https://ourworldindata.org/grapher/tests-vs-confirmed-cases-covid-19-per-million",style:{width:"100%",height:600,border:0}})),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"TestsPerCountry4",src:"https://ourworldindata.org/grapher/covid19-tests-per-million-people",style:{width:"100%",height:600,border:0}})))))},$=Object(j.a)((function(e){return Object(C.a)({root:{marginTop:e.spacing(1)},rootBottom:{marginTop:e.spacing(1),marginBottom:e.spacing(12)}})}));var ee=function(){var e=$();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{container:!0,direction:"column",className:e.root},r.a.createElement(v.a,{container:!0,item:!0,justify:"space-evenly",className:e.root},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry1",src:"https://ourworldindata.org/grapher/total-cases-covid-19",style:{width:"100%",height:600,border:0}})),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry2",src:"https://ourworldindata.org/grapher/daily-cases-covid-19",style:{width:"100%",height:600,border:0}}))),r.a.createElement(v.a,{container:!0,item:!0,justify:"space-evenly",className:e.rootBottom},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry3",src:"https://ourworldindata.org/grapher/total-confirmed-cases-of-covid-19-per-million-people",style:{width:"100%",height:600,border:0}})),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement("iframe",{title:"ConfirmedPerCountry4",src:"https://ourworldindata.org/grapher/new-covid-cases-per-million?year=59",style:{width:"100%",height:600,border:0}})))))},te=Object(j.a)((function(e){return Object(C.a)({root:{margin:e.spacing(1)}})}));var ae=function(){var e=te();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{container:!0,className:e.root},r.a.createElement("iframe",{title:"SpeedOfGrowth",src:"https://ourworldindata.org/grapher/covid-confirmed-cases-since-100th-case",style:{width:"99%",height:600,border:0}})))},ne=a(409),re=a(410),ie=Object(j.a)((function(e){return Object(C.a)({root:{paddingLeft:200,paddingRight:200},img:{margin:e.spacing(2),marginTop:e.spacing(4),marginBottom:e.spacing(4),width:"100%"}})}));var oe=function(){var e=ie();return r.a.createElement(r.a.Fragment,null,r.a.createElement(ne.a,{className:e.root},r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Coronavirus-Symptoms-%E2%80%93-WHO-joint-mission-2-1536x823.png"}),r.a.createElement(re.a,null),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Severity-of-coronavirus-cases-in-China-1-1536x1322.png"}),r.a.createElement(re.a,null),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Coronavirus-CFR-by-age-in-China-1.png"}),r.a.createElement(re.a,null),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Coronavirus-CFR-by-health-condition-in-China.png"}),r.a.createElement(re.a,null),r.a.createElement("img",{className:e.img,alt:"",src:"https://ourworldindata.org/uploads/2020/03/Covid-19-CFR-by-age-vs.-US-Seasonal-Flu-3.png"})))};var le=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{title:"EpidemicCalculator",src:"https://gabgoh.github.io/COVID/index.html?CFR=0.051&D_hospital_lag=5&D_incbation=5.2&D_infectious=2.9&D_recovery_mild=11.1&D_recovery_severe=28.6&I0=6&InterventionAmt=0.47&InterventionTime=20.137399999999992&P_SEVERE=0.1446&R0=2.49&Time_to_death=21.25&logN=17.51",style:{width:"100%",height:"100vh",border:0}}))};var ce=function(){var e=Le(),t=B(),a=r.a.useState(t.tabAnalysis),n=Object(s.a)(a,2),i=n[0],o=n[1];function l(a,n,i){return r.a.createElement(U.a,Object.assign({onClick:function(){return function(e,a){x.a.event({category:"Click",action:"Tab",label:e}),_(Object(c.a)({},t,{tabAnalysis:a}))}(a,n)},label:a,className:n===i?e.tabSelected:e.tabDefault},{id:"simple-tab-".concat(n),"aria-controls":"simple-tabpanel-".concat(n)}))}return r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{position:"sticky"},r.a.createElement(z.a,{value:i,onChange:function(e,t){o(t)},variant:"scrollable",scrollButtons:"auto"},S.a.map(["Daily new deaths","Deaths per million","Tests by country","Daily new confirmed","Speed of growth","Epidemic Calculator","Symptoms and fatality"],(function(e,t){return l(e,t,i)})))),r.a.createElement(_e,{value:i,index:0},r.a.createElement(K,null)),r.a.createElement(_e,{value:i,index:1},r.a.createElement(Q,null)),r.a.createElement(_e,{value:i,index:2},r.a.createElement(Z,null)),r.a.createElement(_e,{value:i,index:3},r.a.createElement(ee,null)),r.a.createElement(_e,{value:i,index:4},r.a.createElement(ae,null)),r.a.createElement(_e,{value:i,index:5},r.a.createElement(le,null)),r.a.createElement(_e,{value:i,index:6},r.a.createElement(oe,null)))},se=a(166),ue=a.n(se),me=a(5),de=a(420),pe=a(432),ge=a(413),he=a(415),fe=a(416),be=a(163),Ee=a.n(be),ve=a(162),ye=a.n(ve),we=a(417),Oe=a(431),je=a(418),Ce=a(419),Ne=a(425),Se=Object(j.a)((function(e){return Object(C.a)({textSuccess:{color:e.palette.success.dark},textError:{color:e.palette.error.dark},saveButton:{color:e.palette.primary.dark}})})),xe=Object(me.a)((function(e){return Object(C.a)({root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}})}))((function(e){var t=e.children,a=e.classes,n=e.onClose,i=Object(u.a)(e,["children","classes","onClose"]);return r.a.createElement(ge.a,Object.assign({disableTypography:!0,className:a.root},i),r.a.createElement(y.a,{variant:"h6"},t),n?r.a.createElement(V.a,{"aria-label":"close",className:a.closeButton,onClick:n},r.a.createElement(Ee.a,null)):null)})),ke=Object(me.a)((function(e){return{root:{padding:e.spacing(2)}}}))(he.a),De=Object(me.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(fe.a),Te=r.a.forwardRef((function(e,t){return r.a.createElement(we.a,Object.assign({direction:"up",ref:t},e))})),Ie=S.a.map(ye.a.data,(function(e){return{name:e.name,flag:e.emoji}}));function Pe(e){var t=e.isOpen,a=e.handleSave,n=e.handleClose,i=Se(),o=r.a.useState(),l=Object(s.a)(o,2),u=l[0],m=l[1],d=r.a.useState(),p=Object(s.a)(d,2),g=p[0],h=p[1],f=r.a.useState(),b=Object(s.a)(f,2),E=b[0],w=b[1],j=r.a.useState(),C=Object(s.a)(j,2),N=C[0],x=C[1];function k(){m(void 0),h(void 0),w(void 0),x(void 0)}function D(){n(),k()}function T(e){var t=e.target,a=(t=void 0===t?"":t).value;m(S.a.find(Ie,(function(e){return e.name===a})))}return r.a.createElement(pe.a,{onClose:D,"aria-labelledby":"customized-dialog-title",open:t,TransitionComponent:Te,fullWidth:!0},r.a.createElement(xe,{id:"customized-dialog-title",onClose:D},"Add your website"),r.a.createElement(ke,{dividers:!0,style:{minHeight:200}},r.a.createElement(v.a,{container:!0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:200},spacing:2},r.a.createElement(y.a,{variant:"caption",style:{margin:16,textAlign:"center"}},"Each country has its own country website with more detailed data. You can add the URL of your favorite website and it will be saved as a bookmark in the top bar of this page."),r.a.createElement(v.a,{item:!0,xs:!0,container:!0,spacing:1,justify:"center"},u&&r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{item:!0,xs:2,style:{textAlign:"end"}},r.a.createElement(je.a,{in:u},r.a.createElement(y.a,{variant:"h3"},r.a.createElement("span",{"aria-label":"flag "+u.name,role:"img"},null===u||void 0===u?void 0:u.flag))))),r.a.createElement(v.a,{item:!0},r.a.createElement(Ne.a,{id:"country-select",style:{width:300},options:Ie,autoHighlight:!0,onSelect:T,getOptionLabel:function(e){return e.name},renderOption:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,e.flag),e.name)},renderInput:function(e){return r.a.createElement(Oe.a,Object.assign({},e,{label:"Choose your country",variant:"outlined",inputProps:Object(c.a)({},e.inputProps,{autoComplete:"new-password"})}))}}))),u&&r.a.createElement(v.a,{item:!0,style:{width:"100%"}},r.a.createElement(Oe.a,{fullWidth:!0,variant:"outlined",label:"Insert URL of your website",onChange:function(e){var t=e.target.value;x(!0),w(t),fetch("https://cors-anywhere.herokuapp.com/"+t,{method:"GET"}).then((function(e){h(e.ok)}),(function(e){console.error(e)})).then((function(){return setTimeout((function(){return x(!1)}),2e3)}))}})),N&&r.a.createElement(O.a,{in:N,unmountOnExit:!0,style:{transitionDelay:N?"300ms":"0ms"}},r.a.createElement(v.a,{item:!0,spacing:1,container:!0,justify:"center",style:{width:"100%"}},r.a.createElement(v.a,{item:!0,xs:1,style:{textAlign:"end"}},r.a.createElement(Ce.a,{size:20})),r.a.createElement(v.a,{item:!0},r.a.createElement(y.a,{variant:"body1"},"Checking inserted URL...")))),!N&&E&&(g?r.a.createElement(v.a,{item:!0,style:{width:"100%"},container:!0,justify:"center"},r.a.createElement(y.a,{variant:"body1",className:i.textSuccess},r.a.createElement("span",{"aria-label":"happy",role:"img"},"\ud83d\ude0a"),"Great. URL is valid!")):r.a.createElement(v.a,{item:!0,style:{width:"100%"},container:!0,justify:"center"},r.a.createElement(y.a,{variant:"body1",className:i.textError},r.a.createElement("span",{"aria-label":"sad",role:"img"},"\ud83d\ude3f"),"Inserted URL is not valid. Try another one, please."))))),g&&!N&&r.a.createElement(De,null,r.a.createElement(de.a,{onClick:function(){a(E,u),k()},className:i.saveButton,variant:"contained",color:"secondary"},"Save")))}var Re,Ae=function(e){var t=e.url;return r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{title:"GenericTab",src:t,style:{width:"100%",height:"100vh",border:0}}))},Fe=a(95);function Be(e){var t=e.run,a=e.type,n={MAIN:[{target:"body",content:r.a.createElement("p",null,"This website lets you keep all the info about the COVID-19 world situation in a single place. ",r.a.createElement("strong",null,"Trusted data source. Daily updates.")),placement:"center"},{target:".simple-tab-0",content:r.a.createElement("p",null,r.a.createElement("u",null,"Dashboard")," has the most reliable ",r.a.createElement("strong",null,"map that contains all countries"),"' data.")},{target:".simple-tab-1",content:r.a.createElement("p",null,r.a.createElement("u",null,"Analysis")," has ",r.a.createElement("strong",null,"detailed charts")," with granularly picked scientific data.")},{target:".simple-tab-2",content:r.a.createElement("p",null,r.a.createElement("u",null,"Prediction")," chart shows ",r.a.createElement("strong",null,"how the disease will spread")," in each country.")},{target:".simple-tab-last",content:r.a.createElement("p",null,"You can ",r.a.createElement("strong",null,"add the URL of the website you frequently check")," and it will be saved as an icon in the top bar of this page.")}]}.MAIN;return r.a.createElement(Fe.b,{continuous:!0,run:t,showSkipButton:!0,steps:n,styles:{options:{zIndex:1e4}},callback:function(e){var t=e.status;if([Fe.a.FINISHED,Fe.a.SKIPPED].includes(t)){var n=B();_(Object(c.a)({},n,{watchedOnboardings:S.a.uniq([].concat(Object(l.a)(n.watchedOnboardings),[a]))}))}}})}function _e(e){var t=e.children,a=e.value,n=e.index,i=Object(u.a)(e,["children","value","index"]);return r.a.createElement(y.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},i),a===n&&r.a.createElement(H.a,{p:0},t))}!function(e){e[e.MAIN=0]="MAIN"}(Re||(Re={}));var Le=Object(j.a)((function(e){return Object(C.a)({tabDefault:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},tabSelected:{color:e.palette.secondary.main}})}));var Me=function(){var e,t=Le(),a=B(),i=r.a.useState(a.tabMain),o=Object(s.a)(i,2),u=o[0],m=o[1],d=r.a.useState(!1),p=Object(s.a)(d,2),g=p[0],h=p[1],f=r.a.useState(a.userTabs),b=Object(s.a)(f,2),E=b[0],v=b[1],y=function(){h(!1)},w=S.a.map(E,"flag"),O=["Dashboard","Analysis","Prediction"],j=[].concat(O,Object(l.a)(w));function C(e,n,i){var o=n>O.length-1?{fontSize:"1.3rem",minWidth:64}:{};return r.a.createElement(U.a,Object.assign({onClick:function(){return function(e,t){x.a.event({category:"Click",action:"Tab",label:e}),_(Object(c.a)({},a,{tabMain:t}))}(e,n)},label:e,className:n===i?t.tabSelected:t.tabDefault},{className:"simple-tab-".concat(n),id:"simple-tab-".concat(n),"aria-controls":"simple-tabpanel-".concat(n)},{style:Object(c.a)({},o),key:n}))}return Object(n.useEffect)((function(){window.scrollTo(0,0)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{position:"sticky"},r.a.createElement(z.a,{value:u,onChange:function(e,t){m(t)},variant:"scrollable",scrollButtons:"auto"},S.a.map(j,(function(e,t){return C(e,t,u)})),r.a.createElement(V.a,{className:"simple-tab-last","aria-haspopup":"true",color:"inherit",onClick:function(){h(!0)}},r.a.createElement(ue.a,null)))),r.a.createElement(_e,{value:u,index:0,key:0},r.a.createElement(J,null)),r.a.createElement(_e,{value:u,index:1,key:1},r.a.createElement(ce,null)),r.a.createElement(_e,{value:u,index:2,key:2},r.a.createElement(W,null)),S.a.map(E,(function(e,t){var a=e.url;return r.a.createElement(_e,{value:u,index:O.length+t,key:O.length+t},r.a.createElement(Ae,{url:a}))})),r.a.createElement(Pe,{isOpen:g,handleSave:function(e,t){var n={index:E.length,country:t.name,flag:t.flag,url:e,timestamp:D()().unix()},r=S.a.concat(E,[n]);_(Object(c.a)({},a,{userTabs:r})),v(r),y()},handleClose:y}),r.a.createElement(Be,{run:(e=Re.MAIN,!(S.a.indexOf(B().watchedOnboardings,e)>=0)),type:Re.MAIN}))},We=a(167),He=a(421);x.a.initialize("UA-160685541-1"),x.a.pageview(window.location.pathname);var Ue=Object(We.a)({palette:{primary:{main:"#354955"},secondary:{main:"#F7A942"}}});o.a.render(r.a.createElement(He.a,{theme:Ue},r.a.createElement(Me,null)),document.getElementById("root")),document.body.style.margin="0"}},[[181,1,2]]]);
//# sourceMappingURL=main.2de4c50f.chunk.js.map