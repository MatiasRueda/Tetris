import { Difficulty } from "../context/ConfigContext";

export default function Difficulties(props: {
  difficulty: number;
  changeDifficulty: (e: any) => void;
}) {
  return (
    <select
      defaultValue={Difficulty[props.difficulty].toString()}
      onChange={(e) => props.changeDifficulty(e)}
    >
      {(
        Object.keys(Difficulty).filter((key) =>
          isNaN(Number(key))
        ) as (keyof Difficulty)[]
      ).map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
