function loadFunction(){
	console.log('loaded');
	const xhr=new XMLHttpRequest();
    const url="https://covid-193.p.rapidapi.com/countries";
	xhr.responseType="json";
	xhr.onreadystatechange=()=>{
    	if(xhr.readyState===XMLHttpRequest.DONE){
        	console.log(xhr.response);
            let countryArray=xhr.response["response"];
            let html2="";
            countryArray.forEach((item)=>{
                html2+="<option value="+item+">";
            });
            document.getElementById("countryOptions").innerHTML=html2; 
    	}
	};
	xhr.open('GET',url);
    xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "ea51dde956msh3e3aa09e434616ep19dc25jsn25784f048d5e");
	xhr.send();
}
document.getElementById('button').addEventListener("click",()=>{
	let countryName=document.getElementById("countryNameId").value;
	const xhr=new XMLHttpRequest();
	const url="https://covid-193.p.rapidapi.com/statistics?country="+countryName;
	xhr.responseType="json";
	xhr.onreadystatechange=()=>{
    	if(xhr.readyState===XMLHttpRequest.DONE){
        	console.log(xhr.response);
        	let countryResult=xhr.response;
        	document.getElementById("result").innerHTML=`<p>Country Name: ${countryResult.parameters.country.toUpperCase()}<br>
        	Confirmed Cases: ${countryResult.response[0].cases.total}<br>Deaths: ${countryResult.response[0].deaths.total}<br>Recovered: 
            ${countryResult.response[0].cases.recovered}<br>Active Cases: ${countryResult.response[0].cases.active}</p>`;
    	}
	};
	xhr.open('GET',url);
    xhr.onloadend = function() {
        if(xhr.status == 404){
            document.getElementById("result").innerHTML=`<p>Please Enter a Valid Country Name. [Make sure the spelling of the country
            matches the spelling given in the Country List to your Left.]</p>`;
            throw new Error(url + ' replied 404');
        }
        if(xhr.response.results==0){
            document.getElementById("result").innerHTML=`<p>Please Enter a Valid Country Name. [Make sure the spelling of the country
            matches the spelling given in the Country List.] This error can also occur if you have entered a Country 
            Name which has not been affected with Covid-19.</p>`;
            console.log("Error");
        }
    }
    xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "ea51dde956msh3e3aa09e434616ep19dc25jsn25784f048d5e");
    xhr.send();	
})

const xhr=new XMLHttpRequest();
	const url="https://api.covid19api.com/summary";
	xhr.responseType="json";
	xhr.onreadystatechange=()=>{
    	if(xhr.readyState===XMLHttpRequest.DONE){
        	let html="";
        	html=`<p>New Confirmed: ${xhr.response.Global["NewConfirmed"]}<br>New Deaths: ${xhr.response.Global["NewDeaths"]}<br>
        	New Recovered: ${xhr.response.Global["NewRecovered"]}<br>Total Confirmed: ${xhr.response.Global["TotalConfirmed"]}<br>
        	Total Deaths: ${xhr.response.Global["TotalDeaths"]}<br>Total Recovered: ${xhr.response.Global["TotalRecovered"]}</p>`;
        	document.getElementById("totalResult").innerHTML=html;
    	}
	};
	xhr.open('GET',url);
	xhr.send();
