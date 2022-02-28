// Component/Search.js
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import MovieItem from './MovieItem';
import { getMovies } from '../api/TMDB';
import { connect } from 'react-redux';


class Search extends React.Component {
    
    constructor(props) {
        super(props)
        this.searchedText = ''
        this.page = 0
        this.totalPages = 0
        this.state = {movies: [], isLoading: false}
    }

    _displayDetailForMovie = (idMovie) => {
        this.props.navigation.navigate('MovieDetail', {idMovie: idMovie});
    }

    _searchText(text) {
        this.searchedText = text
    }

    _searchMovies() {
        this.page = 0
        this.totalPages = 0
        this.setState({movies: []}, () => {this._loadMovies()})
    }

    _loadMovies() {
        if (this.searchedText.length > 0) {
            // Begin loading
            this.setState({isLoading: true})
            getMovies(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    movies: this.state.movies.concat(data.results),
                    isLoading: false // Stop loading
                })
            });
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _isFavorite(movie) {
        if (this.props.favoriteMovie.findIndex(item => item.id === movie.id) !== -1) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View>
                    <TextInput
                        placeholder="Movie's title"
                        style={styles.TextInput}
                        onChangeText={(text) => this._searchText(text)}
                        onSubmitEditing={() => this._searchMovies()}
                    />
                    <Button 
                        title="Search"
                        style={styles.Button}
                        onPress={() => this._searchMovies()}
                    />
                    <FlatList
                        data={this.state.movies}
                        extraData={this.props.favoriteMovie}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <MovieItem movie={item} isFavorite={this._isFavorite(item)} displayDetailForMovie={this._displayDetailForMovie}/>}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            if (this.page < this.totalPages) {
                                this._loadMovies()
                            }
                        }}
                    />
                    {this._displayLoading()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    TextInput: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    loading_container: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return {favoriteMovie: state.favoriteMovie};
}
export default connect(mapStateToProps)(Search);
