import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel'; // 3.6.0
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styled from "styled-components/native"; // 3.1.6
const img1 = require('./img/a.jpg');
const img2 = require('./img/b.jpg');
const img3 = require('./img/c.jpg');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends React.Component {

	constructor(props) {
		super();
		this.state = {
			errors: []
		}
		this.props = props;
		this._carousel = {};
		this.init();
	}

	init() {
		this.state = {
			videos: [
				{
					id: "WpIAc9by5iU",
					thumbnail: img1,
					title: "Slider 1"
				}, {
					id: "sNPnbI1arSE",
					thumbnail: img2,
					title: "Slider 2"
				}, {
					id: "VOgFZfRVaww",
					thumbnail: img3,
					title: "Slider 3"
				}
			],
			activeSlide: 0,
			viewport: {
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').height
			}
		};
	}

	_renderItem = ({ item, index }) => {
		console.log("rendering,", index, item)
		return (
			<ThumbnailBackgroundView style={{ height: viewportHeight, backgroundColor: '#a8e9f4' }}>
				<CurrentVideoImage source={item.thumbnail} style={{width: '100%'}}/>
				<VideoTitleText>{item.title}</VideoTitleText>
			</ThumbnailBackgroundView>
		);
	}

	get pagination() {
		const { activeSlide } = this.state;
		return (
			<Pagination
				dotsLength={3}
				activeDotIndex={activeSlide}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					marginHorizontal: 8
				}}
				inactiveDotStyle={{
					// Define styles for inactive dots here
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		);
	}

	render = () => {
		return (
			<CarouselBackgroundView
				onLayout={() => {
					this.setState({
						viewport: {
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height
						}
					});
				}}
			>
				<Carousel
					ref={(c) => { this._carousel = c; }}
					data={this.state.videos}
					renderItem={this._renderItem.bind(this)}
					sliderWidth={this.state.viewport.width}
					itemWidth={this.state.viewport.width}
					slideStyle={{ width: viewportWidth }}
					layout={'default'}
					firstItem={0}
					onSnapToItem={(index) => this.setState({ activeSlide: index })}
				/>
				{this.pagination}
			</CarouselBackgroundView>
		);
	}
}


const VideoTitleText = styled.Text`
	top: 28;
	justify-content: center;
`
const CurrentVideoImage = styled.Image`
	top: 5;
	box-shadow: 5px 10px;
	height: 250;
`;

const ThumbnailBackgroundView = styled.View`
	justify-content: center;
	align-items: center;
`;

const CarouselBackgroundView = styled.View`
	height: 100%;
	width: 100%;
`