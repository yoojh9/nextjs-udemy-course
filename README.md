# 페이지 사전 렌더링 & 데이터 fetching

## 1) getStaticProps

<br>

## 2) Incremental Static Generation

- 페이지를 빌드할 때 정적으로 한번만 생성하는 것이 아니라 배포 후에도 재배포 없이 계속 업데이트 된다는 뜻
- Re-generate it on every request, at most every X seconds
- getStaticProps()에서 return 객체에 revalidate 값을 추가한다.
- dev 모드에서는 revalidate와 상관없이 계속 re-generate되고, production에서 값에 따라 변한다.

```javascript
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
```

<br>

## 3) getStaticPaths()

- Pre-Generated Paths(Routes)
- Dynamic pages ([id].js etc) don't just need data: You also need to know which [id] values will be available
- Multiple concrete [id] page instances (e.g id = 1. id = 2 etc.) are pre-generated
- Dynamic Page에서 getStaticProps()를 사용하면 getStaticPaths()를 꼭 사용해야 됨.

<br>

## 4) Server-side Rendering

- Sometimes, you need to pre-render for every request OR you need access to the request object(e.g for cookies)
- getStaticProps나 getServerSideProps 중에서 하나만 사용해야 함. 둘 다 컴포넌트의 프로퍼티를 가져오는 함수
- Dynamic Page에서 getServerSideProps()를 사용하면 getStaticPaths()를 사용할 필요 없음

```js
export async function getServerSideProps() {...}
```

<br>

## 5) Client-side Data Fetching

- Some data doesn't need to be pre-rendered
  - Data changing with high frequency (e.g. stock data)
  - Highly user-specific data (e.g. last orders in an online shop)
  - Partial data (e.g. data that's only used on a part of an page)
- Pre-fetching the data for page generation might not work or be required
- "Traditional" client-side data fetching (e.g. ueEffect() with fetch() is fine)

<br>

## 6) useSWR()

- https://swr.vercel.app/ko
- 브라우저에서 탭에서 포커스를 잃거나 다시 얻을 경우 자동으로 fetch 해 줌.
