<template>
  <div class="sort-by-modal" :class="{ show: isOpen }">
    <div ref="modal" class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">SORT BY</h2>
        <button class="close-modal" @click="$emit('close')">Cancel</button>
      </div>
      <div class="modal-filter">
        <div class="filter-item">
          <p class="label">Amount</p>
          <div class="filter-list">
            <div
              v-for="item in amount"
              :key="item.id"
              class="list-item"
              @click="amountFilter(item.id)"
            >
              <div class="icon" :class="{ active: item.selected }">
                <tickCircleIcon />
              </div>
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="filter-item">
          <p class="label">Order</p>
          <div class="filter-list">
            <div
              v-for="item in order"
              :key="item.id"
              class="list-item"
              @click="orderFilter(item.id)"
            >
              <div class="icon" :class="{ active: item.selected }">
                <tickCircleIcon />
              </div>
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <button-oracle text="CONFIRM" color="orange" @click="$emit('close')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import tickCircleIcon from '@/assets/svg/tick-circle.svg?inline'

@Component({
  components: {
    tickCircleIcon,
  },
})
export default class SortByModal extends Vue {
  @Prop({ default: false }) isOpen!: boolean

  amount = [
    {
      id: 1,
      title: 'Ascending first',
      selected: true,
    },
    {
      id: 2,
      title: 'Descending first',
      selected: false,
    },
  ]

  order = [
    {
      id: 1,
      title: 'Oldest first',
      selected: true,
    },
    {
      id: 2,
      title: 'Newest first',
      selected: false,
    },
  ]

  amountFilter(id: number) {
    this.amount = this.amount.map((item) => ({
      ...item,
      selected: item.id === id,
    }))
  }

  orderFilter(id: number) {
    this.order = this.order.map((item) => ({
      ...item,
      selected: item.id === id,
    }))
  }
}
</script>

<style lang="scss">
.sort-by-modal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  padding: 12px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  visibility: hidden;
  transition: 0.3s;
  &.show {
    background: rgba(0, 0, 0, 0.6);
    visibility: visible;
    .modal-content {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .modal-content {
    max-width: 351px;
    width: 100%;
    padding: 22px 25px;
    background: #121119;
    border-radius: 16px;
    transform: translateY(100%);
    opacity: 0;
    transition: 0.3s;
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .modal-title {
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 16px;
        color: #fff;
      }
      .close-modal {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        color: #a50e0e;
        cursor: pointer;
      }
    }
    .modal-filter {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 25px;
      .filter-item {
        .label {
          margin-bottom: 14px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
        }
        .filter-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .list-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            user-select: none;
            .icon {
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              svg {
                display: none;
              }
              &.active {
                svg {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
