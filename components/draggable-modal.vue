<template>
  <div ref="modal" class="draggable-modal" :class="{ show: isOpen }">
    <div ref="modalContent" class="draggable-modal-content">
      <div ref="handle" class="drag-handle-container">
        <div class="drag-handle"></div>
      </div>
      <div ref="modalContentIn" class="draggable-modal-content__in">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DraggableModal extends Vue {
  private modal: HTMLElement | null = null
  private modalContent: HTMLElement | null = null
  private modalContentIn: HTMLElement | null = null
  private startY = 0
  private moveY = 0

  @Prop({ type: Boolean, default: false }) readonly isOpen!: boolean

  mounted() {
    this.modal = this.$refs.modal as HTMLElement
    this.modalContent = this.$refs.modalContent as HTMLElement
    this.modalContentIn = this.$refs.modalContentIn as HTMLElement

    if (this.modalContent) {
      // Touch (mobil)
      this.modalContent.addEventListener('touchstart', this.handleTouchStart)
      this.modalContent.addEventListener('touchmove', this.handleTouchMove)
      this.modalContent.addEventListener('touchend', this.handleTouchEnd)

      // Mouse (desktop)
      this.modalContent.addEventListener('mousedown', this.handleMouseDown)
      this.modalContent.addEventListener('mousemove', this.handleMouseMove)
      this.modalContent.addEventListener('mouseup', this.handleMouseUp)
    }

    document.addEventListener('click', this.ClickOutside)

    this.$nuxt.$on('open-modal', this.openModal)
    this.$nuxt.$on('close-modal', this.closeModal)
  }

  beforeDestroy() {
    document.removeEventListener('click', this.ClickOutside)

    if (this.modalContent) {
      this.modalContent.removeEventListener('touchstart', this.handleTouchStart)
      this.modalContent.removeEventListener('touchmove', this.handleTouchMove)
      this.modalContent.removeEventListener('touchend', this.handleTouchEnd)

      this.modalContent.removeEventListener('mousedown', this.handleMouseDown)
      this.modalContent.removeEventListener('mousemove', this.handleMouseMove)
      this.modalContent.removeEventListener('mouseup', this.handleMouseUp)
    }

    this.$nuxt.$off('open-modal', this.openModal)
    this.$nuxt.$off('close-modal', this.closeModal)
  }

  ClickOutside(event: Event): void {
    const target = event.target as Node
    const modalWrapper = this.modal
    if (
      modalWrapper &&
      modalWrapper.contains(target) &&
      this.modalContent &&
      !this.modalContent.contains(target)
    ) {
      this.$nuxt.$emit('close-modal')
      this.$emit('close')

      setTimeout(() => {
        document.body.style.overflow = 'auto'
        document.body.style.paddingRight = '0'
      }, 200)
    }
  }

  openModal() {
    this.modalContentIn!.style.opacity = '1'
    this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0.8)`
    this.modalContent!.style.transform = `translateY(0%)`
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '15px'
  }

  closeModal() {
    this.modalContentIn!.style.opacity = '0'
    this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0)`
    this.modalContent!.style.transform = `translateY(100%)`
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = '0'
  }

  private handleTouchStart(e: TouchEvent) {
    this.startY = e.touches[0].clientY
  }

  private handleTouchMove(e: TouchEvent) {
    this.simulateDrag(e.touches[0].clientY, e.target as HTMLElement | null)
  }

  private handleTouchEnd() {
    this.endDrag()
  }

  private handleMouseDown(e: MouseEvent) {
    this.startY = e.clientY
  }

  private handleMouseMove(e: MouseEvent) {
    if (e.buttons !== 1) return
    this.simulateDrag(e.clientY, e.target as HTMLElement | null)
  }

  private handleMouseUp() {
    this.endDrag()
  }

  private simulateDrag(currentY: number, target: HTMLElement | null) {
    if (
      this.modalContentIn &&
      target &&
      !target.closest('.draggable-modal-content__in')
    ) {
      if (!this.modal || !this.modalContent) return

      this.moveY = currentY
      const deltaY = this.moveY - this.startY
      const modalHeight = this.modalContent.clientHeight
      const newOpacity = Math.max(1 - deltaY / modalHeight, 0)
      const newBgOpacity = Math.max(0.8 - deltaY / modalHeight, 0)

      if (deltaY > 0) {
        if (newOpacity < 1) {
          this.modal.style.transition = '0s'
          this.modal.style.backgroundColor = `rgba(0, 0, 0, ${newBgOpacity})`
          this.modalContentIn.style.opacity =
            deltaY < modalHeight / 1.6 ? `${newOpacity}` : '0'
        }

        if (deltaY > modalHeight / 1.6) {
          this.$emit('close')
          this.modalContentIn.style.opacity = '0'
          this.modal.style.backgroundColor = `rgba(0, 0, 0, 0)`
          this.modalContent.style.setProperty(
            'transform',
            `translateY(100%)`,
            'important'
          )
          this.modalContent.style.transition = '0.2s'
          this.modal.style.transition = '0.2s'
          setTimeout(() => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0'
          }, 200)
        } else {
          this.modalContent.style.setProperty(
            'transform',
            `translateY(${deltaY}px)`,
            'important'
          )
          this.modalContent.style.transition = '0.2s, transform 0s'
        }
      } else {
        this.modalContentIn.style.opacity = '1'
      }
    }
  }

  private endDrag() {
    if (!this.modal || !this.modalContent || !this.modalContentIn) return

    const deltaY = this.moveY - this.startY
    this.modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    this.modalContentIn.style.opacity = '1'
    this.modalContent.style.transition = '0.2s, transform 0.2s'
    this.modal.style.transition = '0.2s'

    if (deltaY > this.modalContent.clientHeight / 1.6) {
      this.$emit('close')
      this.modalContentIn.style.opacity = '0'
      this.modal.style.backgroundColor = `rgba(0, 0, 0, 0)`
      this.modalContent.style.transform = `translateY(100%)`
      this.modalContent.style.transition = '0.2s'
      setTimeout(() => {
        document.body.style.overflow = 'auto'
        document.body.style.paddingRight = '0'
      }, 200)
    } else {
      this.modalContent.style.transform = 'translateY(0)'
    }
  }
}
</script>

