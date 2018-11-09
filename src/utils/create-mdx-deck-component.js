const crypto = require('crypto');
const path = require('path');

const fs = require('fs-extra');

const cacheDir = path.join(__dirname, '../../.cache');
const componentDir = path.join(cacheDir, 'mdx-deck-component');

const createHash = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`);

module.exports = async absoluteDeckPath => {
  const source = `// mdx-deck-component for ${absoluteDeckPath}

import {graphql} from 'gatsby';
import React from 'react';

import SlideDeckWrapper from '${require.resolve('../components/slide-deck-wrapper')}';

import slides, {theme} from '${absoluteDeckPath}';

const MdxDeckComponent = ({data}) =>
  <SlideDeckWrapper
    data={data}
    slides={slides}
    theme={theme}
  />;

export default MdxDeckComponent;

export const query = graphql\`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }

    file(id: {eq: $id}) {
      fields {
        slug
        screenshotUrl
        frontmatter {
          title
          date
        }
      }
    }
  }
\`;
`;

  const componentPath = path.join(componentDir, `${createHash(absoluteDeckPath)}.js`);
  await fs.outputFile(componentPath, source);

  return componentPath;
};
