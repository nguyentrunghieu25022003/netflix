import PropTypes from "prop-types";
import { fetchFeatureFilms } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const FeatureFilms = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchFeatureFilms} title={"All Features"} />
    </>
  );
};

FeatureFilms.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeatureFilms;