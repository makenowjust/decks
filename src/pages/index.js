import {graphql, Link} from 'gatsby';
import React from 'react';
import {Helmet} from 'react-helmet';
import moment from 'moment';
import styled from 'styled-components';

import 'modern-normalize';

const PAGE_WIDTH = 860;
const PAGE_MARGIN = 16;

const Header = styled.header`
  padding: 10em 0;
  text-align: center;
`;

const SlideList = styled.ul`
  max-width: ${PAGE_WIDTH}px;
  width: 100%;
  margin: ${PAGE_MARGIN}px auto 0 auto;
  padding: 0 ${PAGE_MARGIN}px;
  border-bottom: 1px solid;
`;

const SlideListItem = styled.li`
  display: block;
  padding: 0;
`;

const SlideImage = styled.img`
  max-width: ${PAGE_WIDTH - PAGE_MARGIN * 2}px;
  width: 100%;
`;

const SlideDescription = styled.p`
  text-align: right;
  padding: ${PAGE_MARGIN}px 0;
  margin: 0;
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${PAGE_MARGIN}px 0;
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
      <SlideListItem key={id}>
        <Link to={slug}>
          <SlideImage alt={`${slug} screenshot`} src={screenshotUrl} />
        </Link>
        <SlideDescription>
          <Link to={slug}>{title}</Link>
          {' at '}
          <time>{moment(date).format('YYYY-MM-DD')}</time>
          {' ('}
          <a href={event.url}>{event.name}</a>
          {')'}
        </SlideDescription>
      </SlideListItem>
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
      <SlideList>{decks}</SlideList>
      <Footer>
        2018 © TSUYUSATO <a href="https://github.com/MakeNowJust">"MakeNowJust"</a> Kitsune
      </Footer>
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
