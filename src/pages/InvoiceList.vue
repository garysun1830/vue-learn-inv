<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <l-table
              class="table-hover table-striped table-sm"
              :columns="InvoiceList.columns"
              :data="InvoiceList.data"
            >
            </l-table>
          </card>
        </div>
      </div>
    </div>
    <pagination
      v-model="page"
      :records="totalRec"
      :per-page="pageLine"
      @paginate="goPage"
    />
  </div>
</template>
<script>
import LTable from "src/components/Table.vue";
import Pagination from "vue-pagination-2";
import commonMothods from "src/commonMothod";

const tableColumns = [
  { id: 1, type: "", align: "right", name: "ID", caption: "编号" },
  { id: 2, type: "", align: "", name: "ViewDate", caption: "日期" },
  { id: 3, type: "", align: "", name: "Payee", caption: "收款方" },
  { id: 4, type: "", align: "", name: "Category", caption: "类别" },
  { id: 5, type: "$", align: "right", name: "Subtotal", caption: "金额" },
  { id: 6, type: "$", align: "right", name: "GST", caption: "GST" },
  { id: 7, type: "$", align: "right", name: "Total", caption: "总额" },
  {
    id: 8,
    type: "check",
    align: "center",
    name: "IsElectronic",
    caption: "文件",
  },
  { id: 9, type: "", align: "", name: "Notes", caption: "备注" },
  { id: 10, type: "hidden", align: "", name: "Visible", caption: "" },
];

export default {
  components: {
    LTable,
    Pagination,
  },
  data() {
    return {
      InvoiceList: { columns: [], data: [] },
      page: 1,
      totalRec: 0,
      pageLine: 20,
      pageTitle: "支出列表",
    };
  },
  created() {
    this.$emit("onViewChange", {
      PageTitle: this.pageTitle,
      FilterDateVisible: true,
      taxFormVisible: false,
    });
    commonMothods.callAPI("invoice/stat/1", "post", null, (data) => {
      this.totalRec = data.TotalRec;
      this.updateList();
    });
  },
  props: { FilterDate: String },
  methods: {
    goPage() {
      this.updateList();
    },
    updateList() {
      commonMothods.callAPI(
        `invoice/list/1/${this.page}/${this.pageLine}`,
        "post",
        null,
        (data) => {
          this.InvoiceList = {
            columns: [...tableColumns],
            data: [...data],
          };
        }
      );
    },
  },
};
</script>
<style>
.main-panel > .content {
  padding-bottom: 0px;
}

.VuePagination {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}
</style>
