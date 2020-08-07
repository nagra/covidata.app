<template>
  <div class="dashboard">
    <nav>
      <a
        class="button"
        @click="showLive()"
        v-bind:class="{ active: !isHistory }"
        href="#"
        >Live</a
      >
      <a
        class="button"
        @click="showHistory()"
        v-bind:class="{ active: isHistory }"
        href="#"
        >History</a
      >
    </nav>
    <section class="list">
      <section class="live" v-if="!isShowingHistory">
        <div v-for="visit in liveVisits" :key="visit.id" class="visit">
          <div class="customer">
            <p>{{ visit.masked.name }}</p>
            <p>{{ visit.masked.mobile }}</p>
          </div>
          <div class="actions">
            <p class="total-guests">{{ visit.user.total_guests }}</p>
            <a v-if="!visit.seated_at" @click="seat(visit)" class="seated"
              >Seated</a
            >
            <a v-else-if="!visit.left_at" @click="left(visit)" class="left"
              >Left</a
            >
          </div>
        </div>
      </section>
      <section class="history" v-if="isHistory">
        <div v-for="visit in historicalVisits" :key="visit.id" class="visit">
          <div class="customer">
            <p>{{ visit.masked.name }}</p>
            <p>{{ visit.masked.mobile }}</p>
          </div>
          <div class="actions">
            <p class="total-guests">{{ visit.user.total_guests }}</p>
            <p>{{ visit.left_at | formatDate }}</p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      isHistory: false
    };
  },
  computed: {
    ...mapState(["visits"]),
    liveVisits() {
      return this.visits.filter(function(visit) {
        return !visit.left_at || !visit.seated_at;
      });
    },
    historicalVisits() {
      return this.visits.filter(function(visit) {
        return visit.left_at && visit.seated_at;
      });
    },
    isShowingHistory() {
      return this.isHistory && this.historicalVisits;
    }
  },
  methods: {
    seat(visit) {
      this.$store.dispatch("seat", visit);
    },
    left(visit) {
      this.$store.dispatch("left", visit);
    },
    showLive() {
      this.isHistory = false;
    },
    showHistory() {
      this.isHistory = true;
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).calendar();
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: auto 1rem;
  justify-content: center;
  column-gap: 1rem;
}
.visit {
  display: flex;
  padding: 0.9375rem;
  justify-content: space-between;

  > div {
    max-width: 50%;
  }

  .customer {
    p {
      font-size: 1.25rem;
      margin: 0 0 0.9375rem;
      text-align: left;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }

  .actions {
    .total-guests {
      font-size: 1.5rem;
      margin: 0 0 0.5rem;
      background-color: #000;
      border-radius: 0.5rem;
      padding: 0.25rem;
      font-weight: bold;
    }
    a {
      align-self: center;
      display: block;
      cursor: pointer;
      border-radius: 0.375rem;
      display: block;
      font-weight: bold;
      font-size: 1.25rem;
      height: 2.75rem;
      line-height: 2.75rem;
      text-align: center;
      color: #000;
      width: 100px;

      &.seated {
        background-color: #77b26e;
      }

      &.left {
        background-color: #b26e6e;
      }
    }
  }
}
</style>
