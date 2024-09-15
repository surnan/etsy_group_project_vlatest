import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProductThunk } from '../../redux/product';
import { useSelector } from 'react-redux';

import './CreateProduct.css';

export default function CreateProduct() {
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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const errors = {};

        if (name.length === 0)
            errors.name = 'Name is required';
        if (description.length === 0)
            errors.description = 'Description is required';
        if (price.length === 0 || isNaN(price) || Number(price) <= 0)
            errors.price = 'Price must be a positive number';
        if (stock < 1 || isNaN(stock))
            errors.stock = 'Stock must be a positive integer';

        setErrors(errors);
    }, [name, description, price, stock]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            return;
        }

        const product = {
            name: name,
            description: description,
            sellerId: user.id,
            price: price,
            stock: stock,
            images: [
                image1,
                image2,
                image3,
                image4,
                image5
            ]
        };

        try {
            const res = await dispatch(addProductThunk(product));
            const newProduct = await res;
            navigate(`/products/${newProduct.product.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-product-container">
            <h1 className="form-title">Create Product</h1>
            <form className="create-product-form" onSubmit={handleSubmit}>
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
                <button className="submit-button" type="submit">Create Product</button>
            </form>
        </div>
    );
}
