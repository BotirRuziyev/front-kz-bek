<template>
  <div class="change-link-address">
    <block-nav-back text="CHANGE LINKED ACCOUNT" to="/moresettings/account" />
    <input-oracle
      type="text"
      placeholder="Enter your new address"
      v="https://t.me/user"
      :edit="true"
      label="Be careful, this will give access to your account"
    />
    <button-oracle text="CONFIRM TELEGRAM" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ChangeLinkAddress extends Vue {
  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.change-link-address {
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
