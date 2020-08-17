$(document).ready(get_characters);

const $new_team = $('.new-team');
const $confirm_team = $('.confirm-team');
const $roster = $('.roster');
const $character_table = $('.characters-table');
const $characters = $('.characters');
const $next = $('.next');
const $back = $('.back');
const base_url = 'https://rickandmortyapi.com/api/character';
let next_page = '';
let prev_page = '';
let roster = [];

//empty the roster and remove images from page
$new_team.on('click', function(e){
let start_count = roster.length
for(let x = 0; x <= start_count; x++){
    roster.pop();
}
console.log(roster);
$roster.empty();
})

//commit the roster to sessionStorage for later use and run animations
$confirm_team.on('click', function(e){
let start_count = roster.length
for(let x = 0; x <= start_count; x++){
    sessionStorage.setItem(`character${x+1}`,roster[x])
}
console.log('team confirmed');
})


// Go to the next page
$next.on('click', async function(e){
    let response = await axios.get(`${next_page}`);
    if(response.data.info.next != null){
        next_page = response.data.info.next;
    }
    if(response.data.info.prev != null){
        prev_page = response.data.info.prev;
    }
    let characters = response.data.results;
    console.log(characters);
    console.log(next_page, prev_page)
    $character_table.empty();
    for(char of characters){
        let char_html = create_char_html(char);
        $character_table.append(char_html);
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
    let characters = response.data.results;
    console.log(characters);
    console.log(next_page, prev_page)
    $character_table.empty();
    for(char of characters){
        let char_html = create_char_html(char);
        $character_table.append(char_html);
    }
})
//get the characters from the RickandMorty API
async function get_characters(){
    let response = await axios.get(`${base_url}`);
    if(response.data.info.next != null){
        next_page = response.data.info.next;
    }
    if(response.data.info.prev != null){
        prev_page = response.data.info.prev;
    }
    let characters = response.data.results;

    for(char of characters){
        let char_html = create_char_html(char);
        $character_table.append(char_html);
    }
}

//creates the html to build 
function create_char_html(char){
    const html = `
    <tr>
      <th scope="row">${char.id}</th>
      <td><img src="${char.image}"></td>
      <td>${char.name}</td>
      <td>${char.species}</td>
      <td>${char.origin.name}</td>
      <td data-id="${char.id}"><button class="btn btn-primary draft-character">Draft</button>
    </tr>
    `;
    return html;
}

//adds character to the roster and the roster gallery
$character_table.on('click', async function(e){
    if(e.target.classList.contains('draft-character')){
        if(roster.length < 5){
            const result = create_draft_pick(e.target.parentElement.parentElement.children[1].childNodes[0].currentSrc);
            $roster.append(result);
            roster.push(e.target.parentElement.parentElement.children[0].childNodes[0].data);
        }
    }
})

// Function to pull the character image from the parent object
function create_draft_pick(img_src){
    const html = 
    `
    <img src="${img_src}" class="float-left">
    `;
    return html;
}
