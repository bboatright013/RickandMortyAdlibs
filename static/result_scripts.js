$(document).ready(get_characters);

const $save_post = $('#save_post');
const $result_table = $(".result-table");

async function get_characters(){
    try{
        const char1 = sessionStorage.getItem("character1");
        const char2 = sessionStorage.getItem("character2");
        const char3 = sessionStorage.getItem("character3");
        const char4 = sessionStorage.getItem("character4");
        const char5 = sessionStorage.getItem("character5");
        const team =  await get_team([char1,char2,char3,char4,char5]);
        apply_images(team[0].data.image,1);
        apply_names(team[0].data.name,1);

        apply_images(team[1].data.image,2);
        apply_names(team[1].data.name,2);

        apply_images(team[2].data.image,3);
        apply_names(team[2].data.name,3);

        apply_images(team[3].data.image,4);
        apply_names(team[3].data.name,4);

        apply_images(team[4].data.image,5);
        apply_names(team[4].data.name,5);

        console.log(team);
    
    } catch(e){
    alert(e.message);
    }
}

async function get_team(team_ids){
    let our_team = [];
    for(member of team_ids){
        console.log(member);
        let member_obj = await axios.get(`https://rickandmortyapi.com/api/character/${member}`);
        our_team.push(member_obj);
        console.log(member_obj);
    }

    console.log(our_team);
    return our_team;
}

async function apply_images(img, id){
    const img_url = img;
    $( `.char${id}-image` ).append(`<img src="${img_url}">`);
}
async function apply_names(name, id){
    const _name = name;
    $( `.char${id}-name` ).append(`<span>${_name}</span>`);
}

$save_post.on('click', async function(e){
    let result_text = $result_table.text();
    console.log(result_text);
    result_text = format_text(result_text);
    console.log(result_text);
    let data = { result_text };
    let res = await axios.post('/add_lib', data);
    console.log(res);
})

function format_text(text){
    const regexpLinebreak = /\n|\t|\r/g;
    const regexpWhitespace = /\s*[^\S]|[^\S]\s*/g;
    let tmp_line1 = text.replace(regexpWhitespace, ' ');
    let return_text = tmp_line1.replace(regexpLinebreak, ' ');

    return return_text;
}