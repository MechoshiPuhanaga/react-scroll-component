import Home from './Home/Home';
import HorizontalScroll from './HorizontalScroll/HorizontalScroll';
import VerticalScroll from './VerticalScroll/VerticalScroll';

export default [
  { name: 'Home', route: '', cmp: Home },
  {
    name: 'Horizontal Scroll',
    route: 'horizontal-scroll',
    cmp: HorizontalScroll
  },
  {
    name: 'Vertical Scroll',
    route: 'vertical-scroll',
    cmp: VerticalScroll
  }
];
