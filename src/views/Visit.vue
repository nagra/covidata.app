<template>
  <div class="visit">
    <h1>Log a Visit</h1>
    <form v-on:submit.prevent>
      <input name="first_name" placeholder="First Name" />
      <input name="last_name" placeholder="Last Name" />
      <input name="mobile" placeholder="Mobile Number" />
      <button>Log a Visit</button>
    </form>
  </div>
</template>
