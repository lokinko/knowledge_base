---
title: "Evo-Memory: Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory"
source: "https://arxiv.org/abs/2511.20857"
author:
  - "[[Tianxin Wei]]"
  - "[[Noveen Sachdeva]]"
  - "[[Benjamin Coleman]]"
  - "[[Zhankui He]]"
  - "[[Yuanchen Bei]]"
  - "[[Xuying Ning]]"
  - "[[Mengting Ai]]"
  - "[[Yunzhe Li]]"
  - "[[Jingrui He]]"
  - "[[Ed H. Chi]]"
  - "[[Chi Wang]]"
  - "[[Shuo Chen]]"
  - "[[Fernando Pereira]]"
  - "[[Wang-Cheng Kang]]"
  - "[[Derek Zhiyuan Cheng]]"
published:
created: 2026-04-20
description: "Abstract page for arXiv paper 2511.20857: Evo-Memory: Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory"
tags:
status: "processed"
---
## Title:Evo-Memory: Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory

[View PDF](https://arxiv.org/pdf/2511.20857) [HTML (experimental)](https://arxiv.org/html/2511.20857v1)

> Abstract:Statefulness is essential for large language model (LLM) agents to perform long-term planning and problem-solving. This makes memory a critical component, yet its management and evolution remain largely underexplored. Existing evaluations mostly focus on static conversational settings, where memory is passively retrieved from dialogue to answer queries, overlooking the dynamic ability to accumulate and reuse experience across evolving task streams. In real-world environments such as interactive problem assistants or embodied agents, LLMs are required to handle continuous task streams, yet often fail to learn from accumulated interactions, losing valuable contextual insights, a limitation that calls for test-time evolution, where LLMs retrieve, integrate, and update memory continuously during deployment. To bridge this gap, we introduce Evo-Memory, a comprehensive streaming benchmark and framework for evaluating self-evolving memory in LLM agents. Evo-Memory structures datasets into sequential task streams, requiring LLMs to search, adapt, and evolve memory after each interaction. We unify and implement over ten representative memory modules and evaluate them across 10 diverse multi-turn goal-oriented and single-turn reasoning and QA datasets. To better benchmark experience reuse, we provide a baseline method, ExpRAG, for retrieving and utilizing prior experience, and further propose ReMem, an action-think-memory refine pipeline that tightly integrates reasoning, task actions, and memory updates to achieve continual improvement.

| Subjects: | Computation and Language (cs.CL); Artificial Intelligence (cs.AI) |
| --- | --- |
| Cite as: | [arXiv:2511.20857](https://arxiv.org/abs/2511.20857) \[cs.CL\] |
|  | (or [arXiv:2511.20857v1](https://arxiv.org/abs/2511.20857v1) \[cs.CL\] for this version) |
|  | [https://doi.org/10.48550/arXiv.2511.20857](https://doi.org/10.48550/arXiv.2511.20857) |

## Submission history

From: Tianxin Wei \[[view email](https://arxiv.org/show-email/10f82c53/2511.20857)\]  
**\[v1\]** Tue, 25 Nov 2025 21:08:07 UTC (3,174 KB)

[Which authors of this paper are endorsers?](https://arxiv.org/auth/show-endorsers/2511.20857) | Disable MathJax ([What is MathJax?](https://info.arxiv.org/help/mathjax.html))
