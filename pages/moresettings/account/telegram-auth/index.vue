<template>
  <div class="auth-link-address">
    <block-nav-back text="Telegram Authorization" to="/moresettings/account" />
    <input-oracle
      type="text"
      placeholder="Telegram link"
      label="Be careful, this will give access to your account"
    />
    <button-oracle text="CONFIRM TELEGRAM" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AuthLinkAddress extends Vue {
  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.auth-link-address {
  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
    .label {
      order: 2;
      margin-bottom: 0;
      font-size: 10px;
      line-height: 7px;
    }
    .input-group {
      order: 1;
      margin-bottom: 12px;
    }
  }
  button {
    height: 48px;
    span {
      font-size: 16px;
    }
  }
}
</style>
