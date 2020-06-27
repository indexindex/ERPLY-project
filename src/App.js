// In this project i will create a React app using the ERPLY API to fetch data.
// For this project i used "Semantic React" in order to use some of the components from there (like Form and Card) and React hook methods.

// I used a code snippet ("import 'semantic-ui-css/semantic.min.css'") that i imported in "index.js" so that my project has access to needed components etc.

import React, { useEffect } from 'react';
import { Form, Card } from 'semantic-ui-react';
import './App.css';

function App() {
  const [CountryCode, setCountryCode] = React.useState('');
  const [VATNumber, setVATNumber] = React.useState('');
  const [RequestDate, setRequestDate] = React.useState('');
  const [Valid, setValid] = React.useState('');
  const [Name, setName] = React.useState('');
  const [Address, setAddress] = React.useState('');
  const [userInput, setUserInput] = React.useState('');
  const [error, setError] = React.useState(null);

  // In function App i'm creating a STATE, all the data that we get from the api will be stored in App component.
  // userInput STATE will make sure that whenever i type in to "input field", it will get updated accordinlgy.

  useEffect(() => {
    fetch('https://vat.erply.com/numbers?vatNumber=BG999999999')
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }, []);

  // Here i fetch API data every time the page loads, i used "useEffect()" hook for this,
  // it takes 2 arguments, function and dependency array.
  // This hook method only runs once, page load and we get our API fetched.
  // We get response(res) and we convert it to json after which we get our data back.
  // setData will grab the data we receive and pass it to setData function.

  const setData = ({ CountryCode, VATNumber, RequestDate, Valid, Name, Address }) => {
    setCountryCode(CountryCode);
    setVATNumber(VATNumber);
    setRequestDate(RequestDate);
    setValid(Valid);
    setName(Name);
    setAddress(Address);
  };

  // setData will grab some specific properties and "setData" function will set our data in App component.
  // One by one i set STATE for each data property.
  // Now whenever we fetch data from API we will run function "setData" through setState() in our App component.


  const handleSearch = (event) => {
    setUserInput(event.target.value);
  }

  // Here i take "event" as a parameter to check for whatever i type in "input field".

  const handleSubmit = () => {
    fetch(`https://vat.erply.com/numbers?vatNumber=${userInput}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setData(data);
        setError(null);
      }
    })
  }

  // handleSubmit will go ahead and submit my form whenever i click "Search".
  // I add STATE `${userInput}` which is the value from "input field".
  // I fetch API data and pass it to json after which i run the received data in "setData()" function. 
  // So whenever i make that fetch, i run "setData()" to set the data in my STATE again 
  // (which i need to re-render out the correct data on my card).

  // Whenever i fetch data from API i also want to include "setError()" STATE.
  // If data.message is present then error will be displayed, else error will be null and we get correct data displayed.

  return (
    <div>
      <div className='navbar'>VATNumber Search</div>
      <div className='search'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Search ID' name='id' onChange={handleSearch}/>
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      { error ? (<h1 className='tc'>{error}</h1>) : (
        <div className='card'>
        <Card>
          <Card.Content>
            <Card.Header>{CountryCode}</Card.Header>
            <Card.Header>{VATNumber}</Card.Header>
            <Card.Header>{RequestDate}</Card.Header>
            <Card.Header>{Valid}</Card.Header>
            <Card.Header>{Name}</Card.Header>
            <Card.Header>{Address}</Card.Header>
          </Card.Content>
        </Card>
      </div>)}
    </div>
  );
}

// "return()" has a "navbar", "input field", "search button" and "card".
// I used components from semantic-react page, in this case i only use { Form, Card } component.
// In each <Card.Header> im passing on a value i got from App component STATE.

// In <Form.Input> is use onChange property that will run when input form gets changed.
// onChange will be pointed to function "handleSearch()", which looks at our "input field".

// In <Form> i use onSubmit property to target "handleSubmit()" function.

// I used ternary operator for error check.

// Finally i get my card component to update according to the ID i enter in "input field".

export default App;