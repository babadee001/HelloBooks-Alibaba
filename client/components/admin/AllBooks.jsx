import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Materialize from 'materialize-css';
import { bindActionCreators } from 'redux';
import { editBook, getCategoryAction, deleteBookAction } from '../../actions/BooksActions';

/**
 * AllBooks component
 * 
 * @export { Object }
 * 
 * @class AllBooks
 * 
 * @extends {Component}
 */
export class AllBooks extends Component {

  /**
	 * @description - Creates an instance of AllBooks.
	 * 
	 * @param {Object} props - component properties
	 * 
	 * @memberOf AllBooks
	 */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      catId: this.props.catId,
      description: this.props.description,
      isbn: this.props.isbn,
      author: this.props.author,
      quantity: this.props.quantity,
      currentBook: {},
      edit: false,
      cover: this.props.cover,
      displayBook: true
    };
    this.renderCategory = this.renderCategory.bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleFormSubmit = this
      .handleFormSubmit
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.onClick = this
      .onClick
      .bind(this);
    this.changeView = this
      .changeView
      .bind(this);
  }

  /**
	 * 
	 * @description - Sets user input in component local sttae
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf AllBooks
	 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onClick() {
    this.setState({ displayBook: false, edit: true });
  }
 /**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AllBooks
	 */
	componentDidMount() {
		this.props.actions.getCategoryAction();
	}
    /**
	 * 
	 * @description - Displays the list of category
	 * 
	 * @returns {Array} - Array of category
	 * 
	 * @memberOf AllBooks
	 */
	renderCategory() {
		let allCategory = [];
		const category = this.props.category;
		if (!category || category.length < 1) {
			return 'None Available';
		}
		category.map((cat) => {
			allCategory.push(
				<option key={cat.id} value={cat.id}>
					{cat.name}
				</option>
			);
		});
		return allCategory;
	}

  /**
	 * 
	 * @description - Handles the delete book action
	 * 
	 * @memberOf AllBooks
	 */
  handleClick() {
    swal({ title: 'Are you sure?',
      text: 'This is permanent!',
      icon: 'warning',
      buttons: true,
      dangerMode: true })
      .then((del) => {
        if (del) {
          this.props.actions.deleteBookAction(this.props.id)
        } else {
          swal('Book was not deleted');
        }
      });
  }

  /**
	 *
	 * @description - Toggles the application display
	 * 
	 * @memberOf AllBooks
	 */
  changeView() {
    this.setState({ displayBook: true, edit: false });
  }

  /**
	 * 
	 * @description - Submits the form data
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf AllBooks
	 */
  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({ cover: this.props.cover });
    this.props.actions.editBook(this.state, this.props.id)
      .then((res) => {
        Materialize.toast(res, 1000, 'teal', () => {
        this.setState({ displayBook: true, edit: false });
      });
    });
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf AllBooks
	 */
  render() {
    return (
      <div className="col s12 m3 l3">
        {this.state.edit && <div className="">
          <h4>
           Edit Book</h4>
          <div className="row">
            <form name="edit_book" className="col s12" onSubmit={ this.handleFormSubmit }>
              <div className="">
                <div className="row">
                  <div className="col s12">
                    <b>Title</b>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      onChange={ this.onChange }
                      defaultValue={ this.state.title }
                      className="validate"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <b>Author</b>
                    <input
                      id="author"
                      type="text"
                      name="author"
                      className="validate"
                      onChange={ this.onChange }
                      defaultValue={ this.state.author }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6">
                    <b>Quantity</b>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      className="validate"
                      onChange={ this.onChange }
                      defaultValue={ this.state.quantity }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <b>ISBN</b>
                    <input
                      id="isbn"
                      name="isbn"
                      type="text"
                      onChange={ this.onChange }
                      defaultValue={ this.state.isbn }
                      className="validate"
                      required
                    />
                  </div>
                  <div className="col s12">
                  <select
                    id="catId"
                    name="catId"
                    onChange={ this.onChange }
                    className="browser-default"
                  >
                    <option value="">Select Category</option>
										{this.renderCategory()}
                  </select>
                </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <b>Description</b>
                    <textarea
                      id="description"
                      className="materialize-textarea"
                      name="description"
                      onChange={ this.onChange }
                      defaultValue={ this.state.description }
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                name="submit"
              >Edit Book
              </button>
              <div>
                <button
                  onClick={ this.changeView }
                  id="edit_button"
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
        }

        {this.state.displayBook && <div className="card" id="book_card">
          <div className="card-image">
            <img id="cover" src={ this.props.cover } alt="loading cover..." />
            <span className="card-title">{this.props.title}</span>
          </div>
          <div className="card-content">
            <p>{this.props.description}</p>
          </div>
          <div className="card-action">
            <button id="delete_button" className="btn-danger" onClick={ this.handleClick } >Delete</button>
            <button className="btn-primary" onClick={ this.onClick } id="edit_button">Edit</button>
          </div>
        </div>}
      </div>
    );
  }
}

AllBooks.propTypes = {
  author: React.PropTypes.string,
  cover: React.PropTypes.string,
  description: React.PropTypes.string,
  id: React.PropTypes.number,
  isbn: React.PropTypes.string,
  quantity: React.PropTypes.string,
  title: React.PropTypes.string
};

/**
 * 
 * @description - Maps the dispatch to component props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editBook,
      deleteBookAction,
      getCategoryAction
    }, dispatch)
  };
}

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
export function mapStateToProps(state) {
	return { 
		category: state.books.category
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
