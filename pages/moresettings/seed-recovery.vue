<template>
  <div class="seed-recovery">
    <block-nav-back text="SEED RECOVERY" to="/moresettings" />
    <p class="seed-recovery-description">
      Seed Check verifies that you remember your seed phrase
    </p>
    <ul class="seed-recovery-list">
      <li v-for="item in seedrecovery" :key="item.id" class="list-item">
        <span class="item-id">{{ item.id }}.</span>
        <input-oracle :v="item.text" />
      </li>
    </ul>
    <button-oracle text="verify" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SeedRecoveryPage extends Vue {
  layout() {
    return 'mobile'
  }

  seedrecovery = [
    {
      id: 1,
      text: 'issue',
    },
    {
      id: 2,
      text: 'issue',
    },
    {
      id: 3,
      text: 'issue',
    },
    {
      id: 4,
      text: 'issue',
    },
    {
      id: 5,
      text: 'issue',
    },
    {
      id: 6,
      text: 'issue',
    },
    {
      id: 7,
      text: 'issue',
    },
    {
      id: 8,
      text: 'issue',
    },
    {
      id: 9,
      text: 'issue',
    },
  ]
}
</script>

<style lang="scss">
.seed-recovery {
  &-description {
    margin-bottom: 45px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    color: #fff;
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 11px;
    margin-bottom: 45px;
    .list-item {
      display: flex;
      align-items: center;
      background: #1e1d26;
      border-radius: 6px;
      padding: 14px 8px;
      height: 38px;
      font-family: var(--font3);
      white-space: nowrap;
      font-weight: 700;
      font-size: 14px;
      line-height: 10px;
      color: #fff;
      input {
        height: 100%;
        padding: 0 5px !important;
      }
    }
  }
  button {
    height: 48px;
  }
}
</style>
