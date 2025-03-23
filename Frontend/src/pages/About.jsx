import React from 'react';



export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto text-center'>
      <h1 className='text-4xl font-bold mb-6 text-[#0F0E47]'>About HomeStock</h1>
      
      <div className='grid md:grid-cols-2 gap-10 items-center'>
        <div>
          <img 
            src='https://www.idzlink.com/Images/inventory-home-spotlight.png' 
            alt='Grocery Shopping' 
            className=''
          />
        </div>
        <div>
          <p className='mb-4 text-black-900'>
            HomeStock is your all-in-one home grocery management app, designed to make shopping easier, faster, and more organized. Whether you're meal planning, tracking household essentials, or coordinating with family, HomeStock helps streamline your shopping experience.
          </p> <br></br>
          <p className='mb-4 text-black-900'>
            Our mission is to simplify grocery shopping by providing a user-friendly platform that allows you to create, manage, and share shopping lists effortlessly. With real-time updates, budget tracking, and smart organization, HomeStock ensures that you never forget an essential item again.
          </p> <br></br>
          <p className='text-black-900'>
            Join thousands of satisfied users who have transformed the way they shop with HomeStock!
          </p>
        </div>
      </div>
    </div>
  );
}
