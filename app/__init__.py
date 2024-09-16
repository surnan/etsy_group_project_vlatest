# app/__init_.py
import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, Favorite, Review
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.product_routes import product_routes   ##### - surnan
from .api.productimages_routes import productimage_routes   ##### - surnan
from .api.review_routes import review_routes   ##### - michelle
# from .api.javier_review_routes import review_productID_bp #Javier Reviews
from .api.favorite_routes import favorite_bp #Javier Favorites
from .seeds import seed_commands
from .config import Config


app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(product_routes, url_prefix='/api/products') ##### - surnan
app.register_blueprint(productimage_routes, url_prefix='/api/productimages') ##### - surnan
app.register_blueprint(review_routes, url_prefix='/api/reviews') ##### - michelle
app.register_blueprint(favorite_bp, url_prefix='/api/favorites') #JAVIER FAVORITE ROUTES
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
# @app.before_request
# def https_redirect():
#     if os.environ.get('FLASK_ENV') == 'production':
#         if request.headers.get('X-Forwarded-Proto') == 'http':
#             url = request.url.replace('http://', 'https://', 1)
#             code = 301
#             return redirect(url, code=code)


# @app.after_request
# def inject_csrf_token(response):
#     response.set_cookie(
#         'csrf_token',
#         generate_csrf(),
#         secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
#         samesite='Strict' if os.environ.get(
#             'FLASK_ENV') == 'production' else None,
#         httponly=True)
#     return response


# @app.route("/api/docs")
# def api_help():
#     """
#     Returns all API routes and their doc strings
#     """
#     acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
#     route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
#                     app.view_functions[rule.endpoint].__doc__ ]
#                     for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
#     return route_list


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def react_root(path):
#     """
#     This route will direct to the public directory in our
#     react builds in the production environment for favicon
#     or index.html requests
#     """
#     if path == 'favicon.ico':
#         return app.send_from_directory('public', 'favicon.ico')
#     return app.send_static_file('index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')


@app.before_request
def https_redirect():
    try:
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)
    except Exception as e:
        print(f"Error in https_redirect: {e}")

@app.after_request
def inject_csrf_token(response):
    try:
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
            samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
            httponly=True
        )
        return response
    except Exception as e:
        print(f"Error injecting CSRF token: {e}")
        return response

@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    try:
        acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                      app.view_functions[rule.endpoint].__doc__]
                      for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
        return route_list
    except Exception as e:
        print(f"Error generating API docs: {e}")
        return jsonify({"error": "Failed to generate API documentation"}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    try:
        if path == 'favicon.ico':
            return send_from_directory('public', 'favicon.ico')
        return send_static_file('index.html')
    except Exception as e:
        print(f"Error in react_root: {e}")
        return jsonify({"error": "Failed to serve static file"}), 500

@app.errorhandler(404)
def not_found(e):
    try:
        return send_static_file('index.html')
    except Exception as e:
        print(f"Error handling 404: {e}")
        return jsonify({"error": "Failed to handle 404 error"}), 500

