//const { default: axios } = require("axios");

//===========INFINITE SCROLL ===============//
const baseUrl = "https://tarmeezAcademy.com/api/v1";
let currentPage = 1
let lastpage = 1
window.addEventListener("scroll", function(){
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if(endOfPage && currentPage < lastpage)
    {
        
        currentPage = currentPage + 1
        getPosts(false, currentPage  )
    }
});
//===========//INFINITE SCROLL// ===============//




//const { default: axios } = require("axios");
setipUI()
//const baseUrl = "https://tarmeezAcademy.com/api/v1";
//On appel la focntion body 
getPosts()

//actualisation de la page apartire d'une fonction 
function getPosts(reaload = true , page = 1) {
  
 
  axios.get(`${baseUrl}/posts?limit=2&page=${page}`).then((response) => {
    //console.log(respons)
    const posts = response.data.data;
    lastpage = response.data.meta.last_page

    if(reaload){
        document.getElementById("posts").innerHTML = ""
       // document.getElementById("post-comment").innerHTML = ""
    }
    

    for (post of posts) {
      //On test si le titre est vide affiche nous rien !
      let postTitle = "";

//==SHOW or HIDE (edit BUTTON==//)

let user = getCurrentUser()
let isMyPost = user != null && post.author.id == user.id
let buttonContent = ``

if(isMyPost){
    buttonContent =
    `
    <button  class="btn btn-danger " onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">delete</button>
    <button class="btn btn-secondary " onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">edit</button>
    `
}
//==//SHOW or HIDE (edit BUTTON)//==//

      if (post.title != null) {
        postTitle = post.title;
      }
      const author = post.author;
      let content = `
 
    <div class="card shadow ">
        <div class="card-header">
            <img class="rounded-cercle border-3" src="${author.profile_image}" alt="" id="avatar">
            <b>${author.username}</b>
            ${buttonContent}
        </div>
        <div class="card-body" onclick="postClick(${post.id})">
            <img class="w-100 " src="${post.image}" alt="">
            <h6 class="mt-1"> ${post.created_at}</h6>
            <h5>${postTitle}</h5>
            <p>${post.body}</p>
                <hr>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                <span>(${post.comments_count}) Comments</span>
                <span id="post-tags-${post.id}"></span>
                </div>
        </div>
    </div>
               
    `;
      document.getElementById("posts").innerHTML += content;
      //On ajoute les tags
      const currentPostTagsId = ` post-tags-${post.id}`;
      // document.getElementById(currentPostTagsId).innerHTML =""
      for (tag of post.tags) {
        let tagsContent = `
         <button class ="btn btn-sm rounded-5" style="background-color: gray; color: white;">${tag.name} </button>
         `;
        document.getElementById(currentPostTagsId).innerHTML += tagsContent;
      }
    }
  });
}
// const baseUrl = "https://tarmeezAcademy.com/api/v1"
// axios.get(`${baseUrl}/posts`).then((response) => {
//   //console.log(respons)
//   const posts = response.data.data;
//   document.getElementById("posts").innerHTML = ""

//   for (post of posts) {


//    //On test si le titre est vide affiche nous rien !
//    let postTitle = ""
//    if(post.title != null)
//    {
//     postTitle = post.title
//    }
//    const author = post.author
//    let content = `

//     <div class="card shadow ">
//         <div class="card-header">
//             <img class="rounded-cercle border-3" src="${author.profile_image}" alt="" id="avatar">
//             <b>${author.username}</b>
//         </div>
//         <div class="card-body">
//             <img class="w-100 " src="${post.image}" alt="">
//             <h6 class="mt-1"> ${post.created_at}</h6>
//             <h5>${postTitle}</h5>
//             <p>${post.body}</p>
//                 <hr>
//                 <div>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
//                     <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//                     </svg>
//                 <span>(${post.comments_count}) Comments</span>
//                 <span id="post-tags-${post.id}"></span>
//                 </div>
//         </div>
//     </div>



//     `;
//     document.getElementById("posts").innerHTML +=content 
//     //On ajoute les tags 
//       const currentPostTagsId = ` post-tags-${post.id}`
//    // document.getElementById(currentPostTagsId).innerHTML =""
//       for(tag of post.tags){

//          let tagsContent = 
//          `
//          <button class ="btn btn-sm rounded-5" style="background-color: gray; color: white;">${tag.name} </button>
//          `
//          document.getElementById(currentPostTagsId).innerHTML += tagsContent 

//     }
//   }
// })

function registerBtnClicked() {
   
    const name = document.getElementById("register-name-input").value
    const username = document.getElementById("register-username-input").value
    const password = document.getElementById("register-password-input").value
    const image = document.getElementById("register-image-input").files[0]
 

    let formData = new FormData()
    formData.append("name", name)
    formData.append("username", username)
    formData.append("password", password)
    formData.append("image", image)

   

    const headers = {
        "Content-Type": "multipart/from-data", 
    }
   
    const url = `${baseUrl}/register`
    axios.post(url, formData,{
        headers: headers
    })
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("register-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showAlert(" New User Registed successfully", "success")
            setipUI()

        }).catch((error) => {
            const message = error.response.data.message
            showAlert(message, "danger")
        })
}

