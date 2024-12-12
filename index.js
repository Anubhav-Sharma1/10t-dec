/**
 * storeData helps to take the login details of a person.
 * creates an unique key to store the data of its family member in localstorage 
 * @param {*} event 
 */

function storeData(event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const DOB = document.getElementById("DOB").value;

    // Create a user object
    const userData = {
        firstName: fname,
        lastName: lname,
        DOB: DOB
    };

    // Store user data in localStorage with a unique key based on their first name, last name, and DOB
    const userKey = `${fname}_${lname}_${DOB}`;
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to the main page
    window.open('main.html', '_blank');
}
