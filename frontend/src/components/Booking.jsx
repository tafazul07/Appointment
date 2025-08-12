import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  format,
  addDays,
  isBefore,
  isAfter,
  setHours,
  setMinutes,
} from "date-fns";
import "./cssforall.css";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, serviceTitle, serviceDescription, selectedTime } =
    location.state || {};

  // Redirect if no service details
  useEffect(() => {
    if (!serviceId) {
      navigate("/services");
    }
  }, [serviceId, navigate]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedTime || "");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) =>
    addDays(new Date(), i)
  );

  // Generate time slots (9 AM to 5 PM, 1-hour intervals)
  const generateTimeSlots = (date) => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      const time = format(setHours(setMinutes(date, 0), hour), "hh:mm a");
      slots.push(time);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Remove any spaces, dashes, or other non-digit characters
      const cleanPhone = formData.phone.replace(/\D/g, "");
      // Check if it's a valid Pakistani number (10-11 digits)
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        newErrors.phone = "Phone number must be 10-11 digits";
      }
    }
    if (!selectedTimeSlot) newErrors.timeSlot = "Please select a time slot";
    if (!selectedDate) newErrors.date = "Please select a date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTimeSlot,
        notes: formData.notes,
        serviceId: serviceId,
        serviceTitle: serviceTitle,
      };

      const response = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      setBookingSuccess(true);
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        navigate("/services");
      }, 3000);
    } catch (error) {
      console.error("Booking failed:", error);
      setErrors({ submit: "Failed to book appointment. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (bookingSuccess) {
    return (
      <div className="booking-success">
        <div className="success-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p>Thank you for booking with us. We'll see you soon!</p>
        <p className="redirect-message">Redirecting to services...</p>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h2>Book Your Appointment</h2>
        <p className="service-title">{serviceTitle}</p>
        <p className="service-description">{serviceDescription}</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-grid">
          {/* Date Selection */}
          <div className="form-section">
            <h3>Select Date</h3>
            <div className="date-picker">
              {availableDates.map((date) => (
                <button
                  key={date.toISOString()}
                  type="button"
                  className={`date-option ${
                    format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="day">{format(date, "EEE")}</span>
                  <span className="date">{format(date, "d")}</span>
                  <span className="month">{format(date, "MMM")}</span>
                </button>
              ))}
            </div>
            {errors.date && (
              <span className="error-message">{errors.date}</span>
            )}
          </div>

          {/* Time Selection */}
          <div className="form-section">
            <h3>Select Time</h3>
            <div className="time-slots">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`time-slot ${
                    selectedTimeSlot === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            {errors.timeSlot && (
              <span className="error-message">{errors.timeSlot}</span>
            )}
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3>Your Information</h3>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="input-group">
              <textarea
                name="notes"
                placeholder="Additional Notes (Optional)"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
          </div>
        </div>

        {errors.submit && (
          <div className="error-message global-error">{errors.submit}</div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/services")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
