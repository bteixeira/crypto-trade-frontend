const CurrencyModel = Backbone.Model.extend({
	getSymbol () {
		return this.get('symbol')
	},
})