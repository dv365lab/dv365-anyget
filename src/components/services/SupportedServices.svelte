<script lang="ts">
  import { t } from "$lib/i18n";

  let expanded = $state(false);

  const services = [
    "YouTube", "Instagram", "TikTok", "Twitter / X",
    "Reddit", "Twitch", "Pinterest", "Vimeo",
    "Bluesky", "Hotmart", "Telegram", "Bilibili",
    "Douyin (抖音)", "Xiaohongshu (小红书)", "Kuaishou (快手)",
    "Youku (优酷)", "Torrent",
  ];

  function toggle() {
    expanded = !expanded;
  }

</script>

<div class="supported-services">
  <button
    class="toggle-btn"
    onclick={toggle}
    aria-expanded={expanded}
    aria-label={expanded ? $t('services.title_hide') : $t('services.title_show')}
  >
    <span class="toggle-label">{$t('services.title')}</span>
    <svg class="toggle-chevron" class:expanded viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>

  {#if expanded}
    <div class="popover">
      <div class="pills">
        {#each services as service}
          <span class="pill">{service}</span>
        {/each}
        <span class="pill">{$t('services.and_more')}</span>
      </div>
      <p class="disclaimer">{$t('services.disclaimer')}</p>
    </div>
  {/if}
</div>

<style>
  .supported-services {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    max-width: 640px;
  }

  .toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 24px;
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-size: var(--text-sm);
    font-weight: 500;
    user-select: none;
    transition: color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out);
  }

  @media (hover: hover) {
    .toggle-btn:hover {
      color: var(--text);
      background: var(--fill-1);
    }
  }

  .toggle-btn:focus-visible {
    outline: var(--focus-ring);
    outline-offset: var(--focus-ring-offset);
  }

  .toggle-label {
    pointer-events: none;
  }

  .toggle-chevron {
    pointer-events: none;
    transition: transform var(--duration-fast) var(--ease-out);
  }

  .toggle-chevron.expanded {
    transform: rotate(180deg);
  }

  .popover {
    width: 100%;
    background: var(--surface-mut);
    box-shadow: inset 0 0 0 var(--hairline) var(--content-border);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    animation: popoverEnter var(--duration-base) var(--ease-out);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    min-width: 0;
    z-index: auto;
  }

  @keyframes popoverEnter {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 var(--space-3);
    background: var(--fill-1);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--text-muted);
    user-select: none;
  }

  .disclaimer {
    font-size: var(--text-xs);
    font-weight: 400;
    color: var(--text-dim);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .popover {
      animation: none;
    }

    .toggle-chevron {
      transition: none;
    }
  }
</style>
