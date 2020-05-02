# react-dualtreeviews-listbox

> The list box include dynamically generated tree

[![NPM](https://img.shields.io/npm/v/react-dualtreeviews-listbox.svg)](https://www.npmjs.com/package/react-dualtreeviews-listbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-dualtreeviews-listbox
```
## Prerrequisites

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
  return <DualTreeViewListBox data={data} />
}

export default App

```

## License

MIT © [DimuthRuwantha](https://github.com/DimuthRuwantha)
