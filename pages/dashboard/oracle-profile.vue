<template>
  <div class="oracle-profile">
    <block-nav-back text="BTC account" :more="true" />
    <div class="wallet-overview">
      <div class="wallet-balance">
        <div class="left-block">
          <h4 class="balance-title">Your Bitcoin balance</h4>
          <div class="wallet-balance__info">
            <h3 class="wallet-balance__value">0.003213</h3>
            <div class="wallet-select__wrapper">
              <select id="wallet" name="wallet" class="wallet-select">
                <option value="USD">USD</option>
                <option value="BTC" selected>BTC</option>
                <option value="LTC">LTC</option>
                <option value="TON">TON</option>
                <option value="ETC">ETC</option>
              </select>
            </div>
          </div>
        </div>
        <div class="wallet-history">
          <nuxt-link to="#" class="history-link">
            History
            <ArrowIcon />
          </nuxt-link>
        </div>
      </div>
      <div class="coin-to__usd">≈ $550 000</div>
      <div class="wallet-qr__code">
        <img src="@/assets/png/qr-code.png" alt="" />
      </div>
      <div class="wallet-action-buttons">
        <new-oracle-button
          text="Deposit"
          :icon="require('@/assets/svg/arrow-down.svg')"
        />
        <new-oracle-button
          text="Send"
          :icon="require('@/assets/svg/arrow-up.svg')"
        />
        <new-oracle-button
          text="Swap"
          :icon="require('@/assets/svg/exchange.svg')"
        />
      </div>
    </div>
    <div class="address-info">
      <h3 class="address-info__head">Address info</h3>
      <div class="referral-code-box">
        <span ref="address" class="address-code"
          >92das8d9asdh89dsa8dupaosd2e32e213</span
        >
        <button class="copy-btn" @click="copyAddress">
          <CopyIcon />
        </button>
        <button class="share-btn" @click="shareAddress">
          <ShareIcon />
        </button>
      </div>
      <div class="update-address">
        <new-oracle-button
          color="yellow"
          text="Update Address"
          :icon="require('@/assets/svg/exchange.svg')"
          @click="updateAddress = true"
        />
      </div>
    </div>
    <your-transactions to="" />
    <div class="mixing">
      <h3 class="mixing__head">Mixing</h3>
      <new-oracle-button
        :icon="require('@/assets/svg/create-icon.svg')"
        text="Start New Mix"
      />
    </div>
    <div class="details">
      <div class="details-head">Details</div>
      <ul class="details-list">
        <li class="list-item">
          <h5 class="item-head">Limits</h5>
          <p class="item-description">Feb 20, 2025</p>
        </li>
        <li class="list-item">
          <h5 class="item-head">Created Date</h5>
          <p class="item-description">May 20, 2025</p>
        </li>
        <li class="list-item">
          <h5 class="item-head">Transactions</h5>
          <p class="item-description">120</p>
        </li>
      </ul>
      <div class="fees-history-wrapper">
        <div class="fees-section">
          <nuxt-link to="#" class="fees-link"
            >Fees
            <span class="icon">
              <ArrowIcon />
            </span>
          </nuxt-link>
        </div>
        <div class="history-section">
          <nuxt-link to="#" class="history-link"
            >History
            <span class="icon">
              <ArrowIcon />
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>

    <adresses-modal :is-visible="updateAddress" class="update-address__modal">
      <div class="modal-body">
        <div class="icon">
          <UpdateIcon />
        </div>
        <h3 class="modal-title">
          Are you sure you want to update your address?
        </h3>
      </div>
      <new-oracle-button
        color="yellow"
        text="Yes"
        @click="updateAddress = false"
      />
      <new-oracle-button text="Close" @click="updateAddress = false" />
    </adresses-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ArrowIcon from '@/assets/svg/arrow-left.svg?inline'
// @ts-ignore
import WalletIcon from '@/assets/svg/wallet-status.svg?inline'
// @ts-ignore
import CopyIcon from '@/assets/svg/moresettings/copy.svg?inline'
// @ts-ignore
import ShareIcon from '@/assets/svg/share-icon.svg?inline'
// @ts-ignore
import UpdateIcon from '@/assets/svg/exchange.svg?inline'

@Component({
  components: {
    ArrowIcon,
    WalletIcon,
    CopyIcon,
    ShareIcon,
    UpdateIcon,
  },
})
export default class DashboardPage extends Vue {
  updateAddress = false

