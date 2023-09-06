<template>
  <v-app>
    <v-main>
      <TheNavTab />
    </v-main>
  </v-app>
</template>

<script>
import TheNavTab from "./components/TheNavTab.vue";

export default {
  name: "App",

  components: {
    TheNavTab,
  },

  data: () => ({
    //
  }),
};
</script>
