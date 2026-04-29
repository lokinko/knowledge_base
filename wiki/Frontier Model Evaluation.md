---
title: "Frontier Model Evaluation"
summary: 对 frontier model 的能力、使用边界、安全风险和部署等级进行综合评测与披露的框架
type: concept
category: evaluation
status: active
created: 2026-04-28
updated: 2026-04-28
source_count: 1
confidence: medium
tags:
  - Frontier Model
  - Model Card
  - Safety Evaluation
  - Benchmark
  - Multimodal Model
related:
  - "[[The Claude 3 Model Family_Opus, Sonnet, Haiku]]"
  - "[[Function Calling]]"
---

## 定义

Frontier Model Evaluation 是对前沿通用模型做能力、限制、安全、社会影响和部署风险的综合评测。它不同于单一 benchmark 排名，因为它还要求说明模型不能做什么、在哪些场景需要人类审核、以及发布时的风险等级判断。

## 为什么重要

Agent 系统通常建立在 frontier model 之上。如果只记录模型能力分数，会忽略上下文窗口、工具使用、默认不联网、高风险场景不可独立使用、安全策略和训练数据边界等部署约束。

## 证据与例子

[[The Claude 3 Model Family_Opus, Sonnet, Haiku]] 展示了一种 model card 结构：模型家族定位、训练数据、能力评测、多模态评测、tool use、Constitutional AI、Trust & Safety 红队、Responsible Scaling Policy 和 ASL 分类。

## 与其他概念的关系

- 与 [[Function Calling]]：tool use 可以作为 frontier model 能力项，但函数调用鲁棒性仍需独立 benchmark。
- 与 [[GUI Agent]]：多模态能力不自动等价于 GUI grounding 能力。
- 与 [[LLM Agent Research Map]]：frontier model evaluation 是底层模型维度，agent evaluation 是系统行为维度。

## 未解问题

- 不同机构的 model card 和安全等级是否能建立可比较维度？
- frontier model 的通用多模态 benchmark 如何映射到 GUI agent 任务？
- 模型发布时的安全评测是否应和后续 agent 化使用场景联动？

