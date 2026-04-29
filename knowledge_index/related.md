# Related Pages

Updated: 2026-04-28

## Strong Relations

- [[../wiki/GUI Agent.md]] <-> [[../wiki/Long-Horizon Agent Evaluation.md]]: GUI 操作任务通常长程、多路径且状态噪声高。
- [[../wiki/GUI Agent.md]] <-> [[../wiki/Agent Reflection.md]]: 长程 GUI 执行需要单步、轨迹和全局反思。
- [[../wiki/Agent Memory.md]] <-> [[../wiki/Agent Memory Benchmarks.md]]: 概念页与 benchmark 对比页互为入口。
- [[../wiki/Agent Memory.md]] <-> [[../wiki/Agent Continual Learning.md]]: 外部记忆更新和参数持续学习都面向长期适应。
- [[../wiki/Mobile Agent Personalization.md]] <-> [[../wiki/Agent Memory.md]]: 偏好、行为日志和同意历史属于 user-centric memory。
- [[../wiki/Function Calling.md]] <-> [[../wiki/LLM-based Multi-Agent System.md]]: 工具调用扩展到工具 agent 化后，变成 agent routing 和 protocol 问题。
- [[../wiki/LLM Knowledge Base.md]] <-> [[../wiki/Agent Memory.md]]: 二者都处理长期记忆，但服务对象不同。
- [[../wiki/GUI Agent.md]] <-> [[../wiki/Mobile Agent Personalization.md]]: MAESTRO 显示偏好记忆可以直接控制 GUI 原位适配和流程回退。
- [[../wiki/Agent Reflection.md]] <-> [[../wiki/LLM Reasoning Decoding.md]]: 二者都使用多候选差异，但发生在不同阶段。
- [[../wiki/Frontier Model Evaluation.md]] <-> [[../wiki/Function Calling.md]]: model card 可以声明 tool use 能力，但场景化 function-calling 鲁棒性需要独立评测。

## Benchmark Relations

- [[../wiki/ColorBench_ Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks.md]] complements [[../wiki/MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation.md]]: 前者暴露复杂长程移动任务，后者提供层级反思和主动探索方法。
- [[../wiki/HammerBench_ Fine-Grained Function-Calling Evaluation in Real Mobile Device Scenarios.md]] complements [[../wiki/Hammer_ Robust Function-Calling for On-Device Language Models via Function Masking.md]]: 前者评测，后者建模。
- [[../wiki/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]] complements [[../wiki/Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents.md]]: 前者评测在线偏好获取和主动性，后者从演示中学习隐式意图。
- [[../wiki/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]] complements [[../wiki/Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs.md]]: 前者强调行动依赖，后者强调超长对话。
- [[../wiki/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]] complements [[../wiki/ColorBench_ Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks.md]]: 前者诊断复杂界面单步动作，后者构造长程多路径移动任务。
- [[../wiki/MAESTRO_ Adapting GUIs and Guiding Navigation with User Preferences in Conversational Agents with GUIs.md]] complements [[../wiki/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]]: 前者是偏好驱动 CAG 机制，后者是个性化 mobile agent 在线评测。

## Potential Tensions

- [[../wiki/Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs.md]] vs [[../wiki/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]]: 长上下文对话记忆和多会话行动记忆评测的成功标准不同。
- [[../wiki/MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation.md]] vs [[../wiki/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]]: 前者解决执行鲁棒性，后者指出个人助手瓶颈在偏好获取和主动性校准。
- [[../wiki/Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives.md]] vs naive self-reflection methods: Self-Contrast 明确质疑直接自评的稳定性。
- [[../wiki/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]] vs [[../wiki/Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives.md]]: 前者用多数答案聚合，适合固定答案任务；后者把分歧转成检查清单，更适合不易投票的开放任务。
- [[../wiki/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]] vs agent benchmark pages: Claude 3 model card 是底层模型能力和风险披露，不能直接替代 GUI agent、memory agent 或 function-calling 系统评测。

## Weak or Pending Relations

- [[../wiki/Agent-Dice_ Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning.md]] may relate to [[../wiki/MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems.md]] through continual learning, but一个是参数融合，另一个是系统/反馈 benchmark，需补读全文再细化。
- [[../wiki/LLM-based Multi-Agent Systems_ Techniques and Business Perspectives.md]] may relate to [[../wiki/Agent Memory.md]] through experience management protocol, but当前仅根据 source-note 和摘要级理解标注。
- [[../wiki/Frontier Model Evaluation.md]] may relate to [[../wiki/Long-Horizon Agent Evaluation.md]] through benchmark methodology, but一个评底层模型，一个评 agent 系统行为，需后续做 taxonomy 对齐。
