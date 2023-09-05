<template>
  <div>
    <div class="timer-start-main">
      <div
        class="timer-start"
        title="Create a new timer"
        @click="startNewTimer"
      >
        <img :src="Logo1" alt="Timer Logo" class="logo" />
        <button>Start Timer</button>
      </div>
    </div>
    <div v-for="(timer, index) in timers" :key="index">
      <div class="timer-container" v-if="timer.isOpen">
        <div
          class="timer-div"
          :style="{
            backgroundColor: timer.isRunning
              ? 'rgba(255, 192, 203, 0.447)'
              : '',
          }"
        >
          <p :style="{ color: timer.isRunning ? 'black' : '' }">
            {{ timer.formattedTime }}

            <button class="toggle-btn" @click="toggleTimer(timer)">
              <img
                v-if="timer.isRunning"
                :src="Logo3"
                alt="Play Logo"
                class="logo"
                title="Pause recording"
              />
              <img
                v-else
                :src="Logo2"
                alt="Pause Logo"
                class="logo"
                title="Start the timer"
              />
            </button>
            <button class="save-close-btn" @click="closeTimer(timer)">
              <img
                v-if="timer.isRunning"
                :src="Logo7"
                alt="Close Logo"
                class="logo"
                title="Cancel this timer"
              />
              <img
                v-else
                :src="Logo5"
                alt="Close Logo"
                class="logo"
                title="Cancel this timer"
              />
            </button>
            <button class="save-close-btn" @click="openModal">
              <img
                v-if="timer.isRunning"
                :src="Logo6"
                alt="Save Logo"
                class="logo"
                title="Stop the timer and save to time sheet"
              />
              <img
                v-else
                :src="Logo4"
                alt="Save Logo"
                class="logo"
                title="Save to the time sheet"
              />
            </button>
          </p>
        </div>
        <div class="timer-text-div">
          <p class="timer-description" @click="openModal(timer)">
            <em>{{ timer.timerDescription || 'No Description' }}</em>
          </p>
          <p class="timer-no-matter"><em>No matter selected</em></p>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div>
        <p class="timer-modal-text-head">Edit Description</p>
        <p class="timer-modal-text">Create a description for the time entry</p>
      </div>
        <input v-model="modalText" class="timer-description-text-field" placeholder="Description"/>
        <div class="timer-button-div">
          <button @click="cancelModalChanges" class="timer-modal-cancel-btn">Cancel</button>
        <button @click="saveModalChanges" class="timer-modal-save-btn">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "../../assets/blackStopwatch.png";
import Play from "../../assets/play.png";
import Pause from "../../assets/pause.png";
import Save from "../../assets/save.png";
import Close from "../../assets/exit.png";
import SaveBlack from "../../assets/saveBlack.png";
import CloseBlack from "../../assets/exitBlack.png";

export default {
  data() {
    return {
      timers: [],
      timerId: 1,
      Logo1: Timer,
      Logo2: Play,
      Logo3: Pause,
      Logo4: Save,
      Logo5: Close,
      Logo6: SaveBlack,
      Logo7: CloseBlack,
      showModal: false,
      modalText: "",
    };
  },
  methods: {
    startNewTimer() {
      this.timers.forEach((timer) => {
        this.pauseTimer(timer);
      });

      const newTimer = {
        id: this.timerId++,
        startTime: Date.now(),
        isRunning: true,
        lastPausedTime: 0,
        interval: setInterval(() => {
          if (newTimer.isRunning) {
            const elapsed =
              Date.now() - newTimer.startTime + newTimer.lastPausedTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            newTimer.formattedTime = `${hours}:${
              minutes < 10 ? "0" : ""
            }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            this.$forceUpdate();
          }
        }),
        isOpen: true,
      };

      this.timers.unshift(newTimer);
    },
    toggleTimer(timer) {
      if (timer.isRunning) {
        this.pauseTimer(timer);
      } else {
        this.resumeTimer(timer);
      }
    },
    pauseTimer(timer) {
      if (timer.isRunning) {
        clearInterval(timer.interval);
        timer.isRunning = false;
        timer.lastPausedTime += Date.now() - timer.startTime;
      }
    },
    resumeTimer(timer) {
      if (!timer.isRunning) {
        timer.startTime = Date.now();
        timer.isRunning = true;
        timer.interval = setInterval(() => {
          if (timer.isRunning) {
            const elapsed = Date.now() - timer.startTime + timer.lastPausedTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            timer.formattedTime = `${hours}:${
              minutes < 10 ? "0" : ""
            }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            this.$forceUpdate();
          }
        }, 1000);
      }
    },
    closeTimer(timer) {
      timer.isOpen = false;
    },
    openModal(timer) {
      this.showModal = true;
      this.modalText = timer.timerDescription;
      this.currentTimer = timer;
    },

    closeModal() {
      if (this.currentTimer) {
        this.currentTimer.timerDescription = this.modalText;
      }
      this.showModal = false;
    },
    saveModalChanges() {
      if (this.currentTimer) {
        this.currentTimer.timerDescription = this.modalText;
      }
      this.showModal = false;
    },

    cancelModalChanges() {
      this.showModal = false;
    },
  },
  beforeUnmount() {
    this.timers.forEach((timer) => {
      clearInterval(timer.interval);
    });
    this.timers = [];
  },
};
</script>


<style scoped>
.timer-container {
  border: 1px solid rgba(0, 0, 0, 0.112);
  margin-bottom: 10px;
  border-radius: 3px;
}

.timer-div {
  height: 2rem;
  padding-left: 7px;
  padding-top: 3px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(84, 83, 83, 0.879);
  color: white;
}

.timer-text-div {
  padding-left: 7px;
}

.toggle-btn {
  margin-left: 0.7rem;
  margin-top: 0.2rem;
}

.timer-description {
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: 500;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.793);
}

.timer-description:hover {
  color: black;
}

.timer-no-matter {
  margin-bottom: 5px;
  font-size: 11px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.793);
}

.timer-no-matter:hover {
  color: black;
}

.timer-start {
  border: 1px solid rgba(0, 0, 0, 0.249);
  width: 7rem;
  height: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  border-radius: 5px;
  font-size: 15px;
  margin-bottom: 1.5rem;
  cursor: pointer;
}

.timer-start:hover {
  background-color: rgba(0, 0, 0, 0.105);
}

.timer-start-main {
  display: flex;
  justify-content: flex-end;
}

.save-close-btn {
  float: right;
  margin-right: 1rem;
  margin-top: 3px;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #000000;
  width: 90%;
}

.timer-description-text-field {
  border: 1px solid rgba(0, 0, 0, 0.219);
  width: 100%;
  height: 50px;
  display: flex;
  margin-bottom: 1rem;
  padding-left: 0.7rem;
}
.timer-button-div {
  display: flex;
  justify-content: space-between;
}

.timer-modal-text-head {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.timer-modal-text {
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.timer-modal-cancel-btn {
  font-size: 12px;
}

.timer-modal-save-btn {
  border: none;
  width: 50px;
  height: 40px;
  background-color: #58a46c;
  color: white;
}
</style>