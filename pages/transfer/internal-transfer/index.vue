<template>
  <div class="internal-transfer">
    <div class="main-container">
      <block-nav-back
        to=""
        text="Internal Transfer"
        @prev="goToStep(step - 1)"
      />
      <div v-if="step === 1" class="internal-transfer__step">
        <InternalTransferStepOne @nextStep="goToStep(step + 1)" />
      </div>
      <div v-if="step === 2" class="internal-transfer__step">
        <InternalTransferStepTwo @nextStep="goToStep(step + 1)" />
      </div>
      <div v-if="step === 3" class="internal-transfer__step">
        <InternalTransferStepThree @nextStep="goToStep(step + 1)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InternalTransferStepOne from '~/components/transfer/internal-transfer/step-one.vue'
import InternalTransferStepTwo from '~/components/transfer/internal-transfer/step-two.vue'
import InternalTransferStepThree from '~/components/transfer/internal-transfer/step-three.vue'

@Component({
  components: {
    InternalTransferStepOne,
    InternalTransferStepTwo,
    InternalTransferStepThree,
  },
})
export default class InternalTransfer extends Vue {
  step = 1

  mounted() {
    this.updateStepFromRoute()
  }

  updateStepFromRoute() {
    const stepParam = this.$route.query.step
    if (stepParam && [1, 2, 3, 4].includes(Number(stepParam))) {
      this.step = Number(stepParam)
    }
  }

  goToStep(newStep: number) {
    if (newStep >= 1 && newStep <= 4) {
      this.step = newStep
      this.$router.push({ query: { step: String(newStep) } })
    }
  }
}
</script>

<style lang="scss">
.internal-transfer {
  background: #000;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 24px;
  .input {
    .input-search {
      path {
        stroke: #7a74ba;
      }
    }
    input {
      height: 44px;
      border-radius: 12px;
      padding: 13px 14px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
  }
  .block-nav-back {
    text-align: center;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #fff;
    text-transform: capitalize;
    .back-button {
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    span {
      display: block;
      width: calc(100% - 26px);
    }
  }
  .internal-transfer__step {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 86px);
    .selected-user {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      padding-left: 6px;
      .user-img {
        width: 32px;
        height: 32px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .user-name {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #fff;
      }
    }
    .selected-user__info {
      width: calc(100% + 20px);
      margin-left: -10px;
      margin-bottom: 24px;
      .info-list {
        display: flex;
        gap: 5px;
        padding-left: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-right: 10px;
        &::-webkit-scrollbar {
          height: 0;
        }
        .list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #181720;
          border-radius: 12px;
          padding: 6px 12px 6px 8px;

          .profile-title {
            white-space: nowrap;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 12px;
            line-height: 135%;
            color: #fff;
          }
        }
      }
    }
  }
  .button_oracle {
    height: 44px;
    border-radius: 14px;
    padding: 11px 16px;
    span {
      text-transform: capitalize;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
    }
  }
}
</style>
