<template>
  <div
    :class="[$style.root, hasHeader && $style.hasHeader, hasFooter && $style.hasFooter, hasHeader && 'without-padding-top-64', hasHeader && showStatusbar && $style.showStatusbar]"
  >
    <div
      class="header-without-64"
      :class="[$style.appheader]"
      v-if="hasHeader"
    >
      <slot name="header"/>
    </div>
    <div :class="$style.footer" v-if="hasFooter">
      <slot name="footer"/>
    </div>
    <div class="body-without-64" :class="$style.body">
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  name: "HCommonPage",
  data() {
    return {
      hasHeader: !!this.$slots.header,
      hasFooter: !!this.$slots.footer
    };
  },
  computed: {
    showStatusbar() {
      return window.showStatusbarPlaceholder;
    },
  },
  beforeUpdate() {
    this.hasHeader = !!this.$slots.header;
    this.hasFooter = !!this.$slots.footer;
  }
};
</script>

<style lang="less" module>
@header-height: 44px;
@footer-height: 44px;

:global {
  .body-without-64 {
    .header-without-64 {
      height: 44px !important;
      line-height: 44px !important;
    }

    .without-padding-top-64 {
      padding-top: 44px !important;
    }
  }
}

.root {
  height: 100%;
  overflow: hidden;

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    height: 46px;
    line-height: 46px;
    background-color: white;
    transform: translateY(0);

    &.showStatusbar {
      height: 64px;
    }

    &.wx {
      height: @header-height;
      line-height: @header-height;
    }
  }
  .appheader {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    height: 46px;
    line-height: 46px;
    background-color: white;
    transform: translateY(0);
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    height: @footer-height;
    line-height: @footer-height;
    background-color: white;
    border-top: 1px solid #ddd;
    transform: translateY(0);
  }

  .body {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
}

.hasHeader {
  padding-top: 46px;

  &.wx {
    padding-top: @header-height;
  }
}

.showStatusbar {
  padding-top: 64px;
}

.hasFooter {
  padding-bottom: @footer-height;
}
</style>
