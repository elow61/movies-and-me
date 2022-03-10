import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './MovieList';
import { connect } from 'react-redux'

class Favorites extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>
                <MovieList
                    movies={this.props.favoriteMovie}
                    navigation={this.props.navigation}
                    favList={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
})

const mapStateToProps = (state) => {
    return {favoriteMovie: state.favoriteMovie}
  }
export default connect(mapStateToProps)(Favorites)
