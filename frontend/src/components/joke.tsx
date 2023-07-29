import {string} from "prop-types";

const Joke = ({value}) => {
  return (
    <div>{value}</div>
  )
}

Joke.propTypes = {
  value: string,
};

Joke.defaultProps = {
  value: '',
};

export default Joke
