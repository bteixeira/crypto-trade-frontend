const SelectCurrenciesView = Backbone.View.extend({
	initialize () {
		this.listenTo(this.collection, 'sync change', this.render)
		this.$el.on('change', () => {
			filters.currency = this.$el.val()
			transactionsView.render()
		})
		this.render()
	},
	render () {
		this.collection.forEach(currency => {
			this.$el.append(`<option value="${currency.getSymbol()}">${currency.getSymbol()}</option>`)
		})
	}
})