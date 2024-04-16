import http from '../http-common'

class UserDataService {

	//methods here correspond to the methods in UserController.java

	//createUser
	create(data){
		return http.post('/users', data)
	}

	//getuserbyid

	//getallusers

	//updateuserwithid

	//deleteuserwithid

	//getFriendsOfUser()
}

export default UserDataService