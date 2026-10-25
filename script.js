// ---------- Constants ----------
const MIN_PASSWORD = 8;

// ---------- DOM elements ----------
const regForm = document.getElementById("regform");
const successMsg = document.getElementById("successMsg");
const themeBtn = document.getElementById("theme");

const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
    password: { input: document.getElementById("password"), error: document.getElementById("passwordError") },
    confirm: { input: document.getElementById("confirm-password"), error: document.getElementById("confirmError") },
    gender: { input: document.getElementById("gender"), error: document.getElementById("genderError") },
    dob: { input: document.getElementById("dob"), error: document.getElementById("dobError") },
    country: { input: document.getElementById("country"), error: document.getElementById("countryError") },
    phone: { input: document.getElementById("phone"), error: document.getElementById("phoneError") },
    bio: { input: document.getElementById("bio"), error: document.getElementById("bioError") }
};

// ---------- Form validation ----------
regForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = fields.name.input.value.trim();
    const email = fields.email.input.value.trim();
    const password = fields.password.input.value;
    const confirm = fields.confirm.input.value;
    const gender = fields.gender.input.value;
    const dob = fields.dob.input.value;
    const country = fields.country.input.value.trim();
    const phone = fields.phone.input.value.trim();
    const bio = fields.bio.input.value.trim();

    let isValid = true;

    function fail(key, message) {
        fields[key].error.textContent = message;
        fields[key].input.classList.add("invalid");
        isValid = false;
    }

    if (name === "") fail("name", "Name is required.");

    if (email === "") fail("email", "Email is required.");
    else if (!validateEmail(email)) fail("email", "Invalid email format.");

    if (password.length < MIN_PASSWORD) {
        fail("password", `Password must be at least ${MIN_PASSWORD} characters.`);
    }

    if (confirm === "") fail("confirm", "Please confirm your password.");
    else if (confirm !== password) fail("confirm", "Passwords do not match.");

    if (gender === "") fail("gender", "Please select a gender.");

    if (dob === "") fail("dob", "Date of birth is required.");
    else if (new Date(dob) > new Date()) fail("dob", "Date of birth can't be in the future.");

    if (country === "") fail("country", "Country is required.");

    if (phone === "") fail("phone", "Phone number is required.");
    else if (!validatePhone(phone)) fail("phone", "Invalid phone number.");

    if (bio === "") fail("bio", "Bio is required.");

    if (isValid) {
        showSuccessMessage(`Welcome, ${name}! Registration successful.`);
        regForm.reset();
    }
});

// ---------- Dark mode ----------
themeBtn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark");
    themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
});

// ---------- Helpers ----------
function clearErrors() {
    document.querySelectorAll(".error").forEach(function (el) {
        el.textContent = "";
    });
    document.querySelectorAll(".invalid").forEach(function (el) {
        el.classList.remove("invalid");
    });
    successMsg.classList.add("hidden");
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[0-9\s]{9,15}$/;
    return re.test(phone);
}

function showSuccessMessage(message) {
    successMsg.textContent = message;
    successMsg.classList.remove("hidden");
}