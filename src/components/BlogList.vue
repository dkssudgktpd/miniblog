<template>
  <h1>List</h1>
  <div class="list-wrap">
<ul>
  <!-- v-for in :key -->
  <li v-for="(item, index) in memoItemArr" :key="index" class="shadow"> 
    <i class="fas fa-check-circle check-bt" @click="updateMemo(item)" :class="{memocomp:item.complete}"></i>
    <span :class="{memocomptxt:item.complete}">{{item.memotitle}}</span> 
    <span class="remove-bt" @click="removeMemo(item.id, index)">
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
  const memoItemArr = reactive([]);


  if(localStorage.length > 0){
    for(let i = 0; i < total.value; i++){
      // 배열에 요소를 밀어넣는다.
      // key값도 필요하지만, 내용(값)이 필요함.
      // 추후 db 연동 예정
      let obj = localStorage.getItem(localStorage.key(i));
      memoItemArr.push(JSON.parse(obj))
      // 키 값을 이용해서 정렬하기(오름차순)
      memoItemArr.sort();
    }
  }
  const removeMemo = (item, index)=>{
    // localStorage 에서 key를 통해서 지운다.
    localStorage.removeItem(item);
    // 배열(memoItempArr) 에서도 지운다.
    memoItemArr.splice(index, 1)
  }
  const updateMemo = (item)=>{
    // localstorage 에서는 update 메소드를 지원하지 않는다.
    // 찾아서 지우고, 
    localStorage.removeItem(item.id);
    // 변경한다.
    item.complete = !item.complete;
    //다시 set 한다.
    localStorage.setItem(item.id , JSON.stringify(item));
  }
  return{
    memoItemArr,removeMemo,updateMemo
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

.check-bt{
  color: #62acde;
  line-height: 50px;
  margin-right: 10px;
  cursor: pointer;
}
.memocomp{
  color: #ddd;
}
.memocomptxt{
  color: #ddd;
  text-decoration: line-through;
}
</style>