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
            {{ column.caption }}
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
              {{ itemValue(item, column) | currencyFormat }}</span
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
export default {
  name: "l-table",
  props: ["columns", "data"],
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
  },
};
</script>
<style>
.table > thead > tr > th {
  text-align: center !important;
}
.currency {
  text-align: right !important;
}
.text-center {
  text-align: center;
}
</style>
