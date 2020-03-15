import React from 'react'
import { ActivityIndicator, View, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Avatar, Button, Text, Card, ListItem } from 'react-native-elements'
import Styles from '../Styles'
const fetch = require('isomorphic-fetch')

// function FollowersScreen ({ route }) {
//   const { followersData } = route.params
//   return (
//     <View>
//       <ScrollView>
//         {followersData.map((item) => {
//           return (
//             <View key={item.user_id}>
//               <TouchableOpacity>
//                 <View style={styles.item}>
//                   <Text>{item.given_name}</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           )
//         })}
//       </ScrollView>
//     </View>
//   )
// }

function FollowersScreen ({ route }) {
  const { followersData } = route.params
  return (
    <View>
      <ScrollView>
        {followersData.map((item) => {
          return (
            <View key={item.user_id}>
              <Card containerStyle={{ padding: 0 }}>
                {
                  <ListItem
                    key={item.user_id}
                    roundAvatar
                    title={item.given_name}
                    leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user_id + '/photo' } }}
                  />
                }
              </Card>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

function FollowingScreen ({ route }) {
  const { followingData } = route.params
  return (
    <View>
      <ScrollView>
        {followingData.map((item) => {
          return (
            <View key={item.user_id}>
              <Card containerStyle={{ padding: 0 }}>
                {
                  <ListItem
                    key={item.user_id}
                    roundAvatar
                    title={item.given_name}
                    leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user_id + '/photo' } }}
                  />
                }
              </Card>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const Tab = createMaterialTopTabNavigator()

export default function UserScreen ({ route }) {
  const { token } = route.params
  const { userID } = route.params

  const [isLoading, setIsLoading] = React.useState(true)
  const [givenName, setGivenName] = React.useState('')
  const [followers, setFollowers] = React.useState([])
  const [following, setFollowing] = React.useState([])

  const followUser = (method) => {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userID + '/follow',
      {
        method: method,
        headers: ({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': token
        })
      })
  }

  const getUser = () => {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userID)
      .then((response) => response.json())
      .then((responseJson) => {
        setGivenName(responseJson.given_name)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getFollowers = () => {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userID + '/followers')
      .then((response) => response.json())
      .then((responseJson) => {
        setFollowers(responseJson)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getFollowing = () => {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userID + '/following')
      .then((response) => response.json())
      .then((responseJson) => {
        setFollowing(responseJson)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    getUser()
    getFollowers()
    getFollowing()
  }, [])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <>
        <View style={Styles.userContainer}>
          <Text h4>{givenName}</Text>
          <Avatar
            rounded
            source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + userID + '/photo' }}
            size='large'
          />
        </View>

        <Tab.Navigator>
          <Tab.Screen name='Followers' component={FollowersScreen} initialParams={{ followersData: followers }} />
          <Tab.Screen name='Following' component={FollowingScreen} initialParams={{ followingData: following }} />
        </Tab.Navigator>
      </>
    )
  }
}
