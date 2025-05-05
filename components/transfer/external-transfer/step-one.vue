<template>
  <div class="external-transfer__step-one">
    <input-oracle
      v-if="!addressSelected"
      :scan="true"
      :saved="true"
      :external="true"
      placeholder="Address"
    />
    <div v-else class="address-selected">
      <div class="left-block">
        <div class="coin-img">
          <CoinIcon />
        </div>
        <div class="address-info">
          <h4 class="address-title">Webcum LTC address</h4>
          <h5 class="address-code">92das8d9asdh89dsa8dupaosd2e32</h5>
        </div>
      </div>
      <button class="clear-btn">
        <ClearImg />
      </button>
    </div>
    <div class="form-control">
      <input
        ref="amountInput"
        v-model="amount"
        type="text"
        inputmode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.00"
        class="form-input"
        :class="{ error_input: errorInput }"
        @input="updateAmount"
        @keypress="allowDecimalNumbers"
        @paste="blockInvalidDecimalPaste"
      />
      <span v-if="errorInput" class="error-text">Insufficient funds</span>
    </div>
    <div class="external-transfer_select">
      <h5 class="from-text">From:</h5>
      <coin-select name="USDT" price="2500 USDT" amount="2500" />
    </div>
    <div class="number-pad">
      <button class="number-btn" @click="appendNumber('1')">1</button>
      <button class="number-btn" @click="appendNumber('2')">2</button>
      <button class="number-btn" @click="appendNumber('3')">3</button>
      <button class="number-btn" @click="appendNumber('4')">4</button>
      <button class="number-btn" @click="appendNumber('5')">5</button>
      <button class="number-btn" @click="appendNumber('6')">6</button>
      <button class="number-btn" @click="appendNumber('7')">7</button>
      <button class="number-btn" @click="appendNumber('8')">8</button>
      <button class="number-btn" @click="appendNumber('9')">9</button>
      <button class="action-btn max-btn" @click="setMax()">MAX</button>
      <button class="number-btn" @click="appendNumber('0')">0</button>
      <button
        class="action-btn confirm-btn"
        @mousedown="startDeleting"
        @mouseup="stopDeleting"
        @mouseleave="stopDeleting"
        @touchstart="startDeleting"
        @touchend="stopDeleting"
        @touchcancel="stopDeleting"
      >
        <ClearIcon />
      </button>
    </div>
    <button-oracle text="Transfer" color="orange" @click="$emit('nextStep')" />
    <draggable-modal :is-open="isOpen" @close="isOpen = false">
      <h1 class="modal-title">Saved addresses</h1>
      <ul class="saved-addresses__list">
        <li v-for="item of 6" :key="item" class="list-item">
          <div class="coin-img">
            <CoinIcon />
          </div>
          <div class="address-info">
            <h4 class="address-title">Webcum LTC address</h4>
            <h5 class="address-code">92das8d9asdh89dsa8dupaosd2e32</h5>
          </div>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ClearIcon from '@/assets/svg/input-clear.svg?inline'
// @ts-ignore
import CoinIcon from '@/assets/svg/usdt.svg?inline'
// @ts-ignore
import ClearImg from '@/assets/svg/clear-icon.svg?inline'

@Component({
  components: {
    ClearIcon,
    CoinIcon,
    ClearImg,
  },
})
export default class ExternalTransferStepOne extends Vue {
  isOpen = false
  addressSelected = false
  errorInput = false
  amount: string = ''
  previousAmount: string = ''
  deleteInterval: number | null = null

  mounted() {
    this.checkAmount()
  }

  watchAmount() {
    this.checkAmount()
  }

  allowDecimalNumbers(event: KeyboardEvent): void {
    const key = event.key
    const isNumber = /^\d$/.test(key)
    const isDot = key === '.' || key === ','

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const alreadyHasDot =
      currentValue.includes('.') || currentValue.includes(',')

    if (!isNumber && !(isDot && !alreadyHasDot)) {
      event.preventDefault()
    }
  }

  blockInvalidDecimalPaste(event: ClipboardEvent): void {
    event.preventDefault()
    let pasted = event.clipboardData?.getData('text') || ''

    pasted = pasted.replace(/,/g, '.')

    pasted = pasted.replace(/[^\d.]/g, '')

    const firstDotIndex = pasted.indexOf('.')
    if (firstDotIndex !== -1) {
      const beforeDot = pasted.slice(0, firstDotIndex + 1)
      const afterDot = pasted.slice(firstDotIndex + 1).replace(/\./g, '')
      pasted = beforeDot + afterDot
    }

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const selectionStart = target.selectionStart || 0
    const selectionEnd = target.selectionEnd || 0

    const newValue =
      currentValue.slice(0, selectionStart) +
      pasted +
      currentValue.slice(selectionEnd)

    target.value = newValue

    this.amount = newValue
    this.updateAmount()
  }

