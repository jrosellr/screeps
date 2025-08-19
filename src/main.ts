function cpu() {
  console.log(`CPU: ${Game.cpu.getUsed()}`);
}

export function loop() {
  cpu();
}
