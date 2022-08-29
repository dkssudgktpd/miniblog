<template>
  <div class="intro-wrap" @click="closeIntro">
    <h1>My Memo</h1>
    <div class="intro-cont">
      <img :src="require('@/assets/images/dog3.png')">
      <p>클릭하시면 창이 사라집니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, context){
    const closeIntro = () => {
      context.emit('closeintro')
    }
    return{
      closeIntro
    }
  }
}
</script>

<style scoped>
.intro-wrap{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  text-align: center;
  padding-top: 100px;
  cursor: pointer;
}
.intro-wrap h1{
  margin-bottom: 100px;
}
.intro-wrap p{
  font-size: 20px;
  margin-top: 50px;
  font-weight: bold;
  color: indianred;
}
</style>