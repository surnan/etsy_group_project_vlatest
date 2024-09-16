from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Order

order_bp = Blueprint('orders', __name__)

# Get All Orders for the Current User
@order_bp.route('/api/users/current/orders/', methods=['GET'])
@login_required
def get_user_orders():
    try:
        orders = Order.query.filter_by(userId=current_user.id).all()

        if not orders:
            return jsonify({"orders": []}), 200

        orders_list = [{
            "id": order.id,
            "totalPrice": sum(float(op.product.price) * op.quantity for op in order.order_products),
            "products": [{
                "id": op.product.id,
                "name": op.product.name,
                "price": float(op.product.price),
                "quantity": op.quantity,
                "images": [{"id": img.id, "imageUrl": img.image_url} for img in op.product.images]
            } for op in order.order_products]
        } for order in orders]

        return jsonify({"orders": orders_list}), 200
    except Exception as e:
        print(f"Error fetching user orders: {e}")
        return jsonify({"error": "Failed to fetch user orders"}), 500

# Get Details of a Specific Order
@order_bp.route('/api/users/current/orders/<int:orderId>', methods=['GET'])
@login_required
def get_order_details(orderId):
    try:
        order = Order.query.filter_by(id=orderId, userId=current_user.id).first()

        if not order:
            return jsonify({"message": "Order not found"}), 404

        order_details = {
            "id": order.id,
            "totalPrice": sum(float(op.product.price) * op.quantity for op in order.order_products),
            "products": [{
                "id": op.product.id,
                "name": op.product.name,
                "price": float(op.product.price),
                "quantity": op.quantity,
                "images": [{"id": img.id, "imageUrl": img.image_url} for img in op.product.images]
            } for op in order.order_products]
        }

        return jsonify({"order": order_details}), 200
    except Exception as e:
        print(f"Error fetching order details for order ID {orderId}: {e}")
        return jsonify({"error": "Failed to fetch order details"}), 500


# from flask import Blueprint, jsonify
# from flask_login import login_required, current_user
# from app.models import db, Order, OrderProduct

# order_bp = Blueprint('orders', __name__)

# # Get All Orders for the Current User
# @order_bp.route('/api/users/current/orders/', methods=['GET'])
# @login_required
# def get_user_orders():
#     orders = Order.query.filter_by(userId=current_user.id).all()

#     if not orders:
#         return jsonify({"orders": []}), 200

#     orders_list = [{
#         "id": order.id,
#         "totalPrice": sum(float(op.product.price) * op.quantity for op in order.order_products),
#         "products": [{
#             "id": op.product.id,
#             "name": op.product.name,
#             "price": float(op.product.price),
#             "quantity": op.quantity,
#             "images": [{"id": img.id, "imageUrl": img.image_url} for img in op.product.images]
#         } for op in order.order_products]
#     } for order in orders]

#     return jsonify({"orders": orders_list}), 200


# # Get Details of a Specific Order
# @order_bp.route('/api/users/current/orders/<int:orderId>', methods=['GET'])
# @login_required
# def get_order_details(orderId):
#     order = Order.query.filter_by(id=orderId, userId=current_user.id).first()

#     if not order:
#         return jsonify({"message": "Order not found"}), 404

#     order_details = {
#         "id": order.id,
#         "totalPrice": sum(float(op.product.price) * op.quantity for op in order.order_products),
#         "products": [{
#             "id": op.product.id,
#             "name": op.product.name,
#             "price": float(op.product.price),
#             "quantity": op.quantity,
#             "images": [{"id": img.id, "imageUrl": img.image_url} for img in op.product.images]
#         } for op in order.order_products]
#     }

#     return jsonify({"order": order_details}), 200
