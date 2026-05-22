const logger =
  require('./logger');

module.exports = {

  write: (message) => {

    logger.info(
      message.trim()
    );

  }

};