<template>
  <div class="main-dashboard">
    <input-oracle :search="true" placeholder="Search" />
    <dashboard-home />
    <new-oracle-button text="Get @OracleVerified" color="yellow" />
    <div class="wallet-overview">
      <div class="wallet-balance">
        <div class="left-block">
          <h4 class="balance-title">Your Overall Balance</h4>
          <div class="wallet-balance__info">
            <div class="coin-icon">
              <span v-if="selectedCoin === 'USD'" class="coin-symbol">$</span>
              <img
                v-else
                :src="selectedIcon"
                alt="coin icon"
                class="coin-icon"
              />
            </div>
            <h3 class="wallet-balance__value">1,621. 00</h3>
            <div class="wallet-select__wrapper">
              <select
                id="wallet"
                v-model="selectedCoin"
                name="wallet"
                class="wallet-select"
                @change="updateIcon"
              >
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
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
      <ul class="wallet-actions">
        <li v-for="coin of coins" :key="coin.id" class="wallet-action">
          <button class="wallet-action__btn">
            <div class="coin-icon">
              <img :src="coin.img" alt="" />
            </div>
            <div class="wallet-action__body">
              <div class="left-block">
                <div class="coin-info">
                  <h3 class="coin-name">{{ coin.name }}</h3>
                  <div
                    :class="[
                      'coin-status__icon',
                      {
                        negative: !isPositive(coin.change),
                      },
                    ]"
                  >
                    <WalletIcon />
                  </div>
                  <div
                    :class="[
                      'coin-change',
                      {
                        positive: isPositive(coin.change),
                        negative: !isPositive(coin.change),
                      },
                    ]"
                  >
                    {{ coin.change }}
                  </div>
                </div>
                <div class="wallet-card">
                  <span>****</span> {{ coin.cardNumber }}
                </div>
              </div>
              <div class="right-block">
                <h4 class="coin-amount">{{ coin.amount }}</h4>
                <h4 class="coin-price">{{ coin.usdValue }}</h4>
              </div>
            </div>
          </button>
        </li>
      </ul>
      <div class="wallet-action-buttons">
        <new-oracle-button
          color="yellow"
          text="Deposit"
          :icon="require('@/assets/svg/arrow-down.svg')"
          @click="openDepositModal"
        />
        <new-oracle-button
          text="Send"
          :icon="require('@/assets/svg/arrow-up.svg')"
          @click="openWithdrawModal"
        />
        <new-oracle-button
          text="Swap"
          :icon="require('@/assets/svg/exchange.svg')"
        />
      </div>
    </div>
    <div class="qr-payment">
      <new-oracle-button
        text="QR Payment"
        :icon="require('@/assets/svg/qr-scan.svg')"
      />
    </div>
    <your-transactions />
    <div class="prepaid-cards">
      <div class="prepaid-cards__head">
        <nuxt-link to="#" class="prepaid-cards__link">
          Prepaid Cards
          <div class="icon">
            <ArrowIcon />
          </div>
        </nuxt-link>
      </div>
      <ul class="prepaid-cards__list">
        <li v-for="card of prepaidCards" :key="card.id" class="card-item">
          <div class="card-head">
            <h5 class="card-name">{{ card.name }}</h5>
            <div class="wallet-card"><span>****</span> {{ card.number }}</div>
          </div>
          <div class="card-img">
            <img :src="card.img" alt="" />
          </div>
        </li>
      </ul>
    </div>
    <div class="oracle-services">
      <h3 class="oracle-services__head">Oracle's Services</h3>
      <ul class="oracle-services__list">
        <li class="service-item">
          <div class="service-img">
            <img :src="require('@/assets/svg/mixing-icon.svg')" alt="" />
          </div>
          <h3 class="service-name">Oracle Crypto Mixing</h3>
          <nuxt-link to="#" class="more-link">See more</nuxt-link>
        </li>
        <li class="service-item">
          <div class="service-img">
            <img
              height="20"
              :src="require('@/assets/svg/oracle-icon.svg')"
              alt=""
            />
          </div>
          <h3 class="service-name">Oracle Pay</h3>
          <nuxt-link to="#" class="more-link">See more</nuxt-link>
        </li>
        <li class="service-item">
          <div class="service-img">
            <img :src="require('@/assets/svg/p2p-icon.svg')" alt="" />
          </div>
          <h3 class="service-name">P2P</h3>
          <nuxt-link to="#" class="more-link">See more</nuxt-link>
        </li>
      </ul>
    </div>
    <new-oracle-button
      class="create-account__btn"
      text="Create New Account"
      :icon="require('@/assets/svg/oracle-icon.svg')"
      color="yellow"
    />
    <draggable-modal
      class="select-method__modal"
      :is-open="depositModal"
      @close="depositModal = false"
    >
      <h2 class="modal-title">Select Deposit Method</h2>
      <ul class="select-method__list">
        <li
          v-for="deposit of depositOptions"
          :key="deposit.id"
          class="method-item"
        >
          <div class="method-img">
            <img :src="deposit.img" alt="" />
          </div>
          <div class="item-body">
            <h3 class="method-name">{{ deposit.title }}</h3>
            <p class="method-description">
              {{ deposit.description }}
            </p>
          </div>
        </li>
      </ul>
    </draggable-modal>
    <draggable-modal
      class="select-method__modal"
      :is-open="withdrawModal"
      @close="withdrawModal = false"
    >
      <h2 class="modal-title">Select Withdraw Method</h2>
      <ul class="select-method__list">
        <li
          v-for="withdraw of withdrawOptions"
          :key="withdraw.id"
          class="method-item"
        >
          <div class="method-img">
            <img :src="withdraw.img" alt="" />
          </div>
          <div class="item-body">
            <h3 class="method-name">{{ withdraw.title }}</h3>
            <p class="method-description">
              {{ withdraw.description }}
            </p>
          </div>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ArrowIcon from '@/assets/svg/arrow-left.svg?inline'
