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

| Property            |   Type   | Required | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |      Default |
| ------------------- | :------: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------: |
| className           |  string  |    -     | Class is added to the wrapper element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |            - |
| containerClass      |  string  |    -     | Add class to the inner container that will wrap your content. `Be careful when adding css properties. You might break the scroller here.`                                                                                                                                                                                                                                                                                                                                                                                                                       |            - |
| containerRef        | function |    -     | Use it to get a reference to the scrolling container. You can set scrollTop for `vertical` or scrollLeft for `horizontal` from the parent component. Don't forget to clear this reference.                                                                                                                                                                                                                                                                                                                                                                      |            - |
| dimensionChangeTimeout | number |   -     | Call the handler for dimension change (height, width, maxHeight, maxWidth) with a timeout in milliseconds                                                                                                                                                                                                                                                                                                                                                                                                                                                       |            - |                 
| direction           |  string  |   true   | Choose between `vertical` or `horizontal` scroll.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |            - |
| display             |  string  |    -     | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | inline-block |
| `height` or `width` |  string  |   true   | Set `height` for `vertical` scroll. Set `width` for `horizontal` scroll.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |            - |
| `maxHeight` or `maxWidth` |  string  |    -     | Set `maxHeight` for `vertical` scroll. Set `maxWidth` for `horizontal` scroll.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |        `none`|
| initTimeout         |  number  |    -     | In `milliseconds`. Needed to ensure correct rendering of the scroller in some browsers and/or devices.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |          200 |
| noInitTimeout       |  boolean |    -     | Switch to `true` to switch off the initial timeout and render the scroller right away in `componentDidMount`                                                                                                                                                                                                                                                                                                                                                                                                                                                    |        false |
| observe             |  boolean |    -     | Resize scroller on child and subtree changes using the `MutationObserver API`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         true |
| observerTimeout     |  number  |    -     | Call the mutation observer callback with timeout in milliseconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |            - |
| onScrollerToggle    | function |    -     | Callback that will be called after scroller appears or disappears. An object with a boolean property `isDisplayed` will be provided as an argument to the callback.                                                                                                                                                                                                                                                                                                                                                                                             |            - | 
| onTrackClick        | function |    -     | Called when the track is clicked. An object with the following properties is provided as argument: `container` and `track` are references to the DOM elements, `direction` (-1 for `up` and 1 for `down`), and `event`. If this prop is provided it prevents the default shifting                                                                                                                                                                                                                                                                               |            - |
| resizeDebounce      |  number  |    -     | In `milliseconds`. This is used to optimize the calls to the resize event handler.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |          400 |
| scroller            |  object  |    -     | This object is used as a `style` property on the scroller element. Set the `left' or`right`property for a`vertical`scroll to position the scroller to the left or to the right. Use`top`or`bottom`to position the scroller in a`horizontal`scroll case. Set`width`to define the scroller's width. Set any other valid`CSS`property to style the scroller as long as you don't override`position`,`top`or`bottom`for`vertical`and`left`or`right`for`horizontal` scroll. Add vendor prefixes if necessary. Use PascalCase for the vendor prefixed properties.     |            - |
| scrollerClass       |  string  |    -     | Use in similar way as the `scroller` property                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |            - |
| scrollSizeDebounce  |  number  |    -     | If provided the scroller size will be calculated with timeout equal to the value (in milliseconds). Can be useful when the main dimension is dynamically changed with transition. Then this will recalculate the scroller size and display after transition is done.                                                                                                                                                                                                                                                                                            |            - |
| track               |  boolean |    -     | States if the track should be rendered. Defaults to false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |        false |
| trackClass          |  string  |  if `track` is `true` | The class that will be applied to the track element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |            - |
| trackShift          |  number  |  if `track` is `true` and `onTrackClick` is not provided | The number of pixels that the container should scroll after clicking on the track                                                                                                                                                                                                                                                                                                                                                                                                                               |            - |

### Wrap content and spread the `config`

```
<Scroll {...config}> content </Scroll>
```

## Browser support

- Chrome, Edge, Firefox, IE11, Safari. Tested on mobile browsers too.

## Browser issues
- To be sure that the scrollbar will be hidden on Firefox, you can address the container using the `:-moz-any()` selector grouping, provide the attribute css selector `data-direction="vertical"/"horizontal"` property and set the appropriate margin property:

```
:-moz-any(.react-scroll-component[data-direction="vertical"]) {
  margin-right: -17px !important;
  overflow-x:hidden;
}
```

```
:-moz-any(.react-scroll-component[data-direction="horizontal"])  {
  margin-bottom: -17px !important;
  overflow-y:hidden;
}
```
