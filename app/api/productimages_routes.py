from flask import Blueprint, jsonify, render_template, request
from app.models import db, ProductImage

productimage_routes = Blueprint('productimages', __name__)

# Get All Product Images
@productimage_routes.route('/', methods=['GET'])
def get_all_products():
    try:
        all_products = ProductImage.query.all()
        print("all_products = ", all_products)
        return render_template('productimage_page.html', all_products=all_products)
    except Exception as e:
        print(f"Error fetching all products: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

# Get Product Images for a Specific Product
@productimage_routes.route('/<int:tempId>', methods=['GET'])
def get_productImage_for_product(tempId):
    try:
        # Retrieve all product images that match the given productId
        all_product_images = ProductImage.query.filter_by(productId=tempId).all()
        return render_template('productimage_page.html', all_productImages=all_product_images)
    except Exception as e:
        print(f"Error fetching product images for product ID {tempId}: {e}")
        return jsonify({"error": "Failed to fetch product images"}), 500


# # api/productimages_routes.py
# from flask import Blueprint, jsonify, redirect, render_template, request


# from app.models import db, ProductImage

# productimage_routes = Blueprint('productimages', __name__)


# # Get All Products
# @productimage_routes.route('/', methods=['GET'])
# def get_all_products():
#     all_products = ProductImage.query.all()
#     print("all_products = ", all_products)
#     return render_template('productimage_page.html', all_products=all_products)

# @productimage_routes.route('/<int:tempId>', methods=['GET'])
# def get_productImage_for_product(tempId):
#     # Retrieve all product images that match the given productId
#     all_product_images = ProductImage.query.filter_by(productId=tempId).all()
#     return render_template('productimage_page.html', all_productImages=all_product_images)


# # # Get Details of a Specific product
# # @productimage_routes.route('/<int:tempId>', methods=['GET'])
# # def get_productImage_for_product(tempId):
# #     # all_products = ProductImage.query.get(productId=productId)
# #     all_products = ProductImage.query.filter_by(productId=tempId)

# #     print("tempId - ", tempId)
# #     print("===")
# #     print("===")
# #     print("ALL-PRODUCTS = ", all_products)
# #     print("===")
# #     print("===")



# #     return render_template('productimage_page.html', all_productImages=[all_products])

