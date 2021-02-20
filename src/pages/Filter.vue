<template>
  <div class="content">
    <div class="container-fluid filter">
      <mt-switch class="filter-item" v-model="filter.SelectAllDates"
        >All Dates</mt-switch
      >
      <div class="filter-line" v-show="!filter.SelectAllDates">
        <span class="filter-cell"> Begin Date </span>
        <datepicker
          class="filter-cell-2"
          v-model="filter.Dates[0]"
        ></datepicker>
        <span class="filter-cell"> End Date </span>
        <datepicker
          class="filter-cell-2"
          v-model="filter.Dates[1]"
        ></datepicker>
        <mt-button class="filter-cell pri-button" type="primary"
          >Fiscal Year</mt-button
        >
      </div>
      <GroupFilter
        class="filter-item"
        FilterName="All Category"
        :SelAll="filter.SelectAllCategories"
        :UnselItems="allCatogories"
        :SelItems="filter.SelectedCategories"
        @ChangeSelAll="ChangeSelAllCategory"
      >
      </GroupFilter>
      <GroupFilter
        class="filter-item"
        FilterName="All Payee"
        :SelAll="filter.SelectAllPayees"
        :UnselItems="allPayees"
        :SelItems="filter.SelectedPayees"
        @ChangeSelAll="ChangeSelAllPayee"
      >
      </GroupFilter>
      <div class="filter-item">
        <mt-field
          label="关键词："
          placeholder="关键词"
          v-model="filter.Keyword"
        ></mt-field>
      </div>
      <div class="filter-item filter-bottom">
        <mt-button type="primary" @click="saveFilter" class="pri-button"
          >保存
        </mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import commonMothods from "src/commonMothod";
import GroupFilter from "src/components/GroupFilter.vue";
import search from "src/Search";

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
      allPayees: [],
      allCatogories: [],
    };
  },
  methods: {
    ChangeSelAllCategory(check) {
      this.filter.SelectAllCategories = check;
    },
    ChangeSelAllPayee(check) {
      this.filter.SelectAllPayees = check;
    },
    saveFilter() {
      search.save(this.filter);
      this.$emit("onViewChange");
    },
  },
  created() {
    this.$emit("onViewChange", {
      PageTitle: this.pageTitle,
      FilterDateVisible: false,
      taxFormVisible: false,
    });
    commonMothods.callAPI("list/all/category/1", "get", null, (data) => {
      this.allCatogories = data;
    });
    commonMothods.callAPI("list/payee/1/true", "get", null, (data) => {
      this.allPayees = data;
    });
    this.filter = search.load({
      AllCatogories: this.allCatogories,
      AllPayees: this.allPayees,
    });
  },
  computed: {},
};
</script>
<style>
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
.filter-item {
  margin-top: 20px;
  width: 720px;
}
.pri-button {
  min-width: 100px;
}
.filter-bottom {
  padding-bottom: 40px;
}
</style>
