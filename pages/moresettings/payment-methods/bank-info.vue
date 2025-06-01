<template>
  <div class="bank-info">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/payment-methods"
        text="Payment Methods"
      />
      <form
        action=""
        class="bank-info__form"
        @submit="savePaymentMethod($event)"
      >
        <div class="bank-info__form--in">
          <div class="form-control">
            <input-oracle
              :v="name"
              type="text"
              placeholder="Vakko Nikko"
              label="Payment Method Name"
              @changed="chaneName"
            />
          </div>
          <div class="form-control">
            <input-oracle
              :v="account"
              type="number"
              placeholder="Account number"
              @changed="chaneAccount"
            />
          </div>
          <div class="form-control">
            <select-oracle :data="data" @changed="changeCurrency" />
          </div>
          <div class="form-control">
            <select-oracle :data="data" @changed="changeCurrency" />
          </div>
          <div class="form-control">
            <textarea-oracle
              placeholder="Additional information"
              @changed="changeAdditional"
            />
          </div>
        </div>
        <new-oracle-button
          :to="!isFormValid ? '' : '/moresettings/payment-methods'"
          text="Confirm"
          :color="!isFormValid ? 'black' : 'yellow'"
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class BankInfoPage extends Vue {
  name: string = ''
  account: string = ''
  currency: string = ''
  additional: string = ''

  data = [
    {
      id: 1,
      name: 'Litecoin',
    },
    {
      id: 2,
      name: 'XRP',
    },
    {
      id: 3,
      name: 'Bitcoin',
    },
    {
      id: 4,
      name: 'Etherium',
    },
    {
      id: 5,
      name: 'USDT',
    },
    {
      id: 6,
      name: 'BNB',
    },
  ]

  savePaymentMethod(event: Event) {
    event.preventDefault()
  }

  chaneName(val: string) {
    this.name = val
  }

  chaneAccount(val: string) {
    this.account = val
  }

  changeCurrency(val: string) {
    this.currency = val
  }

  changeAdditional(val: string) {
    this.additional = val
  }

  get isFormValid() {
    return this.name && this.account && this.currency && this.additional
  }
}
</script>

<style lang="scss">
.bank-info {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  &__form {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    gap: 24px;
    &--in {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1 1 100%;
      .form-control {
        position: relative;
        .input {
          input {
            background: #13121b;
          }
        }
        &:nth-child(3) {
          z-index: 3;
        }
        &:nth-child(4) {
          z-index: 2;
        }
      }
    }
    .new-oracle-button {
      line-height: 22px;
      padding: 11px 0;
      &.black {
        background: #13121b;
        border: 2px solid #2b2741;
        border-radius: 14px;
        cursor: no-drop;
        &:hover {
          background: #13121b;
          box-shadow: none;
        }
      }
      &.yellow {
        border: 2px solid #f64e2a;
        border-radius: 14px;
        background: #f64e2a;
      }
    }
  }
}
</style>
