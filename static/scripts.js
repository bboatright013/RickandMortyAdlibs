

//skeleton of the function to submit the completed madlib to save
// $add_adlib.on('click', async function(e){
//     e.preventDefault();
    
//     let data = {
//         $flavor,
//         $size,
//         $rating,
//         $image
//         };
//     let res = await axios.post('/add_lib', data);

// })

// $roster.on('click', async function(e){
//     if(e.target.classList.contains('fa-times')){
//         console.log(e);
//         let char_id = e.target.dataset.id;
//         // console.log(char_id);
//         let slice_point = roster.indexOf(char_id);
//         console.log(slice_point);
//         roster.forEach(element => {
//             roster.pop();
//         });
//         tmp_arr1 = roster.slice(0, slice_point);
//         tmp_arr2 = roster.slice(slice_point + 1, roster.length);
//         console.log(tmp_arr1, tmp_arr2);
//         roster = tmp_arr1.concat(tmp_arr2);
//         // let resp = await axios.post(`/remove_from_roster/${char_id}`);
//         e.target.parentElement.remove();
//         console.log(roster)
//     }
// })



// $character_list.on('click', async function(e){
//     e.preventDefault();
//     console.log(e.target.parentElement.parentElement.children[2].childNodes[0].data);
//     if(e.target.classList.contains('draft-character')){
//         if(roster.length < 5){
//             let char_id = e.target.parentElement.parentElement.children[0].childNodes[0].data;
//             let char_avatar = e.target.parentElement.parentElement.children[1].childNodes[0].currentSrc;
//             let char_name = e.target.parentElement.parentElement.children[2].childNodes[0].data;
//             let data = {
//                 char_id,
//                 char_avatar,
//                 char_name
//             };
//             let resp = await  axios.post('/roster/add/', data);

//             let result = create_draft_pick(e.target.parentElement.parentElement.children[1].childNodes[0].currentSrc,
//                 e.target.parentElement.parentElement.children[0].childNodes[0].data);
//             $roster.append(result);
//         }
//     }
// })







// async function getRoster(){
//     // uploads the cupcakes in the database to the DOM
//     let jsonRoster = await axios.get('/roster');
//     let characters = jsonRoster.data.character;
//     for(char of characters){
//         let res = create_draft_pick(char);
//         $roster.append(res);
//     }
// }

// // Function to pull the character image and character name from the parent object
// // to then push into a list
// function create_draft_pick(img_src, char_id){
//     let html = 
//     `
//     <div> 
//     <i class="fa fa-times" data-id="${char_id}" aria-hidden="true"></i>
//     <img src="${img_src}" class="float-left">
//     </div>
//     `;
//     return html;
// }