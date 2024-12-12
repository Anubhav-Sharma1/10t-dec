let currentUserKey = ''; 

window.onload = function () {
    /**
 * calculateAge function takes the Dob and 
 * calculate the age of the user 
 */
    function calculateAge(DOB) {
        const today = new Date();
        const birthDate = new Date(DOB);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const userDetails = document.getElementById('userDetails');

    if (userData?.DOB) {
        const age = calculateAge(userData.DOB);
        userDetails.textContent = `Hello, ${userData.firstName} ${userData.lastName}! Your age is ${age} years.`;

        // Generate a unique user key
        currentUserKey = `${userData.firstName}_${userData.lastName}_${userData.DOB}`;
    } else {
        userDetails.textContent = "No user data found.";
    }

    displayFamilyDetails();

    const form = document.getElementById("familyDetailsForm");

    const addNewEntryButton = document.getElementById("addNewEntryButton");
    addNewEntryButton.addEventListener("click", function () {
        form.style.display = "block";
        form.scrollIntoView({ behavior: "smooth" });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("Name").value;
        const age = document.getElementById("Age").value;
        const relation = document.getElementById("Relation").value;
        const gender = document.getElementById("Gender").value;
        const occupation = form.querySelector('input[type="text"]').value; // Get the occupation

        if (!name || !age || isNaN(age)) {
            alert("Please enter valid details.");
            return;
        }

        const familyDetail = {
            name: name,
            age: age,
            relation: relation,
            gender: gender,
            occupation: occupation 
        };

        let familyDetails = JSON.parse(localStorage.getItem(`familyDetails_${currentUserKey}`)) || [];
        familyDetails.push(familyDetail);

        localStorage.setItem(`familyDetails_${currentUserKey}`, JSON.stringify(familyDetails));

        form.reset();
        displayFamilyDetails();
    });
};

function displayFamilyDetails() {
    const familyDetails = JSON.parse(localStorage.getItem(`familyDetails_${currentUserKey}`)) || [];
    const tableBody = document.getElementById('familyDetailsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    familyDetails.forEach(function (detail) {
        const row = tableBody.insertRow();

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        // const cell4 = row.insertCell(3);

        cell1.textContent = detail.name;
        cell2.textContent = detail.age;
        cell3.textContent = detail.relation;
        // cell4.textContent = detail.gender;

        // Add hover event to show the popup with all details
        row.addEventListener('mouseover', function () {
            const popup = document.getElementById('popup');
            popup.style.display = 'block';
            popup.style.opacity = 1;

            // Position the popup near the hovered row
            const rowRect = row.getBoundingClientRect();
            popup.style.left = `${rowRect.left + window.scrollX + rowRect.width + 10}px`; // 10px offset
            // popup.style.top = `${rowRect.top + window.scrollY}px`;
            popup.style.top = `${rowRect.top + window.scrollY - popup.offsetHeight - 10}px`;

            // Update the popup content with family member details
            document.getElementById('popupName').textContent = detail.name;
            document.getElementById('popupAge').textContent = detail.age;
            document.getElementById('popupRelation').textContent = detail.relation;
            document.getElementById('popupGender').textContent = detail.gender;
            document.getElementById('popupOccupation').textContent = detail.occupation;
        });

        row.addEventListener('mouseout', function () {
            const popup = document.getElementById('popup');
            popup.style.display = 'none';
            popup.style.opacity = 0;
        });
    });
}
