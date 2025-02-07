'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// Get the button and file input element
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-upload');

// Add event listener to button to trigger file input
uploadBtn.addEventListener('click', function () {
    fileInput.click();
});

// Add event listener to file input when a file is selected
fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];  // Get the selected file

    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();  // Create a FileReader to read the file
        reader.onload = function (e) {
            // Set the body background to the uploaded image
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';  // Ensure the image covers the whole body
            document.body.style.backgroundPosition = 'center';  // Center the image
            document.body.style.backgroundAttachment = 'fixed';  // Optional: Make the background fixed
        };
        reader.readAsDataURL(file);  // Convert the image to a data URL
    } else {
        alert('Please upload a valid image file.');
    }
});

/*****************************************************************************************/
// Modal window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

/*****************************************************************************************/
// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

/*****************************************************************************************/
// Tabbed component
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Activate tab
    clicked.classList.add('operations__tab--active');

    // Activate content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

/*****************************************************************************************/
// Menu fade animation
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


