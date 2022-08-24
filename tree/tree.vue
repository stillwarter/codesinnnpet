<template>
  <canvas id="myCanvas" class="mycanvas" scale-50 origin-top-left />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { step, stepRe, startFrame, stopDraw } from "./hook/treeDomain";

let t: any;

onMounted(() => {
  const WIDTH = 100;
  const HEIGHT = 100;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const startPointx = 0;
  const startPointy = 57.9;
  let branch1 = {
    startPointx,
    startPointy,
    length: 2,
    theta: Math.PI / 4,
  };
  let branch2 = {
    startPointx: window.innerWidth,
    startPointy: window.innerHeight,
    length: 2,
    theta: -(Math.PI / 1.15),
  };
  step(ctx, branch1, 0);
  stepRe(ctx, branch2, 0);
  startFrame();

  window.onresize = function () {
    // 针对suface浏览器的下拉bug进行摆烂处理
    let sarfari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    if (!sarfari) {
      document.getElementById("myCanvas").width = window.innerWidth;
      document.getElementById("myCanvas").height = window.innerHeight;

      // 手动修改branch2的起始点
      branch2.startPointx = window.innerWidth;
      branch2.startPointy = window.innerHeight;
      // 手动结束当前绘制
      stopDraw();
      step(ctx, branch1, 0);
      stepRe(ctx, branch2, 0);
      startFrame();
    } else {
      return;
    }
  };
});
</script>
<style scoped>
.mycanvas {
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
}
</style>