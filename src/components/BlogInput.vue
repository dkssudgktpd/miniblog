<template>
  <div class="input-wrap shadow">
    <input type="text" v-model="newItem" class="input-box" maxlength="30" @keyup.enter="addItem">
    <div class="option">
    <span @click="addIcon(0)" class="img1">
      이미지1
    </span>
    <span @click="addIcon(1)" class="img2">
      이미지2
    </span>
    <span @click="addIcon(2)" class="img3">
      이미지3
    </span>
    <span @click="addItem" class="add-bt">
      <i class="fas fa-plus add-bt-icon"></i>
    </span>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  setup(props, context) {
    const newItem = ref('');
    const newIcon = ref(0);
    const addItem = () => {  
      let temp = newItem.value;
      let icon = newIcon.value;
      // 앞쪽 뒷쪽 공백 제거
      temp = temp.trim();
      // 추후 업데이트 예정(정규표현식-문자열체크 문법)
      //  공백 '' 공백 '' 공백 앞,뒷자리 공백을 없애야함
      if(temp !== '') {
        //localStorage.setItem(키, 값)
        // 값은 추후에 json 형태로 만들어서 저장
        // JSON.stringify(오브젝트)
        //localStorage.setItem(키, json 문자열로 저장)
        // json 저장 문자열

        //{completed:false, title:메모내용, icon:파일명 ....}
        context.emit('additem',temp,icon)
        resetItem(); 
      }     
    }
    
    // 내용 재설정
    const resetItem = () => {
      newItem.value = '';
    }
  const addIcon = (index) => {
    newIcon.value = index;
  }
    return  {
      newItem,
      addItem,
      addIcon
    }
  }
}
</script>

<style scoped>
.input-wrap {
  position: relative;
  display: block;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  margin: 20px 0;
}

.input-wrap input {
  border-style: none;  
}
.input-wrap input:focus {
  outline: none;
}
.input-box {  
  width: calc(93%  - 250px);
  font-size: 16px;
  margin-left: 20px;
}
.option{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.add-bt {
  display: inline-block;

  background-color: hotpink;
  cursor: pointer;  
}
.add-bt-icon {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  margin: 0 20px;
}
.img1:active,
.img2:active,
.img3:active{
  border: 1px solid #000;
}
.img1{
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url('@/assets/images/dog1.png') no-repeat center;
  background-size: cover;
  font-size: 0;
  cursor: pointer;
}
.img2{
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url('@/assets/images/dog2.png') no-repeat center;
  background-size: cover;
  font-size: 0;
  cursor: pointer;
}
.img3{
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url('@/assets/images/dog3.png') no-repeat center;
  background-size: cover;
  font-size: 0;
  cursor: pointer;
}


</style>