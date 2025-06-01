<template>
  <div class="password-reset">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/privacy-security"
        text="Password Reset"
      />
      <form
        action="#"
        class="password-reset-pin-form"
        @submit.prevent="enterPincode"
      >
        <h2 class="password-reset-title">Reset Your Password</h2>
        <p class="password-reset-description">
          We’ve sent a reset code to your <br />
          email: youremail@gmail.com. Enter the <br />
          code below to create a new password
        </p>
        <div class="input-group">
          <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
        </div>
        <div class="form-button">
          <new-oracle-button
            v-if="isOpenCode"
            text="Continue"
            color="yellow"
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
export default class ResetPasswordPage extends Vue {
  isOpenCode = false
  email = ''

  enterPincode(event: Event) {
    event.preventDefault()
  }

  openPinCode(pin: string[]) {
    this.isOpenCode = pin.every((val) => val.trim() !== '')
  }
}
</script>

<style lang="scss">
.password-reset {
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
    flex: 1 1 calc(100% - 24px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 120px;
    .input-eye {
      display: none;
    }
    .input-group {
      flex: 1 1 100%;
    }
  }
  .form-button {
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
