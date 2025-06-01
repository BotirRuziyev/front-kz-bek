<template>
  <div class="add-email__account">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/privacy-security"
        text="Connect Email Address"
      />
      <form v-if="step === 2" action="#" class="add-email__account-pin-form">
        <h2 class="add-email__account-title">Add email</h2>
        <p class="add-email__account-description">
          We’ve sent a confirmation OTP code to <br />
          your email: youremail@gmail.com.
        </p>
        <div class="input-group">
          <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
        </div>
        <div class="form-button">
          <p class="resend-info">
            Didn't receive the code?
            <span class="resend-timer">Resend in 30s</span>
          </p>
          <new-oracle-button
            v-if="isOpenCode"
            to="/moresettings/privacy-security"
            text="Continue"
            color="yellow"
            type="submit"
          />
        </div>
      </form>
      <form
        v-if="step === 1"
        action="#"
        class="add-email__account-form"
        @submit.prevent="enterPincode"
      >
        <input-oracle
          type="email"
          placeholder="Your email"
          @changed="onChanged"
        />
        <div class="form-button">
          <new-oracle-button
            text="Continue"
            :color="isValidEmail ? 'yellow' : 'black'"
            type="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class AddEmailPage extends Vue {
  step: number = 1
  isOpenCode = false
  email = ''

  enterPincode(event: Event) {
    event.preventDefault()
    if (!this.isValidEmail) {
      return
    }
    this.step = 2
  }

  openPinCode(pin: string[]) {
    this.isOpenCode = pin.every((val) => val.trim() !== '')
  }

  onChanged(email: string) {
    this.email = email
  }

  get isValidEmail(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(this.email)
  }
}
</script>

<style lang="scss">
.add-email__account {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  .block-nav-back {
    margin-bottom: 0;
  }
  &-title {
    margin-bottom: 8px;
    font-family: 'Hector', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }
  &-description {
    margin-bottom: 48px;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }
  &-pin-form {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    padding-top: 55px;
    .input-group {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
    }
    .input-eye {
      display: none;
    }
  }
  &-form {
    padding-top: 24px;
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .form-button {
    display: flex;
    flex-direction: column;
    gap: 32px;
    .resend-info {
      padding: 13px 0;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #fff;
      .resend-timer {
        color: #b2aaf9;
      }
    }
    .new-oracle-button {
      line-height: 22px;
      padding: 9.5px;
      border: 2px solid #2b2741;
      border-radius: 14px;
      box-sizing: border-box;
      &.black {
        background: #13121b;
        color: #67639a;
        &:hover {
          background: #13121b;
          box-shadow: none;
        }
      }
      &.yellow {
        border-color: #f64e2a;
      }
    }
  }
}
</style>
