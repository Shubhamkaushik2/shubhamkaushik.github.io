async function loadGallery() {
    const container = document.getElementById('galleryContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading gallery...</div>';
    
    const galleryData = await fetchGalleryData();
    container.innerHTML = '';
    
    displayGalleryItems(galleryData, 'all');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            displayGalleryItems(galleryData, filter);
        });
    });
}

function displayGalleryItems(data, filter = 'all') {
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';
    
    let filteredData = data;
    if (filter !== 'all') {
        filteredData = data.filter(item => {
            if (filter === 'slider' || filter === 'single') {
                return item.type === filter;
            } else if (filter === 'photos' || filter === 'videos') {
                return item.category === filter;
            }
            return true;
        });
    }
    
    filteredData.sort((a, b) => parseInt(a.order) - parseInt(b.order));
    
    filteredData.forEach((item, index) => {
        if (item.active !== 'TRUE') return;
        
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.type}-item`;
        
        if (item.type === 'slider') {
            galleryItem.innerHTML = `
                <div class="slider-container" data-slider data-images="${item.images}"></div>
                <div class="gallery-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="gallery-meta">
                        <span class="date"><i class="far fa-calendar"></i> ${item.date}</span>
                        ${item.instagramUrl ? 
                            `<a href="${item.instagramUrl}" target="_blank" class="insta-link">
                                <i class="fab fa-instagram"></i> View on Instagram
                            </a>` : ''
                        }
                    </div>
                    <div class="badge slider-badge">${item.images.split(',').length} Images</div>
                </div>
            `;
        } else {
            const imageUrl = item.images.split(',')[0];
            galleryItem.innerHTML = `
                <div class="single-image">
                    <img src="${imageUrl}" alt="${item.title}" loading="lazy">
                    ${item.category === 'videos' ? 
                        '<div class="video-badge"><i class="fas fa-play"></i> Video</div>' : ''
                    }
                </div>
                <div class="gallery-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="gallery-meta">
                        <span class="date"><i class="far fa-calendar"></i> ${item.date}</span>
                        ${item.instagramUrl ? 
                            `<a href="${item.instagramUrl}" target="_blank" class="insta-link">
                                <i class="fab fa-instagram"></i> Instagram
                            </a>` : ''
                        }
                    </div>
                </div>
            `;
        }
        
        container.appendChild(galleryItem);
    });
    
    setTimeout(() => initSliders(), 100);
    
    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="no-items">
                <i class="far fa-images"></i>
                <h3>No gallery items found</h3>
                <p>Try a different filter or add some posts.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadGallery);
