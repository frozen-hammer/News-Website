import makeNetworkCall from "./api-client.js";
import {API_KEY, URL} from '../utils/config.js'; 
import News from "../models/news-model.js";

const newsOperations = {
    news:[],
    async getNews(query){
        // Api Client(Objects(News))
        const data = await makeNetworkCall(URL,query,API_KEY);
        const newsJSON = data['articles'];
    
        const news = newsJSON.map(currentNews=>{
            const newsObject = new News(currentNews.urlToImage,currentNews.title,currentNews.publishedAt,currentNews.url,currentNews.content,currentNews.source.name);
            // if(!newsObject.img)return;
            return newsObject;
        })
        this.news = news;
        return news;
    }
}

export default newsOperations;
