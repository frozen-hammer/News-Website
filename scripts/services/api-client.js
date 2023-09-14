// Make Network Call

// const URL = 'https://newsdata.io/api/1/news?apikey=pub_286922b910e473e441b74f341b5a6c3025438&q='
// makeNetworkCall(URL);

async function makeNetworkCall(URL,query,API_KEY){
    try{
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    console.log("Data is: ", data);
    return data;
    }
    catch(err){
        console.log("Error is", err);
        throw err;
    }
}

export default makeNetworkCall;
