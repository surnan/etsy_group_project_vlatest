from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, ShoppingCart, CartProduct, Product

shopping_cart_bp = Blueprint('shopping_cart', __name__)

# Get the Current User's Shopping Cart
@shopping_cart_bp.route('/api/users/current/cart/', methods=['GET'])
@login_required
def get_shopping_cart():
    try:
        shopping_cart = ShoppingCart.query.filter_by(userId=current_user.id).first()

        if not shopping_cart:
            return jsonify({"Products": []}), 200

        products = [{
            "id": cp.product.id,
            "name": cp.product.name,
            "description": cp.product.description,
            "price": float(cp.product.price),
            "quantity": cp.quantity,
            "images": [{"id": img.id, "imageUrl": img.image_url} for img in cp.product.images]
        } for cp in shopping_cart.cart_products]

        return jsonify({"Products": products}), 200
    except Exception as e:
        print(f"Error fetching shopping cart: {e}")
        return jsonify({"error": "Failed to fetch shopping cart"}), 500

# Add a Product to the Current User's Shopping Cart
@shopping_cart_bp.route('/api/users/current/cart/', methods=['POST'])
@login_required
def add_product_to_cart():
    try:
        data = request.get_json()
        product_id = data.get('productId')

        if not product_id:
            return jsonify({
                "message": "Bad Request",
                "errors": {
                    "productId": "Product ID is required"
                }
            }), 400

        product = Product.query.get(product_id)
        if not product:
            return jsonify({"message": "Product not found"}), 404

        shopping_cart = ShoppingCart.query.filter_by(userId=current_user.id).first()

        if not shopping_cart:
            shopping_cart = ShoppingCart(userId=current_user.id)
            db.session.add(shopping_cart)
            db.session.commit()

        cart_product = CartProduct.query.filter_by(shopping_cart_id=shopping_cart.id, product_id=product_id).first()

        if cart_product:
            cart_product.quantity += 1
        else:
            cart_product = CartProduct(shopping_cart_id=shopping_cart.id, product_id=product_id, quantity=1)
            db.session.add(cart_product)

        db.session.commit()

        return jsonify({"message": "Product Added to Cart"}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error adding product to cart: {e}")
        return jsonify({"error": "Failed to add product to cart"}), 500

# Remove a Product from the Shopping Cart
@shopping_cart_bp.route('/api/users/current/cart/<int:productId>', methods=['DELETE'])
@login_required
def remove_product_from_cart(productId):
    try:
        shopping_cart = ShoppingCart.query.filter_by(userId=current_user.id).first()

        if not shopping_cart:
            return jsonify({"message": "Product not found in cart"}), 404

        cart_product = CartProduct.query.filter_by(shopping_cart_id=shopping_cart.id, product_id=productId).first()

        if not cart_product:
            return jsonify({"message": "Product not found in cart"}), 404

        db.session.delete(cart_product)
        db.session.commit()

        return jsonify({"message": "Product removed from Cart"}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error removing product from cart: {e}")
        return jsonify({"error": "Failed to remove product from cart"}), 500


# from flask import Blueprint, request, jsonify
# from flask_login import login_required, current_user
# from app.models import db, ShoppingCart, CartProduct, Product

# shopping_cart_bp = Blueprint('shopping_cart', __name__)

# # Get the Current User's Shopping Cart
# @shopping_cart_bp.route('/api/users/current/cart/', methods=['GET'])
# @login_required
# def get_shopping_cart():
#     shopping_cart = ShoppingCart.query.filter_by(userId=current_user.id).first()

#     if not shopping_cart:
#         return jsonify({"Products": []}), 200

#     products = [{
#         "id": cp.product.id,
#         "name": cp.product.name,
#         "description": cp.product.description,
#         "price": float(cp.product.price),
#         "quantity": cp.quantity,
#         "images": [{"id": img.id, "imageUrl": img.image_url} for img in cp.product.images]
#     } for cp in shopping_cart.cart_products]

#     return jsonify({"Products": products}), 200


# # Add a Product to the Current User's Shopping Cart
# @shopping_cart_bp.route('/api/users/current/cart/', methods=['POST'])
# @login_required
# def add_product_to_cart():
#     data = request.get_json()
#     product_id = data.get('productId')

#     if not product_id:
#         return jsonify({
#             "message": "Bad Request",
#             "errors": {
#                 "productId": "Product ID is required"
#             }
#         }), 400

#     product = Product.query.get(product_id)
#     if not product:
#         return jsonify({"message": "Product not found"}), 404

#     shopping_cart = ShoppingCart.query.filter_by(userId=current_user.id).first()

#     if not shopping_cart:
#         shopping_cart = ShoppingCart(userId=current_user.id)
#         db.session.add(shopping_cart)
#         db.session.commit()

#     cart_product = CartProduct.query.filter_by(shopping_cart_id=shopping_cart.id, product_id=product_id).first()

#     if cart_product:
#         cart_product.quantity += 1
#     else:
#         cart_product = CartProduct(shopping_cart_id=shopping_cart.id, product_id=product_id, quantity=1)
#         db.session.add(cart_product)

#     db.session.commit()

#     return jsonify({"message": "Product Added to Cart"}), 200


# # Remove a Product from the Shopping Cart
# @shopping_cart_bp.route('/api/users/current/cart/<int:productId>', methods=['DELETE'])
# @login_required
# def remove_product_from_cart(productId):
#     shopping_cart = ShoppingCart.query.filter_by(userId=current_user.id).first()

#     if not shopping_cart:
#         return jsonify({"message": "Product not found in cart"}), 404

#     cart_product = CartProduct.query.filter_by(shopping_cart_id=shopping_cart.id, product_id=productId).first()

#     if not cart_product:
#         return jsonify({"message": "Product not found in cart"}), 404

#     db.session.delete(cart_product)
#     db.session.commit()

#     return jsonify({"message": "Product removed from Cart"}), 200
