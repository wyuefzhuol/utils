<template>
  <div class="mine-sweeper-box">
    <div>
      <button id="chuji">初级</button>
      <button id="zhongji">中级</button>
      <button id="gaoji">高级</button>
      <span id="span">剩余次数 2</span>
      <span>剩余雷的数量：</span><span id="num">40</span>
      <a href="javascript:void(0)">重新开始游戏</a>
    </div>
    <div id="mineSweeperBox"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Mine from '../../utils/fishing/mineSweeper.js';

onMounted(() => {
  let box = document.getElementById("mineSweeperBox"),
    mine1 = new Mine(10, 10, 10, 2),
    mine2 = new Mine(20, 20, 40, 2),
    mine3 = new Mine(30, 30, 99, 3),
    arr = [mine1, mine2, mine3],
    buts = document.getElementsByTagName("button"),
    len = buts.length,
    mine = new Mine(20, 20, 40, 2),//记录上一次选择的难度，默认为中级
    back = document.getElementsByTagName("a")[0];
  mine.init();
  //点击重新开始游戏
  back.onclick = function() {
    box.innerHTML = "";
    mine.init();
  };
  for (let i = 0; i < len; i++) {
    (function(j) {
      buts[j].addEventListener("click", function() {
        box.innerHTML = "";
        arr[j].init();
        mine = arr[j];//将此次选择的难度传入到外部函数
      });
    })(i);
  }
})
</script>

<style>
.mine-sweeper-box tr{margin: 0 auto;padding: 0!important;}
.mine-sweeper-box tr td{width: 20px;height: 20px;display: inline-block;box-shadow: 0px 0px 0px 0.3px #777;margin: 0;padding: 0;text-align: center;background: white;color: #777;font-size: 8px;line-height: 20px;}
.mine-sweeper-box table{display: inline-block;margin: 0 auto;}
.mine-sweeper-box .zero{background: #e5e5e5;}
.mine-sweeper-box .one{color: deepskyblue;}
.mine-sweeper-box .two{color: forestgreen;}
.mine-sweeper-box .three{color: hotpink;}
.mine-sweeper-box .four{color: #777;}
.mine-sweeper-box .five{color: chocolate;}
.mine-sweeper-box .six{color: crimson;}
.mine-sweeper-box .seven{color: darkmagenta;}
.mine-sweeper-box .eight{color: deeppink;}
.mine-sweeper-box .mine{background:url(../../assets/img/mineSweeper/bomb.png) no-repeat;background-size: 100%;}
.mine-sweeper-box .onlyMine{background:url(../../assets/img/mineSweeper/blast.png) no-repeat;background-size: 100%;}
.mine-sweeper-box .flag{background: url(../../assets/img/mineSweeper/mark.png) 5px 2px no-repeat;background-size: 70%;}
.mine-sweeper-box button{background: #c6d8aa;color: white;font-size: 10px;margin-bottom: 20px;margin-top: 10px;margin-left: 10px;}
.mine-sweeper-box span{font-size: 10px;;}
.mine-sweeper-box p{font-size: 10px;}
.mine-sweeper-box a{text-decoration: none;color: white;background: red;padding: 2px 10px;font-size: 10px;}
</style>
