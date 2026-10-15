// بيانات المحطات الـ 9 (مرتبة تاريخياً)
const bridgeSteps = [
    { id: 1, title: "موسى والفصح", subtitle: "التحرر من العبودية والرموز الأولى", emoji: "🐑", btnText: "تثبيت حجر الفصح 🧱" },
    { id: 2, title: "البرية والناموس", subtitle: "استلام الوصايا وناموس الحياة", emoji: "📜", btnText: "تثبيت حجر الناموس 🧱" },
    { id: 3, title: "تجسس الأرض", subtitle: "تذمر الشعب في البرية", emoji: "🏕️", btnText: "تثبيت حجر البرية 🧱" },
    { id: 4, title: "التثنية", subtitle: "تكرار الشريعة والعهد المجدد", emoji: "📖", btnText: "تثبيت حجر التثنية 🧱" },
    { id: 5, title: "أرض الموعد", subtitle: "الدخول للراحة بقيادة يشوع", emoji: "🍇", btnText: "تثبيت حجر الموعد 🧱" },
    { id: 6, title: "الأنبياء", subtitle: "التهيئة والنبوات عن المخلص", emoji: "👑", btnText: "تثبيت حجر الأنبياء 🧱" },
    { id: 7, title: "التجسد", subtitle: "الكلمة صار جسداً وحل بيننا", emoji: "✨", btnText: "تثبيت حجر التجسد 🧱" },
    { id: 8, title: "الميلاد العذراوي", subtitle: "ميلاد المخلص من العذراء مريم", emoji: "🌟", btnText: "تثبيت حجر الميلاد 🧱" },
    { id: 9, title: "الموت على الصليب", subtitle: "إتمام الخلاص وفتح باب السماء", emoji: "✝️", btnText: "تثبيت الصليب في الجسر ✨" }
];

let currentStep = 0; // يبدأ من 0 (المحطة الأولى)

// عناصر الـ DOM
const progressText = document.getElementById('progress-text');
const bridgeGap = document.getElementById('bridge-gap');
const btnNextStep = document.getElementById('btn-next-step');

// عناصر الـ Modal
const infoModal = document.getElementById('info-modal');
const modalEmoji = document.getElementById('modal-emoji');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const btnPlaceStone = document.getElementById('btn-place-stone');
const endScreen = document.getElementById('end-screen');

// 1. عند الضغط على "كشف المحطة"
btnNextStep.addEventListener('click', () => {
    if (currentStep < bridgeSteps.length) {
        const stepData = bridgeSteps[currentStep];
        
        // تعبئة الـ Modal ببيانات المحطة
        modalEmoji.innerText = stepData.emoji;
        modalTitle.innerText = stepData.title;
        modalSubtitle.innerText = stepData.subtitle;
        btnPlaceStone.innerText = stepData.btnText;
        
        // إظهار الـ Modal للخادمة عشان تشرح
        infoModal.classList.remove('hidden');
    }
});

// 2. عند الضغط على "تثبيت الحجر" داخل الـ Modal
btnPlaceStone.addEventListener('click', () => {
    const stepData = bridgeSteps[currentStep];
    
    // إخفاء الـ Modal
    infoModal.classList.add('hidden');
    
    // بناء الحجر وإسقاطه في الجسر
    buildStone(stepData, currentStep);
    
    currentStep++;
    
    // تحديث الواجهة للمحطة اللي بعدها
    if (currentStep < bridgeSteps.length) {
        progressText.innerText = `المحطة ${currentStep + 1} من 9`;
        btnNextStep.innerText = `كشف المحطة ${currentStep + 1}`;
    } else {
        // لو دي كانت آخر محطة (الصليب)
        completeSalvationBridge();
    }
});

// دالة إنشاء الحجر بالـ HTML وتنزيله في مكانه
function buildStone(data, index) {
    // حاوية الحجر (عشان تحافظ على التوزيع المتساوي للمسافات)
    const stoneContainer = document.createElement('div');
    stoneContainer.classList.add('stone-container');
    
    // الحجر نفسه
    const stoneElement = document.createElement('div');
    stoneElement.classList.add('stone');
    
    // لو دي النقطة الأخيرة (الصليب)، نديها كلاس مختلف عشان الشكل المميز
    if (index === 8) {
        stoneElement.classList.add('cross-stone');
        stoneElement.innerText = "✝️"; // رمز الصليب
    } else {
        stoneElement.innerText = data.emoji; // الإيموجي العادي للأحجار
    }
    
    // إضافة الحجر للحاوية، ثم الحاوية للجسر
    stoneContainer.appendChild(stoneElement);
    bridgeGap.appendChild(stoneContainer);
}

// دالة احتفال النهاية وإتمام الخلاص
function completeSalvationBridge() {
    // إخفاء زر الكشف
    btnNextStep.classList.add('hidden');
    progressText.innerText = "اكتمل الجسر!";
    
    // إظهار شاشة النهاية بعد ما الصليب ينزل بثانية
    setTimeout(() => {
        document.body.classList.add('salvation-complete'); // يغير لون السماء لذهبي
        endScreen.classList.remove('hidden');
    }, 1500);
}