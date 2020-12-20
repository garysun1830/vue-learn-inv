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
import axios from "axios";
import Pagination from "vue-pagination-2";

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
      webApiRoot: process.env.VUE_APP_WEB_API_ROOT,
      InvoiceList: { columns: [], data: [] },
      filterDate: "2020/1/1 - 2020/12/31",
      page: 1,
      totalRec: 0,
      pageLine: 18,
      pageTitle: "支出列表",
    };
  },
  created() {
    this.$emit("onViewChange",{main:this.pageTitle,sub:this.filterDate});

    const urlGetInvoiceStat = "invoice/stat/1";
    this.callAPI(this.popURL(urlGetInvoiceStat), "post", null, (data1) => {
      this.totalRec = data1.TotalRec;
      this.updateList();
    });
  },
  computed: {},
  methods: {
    popURL(url) {
      return `${this.webApiRoot}${url}`;
    },
    callAPI(url, method, data, onSucc) {
      const prom =
        method == "get"
          ? axios.get(url, { data: data })
          : method == "post"
          ? axios.post(url, { data: data })
          : null;
      if (prom !== null) {
        prom
          .then((response) => {
            if (response.status == 200) {
              if (onSucc !== null) {
                onSucc(response.data);
              }
            } else {
              console.log(
                `Calling API Failed. Status Code: ${response.status}.`
              );
            }
          })
          .catch((error) => {
            console.log(`Failed: ${error.message}`);
          });
      }
    },
    goPage() {
      this.updateList();
    },
    updateList() {
      this.callAPI(
        this.popURL(`invoice/list/1/${this.page}/${this.pageLine}`),
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
  padding: 15px 15px 0px 15px;
}
.VuePagination {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}
</style>
