<template>
  <div class="change-password">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/privacy-security"
        text="Change Password"
      />
      <form
        action="#"
        class="change-password__form"
        @submit.prevent="confirmParol"
      >
        <div class="input-group">
          <input-oracle
            type="password"
            placeholder="Current password"
            :error="!!errors.currentPassword"
            :error-message="errors.currentPassword"
            @changed="currentPasswordUpdate"
          />
          <input-oracle
            type="password"
            placeholder="New password"
            :deactivated="isNewPasswordDeactivated"
            :error="!!errors.newPassword"
            :error-message="errors.newPassword"
            @changed="newPasswordUpdate"
          />
          <input-oracle
            type="password"
            placeholder="Confirm new password"
            :deactivated="isConfirmPasswordDeactivated"
            :error="!!errors.confirmPassword"
            :error-message="errors.confirmPassword"
            @changed="confirmPasswordUpdate"
          />
        </div>
        <div class="change-password__bottom">
          <ul class="change-password__rules">
            <li
              v-for="rule of rules"
              :key="rule.key"
              class="rule-item"
              @click="updateRule(rule.key)"
            >
              <div
                :for="rule.key"
                class="rule-item__label"
                :class="{ active: rule.enabled }"
              >
                <input
                  :id="rule.key"
                  type="checkbox"
                  :checked="rule.enabled"
                  style="display: none"
                />
                <span class="rule-icon"></span>
                {{ rule.text }}
              </div>
            </li>
            <!-- <li class="rule-item">
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
            </li> -->
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class ChangePasswordPage extends Vue {
  submitAttempted = false
  currentPassword = ''
  newPassword = ''
  confirmPassword = ''

  rules = [
    { key: 'length', text: '8 or more characters', enabled: false },
    { key: 'uppercase', text: 'At least one uppercase letter', enabled: false },
    { key: 'digit', text: 'At least one digit', enabled: false },
    { key: 'symbol', text: 'At least one symbol', enabled: false },
  ]

  passwordValid = {
    length: false,
    uppercase: false,
    digit: false,
    symbol: false,
  }

  errors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  currentPasswordUpdate(val: string) {
    this.currentPassword = val
  }

  newPasswordUpdate(val: string) {
    this.newPassword = val
  }

  confirmPasswordUpdate(val: string) {
    this.confirmPassword = val
  }

  get isNewPasswordDeactivated(): boolean {
    return this.currentPassword.trim() === ''
  }

  get isConfirmPasswordDeactivated(): boolean {
    return this.newPassword.trim() === ''
  }

  confirmParol(event: Event) {
    event.preventDefault()
    const isValid = this.validateForm()

    if (isValid) {
      console.log('Form valid – sending data...')
    }
  }

  validateForm(): boolean {
    this.submitAttempted = true
    this.errors.newPassword = ''
    this.errors.confirmPassword = ''
    this.errors.currentPassword = ''

    let valid = true

    // ✅ Bo‘sh inputlar uchun tekshiruv
    if (!this.currentPassword) {
      this.errors.currentPassword = 'Current password is required.'
      valid = false
    }

    if (!this.newPassword) {
      this.errors.newPassword = 'New password is required.'
      valid = false
    }

    if (!this.confirmPassword) {
      this.errors.confirmPassword = 'Please confirm your password.'
      valid = false
    }

    // 🔒 Faqat to‘ldirilgan bo‘lsa — validatsiya qo‘llanadi
    if (this.newPassword) {
      const pw = this.newPassword

      this.rules.forEach((rule) => {
        if (!rule.enabled) return

        switch (rule.key) {
          case 'length':
            this.passwordValid.length = pw.length >= 8
            if (!this.passwordValid.length) {
              this.errors.newPassword ||=
                'Password must be at least 8 characters.'
              valid = false
            }
            break
          case 'uppercase':
            this.passwordValid.uppercase = /[A-Z]/.test(pw)
            if (!this.passwordValid.uppercase) {
              this.errors.newPassword ||=
                'Password must contain an uppercase letter.'
              valid = false
            }
            break
          case 'digit':
            this.passwordValid.digit = /\d/.test(pw)
            if (!this.passwordValid.digit) {
              this.errors.newPassword ||= 'Password must contain a digit.'
              valid = false
            }
            break
          case 'symbol':
            this.passwordValid.symbol = /[^a-zA-Z0-9]/.test(pw)
            if (!this.passwordValid.symbol) {
              this.errors.newPassword ||= 'Password must contain a symbol.'
              valid = false
            }
            break
        }
      })

      // ✅ Confirm password faqat bo‘sh emas bo‘lsa tekshiriladi
      if (this.confirmPassword && this.confirmPassword !== this.newPassword) {
        this.errors.confirmPassword = 'Passwords do not match.'
        valid = false
      }
    }

    return valid
  }

  updateRule(key: string) {
    const rule = this.rules.find((r) => r.key === key)
    if (rule) {
      rule.enabled = !rule.enabled
    }
    if (this.submitAttempted) {
      this.validateForm()
    }
  }

  @Watch('currentPassword')
  @Watch('newPassword')
  @Watch('confirmPassword')
  onInputChanged() {
    if (this.submitAttempted) {
      this.validateForm()
    }
  }
}
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
    color: #fff;
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .input {
        .error-text {
          margin-top: -5px;
          position: static;
          text-align: left;
        }
      }
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
        &.active {
          .rule-icon {
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
