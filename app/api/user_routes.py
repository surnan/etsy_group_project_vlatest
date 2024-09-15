from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Product

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return jsonify(user.to_dict())

@user_routes.route('/<int:userId>/listings', methods=['GET'])
def get_products_owned_by_user(userId):
    user = User.query.get(userId)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    products = user.products  # Assuming 'products' is a relationship in the User model
    return jsonify([product.to_dict() for product in products])