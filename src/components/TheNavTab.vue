<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#58a46c" class="ok">
      <v-tab value="one">My Matters</v-tab>
      <v-tab value="two">My Day</v-tab>
      <v-tab value="three"
        >Timers<img :src="Logo1" alt="Timer Logo" class="logo" />
      </v-tab>

      <v-container>
        <v-row justify="end">
          <v-btn min-width="30" class="custom-color" variant="text">
            <img :src="Logo2" alt="Email Logo" class="logo" />
          </v-btn>
          <v-btn min-width="30" class="custom-color"  variant="text">
            <img :src="Logo3" alt="Call Logo" class="logo" />
          </v-btn>
        </v-row>
      </v-container>

    </v-tabs>

    <div>
      <TheSearch :activeTab="tab" />
    </div>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <TheCards />
        </v-window-item>

        <v-window-item value="two"><TheDate /></v-window-item>

        <v-window-item value="three"> <TheTimer/> </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import TheSearch from "./TheSearch.vue";
import TheCards from "./mattersCards/TheCards.vue";
import timerLogo from "../assets/timer.png";
import emailLogo from "../assets/email.png";
import callLogo from "../assets/call.png";
import TheDate from './MyDay/TheDate.vue';
import TheTimer from './timer/TheTimer.vue';

export default {
  data: () => ({
    tab: null,
    Logo1: timerLogo,
    Logo2: emailLogo,
    Logo3: callLogo,
  }),
  components: {
    TheSearch,
    TheCards,
    TheDate,
    TheTimer,
  },
};
</script>

<style>
.v-tab,
.v-window-item {
  text-transform: none;
}

.ok {
  position: fixed;
  z-index: 998;
  width: 100%;
}

.logo {
  width: 20px;
  height: 20px;
  z-index: 999;
  margin-left: 0.2rem;
  margin-top: -0.2rem;
}

.custom-color {
  background-color: #58a46c;
  margin-top: 0.1rem;
}

</style>


