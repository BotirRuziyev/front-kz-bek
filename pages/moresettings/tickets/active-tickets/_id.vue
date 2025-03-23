<template>
  <div class="active-ticket-id">
    <block-nav-back
      :text="`TICKET #${ticketId}`"
      to="/moresettings/tickets/active-tickets"
    />
    <ul class="ticket-info">
      <li class="info-item">
        <h4 class="ticket-title">Your claim</h4>
        <p class="ticket-description">
          Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt
          huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån.
          Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.
        </p>
      </li>
      <li class="info-item">
        <h4 class="ticket-title">Next step</h4>
        <p class="ticket-description">
          Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt
          huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån.
          Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.
        </p>
      </li>
    </ul>
    <button-oracle text="CHECK UPDATES & CHAT WITH SUPPORT" color="orange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ActiveTicketId extends Vue {
  get ticketId() {
    return this.$route.params.id
  }

  layout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.active-ticket-id {
  padding-bottom: 40px;
  .ticket-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: #15151f;
    padding: 24px 8px 8px;
    margin-bottom: 35px;
    border-radius: 12px;
    .info-item {
      .ticket-title {
        padding-left: 7px;
        margin-bottom: 18px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        color: #fff;
      }
      .ticket-description {
        background: #262633;
        border-radius: 8px;
        padding: 14px 14px 30px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .ticket-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  button {
    &.orange {
      height: 48px;
      span {
        font-size: 10px;
      }
    }
  }
}
</style>
