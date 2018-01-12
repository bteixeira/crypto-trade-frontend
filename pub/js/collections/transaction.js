const TransactionCollection = Backbone.Collection.extend({
	comparator: 'timestamp',
	model: TransactionModel,
	url: 'https://crypto1-2c1f.restdb.io/rest/transactions',
})
