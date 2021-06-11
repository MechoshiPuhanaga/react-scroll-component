/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount } from '@cypress/react';

import { Scroll } from '../index';

import './ScrollTest.css';

const containerClass = 'react-scroll-component';

const contentClassVertical = 'content-vertical';
const scrollerClassVertical = 'scroller-vertical';

const basicContainerHeight = 150;
const basicContentHeight = 1000;

const contentClassHorizontal = 'content-horizontal';
const scrollerClassHorizontal = 'scroller-horizontal';

const basicContainerWidth = 150;
const basicContentWidth = 1000;

// TODO: Math.floor exposes implementation detail. Fix this!
const basicExpectedScrollerHeight = Math.floor(
  (basicContainerHeight / basicContentHeight) * basicContainerHeight
);

const basicExpectedScrollerWidth = Math.floor(
  (basicContainerWidth / basicContentWidth) * basicContainerWidth
);

const BasicVertical = (props = {}) => (
  <Scroll
    direction="vertical"
    height={`${basicContainerHeight}px`}
    scrollerClass={scrollerClassVertical}
    {...props}
  >
    {props.children}
  </Scroll>
);

const BasicHorizontal = (props = {}) => (
  <Scroll
    direction="horizontal"
    width={`${basicContainerWidth}px`}
    scrollerClass={scrollerClassHorizontal}
    {...props}
  >
    {props.children}
  </Scroll>
);

describe('Scroll', () => {
  it('Scroll content vertically when moving the scroller', () => {
    mount(
      <BasicVertical>
        <div className={contentClassVertical}>Hi</div>
      </BasicVertical>
    );

    const scroller = cy.get(`.${scrollerClassVertical}`);
    scroller.trigger('mousedown');
    scroller.trigger('touchmove', { changedTouches: [{ pageY: 100 }] });
    scroller.trigger('touchend');

    const container = cy.get(`.${containerClass}`);
    container.invoke('scrollTop').should('be.gt', 0); // TODO: be precise here
  });

  it('Move scroller vertically when scrolling over the content', () => {
    mount(
      <BasicVertical>
        <div className={contentClassVertical}>Hi</div>
      </BasicVertical>
    );

    const container = cy.get(`.${containerClass}`);
    container.scrollTo('bottom');

    const scroller = cy.get(`.${scrollerClassVertical}`);
    scroller
      .should('have.attr', 'style')
      .should(
        'contain',
        `translate3d(0px, ${
          basicContainerHeight - basicExpectedScrollerHeight
        }px, 0px)`
      );
  });

  it('Scroll content horizontally when moving the scroller', () => {
    mount(
      <BasicHorizontal>
        <div className={contentClassHorizontal}>Hi</div>
      </BasicHorizontal>
    );

    const scroller = cy.get(`.${scrollerClassHorizontal}`);
    scroller.trigger('mousedown');
    scroller.trigger('touchmove', { changedTouches: [{ pageX: 100 }] });
    scroller.trigger('touchend');

    const container = cy.get(`.${containerClass}`);
    container.invoke('scrollLeft').should('be.gt', 0); // TODO: be precise here
  });

  it('Move scroller horizontally when scrolling over the content', () => {
    mount(
      <BasicHorizontal>
        <div className={contentClassHorizontal}>Hi</div>
      </BasicHorizontal>
    );

    const container = cy.get(`.${containerClass}`);
    container.scrollTo('right');

    const scroller = cy.get(`.${scrollerClassHorizontal}`);
    scroller
      .should('have.attr', 'style')
      .should(
        'contain',
        `translate3d(${
          basicContainerWidth - basicExpectedScrollerWidth
        }px, 0px, 0px)`
      );
  });

  it('Debounce scroller size calculation', () => {
    mount(
      <BasicVertical scrollSizeDebounce={2000}>
        <div className={contentClassVertical}>Hi</div>
      </BasicVertical>
    );

    const container = cy.get(`.${containerClass}`);
    container.scrollTo('bottom');

    const scroller = cy.get(`.${scrollerClassVertical}`);
    scroller.invoke('height').should('gt', 0);
  });

  it('No initial timeout for calculating scroller size', () => {
    mount(
      <BasicVertical noInitTimeout>
        <div className={contentClassVertical}>Hi</div>{' '}
      </BasicVertical>
    );

    const container = cy.get(`.${containerClass}`);
    container.scrollTo('bottom');

    const scroller = cy.get(`.${scrollerClassVertical}`);
    scroller.invoke('height').should('gt', 0);
  });

  it('Mount without children', () => {
    mount(<BasicVertical />);

    const container = cy.get(`.${containerClass}`);
    container.should('not.exist');
  });
});
