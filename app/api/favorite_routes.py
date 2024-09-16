from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, ShoppingCart, CartProduct, Product, Review, Favorite

favorite_bp = Blueprint('favorites', __name__)

# Favorites Create Read Delete
# Favorite Create
# @favorite_bp.route('/', methods=['POST'])
# @login_required
# def create_favorite():
#     data = request.get_json() #grab request data
#     # userId = data.get('userId') #grab userId from req
#     userId = current_user.id
#     productId = data.get('productId') #grab product_id from req

#     if not productId:
#         return jsonify({'error': 'Missing productId'}), 400
    
#     # does product belong to current user?
#     product = Product.query.get(productId)
#     # if product and product.sellerId == userId:
#     #     return jsonify({'error': 'You cannot favorite your own product'}), 403
#     if not product:
#         return jsonify({'error': 'Product not found'}), 404
#     if product.sellerId == userId:
#         return jsonify({'error': 'You cannot favorite your own product'}), 403
#     # does favorite already exist?
#     existing_favorite = Favorite.query.filter_by(userId=userId, productId=productId).first()
#     if existing_favorite:
#         return jsonify({'error': 'Favorite already exists'}), 400

#     #Create Favorite using class
#     new_favorite = Favorite(userId=userId, productId=productId)
#     #Add Favorite
#     db.session.add(new_favorite)
#     db.session.commit()

#     return jsonify(new_favorite.to_dict()), 201


@favorite_bp.route('/', methods=['POST'])
@login_required
def create_favorite():
    try:
        data = request.get_json()  # Grab request data
        userId = current_user.id
        productId = data.get('productId')  # Grab product_id from request

        if not productId:
            return jsonify({'error': 'Missing productId'}), 400

        # Check if the product exists and doesn't belong to the current user
        product = Product.query.get(productId)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        if product.sellerId == userId:
            return jsonify({'error': 'You cannot favorite your own product'}), 403

        # Check if the favorite already exists
        existing_favorite = Favorite.query.filter_by(userId=userId, productId=productId).first()
        if existing_favorite:
            return jsonify({'error': 'Favorite already exists'}), 400

        # Create Favorite
        new_favorite = Favorite(userId=userId, productId=productId)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify(new_favorite.to_dict()), 201
    except Exception as e:
        print('Error: create_favorite:', e)
        return jsonify({'error': 'Failed to create favorite'}), 500



# Favorite Read
# @favorite_bp.route('/', methods=['GET'])
# @login_required
# def get_favorites():
#     #Grab/Query Favorites by user
#     print("backend current_user.id", current_user.id)
#     userId = current_user.id
#     print("backend route userId", userId)
#     favorites = Favorite.query.filter_by(userId=userId).all()

#     favorites_with_products = [
#         {
#             **favorite.to_dict(),
#             'product': favorite.product.to_dict()  # Assuming your Product model has a to_dict method
#         }
#         for favorite in favorites
#     ]
#     #Return Favorites
#     print("backend favorites", favorites)
#     # return jsonify([favorite.to_dict() for favorite in favorites]), 200
#     return jsonify(favorites_with_products), 200
@favorite_bp.route('/', methods=['GET'])
@login_required
def get_favorites():
    try:
        userId = current_user.id
        favorites = Favorite.query.filter_by(userId=userId).all()

        favorites_with_products = [
            {
                **favorite.to_dict(),
                'product': favorite.product.to_dict()  # Assuming your Product model has a to_dict method
            }
            for favorite in favorites
        ]

        return jsonify(favorites_with_products), 200
    except Exception as e:
        print('Error: get_favorites:', e)
        return jsonify({'error': 'Failed to retrieve favorites'}), 500



# Favorite Delete
# @favorite_bp.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_favorite(id):
#     #Grab/Query Favorite by the Favorite's id
#     favorite = Favorite.query.get(id)

#     if not favorite:
#         return jsonify({'error': 'Favorite not found'}), 404
    
#     if favorite.userId != current_user.id:
#         return jsonify({'error': 'Unauthorized action'}), 403

#     #Delete favorite
#     db.session.delete(favorite)
#     db.session.commit()

#     return jsonify({'message': 'Favorite deleted successfully'}), 200
@favorite_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_favorite(id):
    try:
        # Grab/Query Favorite by the Favorite's id
        favorite = Favorite.query.get(id)

        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404
        
        if favorite.userId != current_user.id:
            return jsonify({'error': 'Unauthorized action'}), 403

        # Delete favorite
        db.session.delete(favorite)
        db.session.commit()

        return jsonify({'message': 'Favorite deleted successfully'}), 200
    except Exception as e:
        print('Error: delete_favorite:', e)
        return jsonify({'error': 'Failed to delete favorite'}), 500