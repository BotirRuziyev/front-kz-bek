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
      this.modalContent.addEventListener('touchstart', this.handleTouchStart)
      this.modalContent.addEventListener('touchmove', this.handleTouchMove)
      this.modalContent.addEventListener('touchend', this.handleTouchEnd)
    }

    this.$nuxt.$on('open-modal', this.openModal)
    this.$nuxt.$on('close-modal', this.closeModal)
  }

  openModal() {
    this.modalContentIn!.style.opacity = '1'
    this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0.6)`
    this.modalContent!.style.transform = `translateY(${0}%)`
  }

  closeModal() {
    this.modalContentIn!.style.opacity = '0'
    this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0)`
    this.modalContent!.style.transform = `translateY(${100}%)`
  }

  private handleTouchStart(e: TouchEvent) {
    this.startY = e.touches[0].clientY
  }

  private handleTouchMove(e: TouchEvent) {
    const target = e.target as HTMLElement | null
    if (
      this.modalContentIn &&
      target &&
      !target.closest('.draggable-modal-content__in')
    ) {
      if (!this.modal || !this.modalContent) return

      this.moveY = e.touches[0].clientY
      const deltaY = this.moveY - this.startY
      const modalHeight = this.modalContent.clientHeight
      const newOpacity = Math.max(1 - deltaY / modalHeight, 0)
      const newBgOpacity = Math.max(0.6 - deltaY / modalHeight, 0)
      if (deltaY > 0) {
        if (newOpacity < 1) {
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
            `translateY(${100}%)`,
            'important'
          )
        } else {
          this.modalContent.style.setProperty(
            'transform',
            `translateY(${deltaY}px)`,
            'important'
          )
        }
        this.modalContent.style.transition = '0.5s, transform 0s'
      } else {
        this.modalContentIn.style.opacity = '1'
      }
    }
  }

  private handleTouchEnd(e: TouchEvent) {
    const target = e.target as HTMLElement | null
    if (!this.modal || !this.modalContent || !this.modalContentIn) return

    const deltaY = this.moveY - this.startY
    if (target && !target.closest('.draggable-modal-content__in')) {
      this.modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
      this.modalContentIn.style.opacity = '1'
      this.modalContent.style.transition = '0.5s, transform 0.5s'

      if (deltaY > this.modalContent.clientHeight / 1.6) {
        this.$emit('close')
        setTimeout(() => {
          this.modalContentIn!.style.opacity = '0'
          this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0)`
          this.modalContent!.style.transform = `translateY(${100}%)`
        }, 200)
      } else {
        this.modalContent.style.transform = 'translateY(0)'
      }
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
  backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  transition: 0.3s;
  &.show {
    backdrop-filter: blur(35.400001525878906px);
    background: rgba(0, 0, 0, 0.6);
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
    border-radius: 8px 8px 0 0;
    padding: 0 10px 24px;
    transform: translateY(100%) !important;
    transition: 0.3s;
    &__in {
      min-height: calc(100% - 34px);
      opacity: 0;
      transition: 0.3s;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .drag-handle-container {
      width: calc(100% + 20px);
      padding: 14px 0;
      margin-left: -10px;
      background: #121119;
      cursor: grab;
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .drag-handle {
      border-radius: 100px;
      width: 52px;
      height: 6px;
      background: #2a2937;
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
}
</style>
