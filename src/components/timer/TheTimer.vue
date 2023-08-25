<template>
    <div>
      <div class="stopwatch">
        <button @click="startStop" class="stopwatch-btn" title="Create a new timer">
          <img :src="Logo1" alt="Stopwatch Logo" class="stopwatchLogo" />Start Timer
        </button>
      </div>
      <div class="timer-output" v-if="showTimer">
        <div class="timer-output-inner">
          {{ isRunning ? formatTime : (stoppedTime !== null ? ` ${formatStoppedTime}` : '') }}
        </div> 
        <div class="description">
          <h1><em>No description</em></h1>
          <p><em>No matter selected</em></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import blackStopwatch from "../../assets/blackStopwatch.png";
export default {
  data() {
    return {
      isRunning: false,
      startTime: 0,
      elapsedTime: 0,
      stoppedTime: null,
      timer: null,
      showTimer:false,
      Logo1: blackStopwatch,
    };
  },
  computed: {
    formatTime() {
      const totalMilliseconds = this.elapsedTime;
      const seconds = Math.floor((totalMilliseconds / 1000) % 60);
      const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
      const hours = Math.floor(totalMilliseconds / 1000 / 3600);

      return `${hours.toString().padStart(2, "0")}:
                ${minutes.toString().padStart(2, "0")}:
                ${seconds.toString().padStart(2, "0")}`;
    },
    formatStoppedTime() {
      if (this.stoppedTime !== null) {
        const totalMilliseconds = this.stoppedTime;
        const seconds = Math.floor((totalMilliseconds / 1000) % 60);
        const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
        const hours = Math.floor(totalMilliseconds / 1000 / 3600);

        return `${hours.toString().padStart(2, "0")}:
                  ${minutes.toString().padStart(2, "0")}:
                  ${seconds.toString().padStart(2, "0")}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    startStop() {
      if (this.isRunning) {
        clearInterval(this.timer);
        this.isRunning = false;
        this.stoppedTime = this.elapsedTime;
      } else {
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.timer = setInterval(() => {
          this.elapsedTime = Date.now() - this.startTime;
        }, 10);
        this.isRunning = true;
        this.stoppedTime = null;
      }
      this.showTimer = true;
    },
    resetStoppedTime() {
      this.stoppedTime = null;
      this.elapsedTime = 0;
    },
  },
  beforeUnmounted() {
    clearInterval(this.timer);
  },
};
</script>
  

<style>
.stopwatch {
  border: 1px solid white;
  margin-bottom: 1rem;
}

.timer-output {
  border: 1px solid rgba(0, 0, 0, 0.532)   ;
  height: 6rem;
  margin-top: 3rem;

}

.timer-output-inner {
    height: 2rem;
    padding: 0.3rem;
    color: white;
    background: rgba(86, 85, 85, 0.912);
}
.stopwatch-btn {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    border: 1px solid black;
    margin: 0.1rem;
    padding:0.4rem;
    border-radius: 5px;
    float: right;
}

.stopwatch-btn:hover {
    cursor: pointer;
    background: rgba(128, 128, 128, 0.179);
}

.stopwatchLogo {
    width: 21px;
    margin-top: -0.2rem;
}

.description {
    height: 3rem;
   margin-top: 0.6rem;
   margin-left: 0.3rem;
}

h1 {
    font-weight: 400;
    font-size: 20px;
}
p{
    font-weight: 400;
    font-size: 12px;
    margin-top: 0.3rem;
}
</style>

  