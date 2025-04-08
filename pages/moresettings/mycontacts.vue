<template>
  <div class="contacts">
    <div class="contacts-head">
      <block-nav-back text="CONTACTS" to="/moresettings" />
      <div
        class="add-contact"
        @click=";(newcontact = true), $nuxt.$emit('open-modal')"
      >
        <addCircleIcon />
      </div>
    </div>
    <input-oracle :search="true" placeholder="Search..." />
    <div class="invite-friends">
      <div class="icon">
        <userAddIcon />
      </div>
      Invite Friends
    </div>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="list-item">
        <nuxt-link to="#" class="user-link">
          <div class="user-img">
            <img :src="require('@/assets/png/zaglushka.png')" alt="" />
          </div>
          <div class="user-info">
            <h2 class="nick-name">
              Nickname <span>{{ user.username }}</span>
            </h2>
            <p class="user-id">
              ID: <span>{{ user.user_id }}</span>
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <draggable-modal :is-open="newcontact" @close="newcontact = false">
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click=";(newcontact = false), $nuxt.$emit('close-modal')"
        >
          Cancle
        </button>
        <button class="add-btn">Add</button>
      </div>
      <div class="new-address-btn">
        <button
          class="back-btn"
          @click="
            () => {
              ;(newcontact = false), $nuxt.$emit('open-modal')
            }
          "
        >
          <arrowIcon />
        </button>
        NEW CONTACT
      </div>
      <form class="modal-form" @click="(event) => event.preventDefault()">
        <div class="user-info">
          <div class="user-avatar">
            <profileCircleIcon />
          </div>
          <input-oracle placeholder="Nickname" />
        </div>
        <div class="user-name">
          <input-oracle placeholder="@username" />
          <button-oracle
            text="FIND BY @USERNAME"
            color="orange"
            @click=";(fineBy = true), (newcontact = false)"
          />
        </div>
        <div class="user-id">
          <input-oracle placeholder="ID: *******" />
          <button-oracle text="FIND BY ID" color="orange" />
        </div>
      </form>
    </draggable-modal>
    <draggable-modal :is-open="fineBy" @close="fineBy = false">
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click=";(fineBy = false), $nuxt.$emit('close-modal')"
        >
          Cancle
        </button>
        <button class="add-btn">Add</button>
      </div>
      <div class="new-address-btn">
        <button
          class="back-btn"
          @click="
            ;(fineBy = false),
              (newcontact = true),
              $nuxt.$emit('close-modal'),
              $nuxt.$emit('open-modal')
          "
        >
          <arrowIcon />
        </button>
        Users with a nickname @useruser
      </div>
      <ul class="user-list">
        <li v-for="user in users" :key="user.id" class="list-item">
          <nuxt-link to="#" class="user-link">
            <div class="user-img">
              <img :src="require('@/assets/png/zaglushka.png')" alt="" />
            </div>
            <div class="user-info">
              <h2 class="nick-name">
                Nickname <span>{{ user.username }}</span>
              </h2>
              <p class="user-id">
                ID: <span>{{ user.user_id }}</span>
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import addCircleIcon from '@/assets/svg/moresettings/add-circle.svg?inline'
// @ts-ignore
import userAddIcon from '@/assets/svg/moresettings/user-add.svg?inline'
// @ts-ignore
import arrowIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import profileCircleIcon from '@/assets/svg/profile-circle.svg?inline'

@Component({
  components: {
    addCircleIcon,
    userAddIcon,
    arrowIcon,
    profileCircleIcon,
  },
})
export default class MyContactsPage extends Vue {
  fineBy = false
  newcontact = false

  layout() {
    return 'mobile'
  }

  users = [
    {
      id: 1,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 2,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 3,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 4,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 5,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 6,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 7,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 8,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 9,
      username: '@username',
      user_id: 999999,
    },
    {
      id: 10,
      username: '@username',
      user_id: 999999,
    },
  ]
}
</script>

<style lang="scss">
.contacts {
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .add-contact {
      img {
        height: 24px;
      }
    }
  }
  .input {
    margin-bottom: 18px;
  }
  .invite-friends {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 12px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #f64e2a;
    .icon {
      line-height: 0;
    }
  }
  .user-list {
    .list-item {
      &:first-child {
        .user-link {
          border-top: 1px solid rgba(29, 28, 36, 0.5);
        }
      }
      &:last-child {
        .user-link {
          border: 0;
        }
      }
    }
    .user-link {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(29, 28, 36, 0.5);
      .user-img {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .user-info {
        .nick-name {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: #fff;
          span {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
        .user-id {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          text-align: left;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>
