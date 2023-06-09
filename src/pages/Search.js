import React,{useState,useEffect} from 'react'
import './Search.css';

import { app } from '../firebase';

import { collection, query, where, getDocs,or,and  } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import Select from 'react-select';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {doc,updateDoc} from "firebase/firestore"; 
import {arrayUnion } from "firebase/firestore";


const db = getFirestore(app)

function Search() {

  const data = [
    {
      value: "Durg",
      label: "Durg"
    },
    {
      value: "Raipur",
      label: "Raipur"
    },
    {
      value: "Bhilai",
      label: "Bhilai"
    },
    {
      value: "Kavardha",
      label: "Kavardha"
    },
    {
      value: "Mumbai",
      label: "Mumbai"
    },
    {
      value: "Delhi",
      label: "Delhi"
    }
  ];

  const degreedata = [
    {
      value: "Btech",
      label: "Btech"
    },
    {
      value: "Mtech",
      label: "Mtech"
    },
    {
      value: "Bsc",
      label: "Bsc"
    },
    {
      value: "Msc",
      label: "Msc"
    },
    {
      value: "Bcom",
      label: "Bcom"
    },
    {
      value: "MBBS",
      label: "MBBS"
    },
    {
      value: "MBA",
      label: "MBA"
    },
    {
      value: "Mass communication",
      label: "Mass communication"
    },
    {
      value: "Engineering",
      label: "Engineering"
    },
    {
      value: "Chartered accountant",
      label: "Chartered accountant"
    },
    {
      value: "Fashion Designing",
      label: "Fashion Designing"
    },
    {
      value: "Civil services",
      label: "Civil services"
    },
    {
      value: "Accounts & Finance",
      label: "Accounts & Finance"
    },
    {
      value: "Mtech",
      label: "Mtech"
    },
    {
      value: "Law",
      label: "Law"
    },
    {
      value: "Hotel management",
      label: "Hotel management"
    },
    {
      value: "BBA",
      label: "BBA"
    },
    {
      value: "B.Pharma",
      label: "B.Pharma"
    },
    {
      value: "M.Pharma",
      label: "M.Pharma"
    },
    {
      value: "B.Ed",
      label: "B.Ed"
    },
    {
      value: "BCA",
      label: "BCA"
    },
    {
      value: "MCA",
      label: "MCA"
    },
    {
      value: "B.Arch",
      label: "B.Arch"
    },
    {
      value: "Journalism",
      label: "Journalism"
    }
  ];

  const religiondata = [
    {
      value: "Hindu",
      label: "Hindu"
    },
    {
      value: "Muslim",
      label: "Muslim"
    },
    {
      value: "Christian",
      label: "Christian"
    },
    {
      value: "Sikh",
      label: "Sikh"
    },
    {
      value: "Bauddhist",
      label: "Bauddhist"
    },
    {
      value: "Zoroastrian",
      label: "Zoroastrian"
    },
    {
      value: "Jain",
      label: "Jain"
    },
    {
      value: "Judaism",
      label: "Judaism"
    },
    {
      value: "Non-Religious",
      label: "Non-Religious"
    }
  ];

  const castedata = [
    {
      value: "Yadav",
      label: "Yadav"
    },
    {
      value: "Sahu",
      label: "Sahu"
    },
    {
      value: "Verma",
      label: "Verma"
    },
    
   
  ];

  const incomedata = [
    {
      value: "100000",
      label: "100000"
    },
    {
      value: "200000",
      label: "200000"
    },
    {
      value: "500000",
      label: "500000"
    },
    
  ];

  // set value for default selection
  const [cityValue, setcityValue] = useState(null);
  const [degree, setDegree] = useState(null);
  const [religion, setReligion] = useState(null);
  const [caste, setCaste] = useState(null);
  const [income, setIncome] = useState(null);
  const [selected,setSelected] = useState("");


  

  const handleSelected = (u) =>{
    setSelected(u);
    setShow(true);
   
   
  }

  // const getsentmembers = async () => {

  //   const auth = getAuth();
  //   const sender = auth.currentUser;
  //   return await getDocs(collection(db, `users/${sender.username}/sentrequests`));
   
  // };


  const handleConnect = async(r) =>{


    const auth = getAuth();
    const sender = auth.currentUser;

    console.log(`sender : ${sender.displayName}`);
    console.log(`receiver : ${r.username}`);

    // receiving
     const receivedRef = doc (db,`users`,`${r.username}`);
      await  updateDoc(receivedRef,  {
        receivedrequests: arrayUnion(sender.displayName)
       })
    

       //sending
      const sendRef = doc (db,`users`,`${sender.displayName}`);
        await updateDoc(sendRef,  {
        sentrequests: arrayUnion(r.username)
       })


  }

  




  // handle onChange event of the dropdown
  const handleChange = e => {
    setcityValue(e.value);
  }

  const handleDegree = e => {
    setDegree(e.value);
    // applyFilter();
  }
  const handleReligion = e => {
    setReligion(e.value);
  }
  const handleCaste = e => {
    setCaste(e.value);
  }
  const handleIncome = e => {
    setIncome(e.value);
  }

  const [members, setmembers] = useState([]);

  
  const [prev, setPrev] = useState([]);

  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

 

  // const printer = () =>{
  //   console.log(`city selected:`, cityValue);
  //   console.log(`degree selected:`, degree);
  //   console.log(`religion selected:`, religion);
  //   console.log(`caste selected:`, caste);
  //   console.log(`income selected:`, income);
  // }


  const getAllmembers = async () => {
    return await getDocs(collection(db, "users"));
   
  };

  const fetchAllmembers = async () => {
    const result = await getAllmembers();

    if (!result) {
      return;

    }

    const tempmembers = [];
    result.forEach((doc) => tempmembers.push({ ...doc.data(), pid: doc.id }));

    setmembers(tempmembers);
    setPrev(tempmembers);
    // console.log(members);
  };


  const applyFilter = async() =>{

    // const q1 = query(collection(db, "users"), and(
                                            //  where("caste", "==", caste),
                                            //  where("degree", "==", degree),
                                            //  where("income", "==", income),
                                            //  where("religion", "==", religion),
                                            //  where("city", "==", cityValue)
                                            //  ));
                                             
    const q2 = query(collection(db, "users"),
                                             or(
                                              and(
                                                 where("caste", "==", caste),
                                                 where("degree", "==", degree),
                                                 where("income", "==", income),
                                                 where("religion", "==", religion),
                                                //  where("city", "==", cityValue)
                                                 ),
                                                 or(
                                                  where("caste", "==", caste),
                                                  where("degree", "==", degree),
                                                  where("income", "==", income),
                                                  where("religion", "==", religion),
                                                 //  where("city", "==", cityValue)
                                                   )

                                             ) 
                                           
                                             );

    const querySnapshot = await getDocs(q2);
   
    const tmp = [];
    querySnapshot.forEach((doc) => tmp.push({ ...doc.data(), pid: doc.id }));


    setmembers(tmp);

  }

  const clearFilter = () =>{
    // console.log("cleared");
    setmembers(prev)
    setCaste(null);
    setDegree(null);
    setcityValue(null);
    setIncome(null);
    setReligion(null);
  }




 

  useEffect(() => {

    fetchAllmembers();
    // eslint-disable-next-line
  }, []);


 
   

  return (
    <div className='mc' style={{marginLeft:"12%"}}>
     <div className="searchBarwrapper">
  <div id="search-scontainer">
    <input type="search" id="search-input" placeholder="Search here.."/>
    <button id="searchbtn" type='submit' onClick={applyFilter} >Search</button>
    <button id="clr" type='submit' onClick={clearFilter} >Clear Filter</button>
  </div>
  <div id="buttons d-flex flex-row">
    
  <div class="container selectContainer">
 
  <div class="row">
    <div class="col">



    <Select
        placeholder="City"
        // className='button-value'
        value={data.filter(obj => obj.value === cityValue)} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
      />
    </div>
    <div class="col">
    <Select
        placeholder="Income"
        // className='button-value'
        value={incomedata.filter(obj => obj.value === income)} // set selected value
        options={incomedata} // set list of the data
        onChange={handleIncome} // assign onChange function
      />
    </div>
    <div class="col">
    <Select
        placeholder="Religion"
        // className='button-value'
        value={religiondata.filter(obj => obj.value === religion)} // set selected value
        options={religiondata} // set list of the data
        onChange={handleReligion} // assign onChange function
      />
    </div>
    <div class="col">
    <Select
        placeholder="Caste"
        // className='button-value'
        value={castedata.filter(obj => obj.value === caste)} // set selected value
        options={castedata} // set list of the data
        onChange={handleCaste} // assign onChange function
      />
    </div>
    <div class="col">
  

<Select
        placeholder="Qualification"
        // className='button-value'
        value={degreedata.filter(obj => obj.value === degree)} // set selected value
        options={degreedata} // set list of the data
        onChange={handleDegree} // assign onChange function
      />
    </div>
  </div>
</div>

   
   
  </div>
  <div  />

</div>
        
   <div className="container membercontainer">

   {
      members.length === 0 &&
  (

    <p>No result found</p>
    // <div class="d-flex justify-content-center">
    // <div class="spinner-border" role="status">
    //   <span class="visually-hidden">Loading...</span>
    // </div>
    // </div>



  )
      
   }

  <div className="row row-cols-1  row-cols-md-4 ">


   

  { members.map((item) => (
 
    <div className="col-sm-4" >
      <div className="card" style={{width: '100%'}} >
        <img src="https://www.w3schools.com/howto/img_avatar.png"  className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {item.fullName}</h5>
          <p className="card-text">
          Qualification : {item.degree} <br/>
          Gender : {item.gender} <br/>
          Religion : {item.religion} <br/>
          Caste : {item.caste}
      
          </p>


      <div >

      <Button className='detailBtn' variant="primary" onClick={() => handleSelected(item)}>Full Details</Button>
      <h6 className="connectBtn" variant="secondary" onClick={() => handleConnect(item)}>  connect  </h6>

        </div>
      

  

     <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          {selected.fullName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center">
              <img
                className="rounded-circle mt-5"
                width="150px"
                alt='img'
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span className="font-weight-bold">{selected.username}</span>
              <span className="text-black-50">{selected.email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-4 border-right">
            <div className="p-2 py-2">
              <div className="d-flex justify-content-between align-items-center">
                <u><h5 className="text-right" style={{fontWeight:"bold",fontFamily:"Palatino",color:"red"}}>Basic Details</h5></u>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Full Name: {selected.fullName}</h6>
                 
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>DOB : {selected.dob}</h6>
                  
                </div>
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Birth Place: {selected.pob}</h6>
                 
                </div>
                <div className="col-md-6">
                <h6 style={{fontFamily:"Palatino"}}>Gender: {selected.gender}</h6>
                 
                </div>
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Phone Number: {selected.contact}</h6>
                  
                </div>
                <div className="col-md-6">
                <h6 style={{fontFamily:"Palatino"}}>Height: {selected.height}</h6>
                  
                </div> 
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <u><h5 className="text-right" style={{fontWeight:"bold",fontFamily:"Palatino",color:"red"}}>Eductional Details</h5></u>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                <h6 style={{fontFamily:"Palatino"}}>College Name : {selected.collegeName}</h6>
                 
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Year Of Passing: {selected.yop}</h6>
                
                </div>
                <div className="col-md-6">
                <h6 style={{fontFamily:"Palatino"}}>Degree: {selected.degree}</h6>
                 
                </div>  
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <u><h5 className="text-right" style={{fontWeight:"bold",fontFamily:"Palatino",color:"red"}}>Professional Details</h5></u>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Employed In: {selected.workplace}</h6>
                  
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Annual Income: {selected.income}</h6>
                 
                </div>
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Phone Number: {selected.contact}</h6>
                  
                </div>  
              </div>
              
              
             
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-2 py-2">
              <div className="d-flex justify-content-between align-items-center experience">
                <u><h5 style={{fontWeight:"bold",fontFamily:"Palatino",color:"red"}}><span>Background Details</span></h5></u>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Religion: {selected.religion}</h6>
                  
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}} >Caste: {selected.caste}</h6>
                 
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Sub Caste: {selected.subcaste}</h6>
                  
                </div>
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Rashi: {selected.rashi}</h6>
                
                </div>
                <div className="d-flex justify-content-between align-items-center experience mt-3">
                <u><h5 style={{fontWeight:"bold",fontFamily:"Palatino",color:"red"}}><span>Family Details</span></h5></u>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Father Name: {selected.fathersName}</h6>
                  
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Mother Name: {selected.mothersName}</h6>
                 
                </div>
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Father Occupation:{selected.fatherOccupation}</h6>
                
                </div>
                <div className="col-md-6">
                 <h6 style={{fontFamily:"Palatino"}}>Mother Occupation: {selected.motherOccupation}</h6>
                 
                </div>
                <div className="col-md-6">
                <h6 style={{fontFamily:"Palatino"}}>Family Type:{selected.familyType}</h6>
                 
                </div>
                <div className="col-md-6">
                  <h6 style={{fontFamily:"Palatino"}}>Family Lives: {selected.familyLives}</h6>
                 
                </div>
                </div>
                
                </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
        </Modal.Body>
      </Modal>


        </div>
        
      </div>


    </div>

      ))}

  </div>
  
</div>

 </div>
  )
}

export default Search