import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: "",
    };
  }

  handleSubmitForm = (searchWord) => {
    this.setState({ searchWord });
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery searchWord={this.state.searchWord} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
