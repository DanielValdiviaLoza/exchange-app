<template>
  <div>
    <vue-spinner-bounce
      v-show="isLoading"
      color="#68d391"
      size="100"
    ></vue-spinner-bounce>
    <px-assets-table v-if="!isLoading" :assets="assets"></px-assets-table>
  </div>
</template>
<script>
import PxAssetsTable from "@/components/PxAssetsTable.vue";
import { VueSpinnerBounce } from "vue3-spinners";
import api from "@/api";
export default {
  name: "PageHome",
  components: {
    PxAssetsTable,
    VueSpinnerBounce,
  },
  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },
  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((res) => {
        this.assets = res;
      })
      .finally(() => (this.isLoading = false));
  },
};
</script>
