import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as ContentMode from '../constants/ContentMode'
import ContentViewer from './ContentViewer'
import Editor from './Editor'

class Content extends Component {

	render() {
		const { post, onRequestEditPost } = this.props

		if (!post) {
			return (
				<div className="content_wrap">
					<div className="content_empty_message">Editor for Tistory</div>
				</div>
			)
		} else {
			return <ContentViewer onRequestEditPost={onRequestEditPost} />
		}
	}
}

Content.propTypes = {
	post: PropTypes.object,
	onRequestEditPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
		post: state.currentPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Content)
