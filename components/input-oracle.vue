<template>
  <div :class="inputClass">
    <label v-if="label" class="label">{{ label }}</label>
    <SearchIcon v-if="search" class="input-search" />
    <div class="input-group">
      <div v-if="ispin" class="input-group-in">
        <input
          v-for="(value, index) in values"
          :key="index"
          :ref="`input${index}`"
          v-model="values[index]"
          type="tel"
          inputmode="numeric"
          :disabled="disabled[index]"
          :class="{ error_input: error }"
          maxlength="1"
          :placeholder="placeholder"
          @input="onInputChange(index)"
          @keydown.backspace="onBackspacePress(index, $event)"
        />
        <span v-if="error" class="error-text">Wrong pin</span>
      </div>
      <input
        v-else
        id="edit"
        ref="inputField"
        v-model="value"
        :type="computedType"
        :placeholder="placeholder"
        :style="{ paddingLeft }"
        :readonly="readonly"
        :disabled="deactivated"
        :class="{ error_input: error }"
        @input="onChildChanged"
      />
      <span v-if="error && !ispin" class="error-text">{{ errorMessage }}</span>
      <div
        v-if="type === 'password'"
        class="input-eye"
        type="button"
        @click="togglePassword"
      >
        <EyeIcon v-if="isPasswordVisible" />
        <EyeIcon v-else />
      </div>
      <TrashIcon v-if="trashAction" class="input-trash-action" />
      <ScanIcon v-if="internalScan" class="input-scan-action" />
      <label v-if="edit" for="edit" class="input-edit-action">
        <EditIcon @click="$emit('edit', true)" />
      </label>
      <UpdateIcon v-if="update" class="input-update-action" />
      <button
        v-if="copy"
        class="copy-btn input-copy-action"
        @click="copyToClipboard"
      >
        <CopyIcon />
      </button>
      <button
        v-if="share"
        class="share-btn input-share-action"
        @click="$emit('shareContent')"
      >
        <ShareIcon />
      </button>
      <ClipboardImport v-if="clipboard" class="input-clipboard-import-action" />
      <CloseIcon v-if="close" class="input-close-action" @click="value = ''" />
      <ClearIcon
        v-if="internalClear"
        class="input-clear-action"
        @click="value = ''"
      />
      <MoneyIcon
        v-if="moneySend"
        class="input-money-action"
        @click="addMoney"
      />
      <SavedIcon v-if="internalSaved" class="input-saved-action" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
// @ts-ignore
import TrashIcon from '@/assets/svg/trash.svg?inline'
// @ts-ignore
import SearchIcon from '@/assets/svg/search.svg?inline'
// @ts-ignore
import EyeIcon from '@/assets/svg/eye.svg?inline'
// @ts-ignore
import EyeOffIcon from '@/assets/svg/eye-slash.svg?inline'
// @ts-ignore
import EditIcon from '@/assets/svg/moresettings/edit-2.svg?inline'
// @ts-ignore
import ScanIcon from '@/assets/svg/moresettings/scan.svg?inline'
// @ts-ignore
import CopyIcon from '@/assets/svg/copy.svg?inline'
// @ts-ignore
import ClipboardImport from '@/assets/svg/moresettings/clipboard-import.svg?inline'
// @ts-ignore
import CloseIcon from '@/assets/svg/close-circle.svg?inline'
// @ts-ignore
import ClearIcon from '@/assets/svg/clear-icon.svg?inline'
// @ts-ignore
import MoneyIcon from '@/assets/svg/money-send.svg?inline'
// @ts-ignore
import UpdateIcon from '@/assets/svg/update.svg?inline'
// @ts-ignore
import ShareIcon from '@/assets/svg/share.svg?inline'
// @ts-ignore
import SavedIcon from '@/assets/svg/saved-svg.svg?inline'

