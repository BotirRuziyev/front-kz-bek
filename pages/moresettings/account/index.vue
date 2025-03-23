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
                  <span class="info-icon">
                    <img
                      :src="require('@/assets/svg/info-circle.svg')"
                      alt=""
                    />
                  </span>
                </p>
              </div>
              <div class="additional-security__status">
                <div v-if="!auth" class="status-active">
                  <img :src="require('@/assets/svg/tick-circle.svg')" alt="" />
                </div>
                <div v-else class="status-inactive">
                  <img :src="require('@/assets/svg/close-circle.svg')" alt="" />
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
                  <span class="info-icon">
                    <img
                      :src="require('@/assets/svg/info-circle.svg')"
                      alt=""
                    />
                  </span>
                </p>
              </div>
              <div class="additional-security__status">
                <div v-if="auth" class="status-active">
                  <img :src="require('@/assets/svg/tick-circle.svg')" alt="" />
                </div>
                <div v-else class="status-inactive">
                  <img :src="require('@/assets/svg/close-circle.svg')" alt="" />
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
                  <span class="info-icon">
                    <img
                      :src="require('@/assets/svg/info-circle.svg')"
                      alt=""
                    />
                  </span>
                </p>
              </div>
              <div class="additional-security__status">
                <div v-if="auth" class="status-active">
                  <img :src="require('@/assets/svg/tick-circle.svg')" alt="" />
                </div>
                <div v-else class="status-inactive">
                  <img :src="require('@/assets/svg/close-circle.svg')" alt="" />
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
        <li class="list-item">
          <div class="left-block">
            <div class="session-icon">
              <img :src="require('@/assets/svg/mobile-icon.svg')" alt="" />
            </div>
            <p class="session-title">iOS - Mobile Safari 17.0</p>
          </div>
          <div class="arrown-icon">
            <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
          </div>
        </li>
        <li class="list-item show">
          <div class="left-block">
            <div class="session-icon">
              <img :src="require('@/assets/svg/mobile-icon.svg')" alt="" />
            </div>
            <p class="session-title">iOS - Mobile Safari 17.0</p>
          </div>
          <div class="arrown-icon">
            <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
          </div>
        </li>
        <li class="list-item terminal-session">
          <p class="current-session">Current session</p>
          <p class="terminate-access">Terminate Access</p>
        </li>
        <li class="list-item terminate-all-sessions">
          <p class="terminate-all-sessions__btn">Terminate All the Sessions</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class AccountPage extends Vue {
  auth = true

  layout() {
    return 'mobile'
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
              }
            }
          }
          .additional-security__status {
            .status-active {
              img {
                filter: brightness(0) saturate(100%) invert(33%) sepia(92%)
                  saturate(703%) hue-rotate(81deg) brightness(111%)
                  contrast(87%);
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 16px;
        border-bottom: 1px solid #1d1c24;

        &.show {
          .arrown-icon {
            transform: rotate(-180deg);
          }
        }
        &.terminal-session {
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
        &.terminate-all-sessions {
          background: rgba(255, 255, 255, 0.05);
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
          img {
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
}
</style>
