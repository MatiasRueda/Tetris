import Form from "./Form";
import ReCAPTCHA from "react-google-recaptcha";

const key = import.meta.env.VITE_RECAPTCHA_KEY;

export default function FormValidate(props: {
  submitDisabled?: boolean;
  submit: (data: any) => Promise<void>;
  handleCaptcha: (token: string | null) => void;
}) {
  return (
    <Form
      id="validate"
      send="Send"
      submitDisabled={props.submitDisabled}
      onSubmit={props.submit}
    >
      <ReCAPTCHA
        className="captcha"
        sitekey={key}
        onChange={props.handleCaptcha}
      />
    </Form>
  );
}
