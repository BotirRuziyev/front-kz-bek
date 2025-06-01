<template>
  <div class="telegram-update">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/privacy-security/telegram-auth"
        text="Update Linked Telegram"
      />
      <form action="#" class="telegram-update-pin-form">
        <h2 class="telegram-update-title">Verify Your Account via Telegram</h2>
        <p class="telegram-update-description">
          Enter the code sent by our bot in Telegram <br />
          to complete Telegram account linking.
        </p>
        <div class="input-group">
          <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
        </div>
        <div class="form-button">
          <new-oracle-button
            to="/moresettings/privacy-security"
            text="Go to Oracle OTP Bot"
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
export default class TelegramAuthUpdatePage extends Vue {
  isOpenCode = false

  enterPincode(event: Event) {
    event.preventDefault()
  }

  openPinCode(pin: string[]) {
    this.isOpenCode = pin.every((val) => val.trim() !== '')
  }
}
</script>

<style lang="scss">
.telegram-update {
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
      padding: 11px;
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
