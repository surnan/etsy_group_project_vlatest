import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProductImages } from '../../redux/product';
import { getProductsOneThunk, updateProductThunk, insertProductImages } from '../../redux/product';
import './UpdateProduct.css';

export default function UpdateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const product = useSelector(state => state.product.single);

    // Fetch product data and populate input fields
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            await dispatch(getProductsOneThunk(productId));
            setLoading(false);
        };

        if (!product || product.id !== parseInt(productId)) {
            fetchProductData();
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            setImage1(product.product_images[0]?.image_url || '');
            setImage2(product.product_images[1]?.image_url || '');
            setImage3(product.product_images[2]?.image_url || '');
            setImage4(product.product_images[3]?.image_url || '');
            setImage5(product.product_images[4]?.image_url || '');
            setLoading(false);
        }
    }, [dispatch, productId, product]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            productId: product.id,
            name,
            description,
            price,
            stock,
        };

        const newErrors = {};

        if (!name) {
            newErrors.name = 'Name is required';
        }
        if (!description) {
            newErrors.description = 'Description is required';
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
        if (!stock || isNaN(stock) || Number(stock) <= 0) {
            newErrors.stock = 'Stock must be a positive integer';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShowErrors(true);
            return;
        }

        // Update the product
        await dispatch(updateProductThunk(updatedProduct));

        // Delete existing images before updating with new ones
        await dispatch(deleteProductImages(product.id));

        // Update images
        const product_images = [
            { image_url: image1 },
            { image_url: image2 },
            { image_url: image3 },
            { image_url: image4 },
            { image_url: image5 }
        ];

        // Loop through and insert images if image URL exists
        for (const image of product_images) {
            if (image.image_url) {
                await dispatch(insertProductImages(product.id, image.image_url));
            }
        }

        navigate(`/products/${productId}`);
    };



    if (loading) {
        return <div className="loading-spot">LOADING PRODUCT...</div>;
    }

    return (
        <div className="update-product-container">
            <h1 className="form-title">Update Product</h1>
            <form className="update-product-form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <input
                        className="form-input"
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="form-error">{errors.description}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="price">Price</label>
                    <input
                        className="form-input"
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p className="form-error">{errors.price}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="stock">Stock</label>
                    <input
                        className="form-input"
                        type="text"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    {errors.stock && <p className="form-error">{errors.stock}</p>}
                </div>
                {/* Image inputs */}
                <div className="form-group">
                    <label className="form-label" htmlFor="image1">Image 1</label>
                    <input
                        className="form-input"
                        type="text"
                        id="image1"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="image2">Image 2</label>
                    <input
                        className="form-input"
                        type="text"
                        id="image2"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="image3">Image 3</label>
                    <input
                        className="form-input"
                        type="text"
                        id="image3"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="image4">Image 4</label>
                    <input
                        className="form-input"
                        type="text"
                        id="image4"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="image5">Image 5</label>
                    <input
                        className="form-input"
                        type="text"
                        id="image5"
                        value={image5}
                        onChange={(e) => setImage5(e.target.value)}
                    />
                </div>
                <button className="submit-button" type="submit">Update Product</button>
            </form>
        </div>
    );
}
