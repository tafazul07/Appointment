import React, { createContext, useState, useContext } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Hair Styling",
      description:
        "Professional haircuts, coloring, and styling tailored to your unique look.",
      icon: "💇‍♀️",
      price: {
        basic: 45,
        premium: 85,
        luxury: 120,
      },
      duration: "1-2 hours",
    },
    {
      id: 2,
      title: "Manicure & Pedicure",
      description:
        "Indulge in luxurious treatments for perfectly pampered hands and feet.",
      icon: "💅",
      price: {
        basic: 35,
        premium: 65,
        luxury: 95,
      },
      duration: "1 hour",
    },
    {
      id: 3,
      title: "Facials & Skincare",
      description:
        "Rejuvenate your skin with customized facial treatments and expert skincare advice.",
      icon: "🧖‍♀️",
      price: {
        basic: 60,
        premium: 90,
        luxury: 150,
      },
      duration: "1-1.5 hours",
    },
    {
      id: 4,
      title: "Massage Therapy",
      description:
        "Relax and unwind with a variety of therapeutic massage techniques.",
      icon: "💆",
      price: {
        basic: 70,
        premium: 100,
        luxury: 140,
      },
      duration: "1 hour",
    },
    {
      id: 5,
      title: "Makeup Artistry",
      description:
        "Flawless makeup for special occasions, bridal, or everyday enhancement.",
      icon: "💄",
      price: {
        basic: 50,
        premium: 80,
        luxury: 120,
      },
      duration: "1-1.5 hours",
    },
    {
      id: 6,
      title: "Waxing & Threading",
      description:
        "Smooth, long-lasting hair removal services for face and body.",
      icon: "✨",
      price: {
        basic: 25,
        premium: 45,
        luxury: 65,
      },
      duration: "30-45 mins",
    },
  ]);

  const addService = (newService) => {
    console.log("Current services before adding:", services);
    setServices((prevServices) => {
      const updatedServices = [...prevServices, newService];
      console.log("Updated services after adding:", updatedServices);
      return updatedServices;
    });
  };

  const updateService = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const deleteService = (serviceId) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId)
    );
  };

  return (
    <ServiceContext.Provider
      value={{ services, addService, updateService, deleteService }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
