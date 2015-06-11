var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var Art = mongoose.model('Art');
var q = require('q');
var chalk = require('chalk');

var getCurrentArtData = function(){
	return q.ninvoke(Art, 'find', {});
};


var seedArt = function(){
	var arts = [
		{
			name: 'SkullBear', 
			user: "5579a6577b93c0151efc21ae",
			category: '5579a83ad215a81f1e9f03a3',//select id from pre seeded data, Mixed Media
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
			user: "5579a6577b93c0151efc21ae",
			category: '5579a83ad215a81f1e9f03a3',//select id from pre seeded data, Mixed Media
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
			user: "5579a6577b93c0151efc21ae",
			category: '5579a83ad215a81f1e9f03a3',//select id from pre seeded data, Mixed Media
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
			user: "5579a6577b93c0151efc21af",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data,
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
			user: "5579a6577b93c0151efc21af",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data,
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
			user: "5579a6577b93c0151efc21b0",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data,
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
			user: "5579a6577b93c0151efc21ad",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data, Painting -> Abstract
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
			user: "5579a6577b93c0151efc21b1",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data, Painting -> Abstract
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
			user: "5579a6577b93c0151efc21b1",
			category: '5579a83ad215a81f1e9f039e',//select id from pre seeded data,
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
			user: "5579a6577b93c0151efc21b3",
			category: '5579a6577b93c0151efc21b1',//select id from pre seeded data,
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
			user: "5579a6577b93c0151efc21b4",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data,
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
			user: "5579a6577b93c0151efc21b4",
			category: '5579a83ad215a81f1e9f039b',//select id from pre seeded data,
			artist_name: 'Ricardo Cabret',
			price: 450,
			description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
			url:'http://i.imgur.com/eKl1Bwc.jpg',
			quantity: 1,
			height: 36,
			width: 24,
			tags: ['acrylic', 'greyscale']
		},
		{
			name: 'Humans of New York', 
			user: "5579a6577b93c0151efc21b2",
			category: '5579a83ad215a81f1e9f03a5',//select id from pre seeded data, Photography
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
			user: "5579a6577b93c0151efc21b2",
			category: '5579a83ad215a81f1e9f039f',//select id from pre seeded data, Sculpture -> Stone
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
			user: "5579a6577b93c0151efc21b2",
			category: '5579a83ad215a81f1e9f03a5',//select id from pre seeded data, Photography -> Black & White
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
			user: "5579a6577b93c0151efc21b4",
			category: '5579a83ad215a81f1e9f03a8',//select id from pre seeded data, Illustration -> Print
			artist_name: 'LoopyLolly',
			price: 450,
			description: 'Original hand-printed artwork that\'s just a little bit, well… loopy. Printed on fine art paper and using high quality ink, LoopyLolly prints feature the illustrations of Kelly Stevens-McLaughlan, an established artist living by the sea on the south coast of England.',
			quantity: 10, // new Specs({height: 14, width: 11, quantity: })
			height: 14,
			width: 11,
			tags: ['illustration', 'animal']
		}
	];
	return q.invoke(Art, 'create', arts);

};

connectToDb.then(function () {
    getCurrentArtData().then(function (art) {
        if (art.length === 0) {
            return seedArt();
        } else {
            console.log(chalk.magenta('Seems to already be art data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

