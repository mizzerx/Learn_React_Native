const API = "http://newsapi.org/v2/everything?q=apple&from=2020-07-29&to=2020-07-29&sortBy=popularity&apiKey=7c635ba2d6d049ad88195942b4697a9b";

const ListArticleServer = async () => {
  try {
    let res = await fetch(API);
    let resJson = await res.json();
    return resJson.articles;
  } catch (error) {
    console.log("Error is: " + error);
  }
}

export default ListArticleServer;