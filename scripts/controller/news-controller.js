import newsOperations from "../services/news-operations.js";

window.addEventListener('load', bindEvents);
function bindEvents(){
    //for nav items
    const lis = document.querySelectorAll('#list li');
    for(let li of lis){
        li.addEventListener('click',function(){
            onNavItemClick(li.id);
        } );
    }

    //for submit button
    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");
    searchButton.addEventListener("click", ()=>{
        const query = searchText.value;
        onButtonClick(query);
    });

    //for logo(image) 
    reload();
}

 

printNews("world");
async function printNews(query){
    const allNews = await newsOperations.getNews(query);
    const div = document.getElementById("news-section");
    console.log("News: ",allNews);

    div.innerHTML='';
    for(var news of allNews){
        if(!news.img)continue;

        const card = createCard(news);
        div.appendChild(card);
    }
}



let currSelectedNav = null;
function onNavItemClick(id){
    console.log('onNavItemClick Call');
    printNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}


function onButtonClick(query){
    console.log("Submit Button Call");
    if(!query) return;
    printNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=null;
}

function reload(){
    const home = document.querySelector(".container-fluid img");
    home.addEventListener('click', ()=>{
        window.location.reload();
    })
}


function createCard(news){

    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = "card h-100";


    const image = document.createElement('img');
    if(news.img){
        image.src = news.img;
    }else{
        image.src = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    }
    image.className = 'card-img-top';
    cardDiv.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    cardDiv.appendChild(cardBody);

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = news.title;
    cardBody.appendChild(h5);

    const line = document.createElement('hr');
    cardBody.appendChild(line);

    const newsSource = document.createElement('p');
    newsSource.className = 'card-date';
    const date = new Date(news.date).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerText = `${news.source} · ${date}`;
    cardBody.appendChild(newsSource);



    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    if((news.desc).length > 200){
        news.desc= news.desc.substring(0,200);
    }
    pTag.innerText = news.desc;
    cardBody.appendChild(pTag);

    const button = document.createElement('button');
    button.className = 'btn mt-auto btn-primary';
    button.innerText = 'Read More';
    button.addEventListener('click',()=>{
        window.open(news.link,"_blank");
    });
    cardBody.appendChild(button);

    colDiv.appendChild(cardDiv);

    return colDiv;

     /*
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    */
}
