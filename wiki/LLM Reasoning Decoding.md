---
title: "LLM Reasoning Decoding"
summary: 面向推理任务的解码策略，关注如何从单条 CoT 扩展到多路径采样、答案聚合和分歧利用
type: concept
category: reasoning
status: active
created: 2026-04-28
updated: 2026-04-28
source_count: 2
confidence: high
tags:
  - Reasoning
  - Chain of Thought
  - Decoding
  - Prompting
  - Self-Consistency
related:
  - "[[Agent Reflection]]"
  - "[[Self-Consistency Improves Chain of Thought Reasoning in Language Models]]"
  - "[[Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives]]"
---

## 定义

LLM Reasoning Decoding 指在 prompt 和模型参数不变的情况下，通过解码策略改变推理结果选择方式。它关注的问题是：当模型可以生成多条合理 reasoning path 时，应该如何选择、聚合或利用这些路径。

## 为什么重要

单条 greedy CoT 容易被早期错误锁死。多路径采样提供了额外证据，但只有在最终答案可比较、分歧可解释或候选轨迹可验证时才有价值。

[[Self-Consistency Improves Chain of Thought Reasoning in Language Models]] 的 PDF 全文给出一个清晰证据：在固定答案任务里，多条 reasoning path 的最终答案一致性可以明显优于单条最高概率路径。这个结论不能直接推出开放式任务也适用，但它提供了一个可复用模式：先制造候选差异，再用结构化信号筛选或压缩。

## 相关方法或分支

- Self-Consistency：采样多条 reasoning path，并对最终答案做 majority vote 或归一化加权聚合。
- Sample-and-rank：生成多个候选后排序，但如果排序信号弱，可能不如答案一致性。
- Beam search：偏向高概率局部区域，未必能产生足够多样的 reasoning path。
- Self-Contrast：生成多种视角，比较分歧并形成 checklist，更适合不容易投票的开放任务。

## 证据与例子

Self-Consistency PDF 的页码级证据：

- Figure 1（p.2）：展示 greedy decode 可能沿单条错误路径得到 `$14`，而多条采样路径中两个不同 reasoning path 都得到 `$18`，最终答案一致性选出正确答案。
- Table 1（p.3）：majority vote 与 normalized weighted sum 表现接近，并明显优于 greedy decode。
- Table 2（p.5）：PaLM-540B 上 GSM8K 从 56.5 到 74.4，AQuA 从 35.8 到 48.3；code-davinci-002 上 GSM8K 从 60.1 到 78.0，SVAMP 从 75.8 到 86.8。
- Figure 2（p.6）：采样 reasoning path 数量增加时，多数任务准确率随之上升。

## 与其他概念的关系

- 与 [[Agent Reflection]]：多路径解码和 agent 反思都利用候选差异，但前者发生在答案生成阶段，后者发生在执行或决策控制阶段。
- 与 Chain-of-Thought：Self-Consistency 通常建立在 CoT prompt 之上，是替换 greedy decode 的方法。
- 与 verifier / reranker：Self-Consistency 不需要额外训练 verifier 或收集人类标注，但也不具备外部验证器的事实核查能力。

## 争议、边界与未解问题

- 固定答案任务可以投票，开放式写作、代码设计和 GUI 操作需要另行定义一致性。
- 多路径采样增加推理成本，应考虑动态停止、置信度阈值或任务风险预算。
- 多条错误路径可能收敛到同一个错误答案，因此一致性不是事实正确性的充分条件。
- 分歧应被消除、保留还是转化为检查问题，取决于任务类型。

## 相关页面

- [[Self-Consistency Improves Chain of Thought Reasoning in Language Models]]
- [[Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives]]
- [[Agent Reflection]]