function loginBtnClick() {
    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value
    const params = {
        "username": username,
        "password": password
    }
    const url = `${baseUrl}/login`
    axios.post(url, params)
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("login-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showAlert("Logged in successfully", "success")
            setipUI()

        })

}

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showAlert("Logged out successfully", "success")
    setipUI()
    //console.log("logged out successfully")

}

//Create New Post
function createNewPostClicked() {
    let postId = document.getElementById("post-id").value
    let isCreate = postId == null || postId == ""
    const title = document.getElementById("post-title-input").value
    const body = document.getElementById("post-body-input").value
    const image = document.getElementById("post-file-input").files[0]
    const token = localStorage.getItem("token")

    let formData = new FormData()
    formData.append("body", body)
    formData.append("title", title)
    formData.append("image", image)

    let url = ``

    const headers = {
        "Content-Type": "multipart/from-data",
        "authorization": ` Bearer ${token} `
    }

    //On test la variable de post avec un boolien 
    if(isCreate){
     url = ` ${baseUrl}/posts`
    

    }else{
        formData.append("_method", "put")
        url = ` ${baseUrl}/posts/${postId}`
     
        
    }

    axios.post(url, formData,
        {
            headers: {
                "Content-Type": "multipart/from-data",
                "authorization": ` Bearer ${token} `
            }
        })
        .then((response) => {

       
            showAlert("New Post has been Created", "success")
            const modal = document.getElementById("create-post-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()


        }).catch((error) => {
            const message = error.response.data.message
            showAlert(message, "danger")
            getPosts()

        })


    


}




//Fonction d'alerts 
function showAlert(customMessage, type = "success") {
    const alertPlaceholder = document.getElementById('success-alert')

    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    alert(customMessage, type)
    //hide the alert 
    setTimeout(() => {
        const alertToHide = bootstrap.Alert.getOrCreateInstance('#success-alert')
        alertToHide.close()
    }, 2000);

}

//Hide button 
function setipUI() {
    const token = localStorage.getItem("token")
    const loggedDev = document.getElementById("logged-in-dev")
    const logoutDiv = document.getElementById("logout-dev")
   // const createDiv = document.getElementById("add-btn")
    const sername= document.getElementById("nav-username")
    const avatar= document.getElementById("avatar")
    if (token == null) //user is guest (not logged in)
    {
        loggedDev.style.setProperty("display", "flex", "important")
        logoutDiv.style.setProperty("display", "none", "important")
       // createDiv.style.setProperty("display", "none", "important")
       // avatar.style.setProperty("display", "none", "important")
        //sername.style.setProperty("display", "none", "important")

    } else {
        //for logged in user
        loggedDev.style.setProperty("display", "none", "important")
        logoutDiv.style.setProperty("display", "flex", "important")
        //createDiv.style.setProperty("display", "block", "important")
        //avatar.style.setProperty("display", "block", "important")
        //sername.style.setProperty("display", "block", "important")
        const user = getCurrentUser()
        document.getElementById("nav-username").innerHTML = user.username
        document.getElementById("avatar").src = user.profile_image
    }
}

function getCurrentUser()
{
    let user = null
    const strorageUser = localStorage.getItem("user")

    if(strorageUser != null)
    {
        user = JSON.parse(strorageUser)
    }
    return user
}

//==============Location fucntion==========//

function postClick(postId){
  //  alert(postId)
   window.location = `postDetails.html?postId=${postId}`
}

//==============Location function==========//


//==============urlParams==========//

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("postId")
//console.log(id)
setipUI()
//==============//urlParams//==========//
getPost()
function getPost() {
 
    axios.get(`${baseUrl}/posts/${id}`).then((response) => {
      //console.log(respons)
      const post = response.data.data
      const comments = post.comments
      const author = post.author
      document.getElementById("username-span").innerHTML = author.username
      let commentsContent = ``
      for (comment of comments){
        commentsContent +=
        `
        <!--COMMENTS-->
                    <div id="comments">
                        <!--COMMENT-->
                        <div class="p-3 comment">
                            <!--PROFILE PIC + USERNAME-->
                            <div>
                                <img class="rounded-circle border-3" src="${comment.author.profile_image}" alt="avatar" id="avatar">
                                <b>${comment.author.username}</b>
                            </div>
                    
                            <!--//PROFILE PIC + USERNAME//-->
                            <!--COMMENT BODY-->
                            <div>
                               ${comment.author.body}
                            </div>
                            <hr>
                            <!--//COMMENT BODY//-->
                    
                        </div>
                        <!--//COMMENT//-->
                    
                    </div>
                    <!--//COMMENTS//-->
        `
      }
    //console.log(response.data)
    document.getElementById("post-comment").innerHTML =  ""
    const postContent = `

                <div class="card shadow ">
                    <div class="card-header">
                        <img class="rounded-cercle border-3" src="${author.profile_image}" id="avatar">
                        <b>@${author.username}</b>
                    </div>
                    <div class="card-body">
                        <img class="w-100 " src="${post.image}" alt="">
                        <h6 class="mt-1"> ${post.created_at}</h6>
                        <h5>${post.title}</h5>
                        <p>${post.body}</p>
                        <hr>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
                                viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                            <span>${post.comments_count} Comments</span>
                        </div>
                    </div>

                    <div id="comments">
                    ${commentsContent}
                    </div>
                    <div class="input-group mb-3" id="add-comment-dev">
                    <input id="comment-input" type="text" placeholder="add your comment here .." class="form-control">
                    <button class="btn btn-outline-primary" type="button" onclick="createCommentClicked()">Send</button>
                    </div>

                </div>

    `
        document.getElementById("post-comment").innerHTML =  postContent
      
  
    });
  }

 function createCommentClicked()
 {
    let commetBody =document.getElementById("comment-input").value
   // alert(commetBody)
    let params = {
        "body" : commetBody
    }
    let token = localStorage.getItem("token")
    let url = ` ${baseUrl}/posts/${id}/comments`
    axios.post(url, params, {
        headers:{
           
            "authorization": ` Bearer ${token} `
        }
    }).then((response)=>{
        console.log(response.data)
        showAlert("The comment has been created successfully", "success")
        getPost()
    }).catch((error)=>{
        const errorMessage = error.response.data.message
        showAlert(errorMessage, "danger" )
    })

 }

 //==========Edit post=========/

 function editPostBtnClicked(postObject)

 {
   let post = JSON.parse(decodeURIComponent(postObject))
//    console.log(post)
//    return
   document.getElementById("post-modal-submit-btn").innerHTML = "Update"
   document.getElementById("post-id").value = post.id
   document.getElementById("post-title-input").value = post.title
   document.getElementById("post-body-input").value = post.body
    document.getElementById("post-modal-title").innerHTML = "Edit Post"
    let postModle = new bootstrap.Modal(document.getElementById("create-post-modal"),{})
    postModle.toggle()
 }

 //==========//Edit post//=========/


function addBtnClicked()
{
   
       document.getElementById("post-modal-submit-btn").innerHTML = "Create"
       document.getElementById("post-id").value = ""
       document.getElementById("post-title-input").value = ""
       document.getElementById("post-body-input").value = ""
        document.getElementById("post-modal-title").innerHTML = "reate  A new Post"
        let postModle = new bootstrap.Modal(document.getElementById("create-post-modal"),{})
        postModle.toggle()

}





 //==========Delete post=========/

 function deletePostBtnClicked(postObject)

 {
   let post = JSON.parse(decodeURIComponent(postObject))
   document.getElementById("delete-post-id-input").value = post.id
   let postModle = new bootstrap.Modal(document.getElementById("delete-post-modal"),{})
    postModle.toggle()
 }

 //==========//Delete post//=========/


 //=======confirPostDelete=====//

 function confirmPostDelete()
 {
    const  token = localStorage.getItem("token")
    const postId = document.getElementById("delete-post-id-input").value 
    const url = `${baseUrl}/posts/${postId}`
    const headers = {
        "Content-Type": "multipart/from-data",
        "authorization": ` Bearer ${token} `
    }
    axios.delete(url, {
        headers:  headers
    })
        .then((response) => {
            // localStorage.setItem("token", response.data.token)
            // localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("delete-post-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showAlert("The post has benn deleted successfully", "success")
            getPost()

        }).catch((error)=>{
            const message = error.response.data.message
            showAlert(message, "danger")
        })

    }

 //=======//confirPostDelete//=====//

//=================fonction ============//

// function registerBtnClicked() {
   
//     const name = document.getElementById("register-name-input").value
//     const username = document.getElementById("register-username-input").value
//     const password = document.getElementById("register-password-input").value
//     const image = document.getElementById("post-file-input").files[0]
 

//     let formData = new FormData()
//     formData.append("name", name)
//     formData.append("username", username)
//     formData.append("password", password)
//     formData.append("image", image)

   

//     const headers = {
//         "Content-Type": "multipart/from-data",
       
//     }
//     axios.post(url, formData,
//         { headers: headers})
//     const url = `${baseUrl}/register`
//     axios.post(url, formData,{
//         headers: headers
//     })
//         .then((response) => {
//             localStorage.setItem("token", response.data.token)
//             localStorage.setItem("user", JSON.stringify(response.data.user))

//             const modal = document.getElementById("register-modal")
//             const modalInstance = bootstrap.Modal.getInstance(modal)
//             modalInstance.hide()
//             showAlert(" New User Registed successfully", "success")
//             setipUI()

//         }).catch((error) => {
//             const message = error.response.data.message
//             showAlert(message, "danger")
//         })
// }
//=================//fonction //============//




