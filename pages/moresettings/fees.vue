<template>
  <div class="fees">
    <block-nav-back text="FEES" to="/moresettings" />
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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FeesPage extends Vue {
  layout() {
    return 'mobile'
  }

  fees = [
    {
      id: 1,
      name: 'Transfers',
      selected: true,
    },
    {
      id: 2,
      name: 'Cards',
      selected: false,
    },
    {
      id: 3,
      name: 'Oracle pay',
      selected: false,
    },
    {
      id: 4,
      name: 'WhiteList',
      selected: false,
    },
    {
      id: 5,
      name: 'Shops',
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
      title: 'Section 1',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 2,
      title: 'Section 1',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 3,
      title: 'Section 1',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 4,
      title: 'Section 1',
      description:
        'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
    },
    {
      id: 5,
      title: 'Section 1',
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
  .fees-list {
    width: calc(100% + 20px);
    display: flex;
    align-items: stretch;
    gap: 8px;
    overflow-x: auto;
    margin-left: -10px;
    padding: 0 10px;
    margin-bottom: 30px;
    &::-webkit-scrollbar {
      display: none;
    }
    .list-item {
      border: 1px solid transparent;
      background: #121119;
      border-radius: 8px;
      padding: 11px 18px;
      cursor: pointer;
      font-family: var(--third-family);
      white-space: nowrap;
      font-weight: 700;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0.8px;
      text-align: center;
      color: #fff;
      &.selected {
        border-color: #f64e2a;
      }
    }
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
