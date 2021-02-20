<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/admin/invoice-list">
        <i class="nc-icon nc-notes"></i>
        <p>支出列表</p>
      </sidebar-link>
      <sidebar-link to="/admin/filter">
        <i class="nc-icon nc-vector"></i>
        <p>过滤器</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/report">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>税务报表</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>

      <template slot="bottom-links">
        <sidebar-link class="active" to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template>
    </side-bar>
    <div class="main-panel" style="max-height: 2000px; height: auto">
      <top-navbar
        :PageTitle="PageTitle"
        :FilterDateVisible="FilterDateVisible"
        :TaxFormVisible="taxFormVisible"
        @OnTaxFormChange="updateTaxForm"
        ref="TopBar"
      ></top-navbar>

      <dashboard-content
        :TaxForm="taxForm"
        @click="toggleSidebar"
        @onContentChange="updateViewPage"
      >
      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  data() {
    return {
      PageTitle: null,
      FilterDateVisible: false,
      taxFormVisible: false,
      taxForm: null,
    };
  },
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    updateViewPage(viewPage) {
      if (viewPage) {
        this.PageTitle = viewPage.PageTitle;
        this.FilterDateVisible = viewPage.FilterDateVisible;
        this.taxFormVisible = viewPage.taxFormVisible;
      }
      this.$refs.TopBar.updateFromView();
    },
    updateTaxForm(TaxForm) {
      this.taxForm = TaxForm;
    },
  },
};
</script>
<style>
.main-panel > .content {
  padding: 15px 15px 0px 15px;
}
</style>
