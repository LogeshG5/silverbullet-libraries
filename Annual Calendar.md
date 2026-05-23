---
name: "Library/LogeshG5/Annual Calendar"
tags: meta/library
pageDecoration.prefix: "📅 "
files:
- Toggle Title Bar Visibility.md
---

# Annual Calendar


```space-lua
command.define {
  name = "Show Annual Calendar",
  run = function()
  
    local panzoomlib = [[
	/**
* Panzoom 4.6.2 for panning and zooming elements using CSS transforms
* Copyright Timmy Willison and other contributors
* https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
*/
((e,t)=>{"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Panzoom=t()})(this,function(){"undefined"!=typeof window&&(window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"function"!=typeof window.CustomEvent)&&(window.CustomEvent=function(e,t){t=t||{bubbles:!1,cancelable:!1,detail:null};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n});let i="undefined"!=typeof document&&!!document.documentMode,a;let l=["webkit","moz","ms"],s={};function z(e){if(s[e])return s[e];var t=a=a||document.createElement("div").style;if(e in t)return s[e]=e;var n=e[0].toUpperCase()+e.slice(1);let o=l.length;for(;o--;){var r=""+l[o]+n;if(r in t)return s[e]=r}}function r(e,t){return parseFloat(t[z(e)])||0}function c(e,t,n=window.getComputedStyle(e)){var o="border"===t?"Width":"";return{left:r(t+"Left"+o,n),right:r(t+"Right"+o,n),top:r(t+"Top"+o,n),bottom:r(t+"Bottom"+o,n)}}function X(e,t,n){e.style[z(t)]=n}function Y(e){let t=e.parentNode;t&&1===t.nodeType||(t=document.documentElement);var n=window.getComputedStyle(e),o=window.getComputedStyle(t),r=e.getBoundingClientRect(),a=t.getBoundingClientRect();return{elem:{style:n,width:r.width,height:r.height,top:r.top,bottom:r.bottom,left:r.left,right:r.right,margin:c(e,"margin",n),border:c(e,"border",n)},parent:{style:o,width:a.width,height:a.height,top:a.top,bottom:a.bottom,left:a.left,right:a.right,padding:c(t,"padding",o),border:c(t,"border",o)}}}let C={down:"mousedown",move:"mousemove",up:"mouseup mouseleave"};function N(e,t,n,o){C[e].split(" ").forEach(e=>{t.addEventListener(e,n,o)})}function T(e,t,n){C[e].split(" ").forEach(e=>{t.removeEventListener(e,n)})}function $(e,t){let n=e.length;for(;n--;)if(e[n].pointerId===t.pointerId)return n;return-1}function L(e,t){let n;if(t.touches){n=0;for(var o of t.touches)o.pointerId=n++,L(e,o)}else-1<(n=$(e,t))&&e.splice(n,1),e.push(t)}function V(e){let t=(e=e.slice(0)).pop();for(var n;n=e.pop();)t={clientX:(n.clientX-t.clientX)/2+t.clientX,clientY:(n.clientY-t.clientY)/2+t.clientY};return t}function G(e){var t;return e.length<2?0:(t=e[0],e=e[1],Math.sqrt(Math.pow(Math.abs(e.clientX-t.clientX),2)+Math.pow(Math.abs(e.clientY-t.clientY),2)))}"undefined"!=typeof window&&("function"==typeof window.PointerEvent?C={down:"pointerdown",move:"pointermove",up:"pointerup pointerleave pointercancel"}:"function"==typeof window.TouchEvent&&(C={down:"touchstart",move:"touchmove",up:"touchend touchcancel"}));let I=/^http:[\w\.\/]+svg$/;
/**
   * Panzoom for panning and zooming elements using CSS transforms
   * https://github.com/timmywil/panzoom
   *
   * Copyright Timmy Willison and other contributors
   * Released under the MIT license
   * https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
   *
   */
let R={animate:!1,canvas:!1,cursor:"move",disablePan:!1,disableZoom:!1,disableXAxis:!1,disableYAxis:!1,duration:200,easing:"ease-in-out",exclude:[],excludeClass:"panzoom-exclude",handleStartEvent:e=>{e.preventDefault(),e.stopPropagation()},maxScale:4,minScale:.125,overflow:"hidden",panOnlyWhenZoomed:!1,pinchAndPan:!1,relative:!1,setTransform:function(e,{x:t,y:n,scale:o,isSVG:r},a){X(e,"transform",`scale(${o}) translate(${t}px, ${n}px)`),r&&i&&(o=window.getComputedStyle(e).getPropertyValue("transform"),e.setAttribute("transform",o))},startX:0,startY:0,startScale:1,step:.3,touchAction:"none"};function e(d,p){if(!d)throw new Error("Panzoom requires an element as an argument");if(1!==d.nodeType)throw new Error("Panzoom requires an element with a nodeType of 1");if(!(e=>{let t=e;for(;t&&t.parentNode;){if(t.parentNode===document)return 1;t=t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}})(d))throw new Error("Panzoom should be called on elements that have been attached to the DOM");p=Object.assign(Object.assign({},R),p);e=d;let c=I.test(e.namespaceURI)&&"svg"!==e.nodeName.toLowerCase();var e;let n=d.parentNode;n.style.overflow=p.overflow,n.style.userSelect="none",n.style.touchAction=p.touchAction,(p.canvas?n:d).style.cursor=p.cursor,d.style.userSelect="none",d.style.touchAction=p.touchAction,X(d,"transformOrigin","string"==typeof p.origin?p.origin:c?"0 0":"50% 50%");let u=0,m=0,f=1,a=!1;function r(e,t,n){n.silent||(n=new CustomEvent(e,{detail:t}),d.dispatchEvent(n))}function l(t,n,e){let o={x:u,y:m,scale:f,isSVG:c,originalEvent:e};return requestAnimationFrame(()=>{var e;"boolean"==typeof n.animate&&(n.animate?(e=n,X(d,"transition",`${z("transform")} ${e.duration}ms `+e.easing)):X(d,"transition","none")),n.setTransform(d,o,n),r(t,o,n),r("panzoomchange",o,n)}),o}function s(e,t,n,o){var r,a,i,l,s=Object.assign(Object.assign({},p),o),c={x:u,y:m,opts:s};return(null!=o&&o.force||!(s.disablePan||s.panOnlyWhenZoomed&&f===s.startScale))&&(e=parseFloat(e),t=parseFloat(t),s.disableXAxis||(c.x=(s.relative?u:0)+e),s.disableYAxis||(c.y=(s.relative?m:0)+t),s.contain&&(e=((t=(e=(o=Y(d)).elem.width/f)*n)-e)/2,a=((r=(a=o.elem.height/f)*n)-a)/2,"inside"===s.contain?(i=(-o.elem.margin.left-o.parent.padding.left+e)/n,l=(o.parent.width-t-o.parent.padding.left-o.elem.margin.left-o.parent.border.left-o.parent.border.right+e)/n,c.x=Math.max(Math.min(c.x,l),i),l=(-o.elem.margin.top-o.parent.padding.top+a)/n,i=(o.parent.height-r-o.parent.padding.top-o.elem.margin.top-o.parent.border.top-o.parent.border.bottom+a)/n,c.y=Math.max(Math.min(c.y,i),l)):"outside"===s.contain&&(i=(-(t-o.parent.width)-o.parent.padding.left-o.parent.border.left-o.parent.border.right+e)/n,l=(e-o.parent.padding.left)/n,c.x=Math.max(Math.min(c.x,l),i),t=(-(r-o.parent.height)-o.parent.padding.top-o.parent.border.top-o.parent.border.bottom+a)/n,e=(a-o.parent.padding.top)/n,c.y=Math.max(Math.min(c.y,e),t))),s.roundPixels)&&(c.x=Math.round(c.x),c.y=Math.round(c.y)),c}function h(n,o){var r,a=Object.assign(Object.assign({},p),o),i={scale:f,opts:a};if(null!=o&&o.force||!a.disableZoom){let e=p.minScale,t=p.maxScale;a.contain&&(a=(o=Y(d)).elem.width/f,r=o.elem.height/f,1<a)&&1<r&&(a=(o.parent.width-o.parent.border.left-o.parent.border.right)/a,o=(o.parent.height-o.parent.border.top-o.parent.border.bottom)/r,"inside"===p.contain?t=Math.min(t,a,o):"outside"===p.contain&&(e=Math.max(e,a,o))),i.scale=Math.min(Math.max(n,e),t)}return i}function i(e,t,n,o){e=s(e,t,f,n);return u!==e.x||m!==e.y?(u=e.x,m=e.y,l("panzoompan",e.opts,o)):{x:u,y:m,scale:f,isSVG:c,originalEvent:o}}function g(n,o,r){var a=h(n,o),i=a.opts;if(null!=o&&o.force||!i.disableZoom){n=a.scale;let e=u,t=m;i.focal&&(o=i.focal,e=(o.x/n-o.x/f+u*n)/n,t=(o.y/n-o.y/f+m*n)/n);a=s(e,t,n,{relative:!1,force:!0});return u=a.x,m=a.y,f=n,l("panzoomzoom",i,r)}}function t(e,t){t=Object.assign(Object.assign(Object.assign({},p),{animate:!0}),t);return g(f*Math.exp((e?1:-1)*t.step),t)}function v(e,t,n,o){var r=Y(d);const a=r.parent.width-r.parent.padding.left-r.parent.padding.right-r.parent.border.left-r.parent.border.right,i=r.parent.height-r.parent.padding.top-r.parent.padding.bottom-r.parent.border.top-r.parent.border.bottom;let l=t.clientX-r.parent.left-r.parent.padding.left-r.parent.border.left-r.elem.margin.left,s=t.clientY-r.parent.top-r.parent.padding.top-r.parent.border.top-r.elem.margin.top;c||(l-=r.elem.width/f/2,s-=r.elem.height/f/2);t={x:l/a*(a*e),y:s/i*(i*e)};return g(e,Object.assign(Object.assign({},n),{animate:!1,focal:t}),o)}g(p.startScale,{animate:!1,force:!0}),setTimeout(()=>{i(p.startX,p.startY,{animate:!1,force:!0})});let y,b,w,x,O,E,S=[];function o(e){((t,n)=>{for(let e=t;null!=e;e=e.parentNode)if(o=e,r=n.excludeClass,1===o.nodeType&&-1<` ${o=o,(o.getAttribute("class")||"").trim()} `.indexOf(` ${r} `)||-1<n.exclude.indexOf(e))return 1;var o,r})(e.target,p)||(L(S,e),a=!0,p.handleStartEvent(e),y=u,b=m,r("panzoomstart",{x:u,y:m,scale:f,isSVG:c,originalEvent:e},p),e=V(S),w=e.clientX,x=e.clientY,O=f,E=G(S))}function M(t){if(a&&void 0!==y&&void 0!==b&&void 0!==w&&void 0!==x){L(S,t);var n,o=V(S),r=1<S.length;let e=f;r&&(0===E&&(E=G(S)),n=G(S)-E,v(e=h(n*p.step/80+O).scale,o,{animate:!1},t)),r&&!p.pinchAndPan||i(y+(o.clientX-w)/e,b+(o.clientY-x)/e,{animate:!1},t)}}function A(e){1===S.length&&r("panzoomend",{x:u,y:m,scale:f,isSVG:c,originalEvent:e},p);var t=S;if(e.touches)for(;t.length;)t.pop();else{e=$(t,e);-1<e&&t.splice(e,1)}a&&(a=!1,y=b=w=x=void 0)}let P=!1;function j(){P||(P=!0,N("down",p.canvas?n:d,o),N("move",document,M,{passive:!0}),N("up",document,A,{passive:!0}))}return p.noBind||j(),{bind:j,destroy:function(){P=!1,T("down",p.canvas?n:d,o),T("move",document,M),T("up",document,A)},eventNames:C,getPan:()=>({x:u,y:m}),getScale:()=>f,getOptions:()=>{var e,t=p,n={};for(e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n},handleDown:o,handleMove:M,handleUp:A,pan:i,reset:function(e){var e=Object.assign(Object.assign(Object.assign({},p),{animate:!0,force:!0}),e),t=(f=h(e.startScale,e).scale,s(e.startX,e.startY,f,e));return u=t.x,m=t.y,l("panzoomreset",e)},resetStyle:function(){n.style.overflow="",n.style.userSelect="",n.style.touchAction="",n.style.cursor="",d.style.cursor="",d.style.userSelect="",d.style.touchAction="",X(d,"transformOrigin","")},setOptions:function(e={}){for(var t in e)e.hasOwnProperty(t)&&(p[t]=e[t]);(e.hasOwnProperty("cursor")||e.hasOwnProperty("canvas"))&&(n.style.cursor=d.style.cursor="",(p.canvas?n:d).style.cursor=p.cursor),e.hasOwnProperty("overflow")&&(n.style.overflow=e.overflow),e.hasOwnProperty("touchAction")&&(n.style.touchAction=e.touchAction,d.style.touchAction=e.touchAction)},setStyle:(e,t)=>X(d,e,t),zoom:g,zoomIn:function(e){return t(!0,e)},zoomOut:function(e){return t(!1,e)},zoomToPoint:v,zoomWithWheel:function(e,t){e.preventDefault();var t=Object.assign(Object.assign(Object.assign({},p),t),{animate:!1}),n=(0===e.deltaY&&e.deltaX?e.deltaX:e.deltaY)<0?1:-1;return v(h(f*Math.exp(n*t.step/3),t).scale,e,t,e)}}}return e.defaultOptions=R,e});
	]]
  
  
    local html = [[
<style>
        :root {
            --bg: #1a1b26;
            --panel: #24283b;
            --grid: #414868;
            --text: #c0caf5;
            --today-bg: #bb3d52;
            --weekend-bg: rgba(80, 120, 104, 0.2);
            --accent: #bb9af7;
            --holiday-border: #9ece6a;
            --month-label-width: 30px;
            --calendar-min-width: 1200px;
            --calendar-width: max(100%, var(--calendar-min-width));
            --day-column-width: calc((var(--calendar-width) - (2 * var(--month-label-width))) / 31);
            --day-header-height: 30px;
            --event-lane-height: 22px;
            --row-bottom-padding: 0px;
        }

        html,
        body {
            height: 100%;
            margin: 0;
            overflow: hidden;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            padding: 20px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }

        .title-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-shrink: 0;
            flex-wrap: wrap;
            gap: 15px;
            padding-right: 40px;
        }

        .title-group {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .title-group h2 {
            margin: 0;
            white-space: nowrap;
        }

        #yearSelector {
            background: var(--panel);
            color: var(--text);
            border: 1px solid var(--grid);
            border-radius: 4px;
            padding: 4px;
            font-size: 1em;
            cursor: pointer;
        }

        .filters {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
        }

        .filters label {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            position: relative;
        }

        .filters input[type="checkbox"] {
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
        }

        .custom-checkbox {
            width: 13px;
            height: 13px;
            border: 2px solid var(--grid);
            border-radius: 3px;
            display: inline-block;
            position: relative;
            background-color: var(--bg);
            transition: background-color 0.2s, border-color 0.2s;
        }

        .filters input[type="checkbox"]:checked+.custom-checkbox {
            background-color: var(--color);
            border-color: var(--color);
        }

        .custom-checkbox::after {
            content: '';
            position: absolute;
            display: none;
            left: 5px;
            top: 1px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        .filters input[type="checkbox"]:checked+.custom-checkbox::after {
            display: block;
        }

        .filter-label-text {
            color: var(--text);
            opacity: 0.9;
            text-transform: capitalize;
            /* Added to capitalize the key for display */
        }

        .close-button {
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            background: transparent;
            border: none;
            color: var(--text);
            font-size: 24px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }

        .close-button:hover {
            opacity: 1;
        }

        .calendar-wrapper {
            overflow: hidden;
            border: 1px solid var(--grid);
            border-radius: 8px;
            background: var(--panel);
            position: relative;
            cursor: grab;
            touch-action: none;
        }

        .calendar {
            display: flex;
            flex-direction: column;
            min-width: var(--calendar-min-width);
            width: var(--calendar-width);
            transform-origin: 0 0;
            user-select: none;
        }

        .calendar-wrapper:active {
            cursor: grabbing;
        }

        .month-row {
            display: flex;
            width: var(--calendar-width);
            border-bottom: 1px solid var(--grid);
        }

        .quarter-end {
            border-bottom: 4px solid var(--grid);
        }

        .month-row:last-child {
            border-bottom: none;
        }

        .month-label {
            width: var(--month-label-width);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid var(--grid);
            box-sizing: border-box;
            font-weight: bold;
            font-size: 11px;
            background-color: rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .month-label.month-label-end {
            border-left: 1px solid var(--grid);
        }

        .quarter-end .month-label.month-label-end {
            border-bottom-width: 4px;
        }

        .month-row:last-child .month-label.month-label-end {
            border-bottom: none;
        }

        .month-label.toggleable:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }

        .month-label.month-label-end .month-label-content {
            transform: rotate(90deg);
        }

        .month-label-content {
            transform: rotate(-90deg);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .month-toggle {
            display: inline-block;
            transition: transform 0.2s;
        }

        .month-content {
            flex: 0 0 calc(31 * var(--day-column-width));
            width: calc(31 * var(--day-column-width));
            display: grid;
            grid-template-rows: var(--day-header-height) auto;
            --lane-count: 0;
            height: calc(var(--day-header-height) + (var(--lane-count) * var(--event-lane-height)) + var(--row-bottom-padding));
            overflow: hidden;
            transition: height 0.3s ease-in-out;
        }

        .days-grid {
            display: grid;
            grid-template-columns: repeat(31, minmax(0, 1fr));
            width: 100%;
            height: var(--day-header-height);
            z-index: 1;
        }

        .day,
        .empty-day {
            padding: 4px 2px;
            font-size: 11px;
            text-align: center;
            box-sizing: border-box;
            border-left: 1px solid var(--grid);
        }

        .day:first-child,
        .empty-day:first-child {
            border-left: none;
        }

        .day-header {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }

        .weekday {
            font-size: 9px;
            opacity: 0.6;
        }

        .day-number {
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        .day.today .day-number {
            background: var(--today-bg);
            color: white;
            font-weight: bold;
        }

        .day.weekend {
            background: var(--weekend-bg);
        }

        .day.holiday {
            background: var(--weekend-bg);
        }

        .empty-day {
            background-color: rgba(0, 0, 0, 0.15);
        }

        .event-layer {
            display: grid;
            grid-auto-rows: var(--event-lane-height);
            align-content: start;
            width: 100%;
            min-height: calc(var(--lane-count) * var(--event-lane-height));
            padding-bottom: var(--row-bottom-padding);
            box-sizing: border-box;
            z-index: 2;
        }

        .event-lane {
            position: relative;
            display: grid;
            grid-template-columns: repeat(31, minmax(0, 1fr));
            height: var(--event-lane-height);
            width: 100%;
        }

        .event-lane-grid {
            position: absolute;
            inset: 0;
            display: grid;
            grid-template-columns: repeat(31, minmax(0, 1fr));
            pointer-events: none;
            z-index: 1;
        }

        .event-lane-cell {
            border-left: 1px solid var(--grid);
            box-sizing: border-box;
        }

        .event-lane-cell:first-child {
            border-left: none;
        }

        .event-lane-cell.weekend {
            background: var(--weekend-bg);
        }

        .event-lane-cell.holiday {
            background: var(--weekend-bg);
        }

        .event-lane-cell.empty-day {
            background-color: rgba(0, 0, 0, 0.15);
        }

        .event-bar {
            height: calc(var(--event-lane-height) - 4px);
            margin-top: 2px;
            border-radius: 4px;
            font-size: 9px;
            padding: 0 6px;
            line-height: calc(var(--event-lane-height) - 4px);
            color: black;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
            cursor: pointer;
            z-index: 2;
        }

        .tooltip {
            position: absolute;
            background: #111;
            color: white;
            padding: 4px 6px;
            font-size: 11px;
            border-radius: 4px;
            display: none;
            z-index: 1000;
        }

        @media (max-width: 600px) {
            .title-container {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
	<div class="title-container">
        <div class="title-group">
            <h2>Annual Calendar</h2>
            <select id="yearSelector"></select>
        </div>
        <div id="filters" class="filters"></div>
        <button id="closeButton" class="close-button">&times;</button>
    </div>
    <div id="calendarWrapper" class="calendar-wrapper">
        <div id="calendar" class="calendar"></div>
    </div>
    <div id="tooltip" class="tooltip"></div>
		
]]


    local script = [[  
const MAX_LANES_COLLAPSED = 2;
        let TODAY = new Date();
        let CURRENT_YEAR = TODAY.getUTCFullYear();
        let selectedYear = CURRENT_YEAR;
        let calendarPanZoom;
        let minimumScale = 1;
        let isSyncingPanZoom = false;

        const collapsedMonths = new Set();


        const groups = groupsList.reduce((accumulator, currentItem) => {
            accumulator[currentItem.name] = {
                ref: currentItem.ref,
                color: currentItem.color
            };
            return accumulator;
        }, {});
        let activeGroups = new Set(Object.keys(groups));
        function parseDate(dateStr, yearContext) {
            if (!dateStr) return null;
            const parts = dateStr.split('-');
            const year = parts.length === 3 ? Number(parts[2]) : yearContext;
            const month = Number(parts[1]) - 1;
            const day = Number(parts[0]);
            return new Date(Date.UTC(year, month, day));
        }

        function getWeekdayShort(d) {
            return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][d.getUTCDay()];
        }

        const tooltip = document.getElementById("tooltip");
        const calendarWrapper = document.getElementById("calendarWrapper");
        const calendarElement = document.getElementById("calendar");

        function initializePanZoom() {
            if (calendarPanZoom || typeof Panzoom !== 'function') return;

            calendarPanZoom = Panzoom(calendarElement, {
                maxScale: 5,
                contain: 'outside',
            });

            calendarElement.parentElement.addEventListener('wheel', calendarPanZoom.zoomWithWheel);
            calendarWrapper.addEventListener('wheel', calendarPanZoom.zoomWithWheel);
        }

        function showTooltip(e, text) {
            tooltip.innerText = text;
            tooltip.style.display = "block";
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        }
        function hideTooltip() { tooltip.style.display = "none"; }

        function renderYearSelector() {
            const selector = document.getElementById("yearSelector");
            selector.innerHTML = "";
            const years = [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2];
            years.forEach(y => {
                const option = document.createElement("option");
                option.value = y;
                option.innerText = y;
                if (y === selectedYear) option.selected = true;
                selector.appendChild(option);
            });
            selector.onchange = () => {
                selectedYear = parseInt(selector.value);
                buildCalendar();
            };
        }

        function renderFilters() {
            const filtersDiv = document.getElementById("filters");
            filtersDiv.innerHTML = '';
            Object.keys(groups).forEach(key => { // Use key as label
                const g = groups[key];
                const label = document.createElement("label");
                label.style.setProperty('--color', g.color);
                label.innerHTML = `
                    <input type="checkbox" ${activeGroups.has(key) ? 'checked' : ''} data-group="${key}">
                    <span class="custom-checkbox"></span>
                    <span class="filter-label-text">${key}</span>
                `; // Capitalize key for display
                label.querySelector("input").onchange = (e) => {
                    if (e.target.checked) activeGroups.add(key); else activeGroups.delete(key);
                    buildCalendar();
                };
                filtersDiv.appendChild(label);
            });
        }

        function createMonthLabel(monthName, month, isToggleable, isCollapsed, isEndLabel = false) {
            const monthLabel = document.createElement("div");
            monthLabel.className = `month-label${isEndLabel ? ' month-label-end' : ''}`;
            if (isToggleable) monthLabel.classList.add("toggleable");

            monthLabel.innerHTML = `<div class="month-label-content"><span>${monthName}</span>${isToggleable ? `<span class="month-toggle">${isCollapsed ? '+' : '-'}</span>` : ''}</div>`;

            if (isToggleable) {
                monthLabel.onclick = () => {
                    if (collapsedMonths.has(month)) collapsedMonths.delete(month);
                    else collapsedMonths.add(month);
                    buildCalendar();
                };
            }

            return monthLabel;
        }

        function buildCalendar() {
            const calendar = document.getElementById("calendar");
            calendar.innerHTML = "";
            const yearEvents = events.filter(ev => {
                const startYear = ev.startDate.split('-')[2];
                return !startYear || Number(startYear) === selectedYear;
            });
            const holidayEvents = yearEvents.filter(ev => ev.group === 'Holiday');

            for (let month = 0; month < 12; month++) {
                const monthRow = document.createElement("div");
                monthRow.className = "month-row";
                if (month === 2 || month === 5 || month === 8) {
                    monthRow.classList.add('quarter-end');
                }

                const monthEvents = yearEvents.filter(ev => {
                    if (!activeGroups.has(ev.group)) return false;
                    const s = parseDate(ev.startDate, selectedYear);
                    const e = parseDate(ev.endDate || ev.startDate, selectedYear);
                    return s.getUTCFullYear() <= selectedYear && e.getUTCFullYear() >= selectedYear && s.getUTCMonth() <= month && e.getUTCMonth() >= month;
                });

                const daysInMonth = new Date(Date.UTC(selectedYear, month + 1, 0)).getUTCDate();
                const lanes = [];

                monthEvents.sort((a, b) => parseDate(a.startDate, selectedYear) - parseDate(b.startDate, selectedYear)).forEach(ev => {
                    const s = parseDate(ev.startDate, selectedYear);
                    const e = parseDate(ev.endDate || ev.startDate, selectedYear);
                    const startDay = s.getUTCMonth() === month ? s.getUTCDate() : 1;
                    const endDay = e.getUTCMonth() === month ? e.getUTCDate() : daysInMonth;

                    let placed = false;
                    for (let i = 0; i < lanes.length; i++) {
                        if (!lanes[i].some(laneEv => endDay >= laneEv.start && startDay <= laneEv.end)) {
                            lanes[i].push({ start: startDay, end: endDay, event: ev });
                            placed = true;
                            break;
                        }
                    }
                    if (!placed) { lanes.push([{ start: startDay, end: endDay, event: ev }]); }
                });

                const isToggleable = lanes.length > MAX_LANES_COLLAPSED;
                const isCollapsed = collapsedMonths.has(month);

                const monthName = new Date(Date.UTC(selectedYear, month)).toLocaleString('default', { month: 'short', timeZone: 'UTC' });
                const monthLabel = createMonthLabel(monthName, month, isToggleable, isCollapsed);
                monthRow.appendChild(monthLabel);

                const monthContent = document.createElement("div");
                monthContent.className = "month-content";

                const daysGrid = document.createElement("div");
                daysGrid.className = "days-grid";
                for (let d = 1; d <= 31; d++) {
                    const dayCell = document.createElement("div");
                    if (d > daysInMonth) {
                        dayCell.className = "empty-day";
                    } else {
                        dayCell.className = "day";
                        const date = new Date(Date.UTC(selectedYear, month, d));
                        dayCell.innerHTML = `<div class="day-header"><span class="day-number">${d}</span><span class="weekday">${getWeekdayShort(date)}</span></div>`;
                        if (date.toDateString() === TODAY.toDateString()) dayCell.classList.add("today");
                        if (date.getUTCDay() === 0 || date.getUTCDay() === 6) dayCell.classList.add("weekend");
                        if (holidayEvents.some(ev => {
                            const ds = parseDate(ev.startDate, selectedYear);
                            const de = parseDate(ev.endDate || ev.startDate, selectedYear);
                            return date >= ds && date <= de;
                        })) {
                            dayCell.classList.add("holiday");
                        }
                    }
                    daysGrid.appendChild(dayCell);
                }
                monthContent.appendChild(daysGrid);

                const eventLayer = document.createElement("div");
                eventLayer.className = "event-layer";
                const lanesToShow = isToggleable && isCollapsed ? lanes.slice(0, MAX_LANES_COLLAPSED) : lanes;
                monthContent.style.setProperty('--lane-count', lanesToShow.length);

                lanesToShow.forEach(lane => {
                    const laneDiv = document.createElement("div");
                    laneDiv.className = "event-lane";
                    const laneGrid = document.createElement("div");
                    laneGrid.className = "event-lane-grid";
                    for (let dayIndex = 1; dayIndex <= 31; dayIndex++) {
                        const laneCell = document.createElement("div");
                        laneCell.className = "event-lane-cell";
                        if (dayIndex > daysInMonth) {
                            laneCell.classList.add("empty-day");
                        } else {
                            const laneDate = new Date(Date.UTC(selectedYear, month, dayIndex));
                            if (laneDate.getUTCDay() === 0 || laneDate.getUTCDay() === 6) laneCell.classList.add("weekend");
                            if (holidayEvents.some(ev => {
                                const ds = parseDate(ev.startDate, selectedYear);
                                const de = parseDate(ev.endDate || ev.startDate, selectedYear);
                                return laneDate >= ds && laneDate <= de;
                            })) {
                                laneCell.classList.add("holiday");
                            }
                        }
                        laneGrid.appendChild(laneCell);
                    }
                    laneDiv.appendChild(laneGrid);
                    lane.forEach(eventInLane => {
                        const bar = document.createElement("div");
                        bar.className = "event-bar";
                        bar.innerText = eventInLane.event.name;
                        bar.style.background = groups[eventInLane.event.group].color;
                        bar.style.gridColumn = `${eventInLane.start} / ${eventInLane.end + 1}`;
                        bar.onmousemove = e => showTooltip(e, `${eventInLane.event.name} (${eventInLane.event.group.charAt(0).toUpperCase() + eventInLane.event.group.slice(1)})`); // Use capitalized key as label
                        bar.onmouseleave = hideTooltip;
                        laneDiv.appendChild(bar);
                    });
                    eventLayer.appendChild(laneDiv);
                });

                monthContent.appendChild(eventLayer);
                monthRow.appendChild(monthContent);
                monthRow.appendChild(createMonthLabel(monthName, month, isToggleable, isCollapsed, true));
                calendar.appendChild(monthRow);
            }
        }

        renderYearSelector();
        renderFilters();
        buildCalendar();
        initializePanZoom();

        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', async () => {
            if (typeof syscall !== 'undefined') {
                syscall("editor.invokeCommand", "Editor: Toggle Title Bar Visibility");
                
				const wasRoChanged = await syscall("editor.getUiOption", "changedROMode");
				if (wasRoChanged) {
					await syscall("editor.setUiOption", "changedROMode", false);
					await syscall("editor.setUiOption", "forcedROMode", false);
					await syscall("editor.rebuildEditorState");
				}
				await syscall("editor.hidePanel", "modal");
            } else {
                console.log("Close button clicked - syscall not available.");
            }
        });

		]]

    local groups = query[[from p = index.tag "item" where table.includes(p.itags, "CalGroup") select p.ref, p.name, p.color]]
    groupsjs = "const groupsList = " .. js.stringify(js.tojs(groups)) .. ";"

    local events = query[[from p = index.tag "item" where table.includes(p.itags, "CalEvent") select p.ref, p.name, p.startDate, p.endDate, p.group]]
    eventsjs = "const events = " .. js.stringify(js.tojs(events)) .. ";"

    scripted = groupsjs .. eventsjs .. panzoomlib .. script
    editor.showPanel("modal", 1, html, scripted)
    editor.invokeCommand("Editor: Toggle Title Bar Visibility")
	
	editor.setUiOption("changedROMode", false)
	local ro = editor.getUiOption("forcedROMode")
	if not ro then 
		editor.setUiOption("forcedROMode", true)
		editor.setUiOption("changedROMode", true)
		editor.rebuildEditorState()
	end
    
  end
}
```
