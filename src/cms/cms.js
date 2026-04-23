import CMS from "decap-cms-app"
import cloudinary from "decap-cms-media-library-cloudinary"
import ArticlePreview from "./preview-templates/article-preview"

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

CMS.registerEditorComponent({
  label: "Image",
  id: "image",
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
