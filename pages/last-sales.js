import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  /**
   * useSWR()
   */
  const fetcher = (url) =>
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
      });

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_DB_URL + "/sales.json",
    fetcher
  );

  /**
   * useEffect()
   */
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(process.env.NEXT_PUBLIC_DB_URL + "/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       console.log(transformedSales);
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!data && !sales) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/sales.json");
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
}

export default LastSalesPage;
