'use strict';

const base="https://newsapi.org/v2/"
const key="apiKey=27eda7ba8e8f496bb3360c5d192f2299"

function formatParams(){
  let params= [];  

  if ($('#option1or2').val() != null) params.push($('#option1or2').val());
  

  if ($('.searchQ').val() != "") params.push("q="+$('.searchQ').val()+"&");

  if ($('.countrySearch').val() != "" && $('#option1or2').val() != "everything?") params.push("country="
  +$('.countrySearch').val()+"&");

  if ($('#catagories').val() != "none")params.push("catagory="+$('#catagories').val()+"&");

  if ($('.maxResults').val() != null)params.push("pageSize="+$('.maxResults').val()+"&");


  return params.join("");

}
function topHeadlines(){
    $('.openPage').addClass('hidden');
    $('.news').empty();
    $('.news').append(`<p class="openingStatement1 row">Top Headlines!</p><p class="openingStatement2">Here you can find the top headlines for a given topic, or simply top headlines for by the country and catagory! Try for yourself to see what is breaking the news.</p><form class="allTheOptions"><button type="submit" class="beginFetch" role="button">submit</button>
    <div class="left"><select name="allOrTop" id="option1or2" class="hidden"><option value="top-headlines?" >Top Headlines?</option></select><br><label for="searchQ"> Topic?</label><input class="searchQ" name="searchQ" id="searchQ" type="text" placeholder="Topic of interest" contenteditable="true" aria-placeholder="Topic of interest" ><br><label for="cC"> Country code</label><input class="countrySearch" name="countryCode" id="cC" type="text" placeholder="US,DE,JP,FR,IT" contenteditable="true" aria-placeholder="US,DE,JP,FR,IT" ><br><label for="catagories" class="question"> Catagories</label><select name="catsearch" id="catagories"><option value="none" checked>None</option><option value="entertainment">Entertainment</option><option value="business">Business</option><option value="general">General</option><option value="health">Health</option><option value="science">Science</option><option value="technology">Technology</option><option value="sports">Sports</option></select><br><label for="numResult"> Ideal article count</label><input class="maxResults" type="number" value="10" id="numResult" name="numResults" contenteditable="true"  ></div></form><p class="err"></p><section class="hidden " id="resultsSection"><h2 class="nR"> News Results!</h2><ul class="printResults "></ul></section>`);
}

function everything(){
    $('.openPage').addClass('hidden');
    $('.news').empty();
    $('.news').append(`<p class="openingStatement1 row">Everything!</p><p class="openingStatement2">Here you can find the everything for a given topic(be mindful that everything is broad so topics are a must)! Try for yourself to see what is breaking the news.</p><form class="allTheOptions"><button type="submit" class="beginFetch" role="button">submit</button><div class="left"><select name="allOrTop" id="option1or2" class="hidden" required><option value="everything?">Everything?</option></select><br><label for="searchQ"> Topic?</label><input class="searchQ" name="searchQ" type="text" id="searchQ" placeholder="Topic of interest" contenteditable="true" aria-placeholder="Topic of interest"  required><br><label for="catagories" class="question"> Catagories</label><select name="catsearch" id="catagories"><option  value="none" checked>None</option><option value="entertainment">Entertainment</option><option value="business">Business</option><option value="general">General</option><option value="health">Health</option><option value="science">Science</option><option value="technology">Technology</option><option value="sports">Sports</option></select><br><label for="numResult"> Ideal article count</label><input class="maxResults" type="number" value="10" id="numResult" name="numResults" contenteditable="true"  ></div></form><p class="err"></p><section class="hidden " id="resultsSection"><h2 class="nR row"> News Results!</h2><ul role="list" class="printResults "></ul></section>`);
    console.log('testing 123');
}

function displayResults(responseJson){

  console.log(responseJson);

  $('.err').empty();

  $('.printResults').empty();

$('.printResults').append(`<li role="listitem" class="articleCount row">Total availible articles! ${responseJson.totalResults}</li>`);

  for (let i = 0; i < responseJson.articles.length; i++){
    let timeStr = (responseJson.articles[i].publishedAt);
    let date = new Date(timeStr);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dateStr = month+"/"+day+"/"+year;
    
    

    $('.printResults').append(
      `<li  role="listitem" class="hmm"><div class="article"><div class="articleHead row"><h2><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].author}</p><p role="link"><a  href="${responseJson.articles[i].url}">
      Link to Article</a></p>
      <p class="dateColor">${dateStr}</p></div><br>
      <div class="articleBody ">
      <img src='${responseJson.articles[i].urlToImage}' class="pParker row" alt="photo from article of news"/><br>
      <p>${responseJson.articles[i].description}</p>
      </div></div>
      </li>`
    );}
  
  $('#resultsSection').removeClass('hidden');
}
function testArticle(responseJson){

    for (let i = 0; i < responseJson.articles.length; i++){

    let timeStr = (responseJson.articles[i].publishedAt);
    let date = new Date(timeStr);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dateStr = month+"/"+day+"/"+year;

      $('.openArticle').append(
      `<li role="listitem" class="hmm"><div class="articleHead row"><h2><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].author}</p><p role="link"><a  class="dateColor" href="${responseJson.articles[i].url}">
      Link to Article </a></p>
      <p class="dateColor">${dateStr}</p></div><br>
      <div class="articleBody ">
      <img src='${responseJson.articles[i].urlToImage}' class="pParker row" alt="photo from article of news"/><br>
      <p>${responseJson.articles[i].description}</p>
      </div>
      </li>`
    );}
}

function loadingPage(){

  let it = "https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=27eda7ba8e8f496bb3360c5d192f2299";

  fetch(it)
  .then(response =>  {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => testArticle(responseJson))
}

function getTheNews(params){
let url= base+params+key;

console.log(url);

fetch(url)
  .then(response =>  {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.err').text(`Something went wrong: ${err.message}`);
    });
    }

function gettemTiger(){
 $('.frontPage').submit(event => {
    event.preventDefault();
    getTheNews(formatParams());
    
    });
}

$(gettemTiger());
$(loadingPage());