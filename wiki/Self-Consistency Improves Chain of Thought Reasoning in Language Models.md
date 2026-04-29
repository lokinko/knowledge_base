---
title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
summary: Self-Consistency 通过采样多条 Chain-of-Thought reasoning path 并按最终答案一致性聚合，显著提升固定答案推理任务的准确率。
type: source-note
category: publication
status: active
created: 2026-04-28
updated: 2026-04-28
source_count: 1
confidence: high
tags:
  - Reasoning
  - Chain of Thought
  - Decoding
  - Prompting
  - Self-Consistency
sources:
  - "[[../sources/arXiv/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]]"
links:
  paper: https://arxiv.org/abs/2203.11171
  pdf: https://arxiv.org/pdf/2203.11171
assets:
  - "../sources/media/self-consistency-2203.11171/page-02-02.png"
  - "../sources/media/self-consistency-2203.11171/page-05.png"
  - "../sources/media/self-consistency-2203.11171/page-06.png"
related:
  - "[[LLM Reasoning Decoding]]"
  - "[[Agent Reflection]]"
---

## 核心结论

Self-Consistency 的核心结论是：复杂推理题往往存在多条不同 reasoning path 通向同一正确答案，因此 CoT 不应只依赖 greedy decoding 的单一路径，而应采样多条路径并选择最终答案中最一致的结果。

## 方法、机制或主张

方法保留 few-shot CoT prompt，但把解码阶段从 greedy decode 改成多路径采样：

1. 用 CoT exemplars 提示模型。
2. 通过 temperature、top-k 或 nucleus sampling 生成多条 reasoning path。
3. 从每条 path 中解析最终答案。
4. 对最终答案做 majority vote 或加权聚合，选择最一致答案。

论文把 reasoning path 记作潜变量 `r_i`，最终答案记作 `a_i`。Self-Consistency 的操作可以理解为对 `r_i` 做 marginalization，并在 `a_i` 上寻找最一致答案（p.3）。Table 1 显示 majority vote 与 normalized weighted sum 表现接近，且明显强于 greedy decode。

## 实验、证据与结果

论文在 UL2-20B、GPT-3-175B、LaMDA-137B 和 PaLM-540B 上评测算术、常识和符号推理。实验默认 few-shot，不训练、不微调；主结果通常采样 40 条输出，平均 10 次运行。

- 算术推理：PaLM-540B 上 GSM8K 从 56.5 到 74.4（+17.9），AQuA 从 35.8 到 48.3（+12.5）；code-davinci-002 上 GSM8K 从 60.1 到 78.0（+17.9），SVAMP 从 75.8 到 86.8（+11.0）（Table 2, p.5）。
- 常识与符号推理：PaLM-540B 上 StrategyQA 从 75.3 到 81.6（+6.3），ARC-c 从 85.2 到 88.7（+3.5）；code-davinci-002 上 StrategyQA 从 73.4 到 79.8（+6.4），ARC-c 从 83.6 到 87.5（+3.9）（Table 3, p.5）。
- 路径数量：Figure 2（p.6）显示采样路径从 1 增加到 40 时，多数任务准确率随路径数上升。
- 普通 NLP 任务：Table 5（p.6）显示在 CoT 有时伤害表现的任务上，Self-Consistency 可恢复并提升结果。
- 其他解码比较：p.7-p.8 显示它优于 sample-and-rank、beam search、prompt-order ensemble 和 multi-prompt ensemble。

## 图表、公式与表格

- Figure 1（p.2）：展示 CoT greedy decode 与 Self-Consistency 的差异：前者选择单条错误路径，后者采样多条路径并用答案一致性选出 `$18`。
- Table 2/3（p.5）：主结果表，分别覆盖算术、常识和符号推理。
- Figure 2（p.6）：展示采样 reasoning paths 数量增加带来的准确率提升。
- Table 4（p.6）：展示 Self-Consistency 如何用多条一致路径修复 greedy decode 的错误答案。

## 局限与信息边界

Self-Consistency 最适合最终答案可归一化、可投票或可比较的任务。论文明确指出，开放式生成任务只有在能定义一致性指标时才可能迁移（p.4）。该方法还会增加推理成本；论文建议从 5 或 10 条路径开始，因为不少任务较快饱和（p.9）。此外，模型仍可能生成错误或无意义 rationale，Table 4 的 StrategyQA 样例中就出现了中间事实不完全准确的问题（p.9）。

本页已核查 PDF 正文和关键图表页，但未逐字转写附录全部 prompts；附录只用于确认采样、prompt 鲁棒性、ensemble 和资源说明。

## 与 wiki 中已有内容的关系

- 与 [[LLM Reasoning Decoding]]：本论文是该概念的核心来源。
- 与 [[Agent Reflection]]：二者都利用多候选或多视角来降低单次推理脆弱性，但 Self-Consistency 是解码阶段聚合，不是执行后的自我反思。
- 与 [[Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives]]：Self-Consistency 用答案投票消解分歧；Self-Contrast 把分歧转写为 checklist，更适合非固定答案任务。

## 可复用启发

- 对固定答案推理任务，答案一致性可以比单条最高概率路径更可靠。
- 多路径采样的价值依赖可解析的最终答案；如果答案无法稳定抽取，收益会明显受限。
- 对 agent action selection，可以探索“多轨迹终态一致性”作为风险控制信号，但这已经超出论文直接证据。

## 待确认问题

- 在开放式生成、代码设计、研究综述或 GUI 操作中，应如何定义可计算的“一致性”？
- 多路径采样应由固定预算、置信度阈值还是任务风险动态决定？
- Self-Consistency 的错误 rationale 是否会污染后续反思、记忆或监督数据构造？

> 来源：[[../sources/arXiv/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]]
