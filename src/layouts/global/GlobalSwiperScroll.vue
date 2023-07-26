<template>
  <div ref="swiperScroll" class="left-right-swiper-scroll-box">
    <div
      v-show="showLeftIcon"
      @click="handleLeftClick"
      class="scroll-icon left-icon"
    >
      <i>
        <lay-icon type="layui-icon-left"></lay-icon>
      </i>
    </div>
    <div ref="swiperScrollContent" class="swiper-scroll-content">
      <slot></slot>
    </div>
    <div
      v-show="showRightIcon"
      @click="handleRightClick"
      class="scroll-icon right-icon"
    >
      <i>
        <lay-icon type="layui-icon-right"></lay-icon>
      </i>
    </div>
  </div>
</template>


<script lang='ts'>
export default {
  name: 'GlobalSwiperScroll'
}
</script>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

const showRightIcon = ref(false)
const swiperScrollWidth = ref(0)
const swiperScrollContentWidth = ref(0)
const maxClickNum = ref(0)
const lastLeft = ref(0)
const clickNum = ref(0)
const childrenList = ref<any[]>([])
const swiperScroll = ref<any>()
const swiperScrollContent = ref<any>()

const showLeftIcon = computed({
  get() {
    return clickNum.value > 0
  },
  set(value) {
    showLeftIcon.value = value
  }
})
onMounted(() => {
  childrenList.value = [...swiperScrollContent.value.children]
  swiperScrollWidth.value = swiperScroll.value.getBoundingClientRect().width
  console.log(swiperScrollWidth.value, 'swiperScrollWidth')
  swiperScrollContentWidth.value =
    swiperScrollContent.value.getBoundingClientRect().width
  if (swiperScrollWidth.value < swiperScrollContentWidth.value) {
    showRightIcon.value = true
  }
})

function handleRightClick() {
  if (clickNum.value < childrenList.value.length - 1) {
    const width =
      childrenList.value[clickNum.value].getBoundingClientRect().width
    const lastItemOffsetLeft =
      childrenList.value[childrenList.value.length - 1].offsetLeft
    const lastWidth =
      childrenList.value[childrenList.value.length - 1].getBoundingClientRect()
        .width
    const lookWidth = swiperScroll.value.clientWidth
    if (lastItemOffsetLeft + lastWidth > lookWidth) {
      swiperScrollContent.value.style.marginLeft = `${
        -width + lastLeft.value
      }px`
      lastLeft.value = -width + lastLeft.value
      clickNum.value++
      maxClickNum.value = clickNum.value
    }
    const timer = setTimeout(() => {
      const lastItemOffsetLeft2 =
        childrenList.value[childrenList.value.length - 1].offsetLeft
      if (lastItemOffsetLeft2 + lastWidth <= lookWidth) {
        showRightIcon.value = false
      }
      clearTimeout(timer)
    }, 200)
  }
}
function handleLeftClick() {
  if (clickNum.value > 0) {
    const width =
      childrenList.value[clickNum.value - 1].getBoundingClientRect().width
    swiperScrollContent.value.style.marginLeft = `${lastLeft.value + width}px`
    lastLeft.value = width + lastLeft.value
    clickNum.value--
    if (clickNum.value < maxClickNum.value) {
      showRightIcon.value = true
    }
  }
}

interface SwiperListProps {
  swiperList: Object
}
const props = withDefaults(defineProps<SwiperListProps>(), {
  swiperList: undefined
})
</script>


<style lang='less' scoped>
.left-right-swiper-scroll-box {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;
  .scroll-icon {
    position: absolute;
    top: 0;
    width: 70px;
    height: 30px;
    z-index: 9;
    cursor: pointer;
    background: #ddd;
    i {
      position: absolute;
      top: 5px;
      width: 20px;
      height: 20px;
      line-height: 37px;
    }
    &.left-icon {
      left: 0;
      background: #fff;
      i {
        left: 0;
        background: #ccc;
      }
    }
    &.right-icon {
      right: 0;
      background: #fff;
      i {
        right: 0;
        background: #ccc;
      }
    }
  }
  .swiper-scroll-content {
    display: inline-block;
    white-space: nowrap;
    transition: all 0.3s;
  }
}
</style>
