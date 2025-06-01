<template>
  <div class="ticket-detail">
    <div class="main-container">
      <block-nav-back
        :add="true"
        to="/moresettings/tickets"
        :text="'Ticket #' + ticket?.id"
      />
      <div class="ticket-detail__meta">
        <div class="ticket-detail__info">
          <span class="ticket-detail__label">Created</span>
          <time class="ticket-detail__date">Apr 12, 2025</time>
        </div>

        <div class="ticket-detail__info">
          <span class="ticket-detail__label">
            {{ ticket?.status === 'Closed' ? 'Closed on' : 'Last update' }}
          </span>
          <time class="ticket-detail__date"> Apr 12, 2025 </time>
        </div>
        <span
          class="ticket-detail__status"
          :class="{
            'ticket-detail__status--active': ticket?.status === 'Active',
            'ticket-detail__status--closed': ticket?.status === 'Closed',
          }"
        >
          {{ ticket?.status }}
        </span>
      </div>

      <div class="ticket-detail__section">
        <h3 class="ticket-detail__section-title">Your request</h3>
        <p class="ticket-detail__section-text">
          Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt
          huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån.
          Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.
        </p>
      </div>

      <div class="ticket-detail__section">
        <h3 class="ticket-detail__section-title">
          {{
            ticket?.status === 'Closed'
              ? 'Support Decision'
              : 'Required Actions'
          }}
        </h3>
        <p class="ticket-detail__section-text">
          Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt
          huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån.
          Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.
        </p>
      </div>

      <div class="ticket-detail__footer">
        <new-oracle-button
          v-if="ticket?.status === 'Closed'"
          text="Reopen Ticket"
        />
        <new-oracle-button text="Chat with Support" color="yellow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TicketsIdPage extends Vue {
  get ticketId() {
    return this.$route.params.id
  }

  tickets = [
    {
      date: 'March 20, 2025',
      tickets: [
        {
          id: '101010101',
          title: 'Ticket title',
          time: '12:03',
          status: 'Active',
        },
        {
          id: '101010102',
          title: 'Ticket title',
          time: '12:03',
          status: 'Closed',
        },
        {
          id: '101010103',
          title: 'Ticket title',
          time: '12:03',
          status: 'Closed',
        },
        {
          id: '101010104',
          title: 'Ticket title',
          time: '12:03',
          status: 'Active',
        },
      ],
    },
    {
      date: 'March 20, 2025',
      tickets: [
        {
          id: '101010105',
          title: 'Ticket title',
          time: '12:03',
          status: 'Active',
        },
        {
          id: '101010106',
          title: 'Ticket title',
          time: '12:03',
          status: 'Closed',
        },
      ],
    },
  ]

  get ticket() {
    let foundTicket = null
    for (const group of this.tickets) {
      foundTicket = group.tickets.find((t) => t.id === this.ticketId)
      if (foundTicket) break
    }

    return foundTicket
  }
}
</script>

<style lang="scss">
.ticket-detail {
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 24px;
  }
  &__meta {
    display: flex;
    flex-wrap: wrap;
    row-gap: 12px;
    margin-bottom: 24px;
  }
  &__info {
    flex: 1 1 50%;
  }
  &__label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7a74ba;
  }
  &__date {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
  }
  &__status {
    padding: 5.5px 10px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 145%;
    &--active {
      background: #31f62a;
      color: #000;
    }
    &--closed {
      background: #292929;
      color: #f2ff00;
    }
  }
  &__section {
    width: calc(100% + 32px);
    margin-left: -16px;
    border-bottom: 1px solid #2b2741;
    padding: 12px 16px;
    &:nth-child(4) {
      border-bottom: 0;
    }
    &-title {
      margin-bottom: 5px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-text {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
  }
  &__footer {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 8px;
    padding: 0 4px;
    .new-oracle-button {
      line-height: 22px;
      padding: 11px 0;
    }
  }
}
</style>
