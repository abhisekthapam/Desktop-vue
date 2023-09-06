<template>
  <div>
    <img @click="triggerTheTimer" :src="Logo2" alt="Email Logo" class="logo" />
  </div>
</template>

<script>
import emailLogo from "../../assets/email.png";

export default {
  data() {
    return {
      Logo2: emailLogo,
    };
  },
  methods: {
    triggerTheTimer() {
      this.$emit("trigger-button-in-timer");
    },
  },
};
</script>

  