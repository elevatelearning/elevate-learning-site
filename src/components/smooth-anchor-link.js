import React from "react"

import { Link } from "gatsby"

const normalize = path => {
  if (!path) return "/"
  const stripped = path.replace(/\/+$/, "")
  return stripped === "" ? "/" : stripped
}

const SmoothAnchorLink = ({
  to,
  title,
  children,
  className,
  onClick,
  ...rest
}) => {
  const handleClick = e => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (typeof window === "undefined") return
    if (!to.includes("#")) return

    const [path, hash] = to.split("#")
    if (!hash) return
    if (normalize(path) !== normalize(window.location.pathname)) return

    const el = document.getElementById(hash)
    if (!el) return

    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth" })
    window.history.pushState(null, "", `#${hash}`)
  }

  return (
    <Link
      to={to}
      title={title}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children || title}
    </Link>
  )
}

export default SmoothAnchorLink
