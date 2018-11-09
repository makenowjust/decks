const crypto = require('crypto');
const path = require('path');

const fs = require('fs-extra');

const cacheDir = path.join(__dirname, '../../.cache');
const templateDir = path.join(cacheDir, 'mdx-deck-template');

const createHash = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`);

module.exports = async absoluteDeckPath => {
  const source = `// mdx-deck-template for ${absoluteDeckPath}

import {graphql} from 'gatsby';
import React from 'react';

import SlideDeckWrapper from '${require.resolve('../components/slide-deck-wrapper')}';
import slides, {theme} from '${absoluteDeckPath}';

const MdxDeckTemplate = ({data}) =>
  <SlideDeckWrapper
    data={data}
    slides={slides}
    theme={theme}
  />;

export default MdxDeckTemplate;


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

  const templatePath = path.join(templateDir, `${createHash(absoluteDeckPath)}.js`);
  await fs.outputFile(templatePath, source);

  return templatePath;
};
