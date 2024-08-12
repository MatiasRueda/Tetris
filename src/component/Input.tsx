import {
  FieldError,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputParams = {
  nombre: string;
  type: string;
  inputIgual?: string;
  role?: string;
  reglas?: RegisterOptions;
  register?: UseFormRegister<FieldValues>;
  error?: FieldError;
};

function Input({
  nombre,
  type,
  inputIgual,
  role,
  reglas,
  register,
  error,
  ...rest
}: InputParams): JSX.Element {
  return (
    <div className="cont-input">
      <input
        id={nombre}
        autoComplete="off"
        aria-label={nombre}
        role={role}
        type={type}
        {...register!(nombre, reglas)}
        {...rest}
      />
      <div className="cont-error">
        {error && (
          <p role="error" aria-label={nombre + "-error"}>
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
