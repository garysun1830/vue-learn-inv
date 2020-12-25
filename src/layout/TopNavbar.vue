<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <span class="navbar-brand" href="#">{{ PageTitle }}</span>
      <span class="sub-page-title" v-show="FilterDateVisible"> {{ FilterDate }}</span>
      <TaxForms :Visible="TaxFormVisible" @OnChange="updateTaxForm"></TaxForms>
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
import TaxForms from "../components/TaxForm.vue";

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
    };
  },
  components: {
    TaxForms,
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
    updateTaxForm(taxForm) {
      this.$emit("OnTaxFormChange", taxForm);
    },
  },
  props: ["PageTitle", "FilterDate", "FilterDateVisible", "TaxFormVisible"],
};
</script>
<style>
.navbar-brand {
  padding-top: 0px;
  padding-bottom: 0px;
}
.navbar .navbar-brand {
  font-weight: 600;
}
.sub-page-title {
  margin-left: 20px;
  margin-right: 20px;
  color: #888888;
}
</style>
