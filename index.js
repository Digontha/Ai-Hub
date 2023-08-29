const loaData=async (isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data =await res.json() ;
    const targetData=data.data.tools
    // console.log(targetData)
    addData(targetData,isShowAll)
}




const addData = (tools,isShowAll) =>{
             
             if(!isShowAll){
              tools=tools.slice(0,5)
             }

           const ShowButton=document.getElementById("show-btn")
           if(tools.length > 4 && ! isShowAll){
            ShowButton.classList.remove('hidden')
           }else{
            ShowButton.classList.add('hidden')
           }
           const cardContainer =  document.getElementById("card-container")
       
           tools.forEach(data=>{

            // console.log(data)

            const div = document.createElement("div")
            div.classList.add("card", "w-9/12", "mx-auto", "bg-base-100", "shadow-xl");
            div.innerHTML=`
           <div onclick="showDetails('${data.id}')">
           <figure><img src="${data.image}" alt="Shoes" /></figure>
           <div class="card-body">

             <h2 class="card-title">${data.name}</h2>

             <p><small>${data.published_in}<small></p>
             <hr class="mt-5 mb-5">

           <h2 class="card-title">Features</h2>
          <ol class="text-base">
          <li">1.${data.features[0]}</li>
          <li>2.${data.features[1]}</li>
          <li>3.${data.features[2]}</li>
          </ol>

             <div class="card-actions justify-end">
               <button class="btn btn-primary">Buy Now</button>
             </div>
           </?div>
           </div>
            `
            cardContainer.appendChild(div)
        })

       

        
}

const ShowAll = () => {
          
  loaData(true)
}


const showDetails =async (id) => {
       
       

       const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
       const detailsData  = await res.json()
       const data = detailsData
      //  console.log('hello',data)
      showDetailsInModal(data)
}


const showDetailsInModal =(details)=>{
//  console.log(details)  
  
  my_modal_3.showModal()


  // let prices = details.data.pricing.map(value => console.log(value.price));
  // console.log(prices)

  const detailsContainer = document.getElementById("details-container")
  detailsContainer.innerText=''
  const div = document.createElement("div")
  div.innerHTML=`
  
  <form method="dialog" class="modal-box">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>


    <div>
             
    <h3 class="font-bold text-lg mb-10">${details.data.tool_name}</h3>
    <p class="mb-5"><span class="text-xl font-semibold">Description:</span> ${details.data.description}</p>

   <img src="${details.data.image_link[1]}" alt="Not Found">

   
    
    
    </div>



  </form>

  `
  detailsContainer.appendChild(div)
  
}

loaData()