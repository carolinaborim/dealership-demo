(function(){
	var cartProto = {
		items: [],
		addItem: function addItem(item) {
			this.items.push(item);
		}
	},
	createCart =  function(items) {
		 var cart = Object.create(cartProto);
		 cart.items = items;
		 return cart;
	},
	savedCart = createCart(['apple', 'pear', 'orange']),
	session = {
		get: function get() {
			return this.cart;
		},
		cart: createCart(savedCart.items)
	};
	session.cart.addItem('grapefruit');
	session.cart.addItem('grapefruit2');
	console.log(savedCart.items);
	console.log(session.cart.items);
	console.log(session.cart.items.indexOf('apple'));
	console.log(session.cart.items.indexOf('grapefruit'));
})();