// @ts-ignore
import WalletIcon from '@/assets/svg/wallet-status.svg?inline'

@Component({
  components: {
    ArrowIcon,
    WalletIcon,
  },
})
export default class DashboardPage extends Vue {
  selectedCoin: string = 'USD'
  selectedIcon: string = ''

  depositModal = false
  withdrawModal = false

  layout() {
    return 'mobile'
  }

  coins = [
    {
      id: 1,
      img: require('@/assets/svg/btc-icon.svg'),
      name: 'BTC',
      change: '+3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
    {
      id: 2,
      img: require('@/assets/svg/ltc-icon.svg'),
      name: 'LTC',
      change: '-3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
    {
      id: 3,
      img: require('@/assets/svg/ton-icon.svg'),
      name: 'TON',
      change: '-3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
    {
      id: 4,
      img: require('@/assets/svg/etc-icon.svg'),
      name: 'ETC',
      change: '-3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
  ]

  prepaidCards = [
    {
      id: 1,
      name: 'VISA',
      number: '3213',
      img: require('@/assets/svg/visa.svg'),
    },
    {
      id: 2,
      name: 'MsC',
      number: '8262',
      img: require('@/assets/svg/mastercard.svg'),
    },
    {
      id: 3,
      name: 'AMEX',
      number: '0912',
      img: require('@/assets/svg/amex.svg'),
    },
    {
      id: 4,
      name: 'ORACLE',
      number: '4569',
      img: require('@/assets/svg/oracle-icon.svg'),
    },
  ]

  depositOptions = [
    {
      id: 1,
      img: require('@/assets/svg/arrow-down.svg'),
      title: 'External Deposit',
      description: 'Deposit crypto from external wallet',
    },
    {
      id: 2,
      img: require('@/assets/svg/p2p-icon.svg'),
      title: 'P2P Deposit',
      description: 'Receive funds via P2P deal from another user',
    },
    {
      id: 3,
      img: require('@/assets/svg/oracle-icon.svg'),
      title: 'Internal Transfer In',
      description: 'Get money from another Oracle user',
    },
    {
      id: 4,
      img: require('@/assets/svg/bill-icon.svg'),
      title: 'Create Bill',
      description: 'Collect payments via Bills',
    },
  ]

  withdrawOptions = [
    {
      id: 1,
      img: require('@/assets/svg/arrow-down.svg'),
      title: 'External Withdrawal',
      description: 'Withdraw crypto to external wallet',
    },
    {
      id: 2,
      img: require('@/assets/svg/p2p-icon.svg'),
      title: 'P2P Exchange',
      description: 'Exchange crypto to fiat via P2P exchange',
    },
    {
      id: 3,
      img: require('@/assets/svg/oracle-icon.svg'),
      title: 'Internal Transfer Out',
      description: 'Send money to someone',
    },
    {
      id: 4,
      img: require('@/assets/svg/bill-icon.svg'),
      title: 'Bill Payment',
      description: 'Pay Bills',
    },
  ]

  isPositive(change: string): boolean {
    return change.trim().startsWith('+')
  }

  updateIcon() {
    const iconMap: Record<string, string> = {
      BTC: require('@/assets/svg/btc-icon.svg'),
      LTC: require('@/assets/svg/ltc-icon.svg'),
      TON: require('@/assets/svg/ton-icon.svg'),
      ETC: require('@/assets/svg/etc-icon.svg'),
    }

    this.selectedIcon = iconMap[this.selectedCoin] || ''
  }

  mounted() {
    this.updateIcon()
  }

  openDepositModal() {
    this.depositModal = true
    this.$nuxt.$emit('open-modal')
  }

  openWithdrawModal() {
    this.withdrawModal = true
    this.$nuxt.$emit('open-modal')
  }
}
</script>

<style lang="scss">
.main-dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0 90px;
  .wallet-overview {
    .wallet-balance {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
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
    .wallet-actions {
      width: calc(100% + 32px);
      margin-left: -16px;
      margin-bottom: 16px;
      .wallet-action {
        &__btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #2b2741;
          padding: 12px 16px;
          cursor: pointer;
          .wallet-action__body {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left-block {
              .coin-info {
                display: flex;
                align-items: center;
                gap: 4px;
                .coin-name {
                  font-family: 'Roboto', sans-serif;
                  font-weight: 500;
                  font-size: 16px;
                  line-height: 140%;
                  color: #fff;
                }
                .coin-status__icon {
                  margin-left: 3px;
                  line-height: 0;
                  &.negative {
                    svg {
                      transform: rotate(180deg);
                      path {
                        fill: #f64e2a;
                      }
                    }
                  }
                }
                .coin-change {
                  font-family: 'Inter', sans-serif;
                  font-weight: 500;
                  font-size: 10px;
                  line-height: 130%;
                  &.positive {
                    color: #31f62a;
                  }
                  &.negative {
                    color: #f64e2a;
                  }
                }
              }
              .wallet-card {
                display: flex;
                align-items: center;
                gap: 4px;
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 12px;
                line-height: 135%;
                color: #fff;
                span {
                  height: 12px;
                }
              }
            }
            .right-block {
              .coin-amount {
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                text-align: right;
                color: #fff;
              }
              .coin-price {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 12px;
                line-height: 135%;
                text-align: right;
                color: #7a74ba;
              }
            }
          }
        }
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
  .prepaid-cards {
    &__head {
      margin-bottom: 12px;
      padding: 4px 0;
      .prepaid-cards__link {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Hector', sans-serif;
        font-weight: 400;
        font-size: 20px;
        letter-spacing: 0.05em;
        color: #fff;
      }
    }
    &__list {
      width: calc(100% + 32px);
      margin-left: -16px;
      padding: 0 16px;
      display: flex;
      gap: 8px;
      overflow-x: auto;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        height: 0;
      }
      .card-item {
        background: #1e1d28;
        border-radius: 12px;
        padding: 8px 12px;
        &:first-child {
          .card-img {
            img {
              height: 7px;
            }
          }
        }
        &:nth-child(2) {
          .card-img {
            img {
              height: 11px;
            }
          }
        }
        &:nth-child(3) {
          .card-img {
            img {
              height: 7px;
            }
          }
        }
        &:nth-child(4) {
          .card-img {
            img {
              height: 16px;
            }
          }
        }
        .card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 8px;
          white-space: nowrap;
          .card-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            font-size: 12px;
            line-height: 135%;
            color: #fff;
          }
          .wallet-card {
            display: flex;
            align-items: center;
            gap: 4px;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 12px;
            line-height: 135%;
            color: #b2aaf9;
            span {
              font-size: 16px;
              height: 11.5px;
            }
          }
        }
        .card-img {
          width: 42px;
          height: 27px;
          display: flex;
          justify-content: end;
          align-items: end;
          padding: 4px;
          background: #f64e2a;
          border-radius: 6px;
        }
      }
    }
  }
  .oracle-services {
    &__head {
      margin-bottom: 12px;
      font-family: 'Hector', sans-serif;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 0.05em;
      color: #fff;
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .service-item {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #13121b;
        border: 1px solid #2b2741;
        border-radius: 12px;
        padding: 11px 12px;
        .service-img {
          width: 36px;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #262530;
        }
        .service-name {
          width: 100%;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
        .more-link {
          display: block;
          background: #1e1d28;
          border-radius: 12px;
          padding: 9px 19px;
          white-space: nowrap;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
      }
    }
  }
  .create-account__btn {
    img {
      height: 20px;
    }
  }
  .select-method__modal {
    display: flex;
    flex-direction: column;
    justify-content: end;
    .draggable-modal-content {
      width: 100%;
      height: auto;
      &__in {
        min-height: auto;
      }
    }
    .modal-title {
      margin-bottom: 10px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 140%;
      color: #fff;
    }
    .select-method__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .method-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1e1d28;
        border-radius: 12px;
        padding: 12px;
        &:first-child {
          .method-img {
            img {
              height: 20px;
            }
          }
        }
        &:nth-child(3) {
          .method-img {
            img {
              height: 20px;
            }
          }
        }
        .method-img {
          width: 36px;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #262530;
        }
        .method-name {
          width: 100%;
          margin-bottom: 4px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
        .method-description {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 135%;
          color: #b2aaf9;
        }
      }
    }
  }
}
</style>
