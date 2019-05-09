import { put, takeLatest,takeEvery, all, take, select } from 'redux-saga/effects';
import axios from 'axios';

export default function* rootSaga() {
  yield all([
  actionWatcher(),
  // watchAndLog()
  ]);
}

// function* fetchNews() {
//   const json = yield fetch('https://newsapi.org/v1/articles? 
//         source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
//         .then(response => response.json(), );    
//   yield put({ type: "NEWS_RECEIVED", json: json.articles, });
// }
export function* getApi() {
  console.log('saga getapi')
  try {
    const { data } = yield axios.get('http://localhost:3001/api')
    yield put({type: 'test/GET_SUCCEEDED', payload: data})
  } catch (error) {
    console.log('err', error)
    yield put({type: 'test/GET_FAILED', payload: error.message})
  }
}

export function* getSlideApi() {
  console.log('saga slide get api');
  try {
    const { data } = yield axios.get('http://localhost:3001/api?count=5')
    // const { data } = yield axios.get('https://api.unsplash.com/photos/random?client_id=3e3e2a7b7de3858240006b98d9fcbe37671348d15e9844c421d4e66158325ac5&count=5');
    console.log(data)
    yield put({type: 'slide/GET_SUCCEEDED', payload: data})
  } catch (error) {
    console.log('err', error)
    yield put({type: 'slide/GET_FAILED', payload: error.message})
  }
}

let i = 0;

export function* getMasonryApi(action) {
  console.log('saga masonry get api', action, i++);
  try {
    const { data } = yield axios.get('http://localhost:3001/api?count=5&page=' + i)
    yield put({type: 'masonry/GET_SUCCEEDED', payload: data})
  } catch (error) {
    console.log('err', error)
    yield put({type: 'masonry/GET_FAILED', payload: error.message})
  }
}


function* actionWatcher() {
  yield takeLatest('test/GET_REQUESTED', getApi);
  yield takeLatest('slide/GET_REQUESTED', getSlideApi);
  yield takeLatest('masonry/GET_REQUESTED', getMasonryApi);
}

function* watchAndLog() {
  while (true){
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}