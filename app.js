// async function getRandomCategories(){
// var res = await axios.get('https://jservice.io/api/clues?count=100&offset='+Math.random()*(10000-6)+6);
// var result = res.data;
// console.log(result);
// }
async function f(){
    //get m categories array from api 
    var res = await axios.get('https://jservice.io/api/clues?count=100&offset='+Math.random()*(10000-6)+6);
    var res = res.data
    var categoryID_List = [];
    for(let i = 0; i<m; i++){
        var catID = res[i].category_id;
        categoryID_List.push(catID);
    }
    //get n clues per category

    for(let i = 0; i<categoryID_List.length; i++){
        var clue = await axios.get('https://jservice.io/api/clues?category=' + categoryID_List[i]);
        var clue = clue.data;
        var a = clue[i].category.title;
        // var b = Object.values(a);
        // var c = b.category;
        var catAndQA = {title : a};
        var c=[];
        for(let j =0; j<n; j++){
            var b={};
            b.question = clue[j].question;
            b.answer = clue[j].answer;
            c.push(b);
        }
        catAndQA.clues = c;
        // console.log(101,catAndQA);
        categories.push(catAndQA);
    }
    createGameTable(categories);
}

function createGameTable(categories){
    var tableHead = document.querySelector("#tablehead")
    for(let catTitle of categories){
        var newCat = document.createElement("th")
        newCat.innerText = catTitle["title"];
        tableHead.append(newCat);            
    }
            // for (let i = 0; i<5; i++){
        //     // let initDiv = `<div class="qmark">?</div>`;
        //     let questionDiv = catTitle["clues"][i].question;
        //     console.log(catTitle["clues"][i].question);
        //     // let answerDiv = '<div class="answer">'+catTitle["clues"][i].answer+'</div>';
        //     var QACell = document.createElement("td");
        //     var newQA = document.querySelector("zero");
        //     QACell.innerText = questionDiv;
        //     console.log(QACell);
        //     newQA.append(QACell);
        // }
    for(let k=0; k<n; k++){
        //create 5 empty rows
        var tableBody = document.querySelector("#tableBody")
        var newRow = document.createElement("tr");
        //append rows to tbody with loop
        for(let l=0; l<m; l++){
            var cell = document.createElement("td");
            // cell.innerHTML = "<div class='qmark'>?<div>"+"<div class='question'>"+categories[l]["clues"][k]["question"]+"</div>"+"<div class='question'>"+categories[l]["clues"][k]["answer"]+"</div>";
            cell.innerHTML = `<div cat="${l}" que="${k}" status="0">
            <div class="hidden">?</div>
            <div class="question">${this.categories[l].clues[k].question}</div>
            <div class="answer">${this.categories[l].clues[k].answer}</div>
            </div> `;
            newRow.append(cell);    
        }
        tableBody.append(newRow);    
    }
    handleCellClick();
}

function handleCellClick() {
    let $td = $('tbody td');
        let specificQA = this;
        $td.on('click', function(event){
            let catInx = event.target.parentElement.attributes.cat.value;
            let questInx = event.target.parentElement.attributes.que.value;
            let clickedCell = (specificQA.categories[catInx].clues[questInx]);
            if (!clickedCell.showing) {
                clickedCell.showing = "question";
                event.target.style.display = "none";
                event.target.nextElementSibling.style.display = 'flex';
            } else if (clickedCell.showing === "question") {
                clickedCell.showing = "answer";
                event.target.style.display = "none";
                event.target.nextElementSibling.style.display = 'flex';
            }
        })
}
var categories=[];
var m = 6;
var n = 5;
var btn = document.querySelector("#start-game");
btn.addEventListener('click',f);
