<template>
  <div
    class="add-addresses-modal"
    :class="isVisible ? 'show' : ''"
    @click.self="$emit('close', false)"
  >
    <div class="modal-content" @click.self="$emit('close', false)">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class AdressesModal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isVisible!: boolean

  leyout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.add-addresses-modal {
  width: 100%;
  height: 100vh;
  padding: 0;
  backdrop-filter: blur(35.400001525878906px);
  background: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 101;
  visibility: hidden;
  transition: 0.2s;
  &.show {
    background: rgba(0, 0, 0, 0.6);
    visibility: visible;
    opacity: 1;
  }
  &.change-name-address {
    .modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 142px;
      .cancel-btn {
        font-family: var(--font3);
        font-weight: 400;
        font-size: 14px;
        color: #f64e2a;
      }
      .done-btn {
        font-family: var(--font3);
        font-weight: 400;
        font-size: 14px;
        color: #fff;
      }
    }
    .edit-content {
      .input {
        width: fit-content;
        margin: 0 auto;
        .input-group {
          display: flex;
          align-items: center;
        }
        input {
          padding: 0;
          padding-right: 30px;
          padding-left: 1px !important;
          height: auto;
          background: transparent;
          border-radius: 0;
        }
        &-edit-action {
          right: 0;
        }
      }
    }
  }
  &.delete-address,
  &.add-address {
    padding: 10px;
    display: flex;
    align-items: center;
    .modal-content {
      width: 100%;
      background: #1e1d26;
      height: fit-content;
      border-radius: 8px;
      padding: 30px 16px;
      .modal-title {
        margin-bottom: 32px;
        font-family: var(--second-family);
        letter-spacing: 0.8px;
        font-weight: 700;
        font-size: 14px;
        color: #fff;
      }
      .button_oracle {
        height: 48px;
        &.orange {
          margin-bottom: 12px;
          box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.15);
        }
        &.gray {
          border-color: #e70303;
          box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.25);
        }
      }
    }
  }
  .modal-content {
    max-width: 375px;
    margin: 0 auto;
    padding: 40px 10px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
