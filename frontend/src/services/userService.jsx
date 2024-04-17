import http from '../http-common'

class UserDataService {

	// methods here correspond to the methods in UserController.java

	//createUser
	createUser(data) {
		return http.post('/users', data)
	}

	//getFriends()
	getFriends(userId) {
		return http.get(`/friends/${userId}`)
	}

	getReviews(userId) {
		return http.get(`/users/reviews/${userId}`)
	}

	getUserBySpotId(spotId){
		return http.get(`/users/spotifyId/${spotId}`)
	}

	//findUserByUsername
	getUserByUsername(username){
		return http.get(`/users/username/${username}`)
	}

	//findUserByUsername
	getUserByEmail(email){
		return http.get(`/users/email/${email}`)
	}
}

export default UserDataService
