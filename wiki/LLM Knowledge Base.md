---
title: "LLM Knowledge Base"
summary: 由 LLM 持续把原始资料编译为 markdown wiki、索引、概念页、查询产物和健康检查记录的个人知识库模式
type: concept
category: workflow
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 2
confidence: medium
tags:
  - LLM Knowledge Base
  - Obsidian
  - Wiki Maintenance
  - Knowledge Index
  - Workflow
related:
  - "[[LLM Knowledge Base @karpathy on X]]"
  - "[[LLM Agent Research Map]]"
---

## 定义

LLM Knowledge Base 是一种把 LLM 当作知识维护者的工作流。用户收集 raw sources，LLM 将其持续编译为 wiki 页面、概念页、反向链接、索引、问题清单和衍生输出。

本仓库采用的就是这种模式：`sources/` 是事实来源，`wiki/` 是长期知识资产，`knowledge_index/` 是 LLM 的工作记忆。

## 为什么重要

传统 RAG 在查询时临时检索和拼接资料。LLM Knowledge Base 则把知识整理前移：每次 ingest、query 和 lint 都会把结果写回 wiki，让知识持续累积。

这对中小规模研究库尤其实用，因为 LLM 可以先读索引，再打开相关页面，而不是每次从原文重新发现结构。

## 相关方法或分支

- source-note：把单个 source 去噪、结构化、标注边界。
- concept page：跨 sources 沉淀概念、方法、任务和系统。
- comparison page：横向比较 benchmark、方法或问题设定。
- query-output：把高价值问答保存为可复用页面。
- lint：找矛盾、孤岛、缺页、标签分裂和来源缺口。

## 证据与例子

[[LLM Knowledge Base @karpathy on X]] 描述了近似流程：raw documents 进入 raw 目录，LLM 增量编译 wiki，Obsidian 作为前端，LLM 维护索引、backlinks、概念页、问答输出和健康检查。

本次重建把该思路落实为：

- 补齐所有 source-note。
- 创建概念页和研究地图。
- 重建 `knowledge_index/`。
- 本地化 LaMAS 相关图片资产。

## 与其他概念的关系

- 与 [[Agent Memory]]：wiki 是面向人的外部长期记忆；agent memory 是面向 agent 任务执行的长期状态。
- 与 [[LLM Agent Research Map]]：研究地图是 wiki 中的高层导航页。

## 争议、边界与未解问题

- 索引层如何随规模增长分层？
- 哪些查询结果值得写回 wiki？
- 何时需要从 markdown 索引升级到本地搜索工具？
- LLM lint 是否应自动修改，还是只报告候选问题？

## 相关页面

- [[LLM Knowledge Base @karpathy on X]]
- [[LLM Agent Research Map]]

