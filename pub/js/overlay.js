const Overlay = (function () {
	const $el = $('#overlay')
	const $fields = $el.find('form [name]')
	$el.find('.background').on('click', () => {
		Overlay.hide()
	})
	$el.find('.js-save').on('click', () => {
		$fields.each((i, field) => {
			model.setField(field.name, field.value)
		})
		transactions.add(model)
		model.save()
		Overlay.hide()
	})
	var model
	const Overlay = {
		show () {
			$el.toggleClass('-show', true)
		},
		hide () {
			$el.toggleClass('-show', false)
			model = null
		},
		setTransaction (transaction) {
			model = transaction
			$fields.each((i, field) => {
				$(field).val(transaction.getFieldValue(field.name))
			})
		},
	}
	return Overlay
}())
