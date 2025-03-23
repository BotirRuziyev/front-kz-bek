<template>
  <div class="change-email-address">
    <block-nav-back text="CHANGE Email Address" to="/moresettings/account" />
    <input-oracle
      type="email"
      placeholder="Enter your new email address"
      v="user@gmail.com"
      :edit="true"
    />
    <button-oracle text="CONFIRM EMAIL" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ChangeEmailAddress extends Vue {
  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.change-email-address {
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
