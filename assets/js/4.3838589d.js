(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{358:function(t,e,n){"use strict";function r(t){return decodeURI(t).replace(e.hashRE,"").replace(e.extRE,"")}function i(t){var n=t.match(e.hashRE);if(n)return n[0]}function a(t){return e.outboundRE.test(t)}function l(t){if(a(t))return t;var n=t.match(e.hashRE),i=n?n[0]:"",l=r(t);return e.endingSlashRE.test(l)?t:l+".html"+i}function s(t,e,n){if(a(e))return{type:"external",path:e};n&&(e=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=t.charAt(0);if("/"===r)return t;if("?"===r||"#"===r)return e+t;var i=e.split("/");n&&i[i.length-1]||i.pop();for(var a=t.replace(/^\//,"").split("/"),l=0;l<a.length;l++){var s=a[l];".."===s?i.pop():"."!==s&&i.push(s)}""!==i[0]&&i.unshift("");return i.join("/")}(e,n));for(var i=r(e),s=0;s<t.length;s++)if(r(t[s].regularPath)===i)return Object.assign({},t[s],{type:"page",path:l(t[s].path)});return console.error('[vuepress] No matching page found for sidebar item "'.concat(e,'"')),{}}function u(t){var e=o(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map((function(e){return{type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}}))}]}function o(t){var e;return(t=t.map((function(t){return Object.assign({},t)}))).forEach((function(t){2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)})),t.filter((function(t){return 2===t.level}))}function c(t,e){if(Array.isArray(e))return{base:"/",config:e};for(var n in e)if(0===(r=t,/(\.html|\/)$/.test(r)?r:r+"/").indexOf(encodeURI(n)))return{base:n,config:e[n]};var r;return{}}n(37),n(30),n(61),n(359),n(122),n(360),n(204),n(90),n(63),n(7),n(64),n(36),n(125),n(197),Object.defineProperty(e,"__esModule",{value:!0}),e.resolveMatchingConfig=e.resolveNavLinkItem=e.groupHeaders=e.resolveSidebarItems=e.resolvePage=e.isActive=e.ensureExt=e.isTel=e.isMailto=e.isExternal=e.getHash=e.normalize=e.outboundRE=e.endingSlashRE=e.extRE=e.hashRE=void 0,e.hashRE=/#.*$/,e.extRE=/\.(md|html)$/,e.endingSlashRE=/\/$/,e.outboundRE=/^[a-z]+:/i,e.normalize=r,e.getHash=i,e.isExternal=a,e.isMailto=function(t){return/^mailto:/.test(t)},e.isTel=function(t){return/^tel:/.test(t)},e.ensureExt=l,e.isActive=function(t,e){var n=decodeURIComponent(t.hash),a=i(e);return(!a||n===a)&&r(t.path)===r(e)},e.resolvePage=s,e.resolveSidebarItems=function(t,e,n,r){var i=n.pages,a=n.themeConfig,l=r&&a.locales&&a.locales[r]||a;if("auto"===(t.frontmatter.sidebar||l.sidebar||a.sidebar))return u(t);var o=l.sidebar||a.sidebar;if(o){var h=c(e,o),f=h.base,p=h.config;return"auto"===p?u(t):p?p.map((function(t){return function t(e,n,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if("string"==typeof e)return s(n,e,r);if(Array.isArray(e))return Object.assign(s(n,e[0],r),{title:e[1]});var a=e.children||[];return 0===a.length&&e.path?Object.assign(s(n,e.path,r),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,initialOpenGroupIndex:e.initialOpenGroupIndex,children:a.map((function(e){return t(e,n,r,i+1)})),collapsable:!1!==e.collapsable}}(t,i,f)})):[]}return[]},e.groupHeaders=o,e.resolveNavLinkItem=function(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})},e.resolveMatchingConfig=c},359:function(t,e,n){"use strict";var r=n(12),i=n(198),a=n(10),l=n(92),s=n(19),u=n(35),o=n(62),c=n(201),h=n(199);i("match",(function(t,e,n){return[function(e){var n=u(this),i=null==e?void 0:o(e,t);return i?r(i,e,n):new RegExp(e)[t](s(n))},function(t){var r=a(this),i=s(t),u=n(e,r,i);if(u.done)return u.value;if(!r.global)return h(r,i);var o=r.unicode;r.lastIndex=0;for(var f,p=[],g=0;null!==(f=h(r,i));){var d=s(f[0]);p[g]=d,""===d&&(r.lastIndex=c(i,l(r.lastIndex),o)),g++}return 0===g?null:p}]}))},360:function(t,e,n){"use strict";var r=n(31),i=n(12),a=n(3),l=n(198),s=n(202),u=n(10),o=n(35),c=n(126),h=n(201),f=n(92),p=n(19),g=n(62),d=n(203),v=n(199),b=n(94),x=n(200),m=n(4),k=x.UNSUPPORTED_Y,E=Math.min,R=[].push,I=a(/./.exec),y=a(R),O=a("".slice);l("split",(function(t,e,n){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var a=p(o(this)),l=void 0===n?4294967295:n>>>0;if(0===l)return[];if(void 0===t)return[a];if(!s(t))return i(e,a,t,l);for(var u,c,h,f=[],g=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,x=new RegExp(t.source,g+"g");(u=i(b,x,a))&&!((c=x.lastIndex)>v&&(y(f,O(a,v,u.index)),u.length>1&&u.index<a.length&&r(R,f,d(u,1)),h=u[0].length,v=c,f.length>=l));)x.lastIndex===u.index&&x.lastIndex++;return v===a.length?!h&&I(x,"")||y(f,""):y(f,O(a,v)),f.length>l?d(f,0,l):f}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:i(e,this,t,n)}:e,[function(e,n){var r=o(this),l=null==e?void 0:g(e,t);return l?i(l,e,r,n):i(a,p(r),e,n)},function(t,r){var i=u(this),l=p(t),s=n(a,i,l,r,a!==e);if(s.done)return s.value;var o=c(i,RegExp),g=i.unicode,d=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(k?"g":"y"),b=new o(k?"^(?:"+i.source+")":i,d),x=void 0===r?4294967295:r>>>0;if(0===x)return[];if(0===l.length)return null===v(b,l)?[l]:[];for(var m=0,R=0,I=[];R<l.length;){b.lastIndex=k?0:R;var _,j=v(b,k?O(l,R):l);if(null===j||(_=E(f(b.lastIndex+(k?R:0)),l.length))===m)R=h(l,R,g);else{if(y(I,O(l,m,R)),I.length===x)return I;for(var S=1;S<=j.length-1;S++)if(y(I,j[S]),I.length===x)return I;R=m=_}}return y(I,O(l,m)),I}]}),!!m((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),k)},361:function(t,e,n){"use strict";var r=n(2),i=n(363);r({target:"String",proto:!0,forced:n(364)("link")},{link:function(t){return i(this,"a","href",t)}})},363:function(t,e,n){var r=n(3),i=n(35),a=n(19),l=/"/g,s=r("".replace);t.exports=function(t,e,n,r){var u=a(i(t)),o="<"+e;return""!==n&&(o+=" "+n+'="'+s(a(r),l,"&quot;")+'"'),o+">"+u+"</"+e+">"}},364:function(t,e,n){var r=n(4);t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},468:function(t,e,n){"use strict";n.r(e);n(123),n(7),n(91),n(361);var r=n(358),i={name:"VPLink",props:{text:{type:String,required:!0},link:{type:String,required:!0},target:{type:String},rel:{type:String}},computed:{exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some((function(e){return e===t.link})):"/"===this.link},isNonHttpURI:function(){return Object(r.isMailto)(this.link)||Object(r.isTel)(this.link)},isBlankTarget:function(){return"_blank"===this.target},isInternal:function(){return!Object(r.isExternal)(this.link)&&!this.isBlankTarget},normalizedTarget:function(){return this.isNonHttpURI?null:this.target?this.target:Object(r.isExternal)(this.link)?"_blank":""},normalizedRel:function(){return this.isNonHttpURI||!1===this.rel?null:this.rel?this.rel:this.isBlankTarget?"noopener noreferrer":null}},methods:{focusoutAction:function(){this.$emit("focusout")}}},a=n(60),l=Object(a.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isInternal?n("RouterLink",{staticClass:"vp-link",attrs:{to:t.link,exact:t.exact},nativeOn:{focusout:function(e){return t.focusoutAction.apply(null,arguments)}}},[t._t("before"),t._v("\n  "+t._s(t.text)+"\n  "),t._t("after")],2):n("a",{staticClass:"vp-link external",attrs:{href:t.link,target:t.normalizedTarget,rel:t.normalizedRel},on:{focusout:t.focusoutAction}},[t._t("before"),t._v("\n  "+t._s(t.text)+"\n  "),t.isBlankTarget?n("VPIconExternalLink"):t._e(),t._v(" "),t._t("after")],2)}),[],!1,null,null,null);e.default=l.exports}}]);