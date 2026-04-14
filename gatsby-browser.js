// custom typefaces
import "typeface-josefin-sans"
import "typeface-montserrat"
import "typeface-merriweather"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import "prismjs/themes/prism.css"

import "./src/styles/main.scss"

config.autoAddCss = false

export const onRouteUpdate = ({ location }) => {
  if (!location.hash) return
  requestAnimationFrame(() => {
    const el = document.getElementById(location.hash.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  })
}
