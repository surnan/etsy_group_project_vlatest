from .db import db, environment, SCHEMA, add_prefix_for_prod


class Productimage(db.Model):
    __tablename__ = 'productimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)

    productId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    # productId = db.Column(db.Integer, nullable=False)

    # Relationship
    product = db.relationship('Product', back_populates='productimages')

    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.productId,
            'image_url': self.image_url
        }