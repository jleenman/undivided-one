# Content architecture

## Current public structure (2026-07-12)

For each language: landing page, start/orientation, ten-point argument, full essay, confession, and PDF downloads. Canonical source Markdown is in `content/nl/` and `content/en/`; Nuxt routes are in `pages/`; PDFs are in `public/downloads/`.

## Target structure

- **Core essay:** one concise, load-bearing argument; 25–35% shorter than baseline.
- **Methodology:** observation/non-observation/interpretation/weighting/conclusion.
- **Text studies:** one bounded passage or coherent cluster per subessay.
- **Concepts:** defined terms and falsification criteria.
- **Historical context:** Second Temple, early church, councils, and model history without caricature.
- **Strongest objections/model comparison:** steelman before evaluation.
- **Sources/status:** bibliography, confidence, last-reviewed date, changelog.

Every subessay must include summary, status (`werkhypothese`, `voorlopig`, `herzien`, `stabiel`), last reviewed, primary texts, explicit observation structure, alternatives, confidence conclusion, bibliography, and backlinks to the core essay.

## Compression rule

Retain only thesis, method, essential textual arc, counterevidence, and bounded conclusion in the core. Move lexical detail, textual criticism, extended history, definitions, and objections into linked subessays. NL is the editorial source unless a future decision records otherwise; EN may expose ambiguity but may not drift doctrinally.
