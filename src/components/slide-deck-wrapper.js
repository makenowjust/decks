import React, {createRef, useEffect} from 'react';
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

const SlideDeckWrapper = ({slides, theme}) => {
  const slideDeckRef = createRef();
  const focusRef = createRef();

  const handleKeyDown = e => {
    if (document.activeElement !== focusRef.current) {
      return;
    }

    // From https://github.com/jxnblk/mdx-deck/blob/118f7fd439fba16c5bf08724741368d2802d9b77/src/SlideDeck.js#L77-L127
    /* eslint-disable default-case */

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
    /* eslint-enable default-case */
  };

  // Focus to wrapper element to handle key events without clicking window.
  useEffect(() => {
    focusRef.current.focus();
  });

  return (
    <div tabIndex="-1" ref={focusRef} onKeyDown={handleKeyDown}>
      <SlideDeck
        ref={slideDeckRef}
        slides={slides}
        theme={theme}
        width="100vw"
        height="100vh"
      />
    </div>
  );
};

export default SlideDeckWrapper;
