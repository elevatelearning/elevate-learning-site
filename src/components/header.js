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
const getCurrentSectionIndex = elements => {
  if (typeof window === "undefined" || elements.length === 0) return -1

  const anchor = window.innerHeight * 0.35
  const activeElement =
    elements.find(el => {
      const { top, bottom } = el.getBoundingClientRect()
      return top <= anchor && bottom > anchor
    }) ||
    elements
      .slice()
      .reverse()
      .find(el => el.getBoundingClientRect().top <= anchor) ||
    elements[0]

  return activeElement ? SECTION_IDS.indexOf(activeElement.id) : -1
}

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

    let frameId = null
    const updateCurrentSection = () => {
      const i = getCurrentSectionIndex(elements)
      if (i !== -1) {
        setCurrentIndex(current => (current === i ? current : i))
      }
    }
    const handleScroll = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateCurrentSection()
      })
    }

    updateCurrentSection()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
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
