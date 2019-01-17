'use strict';

const base="https://newsapi.org/v2/"
const key="apiKey=27eda7ba8e8f496bb3360c5d192f2299"
if ($('#option1or2').val()== "everything?")  document.getElementById("cC").disabled = true;
if ($('#option1or2').val()== "top-headlines?")document.getElementById("cC").disabled = false;
function formatParams(){
  let params= [];  

  if ($('#option1or2').val() != null) params.push($('#option1or2').val());
  

  if ($('.searchQ').val() != "") params.push("q="+$('.searchQ').val()+"&");

  if ($('.countrySearch').val() != "") params.push("country="
  +$('.countrySearch').val()+"&");

  if ($('#catagories').val() != "none")params.push("catagory="+$('#catagories').val()+"&");

  if ($('.maxResults').val() != null)params.push("pageSize="+$('.maxResults').val()+"&");


  return params.join("");

}

function displayResults(responseJson){

  console.log(responseJson);

  $('.printResults').empty();

  for (let i = 0; i < responseJson.articles.length; i++){
    let timeStr = (responseJson.articles[i].publishedAt);
    let date = new Date(timeStr);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dateStr = month+"/"+day+"/"+year;

    $('.printResults').append(
      `<li class="hmm"><div class="articleHead col-12"><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].author}</p><p><a href="${responseJson.articles[i].url}">
      Link to Article</a></p>
      <p>${dateStr}</p></div><div class="articleBody col-12">
      <img src='${responseJson.articles[i].urlToImage}' class="pParker" width="500px" height="300px" alt="photo from article of news"/><br>
      <p>${responseJson.articles[i].description}</p>
      </div>
      </li>`
    );}
  
  $('#resultsSection').removeClass('hidden');
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
 $('.allTheOptions').submit(event => {
    event.preventDefault();
    getTheNews(formatParams());
    });
}
$(gettemTiger());