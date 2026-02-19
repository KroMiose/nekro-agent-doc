---
title: Introduction
description: Introduction to Nekro Agent plugin development guide, understanding what plugins are, what they can do, and the system architecture.
---

# Introduction

Welcome to the world of Nekro Agent plugin development! This guide will lead you from zero to learning how to create powerful and creative plugins for Nekro Agent.

## What are Nekro Agent Plugins?

Nekro Agent plugins are a way to extend the core functionality of Nekro Agent. Through plugins, developers can add new tools, information sources, interaction logic for the Agent, and even integrate with other services and systems. Plugins enable Nekro Agent to adapt to a wider range of application scenarios and meet more personalized needs.

Each plugin is an independent Python module that interacts with the core system through the API provided by Nekro Agent.

## What can plugins do?

Nekro Agent plugins can implement almost any task you want the Agent to complete, for example:

*   **Enhance AI Capabilities**:
    *   Provide professional domain knowledge base queries.
    *   Execute complex mathematical calculations or data analysis.
    *   Integrate third-party APIs (such as weather queries, news aggregation, translation services, etc.).
*   **Execute Specific Actions**:
    *   Send messages, emails, or notifications.
    *   Manage scheduled tasks and reminders.
    *   Control smart home devices.
*   **Interact with External Systems**:
    *   Create powerful Web API access points, supporting complete RESTful design.
    *   Synchronize data with other applications or services.
    *   Handle file transfers and multimedia content interactions.
*   **Personalize User Experience**:
    *   Provide customized content based on user preferences.
    *   Implement unique human-computer interaction methods.
    *   Use vector databases to provide intelligent semantic search functionality.

The types of plugins are diverse, from simple tool calls to complex business logic processing. You can fully unleash your imagination.

## Plugin System Architecture Overview

The Nekro Agent plugin system is designed based on modular and event-driven architecture:

1.  **Plugin Registration**: Each plugin is defined and registered through the `NekroPlugin` class, declaring its metadata and functionality.
2.  **Sandbox Execution and RPC**: AI-generated instructions (usually Python code snippets) are executed in an isolated sandbox environment. When these instructions need to call functions provided by plugins, they invoke plugin methods running in the main service process through RPC (Remote Procedure Call) mechanism. The execution results of plugin methods are returned to the sandbox for subsequent AI processing.
3.  **API Interaction**: Plugins interact with core services (such as message sending, data storage, context management, etc.) through the rich APIs provided by Nekro Agent.
4.  **Event-Driven**: Plugins can listen to and respond to various events in the system, such as message reception, session reset, etc.
5.  **Configuration and Storage**: Plugins can define their own configuration items for easy user management and have independent storage space to persist data.
6.  **Advanced Features**:
    *   **Dynamic Routing**: Create powerful Web API endpoints based on FastAPI, supporting complete RESTful functionality.
    *   **File System**: Implement efficient file transfer between plugins and AI sandbox through `AgentCtx.fs`.
    *   **Vector Database**: Integrate Qdrant vector database to provide semantic search and intelligent retrieval capabilities for plugins.
    *   **Context Management**: Uniformly access chat information, message services, configuration, and adapter functions through `AgentCtx`.
    *   **Async Tasks**: Execute long-running background tasks with progress tracking, cancellation, and terminal callbacks without blocking main conversation.

This design ensures the flexibility and security of plugin operation while providing developers with powerful extension capabilities.

## Prerequisites for Reading This Guide

To better understand and learn this guide, it is recommended that you have the following foundation:

*   **Python Programming Basics**: Familiarity with Python syntax, asynchronous programming (`async/await`), and object-oriented programming.
*   **Understanding of API Concepts**: Understanding what APIs are and how to use them.
*   **Basic Nekro Agent Usage**: Some understanding of the basic functions and operations of Nekro Agent.

If you're ready, let's begin the exploration journey of plugin development!