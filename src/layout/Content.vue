<template>
  <transition name="fade" mode="out-in">
    <router-view @onViewChange="updatePageTitle"></router-view>
  </transition>
</template>
<script>
export default {
  methods: {
    updatePageTitle(title) {
      this.$emit("onContentChange", title);
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
