const AccountCollection = Backbone.Collection.extend({
	model: AccountModel,
	url: 'https://crypto1-2c1f.restdb.io/rest/accounts',
})