# api/product_routes.py
from flask import Blueprint, jsonify, redirect, render_template, request


from app.models import db, Product, User

product_routes = Blueprint('products', __name__)


# Get All Products
@product_routes.route('/', methods=['GET'])
def get_all_products():
    try:
        all_products = Product.query.all()
        print(f"Fetched products: {all_products}")

        # Convert each product to a dictionary using to_dict
        products_list = [product.to_dict() for product in all_products]

        return jsonify(products_list)
    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({'error': 'Something went wrong'}), 500

# Get Details of a Specific product
@product_routes.route('/<int:productId>', methods=['GET'])
def get_one_product_details(productId):
    product = Product.query.get(productId)
    if product:
        return jsonify(product.to_dict())  # Assuming your `Product` model has a `to_dict()` method
    else:
        return jsonify({"error": "Product not found"}), 404


@product_routes.route('/', methods=['POST'])
def add_product():
    data = request.get_json()
    sellerId = data.get('sellerId')
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    stock = data.get('stock')
    new_product = Product(name=name, price=price, description=description, sellerId=sellerId, stock=stock)

    try:
        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message": "Product added successfully", "product": {
            "id": new_product.id, 
            "name": new_product.name, 
            "price": new_product.price
            }}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@product_routes.route('/<int:productId>', methods=['DELETE'])
def delete_product(productId):
    product = Product.query.get(productId)
    
    if not product:
        return jsonify({"error": "Product not found"}), 404

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": f"Product with ID {productId} has been deleted."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

@product_routes.route('/<int:productId>', methods=['PUT'])
def update_product(productId):
    product = Product.query.get(productId)
    
    if not product:
        return jsonify({"error": "Product not found"}), 404

    data = request.get_json()
    name = data.get('name', product.name)  
    description = data.get('description', product.description)  
    price = data.get('price', product.price)  
    stock = data.get('stock', product.stock)  
    sellerId = data.get('sellerId', product.sellerId)  

    # Update product details
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock
    product.sellerId = sellerId

    try:
        db.session.commit()
        return jsonify({"message": "Product updated successfully", "product": {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "stock": product.stock,
            "sellerId": product.sellerId
        }}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@product_routes.route('/<int:productId>/images', methods=['GET'])
def get_product_images(productId):
    product = Product.query.get(productId)
    
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product_images = product.product_images
    return jsonify([image.to_dict() for image in product_images])

@product_routes.route('/<int:productId>/reviews', methods=['GET'])
def get_product_reviews(productId):
    product = Product.query.get(productId)
    
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product_reviews = product.reviews
    
    for review in product_reviews:
        review.user = User.query.get(review.userId)
    
    return jsonify([review.to_dict() for review in product_reviews])