<template>
  <div class="checks-main">
    <div class="checks-main__content">
      <block-nav-back
        to="#"
        addto="/checks/check-creation?step=1"
        text="Checks"
        :add="true"
      />
      <block-home />
      <button
        class="coin-selected__btn"
        @click=";(filterModal = true), $nuxt.$emit('open-modal')"
      >
        <span v-if="selectedItems.length == 0">All crypto</span>
        <span v-else class="selected-coin">
          <span v-for="(item, i) in selectedItems" :key="i">{{ item }},</span>
        </span>
        <span class="arrow-icon">
          <ArrowIcon />
        </span>
      </button>
      <div class="checks-filter">
        <div class="filter-head">
          <div class="filter-buttons">
            <button
              class="filter-btn"
              :class="{ active: filter === 'All' }"
              @click="setFilter('All')"
            >
              All Checks
            </button>
            <button
              class="filter-btn"
              :class="{ active: filter === 'Claimed' }"
              @click="setFilter('Claimed')"
            >
              Claimed Checks
            </button>
            <button
              class="filter-btn"
              :class="{ active: filter === 'Unclaimed' }"
              @click="setFilter('Unclaimed')"
            >
              Unclaimed Checks
            </button>
          </div>
          <div class="dropdown">
            <button class="arrow-sort__btn" @click="dropdown = !dropdown">
              <ArrowSortIcon />
            </button>
            <div class="dropdown-menu" :class="{ show: dropdown }">
              <div class="dropdown-item">
                <button
                  class="sort-btn"
                  :class="{ active: sortDropdownType === 'sum' }"
                  @click="sortChecks('sum')"
                >
                  по сумме
                </button>
              </div>
              <div class="dropdown-item">
                <button
                  class="sort-btn"
                  :class="{ active: sortDropdownType === 'date' }"
                  @click="sortChecks('date')"
                >
                  времени
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="checks-list">
          <nuxt-link
            v-for="(check, index) in filteredAndSortedChecks"
            :key="index"
            to="/checks/check-creation/check-details"
            class="check-item"
          >
            <div class="check-item__in">
              <div class="checks-info">
                <span class="check-amount">{{ check.amount }}</span>
                <span class="check-usdvalue"> ≈ {{ check.usdValue }} </span>
              </div>
            </div>
            <div class="check-item__in">
              <div class="checks-info">
                Remaining Activations
                <span class="check-remaining">
                  {{ check.remaining }}
                </span>
              </div>
              <div class="checks-info">
                Per Activation
                <span class="item">
                  <span class="check-per__activation">
                    {{ check.perActivation }}
                  </span>
                  <span class="check-rate"> ≈ {{ check.rate }} </span>
                </span>
              </div>
            </div>
            <div class="check-item__in">
              <div class="checks-info">
                <span
                  class="check-status"
                  :class="check.status === 'Claimed' ? 'claimed' : 'unclaimed'"
                  >{{ check.status }}
                </span>
              </div>
              <div class="checks-info">
                Created On:
                <span class="check-createdOn"> ≈ {{ check.createdOn }}</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <draggable-modal
      class="filter-modal"
      :is-open="filterModal"
      @close="filterModal = false"
    >
      <h3 class="modal-title">Filter</h3>
      <button class="select-all" @click="toggleAllCheck">
        <checkbox-oracle :checked="allCheck" />
        <span>Select all coin </span>
      </button>
      <ul class="cripto-list">
        <li v-for="cripto of data" :key="cripto.id" class="list-item">
          <button class="cripto-button" @click="addSelected(cripto.name)">
            <div class="form-control">
              <checkbox-oracle :checked="cripto.selected || allCheck" />
            </div>
            <div class="right-block">
              <div class="icon">
                <img :src="cripto.img" alt="" />
              </div>
              <div class="coin-body">
                <div class="body-head">
                  <p class="cripto-name">
                    {{ cripto.name }}
                  </p>
                  <p class="cripto-amound">0,0244 TON</p>
                </div>
                <div class="body-bottom">
                  <p class="cripto-card">***2343</p>
                  <p class="cripto-price">≈ 1000.4$</p>
                </div>
              </div>
            </div>
          </button>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

// @ts-ignore
import ArrowIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import ArrowSortIcon from '@/assets/svg/arrow-sort.svg?inline'

