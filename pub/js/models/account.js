const AccountModel = Backbone.Model.extend({
	idAttribute: '_id',
	getId () {
		return this.get('_id')
	},
	getName () {
		return this.get('name')
	},
})