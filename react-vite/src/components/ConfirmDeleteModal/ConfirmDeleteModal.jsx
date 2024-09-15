import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../redux/product";
import { useModal } from '../../context/Modal';

import './ConfirmDeleteModal.css';

export default function ConfirmDeleteModal({ productId, setProductChecker }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // console.log("THIS IS productId", productId);

        dispatch(deleteProductThunk(productId))
            .then(() => { setProductChecker(true) })
            .then(closeModal);
    }

    return (
        <div className="confirm-delete-container">
            <h1>Confirm Delete</h1>
            <span>Are you sure you want to remove this Product from the listings?</span>
            <div className="delete-buttons-container">
                <button className="yes-button-modal" onClick={(e) => handleDelete(e)}>{'Yes (Delete Product)'}</button>
                <button className="no-button-modal"  onClick={closeModal}>{'No (Keep Product)'}</button>
            </div>
        </div>
    )
}