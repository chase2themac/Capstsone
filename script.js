'use strict';

const base="https://newsapi.org/v2/"
const key="apiKey=27eda7ba8e8f496bb3360c5d192f2299"

function formatParams(){
  let params= [];
  if ($('#option1or2').val()) params.push($('#option1or2').val());
  if ($('.searchQ').val() != null) params.push("q="+$('searchQ').val()+"&");
  if ($('.countrySearch').val() != null) params.push("country="
  +$('.countrySearch').val()+"&");
  if ($('#catagories').val() != "none")params.push("catagory="+$('#catagories').val()+"&");
  if ($('.maxResults').val() != null)params.push("pageSize="+$('.maxResults').val()+"&");

  return params.join();
}

function displayResults(responseJson){

  console.log(responseJson);

  $('.printResults').empty();

  for (let i = 0; i < responseJson.articles.length; i++){

    $('.actualResults').append(
      `<li><h3>${responseJson.articles[i].fullName}</h3>
      <p>${responseJson.articles[i].description}</p>
      <p> <a href=${responseJson.articles[i].url}>${responseJson.articles[i].url}</a></p>
      </li>`
    )};
  
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
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    }

function gettemTiger(){
 $('form').submit(event => {
    event.preventDefault();
    getTheNews();});
}
$(gettemTiger());