<template>
  <div class="create-check-step step-two">
    <block-nav-back text="CHECK CREATION" @prev="prevStep" />
    <div class="create-check__content">
      <input-oracle
        label="≈ 5 activations available with your balance"
        type="number"
        placeholder="Insert amount of activatios of this check"
        @changed="convertedUSDT"
      />
      <button-oracle text="PROCESS" color="orange" @click="$emit('nextStep')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class StepTwo extends Vue {
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
.step-two {
  .input {
    margin-bottom: 40px;
    label {
      order: 2;
      margin-bottom: 0;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
    }
    &-group {
      order: 1;
      margin-bottom: 10px;
    }
  }
}
</style>
