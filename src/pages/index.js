import {graphql, Link} from 'gatsby';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';

import 'modern-normalize';

const PAGE_WIDTH = 860;
const PAGE_MARGIN = 16;

const Header = styled.header`
  width: 100%;
  max-width: ${PAGE_WIDTH}px;
  padding: 10em 0;
  margin: 0 auto;
  text-align: center;
`;

const SlideList = styled.ul`
  max-width: ${PAGE_WIDTH}px;
  padding: 0 ${PAGE_MARGIN}px;
  margin: 0 auto;
`;

const SlideListItem = styled.li`
  display: block;
  padding: 0;
  border-bottom: 1px solid;
  margin: ${PAGE_MARGIN}px 0;
`;

const SlideImage = styled.img`
  width: 100%;
  max-width: ${PAGE_WIDTH - PAGE_MARGIN * 2}px;
`;

const SlideDescription = styled.p`
  padding: ${PAGE_MARGIN}px 0;
  margin: 0;
  text-align: right;
`;

const Footer = styled.footer`
  margin: ${PAGE_MARGIN}px 0;
  text-align: center;
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
          {event && date && (
            <>
              <br />
              {'at '}
              <a href={event.url}>{event.name}</a>
              {' ('}
              <time>{moment(date).format('YYYY-MM-DD')}</time>
              {')'}
            </>
          )}
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

Index.propTypes = {
  data: PropTypes.object.isRequired,
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
      sort: {fields: [fields___frontmatter___date], order: DESC}
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
