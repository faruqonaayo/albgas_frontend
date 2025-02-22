import PropTypes from "prop-types";

export default function Select({
  children,
  className,
  selectValue,
  onChangeFunction,
}) {
  function handleSelectChange(event) {
    onChangeFunction(event.target.value);
  }
  return (
    <select
      value={selectValue}
      className={`select ${className}`}
      onChange={handleSelectChange}
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selectValue: PropTypes.string,
  onChangeFunction: PropTypes.func,
};
