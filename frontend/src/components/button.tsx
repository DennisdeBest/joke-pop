import {func, string} from "prop-types";

const Button = ({apiName, apiTitle, onClick}) => {
  return (
    <button type="button" onClick={onClick} className="btn" data-name={apiName}>{apiTitle}</button>
  );
};

Button.propTypes = {
  apiName: string,
  apiTitle: string,
  onClick: func,
};

Button.defaultProps = {
  apiName: '',
  apiTitle: '',
  onClick: () => {},
};
export default Button;
