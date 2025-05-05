<template>
  <div class="check-details">
    <div class="check-details__content">
      <block-nav-back
        text="CHECK #902102-2024"
        to="/checks/check-creation?step=1"
      />
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
      <div class="total-ammount">
        <h5 class="total-ammount__title">Total ammount</h5>
        <h3 class="ammount-coin">
          100 USDT <span class="coin-covert">≈ $98.98</span>
        </h3>
        <div class="activation-details">
          <div class="activation-labels">
            <p class="label">Remaining Activations</p>
            <p class="label">Per activation</p>
          </div>

          <div class="activation-values">
            <p class="remaining-count">5 of 10</p>
            <p class="per-activation">0.5 BTC <span>≈ $35 000</span></p>
          </div>
        </div>
      </div>
      <div class="check-details__info">
        <div class="check-details__accordion">
          <button
            class="accordion-btn"
            :class="{ active: isOpen }"
            @click="isOpen = !isOpen"
          >
            <span> Activation history </span>
            <span class="arrown-icon">
              <ArrowIcon />
            </span>
          </button>
          <transition name="accordion">
            <div v-show="isOpen" class="accordion-body">
              <ul class="body-list">
                <li v-for="item in 3" :key="item" class="list-item">
                  <div class="list-item__head">
                    <p class="list-num">{{ item }}</p>
                    <div class="user-img">
                      <img src="@/assets/png/zaglushka.png" alt="" />
                    </div>
                    <h3 class="user-name">Barbara Martinez</h3>
                    <div class="right-block">
                      <p class="coin-amound">0,0244 LTC</p>
                      <p class="coin-convert">≈ 100.234$</p>
                    </div>
                  </div>
                  <p class="create-date">Dec 12, 2025 at 12:32 AM</p>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      <div class="check-details__bottom">
        <new-oracle-button
          text="Claim Check (0.5 BTC)"
          color="yellow"
          @click="status = true"
        />
      </div>
    </div>
    <adresses-modal :is-visible="status" class="check-created__successfully">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// @ts-ignore
import ArrowIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import TetHerIcon from '@/assets/svg/tether-usdt.svg?inline'
// @ts-ignore
import DollorIcon from '@/assets/svg/dollor-convert.svg?inline'
@Component({
  components: {
    TetHerIcon,
    DollorIcon,
    ArrowIcon,
  },
})
export default class CheckDetailsPage extends Vue {
  checks = false
  status = false
  isOpen = true
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
}
</script>

<style lang="scss">
.check-details {
  max-width: 375px;
  margin: 0 auto;
  min-height: calc(100vh);
  padding: 0 16px 80px;
  .block-nav-back {
    margin-bottom: 24px;
  }
  .qr-code {
    max-width: 266px;
    width: 100%;
    margin: 0 auto;
    background: #121119;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
  .input {
    margin-bottom: 30px;
    input {
      padding-right: 82px;
      text-overflow: ellipsis;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-copy-action,
    &-share-action {
      border-radius: 8px;
      width: 36px;
      height: 36px;
      background: #1e1d28;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 44px;
    }
    &-share-action {
      right: 4px;
    }
  }
  .button_oracle {
    margin-bottom: 24px;
  }
  .total-ammount {
    margin-bottom: 24px;
    &__title {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      color: #7a74ba;
    }
    .ammount-coin {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 24px;
      line-height: 140%;
      color: #fff;
      .coin-covert {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
    }
    .activation-details {
      .activation-labels {
        display: flex;
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
        .label {
          flex: 1 1 50%;
        }
      }
      .activation-values {
        display: flex;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
        .remaining-count,
        .per-activation {
          flex: 1 1 50%;
          span {
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: 12px;
            line-height: 140%;
          }
        }
      }
    }
  }
  &__info {
    .check-details__accordion {
      .accordion-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        padding-bottom: 16px;
        cursor: pointer;
        &.active {
          .arrown-icon {
            transform: rotate(90deg);
          }
        }
        span {
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 16px;
          line-height: 140%;
          color: #fff;
        }
        .arrown-icon {
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(270deg);
          transition: 0.3s;
          img {
            height: 12px;
          }
        }
      }
      .accordion-enter-active,
      .accordion-leave-active {
        transition: max-height 0.3s ease-out, opacity 0.3s ease;
      }
      .accordion-enter-from,
      .accordion-leave-to {
        max-height: 0;
        opacity: 0;
        transition: max-height 0.3s ease-out, opacity 0.3s ease;
      }

      .accordion-enter-to,
      .accordion-leave-from {
        max-height: 300px;
        opacity: 1;
      }
      .accordion-body {
        width: calc(100% + 32px);
        margin-left: -16px;
        overflow: hidden;
        transition: 0.3s;
        .body-list {
          .list-item {
            border-bottom: 1px solid #2b2741;
            padding: 8px 16px;
            &__head {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 14px;
              .list-num {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 140%;
                color: #fff;
              }
              .user-img {
                border-radius: 50%;
                width: 32px;
                height: 32px;
                min-width: 32px;
                min-height: 32px;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .user-name {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                color: #fff;
              }
              .coin-amound {
                white-space: nowrap;
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                text-align: right;
                color: #fff;
              }
              .coin-convert {
                white-space: nowrap;
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 12px;
                line-height: 135%;
                text-align: right;
                color: #b2aaf9;
              }
            }
            .create-date {
              padding-left: 24px;
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 12px;
              line-height: 135%;
              color: #7a74ba;
            }
          }
        }
      }
    }
  }
  &__bottom {
    width: 100%;
    background: #000;
    padding: 12px 20px 24px 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    .new-oracle-button {
      max-width: 343px;
      margin: 0 auto;
      border-radius: 14px;
      padding: 11px 16px;
      line-height: 22px;
    }
  }

  .checks-status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 0;
    width: 100%;
    height: 100vh;
    background: #0a090f;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    &::before {
      background: #f64e2a;
      border-radius: 100%;
      content: '';
      filter: blur(125px);
      height: 100px;
      left: 50%;
      position: absolute;
      top: -50px;
      transform: translateX(-50%);
      width: 100px;
      z-index: 0;
    }
    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .activations {
      margin-bottom: 12px;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      color: rgba(255, 255, 255, 0.4);
    }
    .checks-status-title {
      max-width: 290px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      font-size: 16px;
      line-height: 160%;
      text-transform: uppercase;
      text-align: center;
      color: #fff;
    }
    .checks-img {
      width: 270px;
      height: 270px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .exchange {
      margin-bottom: 25px;
      &-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        .cripto-name {
          font-family: var(--font3);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
        }
        .cripto-description {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .exchange-value {
        margin-bottom: 12px;
        font-family: var(--font3);
        font-weight: 700;
        font-size: 30px;
        text-align: center;
        color: #1b961f;
      }
      .criptio-sum {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        .sum-value {
          font-family: var(--font3);
          font-weight: 400;
          font-size: 18px;
          color: #fff;
          &:nth-child(1) {
            text-decoration: line-through;
          }
        }
      }
    }
    .button_oracle {
      max-width: 287px;
      margin: 0 auto;
    }
  }
}
</style>
