<template>
  <div class="create-check-step step-two">
    <block-nav-back text="Check Creation" @prev="prevStep" />
    <div class="create-check__content">
      <div class="form-control">
        <label for="#" class="form-label">Enter Number of Activations</label>
        <input-oracle
          label="Up to 10 activations available (based on balance)."
          type="number"
          placeholder="Maximum number of activations..."
          @changed="convertedUSDT"
        />
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
    <adresses-modal :is-visible="false" class="check-created__successfully">
      <div class="modal-head">
        <div class="icon">
          <SuccessfullIcon />
        </div>
        <h3 class="modal-title">Check Created Successfully!</h3>
      </div>
      <div class="qr-code">
        <img :src="require('@/assets/png/qr-code.png')" alt="" />
      </div>
      <input-oracle
        :deactivated="true"
        :copy="true"
        :share="true"
        :v="shareUrl"
        @shareContent="shareContent"
      />
      <div class="total-amount">
        <h4 class="amount-title">Total Amount: 5.0 USDT</h4>
        <p class="amount-description">Activations Available: 10</p>
        <p class="amount-description">0.5 USDT per 1 activation</p>
      </div>
      <new-oracle-button text="Return to Wallet" color="yellow" />
    </adresses-modal>
    <adresses-modal
      :is-visible="false"
      class="check-created__successfully error-modal"
    >
      <div class="modal-in">
        <div class="modal-head">
          <div class="icon">
            <ErrorIcon />
          </div>
          <h3 class="modal-title">Check Creation Failed</h3>
        </div>
        <div class="modal-body">
          <p class="body-title">Reason</p>
          <p class="body-description">
            An error occurred due to a network issue. Please try again later.
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
  }
  .input {
    margin-bottom: 25px;
    label {
      order: 2;
      margin-bottom: 0;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
    &-group {
      order: 1;
      margin-bottom: 8px;
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
