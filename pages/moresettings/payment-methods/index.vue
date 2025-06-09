<template>
  <div class="payment-methods">
    <div class="main-container">
      <block-nav-back to="/moresettings" text="Payment Methods" />
      <div class="payment-methods__content">
        <div v-if="paymentList.length === 0" class="payment-methods__empty">
          <div class="payment-methods__empty-icon">
            <PaymentIcon />
          </div>
          <p class="payment-methods__empty-text">
            No Payment Methods Available
          </p>
        </div>

        <ul v-else class="payment-methods__list">
          <li
            v-for="method in paymentList"
            :key="method.id"
            class="payment-methods__card"
          >
            <div class="payment-methods__card-body">
              <h3 class="payment-methods__card-title">{{ method.bankName }}</h3>
              <p class="payment-methods__card-name">{{ method.fullName }}</p>
              <p class="payment-methods__card-info">{{ method.accountInfo }}</p>
              <p class="payment-methods__card-note">
                {{ method.additionalInfo }}
              </p>
            </div>

            <nuxt-link
              to="/moresettings/payment-methods/edit"
              class="payment-methods__card-edit"
            >
              <EditIcon />
            </nuxt-link>
            <button
              class="payment-methods__card-delete"
              @click="deleteMethods(method.id)"
            >
              <TrashIcon />
            </button>
          </li>
        </ul>

        <new-oracle-button
          to="/moresettings/payment-methods/add"
          text="Add a new payment method"
          color="yellow"
        />
      </div>
      <adresses-modal :is-visible="deleteModal" class="payment-methods__modal">
        <div class="modal-body">
          <!-- Icon -->
          <div class="modal__icon">
            <TrashIcon />
          </div>

          <!-- Title -->
          <h2 class="modal__title">Delete Payment Method</h2>

          <!-- Description -->
          <p class="modal__description">
            Are you sure you want to delete this payment method?<br />
            You won’t be able to use it for future payouts.
          </p>
        </div>
        <div class="modal__actions">
          <new-oracle-button text="Delete it" @click="confirmDelete" />
          <new-oracle-button
            text="Back"
            color="yellow"
            @click=";(deleteModal = false), (delId = null)"
          />
        </div>
      </adresses-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import PaymentIcon from '@/assets/svg/money-coin.svg?inline'
// @ts-ignore
import EditIcon from '@/assets/svg/pencil.svg?inline'
// @ts-ignore
import TrashIcon from '@/assets/svg/trash-2.svg?inline'

@Component({
  components: {
    PaymentIcon,
    EditIcon,
    TrashIcon,
  },
})
export default class PaymentMethodsPage extends Vue {
  deleteModal = false
  delId: number | null = null

  paymentList = [
    {
      id: 1,
      bankName: 'Bank name',
      fullName: 'Name and surname',
      accountInfo: 'USD, 98938219321321321',
      additionalInfo: 'Additional information here',
    },
    {
      id: 2,
      bankName: 'Bank name',
      fullName: 'Name and surname',
      accountInfo: 'USD, 98938219321321321',
      additionalInfo: 'Additional information here',
    },
    {
      id: 3,
      bankName: 'Bank name',
      fullName: 'Name and surname',
      accountInfo: 'USD, 98938219321321321',
      additionalInfo: 'Additional information here',
    },
  ]

  deleteMethods(id: number) {
    this.deleteModal = true
    this.delId = id
  }

  confirmDelete() {
    this.paymentList = this.paymentList.filter((i) => i.id !== this.delId)
    this.deleteModal = false
  }
}
</script>

<style lang="scss">
.payment-methods {
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 100%;
  }
  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
  }
  &__empty-text {
    margin-top: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #7a74ba;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__card {
    border: 1px solid #2b2741;
    border-radius: 12px;
    padding: 12px;
    position: relative;
    &-title {
      margin-bottom: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      color: #fff;
    }
    &-name {
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
    &-info {
      margin-bottom: 10px;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #7a74ba;
    }
    &-note {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
    &-edit {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 12px;
    }
    &-delete {
      cursor: pointer;
      position: absolute;
      bottom: 12px;
      right: 12px;
    }
  }
  .new-oracle-button {
    padding: 11px 0;
    line-height: 22px;
  }
}
</style>
