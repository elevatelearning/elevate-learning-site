import CMS from "decap-cms-app"
import cloudinary from "decap-cms-media-library-cloudinary"
import ArticlePreview from "./preview-templates/article-preview"

CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate("articles", ArticlePreview)
CMS.registerEditorComponent({
  label: "Image",
  id: "image",
  fromBlock: match =>
    match && {
      image: match[1],
      alt: match[2],
      title: match[3],
      classes: match[4]
    },
  toBlock: function ({ image, alt, title, classes }, getAsset, fields) {
    return `<img src="${image || ""}" alt="${alt || ""}" title="${
      title || ""
    }" class="${classes || ""}"/>`
  },
  toPreview: ({ image, alt, title, classes }, getAsset, fields) => {
    return `<img src="${image}" alt="${alt}" title="${title}" class="${classes}"/>`
  },
  pattern: /^<img src="(.*?)" alt="(.*?)" title="(.*?)" class="(.*?)"\/>$/s,
  fields: [
    {
      name: "image",
      label: "Picture",
      widget: "image"
    },
    {
      name: "alt",
      label: "Alt Text",
      widget: "string"
    },
    {
      name: "classes",
      label: "CSS Classes",
      widget: "string"
    },
    {
      name: "title",
      label: "Title",
      widget: "string"
    }
  ]
})
