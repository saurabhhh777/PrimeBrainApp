const randomVal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Only alphabets

export const createContentID = () => {
  let id = '';
  for (let i = 0; i < 9; i++) { // Adjust length as needed
    const randomIndex = Math.floor(Math.random() * randomVal.length);
    id += randomVal[randomIndex];
  }

  console.log(id);

  return id;
};


// Example usage