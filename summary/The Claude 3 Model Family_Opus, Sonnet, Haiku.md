---
title: "The Claude 3 Model Family: Opus, Sonnet, Haiku"
summary: Claude 3 model card 把 Opus、Sonnet、Haiku 组织为能力、速度和成本不同的多模态模型家族，并同时披露能力评测、安全评测、使用边界和 ASL-2 发布判断。
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

Claude 3 model card 的价值不只是公布模型能力排名，而是把模型家族、使用边界、训练数据、能力评测、多模态能力、社会风险和 Responsible Scaling Policy 风险等级放在同一个发布文档中。

## 背景与问题

原始剪藏只保存了 PDF iframe，无法提供正文信息。本次使用 PDF 文本抽取补读。文档介绍 Claude 3 Opus、Sonnet、Haiku 三个模型：Opus 强调最高能力，Sonnet 平衡能力与速度，Haiku 强调速度和成本。三者都支持视觉输入、文本输出，并被定位为企业和开发者可接入的通用助手模型。

## 方法、机制或主张

文档披露的主要信息包括：

- 模型用途：开放式对话、写作、编辑、摘要、代码、文档处理、视觉输入理解和 tool use/function calling。
- 使用边界：不应单独用于会造成伤害的高风险决策；模型默认不会搜索网页，也不能记住独立会话，除非用户把材料重新放入上下文。
- 训练数据：包括截至 2023 年 8 月的公开互联网信息、第三方非公开数据、标注服务数据和内部生成数据；文档声明未使用用户或客户提交的 prompt/output 训练 Claude 3。
- 对齐方法：包括预训练、人类反馈和 Constitutional AI，并加入关于 disability rights 的额外原则。

## 证据与限制

能力评测覆盖 MMLU、GPQA、GSM8K、MATH、HumanEval、MGSM、DROP、BIG-Bench-Hard、ARC-Challenge、多模态 MMMU、DocVQA、AI2D、ChartQA 等。文档报告 Claude 3 Opus 在多项推理、数学、代码和视觉任务上达到或接近当时前沿表现；Haiku 在多数纯文本任务上达到或超过 Claude 2。

风险评测按 Anthropic RSP 关注三类潜在灾难风险：生物能力、网络能力、自主复制与适应能力。文档结论是 Claude 3 未触发 ASL-3 指标，整个 Claude 3 家族被分类为 ASL-2；但文档也明确指出这些评测仍是困难问题，方法还在改进。

## 与 wiki 中已有内容的关系

- 与 [[Function Calling]]：Claude 3 model card 把 tool use/function calling 视为模型家族的重要能力，但没有像 Hammer/HammerBench 那样聚焦移动端函数选择鲁棒性。
- 与 [[Frontier Model Evaluation]]：该文档是模型卡类型资料，适合沉淀“能力评测 + 安全评测 + 使用边界”的发布结构。
- 与 [[LLM Agent Research Map]]：Claude 3 可作为底层 frontier model 背景资料，但不是特定 agent 架构论文。

## 可复用启发

- 模型发布资料应同时记录能力边界和风险边界，不能只记录 benchmark 分数。
- 多模态和 tool use 是模型能力扩展方向，但安全评测也必须随能力面扩展。
- 仅凭 model card 不能推断模型在本地具体 agent workflow 中的真实表现。

## 待确认问题

- Claude 3 的 tool use 评测细节是否有独立技术报告或 benchmark？
- ASL-2 发布判断与后续 Claude 版本的 RSP 评估是否发生变化？
- model card 中的 benchmark 分数如何与本库已有 GUI agent、memory agent 评测建立可比关系？

> 来源：[[../sources/arXiv/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]]
