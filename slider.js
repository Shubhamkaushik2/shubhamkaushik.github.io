class ImageSlider {
    constructor(containerId, imageUrls) {
        this.container = document.getElementById(containerId);
        this.images = imageUrls.split(',');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="slider-wrapper">
                <div class="slider-images">
                    ${this.images.map((img, index) => 
                        `<img src="${img}" alt="Gallery image ${index + 1}" 
                             class="slider-image ${index === 0 ? 'active' : ''}">`
                    ).join('')}
                </div>
                <button class="slider-btn prev-btn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="slider-btn next-btn">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="slider-dots">
                    ${this.images.map((_, index) => 
                        `<span class="dot ${index === 0 ? 'active' : ''}" 
                              data-index="${index}"></span>`
                    ).join('')}
                </div>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const prevBtn = this.container.querySelector('.prev-btn');
        const nextBtn = this.container.querySelector('.next-btn');
        const dots = this.container.querySelectorAll('.dot');

        prevBtn.addEventListener('click', () => this.prevImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToImage(index);
            });
        });

        this.autoPlayInterval = setInterval(() => this.nextImage(), 5000);
        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        this.container.addEventListener('mouseleave', () => {
            this.autoPlayInterval = setInterval(() => this.nextImage(), 5000);
        });
    }

    showImage(index) {
        const images = this.container.querySelectorAll('.slider-image');
        const dots = this.container.querySelectorAll('.dot');

        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        images[index].classList.add('active');
        dots[index].classList.add('active');
        this.currentIndex = index;
    }

    nextImage() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }

    prevImage() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex);
    }

    goToImage(index) {
        this.showImage(index);
    }
}

function initSliders() {
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach((slider, index) => {
        const images = slider.dataset.images;
        slider.id = `slider-${index}`;
        new ImageSlider(`slider-${index}`, images);
    });
}

window.ImageSlider = ImageSlider;
window.initSliders = initSliders;
