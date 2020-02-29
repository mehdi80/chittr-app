import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			usernames: []
		}
	}

	searchUser() {
		return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.username)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					usernames: responseJson,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View>
					<ActivityIndicator />
				</View>
			)
		}
		return (
			<View style={{ padding: 10 }} >
				<TextInput
					style={{ height: 40 }}
					placeholder="username"
					onChangeText={(username) => this.setState({ username })}
					value={this.state.username}
				/>
				<Button
					onPress={() => this.searchUser()}
					title="Search"
				//color="lightgrey"
				/>
				<ScrollView>
					{this.state.usernames.map((item) => {
						return (
							<View key={item.user_id}>
								<Text style={styles.item}>{item.given_name}</Text>
							</View>
						)
					})}
				</ScrollView>
			</View >
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgrey',
	},
	item: {
		marginTop: 12,
		padding: 30,
		backgroundColor: 'white',
		fontSize: 18,
	},
});
export default SearchScreen;