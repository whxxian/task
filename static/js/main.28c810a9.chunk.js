(this["webpackJsonptask-mange-system"]=this["webpackJsonptask-mange-system"]||[]).push([[1],{107:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"e",(function(){return o})),n.d(e,"f",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return l})),n.d(e,"b",(function(){return f}));var r=n(30),a=n(40),u=n(0),c=function(t){var e=Object(a.a)({},t);return Object.keys(e).forEach((function(t){(function(t){return void 0===t||null===t||""===t})(e[t])&&delete e[t]})),e},o=function(t){Object(u.useEffect)((function(){t()}),[])},i=function(){var t=Object(u.useRef)(!1);return Object(u.useEffect)((function(){return t.current=!0,function(){t.current=!1}})),t},s=function(t,e){var n=Object(u.useState)(t),a=Object(r.a)(n,2),c=a[0],o=a[1];return Object(u.useEffect)((function(){var n=setTimeout((function(){o(t)}),e);return function(){return clearTimeout(n)}}),[t,e]),c},l=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Object(u.useRef)(document.title).current;Object(u.useEffect)((function(){document.title=t}),[t]),Object(u.useEffect)((function(){return function(){e||(document.title=n)}}),[e])},f=function(){return window.location.href=window.location.origin}},167:function(t,e,n){"use strict";n.d(e,"a",(function(){return p})),n.d(e,"b",(function(){return m}));var r=n(19),a=n.n(r),u=n(40),c=n(168),o=n(46),i=n(221),s=n.n(i),l=n(72),f=n(76),d=n(0),b="https://whxxian.github.io/task/",p=function(){var t=Object(o.a)(a.a.mark((function t(e){var n,r,i,f,d,p=arguments;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=p.length>1&&void 0!==p[1]?p[1]:{},r=n.data,i=n.token,n.headers,f=Object(c.a)(n,["data","token","headers"]),"GET"===(d=Object(u.a)({method:"GET",headers:{Authorization:i?"Bearer ".concat(i):"","Content-Type":r?"application/json":""}},f)).method.toUpperCase()?e+="?".concat(s.a.stringify(r)):d.body=JSON.stringify(r||{}),t.abrupt("return",window.fetch("".concat(b,"/").concat(e),d).then(function(){var t=Object(o.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(401!==e.status){t.next=5;break}return t.next=3,l.c();case 3:return window.location.reload(),t.abrupt("return",Promise.reject({message:"\u8bf7\u91cd\u65b0\u767b\u5f55"}));case 5:return t.next=7,e.json();case 7:if(n=t.sent,!e.ok){t.next=12;break}return t.abrupt("return",n);case 12:return t.abrupt("return",Promise.reject(n));case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=Object(f.b)().user;return Object(d.useCallback)((function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=n[0],c=n[1];return p(a,Object(u.a)(Object(u.a)({},c),{},{token:null===t||void 0===t?void 0:t.token}))}),[null===t||void 0===t?void 0:t.token])}},172:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n(30),a=n(40),u=n(0),c=n(107),o={stat:"idle",data:null,error:null},i={throwOnError:!1},s=function(t,e){var n=Object(a.a)(Object(a.a)({},i),e),s=Object(u.useReducer)((function(t,e){return Object(a.a)(Object(a.a)({},t),e)}),Object(a.a)(Object(a.a)({},o),t)),l=Object(r.a)(s,2),f=l[0],d=function(t){var e=Object(c.f)();return Object(u.useCallback)((function(){return e.current?t.apply(void 0,arguments):void 0}),[t,e])}(l[1]),b=Object(u.useState)((function(){return function(){}})),p=Object(r.a)(b,2),m=p[0],v=p[1],h=Object(u.useCallback)((function(t){return d({data:t,stat:"success",error:null})}),[d]),j=Object(u.useCallback)((function(t){return d({error:t,stat:"error",data:null})}),[d]),O=Object(u.useCallback)((function(t,e){if(!t||!t.then)throw new Error("param must be a promise");return v((function(){return function(){(null===e||void 0===e?void 0:e.retry())&&O(null===e||void 0===e?void 0:e.retry(),e)}})),d({stat:"loading"}),t.then((function(t){return h(t),t})).catch((function(t){return j(t),n.throwOnError?Promise.reject(t):t}))}),[n.throwOnError,h,j,d]);return Object(a.a)({isIdle:"idle"===f.stat,isLoading:"loading"===f.stat,isError:"error"===f.stat,run:O,setData:h,setError:j,retry:m},f)}},240:function(t,e,n){},250:function(t,e){},404:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),u=n(23),c=n.n(u),o=(n(240),n(76)),i=n(127),s=n(226),l=n(128),f=n(141),d=function(t){Object(l.a)(n,t);var e=Object(f.a)(n);function n(){var t;Object(i.a)(this,n);for(var r=arguments.length,a=new Array(r),u=0;u<r;u++)a[u]=arguments[u];return(t=e.call.apply(e,[this].concat(a))).state={error:null},t}return Object(s.a)(n,[{key:"render",value:function(){var t=this.state.error,e=this.props,n=e.fallbackRender,r=e.children;return t?n({error:t}):r}}],[{key:"getDerivedStateFromError",value:function(t){return{error:t}}}]),n}(r.Component),b=n(74),p=a.a.lazy((function(){return Promise.all([n.e(0),n.e(4),n.e(5)]).then(n.bind(null,447))})),m=a.a.lazy((function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,454))}));var v=function(){var t=Object(o.b)().user;return a.a.createElement("div",{className:"App"},a.a.createElement(d,{fallbackRender:b.c},a.a.createElement(a.a.Suspense,{fallback:a.a.createElement(b.d,null)},t?a.a.createElement(p,null):a.a.createElement(m,null))))},h=function(t){t&&t instanceof Function&&n.e(7).then(n.bind(null,445)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,u=e.getLCP,c=e.getTTFB;n(t),r(t),a(t),u(t),c(t)}))},j=n(106),O=(n(403),n(232)),g=n(409),w=function(t){var e=t.children;return a.a.createElement(O.a,{client:new g.a},a.a.createElement(o.a,null,e))};Object(j.b)((function(){c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(w,null,a.a.createElement(j.a,null),a.a.createElement(v,null))),document.getElementById("root"))})),h()},72:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return l})),n.d(e,"d",(function(){return f})),n.d(e,"c",(function(){return d}));var r=n(19),a=n.n(r),u=n(46),c="__auth_provider_token__",o="https://whxxian.github.io/task/",i=function(){return window.localStorage.getItem(c)},s=function(t){var e=t.user;return window.localStorage.setItem(c,e.token||""),e},l=function(t){return fetch("".concat(o,"/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(){var t=Object(u.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.ok){t.next=6;break}return t.t0=s,t.next=4,e.json();case 4:return t.t1=t.sent,t.abrupt("return",(0,t.t0)(t.t1));case 6:return t.t2=Promise,t.next=9,e.json();case 9:return t.t3=t.sent,t.abrupt("return",t.t2.reject.call(t.t2,t.t3));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},f=function(t){return fetch("".concat(o,"/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(){var t=Object(u.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.ok){t.next=6;break}return t.t0=s,t.next=4,e.json();case 4:return t.t1=t.sent,t.abrupt("return",(0,t.t0)(t.t1));case 6:return t.t2=Promise,t.next=9,e.json();case 9:return t.t3=t.sent,t.abrupt("return",t.t2.reject.call(t.t2,t.t3));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},d=function(){var t=Object(u.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",window.localStorage.removeItem(c));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},74:function(t,e,n){"use strict";n.d(e,"f",(function(){return m})),n.d(e,"d",(function(){return h})),n.d(e,"c",(function(){return j})),n.d(e,"a",(function(){return O})),n.d(e,"b",(function(){return g})),n.d(e,"e",(function(){return w}));var r,a,u,c,o=n(94),i=n(95),s=n(231),l=n(230),f=n(405),d=n(106),b=n(0),p=n.n(b),m=i.a.div(r||(r=Object(o.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: ",";\n  margin-bottom: ",";\n  > * {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n    margin-right: ",";\n  }\n"])),(function(t){return t.between?"space-between":void 0}),(function(t){return t.marginBottom||"0rem"}),(function(t){return"number"===typeof t.gap?t.gap+"rem":t.gap?"2rem":void 0})),v=i.a.div(a||(a=Object(o.a)(["\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),h=function(){return p.a.createElement(v,null,p.a.createElement(s.a,{size:"large"}))},j=function(t){var e=t.error;return p.a.createElement(v,null,p.a.createElement(g,{error:e}),p.a.createElement(d.a,null))},O=Object(i.a)(l.a)(u||(u=Object(o.a)(["\n  padding: 0;\n"]))),g=function(t){var e,n=t.error;return(null===(e=n)||void 0===e?void 0:e.message)?p.a.createElement(f.a.Text,{type:"danger"},null===n||void 0===n?void 0:n.message):null},w=i.a.div(c||(c=Object(o.a)(["\n  padding: 3.2rem;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"])))},76:function(t,e,n){"use strict";n.d(e,"a",(function(){return v})),n.d(e,"b",(function(){return h}));var r=n(19),a=n.n(r),u=n(46),c=n(0),o=n.n(c),i=n(72),s=n(167),l=n(107),f=n(172),d=n(74),b=n(232),p=function(){var t=Object(u.a)(a.a.mark((function t(){var e,n,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=null,!(n=i.a())){t.next=7;break}return t.next=5,Object(s.a)("me",{token:n});case 5:r=t.sent,e=r.user;case 7:return t.abrupt("return",e);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),m=o.a.createContext(void 0);m.displayName="AuthContext";var v=function(t){var e=t.children,n=Object(f.a)(),r=n.data,a=n.error,u=n.isLoading,c=n.isIdle,s=n.isError,v=n.setData,h=n.run,j=Object(b.b)();return Object(l.e)((function(){h(p())})),c||u?o.a.createElement(d.d,null):s?o.a.createElement(d.c,{error:a}):o.a.createElement(m.Provider,{value:{user:r,login:function(t){return i.b(t).then(v)},register:function(t){return i.d(t).then(v)},logout:function(){return i.c().then((function(){v(null),j.clear()}))}}},e)},h=function(){var t=o.a.useContext(m);if(!t)throw new Error("userAuth \u5fc5\u987b\u5728AuthProvider\u4e2d\u662f\u4f7f\u7528");return t}}},[[404,2,3]]]);
//# sourceMappingURL=main.28c810a9.chunk.js.map