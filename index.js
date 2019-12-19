
document.addEventListener("DOMContentLoaded",()=>{
    let select = document.querySelector("#select")
    let content= document.querySelector("#content")
    let form = document.querySelector("#form")
    let ul=document.querySelector("#review")
    const getMovie = async()=>{
        try{
            let res = await axios.get("https://ghibliapi.herokuapp.com/films")
            // debugger
            let moviesArr=res.data
            moviesArr.forEach(el=>{
                let option=document.createElement("option")
                option.innerText=el.title
                option.value=el.id
                select.appendChild(option)
            })
        }catch(err){
            debugger
        }
    }

    // "2baf70d1-42bb-4437-b551-e5fed5a87abe"
    const getInfo=async(url)=>{
        try{
            content.innerHTML=""
            let res=await axios.get(`https://ghibliapi.herokuapp.com/films/${url}`)
            let title=document.createElement("h3")
            title.innerText=res.data.title;
            title.id="title"
            let release=document.createElement("p");
            release.innerText=res.data.release_date;
            let description=document.createElement("p")
            description.innerText=res.data.description;
            content.appendChild(title)
            content.appendChild(release)
            content.appendChild(description)
        }catch(err){
            debugger
        }
    }

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        let title=document.querySelector("#title")
        let li=document.createElement("li")
        li.innerHTML=`<span>${title.innerText}:</span> ${event.currentTarget.elements[0].value}`
        ul.appendChild(li)
        event.currentTarget.elements[0].value=""
    })


    select.addEventListener("change",(event)=>{
        getInfo(event.target.value)
    })

getMovie()
})