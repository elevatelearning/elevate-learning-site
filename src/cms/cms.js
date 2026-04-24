import CMS from "decap-cms-app"
import cloudinary from "decap-cms-media-library-cloudinary"
import { ScrollSync } from "react-scroll-sync"
import ArticlePreview from "./preview-templates/article-preview"
import {
  buildInfographicMarkup,
  createInfographicComponentPattern
} from "../utils/infographic-embed"
import "../styles/main.scss"

const patchCmsScrollSync = () => {
  const scrollSyncPrototype = ScrollSync?.prototype

  if (
    !scrollSyncPrototype ||
    scrollSyncPrototype.__elevateScrollSyncPatched ||
    typeof scrollSyncPrototype.syncScrollPosition !== "function"
  ) {
    return
  }

  // Decap relies on react-scroll-sync for editor/preview sync. Patch the
  // proportional math so each pane uses its own viewport height and width.
  scrollSyncPrototype.syncScrollPosition = function (scrolledPane, pane) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth
    } = scrolledPane
    const scrollTopOffset = Math.max(scrollHeight - clientHeight, 0)
    const scrollLeftOffset = Math.max(scrollWidth - clientWidth, 0)
    const paneHeight = Math.max(pane.scrollHeight - pane.clientHeight, 0)
    const paneWidth = Math.max(pane.scrollWidth - pane.clientWidth, 0)
    const {
      proportional = true,
      vertical = true,
      horizontal = true
    } = this.props || {}

    if (vertical) {
      pane.scrollTop =
        proportional && scrollTopOffset > 0
          ? (paneHeight * scrollTop) / scrollTopOffset
          : scrollTop
    }

    if (horizontal) {
      pane.scrollLeft =
        proportional && scrollLeftOffset > 0
          ? (paneWidth * scrollLeft) / scrollLeftOffset
          : scrollLeft
    }
  }

  Object.defineProperty(scrollSyncPrototype, "__elevateScrollSyncPatched", {
    value: true
  })
}

patchCmsScrollSync()

// Decap loads preview styles from a fixed `cms.css` filename.
// Add a query param so deploys don't get stuck on a stale cached preview stylesheet.
CMS.registerPreviewStyle(`cms.css?v=${Date.now()}`)
CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate("articles", ArticlePreview)

const LEGACY_ALIGNMENT_MAP = {
  "img-left": "left",
  "img-right": "right",
  "img-center": "center",
  "image-center": "center",
  "ime-center": "center"
}

const normalizeAlignment = value =>
  ["left", "right", "center"].includes(value) ? value : "center"

const escapeHtmlAttribute = value =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

const escapeHtmlText = value =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

const decodeHtml = value => {
  if (typeof document === "undefined") {
    return value
  }

  const textarea = document.createElement("textarea")
  textarea.innerHTML = value || ""
  return textarea.value
}

const buildImageMarkup = ({ image, alt, title, alignment, caption }) => {
  const normalizedAlignment = normalizeAlignment(alignment)
  const normalizedCaption = String(caption || "")
    .trim()
    .replace(/\s+/g, " ")
  const captionMarkup = normalizedCaption
    ? `<figcaption>${escapeHtmlText(normalizedCaption)}</figcaption>`
    : ""

  return `<figure class="article-media article-media--${normalizedAlignment}"><img src="${escapeHtmlAttribute(
    image
  )}" alt="${escapeHtmlAttribute(alt)}" title="${escapeHtmlAttribute(
    title
  )}" />${captionMarkup}</figure>`
}

const buildInfographicPreviewMarkup = ({ previewUrl, posterUrl }) => {
  const previewMarkup = previewUrl
    ? `<div class="col-md-3"><img class="card-img" src="${escapeHtmlAttribute(
        previewUrl
      )}" alt="Infographic preview" /></div>`
    : ""
  const bodyColumnClass = previewUrl ? "col-md-9" : "col-12"

  return `<div class="infographic-wrapper"><div class="card"><div class="row g-0"><div class="${bodyColumnClass}"><div class="card-body"><div class="card-title">Download the Infographic</div><div class="card-text"><p>Selected infographic preview and poster for this article.</p><a href="${escapeHtmlAttribute(
    posterUrl
  )}" target="_blank" rel="noopener noreferrer">View Selected Poster</a></div></div></div>${previewMarkup}</div></div></div>`
}

CMS.registerEditorComponent({
  label: "Image",
  id: "image",
  collapsed: true,
  fromBlock: match => {
    if (!match) {
      return null
    }

    const [
      ,
      alignment,
      image,
      alt,
      title,
      caption,
      legacyImage,
      legacyAlt,
      legacyTitle,
      legacyClass
    ] = match

    if (image) {
      return {
        image: decodeHtml(image),
        alt: decodeHtml(alt),
        title: decodeHtml(title),
        alignment: normalizeAlignment(alignment),
        caption: decodeHtml(caption)
      }
    }

    return {
      image: decodeHtml(legacyImage),
      alt: decodeHtml(legacyAlt),
      title: decodeHtml(legacyTitle),
      alignment: normalizeAlignment(LEGACY_ALIGNMENT_MAP[legacyClass]),
      caption: ""
    }
  },
  toBlock: function ({ image, alt, title, alignment, caption }) {
    return buildImageMarkup({ image, alt, title, alignment, caption })
  },
  toPreview: ({ image, alt, title, alignment, caption }) => {
    return buildImageMarkup({ image, alt, title, alignment, caption })
  },
  pattern:
    /^(?:<figure class="article-media article-media--(left|right|center)">\s*<img src="(.*?)" alt="(.*?)" title="(.*?)"\s*\/>\s*(?:<figcaption>([\s\S]*?)<\/figcaption>)?\s*<\/figure>|(?:<center>)?<img src="(.*?)" alt="(.*?)" title="(.*?)" class="(.*?)"\s*\/>(?:<\/center>)?)$/s,
  fields: [
    {
      name: "image",
      label: "Picture",
      widget: "image"
    },
    {
      name: "alt",
      label: "Alt Text",
      hint: "Leave blank only for decorative images.",
      required: false,
      widget: "string"
    },
    {
      name: "alignment",
      label: "Alignment",
      default: "center",
      widget: "select",
      options: [
        {
          label: "Center",
          value: "center"
        },
        {
          label: "Left",
          value: "left"
        },
        {
          label: "Right",
          value: "right"
        }
      ]
    },
    {
      name: "title",
      label: "Title",
      required: false,
      widget: "string"
    },
    {
      name: "caption",
      label: "Caption",
      hint: "Optional plain-text caption.",
      required: false,
      widget: "text"
    }
  ]
})

CMS.registerEditorComponent({
  label: "Infographic",
  id: "infographic",
  collapsed: true,
  fromBlock: match => {
    if (!match) {
      return null
    }

    const [, previewUrl, posterUrl] = match

    return {
      previewUrl: decodeHtml(previewUrl),
      posterUrl: decodeHtml(posterUrl)
    }
  },
  toBlock: ({ previewUrl, posterUrl }) =>
    buildInfographicMarkup({ previewUrl, posterUrl }),
  toPreview: ({ previewUrl, posterUrl }) =>
    buildInfographicPreviewMarkup({ previewUrl, posterUrl }),
  pattern: createInfographicComponentPattern("s"),
  fields: [
    {
      name: "previewUrl",
      label: "Preview Image",
      widget: "image"
    },
    {
      name: "posterUrl",
      label: "Poster",
      widget: "file"
    }
  ]
})
