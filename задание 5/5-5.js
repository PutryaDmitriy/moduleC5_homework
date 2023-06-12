//задание 5
const firstInput = document.querySelector('.firstInput');
const secondInput = document.querySelector('.secondInput');
const btnNode = document.querySelector('.btn');
const resultNode = document.querySelector('.result');

document.addEventListener("DOMContentLoaded", () => {
    storageItem = localStorage.getItem('lastResponse')
    if (storageItem) {
        showResult(JSON.parse(storageItem));
    }
});

const useRequest = (page, limit) => {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            return data
            console.log(data)
        })
        .catch(() => {
            console.log('error')
        })
};

function showResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img class="card-image" src="${item.download_url}">
            </div>`;
        cards += cardBlock;
    });
    
    resultNode.innerHTML = cards;
};

btnNode.addEventListener('click', async () => {
    const page = Number(firstInput.value);
    const limit = Number(secondInput.value);
    const pageError = isNaN(page) || page < 1 || page > 10;
    const limitError = isNaN(limit) || limit < 1 || limit > 10;

    if (pageError) {
        resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    }
    if (limitError) {
        resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
    }
    if (pageError && limitError) {
        resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
    }
    if (!pageError && !limitError) {
        const requestResult = await useRequest(page, limit);
        localStorage.setItem('lastResponse', JSON.stringify(requestResult));
        showResult(requestResult);
    }
});
