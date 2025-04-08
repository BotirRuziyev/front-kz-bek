<template>
  <div class="more-main">
    <input-oracle
      search="true"
      placeholder="Search..."
      @changed="filterSettings"
    />
    <div class="more-main__content">
      <ul class="more-settings__list d-flex flex-column">
        <li
          v-for="setting in filteredmoreSettins"
          :key="setting.id"
          class="list-item border-gradient"
        >
          <nuxt-link :to="setting.to" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="setting.img" alt="" />
            </div>
            {{ setting.title }}
          </nuxt-link>
        </li>
      </ul>
      <div class="more-contact">
        <h1 class="contact-title">CONTACTS</h1>
        <ul class="contact-list">
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <telegramIcon />
                </div>
                Telegram
              </div>
              <div class="arrown-icon">
                <arrowLeftIcon />
              </div>
            </a>
          </li>
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <signalIcon />
                </div>
                Signal
              </div>
              <div class="arrown-icon">
                <arrowLeftIcon />
              </div>
            </a>
          </li>
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <whatsappIcon />
                </div>
                WhatsApp
              </div>
              <div class="arrown-icon">
                <arrowLeftIcon />
              </div>
            </a>
          </li>
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <simplexIcon />
                </div>
                SimpleX
              </div>
              <div class="arrown-icon">
                <arrowLeftIcon />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import telegramIcon from '@/assets/svg/telegram.svg?inline'
// @ts-ignore
import arrowLeftIcon from '@/assets/svg/arrow-left.svg?inline'
// @ts-ignore
import signalIcon from '@/assets/svg/signal.svg?inline'
// @ts-ignore
import whatsappIcon from '@/assets/svg/whatsapp.svg?inline'
// @ts-ignore
import simplexIcon from '@/assets/svg/simplex.svg?inline'

@Component({
  components: {
    telegramIcon,
    arrowLeftIcon,
    signalIcon,
    whatsappIcon,
    simplexIcon,
  },
})
export default class MoreSettingsPage extends Vue {
  private searchQuery = ''

  layout() {
    return 'mobile'
  }

  private moreSettins = [
    {
      id: 1,
      to: '/moresettings/language',
      img: require('@/assets/svg/globe.svg'),
      title: 'LANGUAGE',
    },
    {
      id: 2,
      to: '/moresettings/account',
      img: require('@/assets/svg/paycheck-with-active.svg'),
      title: 'ACCOUNT SETTINGS & SECURITY',
    },
    {
      id: 3,
      to: '/moresettings/seed-recovery',
      img: require('@/assets/svg/seed-recovery.svg'),
      title: 'SEED RECOVERY',
    },
    {
      id: 4,
      to: '/moresettings/mycontacts',
      img: require('@/assets/svg/phone.svg'),
      title: 'MY CONTACTS',
    },
    {
      id: 5,
      to: '/moresettings/addresses',
      img: require('@/assets/svg/bitcoin-withdrawal.svg'),
      title: 'SAVED & FAVOURITE EXTERNAL WITHDRAWALS ADDRESSES',
    },
    {
      id: 6,
      to: '/moresettings/payment-details-p2p',
      img: require('@/assets/svg/bank-card.svg'),
      title: ' SAVED PAYMENT DETAILS FOR P2P',
    },
    {
      id: 7,
      to: '/moresettings/tickets',
      img: require('@/assets/svg/ticket.svg'),
      title: 'TICKETS',
    },
    {
      id: 8,
      to: '/moresettings/fees',
      img: require('@/assets/svg/fees.svg'),
      title: 'FEES',
    },
    {
      id: 9,
      to: '#',
      img: require('@/assets/svg/become.svg'),
      title: 'BECOME @ORACLEVERIFIED',
    },
    {
      id: 10,
      to: '#',
      img: require('@/assets/svg/oracle.svg'),
      title: 'ORACLEPAY',
    },
    {
      id: 11,
      to: '/moresettings/terms-of-service',
      img: require('@/assets/svg/document.svg'),
      title: 'TERMS OF SERVICE',
    },
  ]

