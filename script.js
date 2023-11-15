const row = document.querySelector('.row')
const home = document.querySelector('#home')
const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')
const search = document.querySelector('#search')
const currentCocktail = document.querySelector('#currentCocktail')
const searchSubmit = document.querySelector('#search-submit')
const apiUrl = 'https://www.thecocktaildb.com/api/json/v2/1/popular.php'
const apiUrlImg = 'https://www.thecocktaildb.com/images/ingredients/'

const getCocktail = () => {
    row.classList.remove('hidden')
    search.classList.add('hidden')
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            data.drinks.forEach(cocktail => {
                row.innerHTML += `
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img" src="${cocktail.strDrinkThumb}" alt="">
                            <div class="card-body">
                                <h2 class="card-title">${cocktail.strDrink}</h2>
                                <p class="card-text">${cocktail.strAlcoholic}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        })
}

const showLoading = () => {
    currentCocktail.innerHTML = '<h2>Загрузка ожидай...</h2>';
};

const hideLoading = () => {
    currentCocktail.innerHTML = '';
};

const erorText = () => {
    currentCocktail.innerHTML = '<h2>Ничего не найдено</h2>';
}

const getSearchCocktail = () => {
    let nameCocktail = searchInput.value
    showLoading();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameCocktail}`)
        .then(response => response.json())
        .then(dataSearch => {
            hideLoading();
            dataSearch.drinks.forEach(cocktail => {
                let ingridient1 = cocktail.strIngredient1
                let ingridient2 = cocktail.strIngredient2
                let ingridient3 = cocktail.strIngredient3
                let ingridient4 = cocktail.strIngredient4
                console.log(`${apiUrlImg}${ingridient1}.png`)
                currentCocktail.innerHTML += `
                        <div class="col-4">
                            <div class="card">
                                <img class="card-img" src="${cocktail.strDrinkThumb}" alt="">
                                <div class="card-body">
                                    <h2 class="card-title">${cocktail.strDrink}</h2>
                                    <p class="card-text">${cocktail.strAlcoholic}</p>
                                    <p class="card-text">${cocktail.strInstructions}</p>
                                </div>
                                <div class="grid">
                                    <div class="div1">
                                        <h4>${ingridient1}</h4>
                                        <img src="${apiUrlImg}${ingridient1}.png" class="receptImg">
                                    </div>
                                    <div class="div2">
                                        <h4>${ingridient2}</h4>
                                        <img src="${apiUrlImg}${ingridient2}.png" class="receptImg">
                                    </div>
                                    <div class="div3">
                                        <h4>${ingridient3}</h4>
                                        <img src="${apiUrlImg}${ingridient3}.png" class="receptImg">
                                    </div>
                                    <div class="div4">
                                        <h4>${ingridient4}</h4>
                                        <img src="${apiUrlImg}${ingridient4}.png" class="receptImg">
                                    </div>
                                </div>
                            </div>
                        </div>
                `
            })
        })
        .catch(() => {
            erorText()
        })
}

searchSubmit.addEventListener('click', () => {
    getSearchCocktail()
})

searchBtn.addEventListener('click', () => {
    row.classList.add('hidden')
    search.classList.remove('hidden')
})

home.addEventListener('click', () => {
    row.classList.remove('hidden')
    search.classList.add('hidden')
})

getCocktail()