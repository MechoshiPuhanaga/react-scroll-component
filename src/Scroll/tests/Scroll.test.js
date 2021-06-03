/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount } from '@cypress/react';

import { Scroll } from '../index';

import './ScrollTest.css';

const containerClass = 'react-scroll-component';
const contentClass = 'content';
const scrollerClass = 'scroller';

const basicContainerHeight = 150;
const basicContentHeight = 1000;

// TODO: Math.floor exposes implementation detail. Fix this!
const basicExpectedScrollerHeight = Math.floor(
  (basicContainerHeight / basicContentHeight) * basicContainerHeight
);

const BasicVertical = () => {
  return (
    <Scroll
      direction="vertical"
      height={`${basicContainerHeight}px`}
      scrollerClass={scrollerClass}
    >
      <div className={contentClass}>Hi</div>
    </Scroll>
  );
};

describe('Scroll', () => {
  it('Scroll content when moving the scroller', () => {
    mount(<BasicVertical />);

    const scroller = cy.get(`.${scrollerClass}`);
    scroller.trigger('mousedown');
    scroller.trigger('touchmove', { changedTouches: [{ pageY: 100 }] });
    scroller.trigger('touchend');

    const container = cy.get(`.${containerClass}`);
    container.invoke('scrollTop').should('be.gt', 0); // TODO: be precise here
  });

  it('Move scroller when scrolling over the content', () => {
    mount(<BasicVertical />);

    const container = cy.get(`.${containerClass}`);
    container.scrollTo('bottom');

    const scroller = cy.get(`.${scrollerClass}`);
    scroller
      .should('have.attr', 'style')
      .should(
        'contain',
        `translate3d(0px, ${
          basicContainerHeight - basicExpectedScrollerHeight
        }px, 0px)`
      );
  });
});
