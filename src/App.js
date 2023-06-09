import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import EducationDetails from "./EducationDetails";
import FamilyDetails from "./FamilyDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import Dashboard from './pages/Dashboard';
import MyConnection from './pages/MyConnection';
import MyRequests from './pages/MyRequests';
import NavTab from './components/NavTab'
import Signup from './Signup'
import Login from './Login'

import { useState,useEffect } from 'react';
import { auth } from "./firebase";
import ErrorPage from './ErrorPage';
import DeletePage from './DeletePage';

// import { Login } from './component/Login';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './component/Footer'
import { NavBar } from './component/NavBar'
import { Home } from './component/Home'


function App() {

	const [isAuthenticated,setIsAuthenticated] = useState(false);
	const [userName, setUserName] = useState("");
	// const [profilePhoto, setProfilePhoto] = useState(null);
	
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
		  if (user) {
			setUserName(user.displayName);
			// setProfilePhoto(user.photoURL);
			setIsAuthenticated(true)
		  } else {
			setUserName("")
		  };
		});
	  }, []);


  return (
	<>
	 {/* <NavBar/> */}

    <Router>
      
     {/* <NavBar/> */}
	 
 
    

		<Routes>

			

				
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} /> 
				<Route path="*" element={<Login />} />	
				{/* <Route path="/" element={<Home/>} />
                 <Route path="/login" element={<Login/>} /> */}
				
		


	

   

	{ isAuthenticated &&

       <>

        <Route path="/" element={<Dashboard name={userName}/>} />

		<Route path="/dashboard" element={<Dashboard name={userName}  />} />
  
		<Route path="/profile" element={<NavTab name={userName} />} />
		<Route path="/familydetails" element={<FamilyDetails name={userName} />} />
		<Route path="/professionaldetails" element={<ProfessionalDetails name={userName} />} />
		<Route path="/educationaldetails" element={<EducationDetails name={userName} />} />
		<Route path="/myconnections" element={<MyConnection  name={userName}/>} />
		<Route path="/myrequests" element={<MyRequests name={userName} />} />
        <Route path="/delete" element={<DeletePage name={userName} />} />
		<Route path="*" element={<ErrorPage name={userName}/>} />	
		
		</>
   }

		</Routes>

	
		{/* <Footer/> */}
	
	  
    </Router>
	</>
  );
}

export default App;


