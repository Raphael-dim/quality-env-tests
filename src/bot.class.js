const Bot = class {
  #actions;

  constructor(entity) {
    const {
      id,
      name,
      avatar,
      actions
    } = entity;
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.actions = actions;
    this.countMsg = 0;
  }

  findActionByKeyWord(keyword) {
    const responses = [];

    this.actions.forEach((action) => {
      const { words, response } = action;

      if (words.includes(keyword)) {
        responses.push(response());

        this.countMsg += 1;
      }
    });

    return responses;
  }
};

export default Bot;
