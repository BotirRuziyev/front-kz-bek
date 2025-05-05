<template>
  <div class="container">
    <div v-if="step === 1" class="create-checks">
      <StepOne @nextStep="goToStep(step + 1)" @prevStep="goToStep(step - 1)" />
    </div>

    <div v-if="step === 2" class="create-checks">
      <StepTwo @prevStep="goToStep(step - 1)" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import StepOne from '~/components/checks/step-one.vue'
import StepTwo from '~/components/checks/step-two.vue'

@Component({
  components: {
    StepOne,
    StepTwo,
  },
})
export default class CheckCreation extends Vue {
  step = 1

  mounted() {
    this.updateStepFromRoute()
  }

  updateStepFromRoute() {
    const stepParam = this.$route.query.step
    if (stepParam && [1, 2, 3, 4].includes(Number(stepParam))) {
      this.step = Number(stepParam)
    }
  }

  goToStep(newStep: number) {
    if (newStep >= 1 && newStep <= 4) {
      this.step = newStep
      this.$router.push({ query: { step: String(newStep) } })
    }
  }
}
</script>

<style lang="scss">
.create-checks {
  max-width: 375px;
  margin: 0 auto;
  min-height: calc(100vh);
  padding: 0 16px 24px;
}
</style>
