<template>
  <div class="terms-of-service">
    <block-nav-back text="TERMS OF SERVICE" to="/moresettings" />
    <block-title-oracle
      text="ORACLE NETWORK VERSION FROM 03 MARCH 2025 15:30
    EST MILITARY TIME"
    />
    <ul class="section-list">
      <li v-for="(section, index) in sections" :key="index" class="list-item">
        <h4 class="list-title">{{ section.title }}</h4>
        <p class="list-description">
          {{ section.description }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TermsOfServicePage extends Vue {
  layout() {
    return 'mobile'
  }

  sections = [
    {
      id: 1,
      title: 'Section 1',
      description: 'Lörem ipsum dekagönes patesade, pys tinde. ',
    },
    {
      id: 2,
      title: 'Section 1',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.  ',
    },
    {
      id: 3,
      title: 'Section 1',
      description: 'Lörem ipsum dekagönes patesade, pys tinde. ',
    },
    {
      id: 4,
      title: 'Section 1',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.  ',
    },
  ]
}
</script>

<style lang="scss">
.terms-of-service {
  .block-title-oracle {
    display: block;
    margin-bottom: 45px;
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: normal;
    color: rgba(255, 255, 255, 0.5);
  }
  .section-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    .list-item {
      .list-title {
        margin-bottom: 18px;
        font-family: var(--font3);
        font-weight: 700;
        font-size: 16px;
        color: #fff;
      }
      .list-description {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
