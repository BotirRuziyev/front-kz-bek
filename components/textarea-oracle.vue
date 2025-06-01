<template>
  <div class="textarea-oracle">
    <textarea
      id=""
      v-model="value"
      cols="30"
      rows="7"
      maxlength="500"
      class="form-textarea"
      :placeholder="placeholder"
    ></textarea>
    <span class="max-value">{{ value.length }} / 500</span>
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
    background: #13121b;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 13px 14px;
    resize: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &:focus {
      outline: none;
      border-color: #67639a;
    }
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
    }
  }
  .max-value {
    display: block;
    margin-top: 8px 0 0 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
  }
}
</style>
