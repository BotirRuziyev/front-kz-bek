<template>
  <div class="block-nav-back">
    <nuxt-link :to="to" class="back-button" @click.native.stop="$emit('prev')">
      <arrowBackIcon />
    </nuxt-link>
    <span>
      {{ text }}
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import arrowBackIcon from '@/assets/svg/arrow-back.svg?inline'

@Component({
  components: {
    arrowBackIcon,
  },
})
export default class BlockNavBack extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: '' }) readonly to!: string
}
</script>
<style lang="scss" scoped>
.block-nav-back {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 18px 0;
  font-family: var(--second-family);
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
  .back-button {
    min-width: 22px;
    min-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    box-shadow: none;
  }
}
</style>
