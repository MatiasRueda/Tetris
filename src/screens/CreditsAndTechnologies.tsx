import "../assets/style/creditsAndTechnologies.css";
import Button from "../component/Button";
import { useScreenContext } from "../context/ScreenContext";

export default function CreditsAndTechnologies() {
  const screen = useScreenContext();

  return (
    <section className="credits-technologies">
      <div className="cont-credits-technologies">
        <h1>Credits & Technologies</h1>
        <div className="cont-credits-technologies-info">
          <div className="credits-technologies-info">
            <p>
              Images taken from:{" "}
              <a href="https://pixabay.com">https://pixabay.com</a>
            </p>
          </div>
          <div className="credits-technologies-info">
            <p>
              Animations made with framer-motion.
              <br /> Click here to read the{" "}
              <a href="https://www.framer.com/motion/">doc</a>{" "}
            </p>
          </div>
          <div className="credits-technologies-info">
            <p>
              Use different AWS services to build the server. <br />
              For example:{" "}
              <a href="https://docs.aws.amazon.com/dynamodb/">DynamoDB</a>,{" "}
              <a href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html">
                Lambda
              </a>
              , etc
            </p>
          </div>
          <div className="credits-technologies-info">
            <p>
              To protect APIs use tokens generated by RECatpcha.
              <br /> Click here to read the{" "}
              <a href="https://developers.google.com/recaptcha/intro">doc</a>
            </p>
          </div>
        </div>
        <Button
          class="credits-btn"
          value={"Go home"}
          click={screen.changeToHome}
        />
      </div>
    </section>
  );
}
