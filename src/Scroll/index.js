import React, { PureComponent } from 'react';

import DIRECTION_CONFIG from './config';

/**
 *
 * Wrap content and provide config object with the
 * following properties:
 *
 * const SCROLL_CONFIG = {
 *   className: {string}, // don't override 'height' or 'width' according to the 'direction',
 *   direction: {string} - 'vertical' | 'horizontal'
 *   display: {string},
 *   height | width: {string} - 'height' for 'vertical' and 'width' for 'horizontal'
 *   initTimeout: {number} - in milliseconds - default is `200` - needed to ensure the rendering on the scroller on some devices or browsers
 *	 noInitTimeout: {boolean} - default is `false`
 *   observe: {boolean} - resize scroller on child and subtree changes; defaults to true
 *   resizeDebounce: {number}, // in milliseconds
 *   scroller: {
 *    left | right: {string},
 *    width: {string},
 *    + any other valid CSS property
 *    except 'position', 'top'/'bottom' for 'direction' 'vertical' and 'left'/'right' for 'horizontal'.
 *    Add vendor prefixes if necessary.
 *    Use PascalCase for the vendor prefixed properties.
 *   },
 *   scrollerClass: {string}, // use !important but don't override 'position',
 * };
 *
 * @class Scroll
 */
export class Scroll extends PureComponent {
  static resizeDebounce = 400;

  static initTimeout = 200;

  static debounce = (fn, time) => {
    let timeout;

    return function() {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  config = DIRECTION_CONFIG[this.props.direction];

  state = {
    compensation: 0,
    containerStyles: {
      [this.config.scrollDimension]: this.props[this.config.scrollDimension],
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
        this.setScrollerSize(this.setScrollerTranslate);
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

  setScrollerSize(cb) {
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
  }

  startMovingScroller = event => {
    event.preventDefault();
    event.stopPropagation();

    const pagePosition = this.getPagePosition(event, 'touchstart', 'mousedown');

    this.setState({
      compensation: pagePosition - this.state.scrollerTranslate - this.wrapper.current[this.config.wrapper.offsetSide],
      moving: true
    });
  };

  moveScroller = event => {
    if (this.state.moving) {
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
    if (!this.state.moving) {
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
    const o = this.container.current[this.config.container.offsetDimension];
    const s = this.container.current[this.config.container.scrollDimension];
    const scrollerSize = this.scroller.current[this.config.scroller.offsetDimension];
    if (requestAnimationFrame) {
      requestAnimationFrame(() => {
        this.container.current[this.config.container.scrollSide] = ((s - o) / (o - scrollerSize)) * val;
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
    this.observer = null;
  }

  // *************************************************
  // ************** Lifecycle Methods ****************
  // *************************************************

  render() {
    return this.props.children ? (
      <div className={this.props.className} ref={this.wrapper} style={this.state.wrapperStyles}>
        <div
          className={this.props.scrollerClass}
          onMouseDown={this.startMovingScroller}
          onTouchStart={this.startMovingScroller}
          onTouchMove={this.moveScroller}
          onTouchEnd={this.stopMovingScroller}
          ref={this.scroller}
          style={this.state.scrollerStyles}
        />
        <div
          data-direction={this.props.direction}
          className={'react-scroll-component'}
          onScroll={this.setScrollerTranslate}
          ref={this.container}
          style={this.state.containerStyles}
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.children && this.props.children !== prevProps.children) {
      this.clean();
      this.init();
    } else if (!this.props.children) {
      this.clean();
    }
  }

  componentWillUnmount() {
    this.clean();
  }
}

export default Scroll;
