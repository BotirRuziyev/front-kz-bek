<template>
  <div class="seed-code">
    <div class="main-container">
      <block-nav-back to="/moresettings/privacy-security" text="Seed Code" />
      <div class="seed-code__head">
        <h2 class="seed-code__title">
          YOUR RECOVERY <br />
          PHRASE
        </h2>
        <p class="seed-code__description">
          Seed Check confirms that you remember <br />
          your seed phrase.
        </p>
        <div class="seed-code__list">
          <label
            v-for="(word, index) in seedWords"
            :key="index"
            :for="word.name"
            class="seed-code__item"
          >
            <input
              :id="word.name"
              type="checkbox"
              class="seed-code__checkbox"
              :value="word.name"
              :checked="!!word.selected"
              style="display: none"
              @change="handleChange(word)"
            />
            <div class="seed-code__custom">
              <span class="seed-code__order">
                {{ word.selected }}
              </span>
              <span class="seed-code__name">
                {{ word.name }}
              </span>
            </div>
          </label>
        </div>
      </div>
      <div class="seed-code__button">
        <new-oracle-button
          text="Verify"
          :color="selectedOrder.length > 0 ? 'yellow' : 'black'"
          @click="selectedOrder.length > 0 ? (isSuccesfull = true) : ''"
        />
      </div>
    </div>

    <adresses-modal :is-visible="isFailed" class="verification-modal">
      <div class="verification-modal__head">
        <div class="verification-modal__icon">⚠️</div>

        <h2 class="verification-modal__title">Verification Failed</h2>

        <p class="verification-modal__message">
          The recovery phrase you entered doesn’t match our records. Please
          check the words and their order carefully.
        </p>

        <div class="verification-modal__tips">
          <p class="verification-modal__tips--head">You can:</p>
          <ul class="verification-modal__list">
            <li class="verification-modal__list-item">
              Verify each word is spelled correctly
            </li>
            <li class="verification-modal__list-item">
              Ensure the words are in the correct order
            </li>
            <li class="verification-modal__list-item">
              Try again with your backup phrase
            </li>
          </ul>
        </div>
      </div>
      <div class="verification-modal__actions">
        <new-oracle-button text="Contact Support" />
        <new-oracle-button text="Try Again" color="yellow" />
      </div>
    </adresses-modal>

    <adresses-modal :is-visible="isSuccesfull" class="verification-modal">
      <div class="verification-modal__head">
        <div class="verification-modal__icon">
          <CheckSuccesfullIcon />
        </div>

        <h2 class="verification-modal__title">
          Application has been successfully confirmed!
        </h2>

        <p class="verification-modal__message">
          Your recovery phrase has been verified. Your wallet is now secure and
          ready to use.
        </p>
      </div>
      <div class="verification-modal__actions">
        <new-oracle-button text="Close" color="yellow" />
      </div>
    </adresses-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import CheckSuccesfullIcon from '@/assets/svg/checks-succesfull.svg?inline'

interface SeedWord {
  id: number
  selected: string
  name: string
}

@Component({
  components: {
    CheckSuccesfullIcon,
  },
})
export default class SeedCodePage extends Vue {
  isFailed = false
  isSuccesfull = false
  seedWords: SeedWord[] = [
    {
      id: 1,
      selected: '',
      name: 'apple',
    },
    {
      id: 2,
      selected: '',
      name: 'bridge',
    },
    {
      id: 3,
      selected: '',
      name: 'cradle',
    },
    {
      id: 4,
      selected: '',
      name: 'dream',
    },
    {
      id: 5,
      selected: '',
      name: 'Nikol',
    },
    {
      id: 6,
      selected: '',
      name: 'forest',
    },
    {
      id: 7,
      selected: '',
      name: 'gadget',
    },
    {
      id: 8,
      selected: '',
      name: 'honey',
    },
    {
      id: 9,
      selected: '',
      name: 'island',
    },
    {
      id: 10,
      selected: '',
      name: 'journey',
    },
    {
      id: 11,
      selected: '',
      name: 'knife',
    },
    {
      id: 12,
      selected: '',
      name: 'logic',
    },
    {
      id: 13,
      selected: '',
      name: 'Okay',
    },
    {
      id: 14,
      selected: '',
      name: 'Varchahd',
    },
    {
      id: 15,
      selected: '',
      name: 'eagle',
    },
  ]

  selectedOrder: string[] = []

  handleChange(word: SeedWord) {
    const index = this.selectedOrder.indexOf(word.name)

    if (index > -1) {
      // Deselect: remove from selectedOrder and clear selected
      this.selectedOrder.splice(index, 1)
      word.selected = ''
    } else {
      // Select: push and assign order number
      this.selectedOrder.push(word.name)
      word.selected = String(this.selectedOrder.length)
    }
  }
}
</script>

<style lang="scss">
.seed-code {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  &__head {
    flex: 1 1 100%;
    padding-top: 14px;
  }
  &__title {
    margin-bottom: 8px;
    font-family: 'Hector', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }
  &__description {
    margin-bottom: 38px;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 12px;
    row-gap: 24px;
    overflow: hidden;
  }
  &__item {
    overflow: hidden;
  }
  &__custom {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    background: #181720;
    border: 1px solid #2b2741;
    border-radius: 12px;
    padding: 7px 12px 7px 8px;
    cursor: pointer;
    transition: 0.2s;
  }
  &__order {
    display: block;
    border: 1px solid #443d69;
    border-radius: 8px;
    padding: 2px 6px;
    background: #1e1d28;
    min-width: 22px;
    height: 22px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #000;
    transition: 0.2s;
  }
  &__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__checkbox {
    &:checked + .seed-code__custom {
      background: #f64e2a;
      border-color: #f64e2a;
      .seed-code__order {
        background: #fff;
        border-color: #fff;
      }
    }
  }
  &__button {
    .new-oracle-button {
      line-height: 22px;
      padding: 11px;
      border: 2px solid #2b2741;
      border-radius: 14px;
      color: #fff;
      &.black {
        background: #13121b;
        color: #67639a;
        cursor: no-drop;
        &:hover {
          background: #13121b;
          box-shadow: none;
        }
      }
      &.yellow {
        border-color: #f64e2a;
      }
    }
  }
}
</style>
