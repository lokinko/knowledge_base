---
title: "LLM Knowledge Base @karpathy on X"
summary: Karpathy 描述用 LLM 将 raw sources 增量编译为 Obsidian markdown wiki，并持续维护索引、问答输出和健康检查
type: source-note
category: practice
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - LLM Knowledge Base
  - Obsidian
  - Wiki Maintenance
  - Knowledge Index
  - Workflow
sources:
  - "[[../sources/llm knowledge base @ karpathy on X.md]]"
links:
  source: https://x.com/karpathy/status/2039805659525644595
related:
  - "[[LLM Knowledge Base]]"
---

## 核心结论

这条材料描述了一种小规模但实用的 LLM knowledge base 工作流：把文章、论文、仓库、数据集、图片等放入 raw/source 层，再让 LLM 增量编译成 markdown wiki。wiki 不只是摘要集合，还包括概念页、分类、backlinks、索引、可视化和问答产物。

这个思路与本仓库的 AGENTS.md 高度一致：Obsidian 是浏览和编辑前端，LLM 是维护者，markdown 文件是长期知识资产。

## 背景与问题

材料反对把所有知识工作都交给查询时 RAG。Karpathy 描述的做法是：在小到中等规模知识库里，LLM 可以靠自动维护索引和简短摘要来读取相关材料，而不是每次从原始资料重新拼接答案。

这意味着知识维护的重点从“查询时检索”转为“持续编译和修订”。

## 方法、机制或主张

材料中可确认的工作流包括：

- `Data ingest`：收集 raw/source 文档，用 LLM 编译 wiki，维护 summaries、backlinks、concepts 和分类。
- `IDE`：使用 Obsidian 浏览 raw data、compiled wiki 和可视化输出。
- `Q&A`：当 wiki 达到一定规模后，让 LLM 针对 wiki 做复杂查询，并将有价值输出写回 wiki。
- `Linting`：运行 LLM health checks，找矛盾、缺失数据、连接候选和进一步问题。
- `Extra tools`：开发搜索 CLI、可视化、Marp、matplotlib 等辅助工具。

## 证据与限制

这是个人实践观察，不是实验论文。它支持一种工作方式，但不证明该方式在所有规模、所有领域都优于 RAG。

本仓库可直接采用的是流程原则：原始资料保持可追溯，wiki 持续编译，索引作为 LLM 工作记忆，查询产物回流为知识资产。

## 与 wiki 中已有内容的关系

- [[LLM Knowledge Base]] 是本材料抽象出的概念页。
- [[Agent Memory]] 关注 agent 如何记忆任务和用户；这条材料关注人类知识库如何被 LLM 维护。
- [[Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey]] 提供 agent memory 的理论背景，但本材料更偏个人工作流实践。

## 可复用启发

- 小规模个人 wiki 的核心资产不是向量库，而是可读、可改、可链接的 markdown。
- LLM 维护索引和日志，能显著降低后续查询成本。
- 复杂问答结果应写回 wiki，否则知识增长只停留在聊天记录中。

## 待确认问题

- 当 wiki 超过几十万词后，索引策略如何分层？
- 哪些 health check 最适合自动化？
- 是否值得为本仓库开发本地 markdown 搜索 CLI？

> 来源：[[../sources/llm knowledge base @ karpathy on X.md]]

