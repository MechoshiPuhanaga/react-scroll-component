import React, { PureComponent } from 'react';

import DIRECTION_CONFIG from './config';

/**
 *
 * Wrap content and provide config object with the
 * following properties:
 *
 * const SCROLL_CONFIG = {
 *   className: {string}, // don't override 'height' or 'width' according to the 'direction',
 *   containerClass: {string} - Add class to the inner container that will wrap your content. Be careful when adding css properties. You might break the scroller here.
 *   containerRef: {function} - Use it to get a reference to the scrolling container. You can set scrollTop for 'vertical' or scrollLeft for 'horizontal' from the parent component. Don't forget to clear this reference.
 *   dimensionChangeTimeout: {number} - Call the handler for dimension change (height, width, maxHeight, maxWidth) with a timeout in milliseconds.
 *   direction: {string} - 'vertical' | 'horizontal'
 *   display: {string},
 *   height | width: {string} - 'height' for 'vertical' and 'width' for 'horizontal'
 *   maxHeight | maxWidth: {string} - Set 'maxHeight' for 'vertical' scroll. Set 'maxWidth' for 'horizontal' scroll. Defaults to 'none'
 *   initTimeout: {number} - in milliseconds - default is `200` - needed to ensure the rendering on the scroller on some devices or browsers
 *	 noInitTimeout: {boolean} - default is `false`
 *   observe: {boolean} - resize scroller on child and subtree changes; defaults to true
 *   observerTimeout: {number} - Call the mutation observer callback wit timeout in milliseconds
 *   onScrollerToggle: {function} - Callback that will be called after scroller appears or disappears. An object with a boolean property 'isDisplayed' will be provided as an argument to the callback.                                                                                                                                                                                                                                                                                                                                                                                             |            - |
 *   onTrackClick: {function} - Called when the track is clicked. An object with the following properties is provided as argument: 'container' and 'track' are references to the DOM elements, 'direction' (-1 for 'up' and 1 for 'down'), and 'event'. If this prop is provided it prevents the default shifting.
 *   resizeDebounce: {number}, // in milliseconds
 *   scroller: {
 *    left | right: {string},
 *    width: {string},
 *    + any other valid CSS property
 *    except 'position', 'top'/'bottom' for 'direction' 'vertical' and 'left'/'right' for 'horizontal'.
 *    Add vendor prefixes if necessary.
 *    Use PascalCase for the vendor prefixed properties.
 *   },
 *   scrollerClass: {string}, // use !important but don't override 'position'
 *   scrollSizeDebounce: {number} - If provided the scroller size will be calculated with timeout equal to the value (in milliseconds). Can be useful when the main dimension is dynamically changed with transition. Then this will recalculate the scroller size and display after transition is done.
 *   track: {boolean} - States if the track should be rendered. Defaults to false.
 *   trackClass: {string} - The class that will be applied to the track element.
 *   trackShift: {number} - The number of pixels that the container should scroll after clicking on the track.
 * };
 *
 * @class Scroll
 */
export class Scroll extends PureComponent {
  static resizeDebounce = 400;

  static initTimeout = 200;

