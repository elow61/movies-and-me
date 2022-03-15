// Components/MovieList.js
import React from 'react'
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MovieItem from './MovieItem';

class MovieList extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {movies: []}
    }

    _isFavorite(movie) {
        if (this.props.favoriteMovie.findIndex(item => item.id === movie.id) !== -1) {
            return true;
        }
        return false;
    }

    _displayDetailForMovie = (idMovie) => {
        this.props.navigation.navigate('MovieDetail', {idMovie: idMovie});
    }

    render() {
        return(
            <FlatList
                style={styles.list}
                data={this.props.movies}
                extraData={this.props.favoriteMovie}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <MovieItem movie={item} isFavorite={() => this._isFavorite(item)} displayDetailForMovie={this._displayDetailForMovie}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.isFavorites && this.props.page < this.props.totalPages) {
                        this.props.loadMovie()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })

const mapStateToProps = (state) => {
    return {favoriteMovie: state.favoriteMovie};
}
export default connect(mapStateToProps)(MovieList);
