import React from 'react';
import { Animated, Dimensions } from 'react-native';

class BigHeart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {size: new Animated.Value(this._getSize())}
    }

    componentDidUpdate() {
        Animated.spring(
            this.state.size,
            {toValue: this._getSize(), useNativeDriver: false}
        ).start();
    }

    _getSize() {
        if (!this.props.isFavorite) {
            return 40;
        }
        return 80;
    }

    render() {
        return(
            <Animated.View style={{width: this.state.size, height: this.state.size}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
export default BigHeart;
