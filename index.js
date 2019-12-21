
document.addEventListener("DOMContentLoaded",()=>{
    let select = document.querySelector("#select")
    let content = document.querySelector("#content")
    let form = document.querySelector("#form")
    let ul = document.querySelector("#review")
    const getMovie = async()=>{
        try{
            let res = await axios.get("https://ghibliapi.herokuapp.com/films")
            // debugger
            let moviesArr = res.data
            moviesArr.forEach(el=>{
                let option = document.createElement("option")
                option.innerText = el.title
                option.value = el.id
                select.appendChild(option)
            })
        }catch(err){
            console.error(error);
        }
    }

    const getInfo = async(url)=>{
        try{
            content.innerHTML=""
            let res = await axios.get(`https://ghibliapi.herokuapp.com/films/${url}`)
            let title = document.createElement("h3")
            title.innerText = res.data.title;
            title.id = "title"
            
            let release = document.createElement("p");
            release.innerText = res.data.release_date;
            
            let description = document.createElement("p")
            description.innerText = res.data.description;
            content.appendChild(title)
            content.appendChild(release)
            content.appendChild(description)
        }catch(err){
            console.error(error);
        }
    }

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        let title = document.querySelector("#title")
        let li = document.createElement("li")

        let review = event.currentTarget.elements[0].value;
        li.innerHTML=`<span>${title.innerText}:</span> ${review}`
        ul.appendChild(li)
        review = ""
    })


    select.addEventListener("change",(event)=>{
        let productTitle = event.target.value;
        getInfo(productTitle)
    })

    getMovie()
})
