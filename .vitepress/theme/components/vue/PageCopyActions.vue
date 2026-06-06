<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

type LocaleMessages = {
  copyMarkdown: string
  copied: string
  openLlms: string
  openMenu: string
}

const messages: Record<string, LocaleMessages> = {
  'zh-CN': {
    copyMarkdown: '复制当前页 Markdown',
    copied: '已复制',
    openLlms: '打开 llms.txt',
    openMenu: '复制选项',
  },
  'en-US': {
    copyMarkdown: 'Copy page as Markdown',
    copied: 'Copied',
    openLlms: 'Open llms.txt',
    openMenu: 'Copy options',
  },
  'ja-JP': {
    copyMarkdown: 'Markdown としてコピー',
    copied: 'コピー済み',
    openLlms: 'llms.txt を開く',
    openMenu: 'コピーオプション',
  },
}

const { lang } = useData()
const t = computed(() => messages[lang.value] || messages['zh-CN'])

const menuId = 'page-copy-menu'
const actionRoot = ref<HTMLElement | null>(null)
const copiedTarget = ref<'page' | null>(null)
const isCopying = ref(false)
const isMenuOpen = ref(false)
let copiedResetTimer: ReturnType<typeof setTimeout> | undefined

function resolveCurrentMarkdownPageURL(): string {
  const { origin, pathname } = window.location
  let cleanPathname = pathname.replace(/\/+$/u, '')

  if (cleanPathname.endsWith('.html')) {
    cleanPathname = cleanPathname.slice(0, -'.html'.length)
  }

  return `${origin}${cleanPathname || '/index'}.md`
}

function resolveLlmsURL(): string {
  return new URL(withBase('/llms.txt'), window.location.origin).toString()
}

function showCopiedState(target: 'page'): void {
  copiedTarget.value = target

  if (copiedResetTimer) {
    clearTimeout(copiedResetTimer)
  }

  copiedResetTimer = setTimeout(() => {
    copiedTarget.value = null
    copiedResetTimer = undefined
  }, 2000)
}

async function copyTextFromURL(url: string, target: 'page'): Promise<void> {
  if (isCopying.value) return
  isCopying.value = true
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }

    await navigator.clipboard.writeText(await response.text())
    showCopiedState(target)
  } catch (error) {
    console.error('Failed to copy documentation text:', error)
  } finally {
    isCopying.value = false
  }
}

async function copyMarkdown(): Promise<void> {
  await copyTextFromURL(resolveCurrentMarkdownPageURL(), 'page')
}

async function copyFromMenu(): Promise<void> {
  await copyMarkdown()
  isMenuOpen.value = false
}

function openLlms(): void {
  window.open(resolveLlmsURL(), '_blank', 'noopener')
  isMenuOpen.value = false
}

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}

function handleDocumentClick(event: MouseEvent): void {
  if (actionRoot.value && !actionRoot.value.contains(event.target as Node)) {
    closeMenu()
  }
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  if (copiedResetTimer) {
    clearTimeout(copiedResetTimer)
  }

  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div ref="actionRoot" class="page-copy-actions">
    <button
      class="page-copy-button page-copy-main"
      type="button"
      @click="copyMarkdown"
      :aria-label="copiedTarget === 'page' ? t.copied : t.copyMarkdown"
      :title="copiedTarget === 'page' ? t.copied : t.copyMarkdown"
    >
      <svg v-if="copiedTarget === 'page'" class="page-copy-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else class="page-copy-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

    <button
      class="page-copy-button page-copy-toggle"
      type="button"
      :aria-controls="menuId"
      :aria-expanded="isMenuOpen"
      :aria-label="t.openMenu"
      :title="t.openMenu"
      @click.stop="toggleMenu"
    >
      <svg class="page-copy-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true" :class="{ open: isMenuOpen }">
        <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="isMenuOpen" :id="menuId" class="page-copy-menu" role="menu">
      <button class="page-copy-menu-item" type="button" role="menuitem" @click="copyFromMenu">
        <svg class="page-copy-menu-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path v-if="copiedTarget === 'page'" d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <template v-else>
            <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </template>
        </svg>
        <span>{{ copiedTarget === 'page' ? t.copied : t.copyMarkdown }}</span>
      </button>

      <button class="page-copy-menu-item" type="button" role="menuitem" @click="openLlms">
        <svg class="page-copy-menu-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 3h6v6M10 14 21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ t.openLlms }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-copy-actions {
  display: inline-flex;
  position: absolute;
  top: 2px;
  right: -28px;
  align-items: center;
  gap: 2px;
  z-index: 2;
}

.page-copy-button {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  opacity: 0.76;
  transition: color 0.2s, background-color 0.2s, opacity 0.2s;
}

.page-copy-toggle {
  width: 24px;
}

.page-copy-button:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  opacity: 1;
}

.page-copy-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.page-copy-icon {
  width: 17px;
  height: 17px;
}

.page-copy-chevron {
  width: 15px;
  height: 15px;
  transition: transform 0.2s;
}

.page-copy-chevron.open {
  transform: rotate(180deg);
}

.page-copy-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: max-content;
  min-width: 168px;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.page-copy-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 32px;
  padding: 6px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  white-space: nowrap;
  transition: color 0.2s, background-color 0.2s;
}

.page-copy-menu-item:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.page-copy-menu-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.page-copy-menu-icon {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  color: var(--vp-c-text-2);
}

.page-copy-menu-item:hover .page-copy-menu-icon {
  color: var(--vp-c-brand-1);
}
</style>
