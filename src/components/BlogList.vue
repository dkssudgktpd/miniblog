<template>
  <h1>List</h1>
  <div class="list-wrap">
<ul>
  <!-- v-for in :key -->
  <li v-for="(item, index) in memodata" :key="index" class="shadow"> 
    <i class="fas fa-check-circle check-bt" @click="updateMemo(item, index)" :class="{memocomp:item.complete}"></i>
    <span :class="{memocomptxt:item.complete}">{{item.memotitle}}</span> 
    <div class="info">
<span class="icon" :style="{backgroundImage:'url(' + require(`@/assets/images/${item.memoicon}`) + ')'}"></span>
    <span class="date">{{item.memodate}}</span>
    <span class="remove-bt" @click="removeMemo(item.id, index)">
      <i class="fas fa-trash-alt"></i>
    </span>
    </div>
  </li>
</ul>
  </div>
</template>

<script>
export default {
  props:['memodata'],
setup(props, context){

  const removeMemo = (item,index)=>{
    context.emit('removeitem',item,index)
  }
  const updateMemo = (item,index)=>{
    context.emit('updateitem', item, index)
  }
  return{
    removeMemo,updateMemo
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
.info {
  margin-left: auto;
}
.icon{
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
}
.remove-bt{
  margin-left: 10px;
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