// Components/MovieDetail.js
import React from "react";
import { StyleSheet, View, Text } from 'react-native';

class MovieDetail extends React.Component {
    render() {
        console.log('In details : ', this.props.navigation)
        return (
            <View style={style.main_container}>
                <Text>Détail du film</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

export default MovieDetail
