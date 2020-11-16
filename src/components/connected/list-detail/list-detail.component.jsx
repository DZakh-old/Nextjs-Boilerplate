const ListDetail = ({ item: user }) => {
  return (
    <div>
      <h1>Detail for {user.name}</h1>
      <p>ID: {user.id}</p>
    </div>
  );
};

export default ListDetail;
