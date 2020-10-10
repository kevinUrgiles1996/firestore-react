import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { projectFirestore as db } from '../firebase/config';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#c56183',
    boxShadow: '5px 5px 10px black',
    border: 'none'
  }
};


export const Modal = ({ quote, mode, isVisible, hideModal }) => {

  const { id, author, cite } = quote;

  const [newAuthor, setNewAuthor] = useState(author);
  const [newCite, setNewCite] = useState(cite);

  const [isOpen, setIsOpen] = useState(isVisible);

  const closeModal = () => {
    setIsOpen(false);
    hideModal()
  };

  const handleCiteChange = (e) => setNewCite(e.target.value);
  const handleAuthorChange = (e) => setNewAuthor(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      updateQuote();
    } else {
      createQuote();
    }
    closeModal();
  }

  const createQuote = async () => {
    try {
      await db.collection('quotes').add({
        author: newAuthor,
        cite: newCite
      })
    } catch (error) {
      console.error(error);
    }
  }

  const updateQuote = async () => {
    try {
      await db.collection('quotes').doc(id)
        .update({
          cite: newCite,
          author: newAuthor
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ReactModal isOpen={isOpen} style={customStyles} >
      <form className='edit-modal' onSubmit={handleSubmit}>
        <button className='close-button' onClick={closeModal} >X</button>
        <input type='text' value={newAuthor} onChange={handleAuthorChange} placeholder='Author' />
        <textarea type='text' value={newCite} onChange={handleCiteChange} placeholder='Cite' />
        {
          mode === 'edit' ?
            <button type='submit' className='edit-button'>Update Quote</button> :
            <button type='submit' className='create-button'>Create Quote</button>
        }
      </form>
    </ReactModal>
  )
}
