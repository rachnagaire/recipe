import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Header from "./components/common/header";
import MoviesForm from "./components/moviesForm";
import Recipe from "./components/recipe";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Header user={this.state.user} />
        {/* <Movies></Movies> */}
        <main className="container-fluid px-5 py-5">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MoviesForm}
            ></ProtectedRoute>
            
            <Route
              path="/recipe"
              render={(props) => <Recipe {...props} user={user}></Recipe>}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/recipe"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
