const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');

const cacheDir = path.join(__dirname, '../../.cache');
const componentDir = path.join(cacheDir, 'mdx-deck-component');

const createHash = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`);

module.exports = async absoluteDeckPath => {
  const source = `// mdx-deck-component for ${absoluteDeckPath}

import React from 'react';

import SlideDeckWrapper from '${require.resolve('../components/slide-deck-wrapper')}';

import slides, {theme} from '${absoluteDeckPath}';

const MdxDeckComponent = () =>
  <SlideDeckWrapper
    slides={slides}
    theme={theme}
  />;

export default MdxDeckComponent;`;

  const componentPath = path.join(componentDir, `${createHash(absoluteDeckPath)}.js`);
  await fs.outputFile(componentPath, source);

  return componentPath;
};
