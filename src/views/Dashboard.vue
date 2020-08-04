<template>
  <div class="dashboard">
    <nav>
      <a class="button" @click="showLive()" v-bind:class="{active: !isHistory}" href="#">Live</a>
      <a class="button" @click="showHistory()" v-bind:class="{active: isHistory}" href="#">History</a>
    </nav>
    <section v-if="visits.length" class="list">
      <div v-for="visit in visits" :key="visit.id" class="visit">
        <div v-if="((!visit.left_at || !visit.seated_at) && !isHistory) || (visit.left_at && visit.seated_at && isHistory)" class="customer">
          <p>{{ visit.user.maskedName }}</p>
          <p>{{ visit.user.maskedNumber }}</p>
        </div>
        <div class="actions">
          <a v-if="!visit.seated_at && !isHistory" @click="seat(visit)" class="seated">Seated</a>
          <a v-else-if="!visit.left_at && !isHistory" @click="left(visit)" class="left">Left</a>
          <p v-else-if="visit.left_at && isHistory">{{ visit.left_at | formatDate }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from 'moment'

export default {
  data() {
    return {
      isHistory: false
    };
  },
  computed: {
    ...mapState(["visits"])
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
      if (!val) { return '-' }

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
        background-color: #B26E6E;
      }
    }
  }
}
</style>
