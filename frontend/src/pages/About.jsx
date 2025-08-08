import React from 'react';
import { Target, Heart, Users, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Our Mission',
      description:
        'To empower farmers with knowledge, tools, and resources needed to build resilient agricultural practices that withstand climate challenges and ensure food security for future generations.',
    },
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: 'Our Vision',
      description:
        'A world where every farmer has access to sustainable farming techniques and drought-resistant practices, creating thriving agricultural communities that prosper despite environmental challenges.',
    },
    {
      icon: <Users className="h-8 w-8 text-success" />,
      title: 'Community Focus',
      description:
        'We believe in the power of community-driven knowledge sharing, connecting farmers with experts and peers to create a supportive network of agricultural innovation and mutual support.',
    },
    {
      icon: <Globe className="h-8 w-8 text-warning" />,
      title: 'Global Impact',
      description:
        'Our resources and techniques are designed to address climate challenges worldwide, with special focus on drought-prone regions and communities most affected by climate change.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-soft to-secondary">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">About AgriSupport</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Born from a passion for sustainable agriculture and driven by the urgent need to address
            climate challenges, AgriSupport is dedicated to empowering farmers with the knowledge and
            tools they need to thrive in a changing environment.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              AgriSupport was founded in response to the growing challenges farmers face due to
              climate change, particularly drought conditions that threaten crop yields and
              farming livelihoods worldwide.
            </p>
            <p>
              Our team of agricultural experts, environmental scientists, and technology
              specialists came together with a shared vision: to create a comprehensive
              platform that would democratize access to sustainable farming knowledge.
            </p>
            <p>
              What started as a small initiative to help local farmers has grown into a
              global platform serving thousands of agricultural communities, providing
              practical solutions for drought preparedness, soil conservation, and
              sustainable farming practices.
            </p>
            <p>
              Today, AgriSupport continues to evolve, incorporating the latest research
              in climate-resilient agriculture and feedback from the farming communities
              we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Our Values & Commitment</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything we do is guided by our core values and unwavering commitment
              to supporting agricultural communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div className="w-fit p-4 bg-muted rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Our Growing Impact</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Through dedicated efforts and community collaboration, we're making a real
            difference in agricultural communities worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-soft rounded-xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-lg font-medium text-primary/80 mb-2">Farmers Reached</div>
              <p className="text-sm text-muted-foreground">
                Active farmers using our resources across multiple regions
              </p>
            </div>

            <div className="bg-accent/20 rounded-xl p-8">
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-lg font-medium text-accent mb-2">Educational Resources</div>
              <p className="text-sm text-muted-foreground">
                Comprehensive guides, tips, and educational materials
              </p>
            </div>

            <div className="bg-success/20 rounded-xl p-8">
              <div className="text-4xl font-bold text-success mb-2">25+</div>
              <div className="text-lg font-medium text-success mb-2">Partner Organizations</div>
              <p className="text-sm text-muted-foreground">
                Collaborating with agricultural institutions and NGOs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
