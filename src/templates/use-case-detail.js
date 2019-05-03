import React from 'react'
import { graphql, withPrefix } from 'gatsby'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Button } from 'reactstrap'
import ImageGallery from '../components/media/image-gallery';
import { slugify } from '../lib/url-utils';

const UseCaseDetail = ({ data }) => {
  const useCase = data.markdownRemark

  const siteMeta = {
    path: `/work/${slugify(useCase.frontmatter.name)}`,
    subtitle: useCase.frontmatter.name,
    openGraphTitle: useCase.frontmatter.name,
    keywords: `${useCase.frontmatter.name}, our work, work, densitylabs, developed in Ruby on Rails, densitylabs, density labs, densitylabs our work, Our Experience`,
    description: useCase.frontmatter.description || useCase.excerpt,
    image: withPrefix(useCase.frontmatter.images[0].childImageSharp.fluid.src),
    type: 'Article'
  }
  return (
    <Layout siteMeta={siteMeta}>
      <Container className="pt-4">
        <Row>
          <Col md="8">
            <h1 className="border-bottom pb-2 mb-3">{useCase.frontmatter.name}</h1>
            <div className="mb-4">
              <ImageGallery
                images={useCase.frontmatter.images.map(i => ({
                  src: i.childImageSharp.fluid.src,
                  alt: useCase.frontmatter.name
                }))}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: useCase.html }} />
          </Col>
          <Col md="4">
            <aside>
              <h2 className="border-bottom pb-2">Project Info</h2>
              <dl>
                <dt>Client</dt>
                <dd>{useCase.frontmatter.name}</dd>
                <dt>In</dt>
                <dd>{useCase.frontmatter.technology}</dd>
                <dt>Place</dt>
                <dd>{useCase.frontmatter.place}</dd>
              </dl>
              <a
                  href={useCase.frontmatter.external_link}
                  target="_blank"
								  rel="noopener noreferrer"
                >
                  <Button color="danger">
                    External Link <FontAwesomeIcon className="ml-2" icon="external-link-alt" />
                  </Button>
                </a>
            </aside>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
query($id: String!) {
  markdownRemark(
    id: { eq: $id }
  ) {
    id
    frontmatter {
      name
      technology
      place
      external_link
      description
      images {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      imageFooter
    }
    excerpt(pruneLength: 140)
    html
  }
}
`

export default UseCaseDetail;