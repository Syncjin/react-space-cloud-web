import { put, takeLatest,takeEvery, all, take, select } from 'redux-saga/effects';
import axios from 'axios';

export default function* rootSaga() {
  yield all([
  actionWatcher(),
  watchAndLog()
  ]);
}

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
    const { data } = yield axios.get('http://localhost:3000/api/card?count=5')
    yield put({type: 'slide/GET_SUCCEEDED', payload: data})
  } catch (error) {
    console.log('err', error)
    yield put({type: 'slide/GET_FAILED', payload: error.message})
  }
}


export function* getMasonryApi(action) {
  console.log('saga masonry get api', action);
  try {
    const { data } = yield axios.get(`http://localhost:3000/api/card?count=5&page=${action.payload}`)
    console.log('data?', data, `http://localhost:3000/api/card?count=5&page=${action.payload}`)
    yield put({type: 'masonry/GET_SUCCEEDED', payload: data})
  } catch (error) {
    console.log('err', error)
    yield put({type: 'masonry/GET_FAILED', payload: error.message})
  }
}

export function* getCatInfoApi(action) {
  console.log('saga catInfo get api', action);
  try {
    const { data } = yield axios.get(`http://localhost:3000/api/card?id=${action.payload}`)
    yield put({type: 'catInfo/GET_SUCCEEDED', payload: data})
  } catch (error) {
    console.log('err', error)
    yield put({type: 'catInfo/GET_FAILED', payload: error.message})
  }
}


function* actionWatcher() {
  // yield takeLatest('test/GET_REQUESTED', getApi);
  yield takeLatest('slide/GET_REQUESTED', getSlideApi);
  yield takeLatest('masonry/GET_REQUESTED', getMasonryApi);
  yield takeLatest('catInfo/GET_REQUESTED', getCatInfoApi);
}

function* watchAndLog() {
  while (true){
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}