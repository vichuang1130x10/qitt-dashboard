(this["webpackJsonpnud-compare-bom"]=this["webpackJsonpnud-compare-bom"]||[]).push([[0],{103:function(e,t,a){e.exports=a(122)},114:function(e,t,a){},120:function(e,t){},121:function(e,t){},122:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(45),o=a.n(r),i=a(10),c=(a(113),a(114),a(5)),s=a(1),d=a(2);function u(){var e=Object(s.a)(["\n  cursor: pointer;\n  background: #333;\n  font-size: 16px;\n  border-radius: 5px;\n  color: #fff;\n  margin: 0 1em;\n  padding: 0.4em 1em;\n  transition: 0.5s all ease-out;\n\n  &:hover {\n    background-color: green;\n    color: white;\n  }\n\n  &:disabled {\n    background: #ccc;\n  }\n"]);return u=function(){return e},e}var m=d.a.button(u()),p=a(123),f=a(124),E=a(125),T=a(127),D=a(54),h=a(34),v=a(33),y=a.n(v);function g(e){return function(e){var t={};return e.SheetNames.forEach((function(a){var n=y.a.utils.sheet_to_row_object_array(e.Sheets[a]);n.length>0&&(t[a]=n)})),t}(y.a.read(e,{type:"binary",cellDates:!0}))}function b(e){var t,a={startDate:null,endDate:null};return e.YieldRate.forEach((function(e){if((null===a.startDate||e.Date<a.startDate)&&(a.startDate=e.Date),(null===a.endDate||e.Date>a.endDate)&&(a.endDate=e.Date),void 0===a[e.Model]||null===a[e.Model]){if(a[e.Model]={},a[e.Model].RowData=[e],a[e.Model].SMT1={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].SMT2={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].ASM={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].FCT={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].DAOI={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].CPLD={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].VOL={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].CQC={Pass:0,Fail:0,Total:0,data:[]},a[e.Model].ICT={Pass:0,Fail:0,Total:0,data:[]},"SMT1"===e.Type||"SMT2"===e.Type||"ASM"===e.Type||"FCT"===e.Type||"DAOI"===e.Type||"CPLD"===e.Type||"VOL"===e.Type||"CQC"===e.Type||"ICT"===e.Type){a[e.Model][e.Type].Pass+=e.Pass,a[e.Model][e.Type].Fail+=e.Fail,a[e.Model][e.Type].Total+=e.Total;var t=e.Date,n=e.Pass,l=e.Fail,r=e.Total;a[e.Model][e.Type].data=[{Date:t,Pass:n,Fail:l,Total:r}]}}else if(a[e.Model].RowData.push(e),"SMT1"===e.Type||"SMT2"===e.Type||"ASM"===e.Type||"FCT"===e.Type||"DAOI"===e.Type||"CPLD"===e.Type||"VOL"===e.Type||"CQC"===e.Type||"ICT"===e.Type){a[e.Model][e.Type].Pass+=e.Pass,a[e.Model][e.Type].Fail+=e.Fail,a[e.Model][e.Type].Total+=e.Total;var o=e.Date,i=e.Pass,c=e.Fail,s=e.Total,d=a[e.Model][e.Type].data.find((function(e){return e.Date.toString()===o.toString()}));d?(d.Pass+=i,d.Fail+=c,d.Total+=s):a[e.Model][e.Type].data.push({Date:o,Pass:i,Fail:c,Total:s})}})),function(e){var t={startDate:e.startDate,endDate:e.endDate,models:[]};return Object.keys(e).filter((function(e){return e!=="startDate"&&e!=="endDate"})).forEach((function(a){var n=Object(h.a)({model:a},e[a]);t.models.push(n)})),t}((t=a,Object.keys(t).filter((function(e){return"startDate"!==e&&"endDate"!==e})).forEach((function(e){var a=t[e],n=Math.max(a.SMT1.Pass||0,a.SMT2.Pass||0),l=(a.SMT1.Fail||0)+(a.SMT2.Fail||0),r=parseFloat((n/(n+l)*100).toFixed(1))||0,o=Math.max(a.ASM.Pass||0,a.CPLD.Pass||0,a.VOL.pass||0,a.FCT.pass||0),i=(a.ASM.Fail||0)+(a.CPLD.Fail||0)+(a.VOL.Fail||0)+(a.FCT.Fail||0)+(a.DAOI.Fail||0),c=parseFloat((o/(o+i)*100).toFixed(1))||0,s=parseFloat((r*c/100).toFixed(1))||Math.max(r,c);t[e]=Object(h.a)({},t[e],{FE:{Pass:n,Fail:l,Yield:r},BE:{Pass:o,Fail:i,Yield:c},FTY:s})})),t))}function x(e){var t=e.callback,a=e.fileType,r=e.setFlag,o=Object(n.useState)(""),i=Object(c.a)(o,2),s=i[0],d=i[1],u=Object(n.useCallback)((function(e){e.forEach((function(e){var n=new FileReader;n.onabort=function(){return console.log("file reading was abort")},n.onerror=function(){return console.log("file reading has failed")},n.onload=function(e){console.log("received file ...");var n=g(e.target.result);console.log(n);var l=Object.keys(n);switch(a){case"YieldRate":if("YieldRate"!==l[0].split(" ")[0]||null===n[l])alert("The file you dropped is wrong, it should be yeild rate excel file"),r(!1);else{var o=b({YieldRate:n[l]});console.log(o),t(o),r(!0)}break;case"ErrorList":if("ErrorList"!==l[0].split(" ")[0]||null===n[l])alert("The file you dropped is wrong, it should be error list excel file"),r(!1);else{var i={ErrorList:n[l]};t(i),r(!0)}break;case"RepairList":if("RepairList"!==l[0].split(" ")[0]||null===n[l])alert("The file you dropped is wrong, it should be repair list excel file"),r(!1);else{var c={RepairList:n[l]};t(c),r(!0)}}},n.readAsBinaryString(e)})),d(e[0].name)}),[t,a,r]),m=Object(D.a)({onDrop:u}),p=m.getRootProps,f=m.getInputProps;return l.a.createElement("div",null,l.a.createElement("div",p({className:"dropzone"}),l.a.createElement("input",f()),l.a.createElement("p",null,"Drag and drop file here, or click to select files")),l.a.createElement("div",null,l.a.createElement("h4",null,s)))}function F(e){var t=e.title,a=e.fileType,n=e.callback,r=e.setFlag;return l.a.createElement(T.a,{style:{width:"18rem",height:"300px"}},l.a.createElement(T.a.Body,null,l.a.createElement(T.a.Title,{className:"font-weight-bold"},t),l.a.createElement(x,{fileType:a,callback:n,setFlag:r})))}var M=a(55);function O(){var e=Object(s.a)(["\n  color: #606060;\n  padding: 0 64px;\n"]);return O=function(){return e},e}function S(){var e=Object(s.a)(['\n  margin: 20px 0 10px 0;\n  padding: 0 64px;\n  font-family: "Oswald", sans-serif;\n']);return S=function(){return e},e}function C(){var e=Object(s.a)(["\n  max-width: 1200px;\n  padding: 20px 20px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"]);return C=function(){return e},e}function P(){var e=Object(s.a)(["\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);\n"]);return P=function(){return e},e}var j=d.a.div(P()),A=d.a.div(C()),L=d.a.div(S()),k=d.a.div(O());function I(e){return l.a.createElement(j,null,l.a.createElement(A,null,l.a.createElement(L,null,l.a.createElement("h3",null,"SUPERMICRO ME")),l.a.createElement(k,null,l.a.createElement("h2",null,"Quality Improvement Tracking Tool For EMS"))))}function Y(){var e=Object(n.useState)({}),t=Object(c.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)({}),s=Object(c.a)(o,2),d=s[0],u=s[1],T=Object(n.useState)({}),D=Object(c.a)(T,2),h=D[0],v=D[1],y=Object(n.useState)(!1),g=Object(c.a)(y,2),b=g[0],x=g[1],O=Object(n.useState)(!1),S=Object(c.a)(O,2),C=S[0],P=S[1],j=Object(n.useState)(!1),A=Object(c.a)(j,2),L=A[0],k=A[1];return l.a.createElement("div",null,l.a.createElement(I,null),l.a.createElement(p.a,null,l.a.createElement("h6",{className:"text-left m-auot mt-5"},"Pick The Files For Generating The Quality Data"),l.a.createElement(f.a,null,l.a.createElement(E.a,null,l.a.createElement(F,{title:"Yield Rate",fileType:"YieldRate",callback:function(e){return function(e){r(e)}(e)},setFlag:function(e){return x(e)}})),l.a.createElement(E.a,null,l.a.createElement(F,{title:"Error List",fileType:"ErrorList",callback:function(e){return function(e){u(e)}(e)},setFlag:function(e){return P(e)}})),l.a.createElement(E.a,null,l.a.createElement(F,{title:"Repair List",fileType:"RepairList",callback:function(e){return function(e){return v(e)}(e)},setFlag:function(e){return k(e)}}))),l.a.createElement("div",{style:{height:"50px"}}),l.a.createElement(f.a,{className:"d-flex justify-content-center"},l.a.createElement(m,{disabled:!b||!C||!L,style:{width:"50%"},onClick:function(e){var t;t=d,h.RepairList.forEach((function(e){var a=t.ErrorList.find((function(t){return e.CM_SN===t.CM_SN&&e.Error_Description===t.Error_Description&&e.Type===t.Type}));a&&Object.assign(a,e)}));var n=function(e){var t={};return e.forEach((function(e){void 0===t[e.Model]||null===t[e.Model]?(t[e.Model]={},t[e.Model].SMT1={ErorrDescriptions:[]},t[e.Model].SMT2={ErorrDescriptions:[]},t[e.Model].ASM={ErorrDescriptions:[]},t[e.Model].FCT={ErorrDescriptions:[]},t[e.Model].DAOI={ErorrDescriptions:[]},t[e.Model].CPLD={ErorrDescriptions:[]},t[e.Model].VOL={ErorrDescriptions:[]},t[e.Model].CQC={ErorrDescriptions:[]},t[e.Model].ICT={ErorrDescriptions:[]},"SMT1"!==e.Type&&"SMT2"!==e.Type&&"ASM"!==e.Type&&"FCT"!==e.Type&&"DAOI"!==e.Type&&"CPLD"!==e.Type&&"VOL"!==e.Type&&"CQC"!==e.Type&&"ICT"!==e.Type||(t[e.Model][e.Type].ErorrDescriptions=[{description:e.Error_Description,reasons:[{reason:e.Reason,item:e.item}]}])):"SMT1"!==e.Type&&"SMT2"!==e.Type&&"ASM"!==e.Type&&"FCT"!==e.Type&&"DAOI"!==e.Type&&"CPLD"!==e.Type&&"VOL"!==e.Type&&"CQC"!==e.Type&&"ICT"!==e.Type||t[e.Model][e.Type].ErorrDescriptions.push({description:e.Error_Description,reasons:[{reason:e.Reason,item:e.item}]})})),t}(d.ErrorList.map((function(e){return null!==e.Reason&&void 0!==e.Reason||(e.Reason="Under investigation"),e})));Object(i.c)("/result",{state:{YieldRate:a,ErrorAnalysis:n}})}},l.a.createElement("span",{className:"m-1"},l.a.createElement(M.a,{color:"white"}))," ","Generate Report"))))}var w=a(15),N=a.n(w);function R(){var e=Object(s.a)(["\n  font-size: 16px;\n  border: solid 1px #dbdbdb;\n  border-radius: 3px;\n  color: #262626;\n  padding: 7px 33px;\n  border-radius: 3px;\n  color: #999;\n  cursor: text;\n  font-size: 14px;\n  font-weight: 300;\n  text-align: center;\n\n  width: 20%;\n  margin: 0px 128px 10px 128px;\n\n  &:active,\n  &:focus {\n    text-align: left;\n  }\n"]);return R=function(){return e},e}function B(){var e=Object(s.a)(["\n  padding: 20px 64px;\n"]);return B=function(){return e},e}function V(){var e=Object(s.a)(["\n  color: #606060;\n  padding: 0 64px;\n"]);return V=function(){return e},e}function Q(){var e=Object(s.a)(['\n  margin: 20px 0 10px 0;\n  padding: 0 64px;\n  font-family: "Oswald", sans-serif;\n']);return Q=function(){return e},e}function _(){var e=Object(s.a)(["\n  max-width: 1200px;\n  padding: 20px 20px 5px 20px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"]);return _=function(){return e},e}function z(){var e=Object(s.a)(["\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);\n"]);return z=function(){return e},e}var U=d.a.div(z()),q=d.a.div(_()),W=d.a.div(Q()),G=d.a.div(V()),J=d.a.div(B()),$=d.a.input(R());function H(e){var t=Object(n.useState)(""),a=Object(c.a)(t,2),r=a[0],o=a[1];return l.a.createElement(U,null,l.a.createElement(q,null,l.a.createElement(W,null,l.a.createElement(i.a,{to:"/",style:{color:"#000"}},l.a.createElement("h3",null,"SUPERMICRO ME"))),l.a.createElement(G,null,l.a.createElement("h2",null,"Quality Improvement Tracking Tool For EMS")),l.a.createElement(J,null,l.a.createElement("h6",null,"Date Range : ",e.date)),l.a.createElement($,{Input:!0,type:r,onChange:function(t){return a=t.target.value,o(a),void e.searchBarOnchanged(a);var a},placeholder:"Model Search"}),l.a.createElement("div",{className:"progress-control"},l.a.createElement("div",{className:"progress-control-div"},"Model"," ",l.a.createElement("img",{src:N.a,alt:"direction",width:"15px",onClick:function(){return e.sortModelName()}})),l.a.createElement("div",{className:"progress-control-outer"},l.a.createElement("div",{className:"progress-control-div"},"F/E Yield",l.a.createElement("img",{src:N.a,alt:"direction",width:"15px",onClick:function(){return e.sortFE()}})),l.a.createElement("p",null,"(SMT1 + SMT2)")),l.a.createElement("div",{className:"progress-control-outer"},l.a.createElement("div",{className:"progress-control-div"},"B/E Yield",l.a.createElement("img",{src:N.a,alt:"direction",width:"15px",onClick:function(){return e.sortBE()}})),l.a.createElement("p",null,"(ASM + CPLD + VCL + FCT + DAOI)")),l.a.createElement("div",{className:"progress-control-div"},"FTY"," ",l.a.createElement("img",{src:N.a,alt:"direction",width:"15px",onClick:function(){return e.sortFTY()}})))))}function K(e){return e.toISOString().slice(0,10)}function X(e){return e.split("(")}function Z(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n"]);return Z=function(){return e},e}function ee(){var e=Object(s.a)(["\n  width: 100%;\n  height: 82px;\n  display: grid;\n  grid-template-columns: 25% 25% 25% 25%;\n  grid-gap: 12px;\n  margin: 3px;\n  border: 1px solid rgba(0, 0, 0, 0.0975);\n  border-radius: 5px;\n"]);return ee=function(){return e},e}var te=d.a.div(ee()),ae=d.a.div(Z());function ne(e){var t=e.model,a=e.FE,n=e.BE,r=e.FTY,o=e.onCardClick;return l.a.createElement(te,{onClick:function(){o(t)}},l.a.createElement(ae,{FTY:100},l.a.createElement("div",null,"".concat(X(t)[0])),l.a.createElement("div",null,"(".concat(X(t)[1]))),l.a.createElement(ae,{style:{color:a.Yield<97.5?"#d00213":"#003aff"}},"".concat(a.Yield||"NA"," ").concat(a.Yield?"%":""," (").concat(a.Pass,"/ ").concat(a.Pass+a.Fail,") ")),l.a.createElement(ae,{style:{color:n.Yield<92?"#d00213":"#003aff"}},"".concat(n.Yield||"NA"," ").concat(n.Yield?"%":"","  (").concat(n.Pass,"/ ").concat(n.Pass+n.Fail,")")),l.a.createElement(ae,{style:{color:r<90?"#d00213":"#003aff"}},"".concat(r||"NA"," ").concat(r?"%":"")))}function le(e){console.log("result page start");var t=Object(n.useState)([]),a=Object(c.a)(t,2),r=a[0],o=a[1],s=Object(n.useState)({}),d=Object(c.a)(s,2),u=d[0],m=d[1],E=Object(n.useState)(!1),T=Object(c.a)(E,2),D=T[0],h=T[1],v=Object(n.useState)(!1),y=Object(c.a)(v,2),g=y[0],b=y[1],x=Object(n.useState)(!1),F=Object(c.a)(x,2),M=F[0],O=F[1],S=Object(n.useState)(!1),C=Object(c.a)(S,2),P=C[0],j=C[1],A=e.location.state.YieldRate;Object(n.useEffect)((function(){var t=e.location.state.ErrorAnalysis;o(A.models),m(t)}),[A.models,e.location.state.ErrorAnalysis,e.location.state.YieldRate]);return A.startDate?l.a.createElement(l.a.Fragment,null,l.a.createElement(H,{sortModelName:function(){return function(){var e=[];e=D?r.sort((function(e,t){return e.model>t.model?1:-1})):r.sort((function(e,t){return e.model<t.model?1:-1})),o(e),h(!D)}()},sortFE:function(){return function(){var e=[];e=g?r.sort((function(e,t){return e.FE.Yield-t.FE.Yield})):r.sort((function(e,t){return t.FE.Yield-e.FE.Yield})),o(e),b(!g)}()},sortBE:function(){return function(){var e=[];e=M?r.sort((function(e,t){return e.BE.Yield-t.BE.Yield})):r.sort((function(e,t){return t.BE.Yield-e.BE.Yield})),o(e),O(!M)}()},sortFTY:function(){return function(){var e=[];e=P?r.sort((function(e,t){return e.FTY-t.FTY})):r.sort((function(e,t){return t.FTY-e.FTY})),o(e),j(!P)}()},searchBarOnchanged:function(e){return function(e){var t=A.models.filter((function(t){return t.model.toLowerCase().includes(e.toLowerCase())}));o(t)}(e)},date:"".concat(K(A.startDate)," ~ ").concat(K(A.endDate))}),l.a.createElement(p.a,null,l.a.createElement(f.a,null,l.a.createElement("div",{className:"model-list-container"},r.map((function(e){return l.a.createElement(ne,{key:e.model,model:e.model,FE:e.FE,BE:e.BE,FTY:e.FTY,onCardClick:function(e){return function(e){var t=r.filter((function(t){return t.model===e}))[0]||{};Object(i.c)("/detail",{state:{modelName:e,modelDetail:t,startDate:K(A.startDate),endDate:K(A.endDate),errorAnalysis:u[e]}})}(e)}})})))))):null}var re=a(21),oe=a(22),ie=a(23),ce=a(24),se=a(126);function de(){var e=Object(s.a)(["\n  padding: 12px 64px;\n"]);return de=function(){return e},e}function ue(){var e=Object(s.a)(["\n  color: #606060;\n  padding: 0 64px;\n"]);return ue=function(){return e},e}function me(){var e=Object(s.a)(["\n  color: #606060;\n  padding: 0 64px;\n"]);return me=function(){return e},e}function pe(){var e=Object(s.a)(["\n  color: #606060;\n  padding: 0 64px;\n"]);return pe=function(){return e},e}function fe(){var e=Object(s.a)(["\n  padding: 0 64px;\n"]);return fe=function(){return e},e}function Ee(){var e=Object(s.a)(["\n  padding: 20px 64px;\n"]);return Ee=function(){return e},e}function Te(){var e=Object(s.a)(["\n  color: #606060;\n  padding: 0 64px;\n"]);return Te=function(){return e},e}function De(){var e=Object(s.a)(['\n  margin: 20px 0 10px 0;\n  padding: 0 64px;\n  font-family: "Oswald", sans-serif;\n']);return De=function(){return e},e}function he(){var e=Object(s.a)(["\n  max-width: 1200px;\n  padding: 20px 20px 5px 20px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"]);return he=function(){return e},e}function ve(){var e=Object(s.a)(["\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);\n"]);return ve=function(){return e},e}var ye=d.a.div(ve()),ge=d.a.div(he()),be=d.a.div(De()),xe=d.a.div(Te()),Fe=d.a.div(Ee()),Me=d.a.div(fe()),Oe=d.a.div(pe()),Se=d.a.div(me()),Ce=d.a.div(ue()),Pe=d.a.div(de());function je(e){return console.log(e),l.a.createElement(ye,null,l.a.createElement(ge,null,l.a.createElement(be,null,l.a.createElement(i.a,{to:"/",style:{color:"#000"}},l.a.createElement("h3",null,"SUPERMICRO ME"))),l.a.createElement(xe,null,l.a.createElement("h2",null,"Quality Improvement Tracking Tool For EMS")),l.a.createElement(Fe,null,l.a.createElement("h6",null,"Date Range : ","".concat(e.data.startDate," ~ ").concat(e.data.endDate))),l.a.createElement(Me,null,l.a.createElement("h4",null,"Model: ",e.data.modelName)),l.a.createElement(Oe,null,l.a.createElement("h6",null,"FE: ".concat(e.data.modelDetail.FE.Yield||"NA"," ").concat(e.data.modelDetail.FE.Yield?"%":""," "))),l.a.createElement(Se,null,l.a.createElement("h6",null,"BE: ".concat(e.data.modelDetail.BE.Yield||"NA"," ").concat(e.data.modelDetail.BE.Yield?"%":""," "))),l.a.createElement(Ce,null,l.a.createElement("h6",null,"FTY: ".concat(e.data.modelDetail.FTY||"NA"," ").concat(e.data.modelDetail.FTY?"%":""," "))),l.a.createElement(Pe,null,l.a.createElement(se.a,{striped:!0,bordered:!0,hover:!0,size:"sm",style:{fontSize:"16px"}},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Station"),l.a.createElement("th",null,"SMT1"),l.a.createElement("th",null,"SMT2"),l.a.createElement("th",null,"ASM"),l.a.createElement("th",null,"ICT"),l.a.createElement("th",null,"CPLD"),l.a.createElement("th",null,"VOL"),l.a.createElement("th",null,"FCT"),l.a.createElement("th",null,"DAOI"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",null,"YIELD"),l.a.createElement("td",null,0!==e.data.modelDetail.SMT1.Pass&&0!==e.data.modelDetail.SMT1.Total?(e.data.modelDetail.SMT1.Pass/e.data.modelDetail.SMT1.Total*100).toFixed(1):0," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.SMT2.Pass&&0!==e.data.modelDetail.SMT2.Total?(e.data.modelDetail.SMT2.Pass/e.data.modelDetail.SMT2.Total*100).toFixed(1):0," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.ASM.Pass&&0!==e.data.modelDetail.ASM.Total?(e.data.modelDetail.ASM.Pass/e.data.modelDetail.ASM.Total*100).toFixed(1):0," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.ICT.Pass&&0!==e.data.modelDetail.ICT.Total?(e.data.modelDetail.ICT.Pass/e.data.modelDetail.ICT.Total*100).toFixed(1):"NA"," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.CPLD.Pass&&0!==e.data.modelDetail.CPLD.Total?(e.data.modelDetail.CPLD.Pass/e.data.modelDetail.CPLD.Total*100).toFixed(1):0," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.VOL.Pass&&0!==e.data.modelDetail.VOL.Total?(e.data.modelDetail.VOL.Pass/e.data.modelDetail.VOL.Total*100).toFixed(1):0," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.FCT.Pass&&0!==e.data.modelDetail.FCT.Total?(e.data.modelDetail.FCT.Pass/e.data.modelDetail.FCT.Total*100).toFixed(1):0," ","%"),l.a.createElement("td",null," ",0!==e.data.modelDetail.DAOI.Pass&&0!==e.data.modelDetail.DAOI.Total?(e.data.modelDetail.DAOI.Pass/e.data.modelDetail.DAOI.Total*100).toFixed(1):0," ","%")),l.a.createElement("tr",null,l.a.createElement("th",null,"INPUT"),l.a.createElement("td",null,e.data.modelDetail.SMT1.Total),l.a.createElement("td",null,e.data.modelDetail.SMT2.Total),l.a.createElement("td",null,e.data.modelDetail.ASM.Total),l.a.createElement("td",null,e.data.modelDetail.ICT.Total),l.a.createElement("td",null,e.data.modelDetail.CPLD.Total),l.a.createElement("td",null,e.data.modelDetail.VOL.Total),l.a.createElement("td",null,e.data.modelDetail.FCT.Total),l.a.createElement("td",null,e.data.modelDetail.DAOI.Total)),l.a.createElement("tr",null,l.a.createElement("th",null,"PASS"),l.a.createElement("td",null,e.data.modelDetail.SMT1.Pass),l.a.createElement("td",null,e.data.modelDetail.SMT2.Pass),l.a.createElement("td",null,e.data.modelDetail.ASM.Pass),l.a.createElement("td",null,e.data.modelDetail.ICT.Pass),l.a.createElement("td",null,e.data.modelDetail.CPLD.Pass),l.a.createElement("td",null,e.data.modelDetail.VOL.Pass),l.a.createElement("td",null,e.data.modelDetail.FCT.Pass),l.a.createElement("td",null,e.data.modelDetail.DAOI.Pass)),l.a.createElement("tr",null,l.a.createElement("th",null,"FAIL"),l.a.createElement("td",null,e.data.modelDetail.SMT1.Fail),l.a.createElement("td",null,e.data.modelDetail.SMT2.Fail),l.a.createElement("td",null,e.data.modelDetail.ASM.Fail),l.a.createElement("td",null,e.data.modelDetail.ICT.Fail),l.a.createElement("td",null,e.data.modelDetail.CPLD.Fail),l.a.createElement("td",null,e.data.modelDetail.VOL.Fail),l.a.createElement("td",null,e.data.modelDetail.FCT.Fail),l.a.createElement("td",null,e.data.modelDetail.DAOI.Fail)))))))}var Ae=a(9),Le=20,ke=5,Ie=20,Ye=35,we=function(e){Object(ce.a)(a,e);var t=Object(ie.a)(a);function a(){var e;Object(re.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={bars:[]},e.xAxis=Ae.a().tickFormat(Ae.h("%b %d")),e.yAxis=Ae.b().tickFormat((function(e){return"".concat(e,"%")})),e}return Object(oe.a)(a,[{key:"componentDidMount",value:function(){this.xAxis.scale(this.state.xScale),Ae.g(this.refs.xAxis).call(this.xAxis),this.yAxis.scale(this.state.yScale),Ae.g(this.refs.yAxis).call(this.yAxis)}},{key:"componentDidUpdate",value:function(){this.xAxis.scale(this.state.xScale),Ae.g(this.refs.xAxis).call(this.xAxis),this.yAxis.scale(this.state.yScale),Ae.g(this.refs.yAxis).call(this.yAxis)}},{key:"render",value:function(){return l.a.createElement("svg",{width:650,height:400},l.a.createElement("g",null," ",this.state.bars.map((function(e,t){return l.a.createElement("text",{key:t,x:e.x+2,y:e.y-5},e.text)})),this.state.bars.map((function(e,t){return l.a.createElement("circle",{key:t,cx:e.x,cy:e.y,r:4,fill:"#bada55"})}))),l.a.createElement("path",{d:this.state.line,fill:"none",stroke:"#bada55",strokeWidth:"3px"}),l.a.createElement("g",{ref:"xAxis",transform:"translate(0, ".concat(400-Ie,")")}),l.a.createElement("g",{ref:"yAxis",transform:"translate(".concat(Ye,", 0)")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=e.data;if(!a)return{};var n=a.filter((function(e){return e.Pass>5&&e.Total>5})).map((function(e){return{date:e.Date,yield:parseFloat((e.Pass/e.Total*100).toFixed(1))}})).sort((function(e,t){return e.date>t.date?1:-1}));console.log("chart start"),console.log(n);var l=Ae.c(n,(function(e){return e.date})),r=Ae.f().domain(l).range([Ye,650-ke]),o=Ae.c(n,(function(e){return e.yield})),i=Object(c.a)(o,2),s=i[0],d=i[1],u=Ae.e().domain([Math.min(s,80),d]).range([400-Ie,Le]),m=Ae.d().x((function(e){return r(e.date)})).y((function(e){return u(e.yield)}))(n);return{bars:n.map((function(e){return{x:r(e.date),y:u(e.yield),height:u(e.yield),fill:"black",text:"".concat(e.yield,"%")}})),xScale:r,yScale:u,line:m}}}]),a}(n.Component);function Ne(e){var t=e.sortFailure;return l.a.createElement(se.a,{striped:!0,bordered:!0,hover:!0,size:"sm",style:{fontSize:"16px"}},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Defect Item "),l.a.createElement("th",null,"Q'ty(pcs)"),l.a.createElement("th",null,"Individual%"),l.a.createElement("th",null,"Comulated%"))),l.a.createElement("tbody",null,t.map((function(e){return l.a.createElement("tr",{key:e.defectName},l.a.createElement("td",null,e.defectName),l.a.createElement("td",null,e.qty),l.a.createElement("td",null,e.indiv),l.a.createElement("td",null,e.accu))}))))}var Re=function(e){Object(ce.a)(a,e);var t=Object(ie.a)(a);function a(){var e;Object(re.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={tableData:{},startDate:"",endDate:"",modelName:"",modelDetail:{},station:"SMT1",trendData:[],errorAnalysis:[],sortFailure:[],topThree:[]},e.udpateStation=function(t){e.setState({station:t,trendData:e.state.modelDetail[t].data,sortFailure:e.parsingToQty(e.state.errorAnalysis,t)})},e.parsingToQty=function(e,t){console.log("parsing"),console.log(e);var a={};e[t].ErorrDescriptions.forEach((function(e){null===a[e.description]||void 0===a[e.description]?a[e.description]=1:a[e.description]+=1}));var n=[];for(var l in a)n.push([l,a[l]]);n.sort((function(e,t){return t[1]-e[1]}));var r=n.reduce((function(e,t){return e+t[1]}),0),o=[],i=0;return n.forEach((function(e){var t=parseInt(e[1]/r*100);i+=e[1],o.push({defectName:e[0],qty:e[1],indiv:t,accu:parseInt(i/r*100)})})),o},e.parsingRootCause=function(e,t,a){var n=[],l={};t[a].ErorrDescriptions.filter((function(t){return t.description===e})).forEach((function(e){n.push("".concat(e.reasons[0].reason,"/").concat(e.reasons[0].item))})),console.log(n),n.forEach((function(e){null===l[e]||void 0===l[e]?l[e]=1:l[e]+=1}));var r=[];for(var o in l)r.push([o,l[o]]);r.sort((function(e,t){return t[1]-e[1]}));var i=r.reduce((function(e,t){return e+t[1]}),0),c=[],s=0;return r.forEach((function(e){var t=parseInt(e[1]/i*100);s+=e[1],c.push({defectName:e[0],qty:e[1],indiv:t,accu:parseInt(s/i*100)})})),c},e}return Object(oe.a)(a,[{key:"componentDidMount",value:function(){console.log(this.props.location.state);var e=this.props.location.state,t=e.startDate,a=e.endDate,n=e.modelName,l=e.modelDetail,r=e.errorAnalysis;this.setState({tableData:this.props.location.state,startDate:t,endDate:a,modelName:n,modelDetail:l,trendData:l[this.state.station].data,errorAnalysis:r,sortFailure:this.parsingToQty(r,this.state.station)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.tableData,n=t.startDate,r=t.station,o=t.trendData,i=t.errorAnalysis,c=t.sortFailure;return n.length?l.a.createElement(l.a.Fragment,null,l.a.createElement(je,{data:a}),l.a.createElement(p.a,null,l.a.createElement(f.a,null,l.a.createElement("label",{htmlFor:"station"},"Trend Chart:",l.a.createElement("select",{id:"station",value:r,onChange:function(t){return e.udpateStation(t.target.value)},onBlur:function(t){return e.udpateStation(t.target.value)}},["SMT1","SMT2","ASM","ICT","CPLD","VOL","FCT","DAOI"].map((function(e){return l.a.createElement("option",{value:e,key:e},e)})))),l.a.createElement(we,{data:o})),l.a.createElement("br",null),l.a.createElement(f.a,null,l.a.createElement("div",null,l.a.createElement("h4",null,"Defect Symptom Analysis:"),l.a.createElement("br",null),l.a.createElement("div",{style:{width:"100%"}},l.a.createElement(Ne,{sortFailure:c})))),l.a.createElement(f.a,null,l.a.createElement("h4",null,"TOP 3 Root Cause:")),l.a.createElement(f.a,null,c.length?l.a.createElement("div",null,l.a.createElement("h6",null,c[0].defectName),l.a.createElement(Ne,{sortFailure:this.parsingRootCause(c[0].defectName,i,r)})):null),l.a.createElement(f.a,null,c[1]?l.a.createElement("div",null,l.a.createElement("h6",null,c[1].defectName),l.a.createElement(Ne,{sortFailure:this.parsingRootCause(c[1].defectName,i,r)})):null),l.a.createElement(f.a,null,c[2]?l.a.createElement("div",null,l.a.createElement("h6",null,c[2].defectName),l.a.createElement(Ne,{sortFailure:this.parsingRootCause(c[2].defectName,i,r)})):null),l.a.createElement("div",{style:{marginBottom:"500px"}}))):null}}]),a}(n.Component);var Be=function(){return l.a.createElement("div",null,l.a.createElement(i.b,null,l.a.createElement(Y,{path:"/"}),l.a.createElement(le,{path:"/result"}),l.a.createElement(Re,{path:"/detail"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(Be,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},15:function(e,t,a){e.exports=a.p+"static/media/direction.fd29952e.png"},44:function(e,t){}},[[103,1,2]]]);
//# sourceMappingURL=main.2a771e98.chunk.js.map