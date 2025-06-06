<template>
  <div class="account-settings">
    <block-nav-back text="ACCOUNT SETTINGS & SECURITY" to="/moresettings" />
    <div class="change-password">
      <div class="left-content">
        <p class="label">Password</p>
        <input
          class="password-input"
          type="password"
          placeholder="**********"
          value="1234567890"
          disabled
        />
      </div>
      <nuxt-link to="/moresettings/account/change-password" class="change-link">
        Change
      </nuxt-link>
    </div>
    <div class="additional-security">
      <h1 class="block-title">additional security</h1>
      <ul class="additional-security__list">
        <li class="list-item additional-security__card border-gradient">
          <div class="left-blur"></div>
          <div class="card-in">
            <div class="card-body">
              <div class="left-block">
                <h5 class="card-title">Email Address Authorization</h5>
                <p class="card-description">
                  Recover your account if you <br />
                  forget your password
                  <button class="info-icon">
                    <infoCircleIcon />
                    <div class="info-text">Lorem ipsum dolor sit amet.</div>
                  </button>
                </p>
              </div>
              <div class="additional-security__status">
                <div v-if="!auth" class="status-active">
                  <tickCircleIcon />
                </div>
                <div v-else class="status-inactive">
                  <closeCircleIcon />
                </div>
              </div>
            </div>
            <p v-if="!auth" class="card-text__orange">
              Email address: user@gmail.com
            </p>
            <button-oracle
              :text="!auth ? 'CHANGE Email Address' : 'CONNECT YOUR EMAIL NOW'"
              color="orange"
              :to="
                !auth
                  ? '/moresettings/account/change-email-address'
                  : '/moresettings/account/email-auth'
              "
            />
          </div>
        </li>
        <li class="list-item additional-security__card border-gradient">
          <div class="left-blur"></div>
          <div class="card-in">
            <div class="card-body">
              <div class="left-block">
                <h5 class="card-title">Telegram Authorization</h5>
                <p class="card-description">
                  Log in with one click and enhance <br />
                  your account's security
                  <button class="info-icon">
                    <infoCircleIcon />
                    <div class="info-text">Lorem ipsum dolor sit amet.</div>
                  </button>
                </p>
              </div>
              <div class="additional-security__status">
                <div v-if="auth" class="status-active">
                  <tickCircleIcon />
                </div>
                <div v-else class="status-inactive">
                  <closeCircleIcon />
                </div>
              </div>
            </div>
            <p class="card-text__orange">Linked account: @UserUser</p>
            <button-oracle
              :text="auth ? 'CHANGE LINKED ACCOUNT' : 'CONNECT YOUR LINKED NOW'"
              color="orange"
              :to="
                auth
                  ? '/moresettings/account/change-link-address'
                  : '/moresettings/account/telegram-auth'
              "
            />
          </div>
        </li>
        <li class="list-item additional-security__card border-gradient">
          <div class="left-blur"></div>
          <div class="card-in">
            <div class="card-body">
              <div class="left-block">
                <h5 class="card-title">PIN Code</h5>
                <p class="card-description">
                  Protect your funds even if your phone <br />
                  is compromised
                  <button class="info-icon">
                    <infoCircleIcon />
                    <div class="info-text">Lorem ipsum dolor sit amet.</div>
                  </button>
                </p>
              </div>
              <div class="additional-security__status">
                <div v-if="auth" class="status-active">
                  <tickCircleIcon />
                </div>
                <div v-else class="status-inactive">
                  <closeCircleIcon />
                </div>
              </div>
            </div>
            <p class="card-text__orange">Set PIN Code: ••••</p>
            <button-oracle
              text="CHANGE PIN Code now"
              color="orange"
              to="/moresettings/account/insert-pincode"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="active-session">
      <h1 class="block-title">ACTIVE SEssiONS</h1>
      <ul class="active-session__list">
        <li
          v-for="session in activeSession"
          :key="session.id"
          class="list-item"
        >
          <div
            class="accordion-btn"
            :class="{ show: session.active }"
            @click="sessionShow(session.id)"
          >
            <div class="left-block">
              <div class="session-icon">
                <mobileIcon />
              </div>
              <p class="session-title">{{ session.title }}</p>
            </div>
            <div class="arrown-icon">
              <arrowIcon />
            </div>
          </div>
          <div class="terminal-session" :class="{ show: session.active }">
            <div class="terminal-session-in">
              <button class="current-session">Current session</button>
              <button
                class="terminate-access"
                @click="terminateAccess(session.id)"
              >
                Terminate Access
              </button>
            </div>
          </div>
        </li>
        <li
          v-if="activeSession.length > 0"
          class="list-item terminate-all-sessions"
        >
          <button
            class="terminate-all-sessions__btn"
            @click="activeSession = []"
          >
            Terminate All the Sessions
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import infoCircleIcon from '@/assets/svg/info-circle.svg?inline'
// @ts-ignore
import tickCircleIcon from '@/assets/svg/tick-circle.svg?inline'
// @ts-ignore
import closeCircleIcon from '@/assets/svg/close-circle.svg?inline'
// @ts-ignore
import mobileIcon from '@/assets/svg/mobile-icon.svg?inline'
// @ts-ignore
import arrowIcon from '@/assets/svg/arrow-back.svg?inline'