<style lang="scss">
.draggable-modal {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: 88px;
  background: rgba(0, 0, 0, 0);
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  transition: 0.2s;
  &.show {
    background: rgba(0, 0, 0, 0.8);
    visibility: visible;
    .draggable-modal-content {
      transform: translateY(0) !important;
      .draggable-modal-content__in {
        opacity: 1;
      }
    }
  }
  &-content {
    max-width: 375px;
    max-height: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 auto;
    background: #121119;
    border-radius: 30px 30px 0 0;
    padding: 0 16px 24px;
    transform: translateY(100%) !important;
    transition: 0.2s;
    &__in {
      min-height: calc(100% - 34px);
      opacity: 0;
      transition: 0.2s;
      user-select: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .drag-handle-container {
      width: calc(100% + 20px);
      padding: 12px 0 24px;
      margin-left: -10px;
      background: #121119;
      cursor: grab;
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .drag-handle {
      border-radius: 10px;
      width: 32px;
      height: 4px;
      background: #7a74ba;
      margin: 0 auto;
    }
    .modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      .cancel-btn {
        font-family: var(--font3);
        font-weight: 400;
        font-size: 14px;
        color: #f64e2a;
      }
      .add-btn {
        font-family: var(--font3);
        font-weight: 400;
        font-size: 14px;
        color: #fff;
      }
    }
    .new-address-btn {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-bottom: 24px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
      .back-btn {
        min-width: 22px;
        min-height: 22px;
      }
    }
    .addresses-list {
      margin-bottom: 24px;
    }
    .modal-form {
      .form-control {
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
        input {
          background: #1e1d26;
          height: 42px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          &::placeholder {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 40px;
        .input {
          width: 100%;
          margin-bottom: 0;
        }
      }
      .user-name {
        margin-bottom: 24px;
      }
    }
  }
  &.filter-modal {
    user-select: none;
    .draggable-modal-content {
      border-radius: 30px 30px 0 0;
      &__in {
        min-height: calc(100% - 44px);
      }
      .drag-handle-container {
        margin-bottom: 10px;
      }
    }
    .modal-title {
      margin-bottom: 15px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 20px;
      color: #fff;
    }
    .select-all {
      width: calc(100% + 32px);
      margin-left: -16px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid #282632;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      color: #fff;
      .form-checkbox {
        padding: 0;
        input {
          &:checked + span {
            background: #f64e2a;
          }
        }
        span {
          min-width: 18px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border-radius: 50%;
          &::after {
            width: 10px;
            height: 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 0;
          }
        }
      }
    }
    .cripto-list {
      .list-item {
        width: calc(100% + 32px);
        margin-left: -16px;
        .cripto-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #282632;
          padding: 11px 16px;
          cursor: pointer;
          .form-control {
            margin-right: 4px;
            .form-checkbox {
              padding: 0;
              input {
                &:checked + span {
                  background: #f64e2a;
                }
              }
              span {
                min-width: 18px;
                width: 18px;
                height: 18px;
                border-radius: 50%;

                &::after {
                  width: 10px;
                  height: 10px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  line-height: 0;
                }
              }
            }
          }
          .right-block {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 8px;
            .icon {
              img {
                width: 28px;
                height: 28px;
              }
            }
            .coin-body {
              width: 100%;
              .body-head,
              .body-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .cripto-name,
                .cripto-amound {
                  font-family: 'Roboto', sans-serif;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 120%;
                  color: #fff;
                }
                .cripto-card,
                .cripto-price {
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
    }
  }
}
</style>
