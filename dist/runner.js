parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"C9JJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.runner=void 0,exports.runner={hostname:"127.0.0.1",port:3003};
},{}],"cKRm":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,a){function u(e){try{c(n.next(e))}catch(t){a(t)}}function s(e){try{c(n.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(u,s)}c((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,n=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){u=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){u.label=a[1];break}if(6===a[0]&&u.label<o[1]){u.label=o[1],o=a;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(a);break}o[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(s){a=[6,s],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}},r=this&&this.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise(function(n,o){(function(e,t,r,n){Promise.resolve(n).then(function(t){e({value:t,done:r})},t)})(n,o,(t=e[r](t)).done,t.value)})}}},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var o,a=n(require("http")),u=require("puppeteer"),s=require("./config"),c=s.runner.hostname,i=s.runner.port,l=function(){return e(void 0,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return console.log("launch browser"),[4,u.launch()];case 1:return[4,(o=e.sent()).newPage()];case 2:return[4,e.sent().goto("http://localhost:1234")];case 3:return e.sent(),[2]}})})},f=a.default.createServer(function(n,a){var u,s;return e(void 0,void 0,void 0,function(){var e,c,i,l,h,p,d,v,y,b,w;return t(this,function(t){switch(t.label){case 0:if(e=null===(w=n.url)||void 0===w?void 0:w.split(/\//g),c=e[1],i=e[2],a.setHeader("Access-Control-Allow-Origin","*"),a.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),"log"!==c)return[3,13];l=[],t.label=1;case 1:t.trys.push([1,6,7,12]),u=r(n),t.label=2;case 2:return[4,u.next()];case 3:if((s=t.sent()).done)return[3,5];h=s.value,l.push(h),t.label=4;case 4:return[3,2];case 5:return[3,12];case 6:return p=t.sent(),y={error:p},[3,12];case 7:return t.trys.push([7,,10,11]),s&&!s.done&&(b=u.return)?[4,b.call(u)]:[3,9];case 8:t.sent(),t.label=9;case 9:return[3,11];case 10:if(y)throw y.error;return[7];case 11:return[7];case 12:d=Buffer.concat(l).toString(),v="{"===d[0]?JSON.parse(d):d,console.log(v),t.label=13;case 13:return"exit"!==c?[3,15]:[4,o.close()];case 14:t.sent(),f.close(),process.exit("fail"===i?1:0),t.label=15;case 15:return a.end("OK"),[2]}})})});f.listen(i,c,function(){console.log("Server running at http://"+c+":"+i+"/")}),l();
},{"./config":"C9JJ"}]},{},["cKRm"], null)
//# sourceMappingURL=/runner.js.map