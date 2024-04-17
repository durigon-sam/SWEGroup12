import http from '../http-common'

class ReviewDataService {

	//createReview
	create(userId, data){
		return http.post(`/reviews/${userId}`, data)
	}

	//getReviewByUser
	getReviewByUser(spotId, userId){
		return http.get(`/reviews/getReviewByUser/${spotId}/${userId}`)
	}

	//getAvgReview
	getAvgReviewScore(spotId){
		return http.get(`/reviews/averageRating/${spotId}`)
	}
}

export default ReviewDataService