import { createStore } from 'vuex';
// 데이터를 불러오는 내용
import memoStore from './modules/memoStore';
export default createStore({
  modules: {
    memoStore
  }
});
