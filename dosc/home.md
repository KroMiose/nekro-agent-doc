<div align="center">
  <a href="https://v2.nonebot.dev/store"><img src="./images/home/NA_logo.png" width="1024" alt="NoneBotPluginLogo"></a><br>
  <p><img src="./images/home/NoneBotPlugin.svg" width="240" alt="NoneBotPluginText"></p>
</div>
<div align="center">🎉新一代 AI 代理框架，安全、高效、优雅的智能交互体验🎉<br/>
  🎉 <a href="https://github.com/KroMiose/nonebot_plugin_naturel_gpt">源自 Naturel GPT</a> 的 Agent 升级续作 🌈<br/>
  🧬 <a href="https://docs.google.com/spreadsheets/d/1JQNmVH-vlDn2uEPwkjv3iN-zn0PHpQ7RGbgA5T3fxOA/edit?usp=sharing">预设收集共享表(欢迎分享各种自定义人设)</a> 🧬 <br/>
  🎆 如果喜欢请点个⭐吧！您的支持就是我持续更新的动力 🎉<br/>
  💬 技术交流/答疑/讨论 -> ：<a href="https://jq.qq.com/?_wv=1027&k=71t9iCT7">加入插件交流群: 636925153</a> 🗨️ <br/>
  <img src="https://img.shields.io/badge/python-3.9+-6a9.svg" alt="python">
  <a href="https://pypi.python.org/pypi/nekro-agent" target="_blank">
    <img src="https://img.shields.io/pypi/v/nekro-agent.svg" alt="pypi">
  </a>
  <a href="https://hub.docker.com/u/kromiose" target="_blank">
    <img alt="Docker Pulls" src="https://img.shields.io/docker/pulls/kromiose/nekro-agent?color=%20%23EA5252">
  </a>
  <a href="https://jq.qq.com/?_wv=1027&k=71t9iCT7" target="_blank">
    <img src="https://img.shields.io/badge/加入交流群-636925153-c42.svg" alt="python">
  </a>
  <br/>
  📢 <a href="https://api.nekro.top">Nekro 官方合作中转站</a> 现已上线，参与 Nekro 生态开发者可获得本站专属折扣和额度补贴！ 📢 <br/>
  🌟 可洛喵 & Nekro Agent 插件形象征集中，欢迎加入交流群分享你的创意！🌟<br/>
</div>

## ⚠ !安全警告!

! 本项目运行时允许 AI 在独立 Docker 容器环境中执行任意代码，存在一定的安全风险，包括但不限于:

1. IP 地址泄漏
2. 容器逃逸
3. 其它未知风险

! 请知悉并自行承担风险，作者不对使用本项目造成的任何损失负责 !

## ⚙️ 效果演示

> `[Debug]` 前缀的消息为调试信息，默认关闭输出

![demo](./images/home/demo_py_code.png)

## 💡 功能列表

::: info 已实现功能
- ✅ 群聊/私聊 场景的上下文智能聊天
- ✅ 自定义人设
- ✅ 容器化沙盒执行环境
- ✅ 图片资源交互 (支持 Bot 发送&接收&处理 图片资源)
- ✅ 高度可定制的扩展开发接口 (示例扩展: [群聊禁言]更多扩展正在持续开发中...)
- ✅ 基于 `docker-compose` 的容器编排一键部署支持 | 一键化小白无障碍部署脚本
- ✅ 接入 Stable Diffusion 实现 AI 绘图能力
- ✅ 更多文件资源交互 (文件/视频/音频等，可直接通过群文件/私聊 发送&接收&处理 任意文件资源)
- ✅ 配置热更新与指令控制支持
- ✅ 原生多模态理解支持 (支持通用图片理解能力)
- ✅ 可视化应用管理控制面板 (WebUI 支持)
- ✅ 思维链 (CoT) 能力支持 (需要手动开启，推荐未原生支持 CoT 的模型搭配使用)
- ✅ 定时器自触发扩展与节日祝福 (允许 AI 在一定条件下唤醒自身回复)
- ✅ 更多事件通知理解上下文理解
:::

::: warning 开发计划
- 完善第三方扩展能力及 AI 生成扩展
- 基于 LLM 的自动上下文衔接触发器
:::
