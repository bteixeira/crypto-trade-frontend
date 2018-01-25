const SelectCurrenciesView = Backbone.View.extend({
	initialize () {
		this.listenTo(this.collection, 'sync change', this.render)
		this.render()
	},
	render () {
		this.$el.empty()
		this.$el.append(`<option value>-</option>`)
		this.collection.forEach(currency => {
			this.$el.append(`<option value="${currency.getSymbol()}">${currency.getSymbol()}</option>`)
		})
	}
})