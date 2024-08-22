export default function UserTable(props: {
  data: { username: string; score: string }[];
}) {
  return (
    <div className="cont-user-table">
      <h1 className="user-table-title">Top Five</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
