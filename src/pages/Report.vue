<template></template>
<script>
export default {
  data() {
    return {
      pageTitle: "税务报表",
    };
  },
  created() {
    this.$emit("onViewChange", {
      mainTitle: this.pageTitle,
      taxFormVisible: true,
    });
  },
};
</script>
<style>
.main-panel > .content {
  padding: 15px 15px 0px 15px;
}
</style>