interface CheckItem {
  amount: string
  usdValue: string
  remaining: string
  perActivation: string
  rate: string
  status: 'Claimed' | 'Unclaimed'
  createdOn: string
}
interface Item {
  id: number
  img: string
  name: string
  selected: boolean
}
@Component({
  components: {
    ArrowIcon,
    ArrowSortIcon,
  },
})
export default class ChecksPage extends Vue {
  allCheck = false
  filterModal = false
  dropdown: boolean = false
  filter: string = 'All'
  sortDropdownType: 'sum' | 'date' | null = 'sum'
  sortAsc: boolean = true
  selectedItems: string[] = []

  localData: Item[] = []

  data = [
    {
      id: 1,
      img: require('@/assets/svg/litecoin-ltc.svg'),
      name: 'Litecoin',
      selected: false,
    },
    {
      id: 2,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'XRP',
      selected: false,
    },
    {
      id: 3,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'Bitcoin',
      selected: false,
    },
    {
      id: 4,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'Etherium',
      selected: false,
    },
    {
      id: 5,
      img: require('@/assets/svg/tether-usdt.svg'),
      name: 'USDT',
      selected: false,
    },
    {
      id: 6,
      img: require('@/assets/svg/tether-usdt.svg'),
      name: 'BNB',
      selected: false,
    },
  ]

  allChecks: CheckItem[] = [
    {
      amount: '15 LTC',
      usdValue: '$12 489',
      remaining: '5 of 10',
      perActivation: '1 LTC',
      rate: '$900',
      status: 'Unclaimed',
      createdOn: 'Dec 12, 2024',
    },
    {
      amount: '11 LTC',
      usdValue: '$10 365',
      remaining: '10 of 10',
      perActivation: '1 LTC',
      rate: '$900',
      status: 'Claimed',
      createdOn: 'Dec 10, 2024',
    },
    {
      amount: '8 LTC',
      usdValue: '$7 225',
      remaining: '5 of 10',
      perActivation: '1 LTC',
      rate: '$900',
      status: 'Unclaimed',
      createdOn: 'Dec 09, 2024',
    },
    {
      amount: '10 LTC',
      usdValue: '$9 200',
      remaining: '5 of 10',
      perActivation: '1 LTC',
      rate: '$900',
      status: 'Unclaimed',
      createdOn: 'Dec 15, 2024',
    },
  ]

  mounted() {
    document.addEventListener('click', this.ClickOutside)
  }

  beforeDestroy() {
    document.removeEventListener('click', this.ClickOutside)
  }

