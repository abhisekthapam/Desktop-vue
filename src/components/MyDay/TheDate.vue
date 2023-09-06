<template>
  <div>
    <div class="calander-div">
      <div class="custom-flex">
        <div>
          <p>
            Date:
            <span class="custom-input"
              ><input
                type="text"
                v-model="selectedDateText"
                readonly
                class="selected-date"
                @click="showCalendar = !showCalendar"
              />
            </span>
          </p>
        </div>
        <div>
          <p class="billable">Billable: 0.00h</p>
        </div>
      </div>

      <div v-if="showCalendar">
        <div class="year-month">
          <label for="year">Year:&nbsp;</label>
          <select
            class="custom-select"
            id="year"
            v-model="selectedYear"
            @change="updateCalendar"
          >
            <option v-for="year in availableYears" :key="year">
              {{ year }}
            </option>
          </select>

          <span class="month"><label for="month">Month:&nbsp;</label></span>
          <select
            id="month"
            class="custom-select two"
            v-model="selectedMonth"
            @change="updateCalendar"
          >
            <option
              v-for="(month, index) in months"
              :key="month"
              :value="index"
            >
              {{ month }}
            </option>
          </select>
        </div>
        <div id="calendar">
          <table>
            <thead>
              <tr>
                <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
                <td
                  v-for="(day, dayIndex) in week"
                  :key="dayIndex"
                  :class="{ empty: !day.date }"
                >
                  <div
                    v-if="day.date"
                    class="calendar-day"
                    @click="selectDate(day.date)"
                  >
                    {{ day.date }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="footer-div">
      <p>
        You don't have any time entries recorded for
        <span class="selected-text">{{ selectedDateText }}</span>
      </p>
      <p>To add some, pick a matter and then add time</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weeks: [],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      selectedDate: new Date(),
      selectedDateText: new Date().toDateString(),
      showCalendar: false,
    };
  },
  computed: {
    availableYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => currentYear + i);
    },
  },
  methods: {
    generateCalendar(year, month) {
      this.weeks = [];
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      let dayCounter = 1;
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            week.push({ date: null });
          } else if (dayCounter <= daysInMonth) {
            week.push({ date: dayCounter });
            dayCounter++;
          } else {
            week.push({ date: null });
          }
        }
        this.weeks.push(week);
      }
    },
    updateCalendar() {
      this.generateCalendar(this.selectedYear, this.selectedMonth);
      this.selectedDate = null;
      this.selectedDateText = new Date(
        this.selectedYear,
        this.selectedMonth,
        1
      ).toDateString();
    },
    selectDate(day) {
      const selectedDate = new Date(this.selectedYear, this.selectedMonth, day);
      this.selectedDate = selectedDate;
      this.selectedDateText = selectedDate.toDateString();
    },
  },
  mounted() {
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: center;
  padding: 8px;
}

th {
  background-color: #58a46c;
  color: white;
}

td.empty {
  background-color: #f7f7f7;
}

td {
  cursor: pointer;
}

#calendar table {
  background-color: #fff;
}

.calendar-day {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.calendar-day:hover {
  color: #58a46c;
  filter: brightness(1);
  border-radius: 50%;
  background-color: #58a46c25;
}

.selected-date {
  width: 135px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

#calendar {
  position: fixed;
}

.calendar-div {
  position: fixed;
}

.custom-input {
  font-size: 14px;
  font-weight: 500;
}

.custom-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.6rem;
}

.billable {
  margin-top: 1rem;
}

.footer-div {
  margin-top: 2rem;
  text-align: center;
}

.selected-text {
  font-weight: 700;
  display: flex;
  justify-content: center;
}

.year-month {
  padding: 0.3rem;
  display: flex;
  margin-top: 0.5rem;
}

.month {
  margin-left: 1rem;
}

.custom-select {
  width: 100px;
  padding-left: 2rem;
  cursor: pointer;
}

.two {
  padding-left: 1rem;
}
</style>
