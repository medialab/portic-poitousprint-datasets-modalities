(this["webpackJsonpdatasprint-data-modalities"]=this["webpackJsonpdatasprint-data-modalities"]||[]).push([[0],{138:function(t,e,n){},139:function(t,e,n){"use strict";n.r(e);var c=n(7),i=n.n(c),a=n(66),o=n.n(a),s=(n(78),n(3)),l=n(28),r=n.n(l),u=n(147),d=n(148),j=n(5);var h=function(t){var e=t.summary,n=e.source,i=e.modality,a=e.file_path,o=e.description,l=void 0===o?"":o,h=Object(c.useState)([]),m=Object(s.a)(h,2),v=m[0],b=m[1];Object(c.useEffect)((function(){r()("".concat("/portic-poitousprint-datasets-modalities","/").concat(a)).then((function(t){var e=t.data,n=Object(u.a)(e);b(n)})).catch((function(){console.log("could not get ".concat("/portic-poitousprint-datasets-modalities","/").concat(a))}))}),[a]);var f=v.reduce((function(t,e){var n=e.value,c=e.count;return"vide"===n?t[0].count+=+c:t[1].count+=+c,t}),[{value:"vide",count:0},{value:"remplie",count:0}]),p=(v.length>40?v.slice(0,40):v).filter((function(t){return"vide"!==t.value}));return Object(j.jsxs)("section",{className:"ModalitiesPage",children:[Object(j.jsxs)("h2",{children:[i," (",n,")"]}),v.length?Object(j.jsxs)("div",{className:"vis-container",children:[l&&l.length?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h3",{children:"Description de la dimension dans la doc"}),Object(j.jsx)("blockquote",{children:l})]}):null,Object(j.jsx)("h3",{children:"Carte d'identit\xe9 de la dimension"}),Object(j.jsxs)("ul",{children:[Object(j.jsxs)("li",{children:["Nombre total de modalit\xe9s : ",v.filter((function(t){return"vide"!==t.value})).length]}),Object(j.jsxs)("li",{children:["Exhaustivit\xe9 (valeurs non-vides) : ",parseFloat(f[1].count/(f[0].count+f[1].count)*100).toFixed(2),"% (",f[1].count," / ",f[0].count+f[1].count,")"]}),Object(j.jsxs)("li",{children:["contr\xf4le cumulation des valeurs : ",v.reduce((function(t,e){return t+ +e.count}),0)," entr\xe9es"]}),Object(j.jsxs)("li",{children:["Nombre moyen de valeurs pour chaque modalit\xe9 : ",(v.filter((function(t){return"vide"!==t.value})).reduce((function(t,e){return t+ +e.count}),0)/v.length).toFixed(2)]})]}),Object(j.jsxs)("h3",{children:[v.length>40?"".concat(40," principales modalit\xe9s"):"Toutes les modalit\xe9s"," : "]}),Object(j.jsx)(d.a,{spec:{$schema:"https://vega.github.io/schema/vega-lite/v5.json",data:{values:p},layer:[{mark:"bar"},{mark:{type:"text",align:"left",baseline:"middle",dx:3},encoding:{text:{field:"count",type:"quantitative"}}}],encoding:{x:{field:"count",type:"quantitative",axis:{labelAngle:0}},y:{field:"value",type:"nominal",sort:{field:"count",op:"mean",order:"descending"}}}}})]}):null]})},m=(n(138),"".concat("/portic-poitousprint-datasets-modalities","/profiles_summary.csv"));var v=function(){var t=Object(c.useState)([]),e=Object(s.a)(t,2),n=e[0],i=e[1];return Object(c.useEffect)((function(){r()(m).then((function(t){var e=t.data,n=Object(u.a)(e);i(n)}))}),[]),n.length?Object(j.jsx)(j.Fragment,{children:n.map((function(t,e){return Object(j.jsx)(h,{summary:t},e)}))}):null},b=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,149)).then((function(e){var n=e.getCLS,c=e.getFID,i=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),c(t),i(t),a(t),o(t)}))};o.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(v,{})}),document.getElementById("root")),b()},78:function(t,e,n){}},[[139,1,2]]]);
//# sourceMappingURL=main.db64d9a8.chunk.js.map