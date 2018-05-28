import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ChipInput from 'material-ui-chip-input'
import FlatButton from 'material-ui/FlatButton'

class EditorInfoDialog extends Component {
  render() {
    const { onRequestClose, onRequestSave, onRequestPublish, onTagsChange, onCategoryChange, categories, category, tags, open } = this.props

    let publishDialogActions = [
			<FlatButton label="취소" primary={true} onClick={onRequestClose} />,
			<FlatButton label="저장" primary={true} onClick={onRequestSave} />,
			<FlatButton label="발행" primary={true} keyboardFocused={true} onClick={onRequestPublish} />
		]

    return (
      <Dialog title="글의 속성을 확인해주세요." modal={false} open={open} actions={publishDialogActions}
        onRequestClose={onRequestClose}>

        <ChipInput floatingLabelText="태그" hintText="Tag" newChipKeyCodes={[13, 188]} defaultValue={tags} onChange={onTagsChange} />

        <br />

        <SelectField floatingLabelText="카테고리" value={category} autoWidth={true} onChange={onCategoryChange}>
          <MenuItem value="0" primaryText="분류없음" />
          {categories.map((item, i) =>
            <MenuItem key={i} value={item.id} primaryText={item.label} />
          )}
        </SelectField>
      </Dialog>
    )
  }
}

EditorInfoDialog.PropTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onRequestSave: PropTypes.func.isRequired,
  onRequestPublish: PropTypes.func.isRequired,
  onTagsChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,

  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
}

export default EditorInfoDialog
