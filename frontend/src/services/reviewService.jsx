import http from '../http-common'

class ReviewDataService {

	//createReview
	create(data){
		return http.post('/reviews', data)
	}

	//getReviewByUser
	getReviewByUser(spotId, userId){
		return http.get(`/reviews/getReviewByUser/${spotId}/${userId}`)
	}
}

export default ReviewDataService