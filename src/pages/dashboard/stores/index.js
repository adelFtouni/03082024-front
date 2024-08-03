import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './index.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import { TiTick, TiTimes } from 'react-icons/ti';
import { BsEyeFill } from 'react-icons/bs';
import { BiCamera, BiImageAlt, BiPhotoAlbum } from 'react-icons/bi';
import { CgCamera } from 'react-icons/cg';
const socket = io('http://localhost:5000');
Modal.setAppElement('#root');

function Stores() {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState(null);
  const [imageBeforeUpdate, setImageBeforeUpdate] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [store, setStore] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [storess, setStoress] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  //////////////////////////////////////
  const saveBeforeUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (imageBeforeUpdate) {
      formData.append('image', imageBeforeUpdate);
    }

    try {
      const response = await axios.post('http://localhost:5000/stores/saveBeforeUpdate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUrl(response.data.imageUrl);
      console.log(response.data.imageUrl);
      setImageBeforeUpdate(response.data.imageUrl);
      console.log(imageBeforeUpdate)
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('content', content);
    if (newImage) {
      formData.append('image', newImage);
    }

    await axios.post('http://localhost:5000/saveNewImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, (response) => {
      setImageBeforeUpdate(response.data.imageUrl);
      console.log(response.data.imageUrl)
    });

    console.log(imageBeforeUpdate)
  };
  /////////////////////////////////////////////
  const saveNewImage = async (storeId, newImage) => {
    try {
      if (!storeId) {
        throw new Error('Missing required field: id');
      }

      const formData = new FormData();
      formData.append('image', newImage);

      const response = await axios.post(`http://localhost:5000/saveNewImage`, formData);

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status !== 200) {
        throw new Error('Store not found');
      } else {
        return response.data;
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };



  ////////////////////////////////////////

  const handleFileChange = (e) => {
    setNewImage({

      image: e.target.files[0]
    });
    console.log(newImage)
  };
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setNewImage(reader.result);

    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  const handleOpenModal = (index) => {
    const selectedStore = stores[index];
    setStore(selectedStore);
    console.log(selectedStore);
    setIsOpen(true);
  };
  // const getStoreById = async (id) => {
  //   await setStoress(stores); 
  //   console.log(storess)// assuming fetchStores() returns a promise that resolves to the array of stores
  //   for (let i = 0; i < storess.length; i++) {
  //     if (storess[i]._id === id) {
  //       setStore( storess[i]);
  //       console.log(store)
  //     }
  //   }
  //   return null;
  // };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  // const storeData = {
  //   imageUrl: 'https://res.cloudinary.com/free-lancer122/image/upload/v1717150961/uonjtnzscnzxtlhsxwff.png',
  //   imagePublicId: 'uonjtnzscnzxtlhsxwff',
  //   name: 'hadi',
  //   currency: 'usd',
  //   address: 'nabatieh',
  //   approved: false,
  //   deliveryTime: '20-25min',
  //   description: 'fngfn',
  //   exchangeRate: 89997,
  //   openUntil: '02:00am',
  //   reviews: [],
  //   sectionId: '6656cb15fda3b4124c90cec2',
  //   whatTheySell: 'shoes,t-shirt-sport stuffs',
  //   _id: '6659a4f2f84677aa3eea023d',
  //   __v: 0,
  // };

  const [formData, setFormData] = useState({});
  //-----------------------------------------------
  const [stores, setStores] = useState([]);
  const [approvals, setApprovals] = useState([]);

  const updateStore = async (storeId) => {
    try {
      const updates = { id: storeId, approved: true };

      if (!storeId) {
        throw new Error('Missing required field: id');
      }

      const response = await axios.put('http://localhost:5000/stores/approve', updates);

      if (response.status !== 200) {
        throw new Error('Store not found');
      }
      document.getElementById('approve').ariaDisabled = true;

      const updatedStores = stores.map((store) => {
        if (store._id === storeId) {
          return { ...store, approved: true };
        }
        return store;
      });

      setStores(updatedStores);
      setApprovals((prevApprovals) => {
        const newApprovals = [...prevApprovals];
        newApprovals[stores.findIndex((store) => store._id === storeId)] = true;
        return newApprovals;
      });

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////
  const approve = async (storeId) => {
    try {
      const updates = { id: storeId, approved: true, imageUrl: url };

      if (!storeId) {
        throw new Error('Missing required field: id');
      }

      const response = await axios.put('http://localhost:5000/stores/approveWithImage', updates);

      if (response.status !== 200) {
        throw new Error('Store not found');
      }
      else {
        setCount(count + 1);
        console.log(response);
      }
      const updatedStores = stores.map((store) => {
        if (store._id === storeId) {
          return { ...store, approved: true };
        }
        return store;
      });

      setStores(updatedStores);
      setApprovals((prevApprovals) => {
        const newApprovals = [...prevApprovals];
        newApprovals[stores.findIndex((store) => store._id === storeId)] = true;
        return newApprovals;
      });

      console.log(response.data.message);
      setIsOpen(false);
      setImageBeforeUpdate(null);
      setUrl(null)
      return response.data.message;

    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////
  const rejectStore = async (storeId) => {
    try {
      const updates = { id: storeId, approved: false };

      if (!storeId) {
        throw new Error('Missing required field: id');
      }

      const response = await axios.put('http://localhost:5000/stores/reject', updates);

      if (response.status !== 200) {
        throw new Error('Store not found');
      }

      const updatedStores = stores.map((store) => {
        if (store._id === storeId) {
          return { ...store, approved: false };
        }
        return store;
      });

      setStores(updatedStores);
      setApprovals((prevApprovals) => {
        const newApprovals = [...prevApprovals];
        newApprovals[stores.findIndex((store) => store._id === storeId)] = false;
        return newApprovals;
      });

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const handleToast = () => {
    console.log(formData)
    toast.success(
      <div className="d-flex justify-content-between align-items-center">
        <span>new store</span>
        <button className='btn btn-success' >
          view request
        </button>

      </div>,
      {
        autoClose: 3000,
        width: '20rem'
      }
    );
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/stores/getStores');
        if (!response.ok) {
          throw new Error('Failed to fetch stores');
        }
        const data = await response.json();
        setStores(data);
        setStore(data[0]); // Assuming you want to set the first store here
        console.log(store);
        const approvals = data.map((store) => store.approved);
        setApprovals(approvals);
        approvals.forEach((approval, index, array) => {
          console.log(`approval at index ${index}: ${approval}`);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();

    socket.on('newStore', (newStore) => {
      console.log(newStore);
      setFormData(newStore);
      setStores((prevStores) => [...prevStores, newStore]);
      setApprovals((prevApprovals) => [...prevApprovals, newStore.approved]);
      setFormData(newStore);
      console.log(stores);
      // handleToast();
      toast.info('new store added')
    });
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImageBeforeUpdate(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    return () => {
      socket.off('newStore');
    };
  }, [count]);

  return (
    <div>

      <div className='d-flex gap-2 mb-3 align-items-center'><h1 className='mb-0'>Stores</h1>
        <Link className="ml-auto btn btn-primary" to='/addStore'>Add Store</Link>
      </div>
      <div className="card">
        <div className="post-list">
          {stores.map((post, index) => (
            <div key={post._id}>
              <div className="list-item d-flex gap-3">
                <div >
                  <img
                    src={post.imageUrl}
                    alt="image"
                  />
                </div>
                <div >
                  <p>
                    {`${post.name}`}
                    {approvals[index] && (
                      <span className="badge badge-success">Approved</span>
                    )}
                    {!approvals[index] && (
                      <span className="badge badge-danger">Rejected</span>
                    )}
                  </p>
                  <span>{`${post.name} - ${post._id}`} </span>
                  <small>{index} </small>
                </div>

                <div className="d-flex gap-2 btns ml-auto">
                  <button id="approve" disabled={approvals[index] == true ? true : false}
                    className="btn btn-primary"
                    onClick={() => updateStore(post._id)}
                  >
                    <TiTick /> approve
                  </button>
                  <button id="reject" disabled={!approvals[index] == true ? true : false}
                    className="btn btn-secondary"
                    onClick={() => rejectStore(post._id)}
                  >
                    <TiTimes /> reject
                  </button>
                  <button className="btn btn-outline" onClick={() => { handleOpenModal(index) }}><BsEyeFill /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />

        <div>
          <div>
            {/* Your trigger button or element to open the modal 
            <button onClick={() => handleOpenModal()}>Open Modal</button>*/}

            {/* Your modal */}
            <Modal
              isOpen={isOpen}
              onRequestClose={handleCloseModal}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                  width: '50%',
                  height: '50%',
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '20px',
                  border: 'none',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              {/* Your modal content */}
              <div>
                <div className='container text-center'>
                  <div className='row'>
                    <div className='col-6'>

                      <label className='mb-2'>old image</label>
                      <div className='image'>
                        <img
                          style={{ width: '100px', height: '100px' }}
                          src={store?.imageUrl || ''}
                          alt="Store Image"
                        /></div>
                    </div>
                    <div className='col-6'>

                      <label className='mb-2'>new image</label>
                      {/*{selectedImage && (<>
                        
                      <img
                          src={selectedImage}
                          alt='newly selected image'
                          style={{ width: '100px', height: '100px' }}
                        />
                        </>
                      )}*/}
                      <div className='image'>
                        {imageBeforeUpdate ?
                          <img style={{ width: '150px', height: '150px' }} src={imageBeforeUpdate} alt='' />
                          :
                          <BiImageAlt class='text-primary' style={{ fontSize: "50px" }} />
                        }

                        <form onSubmit={saveBeforeUpdate}>

                          <input
                            type="file"
                            onChange={(e) => setImageBeforeUpdate(e.target.files[0])}
                          />

                          {imageBeforeUpdate && !url && (

                            <button className='btn btn-outline' type="submit">display image</button>
                          )}

                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='row'>

                  </div>
                </div>


              </div>
              <div className='d-flex justify-content-center mt-5 gap-3'>
                <button className='btn btn-secondary' style={{width: "200px"}} onClick={() => { setIsOpen(false); setImageBeforeUpdate(null); setUrl(null) }}>close</button>
                <button className='btn btn-primary' style={{width: "200px"}} onClick={() => { approve(store._id) }}>approve</button>
              </div>
              <form onSubmit={handleSubmit}>


              </form>


            </Modal>
          </div>
        </div>
      </div>





    </div>
  );
}

export default Stores;