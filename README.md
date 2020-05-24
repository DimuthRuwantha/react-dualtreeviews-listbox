# react-dualtreeviews-listbox

> The list box include dynamically generated tree

[![NPM](https://img.shields.io/npm/v/react-dualtreeviews-listbox.svg)](https://www.npmjs.com/package/react-dualtreeviews-listbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Node.js CI](https://github.com/DimuthRuwantha/react-dualtreeviews-listbox/workflows/Node.js%20CI/badge.svg)

## Install

```bash
npm install --save react-dualtreeviews-listbox
```
## Prerequisites

add Bootstrap4 for styling
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
```

## Usage

```jsx
import React from 'react'
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
      "parentNode": "21",
      "childNodes": [],
    }],
  }],  
}]


const App = () => {
  const [selectedTree, setTree] = useState([])

  return <div>
  <DualTreeViewListBox data={data} onnodemoved={(list) => setTree(list)} />
  <pre>{JSON.stringify(selectedTree, undefined, 2)}</pre>
</div>
}

export default App

```

## License

MIT © [DimuthRuwantha](https://github.com/DimuthRuwantha)
