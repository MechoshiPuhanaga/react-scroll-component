!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactScrollComponent=t(require("react")):e.ReactScrollComponent=t(e.React)}(self,(function(e){return(()=>{"use strict";var t={698:t=>{t.exports=e}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{r.r(o),r.d(o,{Scroll:()=>v,default:()=>y});var e=r(698),t=r.n(e);const n={horizontal:{container:{dimension:"height",offsetDimension:"offsetWidth",scrollDimension:"scrollWidth",scrollSide:"scrollLeft"},overflow:{x:"scroll",y:"hidden"},pageCoordinate:"pageX",scrollbar:{clientDimension:"clientHeight",offsetDimension:"offsetHeight"},scrollDimension:"width",scroller:{clientDimension:"clientWidth",offsetDimension:"offsetWidth"},wrapper:{clientDimension:"clientWidth",offsetSide:"offsetLeft",overflowDimension:"height"}},vertical:{container:{dimension:"width",offsetDimension:"offsetHeight",scrollDimension:"scrollHeight",scrollSide:"scrollTop"},overflow:{x:"hidden",y:"scroll"},pageCoordinate:"pageY",scrollbar:{clientDimension:"clientWidth",offsetDimension:"offsetWidth"},scrollDimension:"height",scroller:{clientDimension:"clientHeight",offsetDimension:"offsetHeight"},wrapper:{clientDimension:"clientHeight",offsetSide:"offsetTop",overflowDimension:"width"}}};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(g,e);var r,o,i,s,v,y=(s=g,v=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(s);if(v){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function g(){var e,r,o;a(this,g);for(var i=arguments.length,c=new Array(i),s=0;s<i;s++)c[s]=arguments[s];return h(m(o=y.call.apply(y,[this].concat(c))),"_isMounted",!1),h(m(o),"dimensionChangeTimeoutIndex",null),h(m(o),"observeTimeoutIndex",null),h(m(o),"config",n[o.props.direction]),h(m(o),"state",{compensation:0,containerStyles:(e={},h(e,o.config.scrollDimension,o.props[o.config.scrollDimension]),h(e,"max".concat(o.config.scrollDimension[0].toUpperCase()).concat(o.config.scrollDimension.slice(1)),o.props["max".concat(o.config.scrollDimension[0].toUpperCase()).concat(o.config.scrollDimension.slice(1))]||"none"),h(e,"overflowX",o.config.overflow.x),h(e,"overflowY",o.config.overflow.y),h(e,"willChange","scroll-position"),e),moving:!1,observe:void 0===o.props.observe||o.props.observe,scrollerStyles:l(l({cursor:"pointer"},o.props.scroller),{},{position:"absolute",touchAction:"none",transition:"".concat(o.config.scrollDimension," 300ms ease-in-out"),willChange:"transform"}),scrollerTranslate:0,wrapperStyles:(r={position:"relative",display:o.props.display||"inline-block"},h(r,o.config.wrapper.overflowDimension,"auto"),h(r,"width","horizontal"===o.props.direction?o.props.width:"auto"),h(r,"overflow","hidden"),r)}),h(m(o),"observer",null),h(m(o),"container",t().createRef()),h(m(o),"scroller",t().createRef()),h(m(o),"track",t().createRef()),h(m(o),"wrapper",t().createRef()),h(m(o),"scrollerResizeAndTranslate",(function(){o.setScrollerSize(o.setScrollerTranslate)})),h(m(o),"scrollerSizeSetter",(function(e){if(o.container.current){var t=o.props.minScrollerSize,n=o.container.current[o.config.container.offsetDimension],r=o.container.current[o.config.container.scrollDimension],i=Math.floor(Math.pow(n,2)/r),c=Math.max(i,t||0);c=Math.min(c,n),o._isMounted&&o.setState((function(e){return{scrollerStyles:l(l({},e.scrollerStyles),{},h({display:r<=n?"none":"block"},o.config.scrollDimension,"".concat(c,"px")))}}),e)}})),h(m(o),"debouncedScrollerSizeSetter",g.debounce(o.scrollerSizeSetter,o.props.scrollSizeDebounce)),h(m(o),"startMovingScroller",(function(e){if(o.wrapper.current){e.preventDefault(),e.stopPropagation();var t=o.state.scrollerTranslate,n=o.getPagePosition(e,"touchstart","mousedown");o._isMounted&&o.setState({compensation:n-t-o.wrapper.current[o.config.wrapper.offsetSide],moving:!0})}})),h(m(o),"moveScroller",(function(e){var t=o.state,n=t.compensation,r=t.moving,i=o.props.direction;if(r&&o.scroller.current&&o.wrapper.current){var c=o.getPagePosition(e,"touchmove","mousemove"),s=o.wrapper.current[o.config.wrapper.clientDimension]-o.scroller.current[o.config.scroller.clientDimension],a=c-o.wrapper.current[o.config.wrapper.offsetSide]-n;a=Math.max(0,a),a=Math.min(s,a),o._isMounted&&o.setState((function(e){var t="";return"horizontal"===i?t="translate3d(".concat(a,"px,0px,0px)"):"vertical"===i&&(t="translate3d(0px,".concat(a,"px,0px)")),{scrollerStyles:l(l({},e.scrollerStyles),{},{transform:t,WebkitTransform:t,MsTransform:t}),scrollerTranslate:a}})),o.setContainerScroll(a)}})),h(m(o),"setScrollerTranslate",(function(){var e=o.state,t=e.moving,n=e.scrollerStyles,r=o.props.direction;if(!t&&o.container.current){var i=o.container.current[o.config.container.scrollSide],c=o.container.current[o.config.container.offsetDimension],s=o.container.current[o.config.container.scrollDimension],a=(c-parseInt(n[o.config.scrollDimension],10))/(s-c)*i||0;o._isMounted&&o.setState((function(e){var t="";return"horizontal"===r?t="translate3d(".concat(a,"px,0px,0px)"):"vertical"===r&&(t="translate3d(0px,".concat(a,"px,0px)")),{scrollerStyles:l(l({},e.scrollerStyles),{},{transform:t,WebkitTransform:t,MsTransform:t}),scrollerTranslate:a}}))}})),h(m(o),"stopMovingScroller",(function(e){e.preventDefault(),e.stopPropagation(),o._isMounted&&o.setState({moving:!1})})),h(m(o),"resizeHandler",g.debounce(o.scrollerResizeAndTranslate,o.props.resizeDebounce||g.resizeDebounce)),h(m(o),"propagateWheelAsScrollOnContainer",(function(e){o.container&&o.container.current&&(o.container.current.scrollTop+=e.deltaY)})),h(m(o),"trackClickHandler",(function(e){if(e.stopPropagation(),o.container&&o.container.current&&o.scroller&&o.scroller.current&&o.track&&o.track.current&&o.wrapper&&o.wrapper.current){var t=o.props,n=t.onTrackClick,r=t.trackShift,i=null,c=o.scroller.current.getBoundingClientRect(),s=c.top,l=c.bottom,a=e.clientY<s,u=e.clientY>l;a?i=-1:u&&(i=1),"function"==typeof n?n({container:o.container.current,direction:i,event:e,track:o.track.current}):"number"==typeof r&&(o.container.current.scrollTop+=i*r)}})),h(m(o),"dimensionChangeHandler",(function(){var e=o.config.scrollDimension,t="max".concat(e[0].toUpperCase()).concat(e.slice(1));o._isMounted&&o.setState((function(n){var r;return{containerStyles:l(l({},n.containerStyles),{},(r={},h(r,e,o.props[e]),h(r,t,o.props[t]||"none"),r))}}),o.scrollerResizeAndTranslate)})),o}return r=g,i=[{key:"setStyleTag",value:function(){var e,t,n=(e=document.getElementsByTagName("head"),t=1,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,i=[],c=!0,s=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];if(!document.getElementById("react-scroll-component")){var r=document.createElement("style");r.id="react-scroll-component",r.innerHTML='\n            .react-scroll-component {\n                -ms-overflow-style: none;\n                overflow: -moz-scrollbars-none;\n                scrollbar-width: none;\n            }\n            .react-scroll-component::-webkit-scrollbar {\n                display: none;\n                width: 0 !important;\n            }\n            :-moz-any(.react-scroll-component[data-direction="vertical"]) {\n                margin-right: -17px !important;\n                overflow-x:hidden;\n            }\n            :-moz-any(.react-scroll-component[data-direction="horizontal"])  {\n                margin-bottom: -17px !important;\n                overflow-y:hidden;\n            }',n.appendChild(r)}}}],(o=[{key:"getPagePosition",value:function(e,t,n){var r=0;return e.type===t?r=e.changedTouches[0][this.config.pageCoordinate]:e.type===n&&(r=e[this.config.pageCoordinate]),r}},{key:"init",value:function(){var e=this;document.addEventListener("mousemove",this.moveScroller),document.addEventListener("mouseup",this.stopMovingScroller),window.addEventListener("resize",this.resizeHandler);var t=this.state.observe,n=this.props,r=n.initTimeout,o=n.noInitTimeout,i=n.observerTimeout;t&&(this.observer=new MutationObserver((function(){"number"==typeof i?(clearTimeout(e.observeTimeoutIndex),e.observeTimeoutIndex=setTimeout(e.scrollerResizeAndTranslate,i)):e.scrollerResizeAndTranslate()})),this.observer.observe(this.container.current,{characterData:!0,childList:!0,subtree:!0})),o?this.setScrollerSize(this.setScrollerTranslate):setTimeout((function(){e.setScrollerSize(e.setScrollerTranslate)}),"number"==typeof r?r:g.initTimeout)}},{key:"setScrollerSize",value:function(e){"number"==typeof this.props.scrollSizeDebounce?this.debouncedScrollerSizeSetter(e):this.scrollerSizeSetter(e)}},{key:"setContainerScroll",value:function(e){var t=this;if(this.container.current&&this.scroller.current){var n=this.container.current[this.config.container.offsetDimension],r=this.container.current[this.config.container.scrollDimension],o=this.scroller.current[this.config.scroller.offsetDimension];requestAnimationFrame?requestAnimationFrame((function(){t.container.current&&(t.container.current[t.config.container.scrollSide]=(r-n)/(n-o)*e)})):this.container.current[this.config.container.scrollSide]=(r-n)/(n-o)*e}}},{key:"clean",value:function(){document.removeEventListener("mousemove",this.moveScroller),document.removeEventListener("mouseup",this.stopMovingScroller),window.removeEventListener("resize",this.resizeHandler),this.observer&&this.observer.disconnect(),clearTimeout(this.observeTimeoutIndex),clearTimeout(this.dimensionChangeTimeoutIndex),this.observer=null}},{key:"render",value:function(){var e=this.state,n=e.containerStyles,r=e.scrollerStyles,o=e.wrapperStyles,i=this.props,c=i.children,s=i.className,l=i.containerClass,a=i.direction,u=i.scrollerClass,f=i.track,p=i.trackClass;return c?t().createElement("div",{className:s,ref:this.wrapper,style:o},f&&"block"===r.display?t().createElement("div",{ref:this.track,className:p,style:{position:"absolute",height:"100%"},onClick:this.trackClickHandler,onWheel:this.propagateWheelAsScrollOnContainer}):null,t().createElement("div",{className:u,onMouseDown:this.startMovingScroller,onTouchStart:this.startMovingScroller,onTouchMove:this.moveScroller,onTouchEnd:this.stopMovingScroller,onWheel:this.propagateWheelAsScrollOnContainer,ref:this.scroller,style:r}),t().createElement("div",{"data-direction":a,className:["react-scroll-component",l].filter(Boolean).join(" "),onScroll:this.setScrollerTranslate,ref:this.container,style:n,onTransitionEnd:this.scrollerResizeAndTranslate},c)):null}},{key:"componentDidMount",value:function(){var e=this.props.containerRef;this._isMounted=!0,g.setStyleTag(),this.init(),"function"==typeof e&&e(this.container)}},{key:"componentDidUpdate",value:function(e,t){var n=this,r=this.config.scrollDimension,o=this.state.scrollerStyles,i=this.props,c=i.dimensionChangeTimeout,s=i.onScrollerToggle,l="max".concat(r[0].toUpperCase()).concat(r.slice(1));this.props[r]===e[r]&&this.props[l]===e[l]||("number"==typeof c?(clearTimeout(this.dimensionChangeTimeoutIndex),this.dimensionChangeTimeoutIndex=setTimeout((function(){n.dimensionChangeHandler()}),c)):this.dimensionChangeHandler()),t.scrollerStyles.display!==o.display&&"function"==typeof s&&s({isDisplayed:"block"===o.display})}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.clean()}}])&&u(r.prototype,o),i&&u(r,i),g}(e.PureComponent);h(v,"resizeDebounce",400),h(v,"initTimeout",200),h(v,"debounce",(function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];var c=function(){return e.apply(v,o)};clearTimeout(t),t=setTimeout(c,n)}}));const y=v})(),o})()}));