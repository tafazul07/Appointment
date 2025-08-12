import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import "./cssforall.css"; // Ensure this CSS file has the updated styles for .time-slot-card.booked

// Mock data for service timings
const CURRENT_USER_ID = "user123"; // Simulate a logged-in user

const initialServiceTimingsData = {
  1: [
    { id: "h1", time: "09:00 AM", status: "available", bookedBy: null },
    { id: "h2", time: "10:00 AM", status: "booked", bookedBy: "user123" },
    { id: "h3", time: "11:00 AM", status: "available", bookedBy: null },
    { id: "h4", time: "01:00 PM", status: "available", bookedBy: null },
    {
      id: "h5",
      time: "02:00 PM",
      status: "booked",
      bookedBy: "anotherUser456",
    },
    { id: "h6", time: "03:00 PM", status: "available", bookedBy: null },
  ],
  2: [
    { id: "m1", time: "09:30 AM", status: "available", bookedBy: null },
    { id: "m2", time: "10:30 AM", status: "available", bookedBy: null },
    { id: "m3", time: "11:30 AM", status: "booked", bookedBy: "user123" },
    { id: "m4", time: "01:30 PM", status: "available", bookedBy: null },
    { id: "m5", time: "02:30 PM", status: "available", bookedBy: null },
  ],
  3: [
    {
      id: "f1",
      time: "09:00 AM",
      status: "booked",
      bookedBy: "anotherUser789",
    },
    { id: "f2", time: "10:00 AM", status: "available", bookedBy: null },
    { id: "f3", time: "11:00 AM", status: "available", bookedBy: null },
    { id: "f4", time: "01:00 PM", status: "booked", bookedBy: "user123" },
    { id: "f5", time: "02:00 PM", status: "available", bookedBy: null },
  ],
  4: [
    { id: "mg1", time: "10:00 AM", status: "available", bookedBy: null },
    { id: "mg2", time: "11:00 AM", status: "available", bookedBy: null },
    { id: "mg3", time: "12:00 PM", status: "booked", bookedBy: "user123" },
    { id: "mg4", time: "02:00 PM", status: "available", bookedBy: null },
    {
      id: "mg5",
      time: "03:00 PM",
      status: "booked",
      bookedBy: "anotherUser456",
    },
  ],
  5: [
    { id: "mk1", time: "09:00 AM", status: "available", bookedBy: null },
    { id: "mk2", time: "10:30 AM", status: "available", bookedBy: null },
    { id: "mk3", time: "12:00 PM", status: "available", bookedBy: null },
    { id: "mk4", time: "01:30 PM", status: "booked", bookedBy: "user123" },
    { id: "mk5", time: "03:00 PM", status: "available", bookedBy: null },
  ],
  6: [
    { id: "w1", time: "09:15 AM", status: "available", bookedBy: null },
    { id: "w2", time: "10:15 AM", status: "booked", bookedBy: "user123" },
    { id: "w3", time: "11:15 AM", status: "available", bookedBy: null },
    { id: "w4", time: "01:15 PM", status: "available", bookedBy: null },
    {
      id: "w5",
      time: "02:15 PM",
      status: "booked",
      bookedBy: "anotherUser789",
    },
  ],
};

const Services = () => {
  const navigate = useNavigate();
  const { services } = useServices();
  console.log("Services component - Current services:", services);

  const [selectedService, setSelectedService] = useState(null);
  const [currentServiceTimings, setCurrentServiceTimings] = useState(
    initialServiceTimingsData
  );

  const handleLearnMoreClick = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const handleBookNow = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    navigate("/booking", {
      state: {
        serviceId,
        serviceTitle: service.title,
        serviceDescription: service.description,
      },
    });
  };

  const handleSlotAction = (serviceId, slotId) => {
    const updatedTimings = { ...currentServiceTimings };
    const serviceSlots = [...updatedTimings[serviceId]];
    const slotIndex = serviceSlots.findIndex((slot) => slot.id === slotId);

    if (slotIndex === -1) {
      console.error("Slot not found!");
      return;
    }

    const currentSlot = serviceSlots[slotIndex];
    const serviceTitle = services.find((s) => s.id === serviceId).title;

    if (currentSlot.status === "available") {
      // Navigate to Booking component with service details
      navigate("/booking", {
        state: {
          serviceId,
          serviceTitle,
          selectedTime: currentSlot.time,
          serviceDescription: services.find((s) => s.id === serviceId)
            .description,
        },
      });
    } else if (currentSlot.status === "booked") {
      if (currentSlot.bookedBy === CURRENT_USER_ID) {
        const confirmCancel = window.confirm(
          `Are you sure you want to cancel YOUR booking for "${serviceTitle}" at ${currentSlot.time}?`
        );

        if (confirmCancel) {
          serviceSlots[slotIndex] = {
            ...currentSlot,
            status: "available",
            bookedBy: null,
          };
          updatedTimings[serviceId] = serviceSlots;
          setCurrentServiceTimings(updatedTimings);
          alert(
            `✅ Your booking for "${serviceTitle}" at ${currentSlot.time} has been cancelled.`
          );
        }
      } else {
        alert(
          `This slot is booked by someone else and cannot be cancelled by you.`
        );
      }
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        {selectedService ? (
          <div className="service-details-view">
            <button onClick={handleBackToServices} className="back-button btn">
              &larr; Back to Services
            </button>
            <h2 className="section-title">{selectedService.title}</h2>
            <p className="service-detail-description">
              {selectedService.description}
            </p>

            <div className="service-pricing">
              <h3>Pricing & Duration</h3>
              <div className="pricing-cards">
                <div className="pricing-card basic">
                  <h4>Basic</h4>
                  <div className="price">${selectedService.price.basic}</div>
                  <p className="duration">
                    Duration: {selectedService.duration}
                  </p>
                  <ul>
                    <li>Standard service</li>
                    <li>Quality products</li>
                    <li>Professional care</li>
                  </ul>
                </div>
                <div className="pricing-card premium">
                  <h4>Premium</h4>
                  <div className="price">${selectedService.price.premium}</div>
                  <p className="duration">
                    Duration: {selectedService.duration}
                  </p>
                  <ul>
                    <li>Enhanced service</li>
                    <li>Premium products</li>
                    <li>Extended care</li>
                    <li>Additional benefits</li>
                  </ul>
                </div>
                <div className="pricing-card luxury">
                  <h4>Luxury</h4>
                  <div className="price">${selectedService.price.luxury}</div>
                  <p className="duration">
                    Duration: {selectedService.duration}
                  </p>
                  <ul>
                    <li>VIP treatment</li>
                    <li>Luxury products</li>
                    <li>Comprehensive care</li>
                    <li>Exclusive benefits</li>
                    <li>Priority booking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="service-features">
              <h3>What's Included:</h3>
              <ul>
                <li>Professional service by experienced staff</li>
                <li>High-quality products and materials</li>
                <li>Comfortable and relaxing environment</li>
                <li>Personalized attention and care</li>
              </ul>
            </div>

            <div className="service-actions">
              <button
                className="book-now-button"
                onClick={() => handleBookNow(selectedService.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="section-title">Our Pampering Services</h2>
            <p className="section-subtitle">
              Discover a world of beauty and relaxation designed just for you.
            </p>

            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <button
                    className="learn-more-button"
                    onClick={() => handleLearnMoreClick(service.id)}
                  >
                    Learn More & Book
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Services;
