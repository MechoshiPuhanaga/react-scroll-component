export default {
  horizontal: {
    container: {
      dimension: 'height',
      offsetDimension: 'offsetWidth',
      scrollDimension: 'scrollWidth',
      scrollSide: 'scrollLeft'
    },
    overflow: {
      x: 'scroll',
      y: 'hidden'
    },
    pageCoordinate: 'pageX',
    scrollbar: {
      clientDimension: 'clientHeight',
      offsetDimension: 'offsetHeight'
    },
    scrollDimension: 'width',
    scroller: {
      clientDimension: 'clientWidth',
      offsetDimension: 'offsetWidth'
    },
    wrapper: {
      clientDimension: 'clientWidth',
      offsetSide: 'offsetLeft',
      overflowDimension: 'height'
    }
  },
  vertical: {
    container: {
      dimension: 'width',
      offsetDimension: 'offsetHeight',
      scrollDimension: 'scrollHeight',
      scrollSide: 'scrollTop'
    },
    overflow: {
      x: 'hidden',
      y: 'scroll'
    },
    pageCoordinate: 'pageY',
    scrollbar: {
      clientDimension: 'clientWidth',
      offsetDimension: 'offsetWidth'
    },
    scrollDimension: 'height',
    scroller: {
      clientDimension: 'clientHeight',
      offsetDimension: 'offsetHeight'
    },
    wrapper: {
      clientDimension: 'clientHeight',
      offsetSide: 'offsetTop',
      overflowDimension: 'width'
    }
  }
};
