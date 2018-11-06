module.exports = {
  siteMetadata: {
    title: 'MakeNowJust decks',
    siteUrl: 'https://makenowjust.github.io/decks',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'decks',
        path: `${__dirname}/src/decks/`,
      },
    },
  ],
};