  ClickOutside(event: MouseEvent) {
    const dropdownEl = this.$el.querySelector('.dropdown')
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      this.dropdown = false
    }
  }

  get filteredAndSortedChecks(): CheckItem[] {
    let result = [...this.allChecks]

    // Filterlash
    if (this.filter === 'Claimed') {
      result = result.filter((item) => item.status === 'Claimed')
    } else if (this.filter === 'Unclaimed') {
      result = result.filter((item) => item.status === 'Unclaimed')
    }

    // Sortlash
    if (this.sortDropdownType === 'sum') {
      result.sort((a, b) => {
        const aVal = parseFloat(
          a.usdValue.replace(/[^\d.-]/g, '').replace(/\s/g, '')
        )
        const bVal = parseFloat(
          b.usdValue.replace(/[^\d.-]/g, '').replace(/\s/g, '')
        )
        return this.sortAsc ? bVal - aVal : aVal - bVal
      })
    } else if (this.sortDropdownType === 'date') {
      result.sort((a, b) => {
        const aDate = new Date(a.createdOn)
        const bDate = new Date(b.createdOn)
        return this.sortAsc
          ? bDate.getTime() - aDate.getTime()
          : aDate.getTime() - bDate.getTime()
      })
    }

    return result
  }

  setFilter(value: string) {
    this.filter = value
  }

  sortChecks(criteria: 'sum' | 'date') {
    if (this.sortDropdownType === criteria) {
      this.sortAsc = true
    } else {
      this.sortDropdownType = criteria
      this.sortAsc = true
    }
  }

  created() {
    this.localData = [...this.data]
  }

  @Watch('data', { deep: true })
  onDataChange(newVal: Item[]) {
    this.localData = [...newVal]
  }

  addSelected(name: string) {
    this.localData.forEach((item) => {
      if (item.name === name) {
        this.$set(item, 'selected', !item.selected)
      }
    })
    const index = this.selectedItems.indexOf(name)
    if (index !== -1) {
      this.selectedItems.splice(index, 1)
    } else {
      this.selectedItems.push(name)
    }

    this.allCheck = this.localData.every((item) => item.selected === true)

    this.$emit('update', this.localData)
  }

  private toggleAllCheck() {
    this.allCheck = !this.allCheck

    this.localData.forEach((item) => {
      this.$set(item, 'selected', this.allCheck)
    })

    this.selectedItems = this.allCheck
      ? this.localData.map((item) => item.name)
      : []

    this.$emit('update', this.localData)
  }
}
</script>
<style lang="scss">
.checks-main {
  max-width: 375px;
  margin: 0 auto;
  min-height: calc(100vh - 85px);
  padding: 0 16px 24px;
  .home-block {
    margin-bottom: 24px;
  }

  .input {
    margin-bottom: 18px;
  }

  &__content {
    .coin-selected__btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #1d1c25;
      border-radius: 12px;
      padding: 12px 16px 12px 12px;
      margin-bottom: 20px;
      cursor: pointer;
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 120%;
      color: #fff;
      .selected-coin {
        max-width: calc(100% - 20px);
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        gap: 5px;
        &::-webkit-scrollbar {
          height: 0;
        }
      }
      .arrow-icon {
        transform: rotate(-90deg);
        svg {
          path {
            stroke: #fff;
          }
        }
      }
    }
    .checks-filter {
      .filter-head {
        display: flex;
        align-items: center;
        gap: 18px;
        margin-bottom: 20px;
        .filter-buttons {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .filter-btn {
            position: relative;
            padding-bottom: 6px;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 135%;
            color: #fff;
            &.active {
              &::after {
                width: 46px;
              }
            }
            &::after {
              content: '';
              border-radius: 10px;
              width: 0;
              height: 2px;
              background: #f64e2a;
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
              transition: 0.3s;
            }
          }
        }
        .dropdown {
          position: relative;
          .arrow-sort__btn {
            cursor: pointer;
          }
          .dropdown-menu {
            min-width: 100px;
            border-radius: 5px;
            position: absolute;
            top: calc(100% + 15px);
            right: 0;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transition: 0.2s;
            &.show {
              opacity: 1;
              visibility: visible;
              top: calc(100% + 5px);
            }
            .dropdown-item {
              .sort-btn {
                width: 100%;
                padding: 5px 10px;
                background: #13121b;
                white-space: nowrap;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                font-weight: 300;
                font-size: 12px;
                line-height: 140%;
                text-align: left;
                color: #fff;
                transition: 0.2s;
                &.active {
                  background: #181720;
                }
              }
            }
          }
        }
      }
      .checks-list {
        width: calc(100% + 32px);
        margin-left: -16px;
        .check-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-bottom: 1px solid #2b2741;
          padding: 12px 16px;
          &__in {
            &:nth-child(2) {
              display: flex;
              .checks-info {
                flex: 1 1 50%;
                flex-direction: column;
                align-items: start;
                .item {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                }
              }
            }
            &:nth-child(3) {
              display: flex;
              gap: 8px;
            }
          }
          .checks-info {
            display: flex;
            align-items: center;
            gap: 4px;
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: 12px;
            line-height: 140%;
            color: #fff;
            .check-amount {
              font-family: 'Hector', sans-serif;
              font-weight: 400;
              font-size: 20px;
              line-height: 120%;
              color: #fff;
            }
            .check-usdvalue {
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 12px;
              line-height: 135%;
              color: #7a74ba;
            }
            .check-remaining {
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 14px;
              line-height: 130%;
              color: #fff;
            }
            .check-per__activation {
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 14px;
              line-height: 130%;
              color: #fff;
            }
            .check-rate {
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 12px;
              line-height: 140%;
              color: #fff;
            }
            .check-status {
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 12px;
              line-height: 135%;
              color: #31f62a;
              &.claimed {
                color: #f6c32a;
              }
            }
            .check-createdOn {
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 12px;
              line-height: 135%;
              color: #7a74ba;
            }
          }
        }
      }
    }
  }
  .filter-modal {
    display: flex;
    flex-direction: column;
    justify-content: end;
    .draggable-modal-content {
      width: 100%;
      height: auto;
      &__in {
        min-height: auto;
      }
    }
  }
}
</style>
