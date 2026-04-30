---
title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
summary: Self-Consistency 用多条采样 reasoning path 的答案一致性替代 greedy decoding，显著提升 CoT 在算术、常识和符号推理任务上的准确率。
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

Self-Consistency 的核心思想是：复杂推理题通常允许多条不同 reasoning path 通向同一个正确答案，因此不应只取 greedy decoding 的单条链，而应采样多条链并选择最终答案中最一致的结果。

## 背景与问题

Chain-of-Thought prompting 让模型显式生成中间推理步骤，但早期 CoT 常配合 greedy decoding。greedy decoding 的问题是会锁定一条局部最优路径，一旦这条路径错误，模型没有其他路径可以纠偏。

Self-Consistency 把推理路径视为隐变量：保留 CoT prompt，但在解码阶段采样多个候选推理过程，然后对最终答案做多数投票或加权聚合。

## 方法、机制或主张

方法流程很简单：

1. 用 few-shot CoT prompt 提示模型。
2. 用 temperature、top-k 或 nucleus 等采样方法生成多条 reasoning path。
3. 从每条 path 中解析最终答案。
4. 对答案集合做聚合，通常直接用 majority vote。

论文把 reasoning path 记作潜变量 `r_i`，最终答案记作 `a_i`。在多个 $(r_i, a_i)$ 被采样后，Self-Consistency 对 `r_i` 做 marginalization，并在最终答案集合上选取最一致答案。论文指出，未加权多数投票与归一化加权求和表现接近，而且明显优于 greedy decoding（Table 1, p.3）。这说明在许多固定答案推理任务上，答案一致性比单条生成概率更可靠。

Figure 1（p.2）给出方法图：同一 CoT prompt 下，greedy decode 生成一条错误路径并得到 `$14`；Self-Consistency 采样多条路径，其中两条不同路径都得到 `$18`，最终通过答案一致性选出 `$18`。

## 证据与限制

论文在 UL2-20B、GPT-3-175B、LaMDA-137B 和 PaLM-540B 上评测算术、常识和符号推理。实验默认 few-shot，不训练、不微调；算术任务使用 Wei et al. (2022) 的 8 个手写 CoT exemplars，采样通常取 40 条输出并平均 10 次运行（p.4-p.5）。

主要证据：

- 算术推理：Self-Consistency 在四类模型上都优于 CoT greedy decoding。代表性结果包括 PaLM-540B 上 GSM8K 从 56.5 到 74.4（+17.9），AQuA 从 35.8 到 48.3（+12.5）；code-davinci-002 上 GSM8K 从 60.1 到 78.0（+17.9），SVAMP 从 75.8 到 86.8（+11.0）（Table 2, p.5）。
- 常识与符号推理：PaLM-540B 上 StrategyQA 从 75.3 到 81.6（+6.3），ARC-c 从 85.2 到 88.7（+3.5）；code-davinci-002 上 StrategyQA 从 73.4 到 79.8（+6.4），ARC-c 从 83.6 到 87.5（+3.9）（Table 3, p.5）。
- 多路径数量：Figure 2（p.6）显示在 LaMDA-137B 上，采样路径数从 1 增加到 40 时，多数任务准确率随路径数上升，并明显高于 greedy decode。
- 当 CoT 会伤害常规 NLP 任务时，Self-Consistency 仍能提升结果。例如 PaLM-540B 上 ANLI、e-SNLI、RTE、BoolQ、HotpotQA 的 self-consistency 行均优于 CoT 行（Table 5, p.6）。
- 与 sample-and-rank、beam search、prompt-order ensemble 和 multi-prompt ensemble 比较时，Self-Consistency 在相同或相近采样预算下仍更强（p.7-p.8；Table 6/7）。

论文讨论的边界：

- 方法适用于最终答案来自固定答案集合、且答案可解析和聚合的任务；开放式生成只有在能定义一致性指标时才可能迁移（p.4）。
- 额外采样会增加推理成本；论文建议可以从 5 或 10 条路径开始，因为不少任务的收益较快饱和（p.9）。
- 模型仍可能生成错误或无意义的 reasoning path；Table 4 的 StrategyQA 样例中，某些中间人口数字并不准确，说明 rationale grounding 仍需改进（p.9）。

信息边界：本笔记已基于 PDF 全文和关键页截图核查，但没有逐字转写附录全部 prompts；附录只用于确认采样、prompt 鲁棒性、模型 ensemble 和资源说明的存在与大意。

## 图表、公式与表格

- Figure 1（p.2）：Self-Consistency 的三步流程：CoT prompt、采样多条 reasoning paths、对最终答案做一致性聚合。
- Table 1（p.3）：比较答案聚合策略；majority vote 与 normalized weighted sum 接近，明显好于 greedy decode。
- Table 2（p.5）：算术推理主结果，展示不同模型和任务上的绝对准确率提升。
- Table 3（p.5）：常识和符号推理主结果，展示 StrategyQA、ARC、Letter、Coinflip 等任务提升。
- Figure 2（p.6）：采样路径数量越多，LaMDA-137B 在多项任务上的准确率通常越高。
- Table 4（p.6）：展示 greedy decode 错误、多个采样路径一致修正答案的例子。
- Table 5（p.6）：在若干普通 NLP 任务上，Self-Consistency 能缓解 CoT prompting 有时伤害性能的问题。
- Figure 3、Table 6、Table 7（p.7）：与 sample-and-rank、beam search、prompt ensemble 的比较。
- Figure 4、Table 8（p.8）：采样策略、模型规模、imperfect prompt、equation prompt、zero-shot CoT 下的鲁棒性。

## 与 wiki 中已有内容的关系

- 与 [[Agent Reflection]]：二者都利用多候选或多视角减少单次推理的脆弱性，但 Self-Consistency 是解码策略，不是执行后反思。
- 与 [[LLM Reasoning Decoding]]：它是“采样多路径再聚合答案”的代表方法。
- 与 `Self-Contrast`：Self-Consistency 用多数答案选择，Self-Contrast 更强调把分歧转译为检查清单，因此适用范围不同。

## 可复用启发

- 对固定答案推理任务，增加推理路径多样性通常比相信单条最高概率路径更稳。
- 多样性本身不是目标，关键是能从多样 reasoning path 中提取可比较的最终答案。
- 如果任务不能可靠解析答案，Self-Consistency 的收益会受限。

## 待确认问题

- 在 agent action selection 中，能否把多个动作轨迹的终态一致性作为决策信号？
- 对开放式研究综述、代码设计或 GUI 操作任务，应该怎样定义“答案一致”？
- 多路径采样的额外推理成本与准确率提升如何折中？

> 来源：[[../sources/arXiv/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]]
