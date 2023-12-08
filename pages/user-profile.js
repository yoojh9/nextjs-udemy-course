function UserProfilePage(props) {
  return <h1>{props.userName}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Jeonghyun",
    },
  };
}

export default UserProfilePage;
