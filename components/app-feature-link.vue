<template>
  <div class="feature-link">
    <nuxt-link :to="to" class="feature-link__item">
      <div class="feature-link__icon">
        <img :src="src" alt="" />
      </div>
      <div class="feature-link__label">{{ text }}</div>
      <div class="feature-link__value">{{ val }}</div>
      <div class="feature-link__arrow"></div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import PrivacyIcon from '@/assets/svg/moresettings/privacy-icon.svg?inline'

@Component({
  components: {
    PrivacyIcon,
  },
})
export default class FeatureLink extends Vue {
  @Prop({ default: '' }) readonly to!: string
  @Prop({ default: '' }) readonly src!: string
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: '' }) readonly val!: string
}
</script>

<style lang="scss">
.feature-link {
  &__item {
    width: calc(100% + 32px);
    margin-left: -16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 9px 16px;
    transition: 0.2s;
    position: relative;
    &:hover {
      background: #2b2741;
    }
    &::after {
      content: '';
      width: calc(100% - 58px);
      height: 1px;
      background: #2b2741;
      position: absolute;
      top: calc(100% - 1px);
      right: 0;
    }
  }
  &__icon {
    svg {
      width: 30px;
      height: 30px;
    }
  }
  &__label {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__value {
    white-space: nowrap;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7a74ba;
  }
  &__arrow {
    width: 6px;
    height: 13px;
    min-width: 6px;
    background: url('@/assets/svg/arrow-left.svg') no-repeat center/contain;
  }
}
</style>
