!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactScrollComponent=t(require("react")):e.ReactScrollComponent=t(e.React)}(window,function(n){return function(n){var o={};function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}return r.m=n,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(0),u=n.n(r),p={horizontal:{container:{dimension:"height",offsetDimension:"offsetWidth",scrollDimension:"scrollWidth",scrollSide:"scrollLeft"},overflow:{x:"scroll",y:"hidden"},pageCoordinate:"pageX",scrollbar:{clientDimension:"clientHeight",offsetDimension:"offsetHeight"},scrollDimension:"width",scroller:{clientDimension:"clientWidth",offsetDimension:"offsetWidth"},wrapper:{clientDimension:"clientWidth",offsetSide:"offsetLeft",overflowDimension:"height"}},vertical:{container:{dimension:"width",offsetDimension:"offsetHeight",scrollDimension:"scrollHeight",scrollSide:"scrollTop"},overflow:{x:"hidden",y:"scroll"},pageCoordinate:"pageY",scrollbar:{clientDimension:"clientWidth",offsetDimension:"offsetWidth"},scrollDimension:"height",scroller:{clientDimension:"clientHeight",offsetDimension:"offsetHeight"},wrapper:{clientDimension:"clientHeight",offsetSide:"offsetTop",overflowDimension:"width"}}};function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var s,c=e[Symbol.iterator]();!(o=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(e){v(t,e,n[e])})}return t}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=function(e){function a(){var e,t,n,i,o,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);for(var s=arguments.length,c=new Array(s),l=0;l<s;l++)c[l]=arguments[l];return o=this,r=(e=d(a)).call.apply(e,[this].concat(c)),v(h(h(i=!r||"object"!==f(r)&&"function"!=typeof r?h(o):r)),"_isMounted",!1),v(h(h(i)),"dimensionChangeTimeoutIndex",null),v(h(h(i)),"observeTimeoutIndex",null),v(h(h(i)),"config",p[i.props.direction]),v(h(h(i)),"state",{compensation:0,containerStyles:(t={},v(t,i.config.scrollDimension,i.props[i.config.scrollDimension]),v(t,"max".concat(i.config.scrollDimension[0].toUpperCase()).concat(i.config.scrollDimension.slice(1)),i.props["max".concat(i.config.scrollDimension[0].toUpperCase()).concat(i.config.scrollDimension.slice(1))]||"none"),v(t,"overflowX",i.config.overflow.x),v(t,"overflowY",i.config.overflow.y),v(t,"willChange","scroll-position"),t),containerSizeSet:!1,moving:!1,observe:void 0===i.props.observe||i.props.observe,scrollerStyles:m({cursor:"pointer"},i.props.scroller,{position:"absolute",touchAction:"none",transition:"".concat(i.config.scrollDimension," 300ms ease-in-out"),willChange:"transform"}),scrollerTranslate:0,wrapperStyles:(n={position:"relative",display:i.props.display||"inline-block"},v(n,i.config.wrapper.overflowDimension,"auto"),v(n,"width","horizontal"===i.props.direction?i.props.width:"auto"),v(n,"overflow","hidden"),n)}),v(h(h(i)),"observer",null),v(h(h(i)),"container",u.a.createRef()),v(h(h(i)),"scroller",u.a.createRef()),v(h(h(i)),"track",u.a.createRef()),v(h(h(i)),"wrapper",u.a.createRef()),v(h(h(i)),"scrollerResizeAndTranslate",function(){i.setScrollerSize(i.setScrollerTranslate)}),v(h(h(i)),"scrollerSizeSetter",function(e){if(i.container.current){var t=i.container.current[i.config.container.offsetDimension],n=i.container.current[i.config.container.scrollDimension],o=Math.floor(Math.pow(t,2)/n);i._isMounted&&i.setState(function(e){return{scrollerStyles:m({},e.scrollerStyles,v({display:n<=t?"none":"block"},i.config.scrollDimension,"".concat(o,"px")))}},e)}}),v(h(h(i)),"debouncedScrollerSizeSetter",a.debounce(i.scrollerSizeSetter,i.props.scrollSizeDebounce)),v(h(h(i)),"startMovingScroller",function(e){if(i.wrapper.current){e.preventDefault(),e.stopPropagation();var t=i.getPagePosition(e,"touchstart","mousedown");i._isMounted&&i.setState({compensation:t-i.state.scrollerTranslate-i.wrapper.current[i.config.wrapper.offsetSide],moving:!0})}}),v(h(h(i)),"moveScroller",function(e){if(i.state.moving&&i.scroller.current&&i.wrapper.current){var t=i.getPagePosition(e,"touchmove","mousemove"),n=i.wrapper.current[i.config.wrapper.clientDimension]-i.scroller.current[i.config.scroller.clientDimension],o=t-i.wrapper.current[i.config.wrapper.offsetSide]-i.state.compensation;o=Math.max(0,o),o=Math.min(n,o),i._isMounted&&i.setState(function(e){var t="";return"horizontal"===i.props.direction?t="translate3d(".concat(o,"px,0px,0px)"):"vertical"===i.props.direction&&(t="translate3d(0px,".concat(o,"px,0px)")),{scrollerStyles:m({},e.scrollerStyles,{transform:t,WebkitTransform:t,MsTransform:t}),scrollerTranslate:o}}),i.setContainerScroll(o)}}),v(h(h(i)),"setScrollerTranslate",function(e){if(!i.state.moving&&i.container.current){var t=i.container.current[i.config.container.scrollSide],n=i.container.current[i.config.container.offsetDimension],o=i.container.current[i.config.container.scrollDimension],r=(n-parseInt(i.state.scrollerStyles[i.config.scrollDimension],10))/(o-n)*t||0;i._isMounted&&i.setState(function(e){var t="";return"horizontal"===i.props.direction?t="translate3d(".concat(r,"px,0px,0px)"):"vertical"===i.props.direction&&(t="translate3d(0px,".concat(r,"px,0px)")),{scrollerStyles:m({},e.scrollerStyles,{transform:t,WebkitTransform:t,MsTransform:t}),scrollerTranslate:r}})}}),v(h(h(i)),"stopMovingScroller",function(e){e.preventDefault(),e.stopPropagation(),i._isMounted&&i.setState({moving:!1})}),v(h(h(i)),"resizeHandler",a.debounce(i.scrollerResizeAndTranslate,i.props.resizeDebounce||a.resizeDebounce)),v(h(h(i)),"propagateWheelAsScrollOnContainer",function(e){i.container&&i.container.current&&(i.container.current.scrollTop+=e.deltaY)}),v(h(h(i)),"trackClickHandler",function(e){if(e.stopPropagation(),i.container&&i.container.current&&i.scroller&&i.scroller.current&&i.track&&i.track.current&&i.wrapper&&i.wrapper.current){var t=e.clientY-i.wrapper.current.offsetTop,n=null;t<i.state.scrollerTranslate?n=-1:t>i.state.scrollerTranslate+i.scroller.current.clientHeight&&(n=1),"function"==typeof i.props.onTrackClick?i.props.onTrackClick({container:i.container.current,direction:n,event:e,track:i.track.current}):"number"==typeof i.props.trackShift&&(i.container.current.scrollTop+=n*i.props.trackShift)}}),v(h(h(i)),"dimensionChangeHandler",function(){var n=i.config.scrollDimension,o="max".concat(n[0].toUpperCase()).concat(n.slice(1));i._isMounted&&i.setState(function(e){var t;return{containerStyles:m({},e.containerStyles,(t={},v(t,n,i.props[n]),v(t,o,i.props[o]||"none"),t))}},i.scrollerResizeAndTranslate)}),i}var t,n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(a,r["PureComponent"]),t=a,o=[{key:"setStyleTag",value:function(){var e=i(document.getElementsByTagName("head"),1)[0];if(!!!document.getElementById("react-scroll-component")){var t=document.createElement("style");t.id="react-scroll-component",t.innerHTML='\n            .react-scroll-component {\n                -ms-overflow-style: none;\n                overflow: -moz-scrollbars-none;\n                scrollbar-width: none;\n            }\n            .react-scroll-component::-webkit-scrollbar {\n                display: none;\n                width: 0 !important;\n            }\n            :-moz-any(.react-scroll-component[data-direction="vertical"]) {\n                margin-right: -17px !important;\n                overflow-x:hidden;\n            }\n            :-moz-any(.react-scroll-component[data-direction="horizontal"])  {\n                margin-bottom: -17px !important;\n                overflow-y:hidden;\n            }',e.appendChild(t)}}}],(n=[{key:"getPagePosition",value:function(e,t,n){var o=0;return e.type===t?o=e.changedTouches[0][this.config.pageCoordinate]:e.type===n&&(o=e[this.config.pageCoordinate]),o}},{key:"init",value:function(){var e=this;if(document.addEventListener("mousemove",this.moveScroller),document.addEventListener("mouseup",this.stopMovingScroller),window.addEventListener("resize",this.resizeHandler),this.state.observe){this.observer=new MutationObserver(function(){"number"==typeof e.props.observerTimeout?(clearTimeout(e.observeTimeoutIndex),e.observeTimeoutIndex=setTimeout(e.scrollerResizeAndTranslate,e.props.observerTimeout)):e.scrollerResizeAndTranslate()}),this.observer.observe(this.container.current,{characterData:!0,childList:!0,subtree:!0})}this.props.noInitTimeout?this.setScrollerSize(this.setScrollerTranslate):setTimeout(function(){e.setScrollerSize(e.setScrollerTranslate)},"number"==typeof this.props.initTimeout?this.props.initTimeout:a.initTimeout)}},{key:"setScrollerSize",value:function(e){"number"==typeof this.props.scrollSizeDebounce?this.debouncedScrollerSizeSetter(e):this.scrollerSizeSetter(e)}},{key:"setContainerScroll",value:function(e){var t=this;if(this.container.current&&this.scroller.current){var n=this.container.current[this.config.container.offsetDimension],o=this.container.current[this.config.container.scrollDimension],r=this.scroller.current[this.config.scroller.offsetDimension];requestAnimationFrame?requestAnimationFrame(function(){t.container.current&&(t.container.current[t.config.container.scrollSide]=(o-n)/(n-r)*e)}):this.container.current[this.config.container.scrollSide]=(o-n)/(n-r)*e}}},{key:"clean",value:function(){document.removeEventListener("mousemove",this.moveScroller),document.removeEventListener("mouseup",this.stopMovingScroller),window.removeEventListener("resize",this.resizeHandler),this.observer&&this.observer.disconnect(),clearTimeout(this.observeTimeoutIndex),clearTimeout(this.dimensionChangeTimeoutIndex),this.observer=null}},{key:"render",value:function(){return this.props.children?u.a.createElement("div",{className:this.props.className,ref:this.wrapper,style:this.state.wrapperStyles},this.props.track&&"block"===this.state.scrollerStyles.display?u.a.createElement("div",{ref:this.track,className:this.props.trackClass,style:{position:"absolute",height:"100%"},onClick:this.trackClickHandler,onWheel:this.propagateWheelAsScrollOnContainer}):null,u.a.createElement("div",{className:this.props.scrollerClass,onMouseDown:this.startMovingScroller,onTouchStart:this.startMovingScroller,onTouchMove:this.moveScroller,onTouchEnd:this.stopMovingScroller,onWheel:this.propagateWheelAsScrollOnContainer,ref:this.scroller,style:this.state.scrollerStyles}),u.a.createElement("div",{"data-direction":this.props.direction,className:["react-scroll-component",this.props.containerClass].filter(Boolean).join(" "),onScroll:this.setScrollerTranslate,ref:this.container,style:this.state.containerStyles,onTransitionEnd:this.scrollerResizeAndTranslate},this.props.children)):null}},{key:"componentDidMount",value:function(){this._isMounted=!0,a.setStyleTag(),this.init(),"function"==typeof this.props.containerRef&&this.props.containerRef(this.container)}},{key:"componentDidUpdate",value:function(e,t){var n=this,o=this.config.scrollDimension,r="max".concat(o[0].toUpperCase()).concat(o.slice(1));this.props[o]===e[o]&&this.props[r]===e[r]||("number"==typeof this.props.dimensionChangeTimeout?(clearTimeout(this.dimensionChangeTimeoutIndex),this.dimensionChangeTimeoutIndex=setTimeout(function(){n.dimensionChangeHandler()},this.props.dimensionChangeTimeout)):this.dimensionChangeHandler()),t.scrollerStyles.display!==this.state.scrollerStyles.display&&"function"==typeof this.props.onScrollerToggle&&this.props.onScrollerToggle({isDisplayed:"block"===this.state.scrollerStyles.display})}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.clean()}}])&&s(t.prototype,n),o&&s(t,o),a}();v(o,"resizeDebounce",400),v(o,"initTimeout",200),v(o,"debounce",function(n){var o,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return function(){var e=this,t=arguments;clearTimeout(o),o=setTimeout(function(){return n.apply(e,t)},r)}});var l=o;n.d(t,"Scroll",function(){return l});t.default=l}])});