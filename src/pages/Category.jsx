import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLasFetchedListing] = useState(null);
  const [noMoreListings, setNoMoreListings] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingsRef = collection(db, 'listings');

        //Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(3)
        );

        //Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLasFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // console.log(listings);
        // console.log(querySnap);
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Einträge konnten nicht abgerufen werden');
      }
    };

    fetchListings();
  }, [params.categoryName]);

  //Pagination / Load more
  const onFetchMoreListings = async () => {
    try {
      //Get reference
      const listingsRef = collection(db, 'listings');
      //Create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );

      //Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLasFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // console.log(listings);
      // console.log(querySnap);
      setListings((prevState) => [...prevState, ...listings]);
      setNoMoreListings(querySnap.empty);

      setLoading(false);
    } catch (error) {
      toast.error('Einträge konnten nicht abgerufen werden');
    }
  };
  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent' ? 'Zu Vermieten' : 'Zu Verkaufen'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => {
                return (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                );
              })}
            </ul>
          </main>

          <br />
          <br />
          {noMoreListings ? (
            <p>Keine weiteren Einträge</p>
          ) : (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Lade mehr
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
