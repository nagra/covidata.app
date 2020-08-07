<template>
  <div class="loading">
    <div class="flower-spinner">
      <div class="dots-container">
        <div class="bigger-dot">
          <div class="smaller-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.loading {
  background-color: rgba(0, 94, 184, 0.6);
  backdrop-filter: blur(10px);
  display: grid;
  align-content: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

.flower-spinner,
.flower-spinner * {
  box-sizing: border-box;
}

.flower-spinner {
  height: 70px;
  width: 70px;
  margin: -70px 0 0 -35px;
}

.flower-spinner .dots-container {
  height: calc(70px / 7);
  width: calc(70px / 7);
}

.flower-spinner .smaller-dot {
  background: #ffffff;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  animation: flower-spinner-smaller-dot-animation 2.5s 0s infinite both;
}

.flower-spinner .bigger-dot {
  background: transparent;
  height: 100%;
  width: 100%;
  padding: 10%;
  border-radius: 50%;
  animation: flower-spinner-bigger-dot-animation 2.5s 0s infinite both;
}

@keyframes flower-spinner-bigger-dot-animation {
  0%,
  100% {
    box-shadow: #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px;
  }

  50% {
    transform: rotate(180deg);
  }

  25%,
  75% {
    box-shadow: #fff 26px 0px 0px, #fff -26px 0px 0px, #fff 0px 26px 0px,
      #fff 0px -26px 0px, #fff 19px -19px 0px, #fff 19px 19px 0px,
      #fff -19px -19px 0px, #fff -19px 19px 0px;
  }

  100% {
    transform: rotate(360deg);
    box-shadow: #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px;
  }
}

@keyframes flower-spinner-smaller-dot-animation {
  0%,
  100% {
    box-shadow: #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px;
  }

  25%,
  75% {
    box-shadow: #fff 14px 0px 0px, #fff -14px 0px 0px, #fff 0px 14px 0px,
      #fff 0px -14px 0px, #fff 10px -10px 0px, #fff 10px 10px 0px,
      #fff -10px -10px 0px, #fff -10px 10px 0px;
  }

  100% {
    box-shadow: #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px, #fff 0px 0px 0px,
      #fff 0px 0px 0px;
  }
}
</style>
