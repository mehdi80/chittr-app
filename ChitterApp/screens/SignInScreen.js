import React, { Component, useEffect } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';

import { AuthContext } from '../Context';

export default function LoginScreens({ navigation }) {
	const { signIn } = React.useContext(AuthContext);
	const [userID, setUserID] = React.useState('');
	const [email, setEmail] = React.useState('j.smith@mail.com');
	const [password, setPassword] = React.useState('password');
	const [token, setToken] = React.useState('');

	const getToken = () => {
		// if (email == '' || password == '') {
		// 	Alert.alert('empty');
		// }
		// else {
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
					setUserID(JSON.stringify(responseJson.id));

					userToken = responseJson.token;
					id = JSON.stringify(responseJson.id);
				})
				.catch((error) => {
					console.log(error);
					Alert.alert('invalid');
				});
		//}
	};

	if (token != '' && userID != '') {
		signIn(token, userID);
	}

	return (
		<View style={{ padding: 10 }} >
			<TextInput
				style={{ height: 40 }}
				placeholder="Email"
				onChangeText={(email) => setEmail(email)}
				value={email}
				//value={"j.smith@mail.com"}
			/>
			<TextInput
				style={{ height: 60 }}
				placeholder="Password"
				onChangeText={(password) => setPassword(password)}
				value={password}
				//value={"password"}
				secureTextEntry
			/>

			<Button
				onPress={getToken}
				title="Sign In"
			/>
			<Button
				onPress={() => navigation.navigate('Sign Up')}
				title="Sign Up"
			/>
		</View >
	);
}

const styles = StyleSheet.create({
});