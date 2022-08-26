<template>
  <h1>List</h1>
  <div class="list-wrap">
<ul>
  <!-- v-for in :key -->
  <li v-for="(item, index) in memoItemArr" :key="index" class="shadow"> {{item}} 
    <span class="remove-bt" @click="removeMemo(item, index)">
      <i class="fas fa-trash-alt"></i>
    </span>
  </li>
</ul>
  </div>
</template>

<script>
import {ref, reactive} from 'vue';
export default {
setup(){
  // localstorage의 목록을 가지고온다.
  const total = ref(0);
  total.value = localStorage.length;
  // 키네임을 저장하는 배열
  const memoItemArr = reactive([])

  if(localStorage.length > 0){
    for(let i = 0; i < total.value; i++){
      // 배열에 요소를 밀어넣는다.
      memoItemArr.push(localStorage.key(i))
    }
  }
  const removeMemo = (item, index)=>{
    // localStorage 에서 key를 통해서 지운다.
    localStorage.removeItem(item);
    // 배열(memoItempArr) 에서도 지운다.
    memoItemArr.splice(index, 1)
  }
  return{
    memoItemArr,removeMemo
  }
}
}
</script>

<style scoped>
li {
  position: relative;
  display: flex;
  min-height: 50px;
  line-height: 50px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 20px;
}

.remove-bt{
  margin-left: auto;
  cursor: pointer;
  color: hotpink;
}

span i{
  font-size: 20px;
}
</style>