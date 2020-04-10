<template>
  <div
    ref="scroller"
    :class="$style.root">
    <slot />
  </div>
</template>

<script>
const history = {}

export default {
  name: 'HCommonScroll',
  props: {
    pullRefresh: {
      type: Function,
      default: undefined
    }
  },
  mounted () {
    this.$_resetScrollTop()
    this.$refs.scroller.addEventListener('scroll', this.$_scroll)
  },
  beforeDestroy () {
    this.$refs.scroller.removeEventListener('scroll', this.$_scroll)
  },
  activated () {
    this.$_resetScrollTop()
  },
  methods: {
    $_resetScrollTop () {
      const path = window.location.pathname
      const old = history[path]
      if (old > 0) {
        this.$refs.scroller.scrollTo(0, old)
      }
    },
    $_scroll (e) {
      const path = window.location.pathname
      history[path] = e.target.scrollTop
    }
  }
}
</script>

<style lang="less" module>
  .root {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
