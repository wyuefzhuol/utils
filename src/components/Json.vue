<template>
<!--  <div id="Canvas" class="Canvas">-->
<!--    <pre class="CodeContainer">-->
<!--      <span class="ObjectBrace">{</span>-->
<!--      <span><img src="/images/Expanded.gif" onclick="ExpImgClicked(this)"></span>-->
<!--      <span class="collapsible">-->
<!--        <span class="PropertyName">"name"</span>: <span class="String">"张三"<span class="Comma">,</span></span>-->
<!--        <span class="PropertyName">"addtime"</span>: <span class="String">"2014-01-01"<span class="Comma">,</span> </span>-->
<!--        <span class="PropertyName">"username"</span>: <span class="String">"abc"<span class="Comma">,</span> </span>-->
<!--        <span class="PropertyName">"id"</span>: <span class="ObjectBrace">{</span>-->
<!--        <span><img src="/images/Expanded.gif" onclick="ExpImgClicked(this)"></span>-->
<!--        <span class="collapsible">-->
<!--          <span class="PropertyName">"nihao"</span>: <span class="String">"woshiwangfeilong"</span>-->
<!--        </span>-->
<!--        <span class="ObjectBrace">}</span>-->
<!--      </span>-->
<!--      <span class="ObjectBrace">}</span>-->
<!--    </pre>-->
<!--  </div>-->
</template>

<script setup>
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
div.Canvas {
  font-size: 13px;
  background-color: #ECECEC;
  color: #000000;
  border: solid 1px #CECECE;
}
PRE.CodeContainer img {
  cursor: pointer;
  border: none;
  margin-bottom: -1px;
}
img {
  vertical-align: middle;
  display: inline;
}
img {
  border: 0;
}
PRE.CodeContainer {
  margin-top: 0;
  margin-bottom: 0;
}
pre {
  display: block;
  padding: 10px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
code, kbd, pre, samp {
  font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
}
code, kbd, pre, samp {
  font-family: monospace,monospace;
  font-size: 1em;
}
.ObjectBrace {
  color: #00AA00;
  font-weight: bold;
}
.PropertyName {
  color: #CC0000;
  font-weight: bold;
}
.String {
  color: #007777;
}
.Comma {
  color: #000000;
  font-weight: bold;
}
</style>
