<template>
  <div class="change-password">
    <block-nav-back text="PASSWORD CHANGE" to="/moresettings/account" />
    <div class="change-password-input__group">
      <input-oracle type="password" placeholder="Сurrent Password" />
      <input-oracle type="password" placeholder="New Password" />
      <input-oracle type="password" placeholder="Confirm New Password" />
    </div>
    <div class="change-password__buttons">
      <button-oracle text="CONFIRM" color="orange" to="/moresettings/account" />
      <button-oracle text="CanCel" to="/moresettings/account" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ChangePasswordPage extends Vue {
  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.change-password {
  .input {
    input {
      height: 56px;
    }
  }
  &-input__group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 35px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    button {
      height: 48px;
      span {
        font-size: 16px;
      }
    }
    .black {
      border-color: #e70303;
    }
  }
}
</style>
