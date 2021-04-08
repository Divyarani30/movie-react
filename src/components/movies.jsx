import React, { Component } from 'react';
import { getMovies } from '../Starter Code/services/fakeMovieService';
import MoviesTables from './moviesTables';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { Link } from 'react-router-dom';
import { getGenres } from '../Starter Code/services/fakeGenreService';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize : 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn : {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id : "" , name : "All Genres"},...getGenres()];
        this.setState({movies : getMovies(), genres });
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = movie => {
        //console.log("like clicked", movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre : genre, searchQuery : "" , currentPage : 1});
    };

    handlePageChange = page => {
        this.setState({currentPage : page});
    };

    handleSearch = query => {
         this.setState({searchQuery : query, selectedGenre: null, currentPage: 1})
    };

    handleSort = sortColumn => {
        this.setState ({ sortColumn });
    };

    getPagedData = () => {
        const {
            pageSize, 
            currentPage, 
            selectedGenre,
            movies: allMovies,
            sortColumn,
            searchQuery,
        } = this.state;

         let filtered = allMovies;
         if(searchQuery)
             filtered = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
         else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])    
        
        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount : filtered.length , data: movies};
    }

    render() {
        const { length: count } = this.state.movies; //object destructuring
        const {pageSize, currentPage, sortColumn, searchQuery} = this.state;

        if (count === 0) return <p>There are no movies in the DB</p>

        const {totalCount, data: movies} = this.getPagedData();        
        return (
         <div className = "row">
            <div className="col-2">
                  <ListGroup                                     
                    items = {this.state.genres} 
                    selectedItem = {this.state.selectedGenre}
                    onItemSelect = {this.handleGenreSelect}
                    />
            </div>
            <div className="col">
                <Link 
                   to='/movies/new'
                   className='btn btn-primary'
                   style={{ marginBottom: 20 }}>
                       NewMovie
                   </Link>
               <p> Showing {totalCount} movies in the DB:)</p>
               <SearchBox value={searchQuery} onChange={this.handleSearch} />
                <MoviesTables 
                  movies = {movies} 
                  sortColumn = {sortColumn}
                  onLike = {this.handleLike} 
                  onDelete = {this.handleDelete}
                  onSort = {this.handleSort}
                  />
                <Pagination  
                  itemsCount={totalCount} 
                  pageSize = {pageSize} 
                  currentPage = {currentPage}
                  onPageChange = {this.handlePageChange}
                />
            </div> 
                
         </div>

        );

    }
}

export default Movies;