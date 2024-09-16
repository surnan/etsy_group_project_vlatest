from flask import Blueprint, jsonify, request
from app.models import db, Review, User

review_routes = Blueprint('reviews', __name__)

# Get All Reviews
@review_routes.route('/', methods=['GET'])
def get_all_reviews():
    try:
        all_reviews = Review.query.all()
        reviews = [review.to_dict() for review in all_reviews]  # Assuming you have a `to_dict()` method in the `Review` model
        
        # Add users to the reviews based on the userId
        for review in reviews:
            user = User.query.get(review["userId"])
            review["user"] = user.to_dict()
        
        return jsonify(reviews)
    except Exception as e:
        print(f"Error fetching reviews: {e}")
        return jsonify({"error": "Failed to fetch reviews"}), 500

# Get a Specific Review
@review_routes.route('/<int:reviewId>', methods=['GET'])
def get_review(reviewId):
    try:
        review = Review.query.get(reviewId)
        if not review:
            return jsonify({"error": "Review not found"}), 404
        user = User.query.get(review.userId)
        review_data = review.to_dict()
        review_data["user"] = user.to_dict()
        return jsonify(review_data)
    except Exception as e:
        print(f"Error fetching review: {e}")
        return jsonify({"error": "Failed to fetch review"}), 500

# Add a Review
@review_routes.route('/', methods=['POST'])
def add_review():
    try:
        print("I made it to the route handler")
        data = request.get_json()
        stars = data.get("stars")
        review = data.get("review")
        userId = data.get("userId")
        productId = data.get("productId")
        new_review = Review(stars=stars, review=review, userId=userId, productId=productId)
        print('My new review is ', new_review)

        db.session.add(new_review)
        db.session.commit()

        return jsonify({"message": "Review added successfully", "review": new_review.to_dict()})
    except Exception as e:
        db.session.rollback()
        print(f"Error adding review: {e}")
        return jsonify({"error": str(e)}), 500

# Delete a Review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
def delete_review(reviewId):
    try:
        review = Review.query.get(reviewId)
        if not review:
            return jsonify({"error": "Review not found"}), 404

        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": f"Review with ID {reviewId} has been deleted."}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting review: {e}")
        return jsonify({"error": str(e)}), 500

# Update a Review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
def update_review(reviewId):
    try:
        review = Review.query.get(reviewId)
        print("The review is, ", review)
        
        if not review:
            return jsonify({"error": "Review not found"}), 404
        
        data = request.get_json()
        stars = data.get('stars', review.stars)
        review_text = data.get('review', review.review)
        userId = data.get('userId', review.userId)
        productId = data.get('productId', review.productId)

        review.stars = stars
        print('stars ', review.stars)
        review.review = review_text
        print('review ', review.review)
        review.userId = userId
        print('userId ', review.userId)
        review.productId = productId
        print('product ', review.productId)

        db.session.commit()
        return jsonify({"message": "Review updated successfully", "review": review.to_dict()})
    except Exception as e:
        db.session.rollback()
        print(f"Error updating review: {e}")
        return jsonify({"error": str(e)}), 500


# # api/product_routes.py
# from flask import Blueprint, jsonify, redirect, render_template, request
# from app.models import db, Review, User
# review_routes = Blueprint('reviews', __name__)
# # review_productID_bp = Blueprint('review_productID', __name__)


# @review_routes.route('/', methods = ['GET'])
# def get_all_reviews():
#     all_reviews = Review.query.all()
#     reviews = [review.to_dict() for review in all_reviews]  # Assuming you have a `to_dict()` method in the `Review` model
    
#     # Add users to the reviews based on the userId
#     for review in reviews:
#         user = User.query.get(review["userId"])
#         review["user"] = user.to_dict()
    
#     return jsonify(reviews)

# @review_routes.route('/<int:reviewId>', methods = ['GET'])
# def get_review(reviewId):
#     review = Review.query.get(reviewId)
#     if not review:
#         return jsonify({"error": "Review not found"}), 404
#     user = User.query.get(review.userId)
#     review_data = review.to_dict()
#     review_data["user"] = user.to_dict()
#     return jsonify(review_data)

# @review_routes.route('/', methods=['POST'])
# def add_review():
#     print("I made it to the route handler")
#     data = request.get_json()
#     stars = data.get("stars")
#     review = data.get("review")
#     userId = data.get("userId")
#     productId = data.get("productId")
#     new_review = Review(stars=stars, review=review, userId=userId, productId=productId)
#     print('My new review is ', new_review)
#     try:
#         db.session.add(new_review)
#         db.session.commit()
        
#         return jsonify({"message": "Review added successfully", "review": {
#             "stars": new_review.stars,
#             "review": new_review.review,
#             "userId": new_review.userId,
#             "productId": new_review.productId
#         }})
#         # return render_template('review_page.html', all_reviews=[new_review])
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# @review_routes.route('/<int:reviewId>', methods=['DELETE'])
# def delete_review(reviewId):
#     review = Review.query.get(reviewId)

#     if not review:
#         return jsonify({"error": "Product not found"}), 404
    
#     try:
#         db.session.delete(review)
#         db.session.commit()
#         return jsonify({"message": f"Review with ID {reviewId} has been deleted."}), 200
#     except Exception as e:
#         print('I commit')
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500
    
# @review_routes.route('/<int:reviewId>', methods=['PUT'])
# def update_review(reviewId):
#     review = Review.query.get(reviewId)
#     print("The review is, ", review)
    
#     if not review:
#         return jsonify({"error": "Review not found"}), 404
#     data = request.get_json()
#     stars = data.get('stars', review.stars)
#     review_text = data.get('review', review.review)
#     userId = data.get('userId', review.userId)
#     productId = data.get('productId', review.productId)

#     review.stars = stars
#     print('stars ',review.stars)
#     review.review = review_text
#     print('review ', review.review)
#     review.userId = userId
#     print('userId ', review.userId)
#     review.productId = productId
#     print('product ', review.productId)

#     # review = {
#     #     "stars": stars,
#     #     "review": review,
#     #     "userId": userId,
#     #     "productId":productId
#     # }
#     try:
#         db.session.commit()
#         return jsonify({"message": "Review updated successfully", "review": {
#             "id": review.id,
#             "stars": review.stars,
#             "review": review.review,
#             "userId": review.userId,
#             "productId": review.productId
#         }})
#         # return render_template('review_page.html', all_reviews=[new_review])
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500




# #test comment