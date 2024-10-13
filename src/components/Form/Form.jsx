import PropTypes from "prop-types";

export default function Form({ children, className, onSubmitFunction }) {
  function handleSubmitForm() {
    event;
    onSubmitFunction(event);
  }
  return (
    <form className={`form ${className}`} onSubmit={handleSubmitForm}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmitFunction: PropTypes.func,
};
