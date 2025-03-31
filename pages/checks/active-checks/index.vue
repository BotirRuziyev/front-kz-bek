<template>
  <div class="active-checks">
    <block-nav-back to="/checks" text="ACTIVE CHECKS" />
    <div class="active-checks__filter">
      <select-oracle :data="data" />
      <button class="sortby-btn" @click="isOpen = true">
        <img :src="require('@/assets/svg/sort-by.svg')" alt="" />
      </button>
    </div>
    <ul class="active-checks__list">
      <li v-for="item in 5" :key="item" class="list-item border-gradient">
        <div class="left-blur"></div>
        <nuxt-link to="/checks/check-creation/check-details" class="list-item__container">
          <h2 class="card-title">Check #902194-2024</h2>
          <p class="card-sum">9 LTC ≈ <span>($ 9,200.15)</span></p>
          <div class="list-item__in">
            <h3 class="title-small">5 activations left out of 10</h3>
            <p class="list-item-in-text">
              0.75 BTC (<span>$ 152,910</span>) out of 1.5 BTC (<span
                >$ 152,910</span
              >) left
            </p>
          </div>
          <div class="card-bottom">
            <p class="item">Created 12 Dec, 2024 at 9:36 PM EST</p>
            <p class="item">Active Until 12 Dec, 2025 at 9:36 PM EST</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <SortByModal :is-open="isOpen" @close="isOpen = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SortByModal from '~/components/checks/sort-by-modal.vue'

@Component({
  components: {
    SortByModal,
  },
})
export default class ActiveChecks extends Vue {
  layout() {
    return 'mobile'
  }

  isOpen = false

  data = [
    {
      id: 1,
      img: require('@/assets/svg/checks/litecoin-ltc.svg'),
      name: 'LTC',
      selected: false,
    },
    {
      id: 2,
      img: require('@/assets/svg/checks/bitcoin.svg'),
      name: 'BTC',
      selected: false,
    },
    {
      id: 3,
      img: require('@/assets/svg/tether-usdt.svg'),
      name: 'USDT',
      selected: false,
    },
  ]
}
</script>

<style lang="scss">
.active-checks {
  .block-nav-back {
    span {
      width: calc(100% - 84px);
      text-align: center;
    }
    .back-button {
      border: 1px solid #f64e2a;
      border-radius: 100%;
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.15);
      background: #0a090f;
    }
  }
  &__filter {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
    .sortby-btn {
      cursor: pointer;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .list-item {
      &::after {
        content: url('@/assets/svg/checks/receipt-text.svg');
        position: absolute;
        top: -1px;
        right: 0;
      }
      &__container {
        display: block;
        padding: 19px 16px;
        .card-title {
          margin-bottom: 12px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 14px;
          line-height: 10px;
          color: #fff;
        }
        .card-sum {
          margin-bottom: 8px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          color: #4f4ec1;
          line-height: 9px;
          span {
            color: #1b961f;
          }
        }
        .list-item__in {
          display: inline-block;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 6px;
          padding: 5px;
          margin-bottom: 10px;
          .title-small {
            margin-bottom: 5px;
            font-family: var(--third-family);
            font-weight: 400;
            font-size: 12px;
            color: #fff;
            line-height: 14px;
          }
          .list-item-in-text {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 10px;
            color: #fff;
            line-height: 12px;
            span {
              color: #1b961f;
            }
          }
        }
        .card-bottom {
          .item {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
            line-height: 7px;
            &:first-child {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
