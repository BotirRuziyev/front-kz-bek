<template>
  <span class="block-title-oracle">{{ text }}</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BlockTitleOracle extends Vue {
  @Prop({ default: '' }) readonly text!: string
}
</script>
<style lang="scss">
.block-title-oracle {
  font-family: 'Hector', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  color: #fff;
}
</style>
