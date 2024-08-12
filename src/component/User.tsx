export default function User(props: { username: string; maxScore: number }) {
  return (
    <div className="cont-user-info">
      <p>{props.username}</p>
      <p>{props.maxScore}</p>
    </div>
  );
}
