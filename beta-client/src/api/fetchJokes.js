export async function fetchJoke() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    const joke = data.value;
    console.log(joke); // prints the joke to the console
    return joke; // returns the joke from the function
  } catch (error) {
    console.error(error);
  }
}
