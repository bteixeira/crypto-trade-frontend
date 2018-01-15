const CurrencyCollection = Backbone.Collection.extend({
	model: CurrencyModel,
	url: 'https://crypto1-2c1f.restdb.io/rest/currencies',
})