<template>
  <div class="new-password">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/privacy-security"
        text="Create a New Password"
      />
      <form action="#" class="new-password__form">
        <div class="new-password__head">
          <input-oracle type="password" placeholder="Enter your password" />
          <ul class="new-password__rules">
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
          <input-oracle type="password" placeholder="Confirm password" />
        </div>
        <div class="new-password__button">
          <new-oracle-button text="Confirm" color="yellow" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NewPasswordPage extends Vue {}
</script>

<style lang="scss">
.new-password {
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
  }
  &__head {
    flex: 1 1 100%;
  }
  &__rules {
    margin: 8px 0 38px;
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
