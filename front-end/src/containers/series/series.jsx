import PropTypes from "prop-types";
import { fetchSeries } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const Movies = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchSeries} title={"All Series"} />
    </>
  );
};

Movies.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Movies;
