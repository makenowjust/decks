/* eslint-disable default-case */

import React, {createRef, PureComponent} from 'react';
import {Helmet} from 'react-helmet';
import {SlideDeck, updaters, constants} from 'mdx-deck';

import 'modern-normalize';

const {
  previous,
  next,
  decrementIndex,
  incrementIndex,
  decrementStep,
  incrementStep,
  toggleMode,
} = updaters;

const {keys} = constants;

class SlideDeckWrapper extends PureComponent {
  constructor() {
    super();

    this.slideDeckRef = createRef();
    this.focusRef = createRef();
  }

  handleKeyDown = e => {
    if (document.activeElement !== this.focusRef.current) {
      return;
    }

    // From https://github.com/jxnblk/mdx-deck/blob/118f7fd439fba16c5bf08724741368d2802d9b77/src/SlideDeck.js#L77-L127

    if (e.metaKey || e.ctrlKey) {
      return;
    }

    const slideDeck = this.slideDeckRef.current;

    const alt = e.altKey && !e.shiftKey;
    const shift = e.shiftKey && !e.altKey;

    if (alt) {
      switch (e.keyCode) {
        case keys.p:
          slideDeck.update(toggleMode('presenter'));
          break;
        case keys.o:
          slideDeck.update(toggleMode('overview'));
          break;
        case keys.g:
          slideDeck.update(toggleMode('grid'));
          break;
      }
    } else if (shift) {
      switch (e.keyCode) {
        case keys.right:
        case keys.pageDown:
          e.preventDefault();
          slideDeck.update(incrementIndex);
          break;
        case keys.left:
        case keys.pageUp:
          e.preventDefault();
          slideDeck.update(decrementIndex);
          break;
      }
    } else if (!alt && !shift) {
      switch (e.keyCode) {
        case keys.right:
        case keys.pageDown:
        case keys.space:
          e.preventDefault();
          slideDeck.update(next);
          break;
        case keys.left:
        case keys.pageUp:
          e.preventDefault();
          slideDeck.update(previous);
          break;
        case keys.up:
          slideDeck.update(decrementStep);
          break;
        case keys.down:
          slideDeck.update(incrementStep);
          break;
      }
    }
  };

  componentDidMount() {
    // Focus to wrapper element to handle key events without clicking window.
    this.focusRef.current.focus();
  }

  render() {
    console.log('SlideDeckWrapper#render');

    const {data, theme, slides} = this.props;

    const {
      site: {
        siteMetadata: {
          title: siteTitle,
        },
      },
      file: {
        fields: {
          frontmatter: {
            title: deckTitle
          },
        },
      },
    } = data;
    const title = `${deckTitle} - ${siteTitle}`;

    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div tabIndex="-1" ref={this.focusRef} onKeyDown={this.handleKeyDown}>
          <SlideDeck ref={this.slideDeckRef} slides={slides} theme={theme} />
        </div>
      </>
    );
  }
};

export default SlideDeckWrapper;
