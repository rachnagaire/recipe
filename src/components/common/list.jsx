import { func } from 'prop-types';
import React, { Component } from 'react';

function listRecipe()  {
    const topDesserts =[
        {
          id: "1",
          title :"Tiramisu",
          description:"The newari dessert",
          image: "",
          Price: "80.00",
        },
        {
          id: "5",
          title :"Eclairs",
          description:"The newari dessert",
          image: "",
          Price: "60.00",
        },
        {
          id: "4",
          title :"Waffle",
          description:"The newari dessert",
          image: "",
          Price: "50.00",
        },
        {
          id: "8",
          title :"Muffins",
          description:"The newari dessert",
          image: "",
          Price: "76.00",
        },
        {
          id: "1",
          title :"yomari5",
          description:"The newari dessert",
          image: "",
          Price: "30.00",
        },
        {
          id: "12",
          title :"Jerry",
          description:"The newari dessert",
          image: "",
          Price: "140.00",
        },
      ]
      const ListItem = topDesserts
  .filter((topDesserts)=>{
    return topDesserts.Price < 200;
  })
  .sort((a,b) =>{
    return a.id - b.id;
  })
  .map(dessert =>{
    const listText = `${dessert.id} - ${dessert.title}   Price ${dessert.Price}`
    return <li>{listText}</li>
  })
    return(
        <ul>
        {ListItem}
      </ul>
    )
}