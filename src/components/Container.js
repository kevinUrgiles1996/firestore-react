import React, { useState } from 'react';
import { Quote } from './Quote';
import { useData } from '../hooks/useData';
import { Modal } from './Modal';


export const Container = () => {

  const { docs: quotes } = useData('quotes');

  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  const newQuote = { author: '', cite: '' }

  return (
    <>
      <div>
        {
          quotes.map((quote) => (
            <Quote key={quote.id} quote={quote} />
          ))
        }
      </div>
      <button className='add-button' onClick={showModal}>+</button>
      {
        isVisible &&
        <Modal quote={newQuote} mode='create' isVisible={isVisible} hideModal={hideModal} />
      }
    </>
  )
}