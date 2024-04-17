import http from '../http-common'

class UserDataService {

	// methods here correspond to the methods in UserController.java

	//createUser
	createUser(data) {
		return http.post('/users', data)
	}

	//addFriend
	addFriend(userId, username) {
		return http.post(`/users/friends/add/${userId}/${username}`)
	}

	//getuserbyid

	//getallusers

	//updateuserwithid

	//deleteuserwithid

	//getFriends()
	getFriends(userId) {
		return http.get(`/users/friends/${userId}`)
	}

	getReviews(userId) {
		return http.get(`/users/reviews/${userId}`)
	}

	getUserBySpotId(spotId){
		return http.get(`/users/spotifyId/${spotId}`)
	}
}

export default UserDataService
