import React, { PureComponent } from 'react';

import DIRECTION_CONFIG from './config';

export class Scroll extends PureComponent {
  static resizeDebounce = 400;

  static initTimeout = 200;

  static debounce = (fn, time = 0) => {
    let timeout;

    return (...args) => {
      const functionCall = () => fn.apply(this, args);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  static setStyleTag() {
    const [head] = document.getElementsByTagName('head');
    const hasStyleTag = !!document.getElementById('react-scroll-component');
    if (!hasStyleTag) {
      const styleTag = document.createElement('style');
      styleTag.id = 'react-scroll-component';
      styleTag.innerHTML = `
            .react-scroll-component {
                -ms-overflow-style: none;
                overflow: -moz-scrollbars-none;
                scrollbar-width: none;
            }
            .react-scroll-component::-webkit-scrollbar {
                display: none;
                width: 0 !important;
            }
            :-moz-any(.react-scroll-component[data-direction="vertical"]) {
                margin-right: -17px !important;
                overflow-x:hidden;
            }
            :-moz-any(.react-scroll-component[data-direction="horizontal"])  {
                margin-bottom: -17px !important;
                overflow-y:hidden;
            }`;
      head.appendChild(styleTag);
    }
  }

  _isMounted = false;

  dimensionChangeTimeoutIndex = null;

  observeTimeoutIndex = null;

  // eslint-disable-next-line react/destructuring-assignment
  config = DIRECTION_CONFIG[this.props.direction];

  state = {
    compensation: 0,
    containerStyles: {
      // eslint-disable-next-line react/destructuring-assignment
      [this.config.scrollDimension]: this.props[this.config.scrollDimension],
      [`max${this.config.scrollDimension[0].toUpperCase()}${this.config.scrollDimension.slice(
        1
      )}`]:
        // eslint-disable-next-line react/destructuring-assignment
        this.props[
          `max${this.config.scrollDimension[0].toUpperCase()}${this.config.scrollDimension.slice(
            1
          )}`
        ] || 'none',
      overflowX: this.config.overflow.x,
      overflowY: this.config.overflow.y,
      willChange: 'scroll-position'
    },
    moving: false,
    // eslint-disable-next-line react/destructuring-assignment
    observe: this.props.observe !== undefined ? this.props.observe : true,
    scrollerStyles: {
      cursor: 'pointer',
      // eslint-disable-next-line react/destructuring-assignment
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
      // eslint-disable-next-line react/destructuring-assignment
      display: this.props.display || 'inline-block',
      [this.config.wrapper.overflowDimension]: 'auto',
      // eslint-disable-next-line react/destructuring-assignment
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

  scrollerResizeAndTranslate = () => {
    this.setScrollerSize(this.setScrollerTranslate);
  };

  init() {
    document.addEventListener('mousemove', this.moveScroller);
    document.addEventListener('mouseup', this.stopMovingScroller);
    window.addEventListener('resize', this.resizeHandler);

    const { observe } = this.state;
    const { initTimeout, noInitTimeout, observerTimeout } = this.props;

    if (observe) {
      const observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
      };
      this.observer = new MutationObserver(() => {
        if (typeof observerTimeout === 'number') {
          clearTimeout(this.observeTimeoutIndex);
          this.observeTimeoutIndex = setTimeout(
            this.scrollerResizeAndTranslate,
            observerTimeout
          );
        } else {
          this.scrollerResizeAndTranslate();
        }
      });
      this.observer.observe(this.container.current, observerConfig);
    }

    if (noInitTimeout) {
      this.setScrollerSize(this.setScrollerTranslate);
    } else {
      setTimeout(
        () => {
          this.setScrollerSize(this.setScrollerTranslate);
        },
        typeof initTimeout === 'number' ? initTimeout : Scroll.initTimeout
      );
    }
  }

  scrollerSizeSetter = (cb) => {
    if (!this.container.current) {
      return;
    }

    const { minScrollerSize } = this.props;

    const o = this.container.current[this.config.container.offsetDimension];
    const s = this.container.current[this.config.container.scrollDimension];

    const relativeSize = Math.floor(o ** 2 / s);
    let size = Math.max(relativeSize, minScrollerSize || 0);
    size = Math.min(size, o);

    if (this._isMounted) {
      this.setState(
        (prevState) => ({
          scrollerStyles: {
            ...prevState.scrollerStyles,
            display: s <= o ? 'none' : 'block',
            [this.config.scrollDimension]: `${size}px`
          }
        }),
        cb
      );
    }
  };

  debouncedScrollerSizeSetter = Scroll.debounce(
    this.scrollerSizeSetter,
    // eslint-disable-next-line react/destructuring-assignment
    this.props.scrollSizeDebounce
  );

  setScrollerSize(cb) {
    const { scrollSizeDebounce } = this.props;

    if (typeof scrollSizeDebounce === 'number') {
      this.debouncedScrollerSizeSetter(cb);
    } else {
      this.scrollerSizeSetter(cb);
    }
  }

  startMovingScroller = (event) => {
    if (!this.wrapper.current) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const { scrollerTranslate } = this.state;

    const pagePosition = this.getPagePosition(event, 'touchstart', 'mousedown');

    if (this._isMounted) {
      this.setState({
        compensation:
          pagePosition -
          scrollerTranslate -
          this.wrapper.current[this.config.wrapper.offsetSide],
        moving: true
      });
    }
  };

  moveScroller = (event) => {
    const { compensation, moving } = this.state;
    const { direction } = this.props;

    if (moving && this.scroller.current && this.wrapper.current) {
      const pagePosition = this.getPagePosition(
        event,
        'touchmove',
        'mousemove'
      );
      const max =
        this.wrapper.current[this.config.wrapper.clientDimension] -
        this.scroller.current[this.config.scroller.clientDimension];
      let translate =
        pagePosition -
        this.wrapper.current[this.config.wrapper.offsetSide] -
        compensation;
      translate = Math.max(0, translate);
      translate = Math.min(max, translate);

      if (this._isMounted) {
        this.setState((prevState) => {
          let transform = '';
          if (direction === 'horizontal') {
            transform = `translate3d(${translate}px,0px,0px)`;
          } else if (direction === 'vertical') {
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

      this.setContainerScroll(translate);
    }
  };

  setScrollerTranslate = () => {
    const { moving, scrollerStyles } = this.state;
    const { direction } = this.props;

    if (!moving && this.container.current) {
      const scr = this.container.current[this.config.container.scrollSide];
      const o = this.container.current[this.config.container.offsetDimension];
      const s = this.container.current[this.config.container.scrollDimension];
      const scrollerSize = parseInt(
        scrollerStyles[this.config.scrollDimension],
        10
      );
      const translate = ((o - scrollerSize) / (s - o)) * scr || 0;

      if (this._isMounted) {
        this.setState((prevState) => {
          let transform = '';
          if (direction === 'horizontal') {
            transform = `translate3d(${translate}px,0px,0px)`;
          } else if (direction === 'vertical') {
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
    }
  };

  stopMovingScroller = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this._isMounted) {
      this.setState({ moving: false });
    }
  };

  setContainerScroll(val) {
    if (!this.container.current || !this.scroller.current) {
      return;
    }

    const o = this.container.current[this.config.container.offsetDimension];
    const s = this.container.current[this.config.container.scrollDimension];
    const scrollerSize =
      this.scroller.current[this.config.scroller.offsetDimension];
    if (requestAnimationFrame) {
      requestAnimationFrame(() => {
        if (this.container.current) {
          this.container.current[this.config.container.scrollSide] =
            ((s - o) / (o - scrollerSize)) * val;
        }
      });
    } else {
      this.container.current[this.config.container.scrollSide] =
        ((s - o) / (o - scrollerSize)) * val;
    }
  }

  resizeHandler = Scroll.debounce(
    this.scrollerResizeAndTranslate,
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resizeDebounce || Scroll.resizeDebounce
  );

  clean() {
    document.removeEventListener('mousemove', this.moveScroller);
    document.removeEventListener('mouseup', this.stopMovingScroller);
    window.removeEventListener('resize', this.resizeHandler);

    if (this.observer) {
      this.observer.disconnect();
    }

    clearTimeout(this.observeTimeoutIndex);
    clearTimeout(this.dimensionChangeTimeoutIndex);
    this.observer = null;
  }

  propagateWheelAsScrollOnContainer = (event) => {
    if (this.container && this.container.current) {
      this.container.current.scrollTop += event.deltaY;
    }
  };

  trackClickHandler = (event) => {
    event.stopPropagation();
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

    const { onTrackClick, trackShift } = this.props;

    let direction = null;

    const { top: scrollerTop, bottom: scrollerBottom } =
      this.scroller.current.getBoundingClientRect();

    const clickIsAboveScroller = event.clientY < scrollerTop;
    const clickIsBelowScroller = event.clientY > scrollerBottom;

    if (clickIsAboveScroller) {
      direction = -1;
    } else if (clickIsBelowScroller) {
      direction = 1;
    }

    if (typeof onTrackClick === 'function') {
      onTrackClick({
        container: this.container.current,
        direction,
        event,
        track: this.track.current
      });
    } else if (typeof trackShift === 'number') {
      this.container.current.scrollTop += direction * trackShift;
    }
  };

  dimensionChangeHandler = () => {
    const { scrollDimension } = this.config;
    const maxScrollDimension = `max${scrollDimension[0].toUpperCase()}${scrollDimension.slice(
      1
    )}`;

    if (this._isMounted) {
      this.setState(
        (prevState) => ({
          containerStyles: {
            ...prevState.containerStyles,
            // eslint-disable-next-line react/destructuring-assignment
            [scrollDimension]: this.props[scrollDimension],
            // eslint-disable-next-line react/destructuring-assignment
            [maxScrollDimension]: this.props[maxScrollDimension] || 'none'
          }
        }),
        this.scrollerResizeAndTranslate
      );
    }
  };

  // *************************************************
  // ************** Lifecycle Methods ****************
  // *************************************************

  render() {
    const { containerStyles, scrollerStyles, wrapperStyles } = this.state;
    const {
      children,
      className,
      containerClass,
      direction,
      scrollerClass,
      track,
      trackClass
    } = this.props;

    return children ? (
      <div className={className} ref={this.wrapper} style={wrapperStyles}>
        {track && scrollerStyles.display === 'block' ? (
          <div
            ref={this.track}
            className={trackClass}
            style={{
              position: 'absolute',
              height: '100%'
            }}
            onClick={this.trackClickHandler}
            onWheel={this.propagateWheelAsScrollOnContainer}
          />
        ) : null}
        <div
          className={scrollerClass}
          onMouseDown={this.startMovingScroller}
          onTouchStart={this.startMovingScroller}
          onTouchMove={this.moveScroller}
          onTouchEnd={this.stopMovingScroller}
          onWheel={this.propagateWheelAsScrollOnContainer}
          ref={this.scroller}
          style={scrollerStyles}
        />
        <div
          data-direction={direction}
          className={['react-scroll-component', containerClass]
            .filter(Boolean)
            .join(' ')}
          onScroll={this.setScrollerTranslate}
          ref={this.container}
          style={containerStyles}
          onTransitionEnd={this.scrollerResizeAndTranslate}
        >
          {children}
        </div>
      </div>
    ) : null;
  }

  componentDidMount() {
    const { containerRef } = this.props;

    this._isMounted = true;
    Scroll.setStyleTag();
    this.init();
    if (typeof containerRef === 'function') {
      containerRef(this.container);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { scrollDimension } = this.config;
    const { scrollerStyles } = this.state;
    const { dimensionChangeTimeout, onScrollerToggle } = this.props;

    const maxScrollDimension = `max${scrollDimension[0].toUpperCase()}${scrollDimension.slice(
      1
    )}`;

    if (
      // eslint-disable-next-line react/destructuring-assignment
      this.props[scrollDimension] !== prevProps[scrollDimension] ||
      // eslint-disable-next-line react/destructuring-assignment
      this.props[maxScrollDimension] !== prevProps[maxScrollDimension]
    ) {
      if (typeof dimensionChangeTimeout === 'number') {
        clearTimeout(this.dimensionChangeTimeoutIndex);
        this.dimensionChangeTimeoutIndex = setTimeout(() => {
          this.dimensionChangeHandler();
        }, dimensionChangeTimeout);
      } else {
        this.dimensionChangeHandler();
      }
    }

    if (prevState.scrollerStyles.display !== scrollerStyles.display) {
      if (typeof onScrollerToggle === 'function') {
        onScrollerToggle({
          isDisplayed: scrollerStyles.display === 'block'
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.clean();
  }
}

export default Scroll;
