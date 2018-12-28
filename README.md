# React Custom Scroll

## Install
```
yarn add react-scroll-component
```
```
npm install react-scroll-component
```

## Import
```
import Scroll from 'react-scroll-component';
```
```
import {Scroll} from 'react-scroll-component';
```

## Use

### Create config object
*   className: {string} - `don't override 'height' or 'width' according to the 'direction'`
*   direction: {string} - `required` - 'vertical' | 'horizontal'
*   display: {string} - `default is inline-block`
*   height | width: {string} - `required` - 'height' for 'vertical' and 'width' for 'horizontal'
*   observe: {boolean} - resize scroller on child and subtree changes using the `MutationObserver API`; `default is true`
*   resizeDebounce: {number} - in milliseconds; `default is 400`
*   scrollbarSize: {number} - in pixels,
*   scroller: {object} - `required` - left | right: {string}, width: {string}, any other valid CSS property
    except 'position', 'top'/'bottom' for 'direction' 'vertical' and 'left'/'right' for 'horizontal'.
    Add vendor prefixes if necessary. Use PascalCase for the vendor prefixed properties.
*   scrollerClass: {string} - use !important but `don't override 'position'`,

### Wrap content and spread the `config`
```
<Scroll {...config}> content </Scroll>
```
