#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const markdownRoots = ["README.md", "content"]
const fix = process.argv.includes("--fix")

const forbiddenCharacters = new Map([
  [0x00a0, { name: "non-breaking space", replacement: " " }],
  [0x200b, { name: "zero-width space", replacement: "" }],
  [0x200c, { name: "zero-width non-joiner", replacement: "" }],
  [0x200d, { name: "zero-width joiner", replacement: "" }],
  [0x2060, { name: "word joiner", replacement: "" }],
  [0xfeff, { name: "zero-width no-break space (BOM)", replacement: "" }]
])

function collectMarkdownFiles(target) {
  const resolved = path.resolve(target)
  if (!fs.existsSync(resolved)) {
    return []
  }

  const stat = fs.statSync(resolved)
  if (stat.isFile()) {
    return resolved.endsWith(".md") ? [resolved] : []
  }

  const files = []
  for (const entry of fs.readdirSync(resolved, { withFileTypes: true })) {
    const entryPath = path.join(resolved, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(entryPath))
      continue
    }
    if (entry.isFile() && entryPath.endsWith(".md")) {
      files.push(entryPath)
    }
  }
  return files
}

function formatCodePoint(codePoint) {
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`
}

function getLinePreview(lineText) {
  return lineText.replace(/\t/g, "\\t").trim()
}

const files = markdownRoots
  .flatMap(collectMarkdownFiles)
  .sort((left, right) => left.localeCompare(right))

const issues = []
let fixedCount = 0
let fixedFiles = 0

for (const absolutePath of files) {
  const relativePath = path.relative(process.cwd(), absolutePath)
  const originalText = fs.readFileSync(absolutePath, "utf8")
  const lines = originalText.split(/\r?\n/)
  const output = []
  let line = 1
  let column = 1
  let fileChanged = false

  for (const character of originalText) {
    const codePoint = character.codePointAt(0)
    const forbidden = forbiddenCharacters.get(codePoint)
    if (forbidden) {
      issues.push({
        file: relativePath,
        line,
        column,
        codePoint,
        name: forbidden.name,
        preview: getLinePreview(lines[line - 1] || "")
      })
      if (fix) {
        output.push(forbidden.replacement)
        if (forbidden.replacement !== character) {
          fileChanged = true
          fixedCount += 1
        }
      } else {
        output.push(character)
      }
    } else {
      output.push(character)
    }

    if (character === "\n") {
      line += 1
      column = 1
    } else {
      column += 1
    }
  }

  if (fix && fileChanged) {
    fs.writeFileSync(absolutePath, output.join(""), "utf8")
    fixedFiles += 1
  }
}

if (!issues.length) {
  console.log("No forbidden special characters found in Markdown files.")
  process.exit(0)
}

if (fix) {
  console.log(
    `Fixed ${fixedCount} forbidden special character(s) across ${fixedFiles} Markdown file(s).`
  )
  process.exit(0)
}

for (const issue of issues) {
  console.error(
    `${issue.file}:${issue.line}:${issue.column} ${formatCodePoint(issue.codePoint)} ${issue.name}`
  )
  if (issue.preview) {
    console.error(`  ${issue.preview}`)
  }
}

console.error(
  `Found ${issues.length} forbidden special character(s) across Markdown files.`
)
console.error("Run `npm run lint:chars:fix` to apply safe replacements.")
process.exit(1)
