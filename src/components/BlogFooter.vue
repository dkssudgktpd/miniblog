<template>
  <div class="clear-all-wrap">
    <span class="clear-all-bt" @click="clearAllMemo">Clear All</span>
    <span class="copy">Copyright 2022 by moon su bin</span>
  </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
  setup(){
    const store = useStore();
    const clearAllMemo = () =>{
      // context.emit('deleteitem')
      // store.commit('CLEAR_MEMO');
      store.dispatch('fetchClearMemo');
    }

    return{
      clearAllMemo
    }
  }
}
</script>

<style>
.clear-all-wrap{
  position: relative;
  display: block;
  width: 100%;
  line-height: 50px;
  background-color: #fff;
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
}
.clear-all-bt{
display: inline-block;
width: 80%;
height: 50px;
cursor: pointer;
border: 1px solid hotpink;
border-radius: 5px;
margin: 10px;
transition: background-color 0.5s;
}
.clear-all-bt:hover{
  background-color: hotpink;
  color: #fff;
  border: 1px solid #000;
}
.copy{
display: block;
font-size: 9px;
white-space:nowrap;
}
</style>