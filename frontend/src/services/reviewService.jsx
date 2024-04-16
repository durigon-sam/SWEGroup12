import http from '../http-common'

class ReviewDataService {

	//createReview
	create(data){
		return http.post('/reviews', data)
	}
}

export default ReviewDataService