  private filteredmoreSettins = [...this.moreSettins]

  private filterSettings(value: string): void {
    this.searchQuery = value
    console.log(value)

    this.filteredmoreSettins = this.moreSettins.filter((setting) =>
      setting.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }
}
</script>
<style lang="scss">
.more-main {
  min-height: calc(100vh - 85px);
  padding: 18px 0 24px;
  .input {
    margin-bottom: 18px;
  }
  &__content {
    .more-settings__list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 60px;
      .list-item {
        border-radius: 12px;

        overflow: hidden;
        &:nth-child(1) {
          .settings-link {
            &::after {
              background: url('@/assets/svg/translate.svg') no-repeat;
            }
          }
        }
        &:nth-child(2) {
          .settings-link {
            &::after {
              background: url('@/assets/svg/setting-2.svg') no-repeat;
            }
          }
        }
        &:nth-child(3) {
          .settings-link {
            &::after {
              background: url('@/assets/svg/text.svg') no-repeat;
            }
          }
        }
        &:nth-child(4) {
          .settings-link {
            &::after {
              right: -8px;
              background: url('@/assets/svg/profile-2user.svg') no-repeat;
            }
          }
        }
        &:nth-child(5) {
          .settings-link {
            &::after {
              top: -1px;
              right: -2px;
              background: url('@/assets/svg/money-send.svg') no-repeat;
            }
          }
        }
        &:nth-child(6) {
          .settings-link {
            &::after {
              background: url('@/assets/svg/cards.svg') no-repeat;
            }
          }
        }
        &:nth-child(7) {
          .settings-link {
            &::after {
              background: url('@/assets/svg/ticket-expired.svg') no-repeat;
            }
          }
        }
        &:nth-child(8) {
          .settings-link {
            &::after {
              top: 0;
              right: -14px;
              background: url('@/assets/svg/receipt-2.svg') no-repeat;
            }
          }
        }
        &:nth-child(9) {
          .settings-link {
            &::after {
              right: -4px;
              background: url('@/assets/svg/login.svg') no-repeat;
            }
          }
        }
        &:nth-child(10) {
          .settings-link {
            &::after {
              right: -6px;
              background: url('@/assets/svg/empty-wallet.svg') no-repeat;
            }
          }
        }
        &:nth-child(11) {
          .settings-link {
            &::after {
              right: -10px;
              background: url('@/assets/svg/document-text.svg') no-repeat;
            }
          }
        }
        .settings-link {
          display: block;
          padding: 11px 25px 16px 14px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 20px;
          text-transform: uppercase;
          color: #fff;
          position: relative;
          &::after {
            content: '';
            width: 102px;
            height: 102px;
            background-position: center;
            position: absolute;
            top: 0;
            right: -5px;
          }

          .settings-icon {
            width: 73px;
            height: 73px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
            position: relative;
            z-index: 1;
          }
        }
      }
    }
    .more-contact {
      .contact-title {
        margin-bottom: 18px;
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 20px;
        text-transform: uppercase;
        color: #fff;
      }
      .contact-list {
        background: rgba(29, 29, 41, 0.4);
        border-radius: 12px;
        padding: 0 12px;
        overflow: hidden;
        .list-item {
          &:first-child {
            .contact-link {
              .left-block {
                .icon {
                  svg {
                    height: 12px;
                  }
                }
              }
            }
          }
          &:last-child {
            .contact-link {
              border-bottom: 0;
            }
          }
          .contact-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 8px 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);

            .left-block {
              display: flex;
              align-items: center;
              gap: 12px;
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 16px;
              text-align: center;
              color: #fff;
              .icon {
                width: 32px;
                height: 32px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 100%;
                background: #121119;
                border: 1px solid #f64e2a;
                box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.15);
                img {
                  width: fit-content;
                  height: fit-content;
                  object-fit: contain;
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
