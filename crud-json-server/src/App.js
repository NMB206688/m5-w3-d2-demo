import React, { Component } from "react";
import Lists from "./Lists";

class App extends Component {
  state = { loading: false, alldata: [], error: null };

  componentDidMount() {
    // Auto-load data on first render
    this.handleGetLists();
  }

  handleGetLists = async () => {
    try {
      this.setState({ loading: true, error: null });
      // Thanks to "proxy" in package.json, we can use a relative URL here
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

  render() {
    const { loading, alldata, error } = this.state;

    return (
      <>
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="my-2">CRUD Demo (JSON Server)</h2>
            <button className="btn btn-primary" onClick={this.handleGetLists}>
              Get Lists
            </button>
          </div>
          {error && <div className="alert alert-danger mt-3">Error: {error}</div>}
        </div>

        {loading ? (
          <div className="container mt-4">
            <div className="alert alert-secondary">Loading data…</div>
          </div>
        ) : (
          <Lists data={alldata} />
        )}
      </>
    );
  }
}

export default App;
