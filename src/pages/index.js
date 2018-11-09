import {graphql} from 'gatsby';
import React from 'react';
import {Helmet} from 'react-helmet';
import {setConfig} from 'react-hot-loader';
import moment from 'moment';

setConfig({pureSFC: true});

const Index = ({data}) => {
  const {
    site: {
      siteMetadata: {title},
    },
  } = data;

  const decks = data.allFile.edges.map(({node}) => {
    const {
      id,
      fields: {
        screenshotUrl,
        slug,
        frontmatter: {title, date, event},
      },
    } = node;

    return (
      <li key={id}>
        <a href={slug}>
          <img src={screenshotUrl} />
        </a>
        <a href={slug}>{title}</a>
        <time>{moment(date).format('YYYY-MM-DD')}</time>
        <a href={event.url}>{event.name}</a>
      </li>
    );
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1>{title}</h1>
      <ul>{decks}</ul>
    </>
  );
};

export default Index;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allFile(
      filter: {extension: {eq: "mdx"}}
      sort: {fields: [fields___frontmatter___date], order: ASC}
    ) {
      edges {
        node {
          id
          fields {
            slug
            screenshotUrl
            frontmatter {
              title
              date
              event {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
