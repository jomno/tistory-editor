import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Dialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ChipInput from 'material-ui-chip-input'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Toggle from 'material-ui/Toggle'

class EditorInfoDialog extends Component {

	@autobind
	handleChangeDate(e, changedDate) {
		const { onDateChange, date } = this.props
		let selectedDate = new Date(changedDate)
		selectedDate.setHours(date.getHours())
		selectedDate.setMinutes(date.getMinutes())
		selectedDate.setSeconds(0)

		console.log(selectedDate, changedDate)
		onDateChange(selectedDate)
	}

	@autobind
	handleChangeTime(e, changedTime) {
		const { onDateChange, date } = this.props
		let selectedDate = new Date(changedTime)
		selectedDate.setFullYear(date.getFullYear())
		selectedDate.getMonth(date.getMonth())
		selectedDate.getDay(date.getDay())
		selectedDate.setSeconds(0)

		console.log(selectedDate, changedTime)
		onDateChange(selectedDate)
	}

	@autobind
	handleToggleUseDate(e, checked) {
		const { onDateChange } = this.props
		onDateChange(checked? new Date() : null)
	}

  render() {
    const { onRequestClose, onRequestSave, onRequestPublish, onTagsChange, onCategoryChange, categories, category, tags, date, open } = this.props

		let selectedCategory = category? category : "0"

    let publishDialogActions = [
			<FlatButton label="취소" primary={true} onTouchTap={onRequestClose} />,
			<FlatButton label="저장" primary={true} onTouchTap={onRequestSave} />,
			<FlatButton label="발행" primary={true} keyboardFocused={true} onTouchTap={onRequestPublish} />
		]

    return (
      <Dialog title="글의 속성을 확인해주세요." modal={false} open={open} actions={publishDialogActions}
        onRequestClose={onRequestClose}>

        <SelectField id="category" floatingLabelText="카테고리" value={selectedCategory} autoWidth={true} onChange={onCategoryChange}>
          <MenuItem value="0" primaryText="분류없음" />
          {categories.map((item, i) =>
            <MenuItem key={i} value={item.id} primaryText={item.label} />
          )}
        </SelectField>
				
				<br />
				
				<ChipInput id="tag" floatingLabelText="태그" hintText="Tag" newChipKeyCodes={[13, 188]} defaultValue={tags} onChange={onTagsChange} />

				<Toggle label="발행시간 지정" defaultToggled={date !== null} style={{ width:'256px',marginTop:'14px' }} onToggle={this.handleToggleUseDate} />
				{ date && [
					<DatePicker key="date" id="publish_date" defaultDate={date} onChange={this.handleChangeDate} />,
					<TimePicker key="time" id="publish_time" defaultTime={date} onChange={this.handleChangeTime} />
				]}

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
