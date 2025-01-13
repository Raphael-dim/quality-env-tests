import Tchat from './tchat.class';

import './index.scss';

const bots = [{
  id: 'bot1',
  name: 'Spiderman',
  avatar: 'https://media.wired.com/photos/59271340ac01987bf0138709/1:1/w_200,h_200,c_limit/SpiderMan.jpg',
  actions: [{
    name: 'hello',
    words: ['hello', 'bonjour'],
    response: () => 'hello user !'
  }, {
    name: 'hello2',
    words: ['hello', 'bonjour'],
    response: () => 'hello toto !'
  }, {
    name: 'time',
    words: ['time', 'heure'],
    response: () => new Date().toISOString()
  }]
}, {
  id: 'bot2',
  name: 'Wonder Woman',
  avatar: 'https://avatarfiles.alphacoders.com/249/thumb-249760.jpg',
  actions: [{
    name: 'time',
    words: ['time', 'heure'],
    response: () => new Date().toISOString()
  }, {
    name: 'radom',
    words: ['random'],
    response: () => Math.random() * 30
  }]
}];

const tchat = new Tchat(bots);
tchat.run();
