# Knowledge Log

## [2026-04-28] ingest | arXiv GUI agents, reasoning decoding, and Claude 3 model card

- Sources: [[../sources/arXiv/MAESTRO_ Adapting GUIs and Guiding Navigation with User Preferences in Conversational Agents with GUIs.md]], [[../sources/arXiv/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]], [[../sources/arXiv/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]], [[../sources/arXiv/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]]
- Added source notes: [[../wiki/MAESTRO_ Adapting GUIs and Guiding Navigation with User Preferences in Conversational Agents with GUIs.md]], [[../wiki/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]], [[../wiki/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]], [[../wiki/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]]
- Added concept pages: [[../wiki/LLM Reasoning Decoding.md]], [[../wiki/Frontier Model Evaluation.md]]
- Updated concepts: [[../wiki/GUI Agent.md]], [[../wiki/Mobile Agent Personalization.md]], [[../wiki/Agent Reflection.md]], [[../wiki/Function Calling.md]], [[../wiki/Long-Horizon Agent Evaluation.md]], [[../wiki/LLM Agent Research Map.md]]
- Assets: localized [[../sources/media/maestro-overview.png]], [[../sources/media/recagent-overview.png]]
- Index changes: updated index, sources, tags, backlinks, related, concepts, assets, questions
- Notes: This pass initially relied on non-PDF fallback context for Self-Consistency; the later `Self-Consistency PDF full parse` entry supersedes it with direct PDF extraction. Claude 3 source markdown only contained an iframe, so the PDF was downloaded to temp and text-extracted. All four source frontmatter statuses were changed from `new` to `processed`.

## [2026-04-28] schema | PDF parsing skill

- Added skill: [[../skills/pdf_skill.md]]
- Updated: [[../AGENTS.md]]
- Notes: added a full-PDF reading workflow covering text extraction, page mapping, figures, tables, formulas, OCR limits, wiki integration, index updates, assets, and log requirements.

## [2026-04-28] ingest | Self-Consistency PDF full parse

- Source: [[../sources/arXiv/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]]
- PDF: downloaded temporarily from https://arxiv.org/pdf/2203.11171 and deleted after processing
- Updated: [[../sources_cn/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]], [[../wiki/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]], [[../wiki/LLM Reasoning Decoding.md]], [[../wiki/Agent Reflection.md]]
- Index changes: [[index.md]], [[sources.md]], [[tags.md]], [[backlinks.md]], [[related.md]], [[concepts.md]], [[assets.md]], [[questions.md]]
- Assets: rendered p.2, p.5 and p.6 into [[../sources/media/self-consistency-2203.11171]]
- Notes: PDF has 24 pages, text layer extracted with `pdftotext -layout`, key figures/tables verified by rendered page images. Source status changed from `new` to `processed`; local PDF and temporary extracted text were removed after ingest.

## [2026-04-28] schema | refine PDF skill cleanup and output rules

- Updated: [[../skills/pdf_skill.md]]
- Cleaned: [[../sources_cn/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]], [[../wiki/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]], [[assets.md]], [[sources.md]]
- Notes: PDF skill now requires deleting local PDF/temp text after processing and forbids writing redundant `PDF 解析范围` / `页码范围` process sections into final notes. Page citations remain allowed as evidence pointers.

## [2026-04-22] schema | rednote importer skill

- Added tool: [[../tools/rednote_importer.mjs]]
- Added skill: [[../skills/rednote.skill]]
- Notes: extracted the Xiaohongshu link parsing, `window.__INITIAL_STATE__` parsing, image localization, and Markdown writing workflow from the referenced Obsidian plugin into a minimal local batch interface. Generated Markdown defaults to `sources/rednote/` with `status: "new"` and images default to `sources/media/`.

## [2026-04-22] ingest | rebuild entire wiki

- Sources: 21 files under [[../sources]]
- Added source notes: [[../wiki/Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs.md]], [[../wiki/Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions.md]], [[../wiki/Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory.md]], [[../wiki/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]], [[../wiki/LaMP_ When Large Language Models Meet Personalization.md]], [[../wiki/LLM Knowledge Base @karpathy on X.md]], [[../wiki/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]], [[../wiki/MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems.md]], [[../wiki/Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey.md]]
- Added concept/synthesis pages: [[../wiki/LLM Agent Research Map.md]], [[../wiki/GUI Agent.md]], [[../wiki/Agent Memory.md]], [[../wiki/Agent Memory Benchmarks.md]], [[../wiki/Mobile Agent Personalization.md]], [[../wiki/Agent Reflection.md]], [[../wiki/Function Calling.md]], [[../wiki/Agent Continual Learning.md]], [[../wiki/Long-Horizon Agent Evaluation.md]], [[../wiki/LLM-based Multi-Agent System.md]], [[../wiki/LLM Knowledge Base.md]]
- Rebuilt indexes: [[index.md]], [[sources.md]], [[tags.md]], [[concepts.md]], [[related.md]], [[backlinks.md]], [[assets.md]], [[questions.md]]
- Assets: localized 9 LaMAS images into [[../public/pictures]]
- Notes: did not modify `sources/` statuses because several source files already had unrelated working-tree modifications. Newly added notes based on abstract pages explicitly mark evidence limits.

## [2026-04-22] ingest | materialize source notes and close processed statuses

- Sources: 21 files under [[../sources]]
- Added wiki files from existing `sources_cn/`: 20 source-note pages that were already referenced by [[index.md]] and [[sources.md]] but missing from [[../wiki]]
- Added processed note: [[../sources_cn/llm knowledge base @ karpathy on X.md]]
- Updated source statuses: changed 21 `sources/` files from `status: "new"` to `status: "processed"`
- Index changes: updated [[sources.md]] processing notes and [[questions.md]] maintenance questions
- Notes: no new facts were inferred in this pass; it reconciled existing intermediate notes, wiki files, source statuses, and index records.

## [2026-04-22] source-save | Xiaohongshu Harness blog recommendation

- Source: [[../sources/rednote/分享几个最近 Harness 值得读的 blog.md]]
- Asset: [[../sources/media/分享几个最近-Harness-值得读的-blog-0-1776861501345.jpg]]
- Index changes: updated [[sources.md]] and [[assets.md]]
- Notes: saved visible Xiaohongshu page content only; source remains `status: "new"` for later wiki ingest if needed.
