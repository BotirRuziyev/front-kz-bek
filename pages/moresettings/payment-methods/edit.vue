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
            <select-oracle
              selected-val="USDT"
              :data="data"
              @changed="changeCurrency"
            />
          </div>
          <div class="form-control">
            <textarea-oracle
              placeholder="Additional information"
              :v="additional"
              @changed="changeAdditional"
            />
          </div>
        </div>
        <new-oracle-button
          :to="'/moresettings/payment-methods'"
          text="Confirm"
          color="yellow"
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
  name: string = 'Vakko Nikko'
  account: string = '28392189321321'
  currency: string = 'USD'
  additional: string = 'Good'

  data = [
    {
      id: 1,
      name: 'Litecoin',
      selected: false,
    },
    {
      id: 2,
      name: 'XRP',
      selected: false,
    },
    {
      id: 3,
      name: 'Bitcoin',
      selected: false,
    },
    {
      id: 4,
      name: 'Etherium',
      selected: false,
    },
    {
      id: 5,
      name: 'USDT',
      selected: false,
    },
    {
      id: 6,
      name: 'BNB',
      selected: false,
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
