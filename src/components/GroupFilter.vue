<template>
  <div>
    <mt-switch class="filter-item" v-model="SelAll"
      >{{ FilterName }}</mt-switch
    >
    <div class="filter-line" v-show="!SelAll">
      <GroupCheckbox :GroupItem="UnselItems"></GroupCheckbox>
      <div class="filter-group-button">
        <div style="margin-top: 40px">
          <mt-button class="filter-button" type="primary">></mt-button>
        </div>
        <div style="margin-top: 80px">
          <mt-button class="filter-button" type="primary"> &lt;</mt-button>
        </div>
        <div style="margin-top: 10px">
          <mt-button class="filter-button" type="primary">&lt; &lt;</mt-button>
        </div>
      </div>
      <GroupCheckbox :GroupItem="SelItems"></GroupCheckbox>
    </div>
  </div>
</template>

<script>
import GroupCheckbox from "./GroupCheckbox.vue";

export default {
   components: {
    GroupCheckbox,
  }, props: ["FilterName", "SelAll", "UnselItems", "SelItems"],
};
</script>

<style lang="scss" scoped>
.filter-item {
  margin-top: 20px;
}
.filter-group-button {
  height: 300px;
  width: 120px;
}
.filter-button {
  margin-left: 30px;
  width: 60px;
}
</style>