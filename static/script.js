var input = [
    {
         "id": 1,
         "title": "Title 1",
         "childrens": [
              {
                   "id": 2,
                   "title": "Title 2",
                   "childrens": []
              }
         ]
    },
    {
         "id": 3,
         "title": "Title 3",
         "childrens": [
              {
                   "id": 4,
                   "title": "Title 4",
                   "childrens": [
                        {
                             "id": 5,
                             "title": "Title 5",
                             "childrens": []
                        }
                   ]
              }
         ]
    }
]


let outArray  = [];

presentChildren = (item) =>  {
    if (item.childrens.length === 0) {
        return false;        
    } else {
        return true;
    }
}


funcAddChild = (i) => {
    if (!presentChildren(i)){
        let temp = {'id':i.id, 'title': i.title,'childrens': []  }
        outArray.push(temp);
        return 0;
    } else {
        let temp = {'id':i.id,'title': i.title,'childrens': []  }
        outArray.push(temp);
        return funcAddChild(i.childrens[0]);

    }
}

input.forEach(v => {
    console.log(presentChildren(v));
})

console.log(outArray)
