<template>
  <div ref="select" class="form-select">
    <button
      class="select-btn"
      :class="{ active: isOpen }"
      @click="isOpen = !isOpen"
    >
      <div class="select-value">
        <span v-if="selectedItems.length == 0" class="default-value">
          Currency
        </span>
        <span v-else>
          <span class="selected-values">
            {{ selectedItems }}
          </span>
        </span>
      </div>
      <span class="arrown-icon">
        <arrowBackIcon />
      </span>
    </button>
    <div class="select-menu" :class="{ show: isOpen }">
      <div v-for="option in dataCopy" :key="option.id" class="select-option">
        <button class="option-button" @click="addSelected(option.name)">
          <div v-if="option.img" class="icon">
            <img :src="option.img" alt="" />
          </div>
          <p class="option-text">
            {{ option.name }}
          </p>
          <div class="form-control">
            <checkbox-oracle :checked="option.selected" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import arrowBackIcon from '@/assets/svg/arrow-back.svg?inline'

interface Item {
  id: number
  img: string
  name: string
  selected: boolean
}

@Component({
  components: {
    arrowBackIcon,
  },
})
export default class FormSelect extends Vue {
  @Prop({ default: () => [] }) data!: Item[]
  @Prop({ default: '' }) selectedVal!: ''

  dataCopy: Item[] = this.data
  isOpen = false
  selectedItems: string = this.selectedVal

  addSelected(name: string) {
    this.dataCopy = this.dataCopy.map((item) => ({
      ...item,
      selected: item.name === name,
    }))

    this.selectedItems = name
    this.$emit('changed', this.selectedItems)

    // this.data = this.data.map((item) => ({
    //   ...item,
    //   selected: item.name === name ? !item.selected : item.selected,
    // }))
    // const index = this.selectedItems.indexOf(name)
    // if (index !== -1) {
    //   this.selectedItems.splice(index, 1)
    // } else {
    //   this.selectedItems.push(name)
    // }
  }

  mounted() {
    document.addEventListener('click', this.ClickOutside)
    this.addSelected(this.selectedVal)
  }

  beforeDestroy() {
    document.removeEventListener('click', this.ClickOutside)
  }

  ClickOutside(event: Event) {
    const target = event.target as HTMLElement
    const select = this.$refs.select as HTMLElement | null

    if (select && !select.contains(target)) {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
.form-select {
  width: 100%;
  position: relative;
  z-index: 4;
  .select-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #13121b;
    border-radius: 12px;
    padding: 12px;
    cursor: pointer;
    transition: 0.3s;
    &.active {
      border-radius: 12px 12px 0 0;
      .arrown-icon {
        transform: rotate(-270deg);
      }
    }
    .select-value {
      display: flex;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      gap: 6px;
      &::-webkit-scrollbar {
        display: none;
      }
      .default-value {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #67639a;
      }
      .selected-values {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
    }
    .arrown-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-90deg);
      transition: 0.3s;

      svg {
        height: 15px;
        path {
          stroke: #fff;
        }
      }
    }
  }
  .select-menu {
    width: 100%;
    background: #121119;
    border-radius: 0 0 12px 12px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: calc(100% + 15px);
    left: 0;
    transition: 0.3s;
    &.show {
      top: 100%;
      opacity: 1;
      visibility: visible;
    }
    .select-option {
      width: 100%;
      &:last-child {
        .option-button {
          border: 0;
        }
      }
      .option-button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid #252334;
        user-select: none;
        cursor: pointer;
        padding: 10px 12px 10px 10px;
      }
      .icon {
        img {
          height: 23px;
        }
      }
      .option-text {
        width: 100%;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        text-align: left;
        color: #fff;
      }
      .form-control {
        .form-checkbox {
          padding: 0;
          gap: 0;
          input {
            &:checked + span {
              border-color: #f64e2a;
              &::after {
                content: url('@/assets/svg/checkbox.svg');
              }
            }
          }
          span {
            width: 21px;
            min-width: 21px;
            height: 21px;
            border-radius: 4px;
            border: 1px solid #242232;
            background: transparent;
            &::after {
              content: '';
              left: 4px;
              top: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
