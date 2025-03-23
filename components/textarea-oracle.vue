<template>
  <div class="textarea-oracle">
    <textarea
      id=""
      v-model="value"
      cols="30"
      rows="6"
      class="form-textarea"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class TextareaOracle extends Vue {
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '' }) readonly v!: string

  value = ''

  @Watch('value')
  onChildChanged() {
    this.$emit('changed', this.value)
  }

  get computedValue() {
    return this.value
  }

  created() {
    this.value = this.v
  }
}
</script>

<style lang="scss">
.textarea-oracle {
  .form-textarea {
    width: 100%;
    background: #1e1d26;
    border-radius: 6px;
    padding: 16px 12px;
    border: 0;
    resize: none;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
