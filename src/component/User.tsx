export default function User(props: { username: string; score: string }) {
  return (
    <div className="cont-user-info">
      <div className="cont-user-info-element">
        <p className="cont-element">Username:</p>
        <p>{props.username}</p>
      </div>
      <div className="cont-user-info-element">
        <p className="cont-element">Max score:</p>
        <p>{props.score}</p>
      </div>
    </div>
  );
}
