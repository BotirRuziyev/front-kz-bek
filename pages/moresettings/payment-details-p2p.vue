<template>
  <div class="payment-details-p2p">
    <block-nav-back text="SAVED PAYMENT DETAILS FOR P2P" to="/moresettings" />
    <ul class="payment-currency-list">
      <li
        v-for="currency in paymentCurrency"
        :key="currency.id"
        :class="{ selected: currency.selected }"
        class="list-item"
        @click="currencySelected(currency.id)"
      >
        {{ currency.namebig }}
        <span>{{ currency.namesmall }}</span>
      </li>
    </ul>
    <ul class="payment-list">
      <li
        v-for="payment in payments"
        :key="payment.id"
        :class="{ selected: payment.selected }"
        class="list-item"
        @click="paymentSelected(payment.id)"
      >
        {{ payment.name }}
      </li>
    </ul>
    <payment-details-form
      @edit="editModal = true"
      @delete="deleteModal = true"
    />
    <payment-details-form
      @edit="editModal = true"
      @delete="deleteModal = true"
    />
    <button-oracle
      text="ADD NEW PAYMENT DETAILS"
      color="orange"
      @click=";(addPayment = true), $nuxt.$emit('open-modal')"
    />
    <adresses-modal
      v-show="editModal"
      :is-visible="editModal"
      class="change-name-address"
      @close="editModal = false"
    >
      <div class="modal-head">
        <button class="cancel-btn" @click="editModal = false">Cancle</button>
        <button class="done-btn">Done</button>
      </div>
      <div class="edit-content">
        <input-oracle placeholder="My baddie’s CashApp" :edit="true" />
      </div>
    </adresses-modal>
    <adresses-modal
      v-show="deleteModal"
      :is-visible="deleteModal"
      class="delete-address"
      @close="deleteModal = false"
    >
      <h3 class="modal-title">Confirm deletion of payment details?</h3>
      <button-oracle text="YES" color="orange" />
      <button-oracle text="CanCel" color="gray" @click="deleteModal = false" />
    </adresses-modal>
    <adresses-modal
      v-show="addModal"
      :is-visible="addModal"
      class="add-address"
    >
      <h3 class="modal-title">Confirm adding new address?</h3>
      <button-oracle text="YES" color="orange" />
      <button-oracle text="CanCel" color="gray" @click="addModal = false" />
    </adresses-modal>
    <draggable-modal
      class="new-address-modal"
      :is-open="addPayment"
      @close="addPayment = false"
    >
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click=";(addPayment = false), $nuxt.$emit('close-modal')"
        >
          Cancle
        </button>
        <button class="add-btn">Add</button>
      </div>
      <div class="new-address-btn">
        <button
          class="back-btn"
          @click="
            () => {
              $nuxt.$emit('open-modal')
            }
          "
        >
          <arrowIcon />
        </button>
        NEW PAYMENT DETAIL
      </div>
      <ul class="payment-currency-list">
        <li
          v-for="currency in paymentCurrency"
          :key="currency.id"
          :class="{ selected: currency.selected }"
          class="list-item"
          @click="currencySelected(currency.id)"
        >
          {{ currency.namebig }}
          <span>{{ currency.namesmall }}</span>
        </li>
      </ul>
      <ul class="payment-list">
        <li
          v-for="payment in payments"
          :key="payment.id"
          :class="{ selected: payment.selected }"
          class="list-item"
          @click="paymentSelected(payment.id)"
        >
          {{ payment.name }}
        </li>
      </ul>
      <form class="modal-form">
        <div class="form-control">
          <input-oracle placeholder="Name" />
        </div>
        <div class="form-control">
          <input-oracle placeholder="Payment Details" />
        </div>
        <div class="form-control">
          <textarea-oracle placeholder="Comment" />
        </div>
      </form>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import arrowIcon from '@/assets/svg/arrow-back.svg?inline'

@Component({
  components: {
    arrowIcon,
  },
})
export default class PaymentDetailsP2P extends Vue {
  editModal = false
  deleteModal = false
  addModal = false
  addPayment = false

  layout() {
    return 'mobile'
  }

  paymentCurrency = [
    {
      id: 1,
      namebig: 'EUR',
      namesmall: '(Europe)',
      selected: true,
    },
    {
      id: 2,
      namebig: 'CBP',
      namesmall: '(United Kingdom)',
      selected: false,
    },
    {
      id: 3,
      namebig: 'RUB',
      namesmall: '(Russia)',
      selected: false,
    },
    {
      id: 4,
      namebig: 'UAH',
      namesmall: '(Ukraine)',
      selected: false,
    },
    {
      id: 5,
      namebig: 'KZT',
      namesmall: '(Kazakhstan)',
      selected: false,
    },
    {
      id: 6,
      namebig: 'INR',
      namesmall: '(india)',
      selected: false,
    },
    {
      id: 7,
      namebig: 'NGN',
      namesmall: '(Nigeria)',
      selected: false,
    },
    {
      id: 8,
      namebig: 'CNY',
      namesmall: '(China)',
      selected: false,
    },
    {
      id: 9,
      namebig: 'BRL',
      namesmall: '(Brazil)',
      selected: false,
    },
    {
      id: 10,
      namebig: 'USD',
      namesmall: '(International)',
      selected: false,
    },
    {
      id: 11,
      namebig: 'EUR',
      namesmall: '(International)',
      selected: false,
    },
  ]

  payments = [
    {
      id: 1,
      name: 'Zelle',
      selected: true,
    },
    {
      id: 2,
      name: 'Venmo',
      selected: false,
    },
    {
      id: 3,
      name: 'PayPal',
      selected: false,
    },
    {
      id: 4,
      name: 'ApplePay',
      selected: false,
    },
    {
      id: 5,
      name: 'Bank Transfer',
      selected: false,
    },
  ]

  currencySelected(id: number) {
    this.paymentCurrency.forEach((item) => {
      item.selected = id === item.id
    })
  }

  paymentSelected(id: number) {
    this.payments.forEach((item) => {
      item.selected = id === item.id
    })
  }
}
</script>

<style lang="scss">
.payment-details-p2p {
  padding-bottom: 24px;
  .payment-currency-list {
    margin-bottom: 40px;
  }
  .payment-currency-list,
  .payment-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    .list-item {
      background: #121119;
      border-radius: 8px;
      padding: 11px 0px;
      border: 1px solid #121119;
      font-family: var(--third-family);
      font-weight: 700;
      font-size: 13px;
      text-align: center;
      color: #fff;
      letter-spacing: 0.6px;
      &.selected {
        border-color: #f64e2a;
      }
      span {
        letter-spacing: normal;
        font-weight: 400;
      }
    }
  }
  .payment-list {
    margin-bottom: 24px;
  }
  .payment-details-form-container {
    margin-bottom: 24px;
  }
  .button_oracle {
    height: 48px;
  }
  .add-addresses-modal {
    &.change-name-address {
      .edit-content {
        .input {
          input {
            width: 230px;
          }
        }
      }
    }
  }
}
</style>
