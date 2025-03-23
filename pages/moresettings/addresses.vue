<template>
  <div class="addresses">
    <block-nav-back
      text="SAVED & FAVOURITE EXTERNAL WITHDRAWALS ADDRESSES"
      to="/moresettings"
    />
    <ul class="addresses-list">
      <li
        v-for="cripto in criptos"
        :key="cripto.id"
        class="list-item"
        :class="cripto.selected ? 'selected' : ''"
        @click="selectedCripto(cripto.id)"
      >
        {{ cripto.name }}
      </li>
    </ul>
    <div class="add-addresses">
      <form
        action="#"
        class="add-addresses-form"
        @click="(event) => addAddress(event)"
      >
        <div class="form-control">
          <input-oracle
            label="Name"
            :edit="true"
            placeholder="My BTC wallet"
            @changed="inputChange"
            @edit="editModal = true"
          />
        </div>
        <div class="form-control">
          <input-oracle
            label="Address"
            :scan="true"
            :edit="true"
            :copy="true"
            placeholder="btc95489159581940fIdfoks30254-0252315241"
            @edit="editModal = true"
          />
        </div>
        <button class="detele-btn" @click="deleteModal = true">
          Delete Address
        </button>
        <button-oracle
          text="ADD NEW ADDRESS"
          color="orange"
          @click="addModal = true"
        />
      </form>
    </div>
    <adresses-modal
      :is-visible="editModal"
      class="change-name-address"
      @close="editModal = false"
    >
      <div class="modal-head">
        <button class="cancel-btn" @click="editModal = false">Cancle</button>
        <button class="done-btn">Done</button>
      </div>
      <div class="edit-content">
        <input-oracle :v="wallet" placeholder="My BTC wallet" :edit="true" />
      </div>
    </adresses-modal>
    <adresses-modal
      :is-visible="deleteModal"
      class="delete-address"
      @close="deleteModal = false"
    >
      <h3 class="modal-title">Confirm address deletion?</h3>
      <button-oracle text="YES" color="orange" />
      <button-oracle text="CanCel" color="gray" @click="deleteModal = false" />
    </adresses-modal>
    <adresses-modal :is-visible="addModal" class="add-address">
      <h3 class="modal-title">Confirm adding new address?</h3>
      <button-oracle
        text="YES"
        color="orange"
        @click="
          () => {
            ;(addModal = false), (newaddress = true), $nuxt.$emit('open-modal')
          }
        "
      />
      <button-oracle text="CanCel" color="gray" @click="addModal = false" />
    </adresses-modal>
    <draggable-modal
      class="new-address-modal"
      :is-open="newaddress"
      @close="newaddress = false"
    >
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click="$nuxt.$emit('close-modal'), (newaddress = false)"
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
              $nuxt.$emit('close-modal'),
                (addModal = true),
                (newaddress = false)
            }
          "
        >
          <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
        </button>
        NEW ADDRESS
      </div>
      <ul class="addresses-list">
        <li
          v-for="cripto in criptos"
          :key="cripto.id"
          class="list-item"
          :class="cripto.selected ? 'selected' : ''"
          @click="selectedCripto(cripto.id)"
        >
          {{ cripto.name }}
        </li>
      </ul>
      <form class="modal-form">
        <div class="form-control">
          <input-oracle placeholder="Name" />
        </div>
        <div class="form-control">
          <input-oracle
            :scan="true"
            :clipboard="true"
            :close="true"
            placeholder="Address"
          />
        </div>
      </form>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AddressesPage extends Vue {
  wallet = ''
  editModal = false
  deleteModal = false
  addModal = false
  newaddress = false

  layout() {
    return 'mobile'
  }

  inputChange(v: string) {
    this.wallet = v
  }

  criptos = [
    {
      id: 1,
      name: 'USDT',
      selected: true,
    },
    {
      id: 2,
      name: 'BTC',
      selected: false,
    },
    {
      id: 3,
      name: 'LTC',
      selected: false,
    },
    {
      id: 4,
      name: 'ETH',
      selected: false,
    },
  ]

  selectedCripto(id: number): void {
    this.criptos.forEach((item) => (item.selected = item.id === id))
  }

  addAddress(event: Event) {
    event.preventDefault()
  }
}
</script>

<style lang="scss">
.addresses {
  &-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: stretch;
    gap: 8px;
    margin-bottom: 35px;
    .list-item {
      background: #121119;
      border-radius: 8px;
      border: 1px solid #121119;
      padding: 11px 0px;
      cursor: pointer;
      user-select: none;
      font-family: var(--third-family);
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 1px;
      text-align: center;
      color: #fff;
      &.selected {
        border-color: #f64e2a;
      }
    }
  }
  .add-addresses {
    &-form {
      .form-control {
        margin-bottom: 20px;
        &:nth-child(2) {
          margin-bottom: 18px;
          .input {
            input {
              padding-right: 120px;
              text-overflow: ellipsis;
            }
            &-edit-action {
              right: 46px;
            }
          }
        }
        .label {
          font-family: var(--font3);
          font-weight: 700;
          font-size: 16px;
          color: #fff;
        }
      }
      .detele-btn {
        width: 100%;
        margin-bottom: 42px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        text-align: end;
        color: #f64e2a;
      }
      .button_oracle {
        height: 48px;
      }
    }
  }
  .add-addresses-modal {
    &.change-name-address {
      .edit-content {
        .input {
          input {
            width: 154px;
          }
        }
      }
    }
  }
}
</style>
