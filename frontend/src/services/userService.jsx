import http from '../http-common'

class UserDataService {

	// methods here correspond to the methods in UserController.java

	//createUser
	createUser(data) {
		return http.post('/users', data)
	}

	//getuserbyid

	//getallusers

	//updateuserwithid

	//deleteuserwithid

	//getFriends()
	getFriends(userID) {
		return http.get('/friends/' + userID)
	}

	getUserByAccessToken(token) {
		return http.get('/accessToken/' + token)
	}
}

export default UserDataService
