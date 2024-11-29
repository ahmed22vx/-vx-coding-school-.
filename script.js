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
    
    // تحسين التفاعل عند الضغط على زر "ابدأ الآن"
    startButton.addEventListener('click', function() {
        welcomeScreen.style.display = 'flex';  // إظهار شاشة الترحيب
        setTimeout(() => {
            welcomeScreen.style.opacity = '1';  // إضافة تأثير الانتقال
        }, 10);
    });

    // الانتقال إلى المحتوى الرئيسي عند الضغط على زر "التالي"
    nextButton.addEventListener('click', function() {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 500);  // الانتظار لزمن التأثير
    });

    // عرض آراء الطلاب عند الضغط على الرابط
    reviewsLink.addEventListener('click', function(event) {
        event.preventDefault();
        reviewsSection.style.display = 'block';
        reviewsSection.scrollIntoView({ behavior: 'smooth' });  // التمرير السلس لعرض الآراء
    });

    // فتح نافذة التسجيل عند الضغط على زر "التسجيل الآن"
    courseButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            modal.style.display = 'block';
            setTimeout(() => modal.style.opacity = '1', 10);  // إضافة تأثير ظهور نافذة التسجيل
        });
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeButton.addEventListener('click', function() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            form.style.display = 'block';
            confirmationMessage.style.display = 'none';
        }, 500);
    });

    // إغلاق النافذة عند الضغط خارجها
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                form.style.display = 'block';
                confirmationMessage.style.display = 'none';
            }, 500);
        }
    });

    // التحقق من صحة رقم الهاتف باستخدام Regular Expression
    function validatePhoneNumber(phone) {
        const regex = /^[0-9]{11}$/;  // تأكد من أن الرقم مكون من 11 رقمًا
        return regex.test(phone);
    }

    // إرسال الرقم عبر WhatsApp عند إرسال النموذج
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phone').value;

        // التحقق من صحة الرقم
        if (!validatePhoneNumber(phoneNumber)) {
            alert('الرجاء إدخال رقم هاتف صالح');
            return;
        }

        // إرسال الرسالة عبر WhatsApp
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

        // إخفاء النموذج وعرض رسالة التأكيد
        form.style.display = 'none';
        confirmationMessage.style.display = 'block';
    });
});
