var badger = require('readme-badger');

var readme = '# My Lovely Library\n' +
    '\n' +
    '## Features\n';
var imageUrl = 'https://badges.gitter.im/Join%20Chat.svg';
var linkUrl = 'https://gitter.im/mbret/redh00d';
var altText = 'Join the general chat at https://gitter.im/mbret/redh00d';

var readmeWithBadge = badger.addBadge(readme, 'md', imageUrl, linkUrl, altText);

console.log(readmeWithBadge);