  copyAddress() {
    const element = this.$refs.address as HTMLElement

    const range = document.createRange()
    range.selectNodeContents(element)

    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }

    navigator.clipboard.writeText(element.innerText)
  }

  shareAddress() {
    if (navigator.share) {
      navigator
        .share({
          title: 'My Wallet Address',
          text: '92das8d9asdh89dsa8dupaosd2e32e213',
          url: window.location.href,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error))
    } else {
      alert('Share not supported on this browser')
    }
  }
}
</script>

<style lang="scss">
.oracle-profile {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 375px;
  margin: 0 auto;
  padding: 0 16px 30px;
  .wallet-overview {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: -8px;
    .wallet-balance {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left-block {
        .balance-title {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
        .wallet-balance__info {
          display: flex;
          align-items: center;
          gap: 8px;
          .coin-icon {
            height: 100%;
            span {
              font-family: 'Hector', sans-serif;
              font-weight: 400;
              font-size: 32px;
              line-height: 125%;
              color: #fff;
            }
          }
          .wallet-balance__value {
            font-family: 'Hector', sans-serif;
            font-weight: 400;
            font-size: 32px;
            line-height: 125%;
            color: #fff;
          }
          .wallet-select__wrapper {
            display: flex;
            align-items: center;
            .wallet-select {
              background: transparent;
              border: none;
              outline: none;
              box-shadow: none;
              background: none;
              cursor: pointer;
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 14px;
              line-height: 130%;
              color: #fff;
              &:checked {
                outline: none;
                border: none;
              }
              option {
                background: #000;
              }
            }
          }
        }
      }
      .wallet-history {
        .history-link {
          display: flex;
          align-items: center;
          gap: 7px;
          border-radius: 12px;
          padding: 7px 10px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: #b2aaf9;
          transition: 0.3s;
          &:hover {
            color: #fff;
            svg {
              path {
                stroke: #fff;
              }
            }
          }
          svg {
            width: 7px;
            path {
              stroke: #b2aaf9;
              transition: 0.3s;
            }
          }
        }
      }
    }
    .coin-to__usd {
      margin-top: -12px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: #fff;
    }
    .wallet-qr__code {
      text-align: center;
      img {
        width: 206px;
        height: 206px;
      }
    }
    .wallet-action-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      .new-oracle-button {
        padding: 9px 0;
        line-height: 18px;
      }
    }
  }
  .address-info {
    &__head {
      margin-bottom: 8px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      color: #fff;
    }
    .referral-code-box {
      display: flex;
      align-items: center;
      background: #181720;
      border-radius: 16px;
      padding: 12px 16px;
      gap: 5px;
      margin-bottom: 8px;
      .address-code {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
      .copy-btn {
        margin-right: 7px;
        cursor: pointer;
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #7a74ba;
          }
        }
      }
      .share-btn {
        cursor: pointer;
      }
    }
    .new-oracle-button {
      padding: 9px 0;
      line-height: 18px;
    }
  }
  .your-transactions {
    &__head {
      .your-transactions__link {
        cursor: auto;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        color: #fff;
        .icon {
          display: none;
        }
      }
    }
  }
  .mixing {
    &__head {
      margin-bottom: 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      color: #fff;
    }
    .new-oracle-button {
      background: #13121b;
      position: relative;
      padding: 15px 16px;
      .button-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
      &:hover {
        background: #13121b;
        box-shadow: none;
      }
    }
  }
  .details {
    &-head {
      margin-bottom: 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      color: #fff;
    }
    &-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 12px;
      .list-item {
        .item-head {
          margin-bottom: 4px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: #b2aaf9;
        }
        .item-description {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
      }
    }
    .fees-history-wrapper {
      width: calc(100% + 32px);
      margin-left: -16px;
      .fees-section,
      .history-section {
        .fees-link,
        .history-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #2b2741;
          padding: 12px 16px;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
          transition: 0.2s;
          &:hover {
            color: #7a74ba;
            svg {
              path {
                stroke: #7a74ba;
              }
            }
          }
          svg {
            path {
              transition: 0.2s;
            }
          }
        }
      }
    }
  }
  .update-address__modal {
    .modal-content {
      display: flex;
      flex-direction: column;
      .modal-body {
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          background: #f64e2a;
          svg {
            width: 34px;
            height: 34px;
          }
        }
        .modal-title {
          max-width: 343px;
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
      }
      .new-oracle-button {
        margin-bottom: 10px;
        padding: 11px 16px;
        line-height: 22px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
