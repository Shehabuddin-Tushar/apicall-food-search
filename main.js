let spinner=document.getElementById("myspinner");
let myalldatas=document.querySelector(".myalldatas");
let singlewrapper=document.getElementById("single-details");
    
document.getElementById("btn-food").addEventListener("click",()=>{

    let searchfood=document.getElementById("myfood");
    let searchvalue=searchfood.value;
    singlewrapper.innerHTML="";
    if(searchvalue==""){

        myalldatas.innerHTML="<h2 class='text-center'>no result found</h2>";
    }else{
        myalldatas.innerHTML="";
        spinner.style.display="block";

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchvalue}`)
        .then(res=>res.json()).then(data=>allfooddata(data));
        searchfood.value="";
    }

   

})
/*single food details */
let detailsfood=async(id)=>{

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data=await response.json();
   

    let maindata=data.meals[0];
    console.log(maindata)
   
    singlewrapper.innerHTML="";
    let singeldata=document.createElement("div");
    singeldata.classList.add("col-md-12","mb-4","mx-auto");
    singeldata.innerHTML=`
      <div class="card">
        <img src="${maindata.strMealThumb}" height="300" class="card-img-top" alt="...">
        <div class="card-body">
         <h5 class="card-title">${maindata.strMeal}</h5>
         <p>${(maindata.strInstructions).slice(0,200)}.</p>
        </div>
       </div>
    `;

    singlewrapper.appendChild(singeldata);
   
}

/*search food */
let allfooddata=(data)=>{

    let alldata=data.meals
    console.log(alldata)
    if(alldata==null){
        spinner.style.display="none";
        myalldatas.innerHTML="<h2 class='text-center'>This type of food is not available here.</h2>";
    }else{
        alldata.forEach((singlefood)=>{
       
            let singeldata=document.createElement("div");
            singeldata.classList.add("col-md-4","mb-4");
            singeldata.innerHTML=`
              <div class="card">
                <img src="${singlefood.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                 <h5 class="card-title">${singlefood.strMeal}</h5>
                 <div class="btn-group" role="group" aria-label="Basic example">
                  <a  class="btn btn-danger" href="${singlefood.strYoutube}" target="_blank">youtube</a>
                  <a  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="detailsfood('${singlefood.idMeal}')">Details</a>
    
                 </div>
                </div>
               </div>
            `;
            
            
            
            setTimeout(()=>{
                myalldatas.appendChild(singeldata);
                spinner.style.display="none";
            },1000)
      
    
        });
    
    }
    

}
allfooddata();

