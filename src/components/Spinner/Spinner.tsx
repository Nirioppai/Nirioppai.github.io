import spinner from '~/assets/spinner.svg';

const Spinner = () => (
  <div>
    <img src={spinner} alt='Loading...' className='h-24' />
  </div>
);

export default Spinner;
