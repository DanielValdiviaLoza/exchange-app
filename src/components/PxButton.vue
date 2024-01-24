<template>
  <button
    @click="onClick"
    class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white"
  >
    <vue-spinner-bounce
      v-show="isLoading"
      color="red"
      size="40"
    ></vue-spinner-bounce>
    <p v-show="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>
<script>
import { VueSpinnerBounce } from "vue3-spinners";

export default {
  name: "px-button",
  components: {
    VueSpinnerBounce,
  },
  props: {
    isLoading: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>
