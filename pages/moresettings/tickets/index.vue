<template>
  <div class="tickets">
    <block-nav-back text="TICKETS" to="/moresettings" />
    <ul class="tickets-list">
      <li class="tickets-item tickets-card border-gradient">
        <div class="left-blur"></div>
        <nuxt-link to="/moresettings/tickets/active-tickets">
          <div class="card-in">
            <div class="left-block">
              <h2 class="card-title">ACTIVE TICKETS</h2>
              <p class="card-description">Active tickets with Oracle Support</p>
            </div>
            <button class="active-ticket-btn ticket-btn"></button>
          </div>
        </nuxt-link>
      </li>
      <li class="tickets-item tickets-card border-gradient">
        <div class="left-blur"></div>
        <nuxt-link to="/moresettings/tickets/closed-tickets">
          <div class="card-in">
            <div class="left-block">
              <h2 class="card-title">CLOSED TICKETS</h2>
              <p class="card-description">
                Past tickets opened with Oracle Support
              </p>
            </div>
            <button class="closed-ticket-btn ticket-btn"></button>
          </div>
        </nuxt-link>
      </li>
      <li class="tickets-item tickets-card border-gradient">
        <div class="left-blur"></div>
        <nuxt-link to="/moresettings/tickets/new-ticket">
          <div class="card-in">
            <div class="left-block">
              <h2 class="card-title">OPEN NEW TICKET</h2>
              <p class="card-description">
                Chat with Support to create a new <br />
                ticket for questions or claims
              </p>
            </div>
            <button class="new-ticket-btn ticket-btn">
              <addCircleIcon />
            </button>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import addCircleIcon from '@/assets/svg/moresettings/add-circle.svg?inline'

@Component({
  components: {
    addCircleIcon,
  },
})
export default class TicketsPage extends Vue {
  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.tickets {
  &-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .tickets-card {
      .card-in {
        padding: 20px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .card-title {
          margin-bottom: 8px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 12px;
          color: #fff;
        }
        .card-description {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
        }
        .ticket-btn {
          width: 15px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: #1b961f;
          box-shadow: 0 0 10px #1b961f;
          &.closed-ticket-btn {
            background: #d80027;
            box-shadow: 0 0 10px #d80027;
          }
          &.new-ticket-btn {
            background: transparent;
            box-shadow: 0 0 10px #eb4b2a;
            svg {
              min-width: 18px;
              min-height: 18px;
              margin: -0.5px -0.5px 0 0;
            }
          }
        }
      }
    }
  }
}
</style>
