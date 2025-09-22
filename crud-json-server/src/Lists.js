// src/Lists.js
import React from "react";
import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";

export default function Lists({
  data = [],
  getSingleList,
  handleChange,
  updateList,
  deleteList,
  singleTitle,
  singleAuthor
}) {
  if (!data.length) {
    return <div className="alert alert-info m-3">No data to display.</div>;
  }

  return (
    <div className="container mt-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">All Lists</h5>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <UpdateList
                        id={book.id}
                        singleTitle={singleTitle}
                        singleAuthor={singleAuthor}
                        getSingleList={getSingleList}
                        handleChange={handleChange}
                        updateList={updateList}
                      />
                    </td>
                    <td>
                      <DeleteList
                        id={book.id}
                        singleTitle={singleTitle}
                        singleAuthor={singleAuthor}
                        getSingleList={getSingleList}
                        deleteList={deleteList}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
