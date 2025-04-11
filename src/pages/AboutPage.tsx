
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative pt-16 pb-24 md:pb-32 bg-primary/5">
        <div className="max-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              Our Mission
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              At FlexFitness, we're passionate about empowering individuals on their fitness journey by providing premium equipment engineered for performance, durability, and results.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2010 by a team of fitness enthusiasts and engineers, FlexFitness began with a simple goal: to create gym equipment that seamlessly blends form and function.
              </p>
              <p className="text-muted-foreground mb-4">
                We noticed that fitness equipment on the market was either high-quality but prohibitively expensive, or affordable but poorly built. We set out to bridge this gap by designing premium products that are accessible to fitness enthusiasts of all levels.
              </p>
              <p className="text-muted-foreground">
                Over a decade later, we've grown into a leading provider of fitness equipment, serving customers across India and neighboring countries. Our commitment to quality, innovation, and customer satisfaction remains unchanged.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop"
                alt="FlexFitness team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="max-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight mb-6">
              Our Values
            </h2>
            <p className="text-muted-foreground">
              These core principles guide everything we do at FlexFitness, from product design to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Above All</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards for durability, safety, and performance.
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We're constantly exploring new materials, designs, and technologies to improve our products and enhance the workout experience for our customers.
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of community to motivate and inspire. We're proud to support fitness communities throughout India through sponsorships and partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight mb-6">
              Our Team
            </h2>
            <p className="text-muted-foreground">
              Meet the dedicated professionals behind FlexFitness who are passionate about helping you achieve your fitness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1578857332235-f39971be858b?w=400&auto=format&fit=crop"
                  alt="Vikram Kapoor"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Vikram Kapoor</h3>
              <p className="text-muted-foreground text-sm">CEO & Co-Founder</p>
            </div>

            <div className="text-center">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1610214552218-4a384a9a5a79?w=400&auto=format&fit=crop"
                  alt="Neha Verma"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Neha Verma</h3>
              <p className="text-muted-foreground text-sm">COO & Co-Founder</p>
            </div>

            <div className="text-center">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1629310997127-a702f89eaa92?w=400&auto=format&fit=crop"
                  alt="Rajesh Patil"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Rajesh Patil</h3>
              <p className="text-muted-foreground text-sm">Head of Product Design</p>
            </div>

            <div className="text-center">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1535325019257-3f8a7193a0c2?w=400&auto=format&fit=crop"
                  alt="Ananya Singh"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Ananya Singh</h3>
              <p className="text-muted-foreground text-sm">Customer Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="max-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold tracking-tight mb-6">
              Join the FlexFitness Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience premium fitness equipment designed to elevate your workouts and help you achieve your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
