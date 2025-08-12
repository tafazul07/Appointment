import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useServices } from "../context/ServiceContext";
import "./cssforall.css";

const Dashboard = () => {
  // State for appointments
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("today"); // today, calendar, history

  // Get services and functions from context
  const { services, addService, updateService, deleteService } = useServices();

  // State for new service
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: {
      basic: "",
      premium: "",
      luxury: "",
    },
    duration: "",
    icon: "💇‍♀️",
    category: "hair", // Default category
    isActive: true,
  });

  // State for editing service
  const [editingService, setEditingService] = useState(null);

  // State for business hours
  const [businessHours, setBusinessHours] = useState({
    monday: { open: "09:00", close: "17:00", isOpen: true },
    tuesday: { open: "09:00", close: "17:00", isOpen: true },
    wednesday: { open: "09:00", close: "17:00", isOpen: true },
    thursday: { open: "09:00", close: "17:00", isOpen: true },
    friday: { open: "09:00", close: "17:00", isOpen: true },
    saturday: { open: "10:00", close: "15:00", isOpen: true },
    sunday: { open: "", close: "", isOpen: false },
  });

  // State for business info
  const [businessInfo, setBusinessInfo] = useState({
    name: "Glamour",
    address: "123 Main St, Anytown, PK",
    phone: "123-456-7890",
    email: "glamour@gmail.com",
  });

  // Service categories
  const categories = [
    { id: "hair", name: "Hair Services", icon: "💇‍♀️" },
    { id: "nails", name: "Nail Services", icon: "💅" },
    { id: "skin", name: "Skin Care", icon: "🧖‍♀️" },
    { id: "massage", name: "Massage", icon: "💆" },
    { id: "makeup", name: "Makeup", icon: "💄" },
    { id: "other", name: "Other Services", icon: "✨" },
  ];

  // Load initial data (replace with actual API calls)
  useEffect(() => {
    // Load appointments
    // Load services
    // Load business hours
    // Load business info
  }, []);

  // Handle appointment status change
  const handleAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  // Handle adding new service
  const handleAddService = (e) => {
    e.preventDefault();

    // Ensure all required fields are properly set
    const serviceToAdd = {
      ...newService,
      id: Date.now(), // Add ID here to ensure it's set
      price: {
        basic: Number(newService.price.basic),
        premium: Number(newService.price.premium),
        luxury: Number(newService.price.luxury),
      },
      // Ensure these fields are set with default values if not provided
      icon: newService.icon || "💇‍♀️",
      category: newService.category || "hair",
      isActive: newService.isActive !== undefined ? newService.isActive : true,
    };

    console.log("Adding new service:", serviceToAdd);
    addService(serviceToAdd);

    // Reset form
    setNewService({
      title: "",
      description: "",
      price: {
        basic: "",
        premium: "",
        luxury: "",
      },
      duration: "",
      icon: "💇‍♀️",
      category: "hair",
      isActive: true,
    });
  };

  // Handle editing service
  const handleEditService = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  // Handle updating service
  const handleUpdateService = (e) => {
    e.preventDefault();
    updateService(newService);
    setEditingService(null);
    setNewService({
      title: "",
      description: "",
      price: {
        basic: "",
        premium: "",
        luxury: "",
      },
      duration: "",
      icon: "💇‍♀️",
      category: "hair",
      isActive: true,
    });
  };

  // Handle deleting service
  const handleDeleteService = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(serviceId);
    }
  };

  // Handle business hours change
  const handleBusinessHoursChange = (day, field, value) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value,
      },
    });
  };

  // Handle business info change
  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo({
      ...businessInfo,
      [field]: value,
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Business Dashboard</h1>
        <div className="business-info">
          <h2>{businessInfo.name}</h2>
          <p>{businessInfo.address}</p>
          <p>{businessInfo.phone}</p>
          <p>{businessInfo.email}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Appointments Section */}
        <div className="dashboard-card">
          <h3>Appointments</h3>
          <div className="view-mode-selector">
            <button
              className={viewMode === "today" ? "active" : ""}
              onClick={() => setViewMode("today")}
            >
              Today
            </button>
            <button
              className={viewMode === "calendar" ? "active" : ""}
              onClick={() => setViewMode("calendar")}
            >
              Calendar
            </button>
            <button
              className={viewMode === "history" ? "active" : ""}
              onClick={() => setViewMode("history")}
            >
              History
            </button>
          </div>

          {viewMode === "today" && (
            <div className="appointments-list">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-time">
                      {format(new Date(appointment.date), "hh:mm a")}
                    </div>
                    <div className="appointment-details">
                      <h4>{appointment.service}</h4>
                      <p>{appointment.customerName}</p>
                      <p>{appointment.phone}</p>
                      {appointment.notes && (
                        <p className="appointment-notes">{appointment.notes}</p>
                      )}
                    </div>
                    <div className="appointment-actions">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleAppointmentStatus(
                            appointment.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              ) : (
                <p>No appointments for today</p>
              )}
            </div>
          )}

          {viewMode === "calendar" && (
            <div className="calendar-view">
              {/* Calendar component will be added here */}
              <p>Calendar view coming soon...</p>
            </div>
          )}

          {viewMode === "history" && (
            <div className="appointment-history">
              {/* Appointment history will be added here */}
              <p>Appointment history coming soon...</p>
            </div>
          )}
        </div>

        {/* Services Management Section */}
        <div className="dashboard-card">
          <h3>Manage Services</h3>
          <form
            onSubmit={editingService ? handleUpdateService : handleAddService}
            className="service-form"
          >
            <input
              type="text"
              placeholder="Service Title"
              value={newService.title}
              onChange={(e) =>
                setNewService({ ...newService, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Service Description"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              required
            />
            <select
              value={newService.category}
              onChange={(e) =>
                setNewService({ ...newService, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Basic Price"
                value={newService.price.basic}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    price: { ...newService.price, basic: e.target.value },
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Premium Price"
                value={newService.price.premium}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    price: { ...newService.price, premium: e.target.value },
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Luxury Price"
                value={newService.price.luxury}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    price: { ...newService.price, luxury: e.target.value },
                  })
                }
                required
              />
            </div>
            <input
              type="text"
              placeholder="Duration (e.g., 1 hour)"
              value={newService.duration}
              onChange={(e) =>
                setNewService({ ...newService, duration: e.target.value })
              }
              required
            />
            <div className="service-status">
              <label>
                <input
                  type="checkbox"
                  checked={newService.isActive}
                  onChange={(e) =>
                    setNewService({ ...newService, isActive: e.target.checked })
                  }
                />
                Service is Active
              </label>
            </div>
            <button type="submit">
              {editingService ? "Update Service" : "Add Service"}
            </button>
            {editingService && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setEditingService(null);
                  setNewService({
                    title: "",
                    description: "",
                    price: {
                      basic: "",
                      premium: "",
                      luxury: "",
                    },
                    duration: "",
                    icon: "💇‍♀️",
                    category: "hair",
                    isActive: true,
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>

          {/* List of existing services */}
          <div className="existing-services">
            <h4>Existing Services</h4>
            <div className="services-list">
              {categories.map((category) => {
                const categoryServices = services.filter(
                  (service) => service.category === category.id
                );
                if (categoryServices.length === 0) return null;

                return (
                  <div key={category.id} className="service-category">
                    <h5>
                      {category.icon} {category.name}
                    </h5>
                    <ul>
                      {categoryServices.map((service) => (
                        <li
                          key={service.id}
                          className={!service.isActive ? "inactive" : ""}
                        >
                          <span className="service-info">
                            {service.icon} {service.title} - {service.duration}
                          </span>
                          <div className="service-actions">
                            <button
                              className="edit-button"
                              onClick={() => handleEditService(service)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Business Hours Section */}
        <div className="dashboard-card">
          <h3>Business Hours</h3>
          <div className="business-hours">
            {Object.entries(businessHours).map(([day, hours]) => (
              <div key={day} className="day-hours">
                <div className="day-header">
                  <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                  <label>
                    <input
                      type="checkbox"
                      checked={hours.isOpen}
                      onChange={(e) =>
                        handleBusinessHoursChange(
                          day,
                          "isOpen",
                          e.target.checked
                        )
                      }
                    />
                    Open
                  </label>
                </div>
                {hours.isOpen && (
                  <div className="time-inputs">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleBusinessHoursChange(day, "open", e.target.value)
                      }
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleBusinessHoursChange(day, "close", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Business Information Section */}
        <div className="dashboard-card">
          <h3>Business Information</h3>
          <form className="business-info-form">
            <input
              type="text"
              placeholder="Business Name"
              value={businessInfo.name}
              onChange={(e) => handleBusinessInfoChange("name", e.target.value)}
            />
            <textarea
              placeholder="Business Address"
              value={businessInfo.address}
              onChange={(e) =>
                handleBusinessInfoChange("address", e.target.value)
              }
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={businessInfo.phone}
              onChange={(e) =>
                handleBusinessInfoChange("phone", e.target.value)
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={businessInfo.email}
              onChange={(e) =>
                handleBusinessInfoChange("email", e.target.value)
              }
            />
            <button type="submit">Update Information</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
