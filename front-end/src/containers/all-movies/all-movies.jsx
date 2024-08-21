import PropTypes from "prop-types";
import { fetchAllMovies } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const AllMovies = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchAllMovies} title={"All Movies"} />
    </>
  );
};

AllMovies.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AllMovies;