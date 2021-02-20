<template>
  <div class="filter-group-item">
    <div style="height: 20px"></div>
    <div
      v-for="item in GroupItemSort"
      :key="item.ID"
      style="padding-left: 10px"
    >
      <label>
        <input
          type="checkbox"
          @change="itemChange"
          :itemid="item.ID"
          style="margin-left: 8px; margin-right: 8px"
        />{{ item.Name }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
    };
  },
  props: ["GroupItem"],
  methods: {
    pushid(id) {
      if (this.selected.indexOf(id) === -1) {
        this.selected.push(id);
      }
    },
    removeid(id) {
      const pos = this.selected.indexOf(id);
      if (pos !== -1) {
        this.selected.splice(pos, 1);
      }
    },
    itemChange(e) {
      const id = e.target.attributes.itemid.value;
      if (e.target.checked) {
        this.pushid(id);
      } else {
        this.removeid(id);
      }
    },
    Moveout(all) {
      const goOut = [];
      for (var i = this.GroupItem.length - 1; i >= 0; i--) {
        const idx = this.selected.indexOf(this.GroupItem[i].ID.toString());
        if (all || idx !== -1) {
          goOut.push(this.GroupItem[i]);
          this.GroupItem.splice(i, 1);
        }
      }
      this.selected = [];
      if (goOut.length > 0) {
        this.$emit("ItemGoOut", goOut);
      }
    },
    Movein(items) {
      items.forEach((item) => {
        this.GroupItem.push(item);
      });
    },
  },
  computed: {
    GroupItemSort() {
      return this.GroupItem.sort((a, b) => {
        return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
      });
    },
  },
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