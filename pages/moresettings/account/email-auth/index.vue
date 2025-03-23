<template>
  <div class="auth-email-address">
    <block-nav-back
      text="Email Address Authorization"
      to="/moresettings/account"
    />
    <input-oracle type="email" placeholder="E-mail adress" />
    <button-oracle text="CONFIRM EMAIL" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AuthEmailAddress extends Vue {
  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.auth-email-address {
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
  }
  button {
    height: 48px;
    span {
      font-size: 16px;
    }
  }
}
</style>
