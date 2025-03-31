<template>
  <div class="debeting-account">
    <block-nav-back
      to="/checks"
      text="CHOOSE AN ACCOUNT FOR A CHECK CREATION"
    />
    <ul class="coins-list">
      <li
        v-for="coin in coins"
        :key="coin.id"
        class="coin-item"
        @click="$emit('nextStep')"
      >
        <div class="coin-img">
          <img class="image" :src="coin.img" alt="" />
        </div>
        <div class="coin-body">
          <h3 class="account-coin-value">
            3,5 {{ coin.coinname }}
            <span> (≈ $ {{ coin.coinprice }}) </span>
          </h3>
          <div class="coin-account">
            {{ coin.coinname }} Account: ***{{ coin.account }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DebetingAccount extends Vue {
  coins = [
    {
      id: 1,
      img: require('@/assets/svg/checks/btc.svg'),
      coinname: 'BTC',
      coinvalue: 3.5,
      coinprice: '357,091.15',
      account: 2235,
    },
    {
      id: 2,
      img: require('@/assets/svg/checks/udt.svg'),
      coinname: 'UDT',
      coinvalue: 3.5,
      coinprice: '357,091.15',
      account: 2235,
    },
    {
      id: 3,
      img: require('@/assets/svg/checks/ltc.svg'),
      coinname: 'LTC',
      coinvalue: 3.5,
      coinprice: '357,091.15',
      account: 2235,
    },
    {
      id: 4,
      img: require('@/assets/svg/checks/eth.svg'),
      coinname: 'ETH',
      coinvalue: 3.5,
      coinprice: '357,091.15',
      account: 2235,
    },
  ]
}
</script>
<style lang="scss">
.debeting-account {
  .block-nav-back {
    gap: 20px;
    padding: 12px 0 15px;
    .back-button {
      min-width: 40px;
      min-height: 40px;
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.15);
      background: #0a090f;
      border: 1px solid #f64e2a;
      border-radius: 100px;
    }
  }
  .coins-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .coin-item {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #121119;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      user-select: none;
      .coin-img {
        width: 75px;
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .coin-body {
        .account-coin-value {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          color: #fff;
          span {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .coin-account {
          display: inline-block;
          background: #191823;
          border-radius: 8px;
          padding: 6px 10px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          line-height: 160%;
          color: #fff;
        }
      }
    }
  }
}
</style>
