---
title: "VeriOS: Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents"
summary: 让 OS agent 在不可信场景下主动向人发问，在可信场景下自主执行，以降低过度执行风险
date: 2025-09-07
category: publication
badge: arXiv'25
authors:
  - Zheng Wu
  - Heyuan Huang
  - Xingyu Lou
  - et al.
tags:
  - OS-Agent
  - Trustworthiness
  - Human-in-the-Loop
  - GUI-Agent
links:
  论文: https://arxiv.org/abs/2509.07553
  代码: https://github.com/Wuzheng02/VeriOS
---

## 研究问题

随着多模态模型能力增强，OS agent 已经能自动执行越来越多 GUI 任务。但现实环境并不总是“理想执行环境”，很多时候存在：

- 信息缺失
- 多选歧义
- 敏感操作
- 环境异常

如果 agent 在这些场景里仍然机械执行，就会出现 `over-execution` 风险。本文关注的核心问题是：OS agent 是否应该学会在某些场景下停下来问人，而不是默认继续做下去。

## 核心思路

VeriOS 提出一种 `query-driven human-agent-GUI interaction` 框架。它的核心原则很简单：

- 在正常、可信场景里，agent 继续自主执行；
- 在不可信场景里，agent 应先向人提问，利用问答历史再继续执行。

因此，可信 OS agent 的关键不只是“会操作”，还包括“知道什么时候该问人”。

## 方法结构

### 1. VeriOS-Bench

为了让这个问题能被系统评测，作者先构造了 `VeriOS-Bench`。这个 benchmark 不只含普通 GUI 操作样本，还标注了多类 scenario type，包括：

- `environmental anomalies`
- `information missing`
- `sensitive actions`
- `multiple choices`
- `normal scenarios`

并且，对于不可信场景，还额外标出 agent 应该问什么，以及人的预定义回答立场。

这使 VeriOS-Bench 不只是 action benchmark，而是同时评测：

- 场景识别是否正确；
- 询问是否合理；
- 询问后是否能更好完成动作。

### 2. Meta-knowledge decoupling

VeriOS-Agent 的训练关键，在于把数据实例拆成两类 meta-knowledge：

- `scenario knowledge`：用于识别不可信场景并生成相应提问；
- `action knowledge`：用于结合 query-answer history 生成实际 GUI 动作。

作者认为，传统 OS agent 容易把这两种知识混在一起学，结果要么不会判断场景，要么即便得到问答历史也不会正确利用。

### 3. Three-stage learning paradigm

论文提出一个三阶段学习范式，通过 `SFT` 和 `GRPO` 来完成上述知识的解耦与利用。其目标是让 agent 同时学会：

- 识别是否当前场景值得查询；
- 生成合适的问题；
- 把人类回答整合回动作生成过程。

换句话说，VeriOS-Agent 不是简单在 prompt 里插一个“你可以问人”，而是把“何时问、问什么、怎么用回答”当作训练目标。

## 主要结果

### 1. 总体 step-wise success rate 提升 19.72%

根据论文摘要和正文，VeriOS-Agent 相对最强基线的平均 `step-wise success rate` 提升 `19.72%`。

这个数字的重要性在于，它不是通过牺牲正常场景性能换来的，而是在保持 normal scenario 表现基本不掉的情况下得到的。

### 2. 不可信场景提升更明显

正文进一步指出，在 `untrustworthy scenarios` 上，相对最强基线的 step-wise success rate 提升可达到 `20.64%`。

这说明主动询问机制不是形式上的安全兜底，而是真正改善了困难场景里的任务完成率。

### 3. 现有 OS agent 即便给了问答历史，也未必会变好

论文在 VeriOS-Bench 上做了一个很重要的 pilot study：把正确标注的 query-answer pair 直接塞给现有 OS agent 后，normal scenario 表现反而下降，而且小模型下降更明显。

这说明问题不只是“缺少问答内容”，而是 agent 本身缺少利用这类 meta-knowledge 的训练机制。VeriOS 的贡献，正是在这里补了一层结构化学习。

## 与相关文档的对照理解

结合知识库中另外 3 篇相近文档，可以更清楚地看出 VeriOS 的定位：

- `KnowU-Bench` 关注主动干预、偏好获取和 consent negotiation 的完整链路；VeriOS 更专注于“不可信场景下是否该询问、如何询问”这一可信执行问题。
- `MobileUse` 解决的是长程 GUI 执行中的反思和冷启动；VeriOS 解决的是执行前后的人类介入边界，属于更高层的 trustworthiness 问题。
- `HammerBench` 关注对话式 function-calling 中多轮参数补齐；VeriOS 虽然也有 query-driven interaction，但它的提问目标是风险控制和场景澄清，而不是纯 slot filling。

## 可复用启发

- 对 GUI/OS agent 而言，“知道什么时候别继续执行”本身就是一项核心能力。
- human-in-the-loop 不应只是部署时补丁，而应在训练阶段就把场景识别、提问生成和答案利用一起学进去。
- 不能假设给模型更多上下文就自然会更安全，是否会正确利用上下文本身也需要训练。
- 可信 agent 的评测，应该把“场景判断”和“动作执行”拆开看，而不是只看最终动作是否正确。

## 局限与边界

- 本笔记主要依据 arXiv 摘要页与 HTML 正文整理，未逐项展开三阶段训练的所有实现细节。
- VeriOS 聚焦的是 query-driven trustworthiness，不直接覆盖完整权限系统、长期偏好建模或隐私保护机制。
- 它主要验证了 OS/GUI agent 的受控 benchmark 场景，部署到更开放环境仍需要额外工程约束。

## 结论

VeriOS 的关键贡献，在于把“可信 OS agent”重新定义为：不仅要能做事，还要知道什么时候该暂停执行、转而向人确认。通过将 scenario knowledge 与 action knowledge 解耦，并把 query-driven interaction 纳入训练闭环，它为 GUI agent 的可信执行提供了比单纯“少做一点”更系统的路线。

> 来源：[[VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents]]
