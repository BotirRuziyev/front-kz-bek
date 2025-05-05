<template>
  <div
    class="add-addresses-modal"
    :class="isVisible ? 'show' : ''"
    @click.self="$emit('close', false)"
  >
    <div class="modal-content">
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
  &.check-created__successfully {
    .modal-content {
      .modal-head {
        margin-bottom: 22px;
        text-align: center;
        .icon {
          margin-bottom: 12px;
        }
        .modal-title {
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
      }
      .qr-code {
        margin-bottom: 12px;
        padding: 10px;
        background: transparent;
        text-align: center;
      }
      .input {
        margin-bottom: 38px;
        input {
          padding-right: 82px;
          text-overflow: ellipsis;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }
        &-copy-action,
        &-share-action {
          border-radius: 8px;
          width: 36px;
          height: 36px;
          background: #1e1d28;
          display: flex;
          align-items: center;
          justify-content: center;
          right: 44px;
        }
        &-share-action {
          right: 4px;
        }
      }
      .total-amount {
        margin-bottom: 60px;
        .amount-title {
          margin-bottom: 4px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          color: #31f62a;
        }
        .amount-description {
          margin-bottom: 4px;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
      }
      .new-oracle-button {
        padding: 11px 0;
        line-height: 22px;
      }
    }
    &.error-modal,
    &.successfully-modal {
      .modal-content {
        display: flex;
        flex-direction: column;
        .modal-in {
          flex: 1 1 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 38px;
          .modal-body {
            .body-title {
              margin-bottom: 4px;
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 14px;
              line-height: 130%;
              text-align: center;
              color: #f64e2a;
            }
            .body-description {
              margin-bottom: 24px;
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 14px;
              line-height: 130%;
              text-align: center;
              color: #fff;
              &::last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    &.successfully-modal {
      .modal-content {
        .modal-in {
          .modal-body {
            .body-title {
              font-family: 'Inter', sans-serif;
              font-weight: 600;
              font-size: 16px;
              line-height: 140%;
              text-align: center;
              color: #31f62a;
            }
          }
        }
      }
    }
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
        font-family: 'Roboto', sans-serif;
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
    padding: 24px 16px;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
