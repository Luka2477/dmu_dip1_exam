const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const gaetTalISyttenTabel = () => {
  return new Promise(async (resolve, reject) => {
    await sleep(1000 + Math.floor(Math.random() * 3000));

    const number = Math.round(Math.random() * 2000);

    if (number % 17 === 0) resolve(number);
    else reject(number);
  });
};

const proevAntalGange = async (gange) => {
  for (let i = 0; i < gange; i++) {
    try {
      const result = await gaetTalISyttenTabel();

      return `${result} is a multiple of 17`;
    } catch (err) {
      // DO NOTHING
    }
  }

  throw new Error(`none of the numbers were a multiple of 17`);
};

proevAntalGange(3)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

// A Promise is a proxy for a value not necessarily known when the promise is created.
// It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.
// This lets asynchronous methods return values like synchronous methods:
//    instead of immediately returning the final value, the asynchronous method returns a promise to supply
//    the value at some point in the future.

// A Promise is in one of these states:
//    pending: initial state, neither fulfilled nor rejected.
//    fulfilled: meaning that the operation was completed successfully.
//    rejected: meaning that the operation failed.
