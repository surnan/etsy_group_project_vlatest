from flask.cli import AppGroup
from .users import seed_users, undo_users
from .cart_products import seed_cart_products, undo_cart_products
from .favorites import seed_favorites, undo_favorites
from .productImages import seed_product_images, undo_product_images
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .shoppingcart import seed_shopping_carts, undo_shopping_carts


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reviews()
        undo_product_images()
        undo_favorites()
        undo_cart_products()
        undo_shopping_carts()
        undo_products()
        undo_users()


    seed_users()
    seed_products()
    seed_product_images()
    seed_shopping_carts()
    seed_cart_products()
    seed_favorites()
    seed_reviews()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_product_images()
    undo_favorites()
    undo_cart_products()
    undo_shopping_carts()
    undo_products()
    undo_users()
    # Add other undo functions here
