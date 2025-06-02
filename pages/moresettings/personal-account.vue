<template>
  <div class="personal-account">
    <div class="main-container">
      <block-nav-back to="/moresettings" text="Account Details" />
      <div class="personal-account__photo">
        <div class="personal-account__avatar">
          <UserIcon />
        </div>
        <label for="changeFoto" class="personal-account__change-btn">
          <input id="changeFoto" type="file" class="form-input" />
          Change Profile Photo
        </label>
      </div>
      <form class="personal-account__form">
        <div class="personal-account__form-group">
          <input-oracle
            label="First name"
            type="text"
            :v="firstName"
            :restrict-input="true"
          />
          <input-oracle
            label="Last name"
            type="text"
            :v="lastName"
            :restrict-input="true"
          />
          <input-oracle
            label="Username"
            type="text"
            :v="username"
            :restrict-input="true"
          />
        </div>
        <new-oracle-button text="Confirm" color="yellow" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import UserIcon from '@/assets/svg/user-icon.svg?inline'

@Component({
  components: {
    UserIcon,
  },
})
export default class PersonalAccountPage extends Vue {
  username = 'Vakko'
  firstName = 'Niko'
  lastName = 'Vakko_Design'
}
</script>

<style lang="scss">
.personal-account {
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
  }
  &__photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 20px;
  }
  &__avatar {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-bottom: 16px;
    background: #1e1d28;
    overflow: hidden;
    svg {
      width: 32px;
      height: 32px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__change-btn {
    background: #1e1d28;
    border-radius: 12px;
    padding: 7px 13px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
    .form-input {
      display: none;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
  }
  &__form-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1 1 100%;
  }
  .new-oracle-button {
    line-height: 22px;
    border: 1px solid #2b2741;
    border-radius: 14px;
    padding: 10px 16px;
    &:hover {
      border-color: #f64e2a;
    }
  }
}
</style>
