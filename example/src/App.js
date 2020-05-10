import React, { useState } from 'react'

import { DualTreeViewListBox } from 'react-dualtreeviews-listbox'
import 'react-dualtreeviews-listbox/dist/index.css'

var data = [{
  "title": "Sri Lanka",
  "id": "1",
  "childNodes": [{
      "title": "Western Province",
      "id": "11",
      "childNodes": [{
        "title": "Colombo District",
        "id": "111",
        "childNodes": [], 
      }],
  },
  {
    "title": "Central Province",
    "id": "12",
    "childNodes": [{
      "parentNode": null,
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
    "childNodes": [{
      "title": "Pune",
      "id": "211",
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
