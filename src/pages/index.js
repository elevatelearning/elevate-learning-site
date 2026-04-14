import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Home from "../components/home"
import Services from "../components/services"
import About from "../components/about"
import Contact from "../components/contact"

const Index = () => {
  return (
    <Layout>
      <Home></Home>
      <Services></Services>
      <About></About>
      <Contact></Contact>
    </Layout>
  )
}

export default Index

export const Head = () => <Seo />
