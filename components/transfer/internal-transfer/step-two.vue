<template>
  <div class="internal-transfer__step-two">
    <div class="internal-transfer__content">
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
      <div class="internal-transfer__converter">
        <div class="coin-converter coin-converter__input">
          <coin-select name="USDT" price="2500 USDT" amount="2500" />
          <div class="input-coin">
            <div class="form-control">
              <input
                v-model="coin"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                placeholder="0.00"
                class="form-input"
                @input="coinEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
            </div>
            <h4 class="coin-name">USDT</h4>
          </div>
          <div class="coin-converter__to-usd">
            <h5 class="to-usd__value">$</h5>
            <div class="form-control">
              <input
                v-model="dollor"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                @input="dollorEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
              <div v-if="isFilled" class="input-placeholder">
                <span>0</span>.00
              </div>
            </div>
            <button class="transfer-btn">
              <TransferIcon />
            </button>
          </div>
        </div>
        <button
          class="coin-convert__icon"
          :class="{ active: isOpen }"
          @click=";(isOpen = true), $nuxt.$emit('open-modal')"
        >
          <ConvertShowIcon v-if="isOpen" />
          <ConvertIcon v-else />
        </button>
        <div class="coin-converter coin-converter__output">
          <coin-select name="Litecoin" />
          <div class="input-coin">
            <div class="form-control">
              <input
                v-model="coinConvert"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                placeholder="0.00"
                @input="coinConvertEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
            </div>
            <h4 class="coin-name">LTC</h4>
          </div>
        </div>
      </div>
    </div>
    <button-oracle text="Transfer" color="orange" @click="$emit('nextStep')" />
    <draggable-modal :is-open="isOpen" @close="isOpen = false">
      <h1 class="modal-title">Choose Network</h1>
      <ul class="coins-list">
        <div v-for="item of 6" :key="item" class="list-item">
          <label :for="`user` + item" class="list-item__label">
            <input :id="`user` + item" type="checkbox" class="form-input" />
            <label :for="`user` + item" class="checkbox-button">
              <span class="check-icon">
                <CheckIcon />
              </span>
            </label>
            <div class="coin-info">
              <div class="coin-img">
                <img :src="require('@/assets/svg/usdt.svg')" alt="" />
              </div>
              <div class="coin-body">
                <div class="body-head">
                  <h4 class="coin-name">Litecoin</h4>
                  <h4 class="coin-convert">0,0244 TON</h4>
                </div>
                <div class="body-bottom">
                  <h5 class="card-num">***2343</h5>
                  <h5 class="coin-convert">≈ 1000.4$</h5>
                </div>
              </div>
            </div>
          </label>
        </div>
      </ul>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ConvertIcon from '@/assets/svg/coin-convert-icon.svg?inline'
// @ts-ignore
import ConvertShowIcon from '@/assets/svg/coin-convert-show-icon.svg?inline'
// @ts-ignore
import TransferIcon from '@/assets/svg/transfer-vertical-svg.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/check-icon.svg?inline'

@Component({
  components: {
    ConvertIcon,
    ConvertShowIcon,
    TransferIcon,
    CheckIcon,
  },
})
export default class InternalTransferStepTwo extends Vue {
  isOpen = false
  coin: string = ''
  coinConvert: string = ''
  dollor: string = ''
  isFilled: boolean = true

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

  dollorEvent() {
    this.dollor = this.dollor.replace(',', '.')
    this.isFilled = this.dollor.trim() === ''
  }

  coinEvent() {
    this.coin = this.coin.replace(',', '.')
  }

  coinConvertEvent() {
    this.coinConvert = this.coinConvert.replace(',', '.')
  }

  allowDecimalNumbers(event: KeyboardEvent): void {
    const key = event.key
    const isNumber = /^\d$/.test(key)
    const isDot = key === '.' || key === ','

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const alreadyHasDot =
      currentValue.includes('.') || currentValue.includes(',')

    if (!isNumber && !(isDot && !alreadyHasDot)) {
      event.preventDefault()
    }
  }

