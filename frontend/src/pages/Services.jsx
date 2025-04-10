import React, { useEffect, useState } from 'react';

const Services = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: 'Event Booking',
      description: `Our platform offers a seamless event booking experience, allowing users to browse, filter, and book events with just a few clicks. Whether it's a tech seminar, cultural fest, or private celebration, users can view detailed event information, seat availability, and ticket pricing in real-time. Instant confirmations and digital receipts ensure transparency and convenience. We also allow group bookings and ticket sharing, making it easier for families and friends to attend events together.`,
    },
    {
      title: 'Event Management',
      description: `We provide robust tools for event organizers to manage every aspect of their event — from creation to completion. Organizers can add or update event details, set ticket pricing, manage capacities, and monitor bookings in real-time. They can also analyze booking trends, monitor total revenue collected, and update users on any changes. Whether you're hosting a single-day event or a week-long conference, our system ensures everything stays on track with minimal manual effort.`,
    },
    {
      title: 'Real-time Updates',
      description: `Stay connected with your audience by sending real-time updates about your event. From schedule changes and venue updates to speaker announcements and last-minute notices, our platform allows organizers to push updates instantly to all registered users. Users receive instant notifications and can access the latest event details at any time, ensuring a smooth and informed experience for everyone involved.`,
    },
    {
      title: 'Secure Payments',
      description: `Security is our top priority. All transactions are encrypted and processed through trusted payment gateways to ensure your data remains safe. Our system supports multiple payment options including credit/debit cards, UPI, net banking, and wallets. Upon successful payment, users receive instant confirmation, a detailed receipt, and assurance that their booking is secure. Refunds and cancellations are also handled with transparency and clarity.`,
    },
    {
      title: '24/7 Customer Support',
      description: `Our dedicated support team is available round-the-clock to assist users and organizers with any issues or queries. From troubleshooting login issues to handling ticket cancellations and refunds, our responsive support ensures quick resolutions. Users can reach us via email, in-app chat, or our contact form. We also maintain an extensive FAQ section and help center for self-service support.`,
    },
  ];

  return (
    <div className=" w-screen h-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-16">
      {loading ? (
        <div className="text-center text-gray-500 text-lg animate-pulse">
          Loading services...
        </div>
      ) : (
        <div className="max-w-6xl w-full">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-justify leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
