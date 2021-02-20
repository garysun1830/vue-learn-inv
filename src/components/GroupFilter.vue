<template>
  <div>
    <mt-switch v-model="selAll">{{ FilterName }}</mt-switch>
    <div class="filter-line" v-show="!selAll">
      <GroupCheckbox
        :GroupItem="UnselItems"
        @ItemGoOut="OnSelectItems"
        ref="UnselGroup"
      ></GroupCheckbox>
      <div class="filter-group-button">
        <div style="margin-top: 40px">
          <mt-button class="filter-button" type="primary" @click="moveToSel"
            >></mt-button
          >
        </div>
        <div style="margin-top: 80px">
          <mt-button class="filter-button" type="primary" @click="moveToUnsel">
            &lt;</mt-button
          >
        </div>
        <div style="margin-top: 10px">
          <mt-button
            class="filter-button"
            type="primary"
            @click="moveToUnselAll"
            >&lt; &lt;</mt-button
          >
        </div>
      </div>
      <GroupCheckbox
        :GroupItem="SelItems"
        @ItemGoOut="OnUnselectItems"
        ref="SelGroup"
      ></GroupCheckbox>
    </div>
  </div>
</template>

<script>
import GroupCheckbox from "./GroupCheckbox.vue";

export default {
  components: {
    GroupCheckbox,
  },
  mounted() {
    
  },
  props: ["FilterName", "SelAll", "UnselItems", "SelItems"],
  methods: {
    moveToSel() {
      this.$refs.UnselGroup.Moveout(false);
    },
    moveToUnsel() {
      this.$refs.SelGroup.Moveout(false);
    },
    moveToUnselAll() {
      this.$refs.SelGroup.Moveout(true);
    },
    OnSelectItems(items) {
      this.$refs.SelGroup.Movein(items);
    },
    OnUnselectItems(items) {
      this.$refs.UnselGroup.Movein(items);
    },
    // SelItemIDs() {
    //   const selIds = [];
    //   this.SelItems.forEach((item) => {
    //     selIds.push(item.ID);
    //   });
    //   return selIds;
    // },
  },
  computed: {
    selAll: {
      get() {
        return this.SelAll;
      },
      set(check) {
        this.$emit("ChangeSelAll", check);
      },
    },
    // UnselItemList() {
    //   const selIds = this.SelItemIDs();
    //   const r = this.UnselItems.filter(
    //     (item) => selIds.indexOf(item.ID) === -1
    //   );
    //   return r;
    // },
  },
};
</script>

<style lang="scss" scoped>
.filter-group-button {
  height: 300px;
  width: 120px;
}
.filter-button {
  margin-left: 30px;
  width: 60px;
}
</style>