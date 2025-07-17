import React from 'react'
import Navbar from '../Components/Navbar'
import Headar from '../Components/Headar'
import Fottar from '../Components/Fottar'
import BlogList from '../Components/BlogList'
import BlogCard from '../Components/BlogCard'
import Newsletter from '../Components/Newsletter'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fdfcfa] text-[#111827] font-inter transition-all duration-500">

      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Headar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filter / Categories */}
        <BlogList />

        {/* Blog Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mt-10">
          <BlogCard />
          {/* More BlogCards... */}
        </div>
      </div>

      {/* Newsletter - Frosted Glass Look */}
      <div className="bg-white/80 backdrop-blur-lg border border-[#e2e8f0] shadow-2xl rounded-3xl max-w-5xl mx-auto my-20 px-8 py-16 text-center">
        <Newsletter />
      </div>

      {/* Footer */}
      <Fottar />
    </div>
  )
}

export default Home
