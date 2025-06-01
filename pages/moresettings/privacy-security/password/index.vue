<template>
  <div class="change-password">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/privacy-security"
        text="Change Password"
      />
      <form action="#" class="change-password__form">
        <div class="input-group">
          <input-oracle type="password" placeholder="Current password" />
          <input-oracle type="password" placeholder="New password" />
          <input-oracle type="password" placeholder="Confirm new password" />
        </div>
        <div class="change-password__bottom">
          <ul class="change-password__rules">
            <li class="rule-item">
              <label for="more-characters" class="rule-item__label">
                <input
                  id="more-characters"
                  type="checkbox"
                  style="display: none"
                />
                <span class="rule-icon"></span>
                8 or more characters
              </label>
            </li>
            <li class="rule-item">
              <label for="uppercase-letter" class="rule-item__label">
                <input
                  id="uppercase-letter"
                  type="checkbox"
                  style="display: none"
                />
                <span class="rule-icon"></span>
                At least one uppercase letter
              </label>
            </li>
            <li class="rule-item">
              <label for="one-digit" class="rule-item__label">
                <input id="one-digit" type="checkbox" style="display: none" />
                <span class="rule-icon"></span>
                At least one digit
              </label>
            </li>
            <li class="rule-item">
              <label for="one-symbol" class="rule-item__label">
                <input id="one-symbol" type="checkbox" style="display: none" />
                <span class="rule-icon"></span>
                At least one symbol
              </label>
            </li>
          </ul>
          <div class="change-password__button">
            <new-oracle-button text="Forgot password?" />
            <new-oracle-button text="Confirm" color="yellow" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ChangePasswordPage extends Vue {}
</script>

<style lang="scss">
.change-password {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  &__form {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  &__rules {
    .rule-item {
      &__label {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 12px;
        line-height: 140%;
        color: #fff;
        input {
          &:checked + .rule-icon {
            border-color: #f64e2a;
            background: #f64e2a url('@/assets/svg/check-icon.svg') no-repeat
              center/12px;
          }
        }
        .rule-icon {
          width: 24px;
          height: 24px;
          min-width: 24px;
          border-radius: 50%;
          border: 1px solid #2b2b2b;
        }
      }
    }
  }
  &__button {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .new-oracle-button {
      line-height: 22px;
      padding: 11px;
    }
  }
}
</style>
