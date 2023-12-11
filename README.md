# NextJS 앱 최적화하기

## 1) Adding Meta and <head> Tags

- Head 컴포넌트를 이용한다.

```js
import Head from "next/head";
```

<br>

## 2) Re-using Components, Logic & Configuration

- \_app.js와 \_document.js 파일은 특정 설정과 요소를 구성하여 애플리케이션의 모든 페이지에서 사용할 수 있게 해준다.

<br>

## 3) Optimizing Images

- next/image의 Image 컴포넌트를 사용
- 이미지를 최적화하여 아주 큰 이미지를 그대로 불러오지 않게 함
- 필요할 때만 이미지가 로딩되어 (lazy loading) 발생하는 요청 수를 줄일 수 있고 그 페이지에 할당되는 대역폭도 줄일 수 있다.

```js
<Image src={"/" + image} alt={title} width={340} height={160} />
```