  checkAmount(): void {
    const value = Number(this.amount)
    this.errorInput = value > 2999
  }

  appendNumber(num: string): void {
    this.amount += num
    this.updateAmount()
  }

  setMax(): void {
    this.amount = '2999'
    this.updateAmount()
  }

  deleteOnce(): void {
    if (this.amount.length > 0) {
      if (this.amount.endsWith('.') && /^\d+\.$/.test(this.amount)) {
        this.amount = this.amount.slice(0, -1)
      } else {
        this.amount = this.amount.slice(0, -1)
      }
    }
    this.updateAmount()
  }

  startDeleting(): void {
    this.deleteOnce()
    this.deleteInterval = setInterval(() => {
      this.deleteOnce()
    }, 100) as unknown as number
  }

  stopDeleting(): void {
    if (this.deleteInterval) {
      clearInterval(this.deleteInterval)
      this.deleteInterval = null
    }
  }

  get amountAsNumber(): number {
    return Number(this.amount)
  }

  updateAmount() {
    this.amount = this.amount.replace(',', '.')
    this.errorInput =
      (Number(this.amount) < 1 || Number(this.amount) > 2999) &&
      this.amount !== ''
  }
}
</script>

<style lang="scss">
.external-transfer__step-one {
  .input {
    input {
      border-radius: 16px;
      padding: 8px 16px;
      background: #13121b;
      border: 1px solid #13121b;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: #fff;
      &.error_input {
        color: #f64e2a;
      }
      &:focus {
        border-color: #f64e2a;
      }
      &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #7a74ba;
      }
    }
  }
  .address-selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #181720;
    border-radius: 16px;
    padding: 8px 16px;
    .left-block {
      display: flex;
      align-items: center;
      gap: 8px;
      .coin-img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .address-info {
        .address-title {
          margin-bottom: 4px;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
        .address-code {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #7a74ba;
        }
      }
    }
  }
  .form-control {
    padding: 70px 0;
    .form-input {
      width: 100%;
      background: transparent;
      border: 0;
      font-family: 'Hector', sans-serif;
      font-weight: 400;
      font-size: 48px;
      line-height: 125%;
      text-align: center;
      color: #fff;
      &.error_input {
        color: #f64e2a;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        font-family: 'Hector', sans-serif;
        font-weight: 400;
        font-size: 48px;
        line-height: 125%;
        text-align: center;
        color: #7a74ba;
      }
    }
    .error-text {
      display: block;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #f64e2a;
    }
  }
  .external-transfer_select {
    background: #13121b;
    border-radius: 12px;
    padding: 3px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    position: relative;
    z-index: 2;
    .from-text {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 120%;
      color: #67639a;
    }
    .coin-select {
      width: 100%;
      .select-btn {
        border-color: transparent;
        .left-block {
          .coin-info-head {
            gap: 0;
            .coin-name {
              font-weight: 400;
              font-size: 14px;
              line-height: 120%;
            }
            .coin-price {
              font-weight: 500;
              font-size: 12px;
              line-height: 120%;
            }
          }
        }
      }
      .select-menu {
        width: calc(100% + 68px);
        left: -56px;
        border-radius: 0 0 12px 12px;
        padding-top: 10px;
        &.show {
          top: calc(100% - 6px);
        }
      }
    }
  }
  .number-pad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    background: #13121b;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 14px;
    .number-btn,
    .action-btn {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1e1d28;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      font-size: 32px;
      line-height: 135%;
      text-align: center;
      color: #fff;
      transition: 0.3s;
      &:hover {
        background: #343243;
      }
    }
    .max-btn {
      font-size: 24px;
      line-height: 140%;
    }
  }
  .draggable-modal {
    backdrop-filter: blur(0);
    display: flex;
    align-items: end;
    .draggable-modal-content {
      width: 100%;
      height: auto;
      border-radius: 30px 30px 0 0;
      background: #181720;
      padding: 0 16px 24px;
      .drag-handle-container {
        background: #181720;
        margin-bottom: 10px;
      }
      &__in {
        background: #181720;
        .modal-title {
          margin-bottom: 15px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 140%;
          color: #fff;
        }
        .saved-addresses__list {
          width: calc(100% + 32px);
          margin-left: -16px;
          .list-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 11px 16px;
            border-bottom: 1px solid #2b2b41;
            &:last-child {
              border: 0;
            }

            .coin-img {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .address-info {
              .address-title {
                margin-bottom: 4px;
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                color: #fff;
              }
              .address-code {
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                color: #7a74ba;
              }
            }
          }
        }
      }
    }
  }
}
</style>