  blockInvalidDecimalPaste(event: ClipboardEvent): void {
    event.preventDefault()
    let pasted = event.clipboardData?.getData('text') || ''

    pasted = pasted.replace(/,/g, '.')

    pasted = pasted.replace(/[^\d.]/g, '')

    const firstDotIndex = pasted.indexOf('.')
    if (firstDotIndex !== -1) {
      const beforeDot = pasted.slice(0, firstDotIndex + 1)
      const afterDot = pasted.slice(firstDotIndex + 1).replace(/\./g, '')
      pasted = beforeDot + afterDot
    }

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const selectionStart = target.selectionStart || 0
    const selectionEnd = target.selectionEnd || 0

    const newValue =
      currentValue.slice(0, selectionStart) +
      pasted +
      currentValue.slice(selectionEnd)

    target.value = newValue
  }
}
</script>

<style lang="scss">
.internal-transfer__step-two {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  .internal-transfer__content {
    flex: 1 1 100%;
    margin-bottom: 30px;

    .internal-transfer__converter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .coin-converter {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #13121b;
        border-radius: 8px;
        padding: 8px 16px 16px 16px;
        .input-coin {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          .form-control {
            .form-input {
              width: 100%;
              height: 40px;
              background: transparent;
              padding: 0 20px 0 0;
              border: none;
              font-family: 'Hector', sans-serif;
              font-weight: 400;
              font-size: 32px;
              line-height: 125%;
              color: #fff;
              &:focus {
                outline: none;
              }
              &::placeholder {
                font-family: 'Hector', sans-serif;
                font-weight: 400;
                font-size: 32px;
                line-height: 125%;
                color: #7a74ba;
              }
            }
          }
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #67639a;
          }
        }
        .coin-converter__to-usd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2px;
          .to-usd__value {
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 120%;
            color: rgba(131, 131, 175, 0.8);
            span {
              font-size: 12px;
            }
          }
          .form-control {
            width: 100%;
            position: relative;
            .form-input {
              width: 100%;
              height: 40px;
              position: relative;
              z-index: 2;
              background: transparent;
              padding: 0 20px 0 0;
              border: none;
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 16px;
              line-height: 120%;
              color: #fff;
              &:focus {
                outline: none;
              }
              &::placeholder {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 12px;
                text-transform: capitalize;
                line-height: 120%;
                color: #7a74ba;
              }
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 12px;
              line-height: 120%;
              color: rgba(131, 131, 175, 0.8);
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
      .coin-converter__input {
        position: relative;
        z-index: 5;
      }
      .coin-converter__output {
        .coin-select {
          .select-btn {
            .left-block {
              .coin-info-head {
                display: block;
                .coin-name {
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 120%;
                }
              }
            }
          }
        }
      }
      .coin-convert__icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s;
        &.active {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .draggable-modal {
    backdrop-filter: blur(0);
    display: flex;
    align-items: end;
    .draggable-modal-content {
      width: 100%;
      height: auto;
      border-radius: 30px 30px 0 0;
      background: #181720;
      padding: 0 16px 24px;
      .drag-handle-container {
        background: #181720;
        margin-bottom: 10px;
      }
      &__in {
        background: #181720;
        .modal-title {
          margin-bottom: 12px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 140%;
          color: #fff;
        }
        .coins-list {
          .list-item {
            width: calc(100% + 32px);
            margin-left: -16px;
            border-bottom: 1px solid #28283a;
            &:last-child {
              border: 0;
            }
            &__label {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 16px;
              .form-input {
                display: none;
                &:checked + .checkbox-button {
                  background: #f64e2a;
                  border-color: #f64e2a;
                  .check-icon {
                    opacity: 1;
                  }
                }
              }
              .checkbox-button {
                min-width: 18px;
                min-height: 18px;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: 1px solid #7a74ba;
                transition: 0.1s;
                .check-icon {
                  opacity: 0;
                  transition: 0.1s;
                }
              }
              .coin-info {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 8px;
                .coin-body {
                  width: 100%;
                  .body-head,
                  .body-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  }
                  .body-bottom {
                    .card-num,
                    .coin-convert {
                      font-family: 'Roboto', sans-serif;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 135%;
                      color: #7a74ba;
                    }
                  }
                  .body-head {
                    .coin-name,
                    .coin-convert {
                      font-family: 'Roboto', sans-serif;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 130%;
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
