# faker-api
Portfolio api

이 프로젝트에서는 다음의 api를 사용합니다.
https://github.com/Syncjin/faker-api

해당 프로젝트를 클론하여 같이 실행해주세요.

# react-space-cloud-web
Portfolio

1. git clone https://github.com/Syncjin/react-space-cloud-web.git
2. cd react-space-cloud-web
3. npm install
4. npm start

프로젝트 구조
>components
  - CatInfo : 이미지 상세 내용이 담길 컴포넌트
  - Content : 컨텐츠들이 담길 라우팅 컴포넌트
  - Header : 헤더 컴포넌트
  - Masonry : 벽돌 레이아웃이 담긴 컴포넌트
  - Nav : 네비게이션 컴포넌트
  - Slide : 슬라이드하는 이미지 컴포넌트
>containers 

>sagas

>store

>styles 

사용한 라이브러리
- axios
- react-icons
- react-motion
- redux
- redux-actions
- redux-saga
- styled-components
- react-spinners-kit
- react-virtualized

구현 내용 
pinterest 사이트에서 사용하는 레이아웃과 infinite virtualized scroll.

infinite scroll을 그냥 사용하면 노드들이 너무 많이 생기기 때문에 브라우저에 무리가 가기때문에 뷰포트 사이즈에 맞게 그 부분에서만 노드들을 mount할 필요가 있습니다.
그래서 react-virtualized를 사용해 리스트를 나타내고 infinite scroll은 스크롤시에 비동기를 통해서 노드들을 추가했습니다.
스크롤시에 일어나는 이벤트들은 쓰롤링을 사용해 Floating Button의 보이거나 숨기거나 하는 애니메이션을 추가했습니다.