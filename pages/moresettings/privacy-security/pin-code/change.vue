<template>
  <div class="change-pin__code">
    <div class="main-container">
      <block-nav-back to="/moresettings/privacy-security" text="PIN Reset" />
      <form class="change-pin__code-form">
        <p class="change-pin__code-description">
          Enter your PIN to remove it or set a new <br />
          one.
        </p>
        <div class="input-group">
          <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
        </div>
        <div v-if="isOpenCode" class="form-button">
          <new-oracle-button text="Remove PIN" />
          <new-oracle-button text="Update PIN" color="yellow" />
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
export default class ChangePinCode extends Vue {
  isOpenCode = false

  openPinCode(pin: string[]) {
    this.isOpenCode = pin.every((val) => val.trim() !== '')
  }
}
</script>

<style lang="scss">
.change-pin__code {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  .block-nav-back {
    margin-bottom: 0;
  }
  &-description {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }
  &-form {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 90px;
    .input-group {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
    }
    .input-eye {
      display: none;
    }
    .form-button {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
}
</style>
