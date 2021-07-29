/// <reference path="jquery-3.5.1.js" />
"use strict";

$(()=> {
    $("#allCountriesButton").on("click", async function(event) {
        event.preventDefault();
        $("#diaplayDetails").empty();
        try {
            const allCountries = await getAllDetailsAsync(`https://restcountries.eu/rest/v2/all`);
            displayAllDetails(allCountries);
        } 
        catch (err) {
            alert(err);
        }
    });

   // get details from any ajax
    function getAllDetailsAsync(url) {  
        return $.ajax({
            url: url
        });
    }
    
   // display details
    function displayAllDetails(allCountries) { 
        for(const item of allCountries) {
            $("#diaplayDetails").append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.topLevelDomain}</td>
                    <td>${item.capital}</td>
                    <td>${getDataOfCurrency(item)}</td>        
                    <td>${item.borders}</td>
                    <td>
                        <img class="imgCountries" src="${item.flag}">
                    </td>
                </tr>`);
        }
    }

    function getDataOfCurrency(countryOne) {
        const arrOfCurrency = [];
        for(const currency of countryOne.currencies ){
            arrOfCurrency.push(currency.code);
        }
        return arrOfCurrency;
    }

  
    $(".searchByCountry").on("click", async function () { // action of searching
        try {
            $("#diaplayDetails").empty();
            const countryInputVal = $(".countryInput").val();
            const api_link = `https://restcountries.eu/rest/v2/name/${countryInputVal}`;
            $(".countryInput").val("");
            const dataCountry = await getAllDetailsAsync(api_link);
            displayAllDetails(dataCountry);
        } 
        catch (err) {
            alert("Error! please try again to insert details");  
        }
    });
});

