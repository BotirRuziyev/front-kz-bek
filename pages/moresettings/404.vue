<template>
  <div class="error-page">
    <block-nav-back text="BACK" to="/moresettings" />
    <div class="error-img">
      <img :src="require('@/assets/png/404-error.png')" alt="" />
    </div>
    <button-oracle text="CONTACT SUPPORT" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ErrorPage extends Vue {}
</script>
<style lang="scss">
.error-page {
  min-height: 100vh;
  max-width: 375px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
  padding: 7px 10px 50px;
  .error-img {
    text-align: center;
  }
  button {
    height: 48px;
  }
}
</style>
