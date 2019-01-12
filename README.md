# React scroller component

## React version

- Uses the new lifecycle methods introduced in `React 16.3`

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

| Property            |  Type   | Required | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |      Default |
| ------------------- | :-----: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------: |
| className           | string  |  false   | Class is added to the wrapper element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |            - |
| direction           | string  |   true   | Choose between `vertical` or `horizontal` scroll.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |            - |
| display             | string  |  false   | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | inline-block |
| `height` or `width` | string  |   true   | Set `height` for `vertical` scroll. Set `width` for `horizontal` scroll.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |            - |
| initTimeout         | number  |  false   | In `milliseconds`. Needed to ensure correct rendering of the scroller in some browsers and/or devices.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |          200 |
| noInitTimeout       | boolean |  false   | Switch to `true` to switch off the initial timeout and render the scroller right away in `componentDidMount`                                                                                                                                                                                                                                                                                                                                                                                                                                                    |        false |
| observe             | boolean |  false   | Resize scroller on child and subtree changes using the `MutationObserver API`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         true |
| resizeDebounce      | number  |  false   | In `milliseconds`. This is used to optimize the calls to the resize event handler.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |          400 |
| scroller            | object  |   true   | This object is used as a `style` property on the scroller element. Set the `left' or`right`property for a`vertical`scroll to position the scroller to the left or to the right. Use`top`or`bottom`to position the scroller in a`horizontal`scroll case. Set`width`to define the scroller's width. Set any other valid`CSS`property to style the scroller as long as you don't override`position`,`top`or`bottom`for`vertical`and`left`or`right`for`horizontal` scroll. Add vendor prefixes if necessary. Use PascalCase for the vendor prefixed properties. | - |
| scrollerClass       | string  |  false   | Use in similar way as the `scroller` property                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |            - |

### Wrap content and spread the `config`

```
<Scroll {...config}> content </Scroll>
```

## Browser Support

- Chrome, Edge, Firefox, IE11, Safari. Tested on mobile devices too.

- To be sure that the scrollbar will be hidden on Firefox, you can address the container with the attribute css selector `data-direction="vertical"/"horizontal"` property and set the appropriate margin property:

```
.react-scroll-component[data-direction="vertical"]  {
  margin-right: -17px !important;
  overflow-x:hidden;
}
```

```
.react-scroll-component[data-direction="horizontal"]  {
  margin-bottom: -17px !important;
  overflow-y:hidden;
}
```
