<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ PageTitle }}</a>
      <span class="sub-page-title"> [{{ PageSubTitle }}]</span>
      <div class="collapse navbar-collapse justify-content-left">
        <ul class="navbar-nav">
          <base-dropdown title="Rent 1830">
            <a class="dropdown-item" href="#">Rent 1830</a>
            <a class="dropdown-item" href="#">Rent 4321</a>
            <a class="dropdown-item" href="#">Rent Silver</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
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
  },
  props: {
    PageTitle: String,
    PageSubTitle: String,
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
