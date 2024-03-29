<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder">
            Ranking
          </span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-50-100 focus:outline-none border-b border-gray-400 py-2 px-4 bloc w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`"
            :alt="a.name"
          />
        </td>
        <td>
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link
            :to="{ name: 'coin-detail', params: { id: a.id } }"
            class="hover:underline text-green-600"
          >
            {{ a.name }}
          </router-link>
          <small class="ml-1 text-gray-400">
            {{ a.symbol }}
          </small>
        </td>
        <td>{{ $filters.DollarFilter(a.priceUsd) }}</td>
        <td>{{ $filters.DollarFilter(a.marketCapUsd) }}</td>
        <td
          :class="a.changePercent24Hr > 0 ? 'text-green-500' : 'text-red-400'"
        >
          {{ $filters.PercentFilter(a.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button @onClick="goToCoin(a.id)"><span>Detalle</span></px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "./PxButton.vue";
export default {
  name: "PxAssetsTable",
  components: {
    PxButton,
  },
  data() {
    return {
      filter: "",
      sortOrder: 1,
    };
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToCoin(id) {
      this.$router.push({
        name: "coin-detail",
        params: {
          id: id,
        },
      });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          (a) =>
            a.symbol
              .toString()
              .toLowerCase()
              .includes(this.filter.toLocaleLowerCase()) ||
            a.name
              .toString()
              .toLowerCase()
              .includes(this.filter.toLocaleLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    },
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
