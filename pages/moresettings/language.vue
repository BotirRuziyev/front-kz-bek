<template>
  <div class="lang-settings">
    <block-nav-back to="/moresettings" text="LANGUAGE" />
    <input-oracle
      type="text"
      :search="true"
      placeholder="Search..."
      @changed="filterLanguages"
    />
    <ul class="lang-list">
      <li
        v-for="lang of filteredLanguages"
        :key="lang.id"
        class="list-item"
        @click="selectLang(lang.id)"
      >
        <div class="left-block">
          <div class="lang-icon">
            <img :src="lang.image" alt="" />
          </div>
          <div class="lang-info">
            <h5 class="lang-name">{{ lang.name }}</h5>
            <p class="lang-description">
              {{ lang.description }}
            </p>
          </div>
        </div>
        <div v-if="lang.selected" class="selected-icon">
          <img :src="require('@/assets/svg/tick-circle.svg')" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LanguagePage extends Vue {
  private searchQuery = ''
  private languages = [
    {
      id: 1,
      image: require('@/assets/svg/united-states-flag.svg'),
      name: 'English',
      description: 'Choose this to display the interface in English',
      selected: true,
    },
    {
      id: 2,
      image: require('@/assets/svg/russia-flag.svg'),
      name: 'Русский (Russian)',
      description: 'Выберите, чтобы интерфейс отображался на русском',
      selected: false,
    },
    {
      id: 3,
      image: require('@/assets/svg/china-flag.svg'),
      name: '中文 (Chinese)',
      description: '选择此语言以将界面显示为中文',
      selected: false,
    },
    {
      id: 4,
      image: require('@/assets/svg/spain-flag.svg'),
      name: 'Español (Spainish)',
      description: 'Elija este idioma para mostrar la interfaz en español',
      selected: false,
    },
    {
      id: 5,
      image: require('@/assets/svg/france-flag.svg'),
      name: 'Français (French)',
      description:
        "Choisissez cette langue pour afficher l'interface en français",
      selected: false,
    },
  ]

  private filteredLanguages = [...this.languages]

  private filterLanguages(value: string): void {
    this.searchQuery = value
    this.filteredLanguages = this.languages.filter((lang) =>
      lang.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  selectLang(id: number) {
    this.filteredLanguages = this.filteredLanguages.map((lang) => ({
      ...lang,
      selected: lang.id === id,
    }))
  }

  layout() {
    return 'mobile'
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
    gap: 30px;
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 6px;
      cursor: pointer;
      .left-block {
        display: flex;
        align-items: center;
        gap: 15px;
        .lang-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .lang-info {
          .lang-name {
            margin-bottom: 7px;
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 16px;
            line-height: 11px;
            color: #fff;
          }
          .lang-description {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 10px;
            line-height: 100%;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
  }
}
</style>
