import React from "react"

import { Facebook, Twitter, Linkedin } from "react-feather"

const isShareableUrl = value => {
  try {
    const parsedUrl = new URL(value)

    return (
      ["http:", "https:"].includes(parsedUrl.protocol) &&
      !["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname)
    )
  } catch {
    return false
  }
}

const ShareButtons = ({ url, title, description }) => {
  if (!isShareableUrl(url)) return null

  const shareText = encodeURIComponent(description || title)
  const shareUrl = encodeURIComponent(url)
  const shareLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: <Facebook strokeWidth={1.25} />,
      label: "Facebook"
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: <Linkedin strokeWidth={1.25} />,
      label: "LinkedIn"
    },
    {
      href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      icon: <Twitter strokeWidth={1.25} />,
      label: "Twitter"
    }
  ]

  return (
    <div className="post-meta-share-icons">
      {shareLinks.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${label}`}
        >
          {icon}
        </a>
      ))}
    </div>
  )
}

export default ShareButtons
