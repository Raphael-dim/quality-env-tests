import Bot from '../src/bot.class';

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

const spiderMan = new Bot(bots[0]);

describe('Bot.class', () => {
  it('Should have a responses with my keword hello', () => {
    const responses = JSON.stringify(spiderMan.findActionByKeyWord('hello'));
    const toBe = JSON.stringify(['hello user !', 'hello toto !']);

    expect(responses).toBe(toBe);
  });
  it('Should have a response with an empty keword', () => {
    const responses = JSON.stringify(spiderMan.findActionByKeyWord(''));
    const toBe = JSON.stringify([]);

    expect(responses).toBe(toBe);
  });
  it('Should have a response with an boolean value', () => {
    const responses = JSON.stringify(spiderMan.findActionByKeyWord(true));
    const toBe = JSON.stringify([]);

    expect(responses).toBe(toBe);
  });
});
