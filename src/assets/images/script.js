document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        let rating = this.getAttribute('data-value');
        let category = this.closest('.stars').getAttribute('data-category');

        // Highlight selected stars
        let stars = this.parentElement.children;
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove('selected');
            if (stars[i].getAttribute('data-value') <= rating) {
                stars[i].classList.add('selected');
            }
        }

        console.log(`Category: ${category}, Rating: ${rating} stars`);
    });
});

// Display Thank You message after submitting feedback
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        document.getElementById('thankYouMessage').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('thankYouMessage').classList.add('hidden');
        }, 3000);
    });
});
