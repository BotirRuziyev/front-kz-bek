<template>
  <div class="update-pin__code">
    <div class="main-container">
      <block-nav-back to="/moresettings/privacy-security" text="PIN Update" />
      <form class="update-pin__code-form">
        <div class="input-group">
          <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
        </div>
        <div class="form-button">
          <new-oracle-button
            text="Set up"
            :color="isOpenCode ? 'yellow' : 'black'"
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
export default class UpdatePinCode extends Vue {
  isOpenCode = false

  openPinCode(pin: string[]) {
    this.isOpenCode = pin.every((val) => val.trim() !== '')
  }
}
</script>

<style lang="scss">
.update-pin__code {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  .block-nav-back {
    margin-bottom: 0;
  }
  &-form {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    .input-group {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .input-eye {
      display: none;
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
}
</style>
