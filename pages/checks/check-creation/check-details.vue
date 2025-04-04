<template>
  <div class="check-details">
    <div v-if="checks" class="check-details__content">
      <block-nav-back
        text="CHECK #902102-2024"
        to="/checks/check-creation?step=1"
      />
      <div class="qr-code">
        <img :src="require('@/assets/png/qr-code.png')" alt="" />
      </div>
      <input-oracle
        :deactivated="true"
        :update="true"
        :copy="true"
        :share="true"
        :v="shareUrl"
        @shareContent="shareContent"
      />
      <button-oracle
        text="CLAIM THIS CHECK"
        color="orange"
        @click=";(status = true), (checks = false)"
      />
      <div class="check-details__info">
        <ul class="info-list">
          <li class="list-item">Created at: 12 Dec 2024 9:35 PM</li>
          <li class="list-item">
            Expires on: <span>12 Dec 2025 9:35 PM</span>
          </li>
        </ul>
        <div class="check-details-input">
          <div class="enter-input">
            <input-oracle type="number" :v="1.902" :deactivated="true" />
            <TetHerIcon class="input-icon" />
          </div>
          <div class="approximately">≈</div>
          <div class="result-input">
            <input-oracle type="number" :v="1901.153" :deactivated="true" />
            <DollorIcon class="input-icon" />
          </div>
        </div>
        <div class="check-details__accordion">
          <button
            class="accordion-btn"
            :class="{ active: isOpen }"
            @click="isOpen = !isOpen"
          >
            <span>
              3 of 3 activations left - 0.5 BTC per activation (1.5 BTC total)
            </span>
            <span class="arrown-icon">
              <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
            </span>
          </button>
          <transition name="accordion">
            <div v-show="isOpen" class="accordion-body">
              <ul class="body-list">
                <li class="list-item">
                  1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM
                  EST
                </li>
                <li class="list-item">
                  2nd Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM
                  EST
                </li>
                <li class="list-item">
                  3rd Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM
                  EST
                </li>
              </ul>
            </div>
          </transition>
          <p class="text">
            Do not share this check to anyone unless you want to send funds to
            them. Anyone can activate this cheak using link or QR code above
          </p>
        </div>
      </div>
    </div>
    <div v-if="status && !checks" class="checks-status">
      <div class="checks-status-content">
        <p class="activations">3 activations</p>
        <h4 class="checks-status-title">CHECK #902102-2024 was CLAIMED!</h4>
        <div class="checks-img">
          <img :src="require('@/assets/png/success.png')" alt="" />
        </div>
        <div class="exchange">
          <div class="exchange-head">
            <p class="cripto-name">1.902 USDT</p>
            <p class="cripto-description">
              3 of 3 activations left - 1.902 USDT per activation (2.6 USDT
              total)
            </p>
          </div>
        </div>
      </div>
      <button-oracle
        text="BACK"
        color="orange"
        @click=";(status = true), (checks = true)"
      />
    </div>
    <div v-else-if="!status && !checks" class="checks-status">
      <div class="checks-status-content">
        <h4 class="checks-status-title">this CHECK was already CLAIMED!</h4>
        <div class="checks-img">
          <img :src="require('@/assets/png/error.png')" alt="" />
        </div>
      </div>
      <button-oracle
        text="BACK"
        color="orange"
        @click=";(status = true), (checks = true)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// @ts-ignore
import TetHerIcon from '@/assets/svg/tether-usdt.svg?inline'
// @ts-ignore
import DollorIcon from '@/assets/svg/dollor-convert.svg?inline'
@Component({
  components: {
    TetHerIcon,
    DollorIcon,
  },
})
export default class CheckDetailsPage extends Vue {
  layout() {
    return 'mobile'
  }

  checks = true
  status = true
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
  .qr-code {
    max-width: 266px;
    width: 100%;
    margin: 0 auto;
    background: #121119;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .input {
    margin-bottom: 30px;
    input {
      padding-right: 113px;
      text-overflow: ellipsis;
    }
    &-copy-action {
      right: 43px;
    }
  }
  .button_oracle {
    margin-bottom: 24px;
  }
  &__info {
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      .list-item {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
        span {
          color: #a50e0e;
        }
      }
    }
    .check-details-input {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      .approximately {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 24px;
        line-height: 100%;
        color: #fff;
      }
      .enter-input,
      .result-input {
        position: relative;
        .input {
          margin-bottom: 0;
          input {
            padding: 16px 40px 16px 14px;
          }
        }
        .input-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }
      }
    }
    .check-details__accordion {
      .accordion-btn {
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
          font-family: var(--third-family);
          font-weight: 400;
          font-size: 18px;
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
        overflow: hidden;
        transition: 0.3s;
        .body-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 18px;
          .list-item {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 11px;
            line-height: 8px;
            color: #fff;
          }
        }
      }
      .text {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }
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
      font-family: var(--second-family);
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
