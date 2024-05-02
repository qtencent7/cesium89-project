<style lang='less' scoped>
.pine {
  // position: absolute;
  // // left: 0;
  // // bottom: -83px;
  // width: 100px;
  // height: 100px;
  // box-sizing: border-box;
  // line-height: 120px;
  // text-indent: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2px;
  height: 200px;
  box-sizing: border-box;
  background-color: #38e1ff;
}

.pine::before {
  // content: "";
  // position: absolute;
  // left: 0;
  // bottom: -83px;
  // width: 40%;
  // height: 100%;
  // box-sizing: border-box;
  // border-bottom: 2px solid #38e1ff;
  // transform-origin: bottom left;
  // transform: rotateZ(90deg) scale(1.5);
  // animation: slash 0.5s;
  // filter: drop-shadow(1px 0px 2px #03abb4);
  /* transition: slash 2s; */
}
.box {
  width: 200px;
  height: 200px;
  position: relative;
}
</style>

<template>
<div class="box">
    <div class="pine"></div>
    <h1>hello world</h1>
</div>
</template>

<script setup>

</script>
