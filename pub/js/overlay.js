const Overlay = (function () {
	const $el = $('#overlay')
	$el.find('.background').on('click', () => {
		Overlay.hide()
	})
	const Overlay = {
		show () {
			$el.toggleClass('-show', true)
		},
		hide () {
			$el.toggleClass('-show', false)
		},
		clear () {

		},
		setTransaction (transaction) {

		},
	}
	return Overlay
}())
