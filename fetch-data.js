const SHEET_ID = '1ct5CrzsB3QOFouMhJ9IfbGxO72a2WKRDJ5QnX4lv6Uw';
const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/Sheet1`;

async function fetchGalleryData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [
            {
                id: '1',
                type: 'slider',
                images: 'https://picsum.photos/400/300,https://picsum.photos/401/300,https://picsum.photos/402/300',
                title: 'Sample Slider',
                description: 'This is a sample slider post',
                category: 'photos',
                instagramUrl: '',
                date: '2024-01-19',
                order: '1',
                active: 'TRUE'
            }
        ];
    }
}

window.fetchGalleryData = fetchGalleryData;
