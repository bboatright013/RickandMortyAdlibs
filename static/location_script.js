$(document).ready(get_locations);


const $location_table = $('.location-table');
const $next = $('.next');
const $back = $('.back');
const base_url = 'https://rickandmortyapi.com/api/location';
let next_page = '';
let prev_page = '';

//get the characters from the RickandMorty API
async function get_locations(){
    let response = await axios.get(`${base_url}`);
    if(response.data.info.next != null){
        next_page = response.data.info.next;
    }
    if(response.data.info.prev != null){
        prev_page = response.data.info.prev;
    }
    let locations = response.data.results;

    for(place of locations){
        let location_html = create_location_html(place);
        $location_table.append(location_html);
    }
}

//creates the html to build 
function create_location_html(place){
    const html = `
    <tr>
      <th scope="row">${place.id}</th>
      <td>${place.name}</td>
      <td>${place.type}</td>
      <td>${place.dimension}</td>
    </tr>
    `;
    return html;
}

// Go to the next page
$next.on('click', async function(e){
    let response = await axios.get(`${next_page}`);
    if(response.data.info.next != null){
        next_page = response.data.info.next;
    }
    if(response.data.info.prev != null){
        prev_page = response.data.info.prev;
    }
    let locations = response.data.results;
    console.log(next_page, prev_page)
    $location_table.empty();
    for(place of locations){
        let location_html = create_location_html(place);
        $location_table.append(location_html);
    }
})
//Go to the previous page
$back.on('click', async function(e){
    let response = await axios.get(`${prev_page}`);
    if(response.data.info.next != null){
        next_page = response.data.info.next;
    }
    if(response.data.info.prev != null){
        prev_page = response.data.info.prev;
    }
    let locations = response.data.results;
    console.log(next_page, prev_page)
    $location_table.empty();
    for(place of locations){
        let location_html = create_location_html(place);
        $location_table.append(location_html);
    }
})