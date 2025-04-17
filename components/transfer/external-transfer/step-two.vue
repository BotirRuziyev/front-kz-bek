<template>
  <div class="external-transfer__step-two">
    <div class="external-transfer__content">
      <div class="from-card">
        <h4 class="card-title">From</h4>
        <p class="card-promocode">32189dhsajdHJd8923jKJDkds90232</p>
        <div class="coin-img">
          <CoinIcon />
        </div>
        <h2 class="coin-amount">100.00</h2>
        <h5 class="coin-to__usd">≈ $98.98</h5>
      </div>
      <div class="address-selected">
        <div class="left-block">
          <div class="coin-img">
            <CoinIcon />
          </div>
          <div class="address-info">
            <h5 class="address-code">92das8d9asdh89dsa8dupaosd2e32</h5>
            <h4 class="coin-name">Litecoin</h4>
          </div>
        </div>
        <button class="save-btn" @click="isSave = true">
          <SaveImg />
          Save
        </button>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">Fees</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">Receive amount</h5>
          <h5 class="transaction-summary__amount">98.09 USDT</h5>
        </div>
        <div class="transaction-summary__confirm">
          <button-oracle
            to="/transfer/external-transfer?step=2"
            text="Confirm"
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
            <div class="info-head">
              <h5 class="amount">From</h5>
            </div>
            <div class="info-bottom">
              <h2 class="coin-img">
                <CoinIcon />
              </h2>
              <h5 class="transfer-to__usd">2321sdsa3JKJjhkasdS32iosadA</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="sent-to">Sent to</h5>
            </div>
            <div class="info-bottom">
              <h2 class="coin-promocode">odsj2J9023jklLKD909210321312Das</h2>
              <button class="save-btn">
                <SaveImg />
                Save
              </button>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="sent-to">TxID</h5>
            </div>
            <div class="info-bottom">
              <h2 ref="textToCopy" class="coin-promocode">
                odsj2J9023jklLKD909210321312Das
              </h2>
              <button class="copy-btn" @click="copyText">
                <CopyIcon />
              </button>
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
    <adresses-modal
      class="payment-error-modal"
      :is-visible="isPaymentError"
      @close="isPaymentError = false"
    >
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
          @click="isPaymentError = false"
        />
        <button-oracle
          text="Okay"
          color="orange"
          @click="isPaymentError = false"
        />
      </div>
    </adresses-modal>
    <adresses-modal
      class="save-modal"
      :is-visible="isSave"
      @close="isSave = false"
    >
      <div class="save-modal__head">
        <h2 class="modal-title">Save address</h2>
        <p class="modal-description">
          Assign a name to this address to quickly find and use it later.
        </p>
        <input-oracle placeholder="Name" />
      </div>
      <div class="modal-buttons">
        <button-oracle text="Close" color="gray" @click="isSave = false" />
        <button-oracle
          text="Save address"
          color="orange"
          @click="isSave = false"
        />
      </div>
    </adresses-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import CoinIcon from '@/assets/svg/usdt.svg?inline'
// @ts-ignore
import SaveImg from '@/assets/svg/bookmark.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/transaction-check.svg?inline'
// @ts-ignore
import ErrorIcon from '@/assets/svg/payment-error.svg?inline'
// @ts-ignore
import CopyIcon from '@/assets/svg/moresettings/copy.svg?inline'

@Component({
  components: {
    CoinIcon,
    SaveImg,
    CheckIcon,
    ErrorIcon,
    CopyIcon,
  },
})
export default class ExternalTransferStepTwo extends Vue {
  isSave = false
  isConfirm = false
  isPaymentError = false

  copyText(): void {
    const el = this.$refs.textToCopy as HTMLElement
    if (!el) return
    const text = el.innerText
    navigator.clipboard.writeText(text)
    const range = document.createRange()
    range.selectNodeContents(el)
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}
</script>

<style lang="scss">
.external-transfer__step-two {
  padding-bottom: 130px;
  .save-btn {
    display: flex;
    align-items: center;
    gap: 3px;
    background: #1e1d28;
    border-radius: 12px;
    padding: 7px 10px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
    transition: 0.3s;
    &:hover {
      background: #343243;
    }
  }
  .external-transfer__content {
    .from-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #2b2741;
      border-radius: 16px;
      padding: 12px 0px 60px;
      margin-top: 24px;
      margin-bottom: 150px;
      .card-title {
        margin-bottom: 4px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
      .card-promocode {
        margin-bottom: 50px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #7a74ba;
      }
      .coin-img {
        margin-bottom: 16px;
        svg {
          width: 46px;
          height: 46px;
        }
      }
      .coin-amount {
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
    .address-selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
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
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #67639a;
          }
          .address-code {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
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
      background: #13121b;
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
      .button_oracle {
        box-shadow: none;
      }
    }
  }
  .transaction-confirmed__modal {
    padding: 50px 16px;
    overflow-y: auto;
    .modal-content {
      height: auto;
      padding: 24px 26px;
      background: #181720;
      border-radius: 24px;
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
          position: relative;
          display: flex;
          justify-content: center;
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
        margin-bottom: 30px;
        &__list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          .list-item {
            &:nth-child(2) {
              .info-head {
                margin-bottom: 4px;
              }
              .info-bottom {
                justify-content: start;
                gap: 4px;
              }
            }
            &:nth-child(3) {
              .info-bottom {
                margin-top: -12px;
                align-items: end;
                gap: 8px;
              }
            }
            &:nth-child(4),
            &:nth-child(5) {
              .info-bottom {
                justify-content: start;
                gap: 5px;
              }
            }
            .info-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .date,
              .time,
              .to,
              .amount,
              .sent-to {
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
              .transfer-to__usd,
              .coin-promocode {
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
              .copy-btn {
                cursor: pointer;
                svg {
                  width: 20px;
                  height: 20px;
                  path {
                    fill: #7a74ba;
                  }
                }
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
          max-width: 250px;
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
  .save-modal {
    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .save-modal__head {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        flex: 1 1 100%;
        padding-bottom: 150px;
        .modal-title {
          margin: 0 0 12px;
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
        .modal-description {
          margin-bottom: 40px;
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
        .input {
          width: 100%;
          input {
            width: 100%;
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
