import { createStore } from 'vuex';
// 데이터를 불러오는 내용
const storage = {
  getData(){
    const arr = []
    const total = localStorage.length;
    if(total > 0){
      for(let i = 0; i < total; i++){
        // 추후 DB 연동 예정
        let obj = localStorage.getItem(localStorage.key(i));
        arr.push(JSON.parse(obj))
        // 키 값을 이용해서 정렬하기(오름차순)
        
      }
       // 키값을 이용해서 정렬하기(오름차순)
        arr.sort((a, b) => {
          if(a.id > b.id) return -1;
          if(a.id === b.id) return 0;
          if(a.id < b.id) return 1;
        });
    }
    return arr
  }
}
const timeUtil = {
  addZero(n) {
    return n < 10 ? '0' + n : n;
  },
    // 현재 시간을 리턴
  // 현재 시간값을 계산해서 중복이 되지 않는 값을 처리한다.
  // key 와 id를 생성해 주기 위해서 처리
  // 10보다 작은 값에 0을 붙임
  getCurrentDate(){
    let date = new Date();
    return date.getFullYear().toString() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) +
      this.addZero(date.getHours()) + this.addZero(date.getMinutes()) + this.addZero(date.getSeconds());              
  },
  getCurrentTime(){
    let date = new Date();
    return date.getFullYear().toString()+ '년' + this.addZero(date.getMonth() + 1) + '월' + this.addZero(date.getDate()) +'일' + this.addZero(date.getHours()) + '시' + this.addZero(date.getMinutes()) + '분';              
  }
}
export default createStore({
  state: {
    headerText: 'My Diary Memo',
    memoItemArr : storage.getData(),
    iconArr : ['dog1.png','dog2.png','dog3.png']
  },
  actions: {
    // 외부 데이터 연동
    fetchAddMemo(context, obj){
      // 서버의 주소로 접근해 자료를 push한다
      // push 하고나서 정상적으로 추가되었다면
      // 아래의 명령을 실행한다.
      context.commit("ADD_MEMO", obj);
    },
    fetchDeleteMemo(context, obj){
      // 서버의 주소로 접근해 데이터를 지운다.
      // 정상적으로 처리되었다면 아래를 실행한다.
      context.commit("DELETE_MEMO", obj);
    },
    fetchUpdateMemo({commit}, obj){
      // 서버의 주소로 접근해 fetch한다.
      // 정상적으로 처리되었따면
      // 아래를 실행한다.
      commit("UPDATE_MEMO", obj);
    },
    fetchClearMemo({commit}){
      // 서버의 주소로 접근해 delete한다.
      // 정상적으로 실행되었다면
      // 아래를 실행한다.
      commit("CLEAR_MEMO");
    }
  },

  mutations: {

    // 데이터 (state)를 업데이트 하는 기능 모음
    // 속성을 대문자로 만들어줌

    // 아이템 추가
    ADD_MEMO(state, payload){
      console.log(payload.item, payload.index);
      let memoTemp = {
        id: timeUtil.getCurrentDate(),
        complete: false,
        memotitle : payload.item,
        memodate : timeUtil.getCurrentTime(),
        memoicon : state.iconArr[payload.index]
      };
  
      //추후 실제 DB 연동 예정
      localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
      state.memoItemArr.push(memoTemp);  
      
        state.memoItemArr.sort((a, b) => {
        if(a.id > b.id) return -1;
        if(a.id === b.id) return 0;
        if(a.id < b.id) return 1;
      });
    },
    // 아이템 삭제
    DELETE_MEMO(state, payload){
    // localStorage 에서 key를 통해서 지운다.
    localStorage.removeItem(payload.item)
    // 배열(memoItempArr) 에서도 지운다.
    state.memoItemArr.splice(payload.index, 1)

     // 키값을 이용해서 정렬하기(오름차순)
        state.memoItemArr.sort((a, b) => {
        if(a.id > b.id) return -1;
        if(a.id === b.id) return 0;
        if(a.id < b.id) return 1;
      });
    },
    // 아이템 변경 {item, index}
    UPDATE_MEMO(state, payload){
          // localstorage 에서는 update 메소드를 지원하지 않는다.
    // 찾아서 지우고, 
    localStorage.removeItem(payload.item.id);
    // 변경한다.
    // item.complete = !item.complete;
    state.memoItemArr[payload.index].complete = !state.memoItemArr[payload.index].complete
    //다시 set 한다.
    localStorage.setItem(payload.item.id , JSON.stringify(payload.item));
        state.memoItemArr.sort((a, b) => {
        if(a.id > b.id) return -1;
        if(a.id === b.id) return 0;
        if(a.id < b.id) return 1;
      });
    },
    // 전체 아이템 삭제
    CLEAR_MEMO(state){
      // localstorage에서 전체내용 삭제
      // 추후 DB 연동 예정
      localStorage.clear();
      state.memoItemArr.splice(0);
    }
  },
  getters: {
    // state 의 값을 호출한다
    // computed 에서 감시해 반영한다.
    getMemoArr(state){
      // 조건에 따라 다른 결과물을 돌려준다.
      return state.memoItemArr;
    }
  },

});