@Component({
  components: {
    TrashIcon,
    SearchIcon,
    EyeIcon,
    EyeOffIcon,
    EditIcon,
    ScanIcon,
    CopyIcon,
    ClipboardImport,
    CloseIcon,
    ClearIcon,
    MoneyIcon,
    UpdateIcon,
    ShareIcon,
    SavedIcon,
  },
})
export default class InputOracle extends Vue {
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: '' }) readonly type!: string
  @Prop({ default: '' }) readonly size!: string
  @Prop({ default: '' }) readonly v!: string
  @Prop({ default: false }) readonly deactivated!: boolean
  @Prop({ default: false }) readonly search!: boolean
  @Prop({ default: false }) readonly readonly!: boolean
  @Prop({ default: false }) readonly ispin!: boolean
  @Prop({ default: false }) readonly edit!: boolean
  @Prop({ default: false }) readonly scan!: boolean
  @Prop({ default: false }) readonly copy!: boolean
  @Prop({ default: false }) readonly update!: boolean
  @Prop({ default: false }) readonly share!: boolean
  @Prop({ default: false }) readonly clipboard!: boolean
  @Prop({ default: false }) readonly close!: boolean
  @Prop({ default: false }) readonly clear!: boolean
  @Prop({ default: false }) readonly moneySend!: boolean
  @Prop({ default: false }) readonly saved!: boolean
  @Prop({ default: false }) readonly external!: boolean
  @Prop({ default: null }) readonly trashAction?: Function
  @Prop({ default: false }) restrictInput!: boolean
  @Prop({ default: false }) error!: boolean
  @Prop({ default: 'Error text' }) errorMessage!: ''

  value: string | number = ''
  isPasswordVisible = false
  values: string[] = ['', '', '', '']
  disabled: boolean[] = [false, true, true, true]
  private internalClear = this.clear
  private internalScan = this.scan
  private internalSaved = this.saved

  onInputChange(index: number) {
    const val = this.values[index].replace(/\D/g, '').slice(0, 1)
    this.values[index] = val

    this.$emit('openPinCode', this.values)

    // Agar input bo‘sh bo‘lmasa va oxirgi inputga yetilmagan bo‘lsa
    if (val !== '' && index < this.values.length - 1) {
      this.disabled[index + 1] = false

      this.$nextTick(() => {
        const nextInput = this.$refs[`input${index + 1}`] as
          | HTMLInputElement
          | HTMLInputElement[]

        if (Array.isArray(nextInput)) {
          nextInput[0]?.focus()
        } else {
          nextInput?.focus()
        }
      })
    }
  }

  onBackspacePress(index: number, event: KeyboardEvent) {
    if (
      event &&
      event.key === 'Backspace' &&
      this.values[index] === '' &&
      index > 0
    ) {
      this.disabled[index] = true
      this.$nextTick(() => {
        const prevInput = this.$refs[`input${index - 1}`] as
          | HTMLInputElement
          | HTMLInputElement[]
        if (Array.isArray(prevInput)) {
          prevInput[0]?.focus()
        } else {
          prevInput?.focus()
        }
      })
    }
  }

  get computedType(): string {
    return this.isPasswordVisible ? 'text' : this.type
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  private copyToClipboard() {
    const input = this.$refs.inputField as HTMLInputElement
    if (input) {
      input.removeAttribute('disabled')
      input.select()
      document.execCommand('copy')
      input.setAttribute('disabled', 'true')
    }
  }

  private addMoney() {
    if (this.type === 'number') {
      this.value = 35.51
    } else {
      const numValue = Number(this.value)
      if (!isNaN(numValue)) {
        this.value = `$${numValue}`
      }
    }
  }

  @Watch('value')
  onChildChanged() {
    let val = String(this.value)

    if (this.restrictInput) {
      const cleaned = val.replace(/[^a-zA-Z0-9._]/g, '')
      if (cleaned !== val) {
        val = cleaned
        this.value = cleaned
      }
    }

    if (val !== '' && this.external) {
      this.internalScan = false
      this.internalSaved = false
      this.internalClear = true
    } else if (this.external) {
      this.internalScan = true
      this.internalSaved = true
      this.internalClear = false
    }

    this.$emit('changed', val)
  }

  get computedValue() {
    return this.value
  }

  get inputClass() {
    return ['input', this.size]
  }

  get paddingLeft() {
    return this.search ? '46px' : '12px'
  }

  created() {
    this.value = this.v
  }
}
</script>
<style lang="scss">
.label {
  margin-bottom: 8px;
  padding-left: 6px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #b2aaf9;
}
.input {
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  position: relative;
  &-group {
    position: relative;
  }
  &-search {
    position: absolute;
    left: 15px;
    z-index: 2;
    path {
      stroke: #7a74ba;
    }
  }

  &.big {
    input {
      font-size: 24px;
    }
  }

  &-trash-action {
    position: absolute;
    cursor: pointer;
    bottom: 11px;
    right: 12px;
    z-index: 2;
  }
  &-eye {
    height: 20px;
    line-height: 0;
    position: absolute;
    cursor: pointer;
    top: 12px;
    right: 12px;
    z-index: 2;
  }
  &-edit-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-scan-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 80px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-copy-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-update-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 77px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-share-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-clipboard-import-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 46px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-close-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    z-index: 2;
    path {
      fill: #f64e2a;
      fill-opacity: 1;
    }
  }
  &-clear-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    z-index: 2;
  }
  &-money-action {
    width: 24px;
    height: 24px;
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 46px;
    transform: translateY(-50%);
    z-index: 2;
    path {
      fill: #f64e2a;
    }
  }
  &-saved-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 52px;
    transform: translateY(-50%);
    z-index: 2;
  }
  input {
    box-sizing: border-box;
    padding: 12px;
    width: 100%;
    height: 44px;
    background: #181720;
    border-radius: 12px;
    border: 1px solid transparent;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    outline: none;
    &.error_input {
      border-color: #f64e2a !important;
      color: #f64e2a;
    }
    &:focus {
      border-color: #67639a;
    }

    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
  .error-text {
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #f64e2a;
  }
  .input-group-in {
    max-width: 276px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    input {
      height: 64px;
      background: transparent;
      border-radius: 20px;
      border: 1px solid #2b2741;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 28px;
      text-align: center;
      line-height: 135%;
      color: #fff;
      &.error_input {
        border-color: #f64e2a;
        color: #f64e2a;
        margin-bottom: 100px;
      }
      &:focus {
        border-color: #f64e2a;
      }
      &::placeholder {
        font-family: var(--font3);
        font-weight: 700;
        font-size: 24px;
        color: #464452;
      }
      &:focus {
        &::placeholder {
          opacity: 0;
        }
      }
    }
    .error-text {
      left: 50%;
      top: calc(100% - 50px);
      transform: translateX(-50%);
      font-weight: 500;
    }
  }
}
</style>
