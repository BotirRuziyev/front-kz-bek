<template>
  <div class="create-check-step">
    <block-nav-back text="Check Creation" to="/checks" />
    <div class="create-check__content">
      <div class="token-card">
        <coin-select name="USDT" price="2500 USDT ≈ $2499" />
        <div class="token-stats">
          <input
            id="coinConvert"
            ref="convertInput"
            v-model="coinConvert"
            type="text"
            inputmode="decimal"
            pattern="[0-9]*[.,]?[0-9]*"
            class="form-input"
            placeholder="0.00"
            @input="coinConvertEvent"
            @keypress="allowDecimalNumbers"
            @paste="blockInvalidDecimalPaste"
          />
          <button class="max-btn" @click="maxInput">MAX</button>
        </div>
        <div class="coin-converter__to-usd">
          <h5 class="to-usd__value">$</h5>
          <div class="form-control">
            <input
              v-model="dollor"
              type="text"
              inputmode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              class="form-input"
              @input="dollorEvent"
              @keypress="allowDecimalNumbers"
              @paste="blockInvalidDecimalPaste"
            />
            <div v-if="isFilled" class="input-placeholder">
              <span>0</span>.00
            </div>
          </div>
        </div>
      </div>
      <new-oracle-button
        text="Continue"
        :color="coinConvert != '' ? 'yellow' : 'black'"
        @click="coinConvert != '' ? $emit('nextStep') : ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class StepOne extends Vue {
  coinConvert: string = ''
  dollor: string = ''
  maxValue = '50'
  isFilled: boolean = true

  maxInput() {
    this.coinConvert = this.maxValue
    const inputEl = this.$refs.convertInput as HTMLInputElement
    inputEl?.focus()
  }

  coinConvertEvent() {
    this.coinConvert = this.coinConvert.replace(',', '.')
  }

  allowDecimalNumbers(event: KeyboardEvent): void {
    const key = event.key
    const isNumber = /^\d$/.test(key)
    const isDot = key === '.' || key === ','

    if (!isNumber && !isDot) {
      event.preventDefault()
    }
  }

  blockInvalidDecimalPaste(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text') || ''
    const cleaned = pasted.replace(',', '.')
    if (!/^\d*\.?\d*$/.test(cleaned)) {
      event.preventDefault()
    }
  }

  dollorEvent() {
    this.dollor = this.dollor.replace(',', '.')
    this.isFilled = this.dollor.trim() === ''
  }

  prevStep() {
    this.$emit('prevStep')
  }
}
</script>

<style lang="scss">
.create-check-step {
  height: 100%;
  .create-check__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 69px);
    .token-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #13121b;
      border-radius: 8px;
      padding: 8px 16px 16px 16px;
      .token-stats {
        display: flex;
        align-items: center;
        .form-input {
          width: 100%;
          height: 40px;
          background: transparent;
          border: 0;
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 32px;
          line-height: 125%;
          color: #fff;
          &::placeholder {
            font-family: 'Hector', sans-serif;
            font-weight: 400;
            font-size: 32px;
            line-height: 125%;
            color: #7a74ba;
          }
          &:focus {
            outline: none;
          }
        }
        .max-btn {
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 130%;
          color: #f64e2a;
        }
      }
      .coin-converter__to-usd {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2px;
        .to-usd__value {
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 16px;
          line-height: 120%;
          color: rgba(131, 131, 175, 0.8);
          span {
            font-size: 12px;
          }
        }
        .form-control {
          width: 100%;
          position: relative;
          .form-input {
            width: 100%;
            height: 40px;
            position: relative;
            z-index: 2;
            background: transparent;
            padding: 0 20px 0 0;
            border: none;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 120%;
            color: rgba(131, 131, 175, 0.8);
            &:focus {
              outline: none;
            }
            &::placeholder {
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 16px;
              line-height: 120%;
              color: rgba(131, 131, 175, 0.8);
            }
          }
          .input-placeholder {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 12px;
            line-height: 120%;
            color: rgba(131, 131, 175, 0.8);
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
    .new-oracle-button {
      border: 2px solid #2b2741;
      border-radius: 14px;
      padding: 11px 16px;
      &.black {
        background: #13121b;
        color: #67639a;
        box-shadow: none;
      }
      &.yellow {
        border-color: #f64e2a;
      }
    }
  }
}
</style>
