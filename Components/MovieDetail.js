// Components/MovieDetail.js
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Share, Image, TouchableOpacity, Platform } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import { getImage, getDetails } from '../api/TMDB';
import { connect } from 'react-redux';

class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movie: undefined, isLoading: false}
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

    _toggleFavorite() {
        const action = {type: 'TOGGLE_FAVORITE', value: this.state.movie}
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png');
        if (this.props.favoriteMovie.findIndex(item => item.id === this.state.movie.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png');
        }
        return (
            <Image style={styles.favorite_image} source={sourceImage}/>
        )
    }

    _displayButtonShare() {
        const {movie} = this.state;
        if (movie != undefined && Platform.OS === 'android') {
            return(
                <TouchableOpacity style={styles.share_touchable_button} onPress={() => this._shareMovie()}>
                    <Image style={styles.share_image} source={require('../Images/ic_share.android.png')}/>
                </TouchableOpacity>
            )
        } else {
            return (
                this.props.navigation.setOptions({
                    headerRight: () => (
                        <TouchableOpacity style={styles.button_share_header_right} onPress={() => this._shareMovie()}>
                            <Image style={styles.share_image} source={require('../Images/ic_share.ios.png')}/>
                        </TouchableOpacity>
                    )
                })
            )
        } 
    }

    _shareMovie = () => {
        const {movie} = this.state
        Share.share({title: movie.title, message: movie.overview})
    }

    _displayMovie() {
        let movie = this.state.movie;
        if (movie != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.images} source={{uri: getImage(movie.poster_path)}}/>
                    <Text style={styles.title}>{movie.title}</Text>
                    
                    <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.desc_text}>{movie.overview}</Text>
                    <View style={styles.informations}>
                        <Text>Released the {moment(movie.release_date).format('DD/MM/YYYY')}</Text>
                        <Text>Note: {movie.vote_average} / 10</Text>
                        <Text>Vote number: {movie.vote_count}</Text>
                        <Text>Budget: {numeral(movie.budget).format('0,0,00 $')}</Text>
                        <Text>Gender(s): {movie.genres.map(i => {return i.name}).join(' / ')}</Text>
                        <Text>Companie(s): {movie.production_companies.map(i => {return i.name}).join(' / ')}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    componentDidMount() {
        const indexFavMovie = this.props.favoriteMovie.findIndex(item => item.id === this.props.route.params.idMovie)
        if (indexFavMovie !== -1) {
            this.setState(
                {movie: this.props.favoriteMovie[indexFavMovie]},
            )
            return;
        }
        getDetails(this.props.route.params.idMovie).then(data => {
            this.setState(
                {movie: data, isLoading: false},
            )
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayMovie()}
                {this._displayButtonShare()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1,
    },
    images: {
        flex: 1,
        height: 180,
        margin: 10,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    desc_text: {
        fontStyle: 'italic',
        textAlign: 'justify',
        margin: 10,
    },
    informations: {margin: 10},
    favorite_container: {alignItems: 'center'},
    favorite_image: {width: 40, height: 40},
    share_touchable_button: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_share_header_right: {
        marginRight: 8
    },
    share_image: {
        width: 30,
        height: 30
    }
})

const mapStateToProps = (state) => {
    return {favoriteMovie: state.favoriteMovie};
}
export default connect(mapStateToProps)(MovieDetail);
