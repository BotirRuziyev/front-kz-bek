<template>
  <div class="lang-settings">
    <div class="main-container">
      <block-nav-back to="/moresettings" text="Language" />
      <ul class="lang-list">
        <li
          v-for="lang of languages"
          :key="lang.id"
          class="list-item"
          @click="selectLang(lang.id)"
        >
          <div class="left-block">
            <div class="lang-info">
              <h5 class="lang-name">{{ lang.name }}</h5>
            </div>
          </div>
          <div class="selected-icon" :class="{ selected: lang.selected }">
            <tickCircleIcon />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import tickCircleIcon from '@/assets/svg/check-icon.svg?inline'

@Component({
  components: {
    tickCircleIcon,
  },
})
export default class LanguagePage extends Vue {
  private languages = [
    {
      id: 1,
      name: 'English',
      selected: true,
    },
    {
      id: 2,
      name: 'Russian (Русский)',
      selected: false,
    },
    {
      id: 3,
      name: 'Chinese (中文)',
      selected: false,
    },
    {
      id: 4,
      name: 'Spanish (Español)',
      selected: false,
    },
    {
      id: 5,
      name: 'French (Français)',
      selected: false,
    },
  ]

  selectLang(id: number) {
    this.languages = this.languages.map((lang) => ({
      ...lang,
      selected: lang.id === id,
    }))
  }
}
</script>

<style lang="scss" scoped>
.lang-settings {
  .input {
    margin-bottom: 35px;
  }
  .lang-list {
    display: flex;
    flex-direction: column;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 16px 13px 4px;
      margin-right: -16px;
      cursor: pointer;
      border-bottom: 1px solid #2b2741;
      .left-block {
        display: flex;
        align-items: center;
        gap: 15px;
        .lang-info {
          .lang-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
          }
        }
      }
      .selected-icon {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #2b2b2b;
        border-radius: 50%;
        transition: 0.2s;
        svg {
          opacity: 0;
          transition: 0.2s;
        }
        &.selected {
          background: #f64e2a;
          border-color: #f64e2a;
          svg {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
