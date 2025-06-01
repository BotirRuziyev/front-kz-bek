<template>
  <div class="privacy-security">
    <div class="main-container">
      <block-nav-back to="/moresettings" text="Privacy and Security" />
      <form class="privacy-security__form">
        <div class="privacy-security__group">
          <input-oracle type="text" label="Email" v="yourmail@gmail.com" />
          <new-oracle-button class="update-btn" text="Update" />
        </div>
        <div class="privacy-security__group">
          <input-oracle type="password" label="Password" v="***********" />
          <new-oracle-button class="update-btn" text="Update" />
        </div>
      </form>
      <ul class="privacy-security__list">
        <li v-for="link in privacySecurity" :key="link.id" class="list-item">
          <app-feature-link
            :to="link.to"
            :src="link.img"
            :text="link.title"
            :val="link.status"
          />
        </li>
      </ul>
      <accordion-oracle />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PrivacySecurityPage extends Vue {
  private privacySecurity = [
    {
      id: 1,
      to: '/moresettings/privacy-security/password',
      img: require('@/assets/svg/moresettings/password-icon.svg'),
      title: 'Password',
      status: 'Set up',
    },
    {
      id: 2,
      to: '/moresettings/privacy-security/email',
      img: require('@/assets/svg/moresettings/mail-icon.svg'),
      title: 'Email',
      status: 'Set up',
    },
    {
      id: 3,
      to: '/moresettings/privacy-security/pin-code',
      img: require('@/assets/svg/moresettings/pin-code.svg'),
      title: 'Pin Code',
      status: 'Set up',
    },
    {
      id: 4,
      to: '/moresettings/privacy-security/telegram-auth',
      img: require('@/assets/svg/moresettings/telegram-authorization.svg'),
      title: 'Telegram Authorization',
      status: 'Set up',
    },
    {
      id: 5,
      to: '/moresettings/privacy-security/seed-code',
      img: require('@/assets/svg/moresettings/seed-code.svg'),
      title: 'Seed Code',
      status: 'Verify',
    },
  ]
}
</script>

<style lang="scss">
.privacy-security {
  padding-bottom: 24px;
  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
    .input {
      input {
        padding-right: 80px;
        font-weight: 400;
        color: #67639a;
      }
      &-eye {
        display: none;
      }
    }
  }
  &__group {
    position: relative;
    .new-oracle-button {
      width: auto;
      border-radius: 8px;
      padding: 10px 13px;
      position: absolute;
      bottom: 4px;
      right: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: #fff;
    }
  }
  &__list {
    margin-bottom: 24px;
  }
}
</style>
