<template>
  <div class="more-main">
    <div class="main-container">
      <BlockNavBack text="Seetings" />
      <input-oracle
        search="true"
        placeholder="Search..."
        @changed="filterSettings"
      />
      <nuxt-link to="/moresettings/personal-account" class="app-profile-tile">
        <div class="app-profile-tile__avatar">
          <UserIcon />
        </div>
        <div class="app-profile-tile__info">
          <div class="app-profile-tile__name">Name surname</div>
          <div class="app-profile-tile__nickname">Nickname</div>
        </div>
        <div class="app-profile-tile__arrow">
          <ArrowRightIcon />
        </div>
      </nuxt-link>

      <div class="more-main__content">
        <ul class="more-settings__list d-flex flex-column">
          <li
            v-for="setting in filteredmoreSettins"
            :key="setting.id"
            class="list-item"
          >
            <app-feature-link
              :to="setting.to"
              :src="setting.img"
              :text="setting.title"
            />
          </li>
        </ul>
        <div class="more-contact">
          <h1 class="contact-title">Contacts</h1>
          <ul class="contact-list">
            <li v-for="contact of contacts" :key="contact.id" class="list-item">
              <app-feature-link
                :to="contact.to"
                :src="contact.src"
                :text="contact.name"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ArrowRightIcon from '@/assets/svg/arrow-left.svg?inline'
// @ts-ignore
import UserIcon from '@/assets/svg/user-icon.svg?inline'

@Component({
  components: {
    ArrowRightIcon,
    UserIcon,
  },
})
export default class MoreSettingsPage extends Vue {
  private searchQuery = ''

  private moreSettins = [
    {
      id: 1,
      to: '/moresettings/privacy-security',
      img: require('@/assets/svg/moresettings/privacy-icon.svg'),
      title: 'Privacy and Security',
    },
    {
      id: 2,
      to: '/moresettings/oracle-pay',
      img: require('@/assets/svg/moresettings/oracle-pay-icon.svg'),
      title: 'Oracle Pay',
    },
    {
      id: 3,
      to: '/moresettings/language',
      img: require('@/assets/svg/moresettings/lang-icon.svg'),
      title: 'Language',
    },
    {
      id: 4,
      to: '/moresettings/payment-methods',
      img: require('@/assets/svg/moresettings/payment-icon.svg'),
      title: 'Payment methods',
    },
    {
      id: 5,
      to: '/moresettings/tickets',
      img: require('@/assets/svg/moresettings/ticket-icon.svg'),
      title: 'Tickets',
    },
    {
      id: 6,
      to: '/moresettings/fees',
      img: require('@/assets/svg/moresettings/fees-icon.svg'),
      title: 'Fees',
    },
    {
      id: 7,
      to: '/moresettings/terms-of-service',
      img: require('@/assets/svg/moresettings/terms-icon.svg'),
      title: 'Terms of Service',
    },
  ]

  private contacts = [
    {
      id: 1,
      to: '#',
      src: require('@/assets/svg/telegram-icon.svg'),
      name: 'Telegram',
    },
    {
      id: 2,
      to: '#',
      src: require('@/assets/svg/signal.svg'),
      name: 'Signal',
    },
    {
      id: 3,
      to: '#',
      src: require('@/assets/svg/whatsapp.svg'),
      name: 'WhatsApp',
    },
    {
      id: 4,
      to: '#',
      src: require('@/assets/svg/simplex.svg'),
      name: 'SimpleX',
    },
  ]

  private filteredmoreSettins = [...this.moreSettins]

  private filterSettings(value: string): void {
    this.searchQuery = value
    this.filteredmoreSettins = this.moreSettins.filter((setting) =>
      setting.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }
}
</script>
<style lang="scss">
.more-main {
  min-height: calc(100vh - 85px);
  padding: 0 0 20px;
  .input {
    margin-bottom: 18px;
  }
  .app-profile-tile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #13121b;
    border-radius: 12px;
    padding: 12px 8px 12px 12px;
    margin-bottom: 16px;
    transition: 0.2s;
    &:hover {
      background: #2b2741;
    }
    &__avatar {
      border-radius: 50%;
      width: 42px;
      height: 42px;
      min-width: 42px;
      background: #1e1d28;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__info {
      width: 100%;
    }
    &__name {
      margin-bottom: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &__nickname {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #7a74ba;
    }
    &__arrow {
      width: 32px;
      height: 32px;
      min-width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          stroke: #7a74ba;
        }
      }
    }
  }
  &__content {
    .more-settings__list {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
    }
    .more-contact {
      .contact-title {
        margin-bottom: 18px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 18px;
        line-height: 140%;
        color: #fff;
      }
      .feature-link__item {
        min-height: 52px;
      }
    }
  }
}
</style>
