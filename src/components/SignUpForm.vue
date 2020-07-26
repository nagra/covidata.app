<template>
  <form v-on:submit.prevent>
    <div class="label-field">
      <label for="handle">covidata.app/</label>
      <input name="handle" placeholder="venue" />
    </div>
    <input name="address_line_1" placeholder="Address Line 1" />
    <input name="address_line_2" placeholder="Address Line 2" />
    <div class="field-field">
      <input name="city" placeholder="City" />
      <input name="postcode" placeholder="Postcode" />
    </div>
    <button>Sign Up</button>
  </form>
</template>

<style lang="scss" scoped>
.label-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;

  input {
    width: 100%;
  }
}
</style>
