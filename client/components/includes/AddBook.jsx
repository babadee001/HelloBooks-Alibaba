import React, { Component } from 'react';
import firebase from 'firebase';
import Materialize from 'materialize-css';
import { browserHistory } from 'react-router';
import ImageUploader from 'react-firebase-image-uploader';
import swal from 'sweetalert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCategoryAction } from '../../actions/BooksActions';

/**
 * @description - Add book component
 * 
 * @export
 * 
 * @class AddBook
 * 
 * @extends {Component}
 */
export class AddBook extends Component {

  /**
	 * @description - Creates an instance of AddBook.
	 * 
	 * @param {Object} props - Componnet props data
	 * 
	 * @memberOf AddBook
	 */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isbn: '',
      description: '',
      cover: '',
      author: '',
      quantity: 5,
      catId: '',
      isLoading: false,
      isUploading: '',
      progress: 0
    };
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.handleUploadSuccess = this
      .handleUploadSuccess
      .bind(this);
    this.handleProgress = this
      .handleProgress
      .bind(this);
    this.handleUploadStart = this
      .handleUploadStart
      .bind(this);
    this.handleUploadError = this
      .handleUploadError
      .bind(this);
  }

  /**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AddBook
	 */
	componentDidMount() {
		this.props.actions.getCategoryAction();
	}

  /**
	 * @description - Executes when text is typed in input box
	 * 
	 * @param {Object} event - Object
	 * 
	 * @memberOf AddBook
	 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
 
  /**
	 * 
	 * @description - Tracks progress of book upload
	 * 
	 * @param {Object} progress 
	 * 
	 * @memberOf AddBook
	 */
  handleProgress(progress) {
    this.setState({ progress });
  }

  /**
	 * @description - Starts the book cover upload
	 * 
	 * @memberOf AddBook
	 */
  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0 });
  }

  /**
	 * @description - Submit user input
	 * 
	 * @param {Object} event - Submits the form
	 * 
	 * @returns 
	 * 
	 * @memberOf AddBook
	 */
  handleSubmit(event) {
    event.preventDefault();
    this
      .props
      .add(this.state)
  }

  /**
	 * 
	 * @description - Displays error if any during file upload
	 * 
	 * @param {Object} error when book upload fails
	 * 
	 * @memberOf AddBook
	 */
  handleUploadError(error) {
    this.setState({ isUploading: false });
    swal(error);}
  
  /**
	 * 
	 * @description - Completes the file upload and set the state to cover url
	 * 
	 * @param {String} filename - Link to uploaded file
	 * 
	 * @memberOf AddBook
	 */
  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ cover: url, progress: 100 });
      });
  }

  /**
	 * 
	 * @description - Displays the list of category
	 * 
	 * @returns {Array} - Array of category
	 * 
	 * @memberOf AddBook
	 */
	renderCategory() {
		let allCategory = [];
		const category = this.props.category;
		if (!category || category.length < 1) {
			return '...loading';
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
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf AddBook
	 */
  render() {
    return (
      <div className="addbook">
        <div className="row">
          <form name="add_book" className="col s12" onSubmit={ this.handleSubmit }>
            <div className="add-book">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="title"
                    type="text"
                    name="title"
                    className="validate"
                    onChange={ this.onChange }
                    required
                  />
                  <label htmlFor="title">Title</label>
                  <div className="red-text">{ this.state.titleError }</div>
                </div>
                <div className="input-field col s6">
                  <input
                    id="author"
                    type="text"
                    name="author"
                    className="validate"
                    onChange={ this.onChange }
                    required
                  />
                  <label htmlFor="author">Author</label>
                  <div className="red-text">{ this.state.authorError }</div>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    className="validate"
                    defaultValue="1"
                    onChange={ this.onChange }
                    required
                  />
                  <label htmlFor="quantity">Quantity</label>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
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
                <div className="input-field col s6">
                  <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    className="validate"
                    onChange={ this.onChange }
                    required
                  />
                  <label htmlFor="isbn">ISBN</label>
                  <div className="red-text">{ this.state.isbnError }</div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    className="materialize-textarea"
                    name="description"
                    onChange={ this.onChange }
                  />
                  <label htmlFor="description">Description</label>
                  <div className="red-text">{ this.state.descError }</div>
                </div>
              </div>
              <span>Upload Cover</span><br /><br />
              { this.state.isUploading &&
                this.state.progress < 100 &&
                <div> <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div><div className="gap-patch">
                      <div className="circle" />
                    </div><div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>
                </div> <br /><br /> </div> }
              { this.state.progress === 100 &&
                <div>
                  <img
                    className="checkmark"
                    alt="check mark"
                    src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-128.png"
                  /><br /></div> }
              <ImageUploader
                name="cover"
                storageRef={ firebase
                  .storage()
                  .ref('images') }
                onProgress={ this.handleProgress }
                onUploadSuccess={ this.handleUploadSuccess }
                onUploadStart={ this.handleUploadStart }
              />
            </div>
            <button
              id="addbook"
              className="btn waves-effect waves-light"
              type="submit"
              name="submit"
              disabled={ this.state.isLoading }
            >Add Book
            </button>
          </form>
        </div>
      </div>
    );
  }
}
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
		actions: bindActionCreators(
			{
				getCategoryAction,
			},
			dispatch
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
