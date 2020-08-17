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
        const team =  await get_team(char1,char2,char3,char4,char5);
        apply_images(team.data[0].image,1);
        apply_names(team.data[0].name,1);

        apply_images(team.data[1].image,2);
        apply_names(team.data[1].name,2);

        apply_images(team.data[2].image,3);
        apply_names(team.data[2].name,3);

        apply_images(team.data[3].image,4);
        apply_names(team.data[3].name,4);

        apply_images(team.data[4].image,5);
        apply_names(team.data[4].name,5);

        console.log(team);
    
    } catch(e){
    alert(e.message);
    }
}

async function get_team(var1, var2, var3, var4, var5){
    const team = await axios.get(`https://rickandmortyapi.com/api/character/${var1},${var2},${var3},${var4},${var5}`);
    return team;
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