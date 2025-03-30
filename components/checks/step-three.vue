<template>
  <div class="create-check-step step-three">
    <block-nav-back text="CHECK CREATION" @prev="prevStep" />
    <div class="create-check__content">
      <div class="step-three__card border-gradient">
        <div class="left-blur"></div>
        <div class="card-in">
          <h2 class="title-big">Check for 0.5 BTC</h2>
          <h3 class="title-small">with 3 activations (1.5 BTC total)</h3>
        </div>
      </div>
      <div class="label">Around $ 50,912/12 per check ($ 152,910. totally)</div>
      <button-oracle
        to="/checks/check-creation/check-details"
        text="CONFIRM"
        color="orange"
      />
      <button-oracle text="CanCel" @click="$emit('prevStep')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class StepThree extends Vue {
  convert = 0

  convertedUSDT(v: number) {
    this.convert = parseFloat((v * 35.51).toFixed(2))
  }

  prevStep() {
    this.$emit('prevStep')
  }
}
</script>

<style lang="scss">
.step-three {
  .block-nav-back {
    padding-bottom: 30px;
  }
  .step-three__card {
    margin-bottom: 12px;
    position: relative;
    &::after {
      content: '';
      width: 85px;
      height: 84px;
      background: url('@/assets/svg/checks/clipboard.svg') no-repeat
        center/contain;
      position: absolute;
      top: 0;
      right: 0;
    }
    .card-in {
      padding: 13px 16px 30px;
      .title-big {
        margin-bottom: 10px;
        line-height: 17px;
        font-family: var(--third-family);
        font-weight: 400;
        font-size: 22px;
        color: #fff;
      }
      .title-small {
        font-family: var(--third-family);
        font-weight: 400;
        font-size: 16px;
        line-height: 13px;
        color: #fff;
      }
    }
  }
  .label {
    margin-bottom: 40px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 12px;
    line-height: 9px;
    color: rgba(255, 255, 255, 0.6);
  }
  .button_oracle {
    margin-bottom: 12px;
    box-shadow: 0 0 10px 2px rgba(165, 14, 14, 0.25);
    &.orange {
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.25);
    }
  }
}
</style>
