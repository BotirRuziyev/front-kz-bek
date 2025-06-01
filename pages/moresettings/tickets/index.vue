<template>
  <div class="tickets">
    <div class="main-container">
      <block-nav-back text="Tickets" to="/moresettings" :add="true" />

      <!-- Filter -->
      <div class="tickets__filter">
        <button
          v-for="option in filterOptions"
          :key="option"
          class="tickets__filter-button"
          :class="{
            'tickets__filter-button--active': selectedFilter === option,
          }"
          @click="selectFilter(option)"
        >
          {{ option }}
        </button>
      </div>

      <!-- Ticket List -->
      <div
        v-for="(group, index) in filteredTicketGroups"
        :key="index"
        class="tickets__group"
      >
        <h2 class="tickets__date">{{ group.date }}</h2>
        <ul class="tickets__items">
          <li v-for="(ticket, i) in group.tickets" :key="i">
            <nuxt-link
              :to="`/moresettings/tickets/${ticket.id}`"
              class="tickets__card"
            >
              <p class="tickets__card-id">
                <strong>ID:</strong> #{{ ticket.id }}
              </p>
              <p class="tickets__card-title">{{ ticket.title }}</p>
              <time class="tickets__card-time">{{ ticket.time }}</time>
              <span
                class="tickets__card-status"
                :class="{
                  'tickets__card-status--active': ticket.status === 'Active',
                  'tickets__card-status--closed': ticket.status === 'Closed',
                }"
              >
                {{ ticket.status }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import addCircleIcon from '@/assets/svg/moresettings/add-circle.svg?inline'

interface Ticket {
  id: string
  title: string
  time: string
  status: 'Active' | 'Closed'
}

interface TicketGroup {
  date: string
  tickets: Ticket[]
}

@Component({
  components: {
    addCircleIcon,
  },
})
export default class TicketsPage extends Vue {
  selectedFilter: string = 'All'
  filterOptions: string[] = ['All', 'Active', 'Closed']

  ticketGroups: TicketGroup[] = [
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

  selectFilter(option: string): void {
    this.selectedFilter = option
  }

  get filteredTicketGroups(): TicketGroup[] {
    if (this.selectedFilter === 'All') {
      return this.ticketGroups
    }

    return this.ticketGroups
      .map((group) => ({
        date: group.date,
        tickets: group.tickets.filter(
          (ticket) => ticket.status === this.selectedFilter
        ),
      }))
      .filter((group) => group.tickets.length > 0)
  }
}
</script>

<style lang="scss">
.tickets {
  &__filter {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    &-button {
      width: 40px;
      position: relative;
      padding-bottom: 6px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      text-align: center;
      color: #fff;
      &::after {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 10px;
        background: #f64e2a;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
      &--active {
        color: #f64e2a;
        &::after {
          width: 100%;
        }
      }
    }
  }
  &__date {
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__items {
    margin-bottom: 24px;
  }
  &__card {
    display: block;
    width: calc(100% + 32px);
    border-bottom: 1px solid #2b2741;
    padding: 12px 16px;
    position: relative;
    margin-left: -16px;
    &-id {
      margin-bottom: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 10px;
      line-height: 130%;
      color: #7a74ba;
    }
    &-title {
      margin-bottom: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-time {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      color: #7a74ba;
    }
    &-status {
      padding: 5.5px 10px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 145%;
      position: absolute;
      right: 16px;
      bottom: 22px;
      &--active {
        background: #31f62a;
        color: #000;
      }
      &--closed {
        background: #292929;
        color: #f2ff00;
      }
    }
  }
}
</style>
