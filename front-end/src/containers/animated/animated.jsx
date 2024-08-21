import PropTypes from "prop-types";
import { fetchAnimated } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const Animated = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchAnimated} title={"All Animated"} />
    </>
  );
};

Animated.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Animated;