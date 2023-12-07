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
