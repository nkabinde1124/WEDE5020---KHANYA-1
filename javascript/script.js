
function setupForm(config) {

    const form = document.getElementById(config.formId);

    if (!form) return;

    const nameInput = document.getElementById(config.nameId);
    const emailInput = document.getElementById(config.emailId);
    const phoneInput = document.getElementById(config.phoneId);
    const messageInput = document.getElementById(config.messageId);

    const nameError = document.getElementById(config.nameErrorId);
    const emailError = document.getElementById(config.emailErrorId);
    const phoneError = document.getElementById(config.phoneErrorId);
    const messageError = document.getElementById(config.messageErrorId);

    const successMessage = document.getElementById(config.successId);

    function setError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.toggle("invalid", Boolean(message));
    }

    // NAME VALIDATION
    function validateName() {
        const value = nameInput.value.trim();
        const lettersOnly = /^[\p{L}\s'-]+$/u;
        const letterCount = value.replace(/[^\p{L}]/gu, "").length;

        if (value === "") {
            setError(nameInput, nameError, "Please enter your full name.");
            return false;
        }

        if (!lettersOnly.test(value)) {
            setError(nameInput, nameError, "Name can only contain letters.");
            return false;
        }

        if (letterCount < 6) {
            setError(nameInput, nameError, "Name must contain at least 6 letters.");
            return false;
        }

        setError(nameInput, nameError, "");
        return true;
    }

    // EMAIL VALIDATION
    function validateEmail() {
        const value = emailInput.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

        if (value === "") {
            setError(emailInput, emailError, "Please enter your email address.");
            return false;
        }

        if (!pattern.test(value)) {
            setError(emailInput, emailError, "Please enter a valid email address.");
            return false;
        }

        setError(emailInput, emailError, "");
        return true;
    }

    // PHONE VALIDATION - MANDATORY
    function validatePhone() {
        const value = phoneInput.value.trim();
        const pattern = /^\+?[0-9\s-]+$/;
        const digitCount = value.replace(/\D/g, "").length;

        if (value === "") {
            setError(phoneInput, phoneError, "Please enter your phone number.");
            return false;
        }

        if (!pattern.test(value) || digitCount < 10 || digitCount > 15) {
            setError(phoneInput, phoneError,
                "Phone number must contain 10 to 15 digits.");
            return false;
        }

        setError(phoneInput, phoneError, "");
        return true;
    }

    // MESSAGE VALIDATION
    function validateMessage() {
        const value = messageInput.value.trim();

        if (value === "") {
            setError(messageInput, messageError, "Please tell us how we can help.");
            return false;
        }

        if (value.length < 8) {
            setError(messageInput, messageError,
                "Message must contain at least 8 characters.");
            return false;
        }

        setError(messageInput, messageError, "");
        return true;
    }

    // CHECK FIELDS WHEN USER LEAVES THEM
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    phoneInput.addEventListener("blur", validatePhone);
    messageInput.addEventListener("blur", validateMessage);

    // CLEAR SUCCESS MESSAGE WHEN EDITING
    form.addEventListener("input", function () {
        successMessage.textContent = "";
    });

    // FORM SUBMISSION
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        successMessage.textContent = "";

        // Run EVERY validation function
        const results = [
            validateName(),
            validateEmail(),
            validatePhone(),
            validateMessage()
        ];

        // Only allow success when all four are valid
        if (results.every(result => result === true)) {

            successMessage.textContent = config.successText;

            form.reset();

            setError(nameInput, nameError, "");
            setError(emailInput, emailError, "");
            setError(phoneInput, phoneError, "");
            setError(messageInput, messageError, "");
        }

    });
}


// CONTACT PAGE
setupForm({
    formId: "contactForm",
    nameId: "name",
    emailId: "email",
    phoneId: "phone",
    messageId: "message",

    nameErrorId: "nameError",
    emailErrorId: "emailError",
    phoneErrorId: "phoneError",
    messageErrorId: "messageError",

    successId: "successMessage",

    successText: "Thank you for contacting Stitch and Seam Tailoring! We'll get back to you soon."
});


