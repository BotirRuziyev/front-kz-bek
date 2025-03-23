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
          :type="type"
          :disabled="disabled[index]"
          maxlength="1"
          :placeholder="placeholder"
          @input="onInputChange(index)"
          @keydown.backspace="onBackspacePress(index, $event)"
        />
      </div>
      <input
        v-else
        id="edit"
        v-model="value"
        :type="computedType"
        :placeholder="placeholder"
        :style="{ paddingLeft }"
        :readonly="readonly"
      />
      <div
        v-if="type === 'password'"
        class="input-eye"
        type="button"
        @click="togglePassword"
      >
        <EyeIcon v-if="isPasswordVisible" />
        <EyeOffIcon v-else />
      </div>
      <TrashIcon v-if="trashAction" class="input-trash-action" />
      <ScanIcon v-if="scan" class="input-scan-action" />
      <label v-if="edit" for="edit" class="input-edit-action">
        <EditIcon @click="$emit('edit', true)" />
      </label>
      <CopyIcon v-if="copy" class="input-copy-action" />
      <ClipboardImport v-if="clipboard" class="input-clipboard-import-action" />
      <CloseIcon v-if="close" class="input-close-action" />
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
import CopyIcon from '@/assets/svg/moresettings/copy.svg?inline'
// @ts-ignore
import ClipboardImport from '@/assets/svg/moresettings/clipboard-import.svg?inline'
// @ts-ignore
import CloseIcon from '@/assets/svg/close-circle.svg?inline'

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
  },
})
export default class InputOracle extends Vue {
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: '' }) readonly type!: string
  @Prop({ default: '' }) readonly size!: string
  @Prop({ default: '' }) readonly v!: string
  @Prop({ default: false }) readonly search!: boolean
  @Prop({ default: false }) readonly readonly!: boolean
  @Prop({ default: false }) readonly ispin!: boolean
  @Prop({ default: false }) readonly edit!: boolean
  @Prop({ default: false }) readonly scan!: boolean
  @Prop({ default: false }) readonly copy!: boolean
  @Prop({ default: false }) readonly clipboard!: boolean
  @Prop({ default: false }) readonly close!: boolean
  @Prop({ default: null }) readonly trashAction?: Function

  value = ''
  isPasswordVisible = false
  values: string[] = ['', '', '', '']
  disabled: boolean[] = [false, true, true, true]

  onInputChange(index: number) {
    if (this.values[index].trim() !== '' && index < 3) {
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

  @Watch('value')
  onChildChanged() {
    this.$emit('changed', this.value)
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
  margin-bottom: 10px;
  font-family: 'Reza Zulmi Alfaizi Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
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
  }
  &-eye {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }
  &-edit-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }
  &-scan-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 80px;
    transform: translateY(-50%);
  }
  &-copy-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }
  &-clipboard-import-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 46px;
    transform: translateY(-50%);
  }
  &-close-action {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    path {
      fill: #f64e2a;
      fill-opacity: 1;
    }
  }
  input {
    box-sizing: border-box;
    padding: 12px;
    width: 100%;
    height: 48px;
    background: rgba(29, 29, 41, 0.4);
    border-radius: 8px;
    font-family: 'Reza Zulmi Alfaizi Sans';
    font-weight: 400;
    color: #ffffff;
    border: none;
    outline: none;

    &::placeholder {
      font-family: 'Reza Zulmi Alfaizi Sans';
      font-weight: 400;
      color: #494755;
      font-size: 16px;
    }
  }
  .input-group-in {
    max-width: 224px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    input {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 24px;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
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
  }
}
</style>
