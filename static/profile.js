
const $story_table = $(".story-table");

$story_table.on('click', async function(e){
    const row = e.target.parentElement.parentElement;
    const adlib_id = e.target.dataset.id;
    let res = await axios.post(`/delete_lib/${adlib_id}`);
    row.remove();
    console.log(res);
})