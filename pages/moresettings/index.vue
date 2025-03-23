<template>
  <div class="more-main">
    <input-oracle search="true" placeholder="Search..." />
    <div class="more-main__content">
      <ul class="more-settings__list d-flex flex-column">
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/language" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/globe.svg')" alt="" />
            </div>
            LANGUAGE
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/account" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img
                :src="require('@/assets/svg/paycheck-with-active.svg')"
                alt=""
              />
            </div>
            ACCOUNT SETTINGS & SECURITY
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/seed-recovery" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/seed-recovery.svg')" alt="" />
            </div>
            SEED RECOVERY
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/mycontacts" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/phone.svg')" alt="" />
            </div>
            MY CONTACTS
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/addresses" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img
                :src="require('@/assets/svg/bitcoin-withdrawal.svg')"
                alt=""
              />
            </div>
            SAVED & FAVOURITE EXTERNAL WITHDRAWALS ADDRESSES
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link
            to="/moresettings/payment-details-p2p"
            class="settings-link"
          >
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/bank-card.svg')" alt="" />
            </div>
            SAVED PAYMENT DETAILS FOR P2P
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/tickets" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/ticket.svg')" alt="" />
            </div>
            TICKETS
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/fees" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/fees.svg')" alt="" />
            </div>
            FEES
          </nuxt-link>
        </li>
        <li class="list-item border-gradient">
          <a href="#" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/become.svg')" alt="" />
            </div>
            BECOME @ORACLEVERIFIED
          </a>
        </li>
        <li class="list-item border-gradient">
          <a href="#" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/oracle.svg')" alt="" />
            </div>
            ORACLEPAY
          </a>
        </li>
        <li class="list-item border-gradient">
          <nuxt-link to="/moresettings/terms-of-service" class="settings-link">
            <div class="left-blur"></div>
            <div class="settings-icon">
              <img :src="require('@/assets/svg/document.svg')" alt="" />
            </div>
            TERMS OF SERVICE
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
                  <img :src="require('@/assets/svg/telegram.svg')" alt="" />
                </div>
                Telegram
              </div>
              <div class="arrown-icon">
                <img :src="require('@/assets/svg/arrow-left.svg')" alt="" />
              </div>
            </a>
          </li>
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <img :src="require('@/assets/svg/signal.svg')" alt="" />
                </div>
                Signal
              </div>
              <div class="arrown-icon">
                <img :src="require('@/assets/svg/arrow-left.svg')" alt="" />
              </div>
            </a>
          </li>
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <img :src="require('@/assets/svg/whatsapp.svg')" alt="" />
                </div>
                WhatsApp
              </div>
              <div class="arrown-icon">
                <img :src="require('@/assets/svg/arrow-left.svg')" alt="" />
              </div>
            </a>
          </li>
          <li class="list-item">
            <a href="#" class="contact-link">
              <div class="left-block">
                <div class="icon">
                  <img :src="require('@/assets/svg/simplex.svg')" alt="" />
                </div>
                SimpleX
              </div>
              <div class="arrown-icon">
                <img :src="require('@/assets/svg/arrow-left.svg')" alt="" />
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

@Component({
  components: {},
})
export default class MoreSettingsPage extends Vue {
  layout() {
    return 'mobile'
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
                  img {
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
