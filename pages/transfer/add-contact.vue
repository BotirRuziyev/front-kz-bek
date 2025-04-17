<template>
  <div class="add-contact__page">
    <div class="main-container">
      <block-nav-back to="/transfer/internal-transfer" text="Add Contacts" />
      <input-oracle :search="true" placeholder="Search" />
    </div>
  </div>
</template>

<style lang="scss">
.add-contact__page {
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
}
</style>
