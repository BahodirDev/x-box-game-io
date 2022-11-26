import './App.css';
import { useEffect, useState } from 'react';
import Home_page from './components/Home_page';
import Navbar from './layouts/Navbar';
import Error from './layouts/Error';
import Shop from './components/cards/Shop';
import { Toaster } from 'react-hot-toast';

function App() {

  const [posts, setPosts] = useState([])
  const [posts2, setPosts2] = useState([])
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(12)
  const [isOpen, setIsOpen] = useState({
    status: '',
    open: false
  });

  const [shop, setShop] = useState([])
  const [shop2, setShop2] = useState([])

  useEffect(() => {
    getApi()
  }, []);

  const getApi = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'string',
        'X-RapidAPI-Key': '2b93e030a1msh1f83bdaa18b25dcp1d2732jsn60aaf549e241',
        'X-RapidAPI-Host': 'fortnite1.p.rapidapi.com'
      }
    };

    await fetch('https://fortnite1.p.rapidapi.com/store/get', options)
      .then(response => response.json())
      .then(res => {
        setPosts(res.data)
        setPosts2(res.data)
      })
      .catch(err => console.error(err));
  }

  const getLimit = (son) => {
    setLimit(son)
  }

  const getValue = (search) => {
    if (search) {
      let newMass = posts.filter(s => s.item.name == search);
      if (newMass = []) {
        setError(true)
      } else {
        setError(false)

      }
      setPosts2(newMass)
    } else {
      setPosts2(posts)
    }

  }

  const getDetails = (obj, status) => {

    if (status == 'shop') {
      let isExist = shop.some(s => s.id === obj.id)
      if (isExist) {
        let newMass = shop.map((item) => {
          if (item.id === obj.id) {
            return {
              ...item,
              miqdor: item.miqdor + 1
            }
          } else {
            return item
          }
        });
        setShop(newMass)
      } else {
        setShop([...shop, { ...obj, miqdor: 1 }])
      }
    } else {
      let isExist = shop2.some(s => s.id === obj.id)
      if (isExist) {
        let newMass = shop2.map((item) => {
          if (item.id === obj.id) {
            return {
              ...item,
              miqdor: item.miqdor + 1
            }
          } else {
            return item
          }
        });
        setShop2(newMass)
      } else {
        setShop2([...shop2, { ...obj, miqdor: 1 }])
      }
    }




  }

  function getChange(status) {
    setIsOpen({
      open: true,
      status: status
    })
  }

  const removeList = (id, status) => {
    if (status == 'shop') {
      let newMass = shop.filter(s => s.id !== id);
      setShop(newMass)
    } else {
      let newMass = shop2.filter(s => s.id !== id);
      setShop2(newMass)
    }

  }


  const convertToShop = (obj) => {
    let isExist = shop.some(s => s.id === obj.id)
    if (isExist) {

      let newMass = shop.map((item) => {
        if (item.id === obj.id) {
          return {
            ...item,
            miqdor: item.miqdor + 1
          }
        } else {
          return item
        }
      });
      setShop(newMass)
    } else {
      setShop([...shop, { ...obj, miqdor: obj.miqdor }])
    }
    let newMass = shop2.filter(s => s.id !== obj.id);
    setShop2(newMass);
  }


  return (
    <>
    <Toaster />
      <Navbar
        getLimit={getLimit}
        getValue={getValue}
        getChange={getChange}
      />
      <div>
        {
          error
            ?
            <Error />
            :
            <Home_page
              limit={limit}
              posts={posts2}
              getDetails={getDetails}
            />
        }
      </div>
      {
        (isOpen.status == 'shop' && isOpen.open) &&
        <Shop
          setIsOpen={setIsOpen}
          shop={shop}
          removeList={removeList}
          isOpen={isOpen}
        />
      }
      {
        (isOpen.status == 'card' && isOpen.open) &&
        <Shop
          setIsOpen={setIsOpen}
          shop={shop2}
          removeList={removeList}
          isOpen={isOpen}
          convertToShop={convertToShop}
        />
      }
    </>

  );
}

export default App;
