import Button from "./Button";

export default function OkMsg(props: { message: string; click: () => void }) {
  return (
    <div className="cont-msg cont-ok-msg">
      <p>{props.message}</p>
      <Button
        value="Ok"
        className="btn-ok"
        click={props.click}
        color="#ffeb3b"
      />
    </div>
  );
}
