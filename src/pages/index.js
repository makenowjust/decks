import {graphql, Link} from 'gatsby';
import React from 'react';
import {Helmet} from 'react-helmet';
import moment from 'moment';
import styled from 'styled-components';

import 'modern-normalize';

const PAGE_WIDTH = 860;

const Header = styled.header`
  padding: 10em 0;
  text-align: center;
`;

const List = styled.ul`
  max-width: ${PAGE_WIDTH}px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

const ListItem = styled.li`
  display: block;
  padding: 0;

  img {
    max-width: ${PAGE_WIDTH}px;
    width: 100%;
  }

  p {
    text-align: right;
  }
`;

const Index = ({data}) => {
  const {
    site: {
      siteMetadata: {title, description},
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
      <ListItem key={id}>
        <Link to={slug}>
          <img alt={`${slug} screenshot`} src={screenshotUrl} />
        </Link>
        <p>
          <Link to={slug}>{title}</Link>
          {' at '} <time>{moment(date).format('YYYY-MM-DD')}</time>
          {' ('}<a href={event.url}>{event.name}</a>)
        </p>
      </ListItem>
    );
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header>
        <h1>{title}</h1>
        <p>{description}</p>
      </Header>
      <List>{decks}</List>
    </>
  );
};

export default Index;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
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
