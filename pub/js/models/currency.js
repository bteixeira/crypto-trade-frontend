const CurrencyModel = Backbone.Model.extend({
	idAttribute: '_id',
	getId () {
		return this.get('_id')
	},
	getSymbol () {
		return this.get('symbol')
	},
})