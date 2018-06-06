import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ipcRenderer } from 'electron'
import autobind from 'autobind-decorator'
import Quill from 'quill'
import hljs from 'highlightjs'
import deltaToHtml from 'delta-to-html'
import 'quill/dist/quill.snow.css'
import '../../../../css/quill-content.css'

let quillInstance;

class QuillEditor extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      value: props.value
    }
  }

  componentWillMount() {
    ipcRenderer.on("finish-add-file", this.handleFinishUploadFile)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("finish-add-file", this.handleFinishUploadFile)
  }

	shouldComponentUpdate(nextProps, nextState) {
		return false
	}

	@autobind
  handleFinishUploadFile(e, fileUrl) {
		console.log("finishUploadFile", fileUrl)
    let range = quillInstance.getSelection()
    quillInstance.insertEmbed(range.index, 'image', fileUrl)
	}

  componentDidMount() {
    const { container, fileInput } = this.refs
    const { value } = this.state

    let options = {
			placeholder: '글을 작성하세요...',
	    modules: {
				syntax: {
					highlight: (text) => hljs.highlightAuto(text).value
				},
				toolbar: {
					container: [
			      [{ header: [2, 3, false] }],
						['bold', 'italic', 'code'],
						[{ list: 'ordered'}, { list: 'bullet' }],
						[ 'blockquote', 'code-block', 'link', 'image'],
						['clean']
			    ],
					handlers: {
						image: () => {
		          fileInput.click();
						}
					}
				}
			},
			scrollingContainer: '#quill-scrolling-container',
	    theme: 'snow'
    }

    quillInstance = new Quill(container, options)
  }

  getContent() {
    return deltaToHtml(quillInstance.getContents())
  }

  updateContent(value) {
    if (quillInstance) {
      quillInstance.setText(value)
    }
  }

  render() {
		const { onImageHandler } = this.props
    const { value } = this.state

    return (
      <div className="Quill">
        <div ref="container" id="quill-scrolling-container" className="content" dangerouslySetInnerHTML={{__html:value}} />
				<input ref="fileInput" type="file" accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml" className="ql-image" style={{display:'none'}}
					onChange={(e) => {
						let input = e.target
						let files = []
						for (let i = 0; i < input.files.length ; i++) {
							files.push(input.files.item(i))
						}
						onImageHandler(files)
					}}
				/>
      </div>
    )
  }
}

QuillEditor.propTypes = {
  value: PropTypes.string.isRequired,
	onImageHandler: PropTypes.func.isRequired
}

export default QuillEditor
