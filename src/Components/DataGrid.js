import React, { useEffect, useState } from "react";
import "./space.css";

const DataGrid = ({ searchData }) => {
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [capsuleGroupsPerPage] = useState(10);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/capsules")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const sortedCapsules = data.sort((a, b) => {
          if (a.capsule_serial < b.capsule_serial) return -1;
          if (a.capsule_serial > b.capsule_serial) return 1;
          return 0;
        });
        setCapsules(sortedCapsules);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (searchData) {
      // Apply the filtering based on the search criteria
      const { status, type } = searchData;
      const filteredData = capsules.filter((capsule) => {
        const capsuleStatus = capsule.status
          ? capsule.status.toLowerCase()
          : "";
        const capsuleType = capsule.type ? capsule.type.toLowerCase() : "";
        return (
          (status.toLowerCase() === "active" && capsuleStatus === "active") ||
          (type.toLowerCase() !== "" && capsuleType === type.toLowerCase())
        );
      });
      setFilteredCapsules(filteredData);
      setCurrentPage(1); // Reset the current page to 1 when the search criteria change
    } else {
      // If no search criteria, display all capsules
      setFilteredCapsules(capsules);
    }
  }, [searchData, capsules]);

  const handleDetails = (capsule) => {
    setSelectedCapsule(capsule);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCapsule(null);
    setShowModal(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const lastPage = Math.ceil(filteredCapsules.length / capsuleGroupsPerPage);
    if (currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const groupedCapsules = groupCapsulesBySerial(filteredCapsules);

  const indexOfLastGroup = currentPage * capsuleGroupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - capsuleGroupsPerPage;
  const currentCapsuleGroups = groupedCapsules.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );

  function groupCapsulesBySerial(capsules) {
    const groups = {};
    capsules.forEach((capsule) => {
      const { capsule_serial } = capsule;
      if (!groups[capsule_serial]) {
        groups[capsule_serial] = [];
      }
      groups[capsule_serial].push(capsule);
    });
    return Object.values(groups);
  }

  return (
    <div className="data-grid">
      <table className="center-table table table-striped table-bordered">
        <thead>
          <tr>
            <th>Capsule Serial</th>
            <th>Status</th>
            <th>Type</th>
            <th>Details</th>
            <th>Original Launch</th>
          </tr>
        </thead>
        <tbody>
          {currentCapsuleGroups.map((group) => (
            <React.Fragment key={group[0].capsule_serial}>
              {group.map((capsule) => (
                <tr key={capsule.capsule_id}>
                  <td>{capsule.capsule_serial}</td>
                  <td>{capsule.status}</td>
                  <td>{capsule.type}</td>
                  <td>{capsule.original_launch}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      data-toggle="modal"
                      data-target="#capsuleModal"
                      onClick={() => handleDetails(capsule)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination d-flex justify-content-center mt-1">
        <div className="pagination_button_next">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "btn btn-sm btn-outline-dark"
                : "btn btn-sm btn-outline-primary"
            }
          >
            Previous
          </button>
        </div>
        <div className="left_space">
          <button
            onClick={handleNextPage}
            disabled={
              currentPage ===
              Math.ceil(filteredCapsules.length / capsuleGroupsPerPage)
            }
            className={
              currentPage ===
              Math.ceil(filteredCapsules.length / capsuleGroupsPerPage)
                ? "btn  btn-sm btn-outline-dark"
                : "btn btn-sm btn-outline-primary"
            }
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title">Selected Capsule Details</h6>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {selectedCapsule && (
                  <div>
                    <p>Capsule Serial: {selectedCapsule.capsule_serial}</p>
                    <p>Status: {selectedCapsule.status}</p>
                    {/* Display additional details as needed */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
