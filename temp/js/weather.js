const key = 'GrnTM09fcEuXvJRdrOXQ273aR0NtJtIf'
const nextkey = 'GrnTM09fcEuXvJRdrOXQ273aR0NtJtIf'

$("#searchForm").on('submit', (e) => {
    let searchText = $('#searchText').val();
    e.preventDefault();
    getCity(searchText);
})

// function searchCity(){
//     let searchText = $('#searchText').val();
//     getCity(searchText);
// }

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    console.log(data[0]);

    return data[0];
}

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    let output = '';

    data.forEach((item, index, array) => {
        output += `
        <div class="row">
            <span class="pt-1" onclick="getWeather(${item.Key})">${item.LocalizedName} which is a ${item.Type},m in the ${item.AdministrativeArea.LocalizedType} of ${item.AdministrativeArea.LocalizedName}, ${item.Country.LocalizedName}</span>
        </div>`

        $("#cities").html(output);
    })

    console.log(output);

    return data[0];
}

//  getCity('huntersville');
// getWeather("329260");
// getCity('manchester')
// .then(data => {
//     return getWeather(data.Key)
// }).then(data => console.log(data))
// .catch(err => console.log(err));