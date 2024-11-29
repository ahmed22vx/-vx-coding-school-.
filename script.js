document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const reviewsLink = document.getElementById('reviews-link');
    const reviewsSection = document.getElementById('reviews');
    const courseButtons = document.querySelectorAll('.course-btn');
    const modal = document.getElementById('registration-modal');
    const closeButton = document.querySelector('.close');
    const form = document.getElementById('registration-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    // عرض شاشة الترحيب عند الضغط على زر ابدأ الآن
    startButton.addEventListener('click', function() {
        welcomeScreen.style.display = 'flex';
    });

    // الانتقال إلى المحتوى الرئيسي عند الضغط على زر التالي
    nextButton.addEventListener('click', function() {
        welcomeScreen.style.display = 'none';
    });

    // عرض آراء الطلاب عند الضغط على الرابط في القائمة
    reviewsLink.addEventListener('click', function(event) {
        event.preventDefault();
        reviewsSection.style.display = 'block';
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // عرض النافذة عند الضغط على زر التسجيل
    courseButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        form.style.display = 'block';
        confirmationMessage.style.display = 'none';
    });

    // إغلاق النافذة عند الضغط خارجها
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            form.style.display = 'block';
            confirmationMessage.style.display = 'none';
        }
    });

    // إرسال الرقم عبر WhatsApp عند إرسال النموذج
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phone').value;

        fetch('https://graph.facebook.com/v14.0/YOUR_PHONE_NUMBER_ID/messages', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: '01557362941',
                type: 'text',
                text: { body: `رقم هاتف المستخدم هو: ${phoneNumber}` }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        form.style.display = 'none';
        confirmationMessage.style.display = 'block';
    });
});
