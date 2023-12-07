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
    // fallback: true => pid:'p1'만 사전 생성하고 다른 pid가 들어올 경우 요청 시 서버에서 생성함
    // fallback: 'blocking' => 서버에서 완전히 생성될 때까지 NextJS가 기다림.
    // fallback: false => 모두 사전 생성할 경우
  };
}

export default ProductDetailpage;
