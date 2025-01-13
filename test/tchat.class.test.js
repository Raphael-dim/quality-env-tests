import Tchat from '../src/tchat.class';

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

describe('Tchat.class', () => {
  it('Should create an instance of Class', () => {
    expect(tchat.constructor.name).toBe('Tchat');
  });
  it('Should create an instance of Class', () => {
    const renderTypingMessage = `
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="ecrivez votre message">
        <button class="btn btn-outline-primary" type="button">Send</button>
      </div>
    `;
    expect(tchat.renderTypingMessage()).toBe(renderTypingMessage);
  });
  it('Should render a sended html message', () => {
    tchat.user = {
      id: '1',
      name: 'Yannick',
      avatar: 'yannick_avatar.png'
    };
    const messageSended = 'Bonjour';
    const renderMessageSended = `
      <div class="row mb-2">
        <div class="col-6">
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <img
                width="40"
                src="${tchat.user.avatar}"
                class="border border-dark rounded-circle"
                alt="bot"
              >
              ${tchat.user.name}
            </div>
            <div class="card-body">
              <p class="card-text">${messageSended}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Vérifiez que le texte de la div est correct
    expect(tchat.renderMessageSended(messageSended)).toBe(renderMessageSended);
  });
  it('Should render a received html message', () => {
    tchat.user = {
      id: '1',
      name: 'Yannick',
      avatar: 'yannick_avatar.png'
    };
    const messageReceived = {
      text: 'Bonjour',
      avatar: tchat.user.avatar,
      name: tchat.user.name
    };

    const renderMessageReceived = `
      <div class="row mb-2">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <img
                width="40"
                src="${messageReceived.avatar}"
                class="border border-dark rounded-circle"
                alt="bot"
              >
              ${messageReceived.name}
            </div>
            <div class="card-body">
              <p class="card-text">${messageReceived.text}</p>
            </div>
          </div>
        </div>
        <div class="col-6"></div>
      </div>
    `;

    // Vérifiez que le texte de la div est correct
    expect(tchat.renderMessageReceived(messageReceived)).toBe(renderMessageReceived);
  });
  it('Should render message from chatbot from keywords', () => {
    expect(tchat.botsMessages('heure')).toHaveLength(2);
  });
  it('Should send a message when key Enter is click', () => {
    document.body.innerHTML = `
      <div class="messages"></div>
      <input type="text" />
      <div>
        <ul>
          <li id="bot1"><span></span></li>
          <li id="bot2"><span></span></li>
        </ul>
      </div>
    `;

    const elMessages = document.querySelector('.messages');
    const elInput = document.querySelector('input');

    tchat.onClickSendMessage();

    elInput.value = 'hello';
    const event = new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13 });
    elInput.dispatchEvent(event);

    expect(elMessages.innerHTML).toContain('<p class="card-text">hello</p>');
    expect(elMessages.innerHTML).toContain('<p class="card-text">hello user !</p>');
    expect(elMessages.innerHTML).toContain('<p class="card-text">hello toto !</p>');
    expect(elInput.value).toBe('');
  });
  it('Should not send a message when other key than Enter is click', () => {
    document.body.innerHTML = `
      <div class="messages"></div>
      <input type="text" />
      <div>
        <ul>
          <li id="bot1"><span></span></li>
          <li id="bot2"><span></span></li>
        </ul>
      </div>
    `;

    const elMessages = document.querySelector('.messages');
    const elInput = document.querySelector('input');

    tchat.onClickSendMessage();

    elInput.value = 'hello';
    const event = new KeyboardEvent('keyup', { key: 'a', keyCode: 65 });
    elInput.dispatchEvent(event);

    expect(elMessages.innerHTML).toBe('');
    expect(elInput.value).toBe('hello');
  });
});