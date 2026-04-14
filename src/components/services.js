import React from "react"

import { Button, Col, Container, Nav, Row, Tab } from "react-bootstrap"
import scrollTo from "gatsby-plugin-smoothscroll"
import { StaticImage } from "gatsby-plugin-image"

const Services = () => {
  return (
    <Container
      fluid
      className="services-wrapper py-4 py-md-5 py-lg-7"
      id="services"
    >
      <h1 className="text-center">Our Services</h1>
      <Tab.Container defaultActiveKey="tab-1" id="service-items">
        <Row className="justify-content-center pt-4">
          <Col md={10} lg={8}>
            <Nav justify as="ul">
              <Nav.Item as="li" key="tab-1">
                <StaticImage
                  src="../images/digital-needs-analysis.png"
                  alt="Digital Needs Analysis"
                  layout="fixed"
                  placeholder="blurred"
                  width={150}
                />
                <Nav.Link eventKey="tab-1">Digital Needs Analysis</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" key="tab-2">
                <StaticImage
                  src="../images/learning-development-strategy.png"
                  alt="Learning & Development Strategy"
                  layout="fixed"
                  placeholder="blurred"
                  width={150}
                />
                <Nav.Link eventKey="tab-2">
                  Learning & Development Strategy
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" key="tab-3">
                <StaticImage
                  src="../images/learning-design-content-development.png"
                  alt="Learning Design & Content Development"
                  layout="fixed"
                  placeholder="blurred"
                  width={150}
                />
                <Nav.Link eventKey="tab-3">
                  Learning Design & Content Development
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" key="tab-4">
                <StaticImage
                  src="../images/digital-learning-solutions.png"
                  alt="Digital Learning Solutions"
                  layout="fixed"
                  placeholder="blurred"
                  width={150}
                />
                <Nav.Link eventKey="tab-4">Digital Learning Solutions</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" key="tab-5">
                <StaticImage
                  src="../images/communication-change-management.png"
                  alt="Learning Experience Design Training"
                  layout="fixed"
                  placeholder="blurred"
                  width={150}
                />
                <Nav.Link eventKey="tab-5">
                  Learning Experience Design Training
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Tab.Content>
              <Tab.Pane eventKey="tab-1" key="tab-1" className="text-center">
                <p>
                  Leading digital change is more than just purchasing an online
                  learning platform or creating digital course content. It
                  requires leaders who have a vision of how to transform their
                  organisations to thrive in a digital world.
                </p>
                <p>
                  We conduct research into global and local industry-specific
                  trends to measure your current and desired digital maturity.
                  By aligning your unique user journeys to your organisational
                  objectives, we’ll be able to identify opportunities to
                  implement changes in the short, medium and long-term.
                </p>
                <p>
                  We’ll then design a digital roadmap that integrates your
                  context and opportunities to the systems, programmes and
                  communication requirements to achieve your outcomes.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab-2" key="tab-2" className="text-center">
                <p>
                  The key to instilling a culture of lifelong learning is to
                  curate and personalise flexible learning experiences which are
                  relevant, practical and goal-oriented. By gaining an
                  understanding of individual baseline and desired skills and
                  knowledge, as well as preferred learning styles and the needs
                  of your organisation, you’ll be in a better position to meet
                  those needs.
                </p>
                <p>
                  We’ll help you conduct team and organisation-wide learning
                  needs analyses, and design and implement a development
                  strategy that speaks to your strategic objectives and
                  individuals’ personal and professional goals.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab-3" key="tab-3" className="text-center">
                <p>
                  We co-create interactive, user-centered learning programmes
                  that speak to the needs of your organisation and your teams.
                  We also design, develop or transform your existing content
                  into highly relevant and impactful online and blended learning
                  experiences.{" "}
                </p>
                <p>
                  We embed learning experience design principles that are
                  goal-oriented, user-centred and design focused, and which
                  respond to the unique needs of your learners in a practical
                  and experiential way.
                </p>
                <p>
                  By continuously closing the feedback loop, our approach to
                  learning experience design improves individual performance,
                  productivity and engagement, moving you one step closer to
                  achieving your organisational and development goals.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab-4" key="tab-4" className="text-center">
                <p>
                  By using integrated learner management systems and other
                  digital technologies, learners are taken on a journey in which
                  they move from acquisition to application, to adoption of new
                  skills and behaviours, elevating their understanding and
                  experience of the world.
                </p>
                <p>
                  We have extensive experience implementing different learning
                  solutions, and can help you design and implement a learning
                  management system and social learning tools that speak to your
                  organisational goals and needs, allowing you to continuously
                  track and monitor engagement and performance, and
                  intentionally measure your return on investment.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab-5" key="tab-5" className="text-center">
                <p>
                  Learning Experience Design (LXD) is a relatively new field of
                  learning sciences that combines user experience design and
                  adult learning principles to create experiences that are
                  user-centered, goal-oriented and design-focused.{" "}
                </p>
                <p>
                  We have many years’ experience conducting and facilitating
                  learning experience design workshop and online courses. We
                  empower teams with the skills and confidence to create
                  effective learning strategies and deliver learning experiences
                  in an engaging and memorable way.
                </p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Row className="g-0">
        <Col className="text-center">
          <Button
            variant="outline-primary"
            onClick={() => scrollTo("#about")}
            className="btn btn-xl d-none d-lg-inline-block mt-5 link-no-style"
          >
            About Us
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Services
