<template>
  <div class="custom-margin-padding" v-if="activeTab === 'one'">
    <div class="text-field">
      <div class="input-wrapper">
        <img :src="Logo1" alt="Search Logo" class="logo" />
        <input          
          type="text"
          placeholder="Searching Matters"
          @click="onClick"
        />
        <img :src="Logo2" alt="Plus Logo" class="logo" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../assets/search.png';
import Plus from '../assets/plus.png';

export default {
  props: {
    activeTab: String,
  },
  data() {
    return {
      Logo1: Search,
      Logo2: Plus,
    };
  },
};
</script>

<style scoped>
input {
  margin-top: 4rem;
  width:100%;
  font-size: 15px;
  outline: none;
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #58a46c;
}

.logo {
  margin-top: 4rem;
  cursor: pointer;
  opacity: 0.5;
  margin-left: 1rem;
  margin-right: 1rem;
}

.logo:hover {
  opacity: 1;
}

</style>
