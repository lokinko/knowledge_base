---
title: "LaMP: When Large Language Models Meet Personalization"
summary: 提出 LaMP 个性化语言模型基准，覆盖 7 类任务并评估基于用户 profile 的检索增强个性化
type: source-note
category: publication
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Personalization
  - Benchmark
  - Retrieval Augmentation
  - User Profile
  - Language Model
sources:
  - "[[../sources/LaMP_ When Large Language Models Meet Personalization.md]]"
links:
  paper: https://arxiv.org/abs/2304.11406
related:
  - "[[Mobile Agent Personalization]]"
  - "[[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]]"
---

## 核心结论

LaMP 是较早系统化评测语言模型个性化输出的 benchmark。它覆盖 7 类个性化任务：3 类文本分类和 4 类文本生成，并为每个用户 profile 提供多条历史条目。

论文还提出两类 retrieval augmentation 方法，从用户 profile 中检索相关个人条目来增强输出。摘要显示，个性化检索能提升 zero-shot 和 fine-tuned LMs 的表现，并说明个性化对多种自然语言任务有影响。

## 背景与问题

标准 LLM 通常把用户视为抽象请求方，而不是具有稳定历史、偏好和写作风格的具体个体。LaMP 关注的问题是：模型如何利用用户 profile 生成更符合个人历史的输出。

它与 mobile agent 个性化的差别在于，LaMP 主要是文本任务个性化，不涉及 GUI 执行、主动介入或同意协商。

## 方法、机制或主张

摘要层面可确认：

- 基准包含多种语言任务，而不是单一推荐或分类。
- 每个用户 profile 有多条历史条目，支持检索式个性化。
- 对 term matching、semantic matching 和 time-aware retrieval 等检索方法进行比较。

这使 LaMP 更像个性化 LLM 的基础层 benchmark，可为 [[Mobile Agent Personalization]] 提供用户 profile 建模参考。

## 证据与限制

论文摘要声称 retrieval augmentation 有效，但当前笔记未核验具体任务、数据规模、模型设置和提升幅度。因此仅把它作为“个性化文本生成/分类评测基准”，不推断到 mobile GUI agent。

## 与 wiki 中已有内容的关系

- [[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]] 把个性化推进到在线 GUI 环境和同意机制；LaMP 是文本 profile personalization 的基线背景。
- [[Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents]] 将个人化扩展到移动操作演示和隐式意图。
- [[Agent Memory]] 可吸收 LaMP 的用户 profile 检索思想，但需要额外处理更新、遗忘和隐私边界。

## 可复用启发

- 个性化系统至少需要 profile 检索层，而不是只把全部历史塞入上下文。
- time-aware retrieval 对用户偏好可能重要，因为旧偏好不一定仍有效。
- 文本个性化与 GUI 助手个性化应分开评测，不能直接互相替代。

## 待确认问题

- LaMP 的任务是否覆盖偏好变化或矛盾历史？
- 用户 profile 检索是否考虑隐私和可解释性？
- 该基准与 mobile agent 个性化之间如何迁移？

> 来源：[[../sources/LaMP_ When Large Language Models Meet Personalization.md]]

