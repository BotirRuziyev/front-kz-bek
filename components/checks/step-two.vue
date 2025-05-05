<template>
  <div class="create-check-step step-two">
    <block-nav-back text="Check Creation" @prev="prevStep" />
    <div class="create-check__content">
      <div class="form-control">
        <label for="#" class="form-label">Enter Number of Activations</label>
        <input
          id="activations"
          ref="convertInput"
          v-model="activations"
          type="text"
          inputmode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          class="form-input"
          placeholder="Maximum number of activations..."
          @input="convertedUSDT(activations)"
          @keypress="allowDecimalNumbers"
          @paste="blockInvalidDecimalPaste"
        />
        <label for="#" class="form-label label-bottom"
          >Up to 10 activations available (based on balance).</label
        >
      </div>
      <div class="bottom">
        <div v-if="convert != 0" class="currency-usd">
          <span class="amount-in-usd">
            <span class="value">$ {{ convert }}</span> / per
          </span>
        </div>
        <new-oracle-button
          text="Continue"
          :to="convert != 0 ? '/checks/check-creation/check-details' : ''"
          :color="convert != 0 ? 'yellow' : 'black'"
        />
      </div>
    </div>
    <adresses-modal
      :is-visible="false"
      class="check-created__successfully error-modal"
    >
      <div class="modal-in">
        <div class="modal-head">
          <div class="icon">
            <ErrorIcon />
          </div>
          <h3 class="modal-title">Check Already Activated</h3>
        </div>
        <div class="modal-body">
          <p class="body-title">Reason</p>
          <p class="body-description">
            Unfortunately, this check has already been fully claimed and is no
            longer available.
          </p>
          <p class="body-description">
            You can try again by submitting a new application.
          </p>
        </div>
      </div>
      <new-oracle-button text="Return to Wallet" color="yellow" />
    </adresses-modal>
    <adresses-modal
      :is-visible="false"
      class="check-created__successfully successfully-modal"
    >
      <div class="modal-in">
        <div class="modal-head">
          <div class="icon">
            <SuccessfullIcon />
          </div>
          <h3 class="modal-title">Check Activated Successfully!</h3>
        </div>
        <div class="modal-body">
          <p class="body-title">You have received: 1.902 USDT</p>
          <p class="body-description">Total Amount Received: 2.6 USDT</p>
        </div>
      </div>
      <new-oracle-button text="Return to Wallet" color="yellow" />
    </adresses-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import SuccessfullIcon from '@/assets/svg/checks-succesfull.svg?inline'
// @ts-ignore
import ErrorIcon from '@/assets/svg/check-error.svg?inline'

@Component({
  components: {
    SuccessfullIcon,
    ErrorIcon,
  },
})
export default class StepOne extends Vue {
  convert = 0
  activations: string = ''
  shareUrl =
    'https://oraclehub.su/check382941940509230950923450-92345-923-050-23403240324095г2390'

  async shareContent() {
    if (navigator.share) {
      try {
        await navigator.share({
          url: this.shareUrl,
        })
      } catch (error) {
        console.error(error)
      }
    }
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
  }

  convertedUSDT(v: string) {
    this.convert = parseFloat((Number(v) * 35.51).toFixed(2))
  }

  prevStep() {
    this.$emit('prevStep')
  }
}
</script>

<style lang="scss">
.create-check-step {
  &.step-two {
    .create-check__content {
      height: calc(100vh - 95px);
    }
  }
  .block-nav-back {
    margin-bottom: 30px;
  }
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &.label-bottom {
      order: 2;
      margin-bottom: 0;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
  }
  .form-input {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    background: #13121b;
    border: 1px solid #2b2741;
    border-radius: 12px;
    padding: 4px 12px;
    height: 44px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
    }
  }
  .currency-usd {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 24px;

    .amount-in-usd {
      display: block;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      color: #7a74ba;
      .value {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 28px;
        line-height: 135%;
        color: #fff;
      }
    }
  }
}
</style>
