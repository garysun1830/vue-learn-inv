<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">支出列表</h4>
              <p class="card-category">{{ filterDate }}</p>
            </template>
            <l-table
              class="table-hover table-striped table-sm"
              :columns="table1.columns"
              :data="table1.data"
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
import Card from "src/components/Cards/Card.vue";
const tableColumns = [
  "编号 ",
  "日期",
  "收款方",
  "类别",
  "金额",
  "GST",
  "总额",
  "文件",
  "备注",
  "Active",
];
const tableData = [
  {
    id: 1,
    date: "2020/3/5",
    payee: "Dakota Rice",
    cat:"food",
    amount: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 2,
    date: "2020/3/15",
    payee: "Minerva Hooper",
    amount: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    amount: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 4,
    payee: "Philip Chaney",
    amount: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 5,
    payee: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
];
export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      filterDate: "2020/1/1 - 2020/12/31",
    };
  },
};
</script>
<style>
</style>
