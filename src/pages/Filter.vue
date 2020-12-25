<template>
  <div class="content">
    <div class="container-fluid filter">
      <mt-switch class="filter-item" v-model="filter.SelectAllDates"
        >All Dates</mt-switch
      >
      <div class="filter-line" v-show="!filter.SelectAllDates">
        <span class="filter-cell"> Begin Date </span>
        <datepicker class="filter-cell-2" :value="date"></datepicker>
        <span class="filter-cell"> End Date </span>
        <datepicker class="filter-cell-2" :value="date"></datepicker>
        <mt-button class="filter-cell" type="primary">Fiscal Year</mt-button>
      </div>
      <GroupFilter
        FilterName="All Category"
        :SelAll="filter.SelectAllCategories"
        :UnselItems="filter.SelectedCategories"
        :SelItems="filter.SelectedCategories"
      >
      </GroupFilter>
      <GroupFilter
        FilterName="All Payee"
        :SelAll="filter.SelectAllPayees"
        :UnselItems="filter.SelectedCategories"
        :SelItems="filter.SelectedCategories"
      >
      </GroupFilter>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import commonMothods from "src/commonMothod";
import search from "src/Search";
import GroupFilter from "src/components/GroupFilter.vue";

export default {
  components: {
    Datepicker,
    GroupFilter,
  },
  data() {
    return {
      pageTitle: "过滤器",
      date: new Date(2016, 9, 16),
      filter: {},
    };
  },
  methods: {},
  created() {
    this.filter = search;
    this.filter["SelectedCategories"] = [
      { id: 1, text: "a" },
      { id: 2, text: "b" },
      { id: 3, text: "c" },
    ];
    this.$emit("onViewChange", {
      PageTitle: this.pageTitle,
      FilterDateVisible: false,
      taxFormVisible: false,
    });
  },
};
</script>
<style >
.filter {
  font-size: 13px;
}
.filter-line {
  display: flex;
  align-items: center;
}
.filter-cell {
  margin-left: 30px;
}
.filter-cell-2 {
  margin-left: 10px;
}
.mint-button-text {
  margin-bottom: 0px;
}
</style>
