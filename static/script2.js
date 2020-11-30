var myData = JSON.parse((data)); // loading the data from the JSON file
console.log(myData[0])

//WE create a state variable to show the current state as well as how many rows to display

var state = {
    'myData': myData,
    'page' : 1,
    'rows': 10,
}

// we create a function that will select appropriate number of elemers from our JSON file
// based on which 'page' to display and how may rows to show.

pagination = (d,p,r) => {

    let trimStart = (p-1) * r;
    let trimEnd = trimStart + r
    let trimmedData = d.slice(trimStart,trimEnd);
    let pages = Math.floor((d.length)/r);

    return {
        'trimmedData' : trimmedData,  // Return the trimmed data
        'pages': pages
    }

}

// Next we create a table that will loop through the trimmed data and modify out HTML using DOM

buildTable = () => {

    let data = pagination(state.myData, state.page, state.rows);
    tbody = document.getElementById('table-body')
    tbody.innerHTML ="";
    let dataList = data.trimmedData;
    for (x of dataList){
        let tr = document.createElement('tr')
        Object.keys(x).forEach(k => {
            let td = document.createElement('td');
            td.append(x[k]); //appending subsequent JSON to columns
            tr.append(td);  //appending columns to rows
        })

        tbody.append(tr) // appending row to body
    }

}

buildTable();  //first table creation


//next we create a function to create buttons

buildButtons =  (p) => {

    // console.log('we are in page', p);

    btnDiv = document.getElementById('buttons');

    btnDiv.innerHTML = ""; // clear the div that has buttons


    // first and previous buttons are created.

    firstBtn = document.createElement('button');
    firstBtn.classList.add('btn', 'btn-primary');
    firstBtn.setAttribute('value',1)
    firstBtn.innerHTML = "First"
    previousBtn = document.createElement('button');
    previousBtn.classList.add('btn', 'btn-primary');
    previousBtn.innerHTML = "Previous"
    previousBtn.setAttribute('value', -1)
    btnDiv.append(firstBtn, previousBtn);

    //rest of the buttons are created using loop.
    
    for (x=1; x <=10; x++){
        console.log(x,'--',p)
        tempBtn = document.createElement('button');
        tempBtn.classList.add('btn', 'btn-primary');
        tempBtn.setAttribute('value',x)
        tempBtn.innerHTML = x
        btnDiv.append(tempBtn);
    }

}

buildButtons(state.page); // we build the buttons


//we select all the buttons using querySelectorAll and add click even listener.
// we use forEach as we will get array of all elements

document.querySelectorAll('button').forEach(e => {
    e.addEventListener('click', (v)=> {
        console.log('button pressed', v.target.value);
        if (v.target.value == -1) {
            state.page = parseInt(state.page) - 1 // if previous button is clicked reduce the page in state by 1

            if (parseInt(state.page) <= 0){  // but dont reduce the page in state below 1 as we always want to show first page
                state.page = 1
            }

            buildTable();
        
        // Else we change the page in state to the button that has been clicked.

        } else {  
            state.page = v.target.value;
            buildTable();
       
        }

    })
})