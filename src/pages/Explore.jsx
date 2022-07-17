import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import Slider from '../components/Slider';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Entdecke</p>
      </header>

      <main>
        <Slider />
        <p className='exploreCategoryHeading'>Kategorien</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='rent'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Zu Vermieten</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellCategoryImage}
              alt='sell'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Zu Verkaufen</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
