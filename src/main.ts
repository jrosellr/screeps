const miner = require("./miner");

function loop() {
  console.log(Game.time);
  miner.run();
}

module.exports = {
  loop: loop,
};
