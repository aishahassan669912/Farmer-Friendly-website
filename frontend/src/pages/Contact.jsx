import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaQuestionCircle,
  FaTools,
  FaUserTie,
} from "react-icons/fa";

export default function Contact() {
  const contacts = [
    {
      title: "Email Us",
      value: "support@agrisupport.com",
      description: "Send us your questions anytime",
      icon: <FaEnvelope className="text-green-500 w-5 h-5" />,
    },
    {
      title: "Call Us",
      value: "+1 (555) 123-4567",
      description: "Mon–Fri, 8AM–6PM local time",
      icon: <FaPhoneAlt className="text-orange-500 w-5 h-5" />,
    },
    {
      title: "Visit Us",
      value: "Agricultural Support Center",
      description: "123 Farming District, Rural County",
      icon: <FaMapMarkerAlt className="text-green-500 w-5 h-5" />,
    },
    {
      title: "Office Hours",
      value: "Monday – Friday",
      description: "8:00 AM – 6:00 PM",
      icon: <FaClock className="text-yellow-500 w-5 h-5" />,
    },
  ];

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
        <p className="text-gray-600 text-center mb-12">
          We’d love to hear from you! Please fill out the form below or reach out via our contact details.
        </p>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 shadow-sm rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="bg-gray-100 p-3 rounded-full mb-4">
                {contact.icon}
              </div>
              <h3 className="text-lg font-semibold">{contact.title}</h3>
              {contact.value && (
                <p className="mt-1 font-medium text-gray-800">{contact.value}</p>
              )}
              <p className="text-gray-500 text-sm">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form + Support Options */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT COLUMN - Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-green-600">✈</span> Send us a Message
          </h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>

          <form className="space-y-4">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Phone & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Inquiry Category</label>
                <select className="w-full p-2 border rounded">
                  <option>Select category</option>
                  <option>General Questions</option>
                  <option>Technical Support</option>
                  <option>Expert Consultation</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium">Subject</label>
              <input
                type="text"
                placeholder="Brief description of your inquiry"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium">Message *</label>
              <textarea
                placeholder="Please provide details about your question or how we can help you..."
                rows="4"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN - Support Options */}
        <div>
          <h2 className="text-2xl font-bold mb-2">How Can We Help?</h2>
          <p className="text-gray-600 mb-6">
            Choose the support option that best matches your needs, and we’ll connect
            you with the right resources and experts.
          </p>

          <div className="space-y-4">
            {/* Option 1 */}
            <div className="flex items-start gap-4 p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <FaQuestionCircle className="text-green-600 text-xl mt-1" />
              <div>
                <h3 className="font-semibold">General Questions</h3>
                <p className="text-gray-600 text-sm">
                  Questions about our platform, resources, or getting started with sustainable farming practices.
                </p>
              </div>
            </div>

            {/* Option 2 */}
            <div className="flex items-start gap-4 p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <FaTools className="text-gray-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold">Technical Support</h3>
                <p className="text-gray-600 text-sm">
                  Issues with website functionality, downloading resources, or accessing educational materials.
                </p>
              </div>
            </div>

            {/* Option 3 */}
            <div className="flex items-start gap-4 p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <FaUserTie className="text-green-700 text-xl mt-1" />
              <div>
                <h3 className="font-semibold">Expert Consultation</h3>
                <p className="text-gray-600 text-sm">
                  Connect with agricultural experts for personalised advice on drought resistance and crop management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
