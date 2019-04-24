import React from 'react'
import {
  Container,
} from 'reactstrap';
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import PostItem from '../components/post/post-item';
import { withPrefix } from 'gatsby';
import { postsTags, dataToPosts  } from '../lib/md-utils';


const BlogAuthor = ({ data, location }) => {
  
  const posts = dataToPosts(data)

  const siteMeta = {
    subtitle: 'Blog',
    path: location.pathname,
    openGraphTitle: 'Densitylabs Blog Posts',
    keywords: postsTags(posts),
    description: 'Density Labs shares with you the technicals knowledge, experiences and the latest news.',
    image: withPrefix('/images/software-density-labs.jpg'),
    type: 'Blog'
  }

  return (
    <Layout siteMeta={siteMeta}>
      <Container className="py-5">
        <h1
          className="border-bottom pb-3"
        >
          BLOG POSTS
        </h1>
        {
        posts.map((post, i) => (
          <PostItem post={post} key={i}/>
        ))
      }
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($author: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: {regex: "//(posts)/.+/.*.md$/"}
        frontmatter: {
          author: {
            eq: $author
          }
        }
      }
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            date
            image{
              childImageSharp {
                original {
                  src
                }
              }
            }
            tags
            author
          }
          excerpt(pruneLength:250,format:HTML)
        }
      }
    }
  }
`

export default BlogAuthor
