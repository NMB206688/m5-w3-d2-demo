// src/App.js
import React, { Component } from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends Component {
  state = {
    loading: false,
    alldata: [],
    error: null,
    // For Create modal
    title: "",
    author: "",
    // For Update/Delete modals
    singleId: null,
    singleTitle: "",
    singleAuthor: ""
  };

  componentDidMount() {
    this.getLists();
  }

  // ------- READ: all -------
  getLists = async () => {
    try {
      this.setState({ loading: true, error: null });
      // Using CRA proxy: package.json -> "proxy": "http://localhost:5000"
      const res = await fetch("/lists");
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const json = await res.json();
      this.setState({
        alldata: Array.isArray(json) ? json : [],
        loading: false
      });
    } catch (err) {
      this.setState({ error: err.message || String(err), loading: false });
    }
  };

  // ------- form input handler (create + update) -------
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // ------- CREATE: force numeric id to avoid nanoid like "9e59" -------
  createList = async (e) => {
    e.preventDefault();
    try {
      const { title, author, alldata } = this.state;

      // Basic guard
      if (!title.trim() || !author.trim()) {
        this.setState({ error: "Title and Author are required." });
        return;
      }

      // Compute next numeric ID from current data
      const nextId =
        (alldata.length
          ? Math.max(
              ...alldata.map((b) =>
                typeof b.id === "number" ? b.id : Number(b.id) || 0
              )
            )
          : 0) + 1;

      await fetch("/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nextId, title, author })
      });

      this.setState({ title: "", author: "" });
      await this.getLists();
    } catch (err) {
      this.setState({ error: err.message || String(err) });
    }
  };

  // ------- READ: single (for update/delete modals) -------
  getSingleList = async (e, id) => {
    try {
      this.setState({
        singleId: id,
        singleTitle: "Loading...",
        singleAuthor: "Loading..."
      });
      const res = await fetch(`/lists/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const json = await res.json();
      this.setState({
        singleId: json.id,
        singleTitle: json.title || "",
        singleAuthor: json.author || ""
      });
    } catch (err) {
      this.setState({ error: err.message || String(err) });
    }
  };

  // ------- UPDATE -------
  updateList = async (e, id) => {
    e.preventDefault();
    try {
      const { singleTitle, singleAuthor } = this.state;

      if (!singleTitle.trim() || !singleAuthor.trim()) {
        this.setState({ error: "Title and Author are required." });
        return;
      }

      await fetch(`/lists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: singleTitle, author: singleAuthor })
      });

      await this.getLists();
    } catch (err) {
      this.setState({ error: err.message || String(err) });
    }
  };

  // ------- DELETE -------
  deleteList = async (e, id) => {
    e.preventDefault();
    try {
      await fetch(`/lists/${id}`, { method: "DELETE" });
      await this.getLists();
    } catch (err) {
      this.setState({ error: err.message || String(err) });
    }
  };

  render() {
    const {
      loading,
      alldata,
      error,
      title,
      author,
      singleTitle,
      singleAuthor
    } = this.state;

    return (
      <>
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="my-2">CRUD Demo (JSON Server)</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={this.getLists}>
                Get Lists
              </button>
              <CreateList
                title={title}
                author={author}
                handleChange={this.handleChange}
                createList={this.createList}
              />
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3">Error: {error}</div>}
        </div>

        {loading ? (
          <div className="container mt-4">
            <div className="alert alert-secondary">Loading data…</div>
          </div>
        ) : (
          <Lists
            data={alldata}
            getSingleList={this.getSingleList}
            handleChange={this.handleChange}
            updateList={this.updateList}
            deleteList={this.deleteList}
            singleTitle={singleTitle}
            singleAuthor={singleAuthor}
          />
        )}
      </>
    );
  }
}

export default App;
