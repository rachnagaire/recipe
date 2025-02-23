import React, { Component } from "react";
// import auth from "../services/authService";
// // import Table from "./common/table";
// import Like from "./common/like";
// import { Link } from "react-router-dom";


const listRecipe = [
  {
    id :  "1",
    title : "Tiramisu",
    description : " Famous desert",
    img: "https://www.simplyrecipes.com/thmb/yxXj6aCFmcVr-MLga4ZDVvcw8tg=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-War-Cake-LEAD-3-f0c00628674041b58ef066d0d19a8526.jpg",
    price : "$6.90",

  },
  {
    id :  "2",
    title : "halwa",
    description : " Nepali dish",
    img: "https://www.simplyrecipes.com/thmb/yxXj6aCFmcVr-MLga4ZDVvcw8tg=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-War-Cake-LEAD-3-f0c00628674041b58ef066d0d19a8526.jpg",
    price : "$6.90",

  },
  {
    id :  "3",
    title : "test 3",
    description : " Famous desert",
    img: "https://www.simplyrecipes.com/thmb/yxXj6aCFmcVr-MLga4ZDVvcw8tg=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-War-Cake-LEAD-3-f0c00628674041b58ef066d0d19a8526.jpg",
    price : "$6.90",

  },
  {
    id :  "4",
    title : "test 4",
    description : " Famous desert",
    img: "https://www.simplyrecipes.com/thmb/yxXj6aCFmcVr-MLga4ZDVvcw8tg=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-War-Cake-LEAD-3-f0c00628674041b58ef066d0d19a8526.jpg",
    price : "$6.90",

  }
]
class RecipeList extends Component {
  // columns = [
  //   {
  //     path: "title",
  //     label: "Title",
  //     content: (movie) => (
  //       <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  //     ),
  //   },
  //   { path: "genre.name", label: "Genre" },
  //   { path: "numberInStock", label: "Stock" },
  //   { path: "dailyRentalRate", label: "Rate" },
  //   {
  //     key: "react",
  //     content: (movie) => (
  //       <Like
  //         liked={movie.liked}
  //         onClick={() => this.props.onLike(movie)}
  //       ></Like>
  //     ),
  //   },
  // ];
  // deleteColumn = {
  //   key: "delete",
  //   content: (movie) => (
  //     <button
  //       className="btn  btn-danger"
  //       id={movie._id}
  //       onClick={() => this.props.onDelete(movie)}
  //     >
  //       Delete
  //     </button>
  //   ),
  // };

  // constructor() {
  //   super();
  //   const user = auth.getCurrentUser();
  //   console.log(user);
  //   if (user && user.isAdmin) {
  //     this.columns.push(this.deleteColumn);
  //   }
  // }

  render() {
    const { movies, onSort, sortColumn, user } = this.props;
    const listRecipe = listRecipe
    .filter((listRecipe)=>{
      return listRecipe.price < 200;
    })
    .sort((a,b) =>{
      return a.id - b.id;
    })
    .map(dessert =>{
      const listText = `${dessert.id} - ${dessert.title}   Price ${dessert.Price}`
      return <li>{listText}</li>
    })
    return (
      <>
      {/* <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      /> */}
      console.log({listRecipe})
      <ul>
        
        {listRecipe}
      </ul>
      {/* <div className="recipe-list">
        <div className="hero-recipe recipe-item">
          <a href="/">
          <figure id="showcase-hero__image_4-0" class="hero-recipe--img">
          <div class="primary-image__media">
            <img src="" alt="" srcset=""/>
          </div>
          </figure>
          </a>
        </div>
        <div className="recipe-item"></div>
      </div> */}
      </>
      
    );
  }
}

export default RecipeList;
