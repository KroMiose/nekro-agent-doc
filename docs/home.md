<div align="center">
  <a href="https://v2.nonebot.dev/store"><img src="./images/home/NA_logo.png" width="1024" alt="NoneBotPluginLogo"></a><br>
  <p><img src="./images/home/NoneBotPlugin.svg" width="240" alt="NoneBotPluginText"></p>
</div>

# Nekro Agent

新一代 「AI Agent」

安全、高效、优雅的智能交互体验

这里是 Nekro Agent 各系统模块的简要介绍

## Nekro Plugin

**Nekro Plugin 系统**为 Nekro Agent 提供了灵活且高可用的插件扩展能力，支持多种交互与功能定制，全面提升智能代理的扩展性与可塑性。

支持能力一览：

| 功能类型 | 支持情况 |
|----------|----------|
| 提示词注入 | ✅ 支持 |
| Webhook 接入点 | ✅ 支持 |
| 插件自定义配置 | ✅ 支持 |
| 多模态数据处理与返回 | ✅ 支持 |
| 独立数据库访问与管理 | ✅ 支持 |
| 主动式 LLM 响应触发 | ✅ 支持 |
| 上下文状态读取与管理 | ✅ 支持 |


## Nekro Sandbox

**Nekro Sandbox** 是 Nekro Agent 的安全计算核心模块，提供受限隔离环境以支持 LLM 的代码执行需求。基于 Docker 虚拟化技术构建，具备高性能、高隔离性和高可靠性。

- 安全性保障：无容器逃逸案例记录  
- 性能优化：专为低延迟、高吞吐任务设计  
- 执行环境灵活：支持多语言、动态资源分配


## Nekro Groups & Privates

**Nekro Groups & Privates** 是 Nekro Agent 的智能交互层，构建在 NoneBot2 框架之上，支持群组与私聊两种场景下的人机互动，提供稳定、流畅且高度可拓展的用户体验。

- 基于事件驱动的交互架构  
- 支持多平台接入与扩展  
- 高并发场景下稳定响应  



## Nekro AI

**Nekro AI** 是 Nekro Agent 的云端服务平台，作为整个生态系统的服务中枢，提供插件与人设的统一管理与分发能力。该系统支持动态扩展、版本管理、权限控制等功能，帮助用户与开发者更高效地构建和部署智能代理功能。

- **插件商店**：集中化管理各类功能扩展插件，支持一键安装、升级与配置，便于开发者发布和共享能力模块。  
- **人设商店**：提供多样化的角色人格配置，支持导入导出、权限限制和个性化定制，满足多场景下的智能体人格构建需求。

Nekro Service 致力于打造一个开放、协同、高可用的服务生态，助力 Nekro Agent 实现真正的模块化智能进化。