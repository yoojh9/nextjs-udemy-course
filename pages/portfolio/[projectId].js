import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  return (
    <div>
      <h1>The Potfolio Project Page {router.query.projectId}</h1>
    </div>
  );
}

export default PortfolioProjectPage;
