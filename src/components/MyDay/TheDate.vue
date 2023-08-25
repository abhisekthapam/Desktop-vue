<template>
  <v-app>
    <v-main>
      <v-container>
       <div class="custom-flex"> <div class="custom-flex-two">
        <div>
          <v-text>Date:</v-text>
        </div>
        <div>
          <v-row>
            <v-col cols="12">
              <v-text-field class="my-n5"
                v-model="formattedDate"
                @click="toggleDatePicker"
                readonly
                :style="{ width: '110px' }"
              ></v-text-field>
              <v-date-picker
                v-if="showDatePicker"
                show-adjacent-months
                v-model="selectedDate"
                @input="closeDatePicker"
                class="date"
              ></v-date-picker>
            </v-col>
          </v-row>
        </div>
    </div>
        <div class="billable">
        <v-text> Billable: 0.00h </v-text>
    </div>
</div>
      </v-container>
      <div class="footer-div">
      <v-text>You don't have any time entries recorded for {{ formattedDate }}.</v-text>
      <v-text>To add some, pick a matter and then add time</v-text>
    </div>
    </v-main>
  </v-app>
</template>
  
  <script>
export default {
  data() {
    return {
      showDatePicker: false,
      selectedDate: new Date(),
      formattedDate: "",
    };
  },
  methods: {
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
    updateFormattedDate() {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      this.formattedDate = this.selectedDate.toLocaleDateString(
        undefined,
        options
      );
    },
  },
  watch: {
    selectedDate() {
      this.updateFormattedDate();
    },
  },
  mounted() {
    this.updateFormattedDate();
  },
};
</script>

<style scoped>
.custom-flex {
    display: flex;
    justify-content: space-between;
}
.custom-flex-two {
    display: flex;
    gap: 1rem;
}

.date {
    margin-left: -3rem;
    margin-top: 1rem;
}

.footer-div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
}

</style>
  