<template>
  <div class="payment-methods__add">
    <div class="main-container">
      <block-nav-back
        to="/moresettings/payment-methods"
        text="Payment Methods"
      />
      <div class="payment-methods__add-search">
        <input-oracle
          :v="searchQuery"
          :search="true"
          placeholder="Search"
          @changed="onUpdatedVal($event)"
        />
        <div class="dropdown">
          <button class="arrow-sort__btn" @click="toggleSortOrder">
            <ArrowSortIcon />
          </button>
          <!-- <div class="dropdown-menu" :class="{ show: dropdown }">
            <div class="dropdown-item">
              <button
                class="sort-btn"
                :class="{ active: sortDropdownType === 'sum' }"
              >
                по сумме
              </button>
            </div>
            <div class="dropdown-item">
              <button
                class="sort-btn"
                :class="{ active: sortDropdownType === 'date' }"
              >
                времени
              </button>
            </div>
          </div> -->
        </div>
      </div>

      <ul class="payment-methods__add-list">
        <li
          v-for="item of filteredAndSortedData"
          :key="item.id"
          class="payment-methods__add-item"
        >
          <span class="payment-methods__add-item-label">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ArrowSortIcon from '@/assets/svg/filter-icon.svg?inline'

@Component({
  components: {
    ArrowSortIcon,
  },
})
export default class PaymentMethodsAddPage extends Vue {
  searchQuery: string = ''
  dropdown: boolean = false
  sortAsc: boolean = true

  data = [
    {
      id: 1,
      name: 'Litecoin',
    },
    {
      id: 2,
      name: 'XRP',
    },
    {
      id: 3,
      name: 'Bitcoin',
    },
    {
      id: 4,
      name: 'Etherium',
    },
    {
      id: 5,
      name: 'USDT',
    },
    {
      id: 6,
      name: 'BNB',
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

  onUpdatedVal(val: string) {
    this.searchQuery = val
  }

  get filteredAndSortedData() {
    const filtered = this.data.filter((item) =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    )

    return filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (this.sortAsc) {
        return nameA.localeCompare(nameB)
      } else {
        return nameB.localeCompare(nameA)
      }
    })
  }

  toggleSortOrder() {
    this.sortAsc = !this.sortAsc
  }
}
</script>

<style lang="scss">
.payment-methods__add {
  &-search {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    .input {
      width: 100%;
    }
  }
  .dropdown {
    position: relative;
    .arrow-sort__btn {
      width: 44px;
      height: 44px;
      background: #181720;
      border: 1px solid #2b2741;
      border-radius: 12px;
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
  &-list {
  }
  &-item {
    margin-right: -16px;
    padding: 16px 16px 16px 4px;
    border-bottom: 1px solid #2b2741;
    cursor: pointer;
    transition: 0.2s;
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
  }
}
</style>
