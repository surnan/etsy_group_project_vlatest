from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


# @auth_routes.route('/')
# def authenticate():
#     """
#     Authenticates a user.
#     """
#     if current_user.is_authenticated:
#         return current_user.to_dict()
#     return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    try:
        if current_user.is_authenticated:
            return jsonify(current_user.to_dict())
        return {'errors': {'message': 'Unauthorized'}}, 401
    except Exception as e:
        print('Error: authenticate:', e)
        return {'errors': {'message': 'Unauthorized'}}, 401



# @auth_routes.route('/', methods=['GET'])
# def get_user():
#     try:
#         if g.user is None:
#             return jsonify({'user': None}), 200

#         # Assuming user ID is stored in g.user
#         current_user = User.query.get(g.user.id)

#         if current_user is None:
#             return jsonify({'user': None}), 200

#         user_data = {
#             'id': current_user.id,
#             'firstName': current_user.first_name,
#             'lastName': current_user.last_name,
#             'email': current_user.email,
#             'username': current_user.username
#         }

#         return jsonify({'user': user_data}), 200
#     except Exception as error:
#         return jsonify({'error': str(error)}), 500

@auth_routes.route('/', methods=['GET'])
def get_user():
    try:
        if g.user is None:
            return jsonify({'user': None}), 200

        # Assuming user ID is stored in g.user
        current_user = User.query.get(g.user.id)

        if current_user is None:
            return jsonify({'user': None}), 200

        user_data = {
            'id': current_user.id,
            'firstName': current_user.first_name,
            'lastName': current_user.last_name,
            'email': current_user.email,
            'username': current_user.username
        }

        return jsonify({'user': user_data}), 200
    except Exception as error:
        print('Error: get_user:', error)
        return jsonify({'error': str(error)}), 500



# @auth_routes.route('/login', methods=['POST'])
# def login():
#     """
#     Logs a user in
#     """
#     print("SUCCESFUL LOGIN!!")
#     print("SUCCESFUL LOGIN!!")
#     print("SUCCESFUL LOGIN!!")
#     form = LoginForm()
#     # Get the csrf_token from the request cookie and put it into the
#     # form manually to validate_on_submit can be used
#     form['csrf_token'].data = request.cookies['csrf_token']
#     print(form.data)
#     if form.validate_on_submit():
#         # Add the user to the session, we are logged in!
#         user = User.query.filter(User.email == form.data['email']).first()
#         login_user(user)
#         return user.to_dict()
#     return form.errors, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    try:
        print("SUCCESSFUL LOGIN!!")
        form = LoginForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            user = User.query.filter(User.email == form.data['email']).first()
            login_user(user)
            return user.to_dict()
        return form.errors, 401
    except Exception as e:
        print('Error: login:', e)
        return {'errors': {'message': 'Login failed'}}, 500


# @auth_routes.route('/logout')
# def logout():
#     """
#     Logs a user out
#     """
#     logout_user()
#     return {'message': 'User logged out'}

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    try:
        logout_user()
        return {'message': 'User logged out'}
    except Exception as e:
        print('Error: logout:', e)
        return {'errors': {'message': 'Logout failed'}}, 500
    

# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User(
#             username=form.data['username'],
#             email=form.data['email'],
#             password=form.data['password']
#         )
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
#     return form.errors, 401

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    try:
        form = SignUpForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password']
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        return form.errors, 401
    except Exception as e:
        print('Error: sign_up:', e)
        return {'errors': {'message': 'Signup failed'}}, 500
    


# @auth_routes.route('/unauthorized')
# def unauthorized():
#     """
#     Returns unauthorized JSON when flask-login authentication fails
#     """
#     return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    try:
        return {'errors': {'message': 'Unauthorized'}}, 401
    except Exception as e:
        print('Error: unauthorized:', e)
        return {'errors': {'message': 'Error handling unauthorized request'}}, 500