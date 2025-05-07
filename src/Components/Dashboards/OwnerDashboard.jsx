import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

export default function OwnerDashboard() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [isManageHotel, setIsHotelManage] = useState(false);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editHotel, setEditHotel] = useState(null);

  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    category: "Luxury",
  });

  const ownerId = localStorage.getItem("userId");

  const handleManageHotels = async () => {
    setIsHotelManage(true);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/hotels/owners/${ownerId}/hotels`);
      const data = await res.json();
      setHotels(data);
      setAllHotels(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHotel = () => {
    setEditHotel(null);
    setNewHotel({ name: "", location: "", category: "Luxury" });
    setShowAddHotel(true);
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveHotel = async () => {
    setLoading(true);
    try {
      const method = editHotel ? "PUT" : "POST";
      const url = editHotel
        ? `http://localhost:8080/hotels/owners/${ownerId}/hotels/${editHotel.hotel_id}`
        : `http://localhost:8080/hotels/owners/${ownerId}/hotels`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });

      alert(await res.text());
      setShowAddHotel(false);
      setEditHotel(null);
      setNewHotel({ name: "", location: "", category: "Luxury" });
      handleManageHotels();
    } catch (err) {
      console.error(err);
      alert(editHotel ? "Failed to update hotel" : "Failed to save hotel");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/hotels/owners/${ownerId}/hotels/${hotelId}`,
        {
          method: "DELETE",
        }
      );
      alert(await res.text());
      handleManageHotels();
    } catch (err) {
      console.error(err);
      alert("Failed to delete hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Owner Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={handleManageHotels}
          >
            Manage Hotels
          </button>
          <button className="btn btn-outline-light mb-2 w-100" disabled>
            Manage Bookings
          </button>
          <button className="btn btn-outline-light mb-2 w-100" disabled>
            View Payments
          </button>
          <button className="btn btn-outline-light mb-2 w-100" disabled>
            Reviews & Ratings
          </button>
        </div>

        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Owner</h2>

          {isManageHotel && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control w-75 shadow-sm rounded"
                  placeholder="Search hotels..."
                  onChange={(e) => {
                    const q = e.target.value.toLowerCase();
                    const filtered = allHotels.filter(
                      (h) =>
                        h.name.toLowerCase().includes(q) ||
                        h.location.toLowerCase().includes(q)
                    );
                    setHotels(filtered);
                  }}
                />
                <button className="btn btn-success" onClick={handleAddHotel}>
                  <i className="bi bi-plus-lg"></i> Add Hotel
                </button>
              </div>

              {loading ? (
                <div className="text-center">Loading hotels...</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped border">
                    <thead className="table-dark">
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotels.length > 0 ? (
                        hotels.map((hotel) => (
                          <tr key={hotel.hotel_id}>
                            <td>
                              <NavLink to={`/hotelroompage/${hotel.hotel_id}`}>
                                {hotel.name}
                              </NavLink>
                            </td>
                            <td>{hotel.location}</td>
                            <td>{hotel.category}</td>
                            <td>
                              {new Date(hotel.created_at).toLocaleString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => {
                                  setEditHotel(hotel);
                                  setShowAddHotel(true);
                                  setNewHotel({
                                    name: hotel.name,
                                    location: hotel.location,
                                    category: hotel.category,
                                  });
                                }}
                              >
                                <i className="bi bi-pencil-square me-1"></i> Update
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteHotel(hotel.hotel_id)}
                              >
                                <i className="bi bi-trash me-1"></i> Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No Hotels Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {showAddHotel && (
            <>
              <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} />
              <div className="modal d-block fade show" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title w-100 text-center">
                        {editHotel ? "Update Hotel" : "Add Hotel"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setShowAddHotel(false);
                          setEditHotel(null);
                          setNewHotel({ name: "", location: "", category: "Luxury" });
                        }}
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Hotel Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={newHotel.name}
                          onChange={handleHotelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={newHotel.location}
                          onChange={handleHotelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                          name="category"
                          className="form-select"
                          value={newHotel.category}
                          onChange={handleHotelChange}
                        >
                          <option value="Luxury">Luxury</option>
                          <option value="Standard">Standard</option>
                          <option value="Boutique">Boutique</option>
                          <option value="Budget">Budget</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowAddHotel(false);
                          setEditHotel(null);
                          setNewHotel({ name: "", location: "", category: "Luxury" });
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveHotel}
                      >
                        {editHotel ? "Update" : "Save"} Hotel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
