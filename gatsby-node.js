const {createFilePath} = require('gatsby-source-filesystem');

const createMdxDeckComponent = require('./src/utils/create-mdx-deck-component');

exports.onCreateNode = async ({node, getNode, actions}) => {
  const {createNodeField} = actions;

  if (node.internal.type === 'File' && node.extension === 'mdx') {
    const slug = createFilePath({node, getNode, basePath: 'src/decks/'});
    createNodeField({
      node,
      name: 'slug',
      value: `/deck${slug}`,
    });
  }
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const result = await graphql(`
    query {
      allFile(filter: {extension: {eq: "mdx"}}) {
        edges {
          node {
            absolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  for (const {node} of result.data.allFile.edges) {
    createPage({
      path: node.fields.slug,
      component: await createMdxDeckComponent(node.absolutePath),
    });
  }
};

exports.onCreateWebpackConfig = ({actions, loaders}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mdx$/,
          exclude: /node_modules/,
          use: [
            loaders.js(),
            {
              loader: require.resolve('mdx-deck/loader.js'),
              options: {
                mdPlugins: [require('remark-emoji'), require('remark-unwrap-images')],
              },
            },
          ],
        },
      ],
    },
  });
};
