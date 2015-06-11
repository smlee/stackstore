// seed this first
var categories = [
	{
		name: 'Painting'
	},
	{
		parent: new Category({name: 'Painting'}),
		name: 'Landscape'
	},
	{
		parent: new Category({name: 'Painting'}),
		name: 'Abstract'
	},
	{
		name: 'Watercolor'
	},
	{
		name: 'Sculpture'
	},
	{
		parent: new Category({name: 'Sculpture'}),
		name: 'Stone'
	},
	{
		name: 'Print'
	},
	{
		parent: new Category({name: 'Print'}),
		name: 'Photoshop'
	},
	{
		name: 'Mixed Media'
	},
	{
		parent: new Category({name: 'Mixed Media'}),
		name: 'Marker on Wood'
	},
	{
		name: 'Photography'
	},
	{
		parent: new Category({name: 'Photography'}),
		name: 'Panorama'
	},
	{
		parent: new Category({name: 'Photography'}),
		name: 'Black and White'
	},
	{
		name: 'Illustration'
	},
	{
		parent: new Category({name: 'Illustration'}),
		name: 'Cover'
	},
];

var arts = [
	{
		name: 'SkullBear', 
		user: new User({}),
		category: //select id from pre seeded data, Mixed Media
		artist_name: 'Jack Poohvis',
		url: 'http://i.imgur.com/DuBVrjW.jpg',
		price: 450,
		description: 'A geometric representation of a bear using yellow marker on black paper',
		quantity: 1,
		height: 20,
		width: 25,
		tags: ['marker', 'paper', 'geometry', 'modern']
	},
	{
		name: 'TigerSnake', 
		user: new User({}),
		category: //select id from pre seeded data, Mixed Media
		artist_name: 'Jack Poohvis',
		url: 'http://i.imgur.com/xt0lAEv.jpg',
		price: 650,
		description: 'A geometric representation of a tiger using black marker on white paper',
		quantity: 1,
		height: 18,
		width: 24,
		tags: ['marker', 'paper', 'geometry', 'modern']
	},
	{
		name: 'Owl Eyes Mandal', 
		user: new User({}),
		category: //select id from pre seeded data, Mixed Media
		artist_name: 'Jack Poohvis',
		url: 'http://i.imgur.com/yM6VuA7.jpg',
		price: 550,
		description: 'A geometric representation of an owl using black marker on white paper',
		quantity: 1,
		height: 18,
		width: 24,
		tags: ['marker', 'paper', 'geometry', 'modern']
	},
	{
		name: 'Electrified Hair', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Billy Joe Michel',
		url: 'http://i.imgur.com/92vbEGK.jpg',
		price: 450,
		description: 'A watercolor piece symbolizing what it\'s like to live with frizzy ass hair',
		quantity: 1,
		height: 39,
		width: 35,
		tags: ['watercolor', 'modern']
	},
	{
		name: 'Melting Piano', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Billy Joe Michel',
		price: 450,
		description: 'Two hands play a piano as the black and white keys melt together to form a strong bond between two opposites.',
		url: 'http://i.imgur.com/PjbEvwU.jpg',
		quantity: 1,
		height: 39,
		width: 35,
		tags: ['watercolor', 'modern']
	},
	{
		name: 'Puppet Show', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Billy Joe Michel',
		price: 450,
		description: 'A satirical piece showing how women control men like a puppet.',
		url: 'http://i.imgur.com/hDO6z3u.jpg',
		quantity: 1,
		height: 39,
		width: 35,
		tags: ['watercolor', 'modern']
	},
	{
		name: 'Failed Iterations', 
		user: new User({}),
		category: //select id from pre seeded data, Painting -> Abstract
		artist_name: 'Ricardo Cabret',
		price: 450,
		description: 'A diamond, on top of a black ball with cool lines.  Wonder what it means?',
		url: 'http://i.imgur.com/t4EUs7X.jpg',
		quantity: 1,
		height: 39,
		width: 35,
		tags: ['oil', 'acrylic', 'modernist']
	},
	{
		name: 'Singularity', 
		user: new User({}),
		category: //select id from pre seeded data, Painting -> Abstract
		artist_name: 'Ricardo Cabret',
		price: 450,
		url: 'http://i.imgur.com/eKl1Bwc.jpg',
		description: 'Trippy semi-deoncstructed house',
		quantity: 1,
		height: 39,
		width: 35,
		tags: ['oil', 'acrylic', 'canvas']
	},
	{
		name: 'Maturity', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Ricardo Cabret',
		price: 450,
		description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
		url: 'http://i.imgur.com/8ZtU7mz.jpg',
		quantity: 1,
		height: 39,
		width: 35,
		tags: ['paper', 'coffee', 'food art', 'patterns']
	},
	{
		name: 'Link 2', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Ricardo Cabret',
		price: 450,
		description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
		url: 'http://i.imgur.com/PjbEvwU.jpg',
		quantity: 1,
		height: 45,
		width: 55,
		tags: ['acrylic', 'tripy']
	},
	{
		name: 'House 1', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Ricardo Cabret',
		price: 450,
		description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
		url: 'http://imgur.com/nZQ4kV0',
		quantity: 1,
		height: 60,
		width: 48,
		tags: ['acrylic', 'tripy', 'house']
	},
	{
		name: 'Herschel', 
		user: new User({}),
		category: //select id from pre seeded data,
		artist_name: 'Ricardo Cabret',
		price: 450,
		description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
		url:'http://i.imgur.com/eKl1Bwc.jpg'
		quantity: 1,
		height: 36,
		width: 24,
		tags: ['acrylic', 'greyscale']
	},
	{
		name: 'Humans of New York', 
		user: new User({}),
		category: //select id from pre seeded data, Photography
		artist_name: 'Brandon',
		price: 40,
		description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
		url: 'http://i.imgur.com/84El5Au.jpg',
		quantity: 1,
		height: 45,
		width: 55,
		tags: ['new york', 'street photography']
	},
	{
		name: 'The Pieta', 
		user: new User({}),
		category: //select id from pre seeded data, Sculpture -> Stone
		artist_name: 'Michaelangelo',
		price: 450,
		description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
		url: 'http://i.imgur.com/IclAeDM.jpg',
		quantity: 1,
		height: 45,
		width: 55,
		tags: ['renaissance', 'sculpture', 'italian']
	},
	{
		name: 'Piercing Scale', 
		user: new User({}),
		category: //select id from pre seeded data, Photography -> Black & White
		artist_name: 'Avishek Das',
		price: 450,
		description: 'A believer pierces his face during the Hindu festival of Charak Puja in West Bengal, India. “The rituals of Charak Puja, a way to show the miracle of God, are unique and, at times, a little risky,” writes Avishek Das, who shared this photo on Your Shot. For Das, getting such a shot had its difficulties. “People are in a hurry to complete the exercise soon, and huge mass gatherings are there,” he writes.',
		url: 'http://i.imgur.com/TBuoykx.jpg',
		quantity: 1,
		height: 145,
		width: 65,
		tags: ['photography', 'tribal', 'black and white']
	},
	{
		name: 'Deer Print & Chair', 
		user: new User({}),
		category: //select id from pre seeded data, Illustration -> Print
		artist_name: 'LoopyLolly',
		price: 450,
		description: 'Original hand-printed artwork that\'s just a little bit, well… loopy. Printed on fine art paper and using high quality ink, LoopyLolly prints feature the illustrations of Kelly Stevens-McLaughlan, an established artist living by the sea on the south coast of England.',
		quantity: 10, // new Specs({height: 14, width: 11, quantity: })
		height: 14,
		width: 11,
		tags: ['illustration', 'animal']
	}
]

