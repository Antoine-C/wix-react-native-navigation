import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ScrolView
} from 'react-native';
import {SharedElementTransition} from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import * as heroStyles from './styles';

const FADE_DURATION = 500;
const SHOW_DURATION = 500;
const HIDE_DURATION = 500;

const HEADER_HEIGHT = 120;
const ICON_MARGIN = 24;

export default class HeroScreen extends Component {
  static navigatorStyle = {
    ...heroStyles.navigatorStyle
  };

  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      animationType: 'fadeIn',
      width,
      height
    }
  }

  componentDidMount() {
    if (__STRESS_TEST__) {
      setTimeout(() => {
        this.setState({
          animationType: 'fadeOut'
        });
        this.props.navigator.pop();
      }, 650);
    }
  }

  _setOnLayout(event) {
    const { width, height } = event.nativeEvent.layout;

    this.setState({width, height});
  }

  render() {
    return (
      <View onLayout={this._setOnLayout.bind(this)} style={[styles.container]}>
        {this._renderIcon()}
      </View>
    );
  }

  _renderIcon() {
    return (
      <SharedElementTransition
        sharedElementId={this.props.sharedIconId}
        style={{flex: 1}}
        animateClipBounds={true}
        showDuration={SHOW_DURATION}
        hideDuration={HIDE_DURATION}
        showInterpolation={
          {
            type: 'path',
            controlX1: '0.5',
            controlY1: '1',
            controlX2: '0',
            controlY2: '0.5',
            easing: 'FastOutSlowIn'
          }
        }
        hideInterpolation={
          {
            type: 'path',
            controlX1: '0.5',
            controlY1: '0',
            controlX2: '1',
            controlY2: '0.5',
            easing:'FastOutSlowIn'
          }
        }
      >
        <Image
          source={this.props.icon}
          fadeDuration={0}
        />
      </SharedElementTransition>
    );
  }

  onNavigatorEvent(event) {
    if (event.id === 'backPress') {
      this.setState({
        animationType: 'fadeOut'
      });
      this.props.navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 110,
    flexDirection: 'column-reverse'
  },
  titleContainer: {
    marginLeft: ICON_MARGIN + 90 +  + 16,
    marginBottom: 8
  },
  title: {
    fontSize: 23,
    ...heroStyles.textLight
  },
  body: {
    flex: 4,
    backgroundColor: 'white',
  },
  list: {
    marginTop: 16,
    marginHorizontal: 8
  }
});
