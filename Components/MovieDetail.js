// Components/MovieDetail.js
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import { getImage, getDetails } from '../api/TMDB';

class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movie: undefined, isLoading: true}
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

    _displayMovie() {
        if (this.state.movie != undefined) {
            let movie = this.state.movie;
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.images} source={{uri: getImage(movie.poster_path)}}/>
                    <Text style={styles.title}>{this.state.movie.title}</Text>
                    <Text style={styles.desc_text}>{movie.overview}</Text>
                    <View>
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
        getDetails(this.props.route.params.idMovie).then(data => {
            this.setState({movie: data, isLoading: false})
        })
    }

    render() {
        console.log('Component render')
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayMovie()}
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
})

export default MovieDetail;
