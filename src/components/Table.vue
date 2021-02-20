<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th
            v-for="column in columns"
            :key="column.id"
            :class="itemClass(column)"
            v-show="columnShow(column)"
          >
            <span @click="clickColumn(column)">{{ column.caption }}</span>
            <i
              class="fa fa-caret-up"
              aria-hidden="true"
              v-show="columnSort(column) == 'up'"
            ></i>
            <i
              class="fa fa-caret-down"
              aria-hidden="true"
              v-show="columnSort(column) == 'down'"
            ></i>
          </th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index" v-show="itemShow(item)">
        <slot :row="item">
          <td
            v-for="column in columns"
            :key="column.id"
            :class="itemClass(column)"
            v-show="columnShow(column)"
          >
            <input
              type="checkbox"
              v-if="column.type === 'check'"
              :checked="itemChecked(item, column)"
            />
            <span v-else-if="column.type === '$'">
              {{ itemValue(item, column) | formatCurrency }}</span
            >
            <span v-else-if="itemValue(item, column) === null"> &nbsp;</span>
            <span v-else> {{ itemValue(item, column) }}</span>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
import search from "src/Search";

export default {
  name: "l-table",
  props: ["columns", "data", "filter"],
  methods: {
    itemValue(item, column) {
      const val = item[column.name];
      return val === null ? null : val;
    },
    itemClass(column) {
      return column.align === "right"
        ? "text-right"
        : column.align === "center"
        ? "text-center"
        : null;
    },
    columnShow(column) {
      return column.type != "hidden";
    },
    itemChecked(item, column) {
      return item[column.name];
    },
    itemShow(item) {
      return item["Visible"] === undefined || item["Visible"];
    },
    columnSort(column) {
      if (column.name == this.filter.SortField)
        return this.filter.DESC ? "down" : "up";
      return null;
    },
    clickColumn(column) {
      search.changeSort(this.filter, column.name);
      this.$emit("ChangeSort");
    },
  },
};
</script>
<style>
.table > thead > tr > th {
  text-align: center !important;
  cursor: default;
}
.currency {
  text-align: right !important;
}
.text-center {
  text-align: center;
}
</style>
