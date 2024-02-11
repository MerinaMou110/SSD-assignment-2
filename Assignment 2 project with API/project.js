let data=[];

const loadAllData = () => {
    clearContentContainer();

    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
   .then((res) => res.json())

    .then((responseData) => {
    data = responseData.data;
   
    displayData(data);
    
});


};

const loadMusicData = () => {
    clearContentContainer();
    fetch("https://openapi.programming-hero.com/api/videos/category/1001")
   .then((res) => res.json())

   .then((responseData) => {
    data = responseData.data;
    displayData(data);
});

};

const loadComedyData = () => {
    clearContentContainer();
    fetch("https://openapi.programming-hero.com/api/videos/category/1003")
   .then((res) => res.json())

   .then((responseData) => {
    data = responseData.data;
    displayData(data);
});

};

const loadDrawingData = () => {
    clearContentContainer();
 
    fetch("https://openapi.programming-hero.com/api/videos/category/1005")
   .then((res) => res.json())
   .then((responseData) => {
    data = responseData.data;
    displayData(data);
});


};

//display
const displayData=(data)=>{
    
    const contentcontainer=document.getElementById("content-container");
    if (data.length === 0) {
        contentcontainer.innerHTML = `
            <div class="empty-content">
                <img class="ic-img" src="/logo/Icon.png" alt="">
                <p> Oops!! Sorry, There is no <br> content here</p>
                
            </div>`;
    } else {
        
            data.forEach(item => {
            console.log(item);
            const formattedPostedDate = item.others.posted_date
            ? formatPostedDate(item.others.posted_date)
            : '';
            
            const card = document.createElement("div");
            card.classList.add("box");
            card.innerHTML=
             `
             <div class="box-content">
                <div class="img-container">
                    <img class="box-img" src=${item.thumbnail} alt="">
                    <p class="posted-time">${formattedPostedDate}</p>
                     
                </div>
                 
                 <div class="author-info">
                    <img class="pro-img" src=${item.authors[0].profile_picture} alt="">
                    <div class="text-info">
                    <p>${item.title}</p>
                    <div class="verify">
                        <p>${item.authors[0].profile_name}</p>
                        ${item.authors[0].verified ? '<span class="verified-icon"><i class="fa-solid fa-check"></i></span>' : ''}
                    </div>
                    
                     <p>${item.others.views} views</p>

                    </div>
                    

                 </div>
                

             </div>

            `;
            contentcontainer.appendChild(card);

        });
     }
   

};

const formatPostedDate = (times) => {
    // Assuming posted_date is in seconds
    const postedDate = new Date(times * 1000); 
    const hours = postedDate.getUTCHours();
    const minutes = postedDate.getUTCMinutes();
    
    return `${hours} hours ${minutes} minutes ago`;
};

// clean the previous data
function clearContentContainer() {
    const contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";
}


// sort views

const sortViews = () => {
    if (data.length > 0) {
          
        data.forEach(item=>{
            item.others.viewsNumeric=parseFloat(item.others.views);

        });
        // Sort data in descending order based on views
        data.sort((a, b) => b.others.viewsNumeric - a.others.viewsNumeric);

        // Clear and display sorted data
        clearContentContainer();
        displayData(data);
    }

    
};


document.getElementById("blog-button").addEventListener("click", function() {
  
    window.location.href = "blogs.html";
});


loadAllData();

