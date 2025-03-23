<template>
  <div class="active-tickets">
    <block-nav-back text="ACTIVE TICKETS" to="/moresettings/tickets" />
    <ul class="active-tickets-list">
      <li
        v-for="ticket in tickets"
        :key="ticket.id"
        class="active-tickets-item tickets-card border-gradient"
      >
        <div class="left-blur"></div>
        <nuxt-link
          :to="`/moresettings/tickets/active-tickets/${ticket.id}`"
          class="card-in"
        >
          <div class="left-block">
            <h2 class="card-title">{{ ticket.title }}</h2>
            <p class="card-review">IN REVIEW</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TicketsPage extends Vue {
  tickets = [
    {
      id: '10101010',
      title: 'Ticket #10101010',
    },
    {
      id: '10101011',
      title: 'Ticket #10101011',
    },
    {
      id: '10101012',
      title: 'Ticket #10101012',
    },
  ]

  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.active-tickets {
  &-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .tickets-card {
      position: relative;
      &::before {
        content: '';
        width: 74px;
        height: 60px;
        background: url('@/assets/svg/ticket-expired.svg') no-repeat
          center/cover;
        position: absolute;
        top: 0;
        right: 15px;
      }
      .card-in {
        padding: 20px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 2;
        .card-title {
          margin-bottom: 14px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 14px;
          color: #fff;
        }
        .card-review {
          width: fit-content;
          background: rgba(255, 233, 67, 0.24);
          border-radius: 19px;
          padding: 2px 5px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 10px;
          color: #ffb943;
        }
      }
    }
  }
}
</style>
