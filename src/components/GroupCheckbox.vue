<template>
  <div class="filter-group-item">
    <div style="height: 20px"></div>
    <div
      v-for="item in GroupItem"
      :key="item.id"
      style="padding-left: 10px"
    >
      <input type="checkbox" /><label style="margin-left: 8px">{{
        item.text
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["GroupItem"],
};
</script>

<style lang="scss" scoped>
.filter-group-item {
  overflow-y: scroll;
  height: 300px;
  width: 300px;
  border-color: #cccccc;
  border-width: 1px;
  border-style: Solid;
}
</style>