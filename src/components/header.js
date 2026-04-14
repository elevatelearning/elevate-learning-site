import React, { useEffect, useState } from "react"

import { globalHistory } from "@gatsbyjs/reach-router"
import Headroom from "react-headroom"
import { Navbar, Nav } from "react-bootstrap"
import scrollTo from "gatsby-plugin-smoothscroll"
import { StaticImage } from "gatsby-plugin-image"

import SmoothAnchorLink from "./smooth-anchor-link"

const SECTION_IDS = ["home", "services", "about", "insights", "contact"]
const INSIGHTS_INDEX = SECTION_IDS.indexOf("insights")
const getPathname = () =>
  typeof window !== "undefined"
    ? window.location.pathname
    : globalHistory.location?.pathname || "/"

const Header = () => {
  const [pathname, setPathname] = useState(getPathname)
  const isInsightsRoute = pathname.startsWith("/insights")
  const [currentIndex, setCurrentIndex] = useState(
    isInsightsRoute ? INSIGHTS_INDEX : -1
  )

  useEffect(
    () =>
      globalHistory.listen(({ location }) => {
        setPathname(location.pathname)
      }),
    []
  )

  useEffect(() => {
    if (isInsightsRoute) {
      setCurrentIndex(INSIGHTS_INDEX)
      return
    }

    const elements = SECTION_IDS.map(id => document.getElementById(id)).filter(
      Boolean
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const i = SECTION_IDS.indexOf(entry.target.id)
            if (i !== -1) setCurrentIndex(i)
          }
        })
      },
      { rootMargin: "-300px 0px -50% 0px", threshold: 0 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [isInsightsRoute])

  const itemClass = i => `mx-lg-3${i === currentIndex ? " current" : ""}`

  return (
    <Headroom>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand onClick={() => scrollTo("#home")}>
          <SmoothAnchorLink to="/#home" title="Elevate Learning">
            <StaticImage
              src="../images/elevate-logo-text-right.png"
              alt="Digital Needs Analysis"
              placeholder="blurred"
              width={250}
            />
          </SmoothAnchorLink>
        </Navbar.Brand>
        <Navbar.Toggle
          className="custom-toggler"
          aria-controls="header-navbar-nav"
        />
        <Navbar.Collapse id="header-navbar-nav">
          <Nav as="ul" className="ms-auto">
            <Nav.Item as="li" className={itemClass(0)}>
              <SmoothAnchorLink to="/#home" title="Home" />
            </Nav.Item>
            <Nav.Item as="li" className={itemClass(1)}>
              <SmoothAnchorLink to="/#services" title="Services" />
            </Nav.Item>
            <Nav.Item as="li" className={itemClass(2)}>
              <SmoothAnchorLink to="/#about" title="About" />
            </Nav.Item>
            <Nav.Item as="li" className={itemClass(3)}>
              <SmoothAnchorLink to="/insights" title="Insights" />
            </Nav.Item>
            <Nav.Item as="li" className={itemClass(4)}>
              <SmoothAnchorLink to="/#contact" title="Contact" />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Headroom>
  )
}

export default Header
