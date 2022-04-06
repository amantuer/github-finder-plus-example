function About(){
 return (
   <div>
    <h1 className="text-6xl mb-4">Github Finder Plus</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a href='https://www.udemy.com/course/modern-react-front-to-back/'>
          {' '}
          React Front To Back
        </a>{' '}
        Udemy course by
        <strong>
          <a href='https://traversymedia.com'> Brad Traversy</a>
        </strong>
        . Add sort result feature by Amantuer Rewuhan. Now it can sort search result by 4 ways.
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.1</span>
      </p>
      <p className='text-lg text-gray-400'>
        Layout By:
        <a className='text-white' href='https://twitter.com/hassibmoddasser'>
          Hassib Moddasser
        </a>
      </p>   
      <p className='text-lg text-gray-400'>
        Add Sort Result Feature By:
        <a className='text-white' href='https://twitter.com/hassibmoddasser'>
          Amantuer Rewuhan
        </a>
      </p>   
   </div>
 );
}

export default About;