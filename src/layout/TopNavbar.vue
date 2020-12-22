<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ PageTitle }}</a>
      <span class="sub-page-title"> {{ PageSubTitle }}</span>
      <div class="collapse navbar-collapse justify-content-left">
        <ul class="navbar-nav" v-show="TaxFormVisible">
          <base-dropdown :title="selTaxForm">
            <a
              class="dropdown-item"
              href="#"
              v-for="taxForm in taxForms"
              :key="taxForm.ID"
              @click="clickTaxForm(taxForm.Name)"
              >{{ taxForm.Name }}</a
            >
          </base-dropdown>
        </ul>
      </div>

      <button
        type="button"
        class="navbar-toggler navbar-toggler-right"
        :class="{ toggled: $sidebar.showSidebar }"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#"> Account </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link"> Log in </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link"> Log out </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import commonMothods from "src/commonMothod";

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
      taxForms: [],
      selTaxForm: null,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    clickTaxForm(text) {
      this.selTaxForm = text;
    },
  },
  props: {
    PageTitle: String,
    PageSubTitle: String,
    TaxFormVisible: Boolean,
  },
  created() {
    this.TaxFormVisible = false;
    commonMothods.callAPI("list/form/1", "get", null, (data) => {
      this.taxForms = data;
      if (this.taxForms.length > 0) {
        this.selTaxForm = this.taxForms[0].Name;
      }
    });
  },
};
</script>
<style>
.sub-page-title {
  margin-left: 20px;
  margin-right: 20px;
  color: #888888;
}
</style>
