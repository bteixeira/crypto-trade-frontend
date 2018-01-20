const Overlay = (function () {
	const $el = $('#overlay')
	$el.find('.background').on('click', () => {
		Overlay.hide()
	})
	$el.find('.js-save').on('click', () => {
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
			$el.find('form [name]').each((i, field) => {
				field.value = transaction.getFieldValue(field.name)
			})
		},
	}
	return Overlay
}())
