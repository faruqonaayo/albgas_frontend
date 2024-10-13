import PropTypes from "prop-types";

export default function Button({ buttonText, buttonType, className }) {
  return (
    <button type={buttonType} className={`button ${className}`}>
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  className: PropTypes.string,
};
