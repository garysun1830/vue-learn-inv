<template>
  <div class="collapse navbar-collapse justify-content-left">
    <ul class="navbar-nav" v-show="Visible">
      <base-dropdown :title="selTaxForm.Name">
        <a
          class="dropdown-item"
          href="#"
          v-for="taxForm in taxForms"
          :key="taxForm.ID"
          @click="clickTaxForm(taxForm)"
          >{{ taxForm.Name }}</a
        >
      </base-dropdown>
    </ul>
  </div>
</template>
<script>
import commonMothods from "src/commonMothod";

export default {
  data() {
    return {
      taxForms: [],
      selTaxForm: { ID: 0, Name: "" },
    };
  },
  methods: {
    clickTaxForm(taxForm) {
      this.selTaxForm = taxForm;
      this.$emit("OnChange", this.selTaxForm);
    },
  },
  props: ["Visible"],
  created() {
    commonMothods.callAPI("list/form/1", "get", null, (data) => {
      this.taxForms = data;
      if (this.taxForms.length > 0) {
        this.clickTaxForm(this.taxForms[0]);
      }
    });
  },
  mounted() {
    this.clickTaxForm(this.selTaxForm);
  },
};
</script>
<style lang="scss" scoped>
</style>