// ENQUIRY PAGE
setupForm({
    formId: "enquiryForm",
    nameId: "enquiryName",
    emailId: "enquiryEmail",
    phoneId: "enquiryPhone",
    messageId: "enquiryMessage",

    nameErrorId: "enquiryNameError",
    emailErrorId: "enquiryEmailError",
    phoneErrorId: "enquiryPhoneError",
    messageErrorId: "enquiryMessageError",

    successId: "enquirySuccessMessage",

    successText: "Thank you for your enquiry! Stitch and Seam Tailoring will get back to you soon."
});


// IMAGE FULL SCREEN PREVIEW

document.addEventListener("DOMContentLoaded", function () {

    // Create the lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";

    // Create enlarged image
    const enlargedImage = document.createElement("img");
    enlargedImage.alt = "Enlarged image";

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.className = "lightbox-close";
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("aria-label", "Close image preview");

    lightbox.appendChild(enlargedImage);
    lightbox.appendChild(closeButton);

    document.body.appendChild(lightbox);

    // Open image when clicked
    document.querySelectorAll("img").forEach(function (img) {

        img.addEventListener("click", function () {

            enlargedImage.src = img.src;
            enlargedImage.alt = img.alt || "Enlarged image";

            lightbox.style.display = "flex";

            document.body.style.overflow = "hidden";
        });

    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = "none";
        enlargedImage.src = "";
        document.body.style.overflow = "";
    }

    closeButton.addEventListener("click", closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Close using Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

});


// WEBSITE SEARCH FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const resultsContainer = document.getElementById("searchResults");
    const searchHeading = document.getElementById("searchHeading");

    // Only run on the search results page
    if (!resultsContainer || !searchHeading) return;

    // Website pages and searchable keywords
    const pages = [

        {
            title: "Home",
            url: "Home.html",
            description: "Welcome to Stitch and Seam Tailoring. Discover our tailoring business.",
            keywords: "home welcome stitch seam tailoring quality fit"
        },

        {
            title: "About Us",
            url: "about.html",
            description: "Learn more about Stitch and Seam Tailoring and our business.",
            keywords: "about us business information history tailor"
        },

        {
            title: "Our Services",
            url: "services.html",
            description: "Explore our tailoring services, clothing alterations and professional fittings.",
            keywords: "services tailoring alterations clothing repairs fitting sewing"
        },

        {
            title: "Booking",
            url: "booking.html",
            description: "Visit our booking page to arrange a tailoring appointment.",
            keywords: "booking appointment reservation schedule measurements"
        },

        {
            title: "Contact Us",
            url: "contact.html",
            description: "Find our contact details, phone number, address and opening hours.",
            keywords: "contact phone address opening hours location directions message"
        },

        {
            title: "Enquiries",
            url: "enquiry.html",
            description: "Send us an enquiry or ask us a question about our tailoring services.",
            keywords: "enquiry questions help information concerns ask message"
        }

    ];

    // Get search term from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("q") || "";
    const query = searchTerm.trim().toLowerCase();

    // Display search heading
    searchHeading.textContent = query
        ? `Search results for: "${searchTerm}"`
        : "Please enter something to search for.";

    // Clear previous results
    resultsContainer.innerHTML = "";

    if (!query) return;

    // Split search into words
    const searchWords = query.split(/\s+/);

    // Find matching pages
    const matchingPages = pages.map(function (page) {

        const searchableText = (
            page.title + " " +
            page.description + " " +
            page.keywords
        ).toLowerCase();

        const matchedWords = searchWords.filter(function (word) {
            return searchableText.includes(word);
        });

        return {
            ...page,
            score: matchedWords.length
        };

    }).filter(function (page) {
        return page.score > 0;
    });

    // Sort by relevance
    matchingPages.sort(function (a, b) {
        return b.score - a.score;
    });

    // Display results
    if (matchingPages.length > 0) {

        matchingPages.forEach(function (page) {

            const result = document.createElement("div");
            result.className = "search-result";

            const title = document.createElement("h2");
            const link = document.createElement("a");

            link.href = page.url;
            link.textContent = page.title;

            title.appendChild(link);

            const description = document.createElement("p");
            description.textContent = page.description;

            result.appendChild(title);
            result.appendChild(description);

            resultsContainer.appendChild(result);

        });

    } else {

        const noResults = document.createElement("p");

        noResults.textContent =
            `Sorry, no results were found for "${searchTerm}". Please try another search.`;

        resultsContainer.appendChild(noResults);

    }

    console.log("Search results:", matchingPages);

});
