$(document).ready(get_episodes);


const $episode_table = $('.episode-table');
const $next = $('.next');
const $back = $('.back');
const base_url = 'https://rickandmortyapi.com/api/episode';
let next_page = '';
let prev_page = '';

//get the characters from the RickandMorty API
async function get_episodes(){
    let response = await axios.get(`${base_url}`);
    if(response.data.info.next != null){
        next_page = response.data.info.next;
    }
    if(response.data.info.prev != null){
        prev_page = response.data.info.prev;
    }
    let episodes = response.data.results;

    for(epi of episodes){
        let episode_html = create_episode_html(epi);
        $episode_table.append(episode_html);
    }
}

//creates the html to build 
function create_episode_html(epi){
    const html = `
    <tr>
      <th scope="row">${epi.id}</th>
      <td>${epi.name}</td>
      <td>${epi.air_date}</td>
      <td>${epi.episode}</td>
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
    let episodes = response.data.results;
    console.log(next_page, prev_page)
    $episode_table.empty();
    for(epi of episodes){
        let episode_html = create_episode_html(epi);
        $episode_table.append(episode_html);
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
    let episodes = response.data.results;
    console.log(next_page, prev_page)
    $episode_table.empty();
    for(epi of episodes){
        let episode_html = create_episode_html(epi);
        $episode_table.append(episode_html);
    }
})