@Component({
  components: {
    infoCircleIcon,
    tickCircleIcon,
    closeCircleIcon,
    mobileIcon,
    arrowIcon,
  },
})
export default class AccountPage extends Vue {
  auth = true

  layout() {
    return 'mobile'
  }

  private activeSession = [
    {
      id: 1,
      title: 'iOS - Mobile Safari 17.0',
      active: false,
    },
    {
      id: 2,
      title: 'iOS - Mobile Safari 17.0',
      active: true,
    },
  ]

  sessionShow(id: number) {
    this.activeSession = this.activeSession.map((session) => ({
      ...session,
      active: session.id === id ? !session.active : false,
    }))
  }

  terminateAccess(id: number) {
    this.activeSession = this.activeSession.filter(
      (session) => session.id !== id
    )
  }
}
</script>

<style lang="scss">
.account-settings {
  .block-title {
    margin-bottom: 24px;
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
  }
  .change-password {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1e1d26;
    border-radius: 6px;
    padding: 16px 12px;
    margin-bottom: 35px;
    .left-content {
      .label {
        margin-bottom: 10px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        line-height: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
      .password-input {
        height: 10px;
        display: block;
        background: transparent;
        border: 0;
        outline: none;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        line-height: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .change-link {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      color: #f64e2a;
    }
  }
  .additional-security {
    margin-bottom: 35px;
    &__list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .additional-security__card {
        border-radius: 12px;
        overflow: hidden;
        .card-in {
          padding: 20px 16px;
        }
        .card-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
          .left-block {
            .card-title {
              margin-bottom: 5px;
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #fff;
            }
            .card-description {
              display: flex;
              align-items: center;
              gap: 15px;
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.6);
              .info-icon {
                line-height: 0;
                cursor: pointer;
                position: relative;
                &:hover {
                  .info-text {
                    opacity: 1;
                    visibility: visible;
                  }
                }
                .info-text {
                  display: block;
                  width: 120px;
                  background: #1e1d26;
                  position: absolute;
                  bottom: calc(100% + 10px);
                  left: 50%;
                  transform: translateX(-50%);
                  padding: 3px 5px;
                  border-radius: 5px;
                  font-family: var(--font-family);
                  font-weight: 400;
                  font-size: 9px;
                  line-height: 100%;
                  color: rgba(255, 255, 255, 0.6);
                  visibility: hidden;
                  opacity: 0;
                  transition: 0.2s;

                  &::before {
                    content: '';
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-top: 8px solid #1e1d26;
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                  }
                }
              }
            }
          }
          .additional-security__status {
            .status-active {
              svg {
                path {
                  fill: #1b961f;
                }
              }
            }
          }
        }
        .card-text__orange {
          margin: 18px 0 15px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          line-height: 9px;
          color: #f64e2a;
        }
        button {
          &.orange {
            height: 32px;
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .active-session {
    &__list {
      background: #121119;
      border-radius: 12px;
      overflow: hidden;
      .list-item {
        .accordion-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px;
          border-bottom: 1px solid #1d1c24;
          cursor: pointer;
          .arrown-icon {
            transition: 0.2s;
          }
          &.show {
            .arrown-icon {
              transform: rotate(-180deg);
            }
          }
        }
        .terminal-session {
          height: 0;
          overflow: hidden;
          transition: 0.2s;
          &.show {
            height: 53px;
          }
          &-in {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 16px;
            .current-session {
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 14px;
              color: rgba(255, 255, 255, 0.6);
            }
            .terminate-access {
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 14px;
              color: #f64e2a;
            }
          }
        }

        &.terminate-all-sessions {
          background: rgba(255, 255, 255, 0.05);
          padding: 18px 16px;
          .terminate-all-sessions__btn {
            width: 100%;
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            text-align: center;
            line-height: 17px;
            color: #f64e2a;
          }
        }
        &:last-child {
          border: none;
        }
        .left-block {
          display: flex;
          align-items: center;
          gap: 15px;
          .session-title {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            color: #fff;
          }
        }
        .arrown-icon {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
}
</style>
