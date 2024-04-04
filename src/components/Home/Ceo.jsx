import React from 'react'

function Ceo() {
  return (
    <>
  <section className="pt-10 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-16">
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div className="grid items-center grid-cols-1 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-gray-600 sm:text-4xl lg:text-5xl">Hey 👋 I'm
          <br className="block sm:hidden" /> <span className='font-bold text-6xl text-blue-600'>Satyam Kumar</span> <br className="block sm:hidden" /> <span className=' text-2xl text-gray-800'>Founder of coding junction.</span>
        </h2>
        <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
        A CSE engineering graduate, proficient in MERN stack, founded Coding Junction. With expertise in MongoDB, Express.js, React.js, and Node.js, they drive community learning and empower developers.        </p>
        <p className="mt-4 text-xl text-gray-600 md:mt-8">
          <span className="relative inline-block">
            <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300" />
            <span className="relative"> Have a question? </span>
          </span>
          <br className="block sm:hidden" />Ask me on <a href="#" title className="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Twitter</a>
        </p>
      
      </div>
      <div className="relative z-0">
        <img className="absolute z-0 inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt />
        <img className="relative z-0 md:h-[90vh] w-full md:w-[80%] xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="../../../public/images/satyam1.png" alt />
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Ceo