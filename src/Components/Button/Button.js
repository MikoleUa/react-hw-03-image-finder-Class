import s from "./Button.module.css";

export default function Button({ increment }) {
  return (
    <button onClick={increment} className={s.Button} type="button">
      load more...
    </button>
  );
}
