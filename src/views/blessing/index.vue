<template>
  <h-common-page>
    <h-common-scroll>
      <div :class="$style.main">
        <div
          :class="$style.header">
          <div :class="$style.background">
            <p>{{ firstBlessing }}</p>
            <div
              :class="$style.arrow"
              @click="arrow" />
          </div>
          <div :class="$style.backgroundBottom" />
        </div>
      </div>
    </h-common-scroll>
  </h-common-page>
</template>

<script>
export default {

  methods: {
    arrow () {
      this.$router.push({name: 'blessingEnd', query: {...this.$route.query}})
    }
  },

  data () {
    return {
      firstBlessing: '我志愿加入共产党，拥护党的纲领，遵守党的章程，履行党的义务,执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终生，随时准备为党和人民牺牲一切，永不叛党。'
    }
  }
}

</script>

<style lang="less" module>
  @import './index.less';
</style>
