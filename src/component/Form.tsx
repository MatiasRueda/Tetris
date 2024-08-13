import { Children, isValidElement, createElement, ReactNode } from "react";
import { get, useForm } from "react-hook-form";

type Cancelar = {
  text: string;
  accion: () => void;
};

function Form(props: {
  id: string;
  send: string;
  children: ReactNode;
  onSubmit: (data: any) => Promise<void>;
  cancel?: Cancelar;
}): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const informacionEnviada = async (data: any) => {
    await props.onSubmit(data);
    reset();
  };
  return (
    <form
      id={props.id}
      autoComplete="off"
      onSubmit={handleSubmit(informacionEnviada)}
    >
      <div className={"cont-" + props.id}>
        {Children.map(props.children, (child) => {
          if (!isValidElement(child)) return child;
          return child.props.nombre
            ? createElement(child.type, {
                ...{
                  ...child.props,
                  register: register,
                  reglas: !child.props.inputIgual
                    ? child.props.reglas
                    : {
                        ...child.props.reglas,
                        validate: (value: any) => {
                          if (watch(child.props.inputIgual) === value)
                            return true;
                          return "Passwords do not match";
                        },
                      },
                  error: get(errors, child.props.nombre),
                  key: child.props.nombre,
                },
              })
            : child;
        })}
      </div>
      <div className="cont-form-btns">
        <button className="btn-submit" type="submit">
          {props.send}
        </button>
        {props.cancel && (
          <button
            className="btn-cancel"
            type="button"
            onClick={props.cancel.accion}
          >
            {props.cancel.text}
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
