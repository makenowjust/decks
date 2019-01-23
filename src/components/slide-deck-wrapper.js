/* eslint-disable complexity, default-case */

import {SlideDeck, updaters, constants} from 'mdx-deck';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';

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

const SlideDeckWrapper = React.memo(({data, slides, theme}) => {
  const slideDeckRef = React.createRef();
  const focusRef = React.createRef();

  const handleKeyDown = e => {
    if (document.activeElement !== focusRef.current) {
      return;
    }

    // From https://github.com/jxnblk/mdx-deck/blob/118f7fd439fba16c5bf08724741368d2802d9b77/src/SlideDeck.js#L77-L127

    if (e.metaKey || e.ctrlKey) {
      return;
    }

    const slideDeck = slideDeckRef.current;

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

  useEffect(() => {
    // Focus to wrapper element to handle key events without clicking window.
    focusRef.current.focus();
  });

  const {
    site: {
      siteMetadata: {title: siteTitle},
    },
    file: {
      fields: {
        frontmatter: {title: deckTitle},
      },
    },
  } = data;
  const title = `${deckTitle} - ${siteTitle}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {/* Reset viewport beacause smartphone's screen width is too small to show slides. */}
        <meta name="viewport" content="" />
      </Helmet>
      <div ref={focusRef} role="presentation" tabIndex="-1" onKeyDown={handleKeyDown}>
        <SlideDeck ref={slideDeckRef} slides={slides} theme={theme} />
      </div>
    </>
  );
});

SlideDeckWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SlideDeckWrapper;
