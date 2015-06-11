var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var Contact = mongoose.model('Contact');
var Category = mongoose.model('Category');
var q = require('q');
var chalk = require('chalk');

var getCurrentContactData = function () {
	console.log('getCurrentContactData called')
    return q.ninvoke(Contact, 'find', {});
};
var getCurrentCategoryData = function () {
    return q.ninvoke(Category, 'find', {});
};

var seedContacts = function(){
	var contact = [
		{
			contact_type: 'shipping',
			first_name: 'Joanne',
			last_name: 'Yae',
			phone_number: '8452705776',
			address_line_1: '66 N. Conger Ave',
			city: 'Congers',
			state: 'NY',
			zip: '10920'
		},
		{
			contact_type: 'billing',
			first_name: 'Trey',
			last_name: 'Rodrigues',
			phone_number: '123456789',
			address_line_1: '123 45th St.',
			city: 'Queens',
			state: 'NY',
			zip: '19284'
		},
		{
			contact_type: 'home',
			first_name: 'James',
			last_name: 'Nissenbaum',
			phone_number: '123456789',
			address_line_1: '34 Douglas Ave',
			city: 'Newark',
			state: 'NJ',
			zip: '33495'
		},
		{
			contact_type: 'event',
			first_name: 'Sang',
			last_name: 'Lee',
			phone_number: '123456789',
			address_line_1: '34 Hoot Ave.',
			city: 'Flushing',
			state: 'NY',
			zip: '34245'
		},
		{
			contact_type: 'event',
			first_name: 'Bob',
			last_name: 'Jones',
			phone_number: '123456789',
			address_line_1: '43 Sleepy Rd.',
			city: 'Yonkers',
			state: 'NY',
			zip: '12345'
		},
		{
			contact_type: 'shipping',
			first_name: 'Jane',
			last_name: 'Smart',
			phone_number: '123456789',
			address_line_1: '45 Willow St.',
			city: 'Brooklyn',
			state: 'NY',
			zip: '10001'
		},
		{
			contact_type: 'billing',
			first_name: 'Ashley',
			last_name: 'Butler',
			phone_number: '123456789',
			address_line_1: '99 Jack Ave.',
			city: 'Brooklyn',
			state: 'NY',
			zip: '00342'
		}
	];
	return q.invoke(Contact, 'create', contact);
};

var seedCategories = function(){
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
		}
	];
	return q.invoke(Category, 'create', categories);
};

connectToDb.then(function () {
	console.log('first step!');
    getCurrentContactData().then(function (contact) {
    	console.log('inside step two')
        if (contact.length === 0) {
            return seedContacts();
        } else {
            console.log(chalk.magenta('Seems to already be contact data, exiting!'));
            return;
        }
    }).then(function () {
    	getCurrentCategoryData().then(function (category){
    		if(category.length === 0){
    			return seedCategories();
    		} else {
    			console.log(chalk.magenta('Seems to already be category data, exiting!'));
    			process.kill(0);
    		}
    	}).then(function(){
        	console.log(chalk.green('Seed successful!'));
        	process.kill(0);
    	}).catch(function (err) {
        	console.error(err);
        	process.kill(1);
    	});
    })
});
