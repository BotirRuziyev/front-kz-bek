<template>
  <div class="container">
    <div v-if="step === 1" class="create-checks">
      <DebetingAccount
        @nextStep="goToStep(step + 1)"
        @prevStep="goToStep(step - 1)"
      />
    </div>

    <div v-if="step === 2" class="create-checks">
      <StepOne @nextStep="goToStep(step + 1)" @prevStep="goToStep(step - 1)" />
    </div>

    <div v-if="step === 3" class="create-checks">
      <StepTwo @nextStep="goToStep(step + 1)" @prevStep="goToStep(step - 1)" />
    </div>
    <div v-if="step === 4" class="create-checks">
      <StepThree @prevStep="goToStep(step - 1)" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DebetingAccount from '~/components/checks/debeting-account.vue'
import StepOne from '~/components/checks/step-one.vue'
import StepThree from '~/components/checks/step-three.vue'
import StepTwo from '~/components/checks/step-two.vue'

@Component({
  components: {
    DebetingAccount,
    StepOne,
    StepTwo,
    StepThree,
  },
})
export default class CheckCreation extends Vue {
  layout() {
    return 'mobile'
  }

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

<style lang="scss"></style>
