let btnXML = document.getElementById("searchbtnXHR")
let btnFetch = document.getElementById("searchbtnFetch")
let btnAsyncAwaitFetch = document.getElementById("searchbtnAsyncAwait")

const api_key = "t6tXbmcEAay4DF1AycRd3D9zYAcbxduE"

let input = document.getElementById("input")

btnXML.addEventListener("click", function () {
    let q = input.value
    getImagesUsingXHR(q)

})

btnFetch.addEventListener("click", function () {
    let q = input.value
    getImagesUsingFetch(q)


})

btnAsyncAwaitFetch.addEventListener("click",function(){
    let q = input.value
    Async(q)
})


function getImagesUsingXHR(q) {
    let images = []

    let xhr = new XMLHttpRequest()
    let URL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}`

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseText = xhr.responseText
            let resOb = JSON.parse(responseText)
            console.log(resOb)

            for (let item of resOb.data) {
                images.push(item.images.downsized_medium.url)
            }
            generateImages(images)

        }

    }
    xhr.open("GET", URL, true)
    xhr.send()
}



function getImagesUsingFetch(q) {

    let URL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}`
    let images = []
    fetch(URL)
        .then(response => {
            return response.json()
        })
        .then(responseObj => {
            for(let item of responseObj.data){
                images.push(item.images.downsized_medium.url)
            }
            generateImages(images)
        })
        .catch(e => {
            console.log(e)
        })
}



const Async = async (q)=>{
    const images = []
    let URL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}`
    const response = await fetch(URL)
    const responseObj = await response.json()
    for(let item of responseObj.data){
        images.push(item.images.downsized_medium.url)
        
    }
    generateImages(images)

    

}



function generateImages(images) {
    let result = document.getElementById("result")
    for (let image of images) {
        let imgElemnt = document.createElement("img")

        imgElemnt.src = image
        result.appendChild(imgElemnt)
    }

}

