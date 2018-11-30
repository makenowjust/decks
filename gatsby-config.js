module.exports = {
  siteMetadata: {
    title: 'decks',
    description: 'MakeNowJust\'s slides here',
    siteUrl: 'https://makenowjust.github.io/decks',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'decks',
        path: `${__dirname}/src/decks/`,
      },
    },
  ],
};
