import React, { useState } from 'react';
import { projectFirestore as db } from '../firebase/config';

import { Modal } from './Modal';


export const Quote = ({ quote }) => {
  const { id, author, cite } = quote;

  const [isVisible, setIsVisible] = useState(false);

  const deleteQuote = async () => {
    try {
      await db.collection('quotes').doc(id).delete();
    } catch (error) {
      console.error(error);
    }
  }

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return (
    <>
      <blockquote className='card'>
        <div className='card-body'>
          <p>{cite}</p>
          <p>{author}</p>
        </div>
        <div className='card-actions'>
          <button className='edit-button' onClick={showModal} >Edit</button>
          <button className='delete-button' onClick={deleteQuote} >Delete</button>
        </div>
      </blockquote>
      {
        isVisible &&
        <Modal quote={quote} mode='edit' isVisible={isVisible} hideModal={hideModal} />
      }

    </>
  )
}
