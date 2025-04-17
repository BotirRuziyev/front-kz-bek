<template>
  <div class="internal-transfer__step-three">
    <div class="internal-transfer__content">
      <div class="internal-transfer__head">
        <ul class="head-list">
          <li class="list-item">
            <div class="icon">!</div>
            <div class="list-description">Be aware of scammers</div>
          </li>
          <li class="list-item">
            <div class="icon">!</div>
            <div class="list-description">How to recognize scammer</div>
          </li>
          <li class="list-item">
            <div class="icon">!</div>
            <div class="list-description">How to recognize scammer</div>
          </li>
        </ul>
      </div>
      <div class="internal-transfer__from">
        <div class="from-card">
          <h5 class="card-title">From</h5>
          <p class="user-account">USDT Account ***2343</p>
          <div class="coin-img">
            <CoinImg />
          </div>
          <h3 class="coin-convert__amount">100.00</h3>
          <h5 class="coin-to__usd">≈ $98.98</h5>
        </div>
        <input-oracle placeholder="For..." />
      </div>
      <div class="selected-user">
        <div class="user-img">
          <img :src="require('@/assets/png/zaglushka.png')" alt="" />
        </div>
        <h4 class="user-name">Barbara Martinez</h4>
      </div>
      <div class="selected-user__info">
        <ul class="info-list">
          <li v-for="profile of profilInfo" :key="profile.id" class="list-item">
            <div class="profile-img">
              <img :src="profile.img" alt="" />
            </div>
            <h4 class="profile-title">
              {{ profile.title }}
            </h4>
          </li>
        </ul>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">Fees</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">Price per</h5>
          <h5 class="transaction-summary__amount">0.001 BTC (≈ $1.06)</h5>
        </div>
        <div class="transaction-summary__confirm">
          <button-oracle
            to="/transfer/internal-transfer?step=3"
            text="Transfer"
            color="orange"
            @click="isConfirm = true"
          />
        </div>
      </div>
    </div>
    <adresses-modal
      class="transaction-confirmed__modal"
      :is-visible="isConfirm"
      @close="isConfirm = false"
    >
      <div class="modal-head">
        <div class="check-icon">
          <CheckIcon />
        </div>
        <h3 class="modal-title">Transaction Confirmed!</h3>
        <div class="border-bottom">
          <svg
            width="290"
            height="2"
            viewBox="0 0 290 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H290" stroke="#443D69" stroke-dasharray="8 8" />
          </svg>
        </div>
      </div>
      <div class="user-info">
        <ul class="user-info__list">
          <li class="list-item">
            <div class="info-head">
              <h5 class="date">Date</h5>
              <h5 class="time">Time</h5>
            </div>
            <div class="info-bottom">
              <h5 class="date">Feb 20, 2025</h5>
              <h5 class="time">11:23 AM</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="left-block">
              <div class="info-head">
                <h5 class="to">To</h5>
              </div>
              <div class="info-bottom">
                <h5 class="user-name">Barbara Martinez</h5>
              </div>
            </div>
            <div class="user-img">
              <img :src="require('@/assets/png/zaglushka.png')" alt="" />
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="amount">Amount Received</h5>
            </div>
            <div class="info-bottom">
              <h2 class="amount-coin">100 USDT</h2>
              <h5 class="transfer-to__usd">≈ $98.98</h5>
            </div>
          </li>
        </ul>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">Fees</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">Price per</h5>
          <h5 class="transaction-summary__amount">0.001 BTC (≈ $1.06)</h5>
        </div>
      </div>
    </adresses-modal>
    <adresses-modal class="payment-error-modal">
      <div class="payment-error__head">
        <ErrorIcon />
        <h2 class="modal-title">We couldn't process your payment</h2>
        <p class="modal-description">
          Your transaction couldn't be processed at this time.
        </p>
        <p class="modal-description">Please try again in a few minutes.</p>
      </div>
      <div class="modal-buttons">
        <button-oracle
          text="Try again"
          color="gray"
          @click="isConfirm = false"
        />
        <button-oracle text="Okay" color="orange" @click="isConfirm = false" />
      </div>
    </adresses-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import CoinImg from '@/assets/svg/usdt.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/transaction-check.svg?inline'
