import Bot from './bot.class';

const Tchat = class {
  constructor(bots) {
    this.user = {
      id: '63a46b9f7d9a54e66721738c',
      name: 'Cyril',
      avatar: 'https://media.licdn.com/dms/image/C5603AQFB2qvfRVtynQ/profile-displayphoto-shrink_800_800/0/1540912243495?e=2147483647&v=beta&t=QyfyPNp25FzUxL7okO5zlIlqAXJWf8GADHsZp0ByPGI'
    };
    this.bots = bots.map((bot) => new Bot(bot));
    this.el = document.querySelector('body');
  }

  renderNav() {
    const navAdmin = () => `
      <li class="nav-item">
        <a class="nav-link" href="#">Admin</a>
      </li>
    `;

    return `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              ${this.user.role === 'coach' ? navAdmin() : ''}
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  renderListBots() {
    return `
      <ul class="listbots list-group list-group-flush">
        ${this.bots.map((bot) => this.renderBot(bot)).join('')}
      </ul>
    `;
  }

  renderBot(bot) {
    const {
      id,
      name,
      avatar,
      countMsg
    } = bot;

    return `
      <li id="${id}" class="list-group-item d-flex justify-content-between align-items-center">
        <img
          width="80"
          src="${avatar}"
          class="img-thumbnail rounded-circle"
          alt="bot"
        >
        ${name}
        <span class="badge bg-primary rounded-pill">${countMsg}</span>
      </li>
    `;
  }

  renderMessageSended(text) {
    const { name, avatar } = this.user;

    return `
      <div class="row mb-2">
        <div class="col-6">
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <img
                width="40"
                src="${avatar}"
                class="border border-dark rounded-circle"
                alt="bot"
              >
              ${name}
            </div>
            <div class="card-body">
              <p class="card-text">${text}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderMessageReceived(message) {
    const { name, avatar, text } = message;
    return `
      <div class="row mb-2">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <img
                width="40"
                src="${avatar}"
                class="border border-dark rounded-circle"
                alt="bot"
              >
              ${name}
            </div>
            <div class="card-body">
              <p class="card-text">${text}</p>
            </div>
          </div>
        </div>
        <div class="col-6"></div>
      </div>
    `;
  }

  renderTypingMessage() {
    return `
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="ecrivez votre message">
        <button class="btn btn-outline-primary" type="button">Send</button>
      </div>
    `;
  }

  botsMessages(keyword) {
    const messages = [];

    this.bots.forEach((bot) => {
      const responses = bot.findActionByKeyWord(keyword);

      if (responses.length) {
        const { name, avatar } = bot;

        responses.forEach((text) => {
          messages.push({
            name,
            type: 'bot',
            avatar,
            text
          });
        });

        this.refreshCounterMessages();
      }
    });

    return messages;
  }

  refreshCounterMessages() {
    this.bots.forEach((bot) => {
      const { id, countMsg } = bot;
      const elBot = document.querySelector(`#${id} span`);

      elBot.textContent = countMsg;
    });
  }

  onClickSendMessage() {
    const elMessages = document.querySelector('.messages');
    const elInput = document.querySelector('input');
    // const elBtn = document.querySelector('button');

    elInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        const keyword = elInput.value;
        elMessages.innerHTML += this.renderMessageSended(keyword);
        elInput.value = '';

        const messagesBots = this.botsMessages(keyword)
          .map((message) => this.renderMessageReceived(message));

        elMessages.innerHTML += messagesBots.join('');
      }
    });
  }

  render() {
    return `
      <div class="container-fluid">
        <!-- Navigation -->
        <div class="row">
          ${this.renderNav()}
        </div>
        <!-- Tchat -->
        <div class="row">
          <!-- List bot -->
          <div class="col-3 mt-3">
            ${this.renderListBots()}
          </div>
          <!-- Messages -->
          <div class="col-9 mt-4">
            <!-- message envoyé -->
            <div class="messages"></div>
            <!-- Typing -->
            <div class="row">
              ${this.renderTypingMessage()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
    this.onClickSendMessage();
  }
};

export default Tchat;
