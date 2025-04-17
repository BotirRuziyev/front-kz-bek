<template>
  <div class="add-friends__page">
    <div class="main-container">
      <block-nav-back to="/transfer/internal-transfer" text="Add Contacts" />
      <div class="add-friends__search">
        <input-oracle :search="true" placeholder="Search" :clear="false" />
        <button class="cancel-btn">Cancel</button>
      </div>
      <ul class="add-friends__list">
        <div v-for="item of 6" :key="item" class="list-item">
          <div class="left-block">
            <div class="user-img">
              <img :src="require('@/assets/png/zaglushka.png')" alt="" />
            </div>
            <div class="user-info">
              <h4 class="user-name">
                Name Surname <span class="nick-name">Nickname</span>
              </h4>
              <p class="user-id">ID: 999999</p>
            </div>
          </div>
          <button class="add-button">
            Add
            <div class="icon">
              <PlusIcon />
            </div>
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import PlusIcon from '@/assets/svg/plus.svg?inline'

@Component({
  components: {
    PlusIcon,
  },
})
export default class AddFriends extends Vue {}
</script>

<style lang="scss">
.add-friends__page {
  .block-nav-back {
    text-align: center;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #fff;
    text-transform: capitalize;
    .back-button {
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    span {
      display: block;
      width: calc(100% - 26px);
    }
  }
  .input {
    width: 100%;
    .input-search {
      path {
        stroke: #7a74ba;
      }
    }
    input {
      height: 44px;
      border-radius: 12px;
      padding: 13px 14px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
      &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #67639a;
      }
    }
  }
  .add-friends__search {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    .cancel-btn {
      font-family: 'Nunito', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 135%;
      color: #fff;
    }
  }
  .add-friends__list {
    width: calc(100% + 32px);
    margin-left: -16px;
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid #2b2741;
      padding: 12px 16px;
      .left-block {
        display: flex;
        align-items: center;
        gap: 12px;
        .user-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .user-info {
          .user-name {
            margin-bottom: 4px;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
            .nick-name {
              font-size: 12px;
              line-height: 135%;
              color: #67639a;
            }
          }
          .user-id {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 135%;
            color: #7a74ba;
          }
        }
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
        transition: 0.3s;
        &:hover {
          background: #13121b;
        }
      }
    }
  }
}
</style>
