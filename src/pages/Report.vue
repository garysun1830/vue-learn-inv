<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="places-buttons">
            <div class="row justify-content-left">
              <div class="col-md-3" v-for="button in buttons" :key="button.id">
                <button
                  class="btn btn-default btn-block"
                  :class="button.active"
                  @click="clickForReport(button.id)"
                >
                  {{ button.name }}
                </button>
              </div>
              <div class="chk-active">
                <input type="checkbox" :checked="ActiveOnly" /> Active Only
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <l-table
              class="table-hover table-striped table-sm"
              :columns="ReportList.columns"
              :data="ReportList.data"
              :filter="filter"
            >
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from "src/components/Table.vue";
import commonMothods from "src/commonMothod";
import search from "src/Search";

const tableColumns = [
  { id: 2, type: "", align: "", name: "Name", caption: "名称" },
  { id: 7, type: "$", align: "right", name: "Subtotal", caption: "金额" },
  { id: 8, type: "$", align: "right", name: "GST", caption: "GST" },
  { id: 9, type: "$", align: "right", name: "Amount", caption: "总额" },
  { id: 10, type: "$", align: "right", name: "TaxSubtotal", caption: "税金额" },
  { id: 11, type: "$", align: "right", name: "TaxGST", caption: "税GST" },
  { id: 12, type: "$", align: "right", name: "TaxAmount", caption: "税总额" },
  { id: 13, type: "", align: "", name: "Space", caption: "" },
];

export default {
  components: {
    LTable,
  },
  data() {
    return {
      pageTitle: "税务报表",
      defaultSortField: 2,
      filter: {},
      buttons: [
        { id: 1, name: "Tax", active: null },
        { id: 2, name: "Payment", active: null },
        { id: 3, name: "Payee", active: null },
      ],
      ActiveOnly: true,
      ReportList: { columns: [], data: [] },
    };
  },
  methods: {
    clickForReport(id) {
      this.buttons.forEach((btn) => {
        if (btn.id === id) {
          btn.active = "active";
          this.createReport(btn);
        } else {
          btn.active = null;
        }
      });
    },
    createReport(btn) {
      if (this.TaxForm === null) {
        return;
      }
      tableColumns.forEach((col) => {
        if (col.name === "Name") {
          col.caption = btn.name;
        }
      });
      commonMothods.callAPI(
        `report/1/${btn.name}/${this.TaxForm.ID}/${this.ActiveOnly ? 1 : 0}`,
        "post",
        this.filter,
        (data) => {
          data.forEach((dt) => (dt["Space"] = null));
          this.ReportList = {
            columns: [...tableColumns],
            data: [...data],
          };
        }
      );
    },
  },
  created() {
    this.filter = search.load({ SortField: this.defaultSortField });
    this.$emit("onViewChange", {
      PageTitle: this.pageTitle,
      FilterDateVisible: true,
      taxFormVisible: true,
    });
  },
  mounted() {
    if (this.buttons.length > 0) {
      this.clickForReport(this.buttons[0].id);
    }
  },
  props: ["TaxForm"],
  watch: {
    TaxForm: function (newVal, oldVal) {
      this.buttons.forEach((btn) => {
        if (btn.active === "active") {
          this.createReport(btn);
        }
      });
    },
  },
};
</script>
<style>
.places-buttons .btn {
  padding-right: 0;
}
.places-buttons .btn.active {
  background-color: #f5c4b2;
  border-color: #f36f2ead;
}
.chk-active {
  margin-left: 20px;
}
</style>
