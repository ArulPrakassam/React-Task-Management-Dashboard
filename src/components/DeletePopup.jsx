import React from "react";
import { useGlobalContext } from "../context";

const DeletePopup = () => {
  const { confirmDelete, setConfirmDelete, removeItem } = useGlobalContext();
  return (
    <section className="modal-content">
      <div className="modal-container delete-confirmation">
        <div className="confirmation-text">
          <p>Are you sure want to delete this task?</p>
        </div>
        <div className="confirmation-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              setConfirmDelete(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-button"
            onClick={() => {
              setConfirmDelete({ ...confirmDelete, status: false });
              removeItem(confirmDelete.id);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeletePopup;
