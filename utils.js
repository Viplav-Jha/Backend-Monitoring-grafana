async function doSomeHeavyTask() {
  // Simulate a delay of 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Introduce occasional errors (50% of the time)
  if (Math.random() < 0.5) {
    throw new Error('Heavy task encountered an error');
  }

  return 'Heavy task completed!';
}

module.exports = { doSomeHeavyTask };
