<template>
  <div class="fees">
    <div class="main-container">
      <block-nav-back text="Fees" to="/moresettings" />
      <ul class="fees-list">
        <div
          v-for="item in fees"
          :key="item.id"
          class="list-item"
          :class="item.selected ? 'selected' : ''"
          @click="selectedFees(item.id)"
        >
          {{ item.name }}
        </div>
      </ul>
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
export default class FeesPage extends Vue {
  fees = [
    {
      id: 1,
      name: 'Escrow',
      selected: true,
    },
    {
      id: 2,
      name: 'P2P',
      selected: false,
    },
    {
      id: 3,
      name: 'Checks',
      selected: false,
    },
    {
      id: 4,
      name: 'Mixing',
      selected: false,
    },
    {
      id: 5,
      name: 'SWAP',
      selected: false,
    },
    {
      id: 6,
      name: 'Chats',
      selected: false,
    },
    {
      id: 7,
      name: 'Escrow',
      selected: false,
    },
    {
      id: 8,
      name: 'P2P',
      selected: false,
    },
    {
      id: 9,
      name: 'Checks',
      selected: false,
    },
    {
      id: 10,
      name: 'Mixing',
      selected: false,
    },
    {
      id: 11,
      name: 'SWAP',
      selected: false,
    },
    {
      id: 12,
      name: 'Bills',
      selected: false,
    },
    {
      id: 13,
      name: 'Other',
      selected: false,
    },
  ]

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

  selectedFees(id: number) {
    this.fees = this.fees.map((fees) => ({ ...fees, selected: fees.id === id }))
  }
}
</script>

<style lang="scss">
.fees {
  padding-bottom: 24px;
  .fees-list {
    width: calc(100% + 32px);
    display: flex;
    align-items: stretch;
    gap: 8px;
    overflow-x: auto;
    margin-left: -16px;
    padding: 0 16px;
    margin-bottom: 30px;
    &::-webkit-scrollbar {
      display: none;
    }
    .list-item {
      background: #13121b;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      white-space: nowrap;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      text-align: center;
      color: #fff;
      transition: 0.2s;
      &:hover {
        background: #2b2741;
      }
      &.selected {
        background: #f64e2a;
      }
    }
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
