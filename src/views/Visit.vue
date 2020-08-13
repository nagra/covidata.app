<template>
  <div>
    <div class="invalid" v-if="!isValidVenue">
      <h1>Not Found 😕</h1>
      <p>
        This venue isn't on Covidata yet. <br />Please ask the owner to sign up
        to the service.
      </p>
    </div>
    <div class="visit" v-else>
      <div class="details">
        <h1>{{ venue.name }}</h1>
        <address v-if="venue.formattedAddress">
          {{ venue.formattedAddress }}
        </address>
      </div>
      <form v-on:submit.prevent>
        <input
          v-model.trim="firstName"
          name="first_name"
          type="text"
          autocapitalize="on"
          autocorrect="off"
          autocomplete="off"
          placeholder="First Name"
        />
        <input
          v-model.trim="lastName"
          name="last_name"
          type="text"
          autocapitalize="on"
          autocorrect="off"
          autocomplete="off"
          placeholder="Last Name"
        />
        <input
          v-model.trim="mobile"
          name="mobile"
          type="tel"
          placeholder="Mobile Number"
        />
        <input
          v-model.trim="totalGuests"
          name="total_guests"
          type="text"
          placeholder="Total Guests (including you)"
        />
        <div class="summary">
          <h3 class="privacy" v-bind:class="{ active: hasSummary }">
            {{ venue.name }} only see
          </h3>

          <div class="card-button">
            <div class="card" v-bind:class="{ active: hasSummary }">
              <p>{{ maskedName }}</p>
              <p>{{ maskedMobile }}</p>
            </div>
            <button :disabled="!canSubmit" @click="log()">
              Log<br />
              Visit
            </button>
          </div>
        </div>
        <p class="reminder">
          All details for this visit will automatically be deleted after 21
          days.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      mobile: "",
      totalGuests: "",
      venueUsername: "",
      venue: "",
      isValidVenue: false,
    };
  },
  methods: {
    log() {
      this.$store.dispatch("loading", true);
      this.$store.dispatch("log", {
        log: {
          firstName: this.firstName,
          lastName: this.lastName,
          maskedName: this.maskedName,
          mobile: this.formattedMobile,
          maskedMobile: this.maskedMobile,
          totalGuests: this.totalGuests,
          venue: this.venueUsername,
        },
        venueID: this.venue.id,
      });
    },
    validateVenue() {
      this.$store.dispatch("loading", true);
      this.$store
        .dispatch("getVenue", this.venueUsername)
        .then(venue => {
          this.$store.dispatch("loading", false);
          this.isValidVenue = venue != undefined;
          this.venue = venue;
        })
        .catch(error => {
          this.$store.dispatch("loading", false);
        });
    },
  },
  computed: {
    canSubmit() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.mobile.length > 0 &&
        this.totalGuests.length > 0
      );
    },
    hasSummary() {
      return this.maskedName.length > 0 || this.maskedMobile.length > 0;
    },
    maskedName() {
      const firstName = this.firstName.length > 0;
      const lastName = this.lastName.length > 0;
      if (!firstName || !lastName) {
        return "";
      }
      const firstNameInitial = this.firstName.charAt(0);
      return firstNameInitial.toUpperCase() + "." + this.lastName.toUpperCase();
    },
    formattedMobile() {
      if (this.mobile.length == 0) {
        return "";
      }
      var parsed = parsePhoneNumberFromString(this.mobile, "GB");
      if (!parsed) {
        return "";
      }
      return parsed.number;
    },
    maskedMobile() {
      var formattedMobile = this.formattedMobile;
      if (formattedMobile.length == 0) {
        return "";
      }
      if (formattedMobile.length < 4) {
        return "*".repeat(formattedMobile.length);
      }

      var mobileLengthMinusThree = formattedMobile.length - 3;
      var lastThree = formattedMobile.substr(formattedMobile.length - 3);
      return "*".repeat(mobileLengthMinusThree) + lastThree;
    },
  },
  created() {
    this.venueUsername = this.$route.path.replace("/", "");
    this.validateVenue();
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: #fff;
  line-height: 100%;
  text-align: left;
}

h1 {
  font-size: 3rem;
  margin: 0.9375rem;
}

address {
  font-size: 1.125rem;
  color: #fff;
  opacity: 0.5;
  font-style: normal;
  margin: 0 0 1.25rem 1rem;
  max-width: 12rem;
  text-align: left;
}
button {
  border-radius: 0.5rem;
  align-self: stretch;
  justify-self: end;
  width: 5rem;
}
.summary {
  margin: 1.875rem auto 0;
  width: 100%;
}
.card-button {
  display: grid;
  grid-template-columns: 1fr min-content;
  column-gap: 0.5rem;
  justify-content: space-between;
}
.privacy {
  background: url("../assets/static/img/hand-outline.svg") no-repeat left center;
  opacity: 0;
  padding-left: 1.25em;

  &.active {
    opacity: 0.5;
  }
}
.card {
  opacity: 0;
  background: #004b93;
  border-radius: 0.5rem;
  padding: 0.9375rem;

  &.active {
    opacity: 1;
  }

  p {
    opacity: 0.8;
    margin: 0;
    text-align: left;
  }
}
.reminder {
  font-size: 1.125rem;
  text-align: left;
  opacity: 0.5;
}

@media screen and (min-width: 400px) {
  .visit,
  .invalid {
    h1,
    address {
      text-align: center;
    }
    address {
      margin: 0 auto 1.25rem;
    }
  }
  .invalid {
    h1 {
      margin-top: 3rem;
    }
  }
}
</style>
