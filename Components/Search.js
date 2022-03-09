// Component/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import MovieList from './MovieList';
import { getMovies } from '../api/TMDB';


class Search extends React.Component {
    
    constructor(props) {
        super(props)
        this.searchedText = ''
        this.page = 0
        this.totalPages = 0
        this.state = {movies: [], isLoading: false}
    }

    _searchText(text) {
        this.searchedText = text
    }

    _searchMovies() {
        this.page = 0
        this.totalPages = 0
        this.setState({movies: []}, () => {this._loadMovies()})
    }

    _loadMovies = () => {
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

    render() {
        return (
            <View style={styles.main_container}>
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
                <MovieList
                    movies={this.state.movies}
                    navigation={this.props.navigation}
                    loadMovie={this._loadMovies}
                    page={this.page}
                    totalPages={this.totalPages}
                    favList={false}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
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

export default Search;
