import Button from "./Button";

export default function OkMsg(props: { message: string; click: () => void }) {
  return (
    <div className="cont-msg cont-ok-msg">
      <p>{props.message}</p>
      <Button value="Back" class="btn-ok" click={props.click} />
    </div>
  );
}