// seed this first before users
 
 // seed contact first before seeding users
var users = [
	{
		email: 'yae.joanne@gmail.com',
		password: 'joanne',
		contact:, // seed contacts first
		role: 'buyer'
	},
	{
		email: 'rod.trey@gmail.com',
		password: 'trey',
		contact:, // seed contacts first
		role: 'buyer'
	},
	{
		email: 'niss.james@gmail.com',
		password: 'james',
		contact:, // seed contacts first
		role: 'buyer'
	},
	{
		email: 'kim.sang@gmail.com',
		password: 'sang',
		contact:, // seed contacts first
		role: 'artist'
	},
	{
		email: 'jones.bob@gmail.com',
		password: 'bob',
		contact:, // seed contacts first
		role: 'buyer'
	},
	{
		email: 'smart.jane@gmail.com',
		password: 'jane',
		contact:, // seed contacts first
		role: 'buyer'
	},
	{
		email: 'butler.ash@gmail.com',
		password: 'butler',
		contact:, // seed contacts first
		role: 'artist'
	}
]

var orders = [
	{
		all_items: [{art:, quantity:1}, {art:, quantity: 3}],
		user:, // grab from seeded user
		order_type: 'order',
		total: 450,
		paid: false,
		invoice_id: Date.now()
	},
	{
		all_items: [{art:, quantity:1}, {art:, quantity: 3}],
		user:,
		order_type: 'order',
		total: 660,
		paid: true,
		invoice_id: Date.now()+1
	},
	{
		all_items: [{art:, quantity:1}, {art:, quantity: 3}],
		user:,
		order_type: 'gallery',
		total: 35,
		paid: false,
		invoice_id: Date.now()+2
	}
]

var reviews = [
	{
		content: 'AMAZING ART FOR THE WIN!',
		rating: 4,
		art_id: '',
		user_id: ''
	},
	{
		content: 'SUPER AMAZING! LOOKS GREAT IN MY ROOM',
		rating: 5,
		art_id: '',
		user_id: ''
	},
	{
		content: 'Eh, it\'s ok',
		rating: 3,
		art_id: '',
		user_id: ''
	},
	{
		content: 'Such an amazing piece and worth every penny',
		rating: 5,
		art_id: '',
		user_id: ''
	},
]

var events = [
	{
		event_name: 'Jack\'s Show',
		contact_info: //grab from Contact Schema,
		description: 'A showcase of Jack\'s artwork.  Free wine and food.  Come and Enjoy, network, and talk art!',
		user_id:,
		event_date:,
		price: 45
	}
]