// @ts-ignore
import ErrorIcon from '@/assets/svg/payment-error.svg?inline'
@Component({
  components: { CoinImg, CheckIcon, ErrorIcon },
})
export default class InternalTransferStepThree extends Vue {
  isConfirm = false
  profilInfo = [
    {
      id: 1,
      img: require('@/assets/svg/selected-profile.svg'),
      title: 'Profile',
    },

    {
      id: 2,
      img: require('@/assets/svg/ensrow-profile.svg'),
      title: 'Escrow Reviews',
    },
    {
      id: 3,
      img: require('@/assets/svg/p2p-profile.svg'),
      title: 'P2P Reviews',
    },
  ]
}
</script>

<style lang="scss">
.internal-transfer__step-three {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  .internal-transfer__content {
    flex: 1 1 100%;
    margin-bottom: 30px;
    .internal-transfer__head {
      margin-bottom: 48px;
      .head-list {
        display: flex;
        gap: 6px;
        width: calc(100% + 20px);
        margin-left: -10px;
        padding: 0 10px;
        overflow-x: auto;
        &::-webkit-scrollbar {
          height: 0;
        }
        .list-item {
          border-radius: 12px;
          padding: 10px 14px 10px 10px;
          background: #13121b;
          .icon {
            width: 24px;
            height: 24px;
            margin-bottom: 10px;
            background: #f64e2a;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 18px;
            color: #fff;
          }
          .list-description {
            white-space: nowrap;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 135%;
            color: #fff;
          }
        }
      }
    }
    .internal-transfer__from {
      margin-bottom: 24px;
      .from-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #2b2741;
        border-radius: 16px;
        padding: 12px 0px;
        margin-bottom: 10px;
        .card-title {
          margin-bottom: 4px;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
        .user-account {
          margin-bottom: 30px;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 135%;
          color: #7a74ba;
        }
        .coin-img {
          margin-bottom: 16px;
          svg {
            width: 46px;
            height: 46px;
          }
        }
        .coin-convert__amount {
          margin-bottom: 4px;
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 40px;
          line-height: 125%;
          color: #fff;
        }
        .coin-to__usd {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 140%;
          color: rgba(255, 255, 255, 0.3);
        }
      }
      .input {
        input {
          height: 40px;
          border-radius: 12px;
          padding: 4px 12px;
          font-size: 14px;
          line-height: 130%;
          &::placeholder {
            font-size: 14px;
            line-height: 130%;
          }
        }
      }
    }
    .transaction-summary {
      padding: 0 10px;
      max-width: 375px;
      margin: 0 auto;
      width: 100%;
      border-radius: 24px 16px 0 0;
      padding: 16px 16px 24px;
      background: #1b1b25;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);

      &__fees,
      &__price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      &__price {
        margin-bottom: 24px;
      }
      &__label {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #7a74ba;
      }
      &__amount {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #fff;
      }
    }
  }
  .transaction-confirmed__modal {
    padding: 0 16px;
    .modal-content {
      height: auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      background: #181720;
      border-radius: 24px;
      padding: 24px 26px;
      overflow: hidden;
      .modal-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;
        .check-icon {
          margin-bottom: 16px;
        }
        .modal-title {
          margin-bottom: 28px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 140%;
          color: #fff;
        }
        .border-bottom {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          &::before,
          &::after {
            content: '';
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #000;
            position: absolute;
            top: 50%;
            left: -40px;
            transform: translateY(-50%);
          }
          &::after {
            left: auto;
            right: -40px;
          }
        }
      }
      .user-info {
        margin-bottom: 50px;
        &__list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          .list-item {
            &:nth-child(2) {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            &:nth-child(3) {
              .info-bottom {
                justify-content: start;
                gap: 8px;
              }
            }
            .info-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .date,
              .time,
              .to,
              .amount {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 12px;
                line-height: 135%;
                color: #7a74ba;
              }
            }
            .info-bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .date,
              .time,
              .user-name,
              .transfer-to__usd {
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                color: #fff;
              }
              .amount-coin {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 24px;
                line-height: 140%;
                color: #fff;
              }
            }
            .user-img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
      .transaction-summary {
        &__fees,
        &__price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        &__price {
          margin-bottom: 0;
        }
        &__label {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          text-align: center;
          color: #7a74ba;
        }
        &__amount {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .payment-error-modal {
    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .payment-error__head {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        height: calc(100% - 250px);
        .modal-title {
          margin: 12px 0 38px;
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
        .modal-description {
          max-width: 237px;
          margin: 0 auto;
          margin-bottom: 24px;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          color: #fff;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .modal-buttons {
        .button_oracle {
          margin-bottom: 10px;
          border-radius: 14px;
          box-shadow: none;
          &.gray {
            border-color: #1f1e27;
            box-shadow: none;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
