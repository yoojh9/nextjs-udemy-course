import fs from "fs";
import path from "path";

function ProductDetailpage(props) {
  const { loadedProduct } = props;

  // fallback = true일때 필요
  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWithParams,
    fallback: false,
    // fallback: true => getStaticPaths가 반환한 path들은 빌드 타음에 HTML로 렌더링 된다. 이외의 path들에 대한 요청이 들어올 경우 404 페이지를 반환하지 않고 사용자에게 fallback 페이지를 보여준 후 서버에서 페이지를 생성한다.
    // fallback: 'blocking' => 서버에서 완전히 생성될 때까지 NextJS가 기다림.
    // fallback: false => 모두 사전 생성할 경우. 반환되지 않은 path 외 모든 path는 자동으로 404 페이지를 라우팅
  };
}

export default ProductDetailpage;