  static debounce = (fn, time = 0) => {
    let timeout;

    return function() {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  dimensionChangeTimeoutIndex = null;
  observeTimeoutIndex = null;
  config = DIRECTION_CONFIG[this.props.direction];

  state = {
    compensation: 0,
    containerStyles: {
      [this.config.scrollDimension]: this.props[this.config.scrollDimension],
      [`max${this.config.scrollDimension[0].toUpperCase()}${this.config.scrollDimension.slice(1)}`]:
        this.props[`max${this.config.scrollDimension[0].toUpperCase()}${this.config.scrollDimension.slice(1)}`] ||
        'none',
      overflowX: this.config.overflow.x,
      overflowY: this.config.overflow.y,
      willChange: 'scroll-position'
    },
    containerSizeSet: false,
    moving: false,
    observe: this.props.observe !== undefined ? this.props.observe : true,
    scrollerStyles: {
      cursor: 'pointer',
      ...this.props.scroller,
      position: 'absolute',
      // See https://www.chromestatus.com/features/5093566007214080
      // and https://developers.google.com/web/updates/2017/01/scrolling-intervention
      touchAction: 'none',
      transition: `${this.config.scrollDimension} 300ms ease-in-out`,
      willChange: 'transform'
    },
    scrollerTranslate: 0,
    wrapperStyles: {
      position: 'relative',
      display: this.props.display || 'inline-block',
      [this.config.wrapper.overflowDimension]: 'auto',
      width: this.props.direction === 'horizontal' ? this.props.width : 'auto',
      overflow: 'hidden'
    }
  };

  observer = null;

  container = React.createRef();
  scroller = React.createRef();
  track = React.createRef();
  wrapper = React.createRef();

  getPagePosition(event, touchEvent, mouseEvent) {
    let position = 0;
    if (event.type === touchEvent) {
      position = event.changedTouches[0][this.config.pageCoordinate];
    } else if (event.type === mouseEvent) {
      position = event[this.config.pageCoordinate];
    }
    return position;
  }

  scrollerResize = () => {
    this.setScrollerSize(this.setScrollerTranslate);
  };

  init() {
    document.addEventListener('mousemove', this.moveScroller);
    document.addEventListener('mouseup', this.stopMovingScroller);
    document.addEventListener('mouseleave', this.stopMovingScroller);
    window.addEventListener('resize', this.resizeHandler);

    if (this.state.observe) {
      const observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
      };
      this.observer = new MutationObserver(() => {
        if (typeof this.props.observerTimeout === 'number') {
          clearTimeout(this.observeTimeoutIndex);
          this.observeTimeoutIndex = setTimeout(this.scrollerResize, this.props.observerTimeout);
        } else {
          this.scrollerResize();
        }
      });
      this.observer.observe(this.container.current, observerConfig);
    }

    if (this.props.noInitTimeout) {
      this.setScrollerSize(this.setScrollerTranslate);
    } else {
      setTimeout(
        () => {
          this.setScrollerSize(this.setScrollerTranslate);
        },
        typeof this.props.initTimeout === 'number' ? this.props.initTimeout : Scroll.initTimeout
      );
    }
  }

  scrollerSizeSetter = cb => {
    if (!this.container.current) {
      return;
    }
    const o = this.container.current[this.config.container.offsetDimension];
    const s = this.container.current[this.config.container.scrollDimension];
    const size = Math.floor(Math.pow(o, 2) / s);
    this.setState(prevState => {
      return {
        scrollerStyles: {
          ...prevState.scrollerStyles,
          display: s <= o ? 'none' : 'block',
          [this.config.scrollDimension]: `${size}px`
        }
      };
    }, cb);
  };

  debouncedScrollerSizeSetter = Scroll.debounce(this.scrollerSizeSetter, this.props.scrollSizeDebounce);

  setScrollerSize(cb) {
    if (typeof this.props.scrollSizeDebounce === 'number') {
      this.debouncedScrollerSizeSetter(cb);
    } else {
      this.scrollerSizeSetter(cb);
    }
  }

  startMovingScroller = event => {
    if (!this.wrapper.current) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const pagePosition = this.getPagePosition(event, 'touchstart', 'mousedown');

    this.setState({
      compensation: pagePosition - this.state.scrollerTranslate - this.wrapper.current[this.config.wrapper.offsetSide],
      moving: true
    });
  };

  moveScroller = event => {
    if (this.state.moving && this.scroller.current && this.wrapper.current) {
      const pagePosition = this.getPagePosition(event, 'touchmove', 'mousemove');
      const max =
        this.wrapper.current[this.config.wrapper.clientDimension] -
        this.scroller.current[this.config.scroller.clientDimension];
      let translate = pagePosition - this.wrapper.current[this.config.wrapper.offsetSide] - this.state.compensation;
      translate = Math.max(0, translate);
      translate = Math.min(max, translate);
      this.setState(prevState => {
        let transform = '';
        if (this.props.direction === 'horizontal') {
          transform = `translate3d(${translate}px,0px,0px)`;
        } else if (this.props.direction === 'vertical') {
          transform = `translate3d(0px,${translate}px,0px)`;
        }

        return {
          scrollerStyles: {
            ...prevState.scrollerStyles,
            transform,
            WebkitTransform: transform,
            MsTransform: transform
          },
          scrollerTranslate: translate
        };
      });
      this.setContainerScroll(translate);
    }
  };

  setScrollerTranslate = event => {
    if (!this.state.moving && this.container.current) {
      const scr = this.container.current[this.config.container.scrollSide];
      const o = this.container.current[this.config.container.offsetDimension];
      const s = this.container.current[this.config.container.scrollDimension];
      const scrollerSize = parseInt(this.state.scrollerStyles[this.config.scrollDimension], 10);
      const translate = ((o - scrollerSize) / (s - o)) * scr || 0;
      this.setState(prevState => {
        let transform = '';
        if (this.props.direction === 'horizontal') {
          transform = `translate3d(${translate}px,0px,0px)`;
        } else if (this.props.direction === 'vertical') {
          transform = `translate3d(0px,${translate}px,0px)`;
        }
        return {
          scrollerStyles: {
            ...prevState.scrollerStyles,
            transform,
            WebkitTransform: transform,
            MsTransform: transform
          },
          scrollerTranslate: translate
        };
      });
    }
  };

  stopMovingScroller = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ moving: false });
  };

  setContainerScroll(val) {
    if (!this.container.current || !this.scroller.current) {
      return;
    }

    const o = this.container.current[this.config.container.offsetDimension];
    const s = this.container.current[this.config.container.scrollDimension];
    const scrollerSize = this.scroller.current[this.config.scroller.offsetDimension];
    if (requestAnimationFrame) {
      requestAnimationFrame(() => {
        if (this.container.current) {
          this.container.current[this.config.container.scrollSide] = ((s - o) / (o - scrollerSize)) * val;
        }
      });
    } else {
      this.container.current[this.config.container.scrollSide] = ((s - o) / (o - scrollerSize)) * val;
    }
  }

  resizeHandler = Scroll.debounce(event => {
    this.clean();
    this.init();
  }, this.props.resizeDebounce || Scroll.resizeDebounce);

  clean() {
    document.removeEventListener('mousemove', this.moveScroller);
    document.removeEventListener('mouseup', this.stopMovingScroller);
    document.removeEventListener('mouseleave', this.stopMovingScroller);
    window.removeEventListener('resize', this.resizeHandler);
    this.observer && this.observer.disconnect();
    clearTimeout(this.observeTimeoutIndex);
    this.observer = null;
  }

  reset = () => {
    this.clean();
    this.init();
    if (typeof this.props.containerRef === 'function') {
      this.props.containerRef(this.container);
    }
  };

  propagateWheelAsScrollOnContainer = event => {
    if (this.container && this.container.current) {
      this.container.current.scrollTop += event.deltaY;
    }
  };

  trackClickHandler = event => {
    if (
      !this.container ||
      !this.container.current ||
      !this.scroller ||
      !this.scroller.current ||
      !this.track ||
      !this.track.current ||
      !this.wrapper ||
      !this.wrapper.current
    ) {
      return;
    }
    event.stopPropagation();

    const y = event.clientY - this.wrapper.current.offsetTop;
    let direction = null;

    if (y < this.state.scrollerTranslate) {
      direction = -1;
    } else if (y > this.state.scrollerTranslate + this.scroller.current.clientHeight) {
      direction = 1;
    }

    if (typeof this.props.onTrackClick === 'function') {
      this.props.onTrackClick({
        container: this.container.current,
        direction,
        event,
        track: this.track.current
      });
    } else if (typeof this.props.trackShift === 'number') {
      this.container.current.scrollTop += direction * this.props.trackShift;
    }
  };

  dimensionChangeHandler = () => {
    const { scrollDimension } = this.config;
    const maxScrollDimension = `max${scrollDimension[0].toUpperCase()}${scrollDimension.slice(1)}`;

    this.setState(prevState => {
      return {
        containerStyles: {
          ...prevState.containerStyles,
          [scrollDimension]: this.props[scrollDimension],
          [maxScrollDimension]: this.props[maxScrollDimension] || 'none'
        }
      };
    }, this.reset);
  };

  // *************************************************
  // ************** Lifecycle Methods ****************
  // *************************************************

  render() {
    return this.props.children ? (
      <div className={this.props.className} ref={this.wrapper} style={this.state.wrapperStyles}>
        {this.props.track ? (
          <div
            ref={this.track}
            className={this.props.trackClass}
            style={{
              position: 'absolute',
              height: '100%'
            }}
            onClick={this.trackClickHandler}
            onWheel={this.propagateWheelAsScrollOnContainer}
          />
        ) : null}
        <div
          className={this.props.scrollerClass}
          onMouseDown={this.startMovingScroller}
          onTouchStart={this.startMovingScroller}
          onTouchMove={this.moveScroller}
          onTouchEnd={this.stopMovingScroller}
          onWheel={this.propagateWheelAsScrollOnContainer}
          ref={this.scroller}
          style={this.state.scrollerStyles}
        />
        <div
          data-direction={this.props.direction}
          className={['react-scroll-component', this.props.containerClass].filter(Boolean).join(' ')}
          onScroll={this.setScrollerTranslate}
          ref={this.container}
          style={this.state.containerStyles}
          onTransitionEnd={this.scrollerResize}
        >
          {this.props.children}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .react-scroll-component {
                -ms-overflow-style: none;
                overflow: -moz-scrollbars-none;
                scrollbar-width: none;
            }
            .react-scroll-component::-webkit-scrollbar {
                display: none;
                width: 0 !important;
            }
            `
            }}
          />
        </div>
      </div>
    ) : null;
  }

  componentDidMount() {
    if (this.props.children) {
      this.init();
      if (typeof this.props.containerRef === 'function') {
        this.props.containerRef(this.container);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { scrollDimension } = this.config;

    if (this.props.children && this.props.children !== prevProps.children) {
      this.reset();
    } else if (!this.props.children) {
      this.clean();
    }

    const maxScrollDimension = `max${scrollDimension[0].toUpperCase()}${scrollDimension.slice(1)}`;

    if (
      this.props[scrollDimension] !== prevProps[scrollDimension] ||
      this.props[maxScrollDimension] !== prevProps[maxScrollDimension]
    ) {
      if (typeof this.props.dimensionChangeTimeout === 'number') {
        clearTimeout(this.dimensionChangeTimeoutIndex);
        this.dimensionChangeTimeoutIndex = setTimeout(() => {
          this.dimensionChangeHandler();
        }, this.props.dimensionChangeTimeout);
      } else {
        this.dimensionChangeHandler();
      }
    }

    if (prevState.scrollerStyles.display !== this.state.scrollerStyles.display) {
      if (typeof this.props.onScrollerToggle === 'function') {
        this.props.onScrollerToggle({
          isDisplayed: this.state.scrollerStyles.display === 'block'
        });
      }
    }
  }

  componentWillUnmount() {
    this.clean();
    clearTimeout(this.dimensionChangeTimeoutIndex);
  }
}

export default Scroll;
