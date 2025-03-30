<template>
  <div class="checks-main">
    <div class="checks-main__content">
      <block-nav-back to="#" text="CHECKS" />
      <block-home />
      <ul class="checks-list d-flex flex-column">
        <li
          v-for="check in checks"
          :key="check.id"
          class="list-item border-gradient"
        >
          <nuxt-link :to="check.to" class="checks-link">
            <div class="left-blur"></div>
            <div class="checks-icon">
              <img :src="check.img" alt="" />
            </div>
            <h2 class="card-title">
              {{ check.title }}
            </h2>
            <p class="card-description">
              {{ check.description }}
            </p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class ChecksPage extends Vue {
  layout() {
    return 'mobile'
  }

  private checks = [
    {
      id: 1,
      to: '/checks/check-creation?step=1',
      img: require('@/assets/svg/checks/new-paycheck.svg'),
      title: 'CREATE A CHECK',
      description: 'New check creation',
    },
    {
      id: 2,
      to: '/checks/active-checks',
      img: require('@/assets/svg/checks/paycheck-active.svg'),
      title: 'Active CHECKS',
      description: 'All unclaimed non-expired checks',
    },
    {
      id: 3,
      to: '/checks/checks-all',
      img: require('@/assets/svg/checks/all-paycheck.svg'),
      title: 'All CHECKS',
      description: 'Checks History Through the time',
    },
  ]
}
</script>
<style lang="scss">
.checks-main {
  min-height: calc(100vh - 85px);
  padding: 0 0 24px;

  .input {
    margin-bottom: 18px;
  }

  &__content {
    .checks-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .list-item {
        border-radius: 12px;
        overflow: hidden;
        &:nth-child(1) {
          .checks-link {
            &::after {
              background: url('@/assets/svg/checks/create-plus.svg') no-repeat;
              top: -1px;
              right: -25px;
            }
          }
        }

        &:nth-child(2),
        &:nth-child(3) {
          .checks-link {
            &::after {
              background: url('@/assets/svg/checks/receipt-text.svg') no-repeat;
            }
          }
        }

        .checks-link {
          display: block;
          padding: 8px 12px 16px 12px;
          position: relative;

          &::after {
            content: '';
            width: 102px;
            height: 102px;
            background-position: center;
            position: absolute;
            top: -2px;
            right: -15px;
          }

          .checks-icon {
            width: 73px;
            height: 73px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
            position: relative;
            z-index: 1;
          }
          .card-title {
            margin-bottom: 6px;
            font-family: var(--second-family);
            font-weight: 700;
            font-size: 20px;
            text-transform: uppercase;
            color: #fff;
          }
          .card-description {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
  }
}
</style>
