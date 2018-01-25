const CurrencyModel = Backbone.Model.extend({
	getId () {
		return this.get('_id')
	},
	getSymbol () {
		return this.get('symbol')
	},
})