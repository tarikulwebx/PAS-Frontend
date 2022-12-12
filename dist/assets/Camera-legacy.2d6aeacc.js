!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(T){u=function(t,e,r){return t[e]=r}}function d(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,a=Object.create(o.prototype),i=new L(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return k()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=S(i,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=l(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,i),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(T){return{type:"throw",arg:T}}}r.wrap=d;var h={};function f(){}function p(){}function v(){}var g={};u(g,i,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(_([])));y&&y!==n&&o.call(y,i)&&(g=y);var w=v.prototype=f.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(e,r){function n(a,i,s,c){var u=l(e[a],e,i);if("throw"!==u.type){var d=u.arg,h=d.value;return h&&"object"==t(h)&&o.call(h,"__await")?r.resolve(h.__await).then((function(t){n("next",t,s,c)}),(function(t){n("throw",t,s,c)})):r.resolve(h).then((function(t){d.value=t,s(d)}),(function(t){return n("throw",t,s,c)}))}c(u.arg)}var a;this._invoke=function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return a=a?a.then(o,o):o()}}function S(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,S(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=v,u(w,"constructor",v),u(v,"constructor",p),p.displayName=u(v,c,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},r.awrap=function(t){return{__await:t}},x(b.prototype),u(b.prototype,s,(function(){return this})),r.AsyncIterator=b,r.async=function(t,e,n,o,a){void 0===a&&(a=Promise);var i=new b(d(t,e,n,o),a);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),u(w,c,"Generator"),u(w,i,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},r.values=_,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(R),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),R(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;R(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},r}function r(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function n(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function s(t){r(i,o,a,s,c,"next",t)}function c(t){r(i,o,a,s,c,"throw",t)}s(void 0)}))}}var o=document.createElement("style");o.innerHTML=".camera-comp[data-v-72d57fd9]{width:414px;height:414px;background:#fffefe}video.video[data-v-72d57fd9],canvas[data-v-72d57fd9]{width:414px;height:414px;object-fit:cover;aspect-ratio:1}#highlight[data-v-72d57fd9]{position:absolute;background:rgba(14,177,232,.4);border:1px solid #0eb1e8}.wrapper[data-v-72d57fd9]{background-color:#000;display:grid;width:auto;height:auto;grid-template-columns:[left] 90vw [bs] 5vw [es] 5vw [right];grid-template-rows:[top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];justify-items:center}.video[data-v-72d57fd9]{position:relative;user-select:none;max-width:unset;max-height:unset}img.cap-photo[data-v-72d57fd9]{position:relative;height:100%;width:100%}.switch-button[data-v-72d57fd9]{position:absolute;grid-column:bs / es;grid-row:bs / es;z-index:5;border-radius:100%;width:6vh;height:6vh;font-size:3vh;right:0}.gray-shed[data-v-72d57fd9]{position:absolute;background:rgba(255,255,255,.4);border:1px solid #ffffff}.colored-shed[data-v-72d57fd9]{position:absolute;background:rgba(14,177,232,.4);border:1px solid #0eb1e8}#image_text[data-v-72d57fd9]{height:414px}\n",document.head.appendChild(o),System.register(["./index-legacy.8eb7d45b.js"],(function(t){"use strict";var r,o;return{setters:[function(t){r=t.n,o=t.s}],execute:function(){var a={},i=r({components:{},data:function(){return{isShowCanvas:!1,photo:null,image:null,mediaStream:null,videoDevices:[],facingMode:"environment",counter:0,switchingCamera:!1,canva:null,selectedTexts:[],isFullPage:!0,isLoading:!1,reducedSize:0,start:0,end:0,getOcrStart:0,frontImgRes:0,delayTime:3e3,count:0,checkRes:0}},mounted:function(){this.openCamera()},beforeDestroy:function(){this.closeCamera()},methods:{openCamera:function(){var t=this;return n(e().mark((function r(){var n;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.enumerateDevices();case 2:return n=e.sent,t.videoDevices=n.filter((function(t){return"videoinput"===t.kind})),e.next=6,t.StartRecording("environment");case 6:case"end":return e.stop()}}),r)})))()},StartRecording:function(t){var r=this;return n(e().mark((function n(){var o;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.facingMode=t,(o=r.$refs.video).setAttribute("autoplay",""),o.setAttribute("muted",""),o.setAttribute("playsinline",""),e.next=7,navigator.mediaDevices.getUserMedia({video:{facingMode:t,width:500,height:500},audio:!1});case 7:return r.mediaStream=e.sent,o.srcObject=r.mediaStream,e.next=11,o.play();case 11:return e.abrupt("return",e.sent);case 12:case"end":return e.stop()}}),n)})))()},ReTakePhoto:function(){this.photo=null,this.openCamera()},TakePhoto:function(){var t=this;return n(e().mark((function r(){var n,o,a,i;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.$refs.video,t.canva=t.$refs.canva,o=n.videoWidth,a=n.videoHeight,t.canva.width=o,t.canva.height=a,i=t.canva.getContext("2d"),"user"===t.facingMode?(i.scale(-1,1),i.drawImage(n,0,0,o,a)):i.drawImage(n,0,0,o,a),i.save(),t.photo=t.canva.toDataURL("image/jpeg"),t.closeCamera(),t.start=(new Date).getTime(),t.Send();case 13:case"end":return e.stop()}}),r)})))()},closeCamera:function(){var t=this.$refs.video.srcObject;if(t){var e=t.getTracks();e[0].stop(),e.forEach((function(t){return t.stop()}))}},Send:function(){var t=this;return n(e().mark((function r(){var n,a;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isLoading=!0,(n=new FormData).append("awsInstance","t2 samll"),n.append("image",t.photo),a=(new Date).getTime(),e.next=7,t.$store.dispatch("customer/getOCRDataBySchedule",n).then((function(e){if(200===e.status_code&&0===e.data.status){var r=(new Date).getTime(),n=r-a,o=r-t.start;t.frontImgRes=o,console.log("frontStart: "+t.start+" ,frontRes: "+o),console.log("ocr request send and response time =start: "+a+" end: "+r+" res time: "+n);var i={id:e.data.id};t.getOcrStart=(new Date).getTime(),t.getOCRResult(i)}})).catch((function(e){t.isLoading=!1,o(e.response.data.error+"! "+e.response.data.message,"is-danger")}));case 7:case"end":return e.stop()}}),r)})))()},getOCRResult:function(t){var e=this;this.$store.dispatch("customer/getOCRResult",t).then((function(r){var n=(new Date).getTime(),a=n-e.checkRes;if(e.checkRes=n,console.log("ResStart : "+n+" diffRes: "+a),console.log("res er: ",e.delayTime,"count: ",e.count),1!==r.data.status){var i=e;setTimeout((function(){e.count++,1==e.count?e.delayTime=50:e.count>1&&e.delayTime>20?e.delayTime=e.delayTime-5:e.delayTime=20,console.log("setTimeOut er : ",e.delayTime,"count: ",e.count),i.getOCRResult(t)}),e.delayTime)}else{e.delayTime=3e3,e.count=0;var s=(new Date).getTime(),c=s-e.getOcrStart;console.log("successResCome : "+s+" ,SuccessResTime : "+c),console.log(r.data.status),e.isLoading=!1,null!==r.data.ocr_data||(e.ReTakePhoto(),o("認識文字が見つかりませんでした。再度試すか検索文字を入力ください。","is-danger"));var u={id:0,type:"ocr",photo:e.photo,ocrData:r.data.ocr_data,image:e.canva.toDataURL("image/jpeg")};e.$store.dispatch("global/setCapturedImages",u);var d=r.data.ocr_data;d.length>0?(e.$store.dispatch("customer/setOCROriginalResponse",d),e.makeBoundingBox(d)):o("認識文字が見つかりませんでした。再度試すか検索文字を入力ください。","is-danger")}var l=(new Date).getTime(),h=l-e.getOcrStart,f=e.frontImgRes+h;console.log("getOcrStart "+e.getOcrStart+" ,getOcrAllEnd : "+l+" , ocrAllResTime : "+h+" ,TotalRes: "+f)})).catch((function(t){e.isLoading=!1,o(t.response.data.error+"! "+t.response.data.message,"is-danger")}))},makeBoundingBox:function(t){var e=[];t.forEach((function(t,r){for(var n=[t.bounding_box.x1,t.bounding_box.x2,t.bounding_box.x3,t.bounding_box.x4],o=[t.bounding_box.y1,t.bounding_box.y2,t.bounding_box.y3,t.bounding_box.y4],a=n[0],i=n[0],s=o[0],c=o[0],u=1;u<n.length;u++)n[u]>i?i=n[u]:n[u]<a&&(a=n[u]);for(var d=1;d<o.length;d++)o[d]>c?c=o[d]:o[d]<s&&(s=o[d]);var l={id:r,text:t.text,x1:.828*a,x2:.828*i,y1:.828*s,y2:.828*c,selected:!1};e.push(l)})),this.$store.dispatch("customer/setOCRResponseElements",e)},generateImage:function(){var t=document.getElementById("img_prev"),e=document.createElement("canvas"),r=e.getContext("2d");e.setAttribute("width",500),e.setAttribute("height",500),r.drawImage(t,0,0,500,500),this.$store.state.customer.ocrResponseElements.forEach((function(t,e){r.beginPath(),r.rect(t.x1/.828,t.y1/.828,t.x2/.828-t.x1/.828,t.y2/.828-t.y1/.828),t.selected?(r.fillStyle="rgba(14, 177, 232, 0.4)",r.fill(),r.strokeStyle="#0EB1E8",r.stroke()):(r.fillStyle="rgba(255, 255, 255, 0.2)",r.fill(),r.strokeStyle="#fff",r.stroke())}));var n=e.toDataURL("image/jpeg");this.$store.dispatch("customer/setBoundingBoxImage",n)},getSelectedElement:function(t){var e=this.$store.state.customer.ocrResponseSelectedElements.find((function(e){return e.id===t.id}));e?(e.selected=!1,this.$store.state.customer.ocrResponseSelectedElements.splice(this.$store.state.customer.ocrResponseSelectedElements.indexOf(e),1)):(t.selected=!0,this.$store.dispatch("customer/setOCRResponseSelectedElements",t)),this.$emit("getText",this.$store.state.customer.ocrResponseSelectedElements)}}},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"camera-comp"},[r("video",{directives:[{name:"show",rawName:"v-show",value:!t.photo,expression:"!photo"}],ref:"video",staticClass:"video",class:"user"===t.facingMode?"front":""}),r("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowCanvas,expression:"isShowCanvas"}],staticClass:"canvas"},[r("canvas",{ref:"canva"})]),t.photo?r("div",{attrs:{id:"image_text"}},[t.photo?r("img",{staticClass:"cap-photo",attrs:{src:t.photo,alt:"photo",id:"img_prev"}}):t._e(),t._l(t.$store.state.customer.ocrResponseElements,(function(e,n){return r("div",{directives:[{name:"show",rawName:"v-show",value:t.photo&&t.$store.state.customer.ocrResponseElements.length>0,expression:"photo && $store.state.customer.ocrResponseElements.length > 0"}],key:n,class:e.selected?"colored-shed bounding-box":"gray-shed bounding-box",style:{top:e.y1+"px",left:e.x1+"px",width:e.x2-e.x1+"px",height:e.y2-e.y1+"px"},on:{click:function(r){return t.getSelectedElement(e)}}})}))],2):t._e(),r("b-loading",{attrs:{"is-full-page":t.isFullPage,"can-cancel":!1},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}})],1)}),[],!1,s,"72d57fd9",null,null);function s(t){for(var e in a)this[e]=a[e]}t("c",function(){return i.exports}())}}}))}();