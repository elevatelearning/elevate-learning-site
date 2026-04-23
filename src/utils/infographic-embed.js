export const INFOGRAPHIC_COMPONENT_CLASS = "article-infographic"

const INFOGRAPHIC_COMPONENT_PATTERN_SOURCE = `<div class="${INFOGRAPHIC_COMPONENT_CLASS}"\\s+data-preview-url="(.*?)"\\s+data-poster-url="(.*?)"\\s*><\\/div>`

const escapeHtmlAttribute = value =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

const decodeHtmlAttribute = value =>
  String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")

export const buildInfographicMarkup = ({ previewUrl, posterUrl }) =>
  `<div class="${INFOGRAPHIC_COMPONENT_CLASS}" data-preview-url="${escapeHtmlAttribute(
    previewUrl
  )}" data-poster-url="${escapeHtmlAttribute(posterUrl)}"></div>`

export const createInfographicComponentPattern = flags =>
  new RegExp(INFOGRAPHIC_COMPONENT_PATTERN_SOURCE, flags)

export const splitArticleHtmlByInfographics = html => {
  const content = String(html || "")
  const pattern = createInfographicComponentPattern("gs")
  const segments = []
  let lastIndex = 0
  let match = pattern.exec(content)

  while (match) {
    const [fullMatch, previewUrl, posterUrl] = match
    const htmlBeforeEmbed = content.slice(lastIndex, match.index)

    if (htmlBeforeEmbed.trim()) {
      segments.push({
        type: "html",
        html: htmlBeforeEmbed
      })
    }

    segments.push({
      type: "infographic",
      previewUrl: decodeHtmlAttribute(previewUrl),
      posterUrl: decodeHtmlAttribute(posterUrl)
    })

    lastIndex = match.index + fullMatch.length
    match = pattern.exec(content)
  }

  if (!segments.length) {
    return [
      {
        type: "html",
        html: content
      }
    ]
  }

  const htmlAfterLastEmbed = content.slice(lastIndex)

  if (htmlAfterLastEmbed.trim()) {
    segments.push({
      type: "html",
      html: htmlAfterLastEmbed
    })
  }

  return segments
}
