import PropTypes from "prop-types";

export default function Option({ optionText, className, onChangeFunction }) {
  function handleOptionChange() {
    onChangeFunction(optionText);
  }
  return (
    <option className={`option ${className}`} onChange={handleOptionChange}>
      {optionText}
    </option>
  );
}

Option.propTypes = {
  optionText: PropTypes.string,
  className: PropTypes.string,
  onChangeFunction: PropTypes.func,
};
