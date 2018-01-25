const SelectAccountsView = Backbone.View.extend({
	initialize () {
		this.listenTo(this.collection, 'sync change', this.render)
		this.render()
	},
	render () {
		this.$el.empty()
		this.$el.append(`<option value>-</option>`)
		this.collection.forEach(account => {
			this.$el.append(`<option value="${account.getId()}">${account.getName()}</option>`)
		})
	}
})