!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return i};var i={},a=Object.prototype,r=a.hasOwnProperty,s="function"==typeof Symbol?Symbol:{},n=s.iterator||"@@iterator",o=s.asyncIterator||"@@asyncIterator",c=s.toStringTag||"@@toStringTag";function l(e,t,i){return Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(E){l=function(e,t,i){return e[t]=i}}function d(e,t,i,a){var r=t&&t.prototype instanceof f?t:f,s=Object.create(r.prototype),n=new T(a||[]);return s._invoke=function(e,t,i){var a="suspendedStart";return function(r,s){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw s;return L()}for(i.method=r,i.arg=s;;){var n=i.delegate;if(n){var o=k(n,i);if(o){if(o===u)continue;return o}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if("suspendedStart"===a)throw a="completed",i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);a="executing";var c=p(e,t,i);if("normal"===c.type){if(a=i.done?"completed":"suspendedYield",c.arg===u)continue;return{value:c.arg,done:i.done}}"throw"===c.type&&(a="completed",i.method="throw",i.arg=c.arg)}}}(e,i,n),s}function p(e,t,i){try{return{type:"normal",arg:e.call(t,i)}}catch(E){return{type:"throw",arg:E}}}i.wrap=d;var u={};function f(){}function g(){}function h(){}var b={};l(b,n,(function(){return this}));var m=Object.getPrototypeOf,v=m&&m(m($([])));v&&v!==a&&r.call(v,n)&&(b=v);var x=h.prototype=f.prototype=Object.create(b);function _(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function y(t,i){function a(s,n,o,c){var l=p(t[s],t,n);if("throw"!==l.type){var d=l.arg,u=d.value;return u&&"object"==e(u)&&r.call(u,"__await")?i.resolve(u.__await).then((function(e){a("next",e,o,c)}),(function(e){a("throw",e,o,c)})):i.resolve(u).then((function(e){d.value=e,o(d)}),(function(e){return a("throw",e,o,c)}))}c(l.arg)}var s;this._invoke=function(e,t){function r(){return new i((function(i,r){a(e,t,i,r)}))}return s=s?s.then(r,r):r()}}function k(e,t){var i=e.iterator[t.method];if(void 0===i){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method))return u;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var a=p(i,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,u;var r=a.arg;return r?r.done?(t[e.resultName]=r.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,u):r:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,u)}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0)}function $(e){if(e){var t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,a=function t(){for(;++i<e.length;)if(r.call(e,i))return t.value=e[i],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:L}}function L(){return{value:void 0,done:!0}}return g.prototype=h,l(x,"constructor",h),l(h,"constructor",g),g.displayName=l(h,c,"GeneratorFunction"),i.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},i.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,l(e,c,"GeneratorFunction")),e.prototype=Object.create(x),e},i.awrap=function(e){return{__await:e}},_(y.prototype),l(y.prototype,o,(function(){return this})),i.AsyncIterator=y,i.async=function(e,t,a,r,s){void 0===s&&(s=Promise);var n=new y(d(e,t,a,r),s);return i.isGeneratorFunction(t)?n:n.next().then((function(e){return e.done?e.value:n.next()}))},_(x),l(x,c,"Generator"),l(x,n,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),i.keys=function(e){var t=[];for(var i in e)t.push(i);return t.reverse(),function i(){for(;t.length;){var a=t.pop();if(a in e)return i.value=a,i.done=!1,i}return i.done=!0,i}},i.values=$,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function i(i,a){return n.type="throw",n.arg=e,t.next=i,a&&(t.method="next",t.arg=void 0),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var s=this.tryEntries[a],n=s.completion;if("root"===s.tryLoc)return i("end");if(s.tryLoc<=this.prev){var o=r.call(s,"catchLoc"),c=r.call(s,"finallyLoc");if(o&&c){if(this.prev<s.catchLoc)return i(s.catchLoc,!0);if(this.prev<s.finallyLoc)return i(s.finallyLoc)}else if(o){if(this.prev<s.catchLoc)return i(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return i(s.finallyLoc)}}}},abrupt:function(e,t){for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var s=a;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var n=s?s.completion:{};return n.type=e,n.arg=t,s?(this.method="next",this.next=s.finallyLoc,u):this.complete(n)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),u},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var i=this.tryEntries[t];if(i.finallyLoc===e)return this.complete(i.completion,i.afterLoc),C(i),u}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var i=this.tryEntries[t];if(i.tryLoc===e){var a=i.completion;if("throw"===a.type){var r=a.arg;C(i)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,i){return this.delegate={iterator:$(e),resultName:t,nextLoc:i},"next"===this.method&&(this.arg=void 0),u}},i}function i(e,t,i,a,r,s,n){try{var o=e[s](n),c=o.value}catch(l){return void i(l)}o.done?t(c):Promise.resolve(c).then(a,r)}var a=document.createElement("style");a.innerHTML=".field-gap[data-v-7eb0c00a]{margin-bottom:24px}.top-bar[data-v-7eb0c00a]{width:100%;background-color:#fff5f2;border-bottom:1px solid #e94719;padding:20px 20px 6px;gap:10px;z-index:2}.customer-info p[data-v-7eb0c00a]{font-weight:300;font-size:16px;line-height:24px;color:#121723}.payment-info .pay[data-v-7eb0c00a]{font-weight:600;font-size:14px;line-height:21px;color:#9199a6}.payment-info .amount[data-v-7eb0c00a]{font-weight:300;font-size:16px;line-height:24px;color:#121723}.payment-info .color-txt[data-v-7eb0c00a]{font-weight:300;font-size:14px;line-height:21px;color:#e94719}.register-form[data-v-7eb0c00a]{padding-top:39.5%}.label[data-v-7eb0c00a]{display:flex;align-content:center;align-items:center;flex-direction:row;padding-bottom:4px}.label .label-name[data-v-7eb0c00a]{font-weight:600;font-size:16px;line-height:24px;color:#9199a6;padding:3px}.label .flag[data-v-7eb0c00a]{font-weight:500;font-size:12px;line-height:12px;color:#e94719;background:#ffe4dc;border-radius:4px;padding:3px 4px;margin-left:8px}.border[data-v-7eb0c00a]{border:1px solid #9199a6;border-radius:70px;width:100%;padding-left:8px;padding-right:7px;height:100%;display:flex}.full-width[data-v-7eb0c00a]{background:#ffffff;width:100%;height:40px;display:flex;flex-direction:row;align-items:center;margin:0 auto}.half-width[data-v-7eb0c00a]{width:50%;height:40px;border-radius:70px;display:flex;flex-direction:row;align-items:center;margin-top:8px}.half-width[data-v-7eb0c00a]:nth-child(n + 2){padding-right:8px}.half-width[data-v-7eb0c00a]:nth-child(2n + 1){padding-left:8px}.mix-width[data-v-7eb0c00a]{width:auto;height:40px;display:flex;flex-direction:row;align-items:center}.mix-width .b-radio.radio[data-v-7eb0c00a]:not(.button){margin-right:0!important}.selected[data-v-7eb0c00a]{background:#fff5f2!important;border:1px solid #e94719!important}.half-width span[data-v-7eb0c00a],.half-width span[data-v-7eb0c00a],.field.mix-width span[data-v-7eb0c00a]{font-weight:300;font-size:16px;line-height:24px;color:#121723}.control .sign[data-v-7eb0c00a]{padding:17px 12px;width:40px;height:50px;background:#e1e3e8}.field.has-addons[data-v-7eb0c00a]{display:flex;justify-content:flex-start;align-items:center}.cost[data-v-7eb0c00a]{width:100%;background:#ffffff;border:1px solid #e1e3e8!important}.receipt-status[data-v-7eb0c00a]{background:#f1f2f5;border-radius:4px;height:50px;display:flex;align-items:center;margin-left:16px;margin-right:16px}.receipt-status p[data-v-7eb0c00a]{font-weight:300;font-size:16px;line-height:24px;color:#121723;margin:0 18px}.receipt-status button.button.button-status[data-v-7eb0c00a]{background:#ffffff;border:1px solid #e94719;border-radius:60px}.receipt-status span.btn-txt[data-v-7eb0c00a]{font-weight:300;font-size:20px;line-height:24px;color:#e94719}.histories[data-v-7eb0c00a]{border:1px solid #cbcfd6;border-radius:6px;margin-left:16px;margin-right:16px}.head[data-v-7eb0c00a]{background:#f1f2f5}.head h2[data-v-7eb0c00a]{font-weight:300;font-size:16px;line-height:24px;color:#606775;padding:6px 12px}.body .history[data-v-7eb0c00a]{border-bottom:1px solid #cbcfd6;padding:6px 12px}.body .history p[data-v-7eb0c00a]{font-size:14px;font-weight:300;color:#373737}.address-label[data-v-7eb0c00a]{border:1px solid #cbcfd6;border-radius:6px;margin-left:16px;margin-right:16px}.address-label span[data-v-7eb0c00a]{font-weight:300;font-size:16px;line-height:100%;color:#121723}label.b-checkbox.checkbox[data-v-7eb0c00a]{padding:18px}.packing-fee[data-v-7eb0c00a],.cardboard-fee[data-v-7eb0c00a]{display:flex;flex-direction:row;align-content:center;justify-content:center;align-items:center;flex-wrap:nowrap;width:100%}.packing-fee .field-title[data-v-7eb0c00a],.cardboard-fee .field-title[data-v-7eb0c00a]{width:40%;font-weight:300;font-size:14px;line-height:21px;color:#606775}.mail-type[data-v-7eb0c00a]{border-top:1px solid #cbcfd6;padding-top:24px}.remarks[data-v-7eb0c00a]{border-bottom:1px solid #cbcfd6}.mail-type .label[data-v-7eb0c00a]{font-weight:600;font-size:16px;line-height:24px;color:#121723;padding-bottom:8px}.footer[data-v-7eb0c00a]{padding:24px 16px;background-color:#fff;border-top:1px solid #cbcfd6}.footer button.button.button-cancel[data-v-7eb0c00a]{width:28%;height:72px;margin-right:7%}.footer button.button.button-save.btn-orange[data-v-7eb0c00a]{width:65%;height:72px;color:#fff}.footer .btn-txt[data-v-7eb0c00a]{font-weight:600;font-size:20px;line-height:30px}#register-input[data-v-7eb0c00a]{display:flex;flex-direction:column;height:100vh;width:100vw}.top-bar[data-v-7eb0c00a]{max-width:414px;background-color:#fff5f2;border-bottom:1px solid #e94719;padding:20px 20px 6px;z-index:2}.payment-info .color-txt[data-v-7eb0c00a]{white-space:pre-wrap;font-weight:300;font-size:14px;line-height:1.5;color:#e94719}.register-form[data-v-7eb0c00a]{flex:1;overflow-y:scroll;padding-top:20px;max-width:414px}\n",document.head.appendChild(a),System.register(["./index-legacy.80d37ccf.js"],(function(e){"use strict";var a,r;return{setters:[function(e){a=e.n,r=e.s}],execute:function(){var s={data:function(){var e=new Date;return{labelPosition:"right",isFullPage:!0,isLoading:!1,Azukarikin:0,totalCost:0,histories:[],NoticeMessage:"",userID:"",selectedCustomer:{},uketori:1,register:{ArriveDate:null,Type:1,Jippi:0,t_number:"",JippiTransfer:0,packing_val:0,packing_cardboard_val:0,receipt_status:null,TransferDate:new Date(e.getFullYear(),e.getMonth(),e.getDate()),Remark:"",Note:"",TransferType:"",image:[],label_check:0,openSearch:[],ocr:[],ocrImage:"",selected_text:[]},receipt_types:[{id:1,name:"普通郵便（メール便含む)",cost:0},{id:3,name:"書留",cost:300},{id:12,name:"レターパック",cost:300},{id:4,name:"宅急便",cost:300},{id:13,name:"不在票",cost:0},{id:14,name:"その他",cost:0}],transfer_types:[{id:11,name:"普通郵便",cost:200},{id:12,name:"レターパック",cost:425},{id:15,name:"同梱",cost:0},{id:3,name:"宅急便",cost:0},{id:5,name:"FAX転送",cost:100},{id:10,name:"その他",cost:0},{id:14,name:"無し",cost:0}],remarks:[{id:0,name:"テンプレート未選択",remark:"",minHeight:"8em"},{id:1,name:"屋号（保管）",remark:"ご登録のない屋号にて到着しております。\n屋号のご登録をお願い致します。メールにて屋号登録の申請をお願い致します。\nご申請いただけない場合は差出人様へ返還対応となりますので、お早めにお手続きをお願い致します。\n登録完了後のお渡しとなりますのでご了承ください。",minHeight:"18em"},{id:2,name:"デポ不足（保管）",remark:"デポジットが不足しているため保管対応とさせていただきます。\n※デポジットが不足している場合は転送ができませんのでご了承ください。\n残金をご確認いただき、ご入金をお願い致します。",minHeight:"12em"},{id:3,name:"デポ不足（不在票）",remark:"デポジットが不足しているため不在票対応とさせていただきます。\n残金をご確認いただきご入金をお願い致します。\n再配達は保管期間をご確認いただき、ご入金後お手数ではございますがご自身でお願い致します。\n配達業者：\n種類：\n伝票番号（追跡番号）：\n電話番号：　　　　　　　　　　　　または\n保管期間：\n郵便番号（または営業所）：\n配達時間：午前中→1    12～14時→2   14～16時→3    16～18時→4",minHeight:"25em"},{id:4,name:"法人（保管）",remark:"ご登録のない法人名にて到着しております。\n履歴事項全部証明書の全ページをご提出いただき、個人から法人への切替をお願い致します。\n※ご提出はPDFもしくは画像にしていただきメール添付でお願い致します。（電子版不可・6ヶ月以内に発行されたもの）\n履歴事項全部証明書提出後のお渡しとなりますのでご了承ください。\n法人への切替をご申請いただけない場合は差出人様へ返還対応となりますので、お早めにお手続きをお願い致します。",minHeight:"20em"},{id:5,name:"法人（不在票）",remark:"ご登録のない法人名にて到着しているため不在票対応とさせていただきます。\n履歴事項全部証明書の全ページをご提出いただき、個人から法人への切替をお願い致します。\n再配達は保管期間をご確認いただき、切替申請後お手数ではございますがご自身でお願い致します。\n配達業者：\n種類：\n保管期間：\n伝票番号（追跡番号）：\n電話番号：　　　　　　　　　　　または\n郵便番号（または営業所）：\n配達時間：午前中→1    12～14時→2   14～16時→3    16～18時→4",minHeight:"25em"},{id:6,name:"クール便・生物（不在票）",remark:"お受取ができないため不在票にて対応しております。\n※生物やクール便は保管ができないため不在票とさせて頂きます。\n再配達は保管期間をご確認いただき、お手数ではございますが会員様ご自身で転送先の変更をお願い致します。\n配達業者：\n種類：\n伝票番号（追跡番号）：\n電話番号：　　　　　　　　　　　または\n保管期間：\n郵便番号（または営業所）：\n配達時間：午前中→1    12～14時→2   14～16時→3    16～18時→4",minHeight:"25em"}]}},watch:{register:{handler:function(e){var t=document.getElementById("textarea");"屋号（保管）"==e.remarks&&(t.style.height="500px")},deep:!0}},created:function(){this.setArriveDate(),this.register.CustomerID=this.$store.state.global.userSelections.customerId,this.register.Note=this.$store.state.user.userid,this.selectedCustomer=this.$store.state.global.userSelections.customer,this.getData()},methods:{setArriveDate:function(){this.$store.state.global.userSelections.initial&&(this.register.ArriveDate=new Date(this.$store.state.global.userSelections.initial.date))},getData:function(){var e,a=this;return(e=t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.isLoading=!0,e.next=3,a.$store.dispatch("customer/getCustomerData",a.register.CustomerID).then((function(e){a.isLoading=!1,200===e.status_code?(a.Azukarikin=e.balance.Azukarikin,a.histories=e.history,a.uketori=e.balance.uketori,a.NoticeMessage=e.balance.NoticeMessage,a.register.label_check=1==e.balance.label_check,a.isLoading=!1):(a.isLoading=!1,r(e.message,"is-danger"))})).catch((function(e){a.isLoading=!1,r(e.message,"is-danger")}));case 3:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(r,s){var n=e.apply(t,a);function o(e){i(n,r,s,o,c,"next",e)}function c(e){i(n,r,s,o,c,"throw",e)}o(void 0)}))})()},cancel:function(){this.$router.push("/captured-images")},getOcrOriginalSelected:function(){var e=this,t=[];this.$store.state.customer.ocrResponseSelectedElements.forEach((function(i){var a=e.$store.state.customer.ocrOriginalResponse.find((function(e,t){return t===i.id}));a&&t.push(a)})),this.$store.dispatch("customer/setOCROriginalResponseSelectedElements",t)},save:function(){var e=this;if("Invalid Date"==this.register.ArriveDate||null==this.register.ArriveDate)r("受取日を選択してください。","is-danger");else if(this.register.CustomerID)if(""==this.register.TransferType)r("転送種類を選んでください。","is-danger");else if(null==this.register.Jippi)r("実費費用（受取）を入力してください。","is-danger");else if(null==this.register.JippiTransfer)r("実費費用（転送）を入力してください。","is-danger");else{var t=this.register.Jippi+this.register.JippiTransfer+this.register.packing_val+this.register.packing_cardboard_val;if(t>this.Azukarikin)r("デポジットが不足しています","is-danger");else this.getOcrOriginalSelected(),this.isLoading=!0,this.$store.state.global.capturedImages.forEach((function(t){e.register.image.push(t.image)})),this.register.openSearch=this.$store.state.customer.topFiveCustomers,this.register.ocr=this.$store.state.customer.ocrOriginalResponse,this.register.ocrImage=this.$store.state.customer.boundingBoxImage,this.register.selected_text=this.$store.state.customer.ocrOriginalResponseSelectedElements,this.register.totalCost=t,this.register.uketori=this.uketori,this.register.DateArrive=new Date(this.register.ArriveDate).toLocaleDateString("ja-JP"),this.register.DateTransfer=new Date(this.register.TransferDate).toLocaleDateString("ja-JP"),this.register.label_check?this.register.label_check=1:this.register.label_check=0,this.$store.dispatch("customer/registerNewDocument",this.register).then((function(t){e.isLoading=!1,200===t.status_code?(r(t.message,"is-success"),e.$router.push({path:"/registration-complete",query:{Azukarikin:e.Azukarikin,data:t.data}})):r(t.message,"is-danger")})).catch((function(t){e.isLoading=!1,r(t.response.data.message,"is-danger")}))}else this.$router.push("/"),this.$store.dispatch("customer/refreshCustomerStore"),this.$store.dispatch("global/refreshGlobalStore"),r("検索画面へ戻り、転送先の会員を選択しなおしてください。","is-danger")},getReceiptType:function(e){this.register.Jippi=e.cost},getActualCostTransfer:function(e){this.register.JippiTransfer=e.cost},getPackingFee:function(){this.register.is_packing?(this.register.packing_val=550,this.register.is_packing=1):(this.register.packing_val=0,this.register.is_packing=0)},getCardboardFee:function(){this.register.is_packing_cardboard?(this.register.packing_cardboard_val=230,this.register.is_packing_cardboard=1):(this.register.packing_cardboard_val=0,this.register.is_packing_cardboard=0)},getRemark:function(e){this.register.Remark=e.remark,document.getElementById("textarea").style.height=e.minHeight}}},n={},o=a(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"register-input"}},[i("div",{staticClass:"top-bar"},[e.selectedCustomer?i("div",{staticClass:"customer-info"},[e.selectedCustomer.CompanyName1||e.selectedCustomer.CompanyName2?i("div",[i("p",{staticClass:"name1"},[e._v(" "+e._s(e.selectedCustomer.CompanyName1?e.selectedCustomer.CompanyName1:"")+" ")]),i("p",{staticClass:"name2"},[e._v(" "+e._s(e.selectedCustomer.CompanyName2?e.selectedCustomer.CompanyName2:"")+" ")])]):e.selectedCustomer.NameBillTo||e.selectedCustomer.concat_Name_person?i("div",[i("p",{staticClass:"billto"},[e._v(" "+e._s(e.selectedCustomer.NameBillTo?e.selectedCustomer.NameBillTo:"")+" ")]),i("p",{staticClass:"concat"},[e._v(" "+e._s(e.selectedCustomer.concat_Name_person?e.selectedCustomer.concat_Name_person:"")+" ")])]):e._e()]):e._e(),i("div",{staticClass:"payment-info"},[i("p",[i("span",{staticClass:"pay"},[e._v("デポジット残高")]),i("span",{staticClass:"amount"},[e._v(" "+e._s(e.Azukarikin)+" 円")])]),i("p",{staticClass:"color-txt"},[e._v(e._s(e.NoticeMessage?e.NoticeMessage:""))])])]),i("div",{staticClass:"register-form"},[i("div",{staticClass:"receipt-date field-gap container-fluid"},[e._m(0),i("b-field",[i("b-datepicker",{attrs:{locale:"ja-JP",editable:""},model:{value:e.register.ArriveDate,callback:function(t){e.$set(e.register,"ArriveDate",t)},expression:"register.ArriveDate"}})],1)],1),i("div",{staticClass:"receipt-type field-gap container-fluid"},[e._m(1),i("div",{staticClass:"row"},e._l(e.receipt_types,(function(t,a){return i("div",{key:a,class:[1==t.id?"full-width":"half-width"]},[i("b-field",{class:[e.register.Type==t.id?"border selected":"border"]},[i("b-radio",{attrs:{"native-value":t.id,type:"is-danger"},on:{input:function(i){return e.getReceiptType(t)}},model:{value:e.register.Type,callback:function(t){e.$set(e.register,"Type",t)},expression:"register.Type"}},[i("span",{staticClass:"radio-txt"},[e._v(e._s(t.name))])])],1)],1)})),0)]),i("div",{staticClass:"actual-cost field-gap container-fluid"},[e._m(2),i("b-field",{attrs:{"label-position":e.labelPosition}},[i("b-numberinput",{staticClass:"cost",model:{value:e.register.Jippi,callback:function(t){e.$set(e.register,"Jippi",t)},expression:"register.Jippi"}}),i("p",{staticClass:"control"},[i("span",{staticClass:"sign"},[e._v("円")])])],1)],1),i("div",{staticClass:"receipt-status field-gap"},[i("p",[e._v("受取状態")]),i("b-button",{staticClass:"button-status"},[0===e.uketori?i("span",{staticClass:"btn-txt"},[e._v("転送")]):e._e(),1===e.uketori?i("span",{staticClass:"btn-txt"},[e._v("都度転送")]):e._e(),2===e.uketori?i("span",{staticClass:"btn-txt"},[e._v("来店")]):e._e(),3===e.uketori?i("span",{staticClass:"btn-txt"},[e._v("その他")]):e._e()])],1),i("div",{staticClass:"receipt-date field-gap transfer-shipping-date container-fluid"},[e._m(3),i("b-field",[i("b-datepicker",{attrs:{locale:"ja-JP",editable:""},model:{value:e.register.TransferDate,callback:function(t){e.$set(e.register,"TransferDate",t)},expression:"register.TransferDate"}})],1)],1),e.isLoading?e._e():i("div",{staticClass:"histories field-gap"},[i("div",{staticClass:"head"},[i("h2",[e._v("登録履歴（最新"+e._s(e.histories.length)+"件）")])]),i("div",{staticClass:"body"},[e.histories.length>0?i("div",e._l(e.histories,(function(t,a){return i("div",{key:a,staticClass:"history"},[i("p",[e._v(" 転送発送日: "+e._s(t.DateTransfer?t.DateTransfer:"")+" ")]),i("p",[e._v(" 転送種類："+e._s(e.transfer_types.find((function(e){return e.id===t.TransferType}))?e.transfer_types.find((function(e){return e.id===t.TransferType})).name:"")+" ")]),i("p",[e._v(" 実費費用（転送）："+e._s(t.JippiTransfer?t.JippiTransfer:"0")+" 円 ")])])})),0):i("div",[e._m(4)])])]),i("div",{class:e.register.label_check?"selected address-label field-gap":"address-label field-gap"},[i("b-checkbox",{attrs:{"native-value":"true"},model:{value:e.register.label_check,callback:function(t){e.$set(e.register,"label_check",t)},expression:"register.label_check"}},[i("span",[e._v("ラベル印刷")])])],1),i("div",{staticClass:"receipt-type transfer-type field-gap container-fluid"},[e._m(5),i("div",{staticClass:"row"},e._l(e.transfer_types,(function(t,a){return i("div",{key:a,class:[11==t.id?"full-width":"half-width"]},[i("b-field",{class:e.register.TransferType==t.id?"border selected":"border"},[i("b-radio",{attrs:{"native-value":t.id,type:"is-danger"},on:{input:function(i){return e.getActualCostTransfer(t)}},model:{value:e.register.TransferType,callback:function(t){e.$set(e.register,"TransferType",t)},expression:"register.TransferType"}},[i("span",[e._v(e._s(t.name))])])],1)],1)})),0)]),i("div",{staticClass:"actual-cost field-gap container-fluid"},[e._m(6),i("b-field",{attrs:{"label-position":e.labelPosition}},[i("b-numberinput",{staticClass:"cost",model:{value:e.register.JippiTransfer,callback:function(t){e.$set(e.register,"JippiTransfer",t)},expression:"register.JippiTransfer"}}),i("p",{staticClass:"control"},[i("span",{staticClass:"sign"},[e._v("円")])])],1)],1),i("div",{staticClass:"packing-fee field-gap container-fluid"},[i("p",{staticClass:"field-title"},[e._v("梱包代")]),i("b-field",[i("b-switch",{on:{input:e.getPackingFee},model:{value:e.register.is_packing,callback:function(t){e.$set(e.register,"is_packing",t)},expression:"register.is_packing"}})],1),i("b-field",{attrs:{"label-position":e.labelPosition}},[i("b-numberinput",{staticClass:"cost",attrs:{disabled:!e.register.is_packing},model:{value:e.register.packing_val,callback:function(t){e.$set(e.register,"packing_val",t)},expression:"register.packing_val"}}),i("p",{staticClass:"control"},[i("span",{staticClass:"sign"},[e._v("円")])])],1)],1),i("div",{staticClass:"cardboard-fee field-gap container-fluid"},[i("p",{staticClass:"field-title"},[e._v("ダンボール代")]),i("b-field",[i("b-switch",{on:{input:e.getCardboardFee},model:{value:e.register.is_packing_cardboard,callback:function(t){e.$set(e.register,"is_packing_cardboard",t)},expression:"register.is_packing_cardboard"}})],1),i("b-field",{attrs:{"label-position":e.labelPosition}},[i("b-numberinput",{staticClass:"cost",attrs:{disabled:!e.register.is_packing_cardboard},model:{value:e.register.packing_cardboard_val,callback:function(t){e.$set(e.register,"packing_cardboard_val",t)},expression:"register.packing_cardboard_val"}}),i("p",{staticClass:"control"},[i("span",{staticClass:"sign"},[e._v("円")])])],1)],1),i("div",{staticClass:"traking_number field-gap container-fluid"},[e._m(7),i("b-field",{attrs:{"label-position":e.labelPosition}},[i("b-input",{model:{value:e.register.t_number,callback:function(t){e.$set(e.register,"t_number",t)},expression:"register.t_number"}})],1)],1),i("div",{staticClass:"mail-type field-gap container-fluid"},[i("p",{staticClass:"label field-gap"},[e._v("備考（お客様に公開されます）")]),i("div",{staticClass:"row mix-row"},e._l(e.remarks,(function(t,a){return i("div",{key:a,staticClass:"mix-width"},[i("b-field",{class:e.register.MailType==t.id?"border selected":"border"},[i("b-radio",{attrs:{"native-value":t.id,type:"is-danger"},on:{input:function(i){return e.getRemark(t)}},model:{value:e.register.MailType,callback:function(t){e.$set(e.register,"MailType",t)},expression:"register.MailType"}},[i("span",[e._v(e._s(t.name))])])],1)],1)})),0)]),i("div",{staticClass:"remarks field-gap container-fluid"},[i("b-field",{attrs:{horizontal:""}},[i("b-input",{ref:"text",attrs:{id:"textarea",maxlength:"500",type:"textarea"},model:{value:e.register.Remark,callback:function(t){e.$set(e.register,"Remark",t)},expression:"register.Remark"}})],1)],1),i("div",{staticClass:"internal-memo field-gap container-fluid"},[e._m(8),i("b-field",{attrs:{horizontal:""}},[i("b-input",{ref:"text",attrs:{placeholder:"oyanagi",maxlength:"500",type:"textarea"},model:{value:e.register.Note,callback:function(t){e.$set(e.register,"Note",t)},expression:"register.Note"}})],1)],1),i("div",{staticClass:"footer"},[i("div",{staticClass:"button-group"},[i("b-button",{staticClass:"button-cancel",on:{click:e.cancel}},[i("span",{staticClass:"btn-txt"},[e._v("戻る")])]),i("b-button",{staticClass:"button-save btn-orange",attrs:{disabled:!e.register.TransferType||null===e.register.Jippi||null===e.register.JippiTransfer||null===e.register.ArriveDate},on:{click:e.save}},[i("span",{staticClass:"btn-txt"},[e._v("登録する")])])],1)])]),i("b-loading",{attrs:{"is-full-page":e.isFullPage,"can-cancel":!1},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}})],1)}),[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("受取日")]),e._v(" "),i("span",{staticClass:"flag"},[e._v("必須")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("受取種類")]),i("span",{staticClass:"flag"},[e._v("必須")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("実費費用（受取）")]),i("span",{staticClass:"flag"},[e._v("必須")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("転送発送日")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"history"},[t("p")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("転送種類")]),i("span",{staticClass:"flag"},[e._v("必須")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("実費費用（転送）")]),i("span",{staticClass:"flag"},[e._v("必須")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("追跡番号")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"label"},[i("span",{staticClass:"label-name"},[e._v("内部メモ（非公開）")])])}],!1,c,"7eb0c00a",null,null);function c(e){for(var t in n)this[t]=n[t]}e("default",function(){return o.exports}())}}}))}();
