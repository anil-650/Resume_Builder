export async function getUserdata(){
  try {
    const response = await fetch('http://192.168.29.138:5000/dashboard', {method: 'GET', credentials: 'include'});
    const data = await response.json();
    const name  = data.name;
    console.log(joke); // prints the joke to the console
    return name ; // returns the joke from the function
  } catch (error) {
    console.error(error);
  }
}
