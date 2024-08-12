function Label(props: { htmlFor: string; text: string }): JSX.Element {
  return (
    <label className="cont-label" htmlFor={props.htmlFor}>
      {props.text}
    </label>
  );
}

export default Label;
