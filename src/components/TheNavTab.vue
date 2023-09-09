<template>
  <v-card>
    <div>
      <TheMenu />
    </div>
    <div>
    <v-tabs v-model="tab" bg-color="#58a46c" class="ok">
      <v-tab value="one">My Matters</v-tab>
      <v-tab value="two">My Day</v-tab>
      <v-tab value="three"
        >Timers<img :src="Logo1" alt="Timer Logo" class="logo timers" />
      </v-tab>

      <v-container>
        <v-row justify="end">          
          <v-btn min-width="30" class="custom-color" variant="text"> <TheEmail  @trigger-button-in-timer="StartTimerInTheTimer"/></v-btn>
          <v-btn min-width="30" class="custom-color"  variant="text">
            <img :src="Logo3" alt="Call Logo" class="logo" />
          </v-btn>
        </v-row>
      </v-container>
    </v-tabs>
  </div>

    <div>
      <TheSearch :activeTab="tab" />
    </div>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <TheCards />
        </v-window-item>

        <v-window-item value="two"><TheDate /></v-window-item>

        <v-window-item value="three"> <TheTimer  ref="theTimer"/> </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import TheSearch from "./TheSearch.vue";
import TheCards from "./mattersCards/TheCards.vue";
import timerLogo from "../assets/timer.png";
import callLogo from "../assets/call.png";
import TheDate from './MyDay/TheDate.vue';
import TheTimer from './timer/TheTimer.vue';
import TheMenu from '../components/theMenuBar/TheMenu.vue';
import TheEmail from '../components/email/TheEmail.vue';

export default {
  data: () => ({
    tab: null,
    Logo1: timerLogo,
    Logo3: callLogo,
  }),
  components: {
    TheSearch,
    TheCards,
    TheDate,
    TheTimer,
    TheMenu,
    TheEmail,
  },
  methods: {
    StartTimerInTheTimer() {
      this.$refs.theTimer.startNewTimer();
    },
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
  width: 16px;
  height: 16px;
  z-index: 999;
  margin-left: 0.2rem;
  margin-top: -0.2rem;
}

.custom-color {
  background-color: #58a46c;
  margin-top: 0.1rem;
}

.v-tab {
  font-size: 11px;
  font-weight: 400;
  padding: 0;
}

.v-btn {
  padding: 0;
  margin-left: 0.2rem;
}

.timers {
  display: none;
}
</style>


