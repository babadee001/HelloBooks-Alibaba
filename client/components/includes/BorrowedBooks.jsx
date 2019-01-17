import React from 'react';
import PropTypes from 'prop-types';

const BorrowedBooks = ({ handleAction, cover, title,
  description, id, isReturned, borrowed }) => {

  const handleClick = () => {
    handleAction(id);
  };
    return (
    <div>
      <div>
      <div className="col s12 m3 l3">
        <div className="card">
          <div className="card-image">
            <img id="cover" src={cover} />
            <span className="card-title">{title}</span>
          </div>
          <div className="card-content">
            <span>{description}</span>
          </div>
          <div className="card-action">
            <p>
            {borrowed && !isReturned && (
                <a id="returnBook" onClick={handleClick}
                className="btn">
                  Return
                </a>
              )}
              {borrowed && isReturned && (
                <a id="returnBook" onClick={handleClick}
                className="btn disabled">
                  Returned
                </a>
              )}

            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

BorrowedBooks.PropTypes = {
  handleBorrow: PropTypes.func.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default BorrowedBooks;
