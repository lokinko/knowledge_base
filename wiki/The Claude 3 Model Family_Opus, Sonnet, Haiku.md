---
title: "The Claude 3 Model Family: Opus, Sonnet, Haiku"
summary: Claude 3 model card 同时记录模型家族定位、能力评测、多模态能力、tool use、安全边界和 ASL-2 风险判断
type: source-note
category: model-card
status: active
created: 2026-04-28
updated: 2026-04-28
source_count: 1
confidence: medium
tags:
  - Model Card
  - Frontier Model
  - Multimodal Model
  - Safety Evaluation
  - Function Calling
sources:
  - "[[../sources/arXiv/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]]"
links:
  pdf: https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf
related:
  - "[[Frontier Model Evaluation]]"
  - "[[Function Calling]]"
---

## 核心结论

Claude 3 model card 是模型发布资料，不是 agent 系统论文。它的主要知识价值在于把能力、用途、限制、训练数据、安全评估和发布风险等级放在同一文档里，为后续比较 frontier model 提供结构。

## 模型家族定位

文档把 Claude 3 分为：

- `Opus`：最高能力版本。
- `Sonnet`：能力和速度折中。
- `Haiku`：最快、成本最低，并仍支持视觉能力。

三者都支持图像输入和文本输出。文档也把 tool use/function calling 作为重要能力面，但没有展开移动端函数调用细节。

## 证据与边界

能力评测覆盖 MMLU、GPQA、GSM8K、MATH、HumanEval、MGSM、DROP、BIG-Bench-Hard、多模态 MMMU、DocVQA、AI2D、ChartQA 等。文档报告 Opus 在推理、数学、代码和多模态任务上表现强，Haiku 在多数纯文本任务上达到或超过 Claude 2。

风险评测按 Responsible Scaling Policy 检查 biological、cyber、autonomous replication and adaptation 三类灾难风险。文档结论是 Claude 3 未触发 ASL-3 指标，分类为 ASL-2；但也承认评测方法仍在改进。

信息边界：本页依据 PDF 文本抽取，不验证所有 benchmark 复现实验，也不代表 2026 年最新 Claude 模型状态。

## 与其他页面的关系

- [[Frontier Model Evaluation]]：提供 model card 作为评测与风险披露格式的样例。
- [[Function Calling]]：补充通用 frontier model 的 tool use 能力背景。
- [[LLM Agent Research Map]]：Claude 3 可作为 agent 系统的底层模型背景，而非独立 agent 方法。

## 待确认问题

- Claude 3 的 tool use 是否有独立 benchmark 和错误类型分析？
- ASL-2 结论与后续 Claude 系列模型是否可比较？
- model card 中的多模态评测如何映射到 GUI agent 的视觉 grounding 能力？

> 来源：[[../sources/arXiv/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]]
