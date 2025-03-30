<template>
  <div class="create-check-step">
    <block-nav-back text="CHECK CREATION" @prev="prevStep" />
    <div class="create-check__content">
      <input-oracle
        label="Available 9.15 BTC"
        type="number"
        placeholder="Insert amount of this check"
        :money-send="true"
        :close="true"
        @changed="convertedUSDT"
      />
      <div v-if="convert != 0" class="currency-usd">
        ≈
        <span class="amount-in-usd"> $ {{ convert }} </span>
      </div>
      <button-oracle text="PROCESS" color="orange" @click="$emit('nextStep')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class StepOne extends Vue {
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
.create-check-step {
  .input {
    margin-bottom: 25px;
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
  .currency-usd {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;
    font-family: var(--font5);
    font-weight: 400;
    font-size: 20px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
    .amount-in-usd {
      display: block;
      border-radius: 6px;
      padding: 16px 12px;
      background: #1e1d26;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      text-transform: uppercase;
      color: #1b961f;
    }
  }
}
</style>
