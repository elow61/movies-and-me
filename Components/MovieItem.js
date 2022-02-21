// Components/MovieItem.js
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImage } from '../api/TMDB'


class MovieItem extends React.Component {
    render() {
        const {movie, displayDetailForMovie} = this.props
        console.log('MovieItem ', this.props)
        return (
            <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForMovie(movie.id)}>
                <Image style={styles.images} source={{uri: getImage(movie.poster_path)}}/>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title_text}>{movie.title}</Text>
                        <Text style={styles.vote}>{movie.vote_average}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.desc_text} numberOfLines={6}>{movie.overview}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.date_text}>Sorti le {movie.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
    },
    images: {
        width: 120,
        height: 180,
        margin: 5,
    },
    content: {
        flex: 1,
        margin: 5,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        flex: 3,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    
    vote: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666',
    },
    description: {
        flex: 7,
    },
    desc_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date: {flex: 1},
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default MovieItem
