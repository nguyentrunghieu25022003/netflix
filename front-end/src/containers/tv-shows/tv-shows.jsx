import PropTypes from "prop-types";
import { fetchTVShows } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const TVShows = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchTVShows} title={"All TV Shows"} />
    </>
  );
};

TVShows.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TVShows;