<template>
  <div class="block-nav-back">
    <nuxt-link :to="to" class="back-button" @click.native.stop="$emit('prev')">
      <arrowBackIcon />
    </nuxt-link>
    <span class="block-nav-back__text">
      {{ text }}
    </span>
    <button v-if="more" class="more-btn">
      <MoreIcon />
    </button>
    <nuxt-link v-if="add" :to="addto" class="add-btn">
      <AddIcon />
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import arrowBackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import MoreIcon from '@/assets/svg/more-horizontal.svg?inline'
// @ts-ignore
import AddIcon from '@/assets/svg/add-icon.svg?inline'

@Component({
  components: {
    arrowBackIcon,
    MoreIcon,
    AddIcon,
  },
})
export default class BlockNavBack extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: '' }) readonly to!: string
  @Prop({ default: '' }) readonly addto!: string
  @Prop({ default: false }) readonly more!: string
  @Prop({ default: false }) readonly add!: string
}
</script>
<style lang="scss" scoped>
.block-nav-back {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
  margin-bottom: 4px;
  position: relative;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
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
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    z-index: 3;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
  .more-btn,
  .add-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 3;
  }
  &__text {
    width: 100%;
    text-align: center;
  }
}
</style>
