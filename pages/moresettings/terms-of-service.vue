<template>
  <div class="terms-of-service">
    <div class="main-container">
      <block-nav-back text="Terms of Service" to="/moresettings" />
      <block-title-oracle text="Oracle netowrk version from 03 march" />
      <ul class="section-list">
        <li v-for="(section, index) in sections" :key="index" class="list-item">
          <h4 class="list-title">{{ section.title }}</h4>
          <p class="list-description">
            {{ section.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TermsOfServicePage extends Vue {
  sections = [
    {
      id: 1,
      title: 'Your request',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 2,
      title: 'Your request',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 3,
      title: 'Your request',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 4,
      title: 'Your request',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 5,
      title: 'Your request',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
  ]
}
</script>

<style lang="scss">
.terms-of-service {
  padding-bottom: 24px;
  .block-title-oracle {
    display: block;
    margin-bottom: 24px;
  }
  .section-list {
    .list-item {
      padding: 12px 0;
      .list-title {
        margin-bottom: 8px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
      .list-description {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 12px;
        line-height: 140%;
        color: #fff;
      }
    }
  }
}
</style>
