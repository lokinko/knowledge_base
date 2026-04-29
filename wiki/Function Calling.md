---
title: "Function Calling"
summary: LLM agent 将用户意图映射为外部函数、API 或工具调用的能力，移动助手场景尤其关注多轮鲁棒性和参数错误
type: concept
category: agent
status: active
created: 2026-04-22
updated: 2026-04-28
source_count: 4
confidence: medium
tags:
  - Function Calling
  - Tool Use
  - Mobile Assistant
  - On-Device Model
  - Benchmark
  - Frontier Model
related:
  - "[[GUI Agent]]"
  - "[[LLM-based Multi-Agent System]]"
  - "[[The Claude 3 Model Family_Opus, Sonnet, Haiku]]"
---

## 定义

Function Calling 是 LLM agent 根据自然语言意图选择函数、填充参数并处理多轮调用状态的能力。在移动助手中，它常与 GUI 操作并存：有些任务适合 API 调用，有些任务必须通过界面执行。

## 为什么重要

工具调用是 agent 从语言模型走向实际任务执行的基础能力。当前资料强调两个风险：

- 模型容易被函数命名、无关函数或参数名误导。
- 多轮用户行为会带来意图变化、参数变化、指代和不完整指令。

## 相关方法或分支

- [[Hammer_ Robust Function-Calling for On-Device Language Models via Function Masking]] 提出 function masking 和增强数据，让 on-device function-calling 模型更能抵抗无关函数干扰。
- [[HammerBench_ Fine-Grained Function-Calling Evaluation in Real Mobile Device Scenarios]] 用真实移动助手多轮场景评测 function-calling 鲁棒性。
- [[LLM-based Multi-Agent Systems_ Techniques and Business Perspectives]] 把 tool integration 放进单 agent 构成，并进一步讨论工具 agent 化后的多智能体系统。
- [[The Claude 3 Model Family_Opus, Sonnet, Haiku]] 在 model card 中把 tool use/function calling 列为 Claude 3 的重要能力面，但未展开移动端函数选择和参数鲁棒性。

## 证据与例子

HammerBench 的摘要指出，参数名错误是不同交互场景中的重要失败来源。Hammer 则强调现有 function-calling 模型跨 benchmark 表现不稳定，常受 naming conventions 影响。

这说明 function calling 的关键不只是“能调用工具”，而是要在有干扰函数、多轮上下文和移动应用真实功能中稳定选择正确调用。

Claude 3 model card 补充了另一层信息：frontier model 可以把 tool use 作为通用能力发布，但具体到 agent 系统，仍需要 HammerBench 这类场景化 benchmark 来判断真实鲁棒性。

## 与其他概念的关系

- 与 [[GUI Agent]]：function calling 可绕过 GUI，但真实移动助手常需要两者混合。
- 与 [[LLM-based Multi-Agent System]]：当工具本身变成 autonomous agents，function calling 会扩展为 agent routing 和 protocol 问题。
- 与 [[Long-Horizon Agent Evaluation]]：多轮 function calling 需要按 turn 和 snapshot 做细粒度评测。

## 争议、边界与未解问题

- Function masking 是否会牺牲开放工具发现能力？
- 多轮对话中，意图和参数变化应如何被显式建模？
- GUI 操作和 function calling 的选择策略如何评测？
- 通用 model card 中的 tool use 能力，如何映射到移动助手或 GUI agent 的具体调用错误类型？

## 相关页面

- [[Hammer_ Robust Function-Calling for On-Device Language Models via Function Masking]]
- [[HammerBench_ Fine-Grained Function-Calling Evaluation in Real Mobile Device Scenarios]]
- [[The Claude 3 Model Family_Opus, Sonnet, Haiku]]
