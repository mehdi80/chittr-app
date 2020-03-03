import React, { Component, useEffect } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';

import { AuthContext } from '../Context';

// function Login() {
// 	const { signIn } = React.useContext(AuthContext);
// 	return (
// 		<Button
// 			onPress={() => signIn()}
// 			title="Sign In"
// 		//color="lightgrey"
// 		/>
// 	)
// }

// class LoginScreen extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			email: '',
// 			password: '',
// 			token: '',
// 		}
// 	}

// 	login() {
// 		return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
// 			{
// 				method: 'POST',
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					email: this.state.email,
// 					password: this.state.password,
// 				})
// 			})
// 			.then((response) => response.json())
// 			.then((responseJson) => {
// 				this.setState({
// 					token: responseJson.token,
// 				});
// 				Alert.alert(this.state.token);
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	}

// 	render() {
// 		signIn = React.useContext(AuthContext);
// 		return (
// 			<View style={{ padding: 10 }} >
// 				<TextInput
// 					style={{ height: 40 }}
// 					placeholder="email"
// 					onChangeText={(email) => this.setState({ email })}
// 					value={this.state.email}
// 				/>
// 				<TextInput
// 					style={{ height: 60 }}
// 					placeholder="password"
// 					onChangeText={(password) => this.setState({ password })}
// 					value={this.state.password}
// 					secureTextEntry
// 				/>
// 				<Button
// 					onPress={() => signIn()}
// 					title="Sign In"
// 				//color="lightgrey"
// 				/>
// 				<Button
// 					onPress={() => this.props.navigation.navigate('Sign Up')}
// 					title="Sign Up"
// 				/>
// 			</View >
// 		);
// 	}
// }

export default function LoginScreens() {
	const { signIn } = React.useContext(AuthContext);
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [token, setToken] = React.useState('');

	const getToken = () => {
		if (email == '' || password == '') {
			Alert.alert('empty');
		}
		else {
			fetch("http://10.0.2.2:3333/api/v0.0.5/login",
				{
					method: "POST",
					headers: new Headers({
						Accept: 'application/json',
						'Content-Type': 'application/json',
					}),
					body: JSON.stringify({
						email: email,
						password: password,
					})
				}
			)
				.then(response => response.json())
				.then(responseJson => {
					setToken(responseJson.token);
				})
				.catch((error) => {
					console.log(error);
					Alert.alert('invalid');
				});
		}		
	};

	if (token != '') {
		signIn(token);
	}

	return (
		<View style={{ padding: 10 }} >
			<TextInput
				style={{ height: 40 }}
				placeholder="email"
				onChangeText={(email) => setEmail(email)}
				value={email}
			/>
			<TextInput
				style={{ height: 60 }}
				placeholder="password"
				onChangeText={(password) => setPassword(password)}
				value={password}
				secureTextEntry
			/>

			<Button
				onPress={getToken}
				title="Sign In"
			/>
			<Button
				onPress={() => this.props.navigation.navigate('Sign Up')}
				title="Sign Up"
			/>
		</View >
	);
}

const styles = StyleSheet.create({
});