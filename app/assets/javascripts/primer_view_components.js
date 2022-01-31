const t=!!navigator.userAgent.match(/Macintosh/);class e{constructor(e,n){this.input=e,this.list=n,this.isComposing=!1,n.id||(n.id=`combobox-${Math.random().toString().slice(2,6)}`),this.keyboardEventHandler=e=>function(e,n){if(e.shiftKey||e.metaKey||e.altKey)return;if(!t&&e.ctrlKey)return;if(n.isComposing)return;switch(e.key){case"Enter":case"Tab":(function(t,e){const n=e.querySelector('[aria-selected="true"]');return!!n&&("true"===n.getAttribute("aria-disabled")||n.click(),!0)})(n.input,n.list)&&e.preventDefault();break;case"Escape":n.clearSelection();break;case"ArrowDown":n.navigate(1),e.preventDefault();break;case"ArrowUp":n.navigate(-1),e.preventDefault();break;case"n":t&&e.ctrlKey&&(n.navigate(1),e.preventDefault());break;case"p":t&&e.ctrlKey&&(n.navigate(-1),e.preventDefault());break;default:if(e.ctrlKey)break;n.clearSelection()}}(e,this),this.compositionEventHandler=t=>function(t,e){e.isComposing="compositionstart"===t.type;if(!document.getElementById(e.input.getAttribute("aria-controls")||""))return;e.clearSelection()}(t,this),this.inputHandler=this.clearSelection.bind(this),e.setAttribute("role","combobox"),e.setAttribute("aria-controls",n.id),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-autocomplete","list"),e.setAttribute("aria-haspopup","listbox")}destroy(){this.clearSelection(),this.stop(),this.input.removeAttribute("role"),this.input.removeAttribute("aria-controls"),this.input.removeAttribute("aria-expanded"),this.input.removeAttribute("aria-autocomplete"),this.input.removeAttribute("aria-haspopup")}start(){this.input.setAttribute("aria-expanded","true"),this.input.addEventListener("compositionstart",this.compositionEventHandler),this.input.addEventListener("compositionend",this.compositionEventHandler),this.input.addEventListener("input",this.inputHandler),this.input.addEventListener("keydown",this.keyboardEventHandler),this.list.addEventListener("click",n)}stop(){this.clearSelection(),this.input.setAttribute("aria-expanded","false"),this.input.removeEventListener("compositionstart",this.compositionEventHandler),this.input.removeEventListener("compositionend",this.compositionEventHandler),this.input.removeEventListener("input",this.inputHandler),this.input.removeEventListener("keydown",this.keyboardEventHandler),this.list.removeEventListener("click",n)}navigate(t=1){const e=Array.from(this.list.querySelectorAll('[aria-selected="true"]')).filter(i)[0],n=Array.from(this.list.querySelectorAll('[role="option"]')).filter(i),s=n.indexOf(e);if(s===n.length-1&&1===t||0===s&&-1===t)return this.clearSelection(),void this.input.focus();let r=1===t?0:n.length-1;if(e&&s>=0){const e=s+t;e>=0&&e<n.length&&(r=e)}const a=n[r];if(a)for(const t of n)a===t?(this.input.setAttribute("aria-activedescendant",a.id),a.setAttribute("aria-selected","true"),o(this.list,a)):t.setAttribute("aria-selected","false")}clearSelection(){this.input.removeAttribute("aria-activedescendant");for(const t of this.list.querySelectorAll('[aria-selected="true"]'))t.setAttribute("aria-selected","false")}}function n(t){if(!(t.target instanceof Element))return;const e=t.target.closest('[role="option"]');e&&"true"!==e.getAttribute("aria-disabled")&&function(t){t.dispatchEvent(new CustomEvent("combobox-commit",{bubbles:!0}))}(e)}function i(t){return!t.hidden&&!(t instanceof HTMLInputElement&&"hidden"===t.type)&&(t.offsetWidth>0||t.offsetHeight>0)}function o(t,e){(function(t,e){const n=t.scrollTop,i=n+t.clientHeight,o=e.offsetTop,s=o+e.clientHeight;return o>=n&&s<=i})(t,e)||(t.scrollTop=e.offsetTop)}class s extends CustomEvent{constructor(t,e){super(t,e),this.relatedTarget=e.relatedTarget}}const r=new WeakMap;function a(t,e){const n=new XMLHttpRequest;return n.open("GET",e,!0),n.setRequestHeader("Accept","text/fragment+html"),function(t,e){const n=r.get(t);n&&n.abort();r.set(t,e);const i=()=>r.delete(t),o=function(t){return new Promise(((e,n)=>{t.onload=function(){t.status>=200&&t.status<300?e(t.responseText):n(new Error(t.responseText))},t.onerror=n,t.send()}))}(e);return o.then(i,i),o}(t,n)}class c{constructor(t,n,i){this.container=t,this.input=n,this.results=i,this.combobox=new e(n,i),this.results.hidden=!0,this.input.setAttribute("autocomplete","off"),this.input.setAttribute("spellcheck","false"),this.interactingWithList=!1,this.onInputChange=function(t,e=0){let n;return function(...i){clearTimeout(n),n=window.setTimeout((()=>{clearTimeout(n),t(...i)}),e)}}(this.onInputChange.bind(this),300),this.onResultsMouseDown=this.onResultsMouseDown.bind(this),this.onInputBlur=this.onInputBlur.bind(this),this.onInputFocus=this.onInputFocus.bind(this),this.onKeydown=this.onKeydown.bind(this),this.onCommit=this.onCommit.bind(this),this.input.addEventListener("keydown",this.onKeydown),this.input.addEventListener("focus",this.onInputFocus),this.input.addEventListener("blur",this.onInputBlur),this.input.addEventListener("input",this.onInputChange),this.results.addEventListener("mousedown",this.onResultsMouseDown),this.results.addEventListener("combobox-commit",this.onCommit)}destroy(){this.input.removeEventListener("keydown",this.onKeydown),this.input.removeEventListener("focus",this.onInputFocus),this.input.removeEventListener("blur",this.onInputBlur),this.input.removeEventListener("input",this.onInputChange),this.results.removeEventListener("mousedown",this.onResultsMouseDown),this.results.removeEventListener("combobox-commit",this.onCommit)}onKeydown(t){if("Escape"===t.key&&this.container.open)this.container.open=!1,t.stopPropagation(),t.preventDefault();else if(t.altKey&&"ArrowUp"===t.key&&this.container.open)this.container.open=!1,t.stopPropagation(),t.preventDefault();else if(t.altKey&&"ArrowDown"===t.key&&!this.container.open){if(!this.input.value.trim())return;this.container.open=!0,t.stopPropagation(),t.preventDefault()}}onInputFocus(){this.fetchResults()}onInputBlur(){this.interactingWithList?this.interactingWithList=!1:this.container.open=!1}onCommit({target:t}){const e=t;if(!(e instanceof HTMLElement))return;if(this.container.open=!1,e instanceof HTMLAnchorElement)return;const n=e.getAttribute("data-autocomplete-value")||e.textContent;this.container.value=n}onResultsMouseDown(){this.interactingWithList=!0}onInputChange(){this.container.removeAttribute("value"),this.fetchResults()}identifyOptions(){let t=0;for(const e of this.results.querySelectorAll('[role="option"]:not([id])'))e.id=`${this.results.id}-option-${t++}`}fetchResults(){const t=this.input.value.trim();if(!t)return void(this.container.open=!1);const e=this.container.src;if(!e)return;const n=new URL(e,window.location.href),i=new URLSearchParams(n.search.slice(1));i.append("q",t),n.search=i.toString(),this.container.dispatchEvent(new CustomEvent("loadstart")),a(this.input,n.toString()).then((t=>{this.results.innerHTML=t,this.identifyOptions();const e=!!this.results.querySelector('[role="option"]');this.container.open=e,this.container.dispatchEvent(new CustomEvent("load")),this.container.dispatchEvent(new CustomEvent("loadend"))})).catch((()=>{this.container.dispatchEvent(new CustomEvent("error")),this.container.dispatchEvent(new CustomEvent("loadend"))}))}open(){this.results.hidden&&(this.combobox.start(),this.results.hidden=!1)}close(){this.results.hidden||(this.combobox.stop(),this.results.hidden=!0)}}const u=new WeakMap;class l extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("for");if(!t)return;const e=this.querySelector("input"),n=document.getElementById(t);e instanceof HTMLInputElement&&n&&(u.set(this,new c(this,e,n)),n.setAttribute("role","listbox"))}disconnectedCallback(){const t=u.get(this);t&&(t.destroy(),u.delete(this))}get src(){return this.getAttribute("src")||""}set src(t){this.setAttribute("src",t)}get value(){return this.getAttribute("value")||""}set value(t){this.setAttribute("value",t)}get open(){return this.hasAttribute("open")}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}static get observedAttributes(){return["open","value"]}attributeChangedCallback(t,e,n){if(e===n)return;const i=u.get(this);if(i)switch(t){case"open":null===n?i.close():i.open();break;case"value":null!==n&&(i.input.value=n),this.dispatchEvent(new s("auto-complete-change",{bubbles:!0,relatedTarget:i.input}))}}}function d(t){if("clipboard"in navigator)return navigator.clipboard.writeText(t.textContent);const e=getSelection();if(null==e)return Promise.reject(new Error);e.removeAllRanges();const n=document.createRange();return n.selectNodeContents(t),e.addRange(n),document.execCommand("copy"),e.removeAllRanges(),Promise.resolve()}function h(t){if("clipboard"in navigator)return navigator.clipboard.writeText(t);const e=document.body;if(!e)return Promise.reject(new Error);const n=function(t){const e=document.createElement("pre");return e.style.width="1px",e.style.height="1px",e.style.position="fixed",e.style.top="5px",e.textContent=t,e}(t);return e.appendChild(n),d(n),e.removeChild(n),Promise.resolve()}function m(t){const e=t.getAttribute("for"),n=t.getAttribute("value");function i(){t.dispatchEvent(new CustomEvent("clipboard-copy",{bubbles:!0}))}if(n)h(n).then(i);else if(e){const n="getRootNode"in Element.prototype?t.getRootNode():t.ownerDocument;if(!(n instanceof Document||"ShadowRoot"in window&&n instanceof ShadowRoot))return;const s=n.getElementById(e);s&&(o=s,o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement?h(o.value):o instanceof HTMLAnchorElement&&o.hasAttribute("href")?h(o.href):d(o)).then(i)}var o}function f(t){const e=t.currentTarget;e instanceof HTMLElement&&m(e)}function p(t){if(" "===t.key||"Enter"===t.key){const e=t.currentTarget;e instanceof HTMLElement&&(t.preventDefault(),m(e))}}function b(t){t.currentTarget.addEventListener("keydown",p)}function g(t){t.currentTarget.removeEventListener("keydown",p)}window.customElements.get("auto-complete")||(window.AutocompleteElement=l,window.customElements.define("auto-complete",l));class v extends HTMLElement{constructor(){super(),this.addEventListener("click",f),this.addEventListener("focus",b),this.addEventListener("blur",g)}connectedCallback(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.hasAttribute("role")||this.setAttribute("role","button")}get value(){return this.getAttribute("value")||""}set value(t){this.setAttribute("value",t)}}window.customElements.get("clipboard-copy")||(window.ClipboardCopyElement=v,window.customElements.define("clipboard-copy",v));function w(t){t.style.display="inline-block"}function E(t){t.style.display="none"}const y=new WeakMap;document.addEventListener("clipboard-copy",(function({target:t}){if(!(t instanceof HTMLElement))return;if(!t.hasAttribute("data-view-component"))return;const e=y.get(t);e?(clearTimeout(e),y.delete(t)):function(t){const[e,n]=t.querySelectorAll(".octicon");e&&n&&(E(e),w(n))}(t),y.set(t,setTimeout((()=>{!function(t){const[e,n]=t.querySelectorAll(".octicon");e&&n&&(w(e),E(n))}(t),y.delete(t)}),2e3))}));class A extends HTMLElement{constructor(){super(),this.addEventListener("keydown",(t=>{const e=t.target;if(!(e instanceof HTMLElement))return;if("tab"!==e.getAttribute("role")&&!e.closest('[role="tablist"]'))return;const n=Array.from(this.querySelectorAll('[role="tablist"] [role="tab"]')),i=n.indexOf(n.find((t=>t.matches('[aria-selected="true"]'))));if("ArrowRight"===t.code){let t=i+1;t>=n.length&&(t=0),L(this,t)}else if("ArrowLeft"===t.code){let t=i-1;t<0&&(t=n.length-1),L(this,t)}else"Home"===t.code?(L(this,0),t.preventDefault()):"End"===t.code&&(L(this,n.length-1),t.preventDefault())})),this.addEventListener("click",(t=>{const e=Array.from(this.querySelectorAll('[role="tablist"] [role="tab"]'));if(!(t.target instanceof Element))return;const n=t.target.closest('[role="tab"]');if(!n||!n.closest('[role="tablist"]'))return;L(this,e.indexOf(n))}))}connectedCallback(){for(const t of this.querySelectorAll('[role="tablist"] [role="tab"]'))t.hasAttribute("aria-selected")||t.setAttribute("aria-selected","false"),t.hasAttribute("tabindex")||("true"===t.getAttribute("aria-selected")?t.setAttribute("tabindex","0"):t.setAttribute("tabindex","-1"))}}function L(t,e){const n=t.querySelectorAll('[role="tablist"] [role="tab"]'),i=t.querySelectorAll('[role="tabpanel"]'),o=n[e],s=i[e];if(!!t.dispatchEvent(new CustomEvent("tab-container-change",{bubbles:!0,cancelable:!0,detail:{relatedTarget:s}}))){for(const t of n)t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1");for(const t of i)t.hidden=!0,t.hasAttribute("tabindex")||t.hasAttribute("data-tab-container-no-tabstop")||t.setAttribute("tabindex","0");o.setAttribute("aria-selected","true"),o.setAttribute("tabindex","0"),o.focus(),s.hidden=!1,t.dispatchEvent(new CustomEvent("tab-container-changed",{bubbles:!0,detail:{relatedTarget:s}}))}}window.customElements.get("tab-container")||(window.TabContainerElement=A,window.customElements.define("tab-container",A));const T=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],M=["January","February","March","April","May","June","July","August","September","October","November","December"];function x(t){return`0${t}`.slice(-2)}function k(t,e){const n=t.getDay(),i=t.getDate(),o=t.getMonth(),s=t.getFullYear(),r=t.getHours(),a=t.getMinutes(),c=t.getSeconds();return e.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g,(function(e){let u;switch(e[1]){case"%":return"%";case"a":return T[n].slice(0,3);case"A":return T[n];case"b":return M[o].slice(0,3);case"B":return M[o];case"c":return t.toString();case"d":return x(i);case"e":return String(i);case"H":return x(r);case"I":return x(k(t,"%l"));case"l":return String(0===r||12===r?12:(r+12)%12);case"m":return x(o+1);case"M":return x(a);case"p":return r>11?"PM":"AM";case"P":return r>11?"pm":"am";case"S":return x(c);case"w":return String(n);case"y":return x(s%100);case"Y":return String(s);case"Z":return u=t.toString().match(/\((\w+)\)$/),u?u[1]:"";case"z":return u=t.toString().match(/\w([+-]\d\d\d\d) /),u?u[1]:""}return""}))}function C(t){let e;return function(){if(e)return e;if("Intl"in window)try{return e=new Intl.DateTimeFormat(void 0,t),e}catch(t){if(!(t instanceof RangeError))throw t}}}let S=null;const H=C({day:"numeric",month:"short"});function D(){if(null!==S)return S;const t=H();if(t){const e=t.format(new Date(0));return S=!!e.match(/^\d/),S}return!1}let I=null;const q=C({day:"numeric",month:"short",year:"numeric"});function F(t){const e=t.closest("[lang]");return e instanceof HTMLElement&&e.lang?e.lang:"default"}const R=new WeakMap;class $ extends HTMLElement{static get observedAttributes(){return["datetime","day","format","lang","hour","minute","month","second","title","weekday","year","time-zone-name"]}connectedCallback(){const t=this.getFormattedTitle();t&&!this.hasAttribute("title")&&this.setAttribute("title",t);const e=this.getFormattedDate();e&&(this.textContent=e)}attributeChangedCallback(t,e,n){const i=this.getFormattedTitle();if("datetime"===t){const t=Date.parse(n);isNaN(t)?R.delete(this):R.set(this,new Date(t))}const o=this.getFormattedTitle(),s=this.getAttribute("title");"title"===t||!o||s&&s!==i||this.setAttribute("title",o);const r=this.getFormattedDate();r&&(this.textContent=r)}get date(){return R.get(this)}getFormattedTitle(){const t=this.date;if(!t)return;const e=Y();if(e)return e.format(t);try{return t.toLocaleString()}catch(e){if(e instanceof RangeError)return t.toString();throw e}}getFormattedDate(){}}const Y=C({day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}),W=new WeakMap;class N extends ${attributeChangedCallback(t,e,n){"hour"!==t&&"minute"!==t&&"second"!==t&&"time-zone-name"!==t||W.delete(this),super.attributeChangedCallback(t,e,n)}getFormattedDate(){const t=this.date;if(!t)return;return`${function(t,e){const n={weekday:{short:"%a",long:"%A"},day:{numeric:"%e","2-digit":"%d"},month:{short:"%b",long:"%B"},year:{numeric:"%Y","2-digit":"%y"}};let i=D()?"weekday day month year":"weekday month day, year";for(const e in n){const o=n[e][t.getAttribute(e)||""];i=i.replace(e,o||"")}return i=i.replace(/(\s,)|(,\s$)/,""),k(e,i).replace(/\s+/," ").trim()}(this,t)||""} ${function(t,e){const n={},i=t.getAttribute("hour");"numeric"!==i&&"2-digit"!==i||(n.hour=i);const o=t.getAttribute("minute");"numeric"!==o&&"2-digit"!==o||(n.minute=o);const s=t.getAttribute("second");"numeric"!==s&&"2-digit"!==s||(n.second=s);const r=t.getAttribute("time-zone-name");"short"!==r&&"long"!==r||(n.timeZoneName=r);if(0===Object.keys(n).length)return;let a=W.get(t);a||(a=C(n),W.set(t,a));const c=a();if(c)return c.format(e);return k(e,n.second?"%H:%M:%S":"%H:%M")}(this,t)||""}`.trim()}}window.customElements.get("local-time")||(window.LocalTimeElement=N,window.customElements.define("local-time",N));class O{constructor(t,e){this.date=t,this.locale=e}toString(){const t=this.timeElapsed();if(t)return t;{const t=this.timeAhead();return t||`on ${this.formatDate()}`}}timeElapsed(){const t=(new Date).getTime()-this.date.getTime(),e=Math.round(t/1e3),n=Math.round(e/60),i=Math.round(n/60),o=Math.round(i/24);return t>=0&&o<30?this.timeAgoFromMs(t):null}timeAhead(){const t=this.date.getTime()-(new Date).getTime(),e=Math.round(t/1e3),n=Math.round(e/60),i=Math.round(n/60),o=Math.round(i/24);return t>=0&&o<30?this.timeUntil():null}timeAgo(){const t=(new Date).getTime()-this.date.getTime();return this.timeAgoFromMs(t)}timeAgoFromMs(t){const e=Math.round(t/1e3),n=Math.round(e/60),i=Math.round(n/60),o=Math.round(i/24),s=Math.round(o/30),r=Math.round(s/12);return t<0||e<10?P(this.locale,0,"second"):e<45?P(this.locale,-e,"second"):e<90||n<45?P(this.locale,-n,"minute"):n<90||i<24?P(this.locale,-i,"hour"):i<36||o<30?P(this.locale,-o,"day"):s<18?P(this.locale,-s,"month"):P(this.locale,-r,"year")}microTimeAgo(){const t=(new Date).getTime()-this.date.getTime(),e=Math.round(t/1e3),n=Math.round(e/60),i=Math.round(n/60),o=Math.round(i/24),s=Math.round(o/30),r=Math.round(s/12);return n<1?"1m":n<60?`${n}m`:i<24?`${i}h`:o<365?`${o}d`:`${r}y`}timeUntil(){const t=this.date.getTime()-(new Date).getTime();return this.timeUntilFromMs(t)}timeUntilFromMs(t){const e=Math.round(t/1e3),n=Math.round(e/60),i=Math.round(n/60),o=Math.round(i/24),s=Math.round(o/30),r=Math.round(s/12);return s>=18||s>=12?P(this.locale,r,"year"):o>=45||o>=30?P(this.locale,s,"month"):i>=36||i>=24?P(this.locale,o,"day"):n>=90||n>=45?P(this.locale,i,"hour"):e>=90||e>=45?P(this.locale,n,"minute"):P(this.locale,e>=10?e:0,"second")}microTimeUntil(){const t=this.date.getTime()-(new Date).getTime(),e=Math.round(t/1e3),n=Math.round(e/60),i=Math.round(n/60),o=Math.round(i/24),s=Math.round(o/30),r=Math.round(s/12);return o>=365?`${r}y`:i>=24?`${o}d`:n>=60?`${i}h`:n>1?`${n}m`:"1m"}formatDate(){let t=D()?"%e %b":"%b %e";var e;return e=this.date,(new Date).getUTCFullYear()!==e.getUTCFullYear()&&(t+=function(){if(null!==I)return I;const t=q();if(t){const e=t.format(new Date(0));return I=!!e.match(/\d,/),I}return!0}()?", %Y":" %Y"),k(this.date,t)}formatTime(){const t=X();return t?t.format(this.date):k(this.date,"%l:%M%P")}}function P(t,e,n){const i=function(t,e){if("Intl"in window&&"RelativeTimeFormat"in window.Intl)try{return new Intl.RelativeTimeFormat(t,e)}catch(t){if(!(t instanceof RangeError))throw t}}(t,{numeric:"auto"});return i?i.format(e,n):function(t,e){if(0===t)switch(e){case"year":case"quarter":case"month":case"week":return`this ${e}`;case"day":return"today";case"hour":case"minute":return`in 0 ${e}s`;case"second":return"now"}else if(1===t)switch(e){case"year":case"quarter":case"month":case"week":return`next ${e}`;case"day":return"tomorrow";case"hour":case"minute":case"second":return`in 1 ${e}`}else if(-1===t)switch(e){case"year":case"quarter":case"month":case"week":return`last ${e}`;case"day":return"yesterday";case"hour":case"minute":case"second":return`1 ${e} ago`}else if(t>1)switch(e){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return`in ${t} ${e}s`}else if(t<-1)switch(e){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return`${-t} ${e}s ago`}throw new RangeError(`Invalid unit argument for format() '${e}'`)}(e,n)}const X=C({hour:"numeric",minute:"2-digit"});class K extends ${getFormattedDate(){const t=this.date;if(t)return new O(t,F(this)).toString()}connectedCallback(){U.push(this),B||(z(),B=window.setInterval(z,6e4)),super.connectedCallback()}disconnectedCallback(){const t=U.indexOf(this);-1!==t&&U.splice(t,1),U.length||B&&(clearInterval(B),B=null)}}const U=[];let B;function z(){let t,e,n;for(e=0,n=U.length;e<n;e++)t=U[e],t.textContent=t.getFormattedDate()||""}window.customElements.get("relative-time")||(window.RelativeTimeElement=K,window.customElements.define("relative-time",K));class j extends K{getFormattedDate(){const t=this.getAttribute("format"),e=this.date;if(e)return"micro"===t?new O(e,F(this)).microTimeAgo():new O(e,F(this)).timeAgo()}}window.customElements.get("time-ago")||(window.TimeAgoElement=j,window.customElements.define("time-ago",j));class Z extends K{getFormattedDate(){const t=this.getAttribute("format"),e=this.date;if(e)return"micro"===t?new O(e,F(this)).microTimeUntil():new O(e,F(this)).timeUntil()}}window.customElements.get("time-until")||(window.TimeUntilElement=Z,window.customElements.define("time-until",Z));const J=new WeakMap,_=new WeakMap,G=new WeakMap;function Q(t){const e=t.currentTarget;if(!(e instanceof rt))return;const{box:n,image:i}=G.get(e)||{};if(!n||!i)return;let o=0,s=0;if(t instanceof KeyboardEvent)"ArrowUp"===t.key?s=-1:"ArrowDown"===t.key?s=1:"ArrowLeft"===t.key?o=-1:"ArrowRight"===t.key&&(o=1);else if(_.has(e)&&t instanceof MouseEvent){const n=_.get(e);o=t.pageX-n.dragStartX,s=t.pageY-n.dragStartY}else if(_.has(e)&&t instanceof TouchEvent){const{pageX:n,pageY:i}=t.changedTouches[0],{dragStartX:r,dragStartY:a}=_.get(e);o=n-r,s=i-a}if(0!==o||0!==s){const t=Math.min(Math.max(0,n.offsetLeft+o),i.width-n.offsetWidth),r=Math.min(Math.max(0,n.offsetTop+s),i.height-n.offsetHeight);n.style.left=`${t}px`,n.style.top=`${r}px`,st(e,{x:t,y:r,width:n.offsetWidth,height:n.offsetHeight})}if(t instanceof MouseEvent)_.set(e,{dragStartX:t.pageX,dragStartY:t.pageY});else if(t instanceof TouchEvent){const{pageX:n,pageY:i}=t.changedTouches[0];_.set(e,{dragStartX:n,dragStartY:i})}}function V(t){const e=t.target;if(!(e instanceof HTMLElement))return;const n=tt(e);if(!(n instanceof rt))return;const{box:i}=G.get(n)||{};if(!i)return;const o=n.getBoundingClientRect();let s,r,a;if(t instanceof KeyboardEvent){if("Escape"===t.key)return it(n);if("-"===t.key&&(a=-10),"="===t.key&&(a=10),!a)return;s=i.offsetWidth+a,r=i.offsetHeight+a,J.set(n,{startX:i.offsetLeft,startY:i.offsetTop})}else if(t instanceof MouseEvent){const e=J.get(n);if(!e)return;s=t.pageX-e.startX-o.left-window.pageXOffset,r=t.pageY-e.startY-o.top-window.pageYOffset}else if(t instanceof TouchEvent){const e=J.get(n);if(!e)return;s=t.changedTouches[0].pageX-e.startX-o.left-window.pageXOffset,r=t.changedTouches[0].pageY-e.startY-o.top-window.pageYOffset}s&&r&&nt(n,s,r,!(t instanceof KeyboardEvent))}function tt(t){const e=t.getRootNode();return e instanceof ShadowRoot?e.host:t}function et(t){const e=t.currentTarget;if(!(e instanceof HTMLElement))return;const n=tt(e);if(!(n instanceof rt))return;const{box:i}=G.get(n)||{};if(!i)return;const o=t.target;if(o instanceof HTMLElement)if(o.hasAttribute("data-direction")){const e=o.getAttribute("data-direction")||"";n.addEventListener("mousemove",V),n.addEventListener("touchmove",V,{passive:!0}),["nw","se"].indexOf(e)>=0&&n.classList.add("nwse"),["ne","sw"].indexOf(e)>=0&&n.classList.add("nesw"),J.set(n,{startX:i.offsetLeft+(["se","ne"].indexOf(e)>=0?0:i.offsetWidth),startY:i.offsetTop+(["se","sw"].indexOf(e)>=0?0:i.offsetHeight)}),V(t)}else n.addEventListener("mousemove",Q),n.addEventListener("touchmove",Q,{passive:!0})}function nt(t,e,n,i=!0){let o=Math.max(Math.abs(e),Math.abs(n),10);const s=J.get(t);if(!s)return;const{box:r,image:a}=G.get(t)||{};if(!r||!a)return;o=Math.min(o,n>0?a.height-s.startY:s.startY,e>0?a.width-s.startX:s.startX);const c=i?Math.round(Math.max(0,e>0?s.startX:s.startX-o)):r.offsetLeft,u=i?Math.round(Math.max(0,n>0?s.startY:s.startY-o)):r.offsetTop;r.style.left=`${c}px`,r.style.top=`${u}px`,r.style.width=`${o}px`,r.style.height=`${o}px`,st(t,{x:c,y:u,width:o,height:o})}function it(t){const{image:e}=G.get(t)||{};if(!e)return;const n=Math.round(e.clientWidth>e.clientHeight?e.clientHeight:e.clientWidth);J.set(t,{startX:(e.clientWidth-n)/2,startY:(e.clientHeight-n)/2}),nt(t,n,n)}function ot(t){const e=t.currentTarget;e instanceof rt&&(_.delete(e),e.classList.remove("nwse","nesw"),e.removeEventListener("mousemove",V),e.removeEventListener("mousemove",Q),e.removeEventListener("touchmove",V),e.removeEventListener("touchmove",Q))}function st(t,e){const{image:n}=G.get(t)||{};if(!n)return;const i=n.naturalWidth/n.width;for(const n in e){const o=Math.round(e[n]*i);e[n]=o;const s=t.querySelector(`[data-image-crop-input='${n}']`);s instanceof HTMLInputElement&&(s.value=o.toString())}t.dispatchEvent(new CustomEvent("image-crop-change",{bubbles:!0,detail:e}))}class rt extends HTMLElement{connectedCallback(){if(G.has(this))return;const t=this.attachShadow({mode:"open"});t.innerHTML='\n<style>\n  :host { touch-action: none; display: block; }\n  :host(.nesw) { cursor: nesw-resize; }\n  :host(.nwse) { cursor: nwse-resize; }\n  :host(.nesw) .crop-box, :host(.nwse) .crop-box { cursor: inherit; }\n  :host([loaded]) .crop-image { display: block; }\n  :host([loaded]) ::slotted([data-loading-slot]), .crop-image { display: none; }\n\n  .crop-wrapper {\n    position: relative;\n    font-size: 0;\n  }\n  .crop-container {\n    user-select: none;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    position: absolute;\n    overflow: hidden;\n    z-index: 1;\n    top: 0;\n    width: 100%;\n    height: 100%;\n  }\n\n  :host([rounded]) .crop-box {\n    border-radius: 50%;\n    box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);\n  }\n  .crop-box {\n    position: absolute;\n    border: 1px dashed #fff;\n    box-sizing: border-box;\n    cursor: move;\n  }\n\n  :host([rounded]) .crop-outline {\n    outline: none;\n  }\n  .crop-outline {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    outline: 4000px solid rgba(0, 0, 0, .3);\n  }\n\n  .handle { position: absolute; }\n  :host([rounded]) .handle::before { border-radius: 50%; }\n  .handle:before {\n    position: absolute;\n    display: block;\n    padding: 4px;\n    transform: translate(-50%, -50%);\n    content: \' \';\n    background: #fff;\n    border: 1px solid #767676;\n  }\n  .ne { top: 0; right: 0; cursor: nesw-resize; }\n  .nw { top: 0; left: 0; cursor: nwse-resize; }\n  .se { bottom: 0; right: 0; cursor: nwse-resize; }\n  .sw { bottom: 0; left: 0; cursor: nesw-resize; }\n</style>\n<slot></slot>\n<div class="crop-wrapper">\n  <img width="100%" class="crop-image" alt="">\n  <div class="crop-container">\n    <div data-crop-box class="crop-box">\n      <div class="crop-outline"></div>\n      <div data-direction="nw" class="handle nw"></div>\n      <div data-direction="ne" class="handle ne"></div>\n      <div data-direction="sw" class="handle sw"></div>\n      <div data-direction="se" class="handle se"></div>\n    </div>\n  </div>\n</div>\n';const e=t.querySelector("[data-crop-box]");if(!(e instanceof HTMLElement))return;const n=t.querySelector("img");n instanceof HTMLImageElement&&(G.set(this,{box:e,image:n}),n.addEventListener("load",(()=>{this.loaded=!0,it(this)})),this.addEventListener("mouseleave",ot),this.addEventListener("touchend",ot),this.addEventListener("mouseup",ot),e.addEventListener("mousedown",et),e.addEventListener("touchstart",et,{passive:!0}),this.addEventListener("keydown",Q),this.addEventListener("keydown",V),this.src&&(n.src=this.src))}static get observedAttributes(){return["src"]}get src(){return this.getAttribute("src")}set src(t){t?this.setAttribute("src",t):this.removeAttribute("src")}get loaded(){return this.hasAttribute("loaded")}set loaded(t){t?this.setAttribute("loaded",""):this.removeAttribute("loaded")}attributeChangedCallback(t,e,n){const{image:i}=G.get(this)||{};"src"===t&&(this.loaded=!1,i&&(i.src=n))}}window.customElements.get("image-crop")||(window.ImageCropElement=rt,window.customElements.define("image-crop",rt));class at extends HTMLElement{get preload(){return this.hasAttribute("preload")}set preload(t){t?this.setAttribute("preload",""):this.removeAttribute("preload")}get src(){return this.getAttribute("src")||""}set src(t){this.setAttribute("src",t)}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","menu");const t=this.parentElement;if(!t)return;const e=t.querySelector("summary");e&&(e.setAttribute("aria-haspopup","menu"),e.hasAttribute("role")||e.setAttribute("role","button"));const n=[lt(t,"compositionstart",(t=>Et(this,t))),lt(t,"compositionend",(t=>Et(this,t))),lt(t,"click",(e=>bt(t,e))),lt(t,"change",(e=>bt(t,e))),lt(t,"keydown",(e=>function(t,e,n){if(!(n instanceof KeyboardEvent))return;if(t.querySelector("details[open]"))return;const i=ct.get(e);if(!i||i.isComposing)return;const o=n.target instanceof Element&&"SUMMARY"===n.target.tagName;switch(n.key){case"Escape":t.hasAttribute("open")&&(wt(t),n.preventDefault(),n.stopPropagation());break;case"ArrowDown":{o&&!t.hasAttribute("open")&&t.setAttribute("open","");const e=ft(t,!0);e&&e.focus(),n.preventDefault()}break;case"ArrowUp":{o&&!t.hasAttribute("open")&&t.setAttribute("open","");const e=ft(t,!1);e&&e.focus(),n.preventDefault()}break;case"n":if(pt&&n.ctrlKey){const e=ft(t,!0);e&&e.focus(),n.preventDefault()}break;case"p":if(pt&&n.ctrlKey){const e=ft(t,!1);e&&e.focus(),n.preventDefault()}break;case" ":case"Enter":{const e=document.activeElement;e instanceof HTMLElement&&vt(e)&&e.closest("details")===t&&(n.preventDefault(),n.stopPropagation(),e.click())}}}(t,this,e))),lt(t,"toggle",(()=>dt(t,this)),{once:!0}),lt(t,"toggle",(()=>function(t){if(!t.hasAttribute("open"))return;for(const e of document.querySelectorAll("details[open] > details-menu")){const n=e.closest("details");n&&n!==t&&!n.contains(t)&&n.removeAttribute("open")}}(t))),this.preload?lt(t,"mouseover",(()=>dt(t,this)),{once:!0}):ut,...ht(t)];ct.set(this,{subscriptions:n,loaded:!1,isComposing:!1})}disconnectedCallback(){const t=ct.get(this);if(t){ct.delete(this);for(const e of t.subscriptions)e.unsubscribe()}}}const ct=new WeakMap,ut={unsubscribe(){}};function lt(t,e,n,i=!1){return t.addEventListener(e,n,i),{unsubscribe:()=>{t.removeEventListener(e,n,i)}}}function dt(t,e){const n=e.getAttribute("src");if(!n)return;const i=ct.get(e);if(!i)return;if(i.loaded)return;i.loaded=!0;const o=e.querySelector("include-fragment");o&&!o.hasAttribute("src")&&(o.addEventListener("loadend",(()=>mt(t))),o.setAttribute("src",n))}function ht(t){let e=!1;return[lt(t,"mousedown",(()=>e=!0)),lt(t,"keydown",(()=>e=!1)),lt(t,"toggle",(()=>{t.hasAttribute("open")&&(mt(t)||e||function(t){const e=document.activeElement;if(e&&vt(e)&&t.contains(e))return;const n=ft(t,!0);n&&n.focus()}(t))}))]}function mt(t){if(!t.hasAttribute("open"))return!1;const e=t.querySelector("details-menu [autofocus]");return!!e&&(e.focus(),!0)}function ft(t,e){const n=Array.from(t.querySelectorAll('[role^="menuitem"]:not([hidden]):not([disabled]):not([aria-disabled="true"])')),i=document.activeElement,o=i instanceof HTMLElement?n.indexOf(i):-1,s=e?n[o+1]:n[o-1],r=e?n[0]:n[n.length-1];return s||r}const pt=navigator.userAgent.match(/Macintosh/);function bt(t,e){const n=e.target;if(n instanceof Element&&n.closest("details")===t)if("click"===e.type){const e=n.closest('[role="menuitem"], [role="menuitemradio"]');if(!e)return;const i=e.querySelector("input");if("LABEL"===e.tagName&&n===i)return;"LABEL"===e.tagName&&i&&!i.checked||gt(e,t)}else if("change"===e.type){const e=n.closest('[role="menuitemradio"], [role="menuitemcheckbox"]');e&&gt(e,t)}}function gt(t,e){if(t.hasAttribute("disabled")||"true"===t.getAttribute("aria-disabled"))return;const n=t.closest("details-menu");if(!n)return;n.dispatchEvent(new CustomEvent("details-menu-select",{cancelable:!0,detail:{relatedTarget:t}}))&&(!function(t,e){const n=e.querySelector("[data-menu-button]");if(!n)return;const i=function(t){if(!t)return null;const e=t.hasAttribute("data-menu-button-text")?t:t.querySelector("[data-menu-button-text]");return e?e.getAttribute("data-menu-button-text")||e.textContent:null}(t);if(i)n.textContent=i;else{const e=function(t){if(!t)return null;const e=t.hasAttribute("data-menu-button-contents")?t:t.querySelector("[data-menu-button-contents]");return e?e.innerHTML:null}(t);e&&(n.innerHTML=e)}}(t,e),function(t,e){for(const n of e.querySelectorAll('[role="menuitemradio"], [role="menuitemcheckbox"]')){const e=n.querySelector('input[type="radio"], input[type="checkbox"]');let i=(n===t).toString();e instanceof HTMLInputElement&&(i=e.indeterminate?"mixed":e.checked.toString()),n.setAttribute("aria-checked",i)}}(t,e),"menuitemcheckbox"!==t.getAttribute("role")&&wt(e),n.dispatchEvent(new CustomEvent("details-menu-selected",{detail:{relatedTarget:t}})))}function vt(t){const e=t.getAttribute("role");return"menuitem"===e||"menuitemcheckbox"===e||"menuitemradio"===e}function wt(t){if(!t.hasAttribute("open"))return;t.removeAttribute("open");const e=t.querySelector("summary");e&&e.focus()}function Et(t,e){const n=ct.get(t);n&&(n.isComposing="compositionstart"===e.type)}function yt(t,e=!1){return function*(t,e={}){var n,i;const o=null!==(n=e.strict)&&void 0!==n&&n,s=null!==(i=e.onlyTabbable)&&void 0!==i&&i?Lt:At,r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>t instanceof HTMLElement&&s(t,o)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});let a=null;if(!e.reverse&&s(t,o)&&(yield t),e.reverse){let t=r.lastChild();for(;t;)a=t,t=r.lastChild()}else a=r.firstChild();for(;a instanceof HTMLElement;)yield a,a=e.reverse?r.previousNode():r.nextNode();e.reverse&&s(t,o)&&(yield t)}(t,{reverse:e,strict:!0,onlyTabbable:!0}).next().value}function At(t,e=!1){const n=["BUTTON","INPUT","SELECT","TEXTAREA","OPTGROUP","OPTION","FIELDSET"].includes(t.tagName)&&t.disabled,i=t.hidden,o=t instanceof HTMLInputElement&&"hidden"===t.type,s=t.classList.contains("sentinel");if(n||i||o||s)return!1;if(e){const e=0===t.offsetWidth||0===t.offsetHeight,n=["hidden","collapse"].includes(getComputedStyle(t).visibility),i=0===t.getClientRects().length;if(e||n||i)return!1}return null!=t.getAttribute("tabindex")||!(t instanceof HTMLAnchorElement&&null==t.getAttribute("href"))&&-1!==t.tabIndex}function Lt(t,e=!1){return At(t,e)&&"-1"!==t.getAttribute("tabindex")}window.customElements.get("details-menu")||(window.DetailsMenuElement=at,window.customElements.define("details-menu",at));let Tt=!1;function Mt(){}try{const t=Object.create({},{signal:{get(){Tt=!0}}});window.addEventListener("test",Mt,t),window.removeEventListener("test",Mt,t)}catch(t){}Tt||(function(){if("undefined"==typeof window)return;const t=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(e,n,i){return"object"==typeof i&&"signal"in i&&i.signal instanceof AbortSignal&&t.call(i.signal,"abort",(()=>{this.removeEventListener(e,n,i)})),t.call(this,e,n,i)}}(),Tt=!0);const xt=[];let kt;function Ct(t,e,n){const i=new AbortController,o=null!=n?n:i.signal;t.setAttribute("data-focus-trap","active");const s=document.createElement("span");s.setAttribute("class","sentinel"),s.setAttribute("tabindex","0"),s.setAttribute("aria-hidden","true"),s.onfocus=()=>{const e=yt(t,!0);null==e||e.focus()};const r=document.createElement("span");let a;function c(n){if(n instanceof HTMLElement&&document.contains(t)){if(t.contains(n))return void(a=n);if(a&&Lt(a)&&t.contains(a))return void a.focus();if(e&&t.contains(e))return void e.focus();{const e=yt(t);return void(null==e||e.focus())}}}r.setAttribute("class","sentinel"),r.setAttribute("tabindex","0"),r.setAttribute("aria-hidden","true"),r.onfocus=()=>{const e=yt(t);null==e||e.focus()},t.prepend(s),t.append(r);const u=function(t){const e=new AbortController;return t.addEventListener("abort",(()=>{e.abort()})),e}(o);if(kt){const t=kt;kt.container.setAttribute("data-focus-trap","suspended"),kt.controller.abort(),xt.push(t)}u.signal.addEventListener("abort",(()=>{kt=void 0})),o.addEventListener("abort",(()=>{t.removeAttribute("data-focus-trap");const e=t.getElementsByClassName("sentinel");for(;e.length>0;)e[0].remove();const n=xt.findIndex((e=>e.container===t));n>=0&&xt.splice(n,1),function(){const t=xt.pop();t&&Ct(t.container,t.initialFocus,t.originalSignal)}()})),document.addEventListener("focus",(t=>{c(t.target)}),{signal:u.signal,capture:!0}),c(document.activeElement),kt={container:t,controller:u,initialFocus:e,originalSignal:o};const l=xt.findIndex((e=>e.container===t));if(l>=0&&xt.splice(l,1),!n)return i}class St extends HTMLElement{constructor(){var t,e;super(),null===(t=this.querySelector(".close-button"))||void 0===t||t.addEventListener("click",(()=>this.close())),null===(e=document.body.querySelector(`.js-dialog-show-${this.id}`))||void 0===e||e.addEventListener("click",(t=>{t.stopPropagation(),this.show()}))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","dialog");const t=[Dt(this,"compositionstart",(t=>It(this,t))),Dt(this,"compositionend",(t=>It(this,t))),Dt(this,"keydown",(t=>function(t,e){if(!(e instanceof KeyboardEvent))return;const n=Ht.get(t);if(!n||n.isComposing)return;switch(e.key){case"Escape":t.hasAttribute("open")&&(t.close(),e.preventDefault(),e.stopPropagation())}}(this,t))),Dt(window,"click",(t=>function(t,e){const n=e.target;t.hasAttribute("open")&&n&&!n.matches(`#${t.id}, #${t.id} *`)&&t.close()}(this,t)))];Ht.set(this,{subscriptions:t,loaded:!1,isComposing:!1})}disconnectedCallback(){const t=Ht.get(this);if(t){Ht.delete(this);for(const e of t.subscriptions)e.unsubscribe()}}show(){var t;this.classList.contains("hidden")&&(this.classList.remove("hidden"),this.setAttribute("open",""),(null===(t=this.parentElement)||void 0===t?void 0:t.classList.contains("modal-dialog-backdrop"))&&this.parentElement.classList.add("active"),document.body.style.overflow="hidden",this.abortController=Ct(this))}close(){var t,e;this.classList.contains("hidden")||(this.classList.add("hidden"),this.removeAttribute("open"),(null===(t=this.parentElement)||void 0===t?void 0:t.classList.contains("modal-dialog-backdrop"))&&this.parentElement.classList.remove("active"),document.body.style.overflow="initial",null===(e=this.abortController)||void 0===e||e.abort())}}const Ht=new WeakMap;function Dt(t,e,n,i=!1){return t.addEventListener(e,n,i),{unsubscribe:()=>{t.removeEventListener(e,n,i)}}}function It(t,e){const n=Ht.get(t);n&&(n.isComposing="compositionstart"===e.type)}window.customElements.get("modal-dialog")||(window.ModalDialogElement=St,window.customElements.define("modal-dialog",St));
//# sourceMappingURL=primer_view_components.js.map
