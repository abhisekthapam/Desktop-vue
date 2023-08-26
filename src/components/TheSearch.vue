<template>
  <v-card-text class="custom-margin-padding">
    <v-text-field
      v-if="activeTab === 'one'"
      :loading="loading"
      density="compact"
      variant="solo"
      label="Searching Matters"
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
      @click:prepend-inner="onClick"
      class="text"
    >
      <v-container class="plus-icon">
        <v-row justify="end">
          <v-btn
            variant="text"
            icon="mdi-plus"
            class="mt-n3"
            title="Add Client or Matter"
          >
          </v-btn>
        </v-row>
      </v-container>
    </v-text-field>
  </v-card-text>
</template>
  
  <script>
export default {
  props: {
    activeTab: String,
  },
  data: () => ({
    loaded: false,
    loading: false,
  }),
  methods: {
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
};
</script>
  
  <style>
.custom-margin-padding {
  margin: 0;
  margin-top: 3rem;
  padding: 0;
}

.plus-icon {
  height: 1rem;
  opacity: 0.7;
}

.mdi-plus:hover {
  color: #58a46c;
}

.text {
  font-size: 10px;
}
</style>
  