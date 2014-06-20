!function n(t,r,e){function u(o,a){if(!r[o]){if(!t[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=r[o]={exports:{}};t[o][0].call(l.exports,function(n){var r=t[o][1][n];return u(r?r:n)},l,l.exports,n,t,r,e)}return r[o].exports}for(var i="function"==typeof require&&require,o=0;o<e.length;o++)u(e[o]);return u}({1:[function(n){var t=n("./utils/waa"),r=n("./utils/math"),e=n("async"),u=n("underscore");window.fields.sound={};var i={};fields.sound.start=function(){fields.sound.audioContext=t.kickStartWAA(),rhizome.start(),$("#instructions").fadeOut(100),$("#status").html("status: connecting ...")},rhizome.on("connected",function(){u.chain(fields.config).pairs().forEach(function(n){var t=n[0],r=n[1],e=fields.instruments[r.instrument];i[t]=e.sound.apply(e,[t].concat(r.args))}).values(),e.forEach(u.values(i),function(n,t){n.load(t)},function(n){fields.log(n?n:"all instruments loaded")}),u.chain(i).keys().forEach(function(n){rhizome.send("/sys/subscribe",["/"+n])}).values()}),rhizome.on("message",function(n,t){if("/sys/subscribed"===n)fields.log("subscribed "+t[0]);else{fields.log("message : "+n+" "+t);var e=n.split("/"),u=i[e[1]],o=e[2];"start"===o?u.start():"stop"===o?u.stop():"volume"===o?u.mixer.gain.setTargetAtTime(r.valExp(t[0],2.5),0,.002):u.setParameter(o,t)}}),rhizome.on("server full",function(){}),rhizome.on("connection lost",function(){}),rhizome.on("reconnected",function(){})},{"./utils/math":5,"./utils/waa":6,async:2,underscore:4}],2:[function(n,t){(function(n){!function(){function r(n){var t=!1;return function(){if(t)throw new Error("Callback was already called.");t=!0,n.apply(e,arguments)}}var e,u,i={};e=this,null!=e&&(u=e.async),i.noConflict=function(){return e.async=u,i};var o=Object.prototype.toString,a=Array.isArray||function(n){return"[object Array]"===o.call(n)},c=function(n,t){if(n.forEach)return n.forEach(t);for(var r=0;r<n.length;r+=1)t(n[r],r,n)},l=function(n,t){if(n.map)return n.map(t);var r=[];return c(n,function(n,e,u){r.push(t(n,e,u))}),r},f=function(n,t,r){return n.reduce?n.reduce(t,r):(c(n,function(n,e,u){r=t(r,n,e,u)}),r)},s=function(n){if(Object.keys)return Object.keys(n);var t=[];for(var r in n)n.hasOwnProperty(r)&&t.push(r);return t};"undefined"!=typeof n&&n.nextTick?(i.nextTick=n.nextTick,i.setImmediate="undefined"!=typeof setImmediate?function(n){setImmediate(n)}:i.nextTick):"function"==typeof setImmediate?(i.nextTick=function(n){setImmediate(n)},i.setImmediate=i.nextTick):(i.nextTick=function(n){setTimeout(n,0)},i.setImmediate=i.nextTick),i.each=function(n,t,e){function u(t){t?(e(t),e=function(){}):(i+=1,i>=n.length&&e())}if(e=e||function(){},!n.length)return e();var i=0;c(n,function(n){t(n,r(u))})},i.forEach=i.each,i.eachSeries=function(n,t,r){if(r=r||function(){},!n.length)return r();var e=0,u=function(){t(n[e],function(t){t?(r(t),r=function(){}):(e+=1,e>=n.length?r():u())})};u()},i.forEachSeries=i.eachSeries,i.eachLimit=function(n,t,r,e){var u=p(t);u.apply(null,[n,r,e])},i.forEachLimit=i.eachLimit;var p=function(n){return function(t,r,e){if(e=e||function(){},!t.length||0>=n)return e();var u=0,i=0,o=0;!function a(){if(u>=t.length)return e();for(;n>o&&i<t.length;)i+=1,o+=1,r(t[i-1],function(n){n?(e(n),e=function(){}):(u+=1,o-=1,u>=t.length?e():a())})}()}},d=function(n){return function(){var t=Array.prototype.slice.call(arguments);return n.apply(null,[i.each].concat(t))}},h=function(n,t){return function(){var r=Array.prototype.slice.call(arguments);return t.apply(null,[p(n)].concat(r))}},v=function(n){return function(){var t=Array.prototype.slice.call(arguments);return n.apply(null,[i.eachSeries].concat(t))}},m=function(n,t,r,e){if(t=l(t,function(n,t){return{index:t,value:n}}),e){var u=[];n(t,function(n,t){r(n.value,function(r,e){u[n.index]=e,t(r)})},function(n){e(n,u)})}else n(t,function(n,t){r(n.value,function(n){t(n)})})};i.map=d(m),i.mapSeries=v(m),i.mapLimit=function(n,t,r,e){return y(t)(n,r,e)};var y=function(n){return h(n,m)};i.reduce=function(n,t,r,e){i.eachSeries(n,function(n,e){r(t,n,function(n,r){t=r,e(n)})},function(n){e(n,t)})},i.inject=i.reduce,i.foldl=i.reduce,i.reduceRight=function(n,t,r,e){var u=l(n,function(n){return n}).reverse();i.reduce(u,t,r,e)},i.foldr=i.reduceRight;var g=function(n,t,r,e){var u=[];t=l(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){r(n.value,function(r){r&&u.push(n),t()})},function(){e(l(u.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};i.filter=d(g),i.filterSeries=v(g),i.select=i.filter,i.selectSeries=i.filterSeries;var w=function(n,t,r,e){var u=[];t=l(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){r(n.value,function(r){r||u.push(n),t()})},function(){e(l(u.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};i.reject=d(w),i.rejectSeries=v(w);var x=function(n,t,r,e){n(t,function(n,t){r(n,function(r){r?(e(n),e=function(){}):t()})},function(){e()})};i.detect=d(x),i.detectSeries=v(x),i.some=function(n,t,r){i.each(n,function(n,e){t(n,function(n){n&&(r(!0),r=function(){}),e()})},function(){r(!1)})},i.any=i.some,i.every=function(n,t,r){i.each(n,function(n,e){t(n,function(n){n||(r(!1),r=function(){}),e()})},function(){r(!0)})},i.all=i.every,i.sortBy=function(n,t,r){i.map(n,function(n,r){t(n,function(t,e){t?r(t):r(null,{value:n,criteria:e})})},function(n,t){if(n)return r(n);var e=function(n,t){var r=n.criteria,e=t.criteria;return e>r?-1:r>e?1:0};r(null,l(t.sort(e),function(n){return n.value}))})},i.auto=function(n,t){t=t||function(){};var r=s(n),e=r.length;if(!e)return t();var u={},o=[],l=function(n){o.unshift(n)},p=function(n){for(var t=0;t<o.length;t+=1)if(o[t]===n)return void o.splice(t,1)},d=function(){e--,c(o.slice(0),function(n){n()})};l(function(){if(!e){var n=t;t=function(){},n(null,u)}}),c(r,function(r){var e=a(n[r])?n[r]:[n[r]],o=function(n){var e=Array.prototype.slice.call(arguments,1);if(e.length<=1&&(e=e[0]),n){var o={};c(s(u),function(n){o[n]=u[n]}),o[r]=e,t(n,o),t=function(){}}else u[r]=e,i.setImmediate(d)},h=e.slice(0,Math.abs(e.length-1))||[],v=function(){return f(h,function(n,t){return n&&u.hasOwnProperty(t)},!0)&&!u.hasOwnProperty(r)};if(v())e[e.length-1](o,u);else{var m=function(){v()&&(p(m),e[e.length-1](o,u))};l(m)}})},i.retry=function(n,t,r){var e=5,u=[];"function"==typeof n&&(r=t,t=n,n=e),n=parseInt(n,10)||e;var o=function(e,o){for(var a=function(n,t){return function(r){n(function(n,e){r(!n||t,{err:n,result:e})},o)}};n;)u.push(a(t,!(n-=1)));i.series(u,function(n,t){t=t[t.length-1],(e||r)(t.err,t.result)})};return r?o():o},i.waterfall=function(n,t){if(t=t||function(){},!a(n)){var r=new Error("First argument to waterfall must be an array of functions");return t(r)}if(!n.length)return t();var e=function(n){return function(r){if(r)t.apply(null,arguments),t=function(){};else{var u=Array.prototype.slice.call(arguments,1),o=n.next();u.push(o?e(o):t),i.setImmediate(function(){n.apply(null,u)})}}};e(i.iterator(n))()};var b=function(n,t,r){if(r=r||function(){},a(t))n.map(t,function(n,t){n&&n(function(n){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),t.call(null,n,r)})},r);else{var e={};n.each(s(t),function(n,r){t[n](function(t){var u=Array.prototype.slice.call(arguments,1);u.length<=1&&(u=u[0]),e[n]=u,r(t)})},function(n){r(n,e)})}};i.parallel=function(n,t){b({map:i.map,each:i.each},n,t)},i.parallelLimit=function(n,t,r){b({map:y(t),each:p(t)},n,r)},i.series=function(n,t){if(t=t||function(){},a(n))i.mapSeries(n,function(n,t){n&&n(function(n){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),t.call(null,n,r)})},t);else{var r={};i.eachSeries(s(n),function(t,e){n[t](function(n){var u=Array.prototype.slice.call(arguments,1);u.length<=1&&(u=u[0]),r[t]=u,e(n)})},function(n){t(n,r)})}},i.iterator=function(n){var t=function(r){var e=function(){return n.length&&n[r].apply(null,arguments),e.next()};return e.next=function(){return r<n.length-1?t(r+1):null},e};return t(0)},i.apply=function(n){var t=Array.prototype.slice.call(arguments,1);return function(){return n.apply(null,t.concat(Array.prototype.slice.call(arguments)))}};var k=function(n,t,r,e){var u=[];n(t,function(n,t){r(n,function(n,r){u=u.concat(r||[]),t(n)})},function(n){e(n,u)})};i.concat=d(k),i.concatSeries=v(k),i.whilst=function(n,t,r){n()?t(function(e){return e?r(e):void i.whilst(n,t,r)}):r()},i.doWhilst=function(n,t,r){n(function(e){if(e)return r(e);var u=Array.prototype.slice.call(arguments,1);t.apply(null,u)?i.doWhilst(n,t,r):r()})},i.until=function(n,t,r){n()?r():t(function(e){return e?r(e):void i.until(n,t,r)})},i.doUntil=function(n,t,r){n(function(e){if(e)return r(e);var u=Array.prototype.slice.call(arguments,1);t.apply(null,u)?r():i.doUntil(n,t,r)})},i.queue=function(n,t){function e(n,t,r,e){return n.started||(n.started=!0),a(t)||(t=[t]),0==t.length?i.setImmediate(function(){n.drain&&n.drain()}):void c(t,function(t){var u={data:t,callback:"function"==typeof e?e:null};r?n.tasks.unshift(u):n.tasks.push(u),n.saturated&&n.tasks.length===n.concurrency&&n.saturated(),i.setImmediate(n.process)})}void 0===t&&(t=1);var u=0,o={tasks:[],concurrency:t,saturated:null,empty:null,drain:null,started:!1,paused:!1,push:function(n,t){e(o,n,!1,t)},kill:function(){o.drain=null,o.tasks=[]},unshift:function(n,t){e(o,n,!0,t)},process:function(){if(!o.paused&&u<o.concurrency&&o.tasks.length){var t=o.tasks.shift();o.empty&&0===o.tasks.length&&o.empty(),u+=1;var e=function(){u-=1,t.callback&&t.callback.apply(t,arguments),o.drain&&o.tasks.length+u===0&&o.drain(),o.process()},i=r(e);n(t.data,i)}},length:function(){return o.tasks.length},running:function(){return u},idle:function(){return o.tasks.length+u===0},pause:function(){o.paused!==!0&&(o.paused=!0,o.process())},resume:function(){o.paused!==!1&&(o.paused=!1,o.process())}};return o},i.priorityQueue=function(n,t){function r(n,t){return n.priority-t.priority}function e(n,t,r){for(var e=-1,u=n.length-1;u>e;){var i=e+(u-e+1>>>1);r(t,n[i])>=0?e=i:u=i-1}return e}function u(n,t,u,o){return n.started||(n.started=!0),a(t)||(t=[t]),0==t.length?i.setImmediate(function(){n.drain&&n.drain()}):void c(t,function(t){var a={data:t,priority:u,callback:"function"==typeof o?o:null};n.tasks.splice(e(n.tasks,a,r)+1,0,a),n.saturated&&n.tasks.length===n.concurrency&&n.saturated(),i.setImmediate(n.process)})}var o=i.queue(n,t);return o.push=function(n,t,r){u(o,n,t,r)},delete o.unshift,o},i.cargo=function(n,t){var r=!1,e=[],u={tasks:e,payload:t,saturated:null,empty:null,drain:null,drained:!0,push:function(n,r){a(n)||(n=[n]),c(n,function(n){e.push({data:n,callback:"function"==typeof r?r:null}),u.drained=!1,u.saturated&&e.length===t&&u.saturated()}),i.setImmediate(u.process)},process:function o(){if(!r){if(0===e.length)return u.drain&&!u.drained&&u.drain(),void(u.drained=!0);var i="number"==typeof t?e.splice(0,t):e.splice(0,e.length),a=l(i,function(n){return n.data});u.empty&&u.empty(),r=!0,n(a,function(){r=!1;var n=arguments;c(i,function(t){t.callback&&t.callback.apply(null,n)}),o()})}},length:function(){return e.length},running:function(){return r}};return u};var A=function(n){return function(t){var r=Array.prototype.slice.call(arguments,1);t.apply(null,r.concat([function(t){var r=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(t?console.error&&console.error(t):console[n]&&c(r,function(t){console[n](t)}))}]))}};i.log=A("log"),i.dir=A("dir"),i.memoize=function(n,t){var r={},e={};t=t||function(n){return n};var u=function(){var u=Array.prototype.slice.call(arguments),o=u.pop(),a=t.apply(null,u);a in r?i.nextTick(function(){o.apply(null,r[a])}):a in e?e[a].push(o):(e[a]=[o],n.apply(null,u.concat([function(){r[a]=arguments;var n=e[a];delete e[a];for(var t=0,u=n.length;u>t;t++)n[t].apply(null,arguments)}])))};return u.memo=r,u.unmemoized=n,u},i.unmemoize=function(n){return function(){return(n.unmemoized||n).apply(null,arguments)}},i.times=function(n,t,r){for(var e=[],u=0;n>u;u++)e.push(u);return i.map(e,t,r)},i.timesSeries=function(n,t,r){for(var e=[],u=0;n>u;u++)e.push(u);return i.mapSeries(e,t,r)},i.seq=function(){var n=arguments;return function(){var t=this,r=Array.prototype.slice.call(arguments),e=r.pop();i.reduce(n,r,function(n,r,e){r.apply(t,n.concat([function(){var n=arguments[0],t=Array.prototype.slice.call(arguments,1);e(n,t)}]))},function(n,r){e.apply(t,[n].concat(r))})}},i.compose=function(){return i.seq.apply(null,Array.prototype.reverse.call(arguments))};var E=function(n,t){var r=function(){var r=this,e=Array.prototype.slice.call(arguments),u=e.pop();return n(t,function(n,t){n.apply(r,e.concat([t]))},u)};if(arguments.length>2){var e=Array.prototype.slice.call(arguments,2);return r.apply(this,e)}return r};i.applyEach=d(E),i.applyEachSeries=v(E),i.forever=function(n,t){function r(e){if(e){if(t)return t(e);throw e}n(r)}r()},"undefined"!=typeof t&&t.exports?t.exports=i:"undefined"!=typeof define&&define.amd?define([],function(){return i}):e.async=i}()}).call(this,n("IrXUsu"))},{IrXUsu:3}],3:[function(n,t){function r(){}var e=t.exports={};e.nextTick=function(){var n="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(n)return function(n){return window.setImmediate(n)};if(t){var r=[];return window.addEventListener("message",function(n){var t=n.source;if((t===window||null===t)&&"process-tick"===n.data&&(n.stopPropagation(),r.length>0)){var e=r.shift();e()}},!0),function(n){r.push(n),window.postMessage("process-tick","*")}}return function(n){setTimeout(n,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=r,e.addListener=r,e.once=r,e.off=r,e.removeListener=r,e.removeAllListeners=r,e.emit=r,e.binding=function(){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(){throw new Error("process.chdir is not supported")}},{}],4:[function(n,t,r){(function(){var n=this,e=n._,u={},i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=i.concat,s=o.toString,p=o.hasOwnProperty,d=i.forEach,h=i.map,v=i.reduce,m=i.reduceRight,y=i.filter,g=i.every,w=i.some,x=i.indexOf,b=i.lastIndexOf,k=Array.isArray,A=Object.keys,E=a.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof r?("undefined"!=typeof t&&t.exports&&(r=t.exports=j),r._=j):n._=j,j.VERSION="1.6.0";var _=j.each=j.forEach=function(n,t,r){if(null==n)return n;if(d&&n.forEach===d)n.forEach(t,r);else if(n.length===+n.length){for(var e=0,i=n.length;i>e;e++)if(t.call(r,n[e],e,n)===u)return}else for(var o=j.keys(n),e=0,i=o.length;i>e;e++)if(t.call(r,n[o[e]],o[e],n)===u)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:h&&n.map===h?n.map(t,r):(_(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var S="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(_(n,function(n,i,o){u?r=t.call(e,r,n,i,o):(r=n,u=!0)}),!u)throw new TypeError(S);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),m&&n.reduceRight===m)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var o=j.keys(n);i=o.length}if(_(n,function(a,c,l){c=o?o[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(S);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:y&&n.filter===y?n.filter(t,r):(_(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,r){t||(t=j.identity);var e=!0;return null==n?e:g&&n.every===g?n.every(t,r):(_(n,function(n,i,o){return(e=e&&t.call(r,n,i,o))?void 0:u}),!!e)};var O=j.some=j.any=function(n,t,r){t||(t=j.identity);var e=!1;return null==n?e:w&&n.some===w?n.some(t,r):(_(n,function(n,i,o){return e||(e=t.call(r,n,i,o))?u:void 0}),!!e)};j.contains=j.include=function(n,t){return null==n?!1:x&&n.indexOf===x?-1!=n.indexOf(t):O(n,function(n){return n===t})},j.invoke=function(n,t){var r=l.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return _(n,function(n,i,o){var a=t?t.call(r,n,i,o):n;a>u&&(e=n,u=a)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return _(n,function(n,i,o){var a=t?t.call(r,n,i,o):n;u>a&&(e=n,u=a)}),e},j.shuffle=function(n){var t,r=0,e=[];return _(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var T=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=T(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index-t.index}),"value")};var I=function(n){return function(t,r,e){var u={};return r=T(r),_(t,function(i,o){var a=r.call(e,i,o,t);n(u,a,i)}),u}};j.groupBy=I(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=I(function(n,t,r){n[t]=r}),j.countBy=I(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=T(r);for(var u=r.call(e,t),i=0,o=n.length;o>i;){var a=i+o>>>1;r.call(e,n[a])<u?i=a+1:o=a}return i},j.toArray=function(n){return n?j.isArray(n)?l.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:l.call(n,0,t)},j.initial=function(n,t,r){return l.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:l.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?f.apply(r,n):(_(n,function(n){j.isArray(n)||j.isArguments(n)?t?c.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,l.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return _(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],o=[];return _(u,function(r,e){(t?e&&o[o.length-1]===r:j.contains(o,r))||(o.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=l.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=f.apply(i,l.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(x&&n.indexOf===x)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var q=function(){};j.bind=function(n,t){var r,e;if(E&&n.bind===E)return E.apply(n,l.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=l.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(l.call(arguments)));q.prototype=n.prototype;var u=new q;q.prototype=null;var i=n.apply(u,r.concat(l.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=l.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=l.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return _(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(l.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:j.now(),o=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f?(clearTimeout(o),o=null,a=l,i=n.apply(e,u),e=u=null):o||r.trailing===!1||(o=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=j.now()-o;t>l?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,o=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(A)return A(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return _(l.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=f.apply(i,l.call(arguments,1));return _(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=f.apply(i,l.call(arguments,1));for(var e in n)j.contains(r,e)||(t[e]=n[e]);return t},j.defaults=function(n){return _(l.call(arguments,1),function(t){if(t)for(var r in t)void 0===n[r]&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var C=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=s.call(n);if(u!=s.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var o=n.constructor,a=t.constructor;if(o!==a&&!(j.isFunction(o)&&o instanceof o&&j.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,l=!0;if("[object Array]"==u){if(c=n.length,l=c==t.length)for(;c--&&(l=C(n[c],t[c],r,e)););}else{for(var f in n)if(j.has(n,f)&&(c++,!(l=j.has(t,f)&&C(n[f],t[f],r,e))))break;if(l){for(f in t)if(j.has(t,f)&&!c--)break;l=!c}}return r.pop(),e.pop(),l};j.isEqual=function(n,t){return C(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=k||function(n){return"[object Array]"==s.call(n)},j.isObject=function(n){return n===Object(n)},_(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return s.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==s.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return void 0===n},j.has=function(n,t){return p.call(n,t)},j.noConflict=function(){return n._=e,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var F={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};F.unescape=j.invert(F.escape);var R={escape:new RegExp("["+j.keys(F.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(F.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(R[n],function(t){return F[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){_(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),D.call(this,r.apply(j,n))}})};var z=0;j.uniqueId=function(n){var t=++z+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var L=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},N=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||L).source,(r.interpolate||L).source,(r.evaluate||L).source].join("|")+"|$","g"),i=0,o="__p+='";n.replace(u,function(t,r,e,u,a){return o+=n.slice(i,a).replace(N,function(n){return"\\"+B[n]}),r&&(o+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(o+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(o+="';\n"+u+"\n__p+='"),i=a+t.length,t}),o+="';\n",r.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{e=new Function(r.variable||"obj","_",o)}catch(a){throw a.source=o,a}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+o+"}",c},j.chain=function(n){return j(n).chain()};var D=function(n){return this._chain?j(n).chain():n};j.mixin(j),_(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),_(["concat","join","slice"],function(n){var t=i[n];j.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this)},{}],5:[function(n,t,r){r.pickVal=function(n,t){return n+n*t*(1-2*Math.random())},r.floor=function(n,t){return Math.floor(n*Math.pow(10,t))/Math.pow(10,t)},r.valExp=function(n,t){return t=t||2,(Math.exp(n*t)-Math.exp(0))/(Math.exp(t)-Math.exp(0))}},{}],6:[function(n,t,r){r.kickStartWAA=function(){audioContext=new AudioContext;var n=audioContext.createOscillator(),t=audioContext.createGain();return t.gain.value=0,n.connect(t),t.connect(audioContext.destination),n.start(0),n.stop(1),audioContext};var e=r.loadBuffer=function(n,t){a(n,function(r,e){return r?t(r):void o(e,function(r,e){return r?(r instanceof l&&(r.message+=" "+n),t(r)):void t(null,e)})})},u=(r.formatSupport=function(n){var t,r=[],u=[["wav","sounds/format-support/sample.wav"],["mp3","sounds/format-support/sample.mp3"],["ogg","sounds/format-support/sample.ogg"]],i=function(o,a,c){var f;if(a){if(!(a instanceof l))return n(a);f=!1}else f=1===c.numberOfChannels&&50===Math.round(1e3*c.duration)?!0:!1;f===!0&&r.push(o),u.length>0?(t=u.pop(),e(t[1],i.bind(this,t[0]))):n(null,r)};t=u.pop(),e(t[1],i.bind(this,t[0]))},[]);r.plotBuffer=function(n,t){var r=100,e=n.getChannelData(0),o=n.sampleRate,a=t.attr("width")||300,c=t.attr("height")||300,l=[];for(i=0,length=n.length;length>i;i+=r)l.push([i/o,e[i]]);var f=d3.scale.linear().range([0,a]),s=d3.scale.linear().range([c,0]),p=d3.svg.line().x(function(n){return f(n[0])}).y(function(n){return s(n[1])});f.domain(d3.extent(l,function(n){return n[0]})),s.domain(d3.extent(l,function(n){return n[1]})),t.append("path").datum(l).attr("class","plot plot-"+u.length%2).attr("d",p),u.push(n)};var o=function(n,t){audioContext.decodeAudioData(n,function(n){t(null,n)},function(n){t(n||new l("decoding error"),null)})},a=function(n,t){var r=new XMLHttpRequest;r.open("GET",n,!0),r.responseType="arraybuffer",r.onload=function(){200===r.status?t(null,r.response):t(new c(r.statusText))},r.onerror=function(n){t(n||new Error("unexpected request error"),null)},r.send()},c=function(n){this.message=n||""};c.prototype=Object.create(Error.prototype),c.prototype.name="HTTPError";var l=function(n){this.message=n||""};l.prototype=Object.create(Error.prototype),l.prototype.name="DecodeError"},{}]},{},[1]);