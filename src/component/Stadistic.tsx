type Parameters = {
  class: string;
  stadistic: string;
  value: number;
};

export default function Stadistic({ ...rest }: Parameters) {
  return (
    <div className={rest.class}>
      <h4 className="title-stadistic">{rest.stadistic}</h4>
      <h2>{rest.value}</h2>
    </div>
  );
}
