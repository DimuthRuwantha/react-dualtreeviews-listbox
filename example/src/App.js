import React, { useState } from 'react'

import { DualTreeViewListBox } from 'react-dualtreeviews-listbox'
import 'react-dualtreeviews-listbox/dist/index.css'

var data = [{
  "title": "Sri Lanka",
  "id": "1",
  "parentNode": null,
  "childNodes": [{
      "title": "Western Province",
      "id": "11",
      "parentNode": "1",
      "childNodes": [{
        "title": "Colombo District",
        "id": "111",
        "parentNode": "11",
        "childNodes": [], 
      },{
        "title": "Gampaha District",
        "id": "112",
        "parentNode": "11",
        "childNodes": [], 
      },{
        "title": "Kaluthara District",
        "id": "113",
        "parentNode": "11",
        "childNodes": [], 
      }],
  },
  {
    "title": "Central Province",
    "id": "12",
    "parentNode": "1",
    "childNodes": [{
      "parentNode": "12",
      "childNodes": [],
      "title": "Kandy",
      "id": "121"
      }],
  }],
},
{
  "title": "India",
  "id": "2",
  "childNodes": [{
    "title": "Maharashtra",
    "id": "21",
    "parentNode": "2",
    "childNodes": [{
      "title": "Pune",
      "id": "211",
      "parentNode": "2",
      "childNodes": [],
    }],
  }],  
}]

const App = () => {

  const [selectedTree, setTree] = useState([])

  return <div>
    <p>{JSON.stringify(selectedTree)}</p>
    <DualTreeViewListBox data={data} onnodemoved={(list) => setTree(list)} />
    </div>
}

export default App
