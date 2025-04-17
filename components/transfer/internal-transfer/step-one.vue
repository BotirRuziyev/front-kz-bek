<template>
  <div class="internal-transfer__step-one">
    <div v-if="state">
      <input-oracle :search="true" placeholder="Search" />
      <div class="transfer-users">
        <div class="transfer-users__head">
          <h3 class="send-to__text">Send to</h3>
          <button class="add-button">
            Add
            <PlusIcon />
          </button>
        </div>
        <ul class="user-list">
          <li v-for="user of users" :key="user.id" class="user-item">
            <button class="user-selected__btn" @click="selectUser(user.id)">
              <div class="user-img" :class="{ selected: user.selected }">
                <img :src="user.img" alt="" />
                <CheckIcon v-if="user.selected" class="user-checker" />
              </div>
              <h4 class="user-name">{{ user.name }}</h4>
            </button>
          </li>
        </ul>
      </div>
      <button-oracle
        v-if="selectedUser"
        text="Continue"
        color="orange"
        @click="$emit('nextStep')"
      />
    </div>
    <div v-else class="contacts-empty__state">
      <h2 class="title">No Contacts Yet</h2>
      <p class="description">
        Add friends to your contacts list to start sending money
      </p>
      <router-link to="/transfer/add-contact" class="add-button">
        <span>
          <PlusIcon />
        </span>
        Add New Contact
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import PlusIcon from '@/assets/svg/plus.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/user-checker.svg?inline'

@Component({
  components: {
    PlusIcon,
    CheckIcon,
  },
})
export default class InternalTransferStepOne extends Vue {
  selectedUser = false
  state = true

  users = [
    {
      id: 1,
      img: require('@/assets/png/zaglushka.png'),
      name: 'Barbara Martinez',
      selected: false,
    },
    {
      id: 2,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Patricia Martin',
    },
    {
      id: 3,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Michael Anderson',
    },
    {
      id: 4,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Patricia Lopez',
    },
    {
      id: 5,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Thomas Wilson',
    },
    {
      id: 6,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Barbara Martinez',
    },
    {
      id: 7,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Barbara Martinez',
    },
    {
      id: 8,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Barbara Martinez',
    },
    {
      id: 9,
      img: require('@/assets/png/zaglushka.png'),
      selected: false,
      name: 'Barbara Martinez',
    },
  ]

  selectUser(userId: number) {
    const clickedUser = this.users.find((user) => user.id === userId)

    if (clickedUser?.selected) {
      this.selectedUser = false
      this.users = this.users.map((user) => ({
        ...user,
        selected: false,
      }))
    } else {
      this.selectedUser = true
      this.users = this.users.map((user) => ({
        ...user,
        selected: user.id === userId,
      }))
    }
  }
}
</script>

<style lang="scss">
.internal-transfer__step-one {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .input {
    margin-bottom: 24px;
  }
  .transfer-users {
    flex: 1 1 100%;
    padding-bottom: 24px;
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .send-to__text {
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 140%;
        color: #fff;
      }
      .add-button {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #1e1d28;
        border-radius: 12px;
        padding: 7px 10px;
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 12px;
        line-height: 135%;
        color: #fff;
        transition: 0.2s;
        &:hover {
          background: #13121b;
        }
      }
    }
    .user-list {
      display: flex;
      flex-wrap: wrap;
      column-gap: 12px;
      row-gap: 16px;
      .user-item {
        display: flex;
        flex-direction: column;
        max-width: calc(25% - 9px);
        width: 100%;
      }
      .user-selected__btn {
        cursor: pointer;
        .user-img {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-bottom: 6px;
          position: relative;
          border: 2px solid transparent;
          border-radius: 50%;
          &.selected {
            border-color: #f64e2a;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
          .user-checker {
            position: absolute;
            bottom: -2px;
            right: -5px;
          }
        }
        .user-name {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 135%;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .contacts-empty__state {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: start;
    justify-content: center;
    height: calc(100vh - 200px);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border: 1px solid #2b2741;
    border-radius: 12px;
    padding: 0px 16px;
    .title {
      margin-bottom: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      line-height: 140%;
      color: #fff;
    }
    .description {
      margin-bottom: 30px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      line-height: 130%;
      color: #fff;
    }
    .add-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      background: #1e1d28;
      border-radius: 14px;
      padding: 11px 16px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: #fff;
    }
  }
}
</style>
