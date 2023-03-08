import { Component } from "react";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchWord === "") {
      return;
    }
    this.props.onSubmit(this.state.searchWord);
    this.setState({ searchWord: "" });
  };
  handleNameChange = (e) => {
    this.setState({ searchWord: e.currentTarget.value });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            onChange={this.handleNameChange}
            className={s.SearchFormInput}
            value={this.state.searchWord}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
