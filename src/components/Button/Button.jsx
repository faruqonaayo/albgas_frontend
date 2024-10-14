import PropTypes from "prop-types";

export default function Button({
  buttonText,
  buttonType,
  className,
  onClickFunction = () => {},
}) {
  return (
    <button
      type={buttonType}
      className={`button ${className}`}
      onClick={onClickFunction}
    >
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  className: PropTypes.string,
  onClickFunction: PropTypes.func,
};
